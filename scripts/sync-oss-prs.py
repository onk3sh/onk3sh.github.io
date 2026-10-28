#!/usr/bin/env python3
"""List merged upstream PRs that are not yet on the Open Source page.

The /open-source/ page is backed by the open-source entries in
astro-src/src/data/projects.ts. Each entry is hand-written: the summary and the
"What was wrong / The change" narrative are the point of the page and cannot be
fetched from anywhere. What a machine CAN do is the mechanical part: find which
merged PRs are new, and fill the fields that are copied straight off the PR
(title, merge date, repo, URL) so none of them is mistyped.

So this script does exactly that and no more. It asks GitHub for every merged PR
you authored, drops the ones already in projects.ts and the ones against your own
site repo, and prints a paste-ready TypeScript stub for each one left. You paste
the stub into the open-source cluster in projects.ts, write the summary and the
sections, set the language tag, then run ./build.sh.

No dependencies and no auth: it uses the public search API over stdlib urllib.
That API is rate-limited to a handful of calls a minute unauthenticated, which is
far more than this needs. Set GITHUB_TOKEN to raise the limit if you ever hit it.

Usage:
    scripts/sync-oss-prs.py                 # new upstream merged PRs as stubs
    scripts/sync-oss-prs.py --user NAME      # a different author (default onk3sh)
    scripts/sync-oss-prs.py --all            # include PRs already in projects.ts
    scripts/sync-oss-prs.py --self-test      # check the filter logic, hit no network
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
PROJECTS_TS = SITE_ROOT / "astro-src" / "src" / "data" / "projects.ts"

DEFAULT_USER = "onk3sh"

SEARCH_URL = (
    "https://api.github.com/search/issues"
    # -user:{user} excludes repos the author owns, so only upstream PRs come back.
    "?q=author:{user}+type:pr+is:merged+-user:{user}"
    "&sort=created&order=desc&per_page=50"
)


def existing_pr_urls(ts: str) -> set[str]:
    """Every PR URL already linked from projects.ts, so we can skip it."""
    return set(re.findall(r"github\.com/[^\s'\"]+/pull/\d+", ts))


def search_merged_prs(user: str) -> list[dict]:
    """Ask the public search API for the user's merged PRs."""
    req = urllib.request.Request(
        SEARCH_URL.format(user=user),
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": user,
            # Ask for an unchunked, unencoded body: some proxies truncate a
            # chunked response and urllib then raises IncompleteRead.
            "Accept-Encoding": "identity",
            "Connection": "close",
        },
    )
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))["items"]


def repo_from_url(html_url: str) -> str:
    """owner/repo from a PR html_url."""
    m = re.search(r"github\.com/([^/]+/[^/]+)/pull/\d+", html_url)
    return m.group(1) if m else ""


def is_new_upstream(item: dict, known: set[str], user: str) -> bool:
    """A merged PR counts when it is upstream and not already on the page.

    Upstream means a repo you do not own: a PR into your own repo is a change to
    your own project, not a contribution to someone else's.
    """
    url = item["html_url"]
    owner = repo_from_url(url).split("/")[0]
    if owner.lower() == user.lower():
        return False
    return not any(url.endswith(k) or k in url for k in known)


def stub(item: dict) -> str:
    """A paste-ready projects.ts entry with the fetched fields filled in."""
    url = item["html_url"]
    repo = repo_from_url(url)
    name = repo.split("/")[-1]
    number = url.rsplit("/", 1)[-1]
    merged = (item.get("pull_request") or {}).get("merged_at") or item.get("closed_at") or ""
    date = merged[:10]
    return f"""  {{
    slug: '{name}-{number}',                       // rename to something descriptive
    title: '{item['title'].replace("'", "\\'")}',  // usually reworded in the site's voice
    date: '{date}',
    type: 'project',
    projectType: 'open-source',
    tags: ['open source', '<language>'],           // set the repo's language
    summary:
      'Merged into {name}. TODO: one paragraph on the bug and the fix.',
    link: {{ label: '{repo} #{number}, merged', href: '{url}' }},
    sections: [
      {{ heading: 'What was wrong', paragraphs: ['TODO'] }},
      {{ heading: 'The change', paragraphs: ['TODO'] }},
    ],
  }},"""


def self_test() -> int:
    user = "onk3sh"
    known = {"github.com/more-itertools/more-itertools/pull/1248"}
    present = {"html_url": "https://github.com/more-itertools/more-itertools/pull/1248", "title": "x"}
    own = {"html_url": f"https://github.com/{user}/anything/pull/9", "title": "x"}
    fresh = {"html_url": "https://github.com/some/repo/pull/5", "title": "x"}
    assert not is_new_upstream(present, known, user), "a PR already in projects.ts must be skipped"
    assert not is_new_upstream(own, known, user), "a PR into a repo you own must be skipped"
    assert is_new_upstream(fresh, known, user), "an unseen upstream PR must be kept"
    assert repo_from_url(fresh["html_url"]) == "some/repo"
    print("self-test: ok")
    return 0


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--user", default=DEFAULT_USER, help="PR author (default onk3sh)")
    parser.add_argument("--all", action="store_true", help="include PRs already in projects.ts")
    parser.add_argument("--self-test", action="store_true", help="check filter logic, no network")
    args = parser.parse_args(argv[1:])

    if args.self_test:
        return self_test()

    known = set() if args.all else existing_pr_urls(PROJECTS_TS.read_text(encoding="utf-8"))
    items = search_merged_prs(args.user)
    new = [i for i in items if args.all or is_new_upstream(i, known, args.user)]

    if not new:
        print(f"Up to date: every merged upstream PR by {args.user} is already on the page.")
        return 0

    print(f"// {len(new)} merged PR(s) not yet on /open-source/. Paste into projects.ts,")
    print("// write the summary and sections, set the language tag, then run ./build.sh\n")
    for item in new:
        print(stub(item))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
