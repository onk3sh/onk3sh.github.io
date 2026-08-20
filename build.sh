#!/usr/bin/env bash
# Build the Astro site and sync output to the root for GitHub Pages deployment.
#
# GitHub Pages serves the repository ROOT, not astro-src/dist/. A commit that
# touches only dist/ will not change the live site — this script is what moves
# a build into the served location.
#
# Pages are discovered from dist/ rather than listed here, so a new route ships
# without editing this file and a deleted route does not linger at the root.
#
# Usage: ./build.sh [--push]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
ASTRO="$ROOT/astro-src"
DIST="$ASTRO/dist"

echo "→ Building Astro..."
cd "$ASTRO"
ASTRO_TELEMETRY_DISABLED=1 node_modules/.bin/astro build

echo "→ Syncing dist/ to root..."
cd "$DIST"

# Every HTML page Astro produced, at its dist-relative path.
while IFS= read -r page; do
  page="${page#./}"
  mkdir -p "$ROOT/$(dirname "$page")"
  cp "$DIST/$page" "$ROOT/$page"
  echo "  copied $page"
done < <(find . -name '*.html' -type f)

# Note: this script never deletes pages at the root. post/ still holds pages from
# an earlier generation of the site that Astro no longer builds; they are live URLs,
# so removing one is a deliberate decision, not a build step. To retire a route,
# delete its directory by hand (and add a redirect if it has inbound links).

# Static assets Astro copies through from public/.
for asset in favicon.svg og-image.png robots.txt sitemap-index.xml sitemap-0.xml; do
  if [ -f "$DIST/$asset" ]; then
    cp "$DIST/$asset" "$ROOT/$asset"
    echo "  synced $asset"
  fi
done

# Runtime data the lab page fetches.
if [ -d "$DIST/data" ]; then
  mkdir -p "$ROOT/data"
  cp -r "$DIST/data/." "$ROOT/data/"
  echo "  synced data/"
fi

# Hashed CSS and JS bundles. Replaced wholesale so old hashes do not accumulate.
if [ -d "$DIST/_astro" ]; then
  rm -rf "$ROOT/_astro"
  cp -r "$DIST/_astro" "$ROOT/_astro"
  echo "  synced _astro/"
fi

echo "→ Done."

if [ "${1:-}" = "--push" ]; then
  cd "$ROOT"
  git add -A
  git diff --cached --quiet && echo "Nothing to commit." && exit 0
  git commit -m "Rebuild site from Astro source"
  git push origin main
  echo "→ Pushed."
fi
