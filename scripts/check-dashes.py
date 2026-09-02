#!/usr/bin/env python3
"""Fail the build if an em dash or en dash reaches the published pages.

The site's copy is written to Simplified Technical English: one idea per
sentence. The em dash is the standard way a second idea gets smuggled into a
sentence, and a run of them is also the loudest tell that a page was drafted by
a model rather than written. Both reasons point the same way, so the rule here
is absolute: no em dash, no en dash, anywhere a reader sees prose.

This checks the BUILT HTML at the repository root, which is what GitHub Pages
serves, not the Astro source. That distinction matters. The same glyph reaches a
page through four routes that a source-level search for the literal character
will not all catch:

    1. the literal character in an .astro or .ts file
    2. a \\u2014 escape inside a TypeScript string
    3. an &mdash; or &#8212; entity in inline markup
    4. a legacy post/ page Astro no longer builds but that is still live

Checking the output catches all four at once, including the legacy pages that
have no source file left to grep.

Code is exempt. Inside <pre>, <code>, <script> and <style> a dash can be part of
a command, an identifier, or a data value, and rewriting it would be wrong.
Those regions are blanked before the scan, line numbering preserved.

Usage:
    scripts/check-dashes.py            # scan the published root, exit 1 on a hit
    scripts/check-dashes.py DIR ...    # scan specific directories or files
"""

import pathlib
import re
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent

# Directories that are never served as pages: build inputs, tooling, and the
# hashed bundle output (which is minified JS and CSS, not prose).
SKIP_DIRS = {".astro", ".claude", ".git", "_astro", "astro-src", "node_modules"}

# Regions where a dash is code or data, not prose. Blanked before scanning.
EXEMPT = re.compile(
    r"<(?P<tag>script|style|pre|code)\b[^>]*>.*?</(?P=tag)>",
    re.S | re.I,
)

# Every spelling of the two glyphs that renders as a dash in a browser.
FORBIDDEN = {
    "—": "em dash",
    "–": "en dash",
    "&mdash;": "em dash entity",
    "&ndash;": "en dash entity",
    "&#8212;": "em dash entity",
    "&#8211;": "en dash entity",
    "&#x2014;": "em dash entity",
    "&#x2013;": "en dash entity",
}


def blank_exempt(html: str) -> str:
    """Replace code and script regions with blanks, keeping line numbers intact."""

    def blank(match: re.Match) -> str:
        return re.sub(r"[^\n]", " ", match.group(0))

    return EXEMPT.sub(blank, html)


def scan(path: pathlib.Path) -> list[tuple[int, str, str]]:
    """Return (line number, what was found, the line) for each hit in one file."""
    text = path.read_text(encoding="utf-8", errors="replace")
    hits = []
    for lineno, line in enumerate(blank_exempt(text).splitlines(), start=1):
        for needle, label in FORBIDDEN.items():
            if needle in line:
                hits.append((lineno, label, line.strip()))
                break
    return hits


def pages(targets: list[pathlib.Path]) -> list[pathlib.Path]:
    """Every published .html file under the given targets, skipping build inputs."""
    found = []
    for target in targets:
        if target.is_file():
            found.append(target)
            continue
        for path in sorted(target.rglob("*.html")):
            if SKIP_DIRS & set(path.relative_to(target).parts):
                continue
            found.append(path)
    return found


def main(argv: list[str]) -> int:
    targets = [pathlib.Path(a).resolve() for a in argv[1:]] or [REPO_ROOT]

    missing = [t for t in targets if not t.exists()]
    if missing:
        for t in missing:
            print(f"check-dashes: no such path: {t}", file=sys.stderr)
        return 2

    checked = pages(targets)
    if not checked:
        print("check-dashes: found no HTML to check", file=sys.stderr)
        return 2

    pages_word = "page" if len(checked) == 1 else "pages"

    failures = 0
    for path in checked:
        for lineno, label, line in scan(path):
            rel = path.relative_to(REPO_ROOT) if REPO_ROOT in path.parents else path
            excerpt = line if len(line) <= 120 else line[:117] + "..."
            print(f"{rel}:{lineno}: {label}: {excerpt}")
            failures += 1

    if failures:
        print()
        glyph_word = "glyph" if failures == 1 else "glyphs"
        print(
            f"check-dashes: {failures} dash {glyph_word} in prose across "
            f"{len(checked)} {pages_word}. Rewrite the sentence; "
            "do not swap in a hyphen."
        )
        return 1

    print(f"check-dashes: {len(checked)} {pages_word} clean, no dash glyphs in prose.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
