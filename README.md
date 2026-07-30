# Joyce Files Portal

Private local web portal for browsing Joyce workspace metadata and review sets.

## Privacy posture

This repository intentionally excludes raw original archives, extracted text, SQLite databases, timelines, analysis outputs, and private media by default. It contains portal code plus metadata needed for the dashboard.

The local portal can display the foreground-people photo review set through relative paths when opened from the Joyce workspace.

## Open locally

Open `index.html` in a browser from this folder.

## Contents

- `index.html` - portal shell
- `assets/styles.css` - styling
- `assets/app.js` - dashboard rendering
- `data/portal-data.json` - generated metadata snapshot
- `data/portal-data.js` - browser-loadable metadata for direct local opening
