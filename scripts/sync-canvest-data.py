#!/usr/bin/env python3
"""Refresh the CanvestAI data the lab page reads.

The lab dashboard fetches two files at runtime:

  public/data/canvest-recommendations.json  — the public slice of the model export (bias, signal, risk)
  public/data/canvest-etfs.json             — a ticker -> {name, mer} lookup for display

Both live in the CanvestAI project, not here, so they go stale silently.
This script pulls the current export across and rebuilds the lookup so every
ticker in the export has a name.

Usage:
    scripts/sync-canvest-data.py                # copy the existing export
    scripts/sync-canvest-data.py --regenerate   # re-run the CanvestAI export first
    scripts/sync-canvest-data.py --no-fetch     # skip the yfinance lookup for unknown tickers

Then run ./build.sh to rebuild the site and sync it to the repo root.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DATA = SITE_ROOT / "astro-src" / "public" / "data"

CANVEST_ROOT = Path.home() / "coding_projects" / "canvestai"
CANVEST_PYTHON = CANVEST_ROOT / ".venv" / "bin" / "python"
CANVEST_EXPORT = CANVEST_ROOT / "data" / "recommendations_export.json"
CANVEST_UNIVERSE = CANVEST_ROOT / "scripts" / "etf_universe.json"

RECOMMENDATIONS_DEST = PUBLIC_DATA / "canvest-recommendations.json"
ETFS_DEST = PUBLIC_DATA / "canvest-etfs.json"

# CanvestAI is a private repo; this site is public, and whatever lands in
# public/data is served verbatim at onk3sh.github.io/data/. So the export is
# copied field by field rather than wholesale — a new key in the pipeline should
# fail this script, not publish itself.
PUBLIC_TOP_LEVEL = ("as_of", "generated_at", "systemic_risk", "sectors")

# Known keys held back on purpose, with the reason.
WITHHELD = {
    "paper_trading": "track record stays unpublished (see SHOW_PAPER_TRADES in lab.astro)",
}

# systemic_risk is projected too. Allowlisting only the top level let its `note`
# through wholesale, and that note carried the model's internal rationale — the
# astrological terms CanvestAI reasons in — onto a page read as financial
# analysis. The level and the score are the parts a visitor can read.
PUBLIC_RISK = ("level", "score")

WITHHELD_RISK = {
    "note": "model's internal rationale; not interpretable as financial analysis",
}


def project(raw: dict, allowed: tuple, withheld: dict, label: str = "") -> dict:
    """Keep only allowlisted keys, and fail on any key this script has not seen."""
    unknown = set(raw) - set(allowed) - set(withheld)
    if unknown:
        sys.exit(
            f"CanvestAI export carries {label}fields this script has never seen: "
            f"{', '.join(sorted(unknown))}\n"
            "Review them, then add each to the allowlist or the withheld list."
        )
    for key, why in withheld.items():
        if key in raw:
            print(f"   . withholding {label}{key!r} — {why}")
    return {k: raw[k] for k in allowed if k in raw}


def to_public(raw: dict) -> dict:
    """Project the CanvestAI export down to the fields the public site may serve."""
    public = project(raw, PUBLIC_TOP_LEVEL, WITHHELD)
    if "systemic_risk" in public:
        public["systemic_risk"] = project(
            public["systemic_risk"], PUBLIC_RISK, WITHHELD_RISK, "systemic_risk."
        )
    return public


def regenerate_export() -> None:
    """Re-run the CanvestAI exporter so the export reflects today's signals."""
    if not CANVEST_PYTHON.exists():
        sys.exit(f"CanvestAI venv not found at {CANVEST_PYTHON}")
    print("-> regenerating CanvestAI export...")
    subprocess.run(
        [str(CANVEST_PYTHON), "scripts/export_recommendations.py"],
        cwd=CANVEST_ROOT,
        check=True,
    )


def export_tickers(export: dict) -> list[str]:
    """Every Canadian ticker the dashboard will try to render, in export order."""
    seen: dict[str, None] = {}
    for group in export.get("sectors", []):
        for entry in group.get("etfs_ca") or []:
            ticker = entry if isinstance(entry, str) else entry.get("ticker", "")
            bare = ticker.replace(".TO", "")
            if bare:
                seen.setdefault(bare, None)
    return list(seen)


def fetch_names(tickers: list[str]) -> dict[str, str]:
    """Ask yfinance for the fund names we have no local record of."""
    if not tickers:
        return {}
    if not CANVEST_PYTHON.exists():
        print(f"   ! no CanvestAI venv; cannot look up {', '.join(tickers)}")
        return {}
    print(f"-> looking up {len(tickers)} unknown ticker(s) via yfinance...")
    program = (
        "import json,sys,yfinance as yf\n"
        "out={}\n"
        "for t in sys.argv[1:]:\n"
        "    try:\n"
        "        i=yf.Ticker(t+'.TO').info\n"
        "        n=i.get('longName') or i.get('shortName')\n"
        "        if n: out[t]=n\n"
        "    except Exception: pass\n"
        "print(json.dumps(out))\n"
    )
    result = subprocess.run(
        [str(CANVEST_PYTHON), "-c", program, *tickers],
        cwd=CANVEST_ROOT,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"   ! lookup failed: {result.stderr.strip().splitlines()[-1:]}")
        return {}
    return json.loads(result.stdout.strip().splitlines()[-1])


def build_lookup(export: dict, allow_fetch: bool) -> dict:
    """Merge the existing lookup with the CanvestAI universe, filling any gaps."""
    existing = {}
    if ETFS_DEST.exists():
        existing = {e["ticker"]: e for e in json.loads(ETFS_DEST.read_text())["etfs"]}

    universe = {}
    if CANVEST_UNIVERSE.exists():
        for entry in json.loads(CANVEST_UNIVERSE.read_text()):
            universe[entry["ticker"].replace(".TO", "")] = entry

    tickers = export_tickers(export)
    merged: dict[str, dict] = {}
    unknown: list[str] = []

    for ticker in tickers:
        record = dict(existing.get(ticker, {"ticker": ticker}))
        if not record.get("name"):
            source = universe.get(ticker)
            if source:
                record["name"] = source["name"]
                record.setdefault("mer", source.get("mer"))
            else:
                unknown.append(ticker)
        merged[ticker] = record

    if unknown and allow_fetch:
        for ticker, name in fetch_names(unknown).items():
            merged[ticker]["name"] = name
        unknown = [t for t in unknown if not merged[t].get("name")]

    if unknown:
        print(f"   ! still unnamed (will render as em dash): {', '.join(unknown)}")

    # keep entries for tickers no longer in the export — the model rotates holdings
    for ticker, record in existing.items():
        merged.setdefault(ticker, record)

    return {
        "generated_at": export.get("generated_at"),
        "etfs": [merged[t] for t in sorted(merged)],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--regenerate",
        action="store_true",
        help="re-run the CanvestAI exporter before copying (writes to the CanvestAI repo)",
    )
    parser.add_argument(
        "--no-fetch",
        action="store_true",
        help="do not call yfinance for tickers with no local name",
    )
    args = parser.parse_args()

    if args.regenerate:
        regenerate_export()

    if not CANVEST_EXPORT.exists():
        sys.exit(f"No CanvestAI export at {CANVEST_EXPORT} — run with --regenerate")

    export = json.loads(CANVEST_EXPORT.read_text())
    as_of = export.get("as_of", "unknown")

    PUBLIC_DATA.mkdir(parents=True, exist_ok=True)
    public = to_public(export)
    RECOMMENDATIONS_DEST.write_text(json.dumps(public, indent=2) + "\n")
    print(f"-> wrote public export (as of {as_of}) to {RECOMMENDATIONS_DEST.relative_to(SITE_ROOT)}")

    lookup = build_lookup(export, allow_fetch=not args.no_fetch)
    ETFS_DEST.write_text(json.dumps(lookup, indent=2) + "\n")
    print(f"-> wrote {len(lookup['etfs'])} ETF names to {ETFS_DEST.relative_to(SITE_ROOT)}")

    print("\nNext: ./build.sh   (rebuild and sync to the repo root that GitHub Pages serves)")


if __name__ == "__main__":
    main()
