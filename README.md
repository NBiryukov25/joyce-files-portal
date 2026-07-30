# Joyce Files Portal

Private local web portal for browsing Joyce workspace metadata and review sets.

## Privacy posture

This repository now includes the portal plus a self-contained copy of the Joyce archive files under `archive_files/joycetagudinespiritu` for private access. Generated databases, extracted text, timelines, and analysis outputs are still excluded unless deliberately added later.

The portal gallery uses relative links into `archive_files/`, so it works after cloning the private repository.

## Open locally

Open `index.html` in a browser from this folder.

## Contents

- `index.html` - portal shell
- `assets/styles.css` - styling
- `assets/app.js` - dashboard rendering
- `data/portal-data.json` - generated metadata snapshot
- `data/portal-data.js` - browser-loadable metadata for direct local opening
