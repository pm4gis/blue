# Geo5

Geo5 is the Cloudflare-hosted PWA for the daily GIS and Aotearoa PLACE puzzles.

Production domain: `https://geo5.pm4gis.nz`

## Free hosting

The project uses Cloudflare Workers Static Assets and a small Worker API. It does not require paid storage, databases or third-party services.

## Deploy

```bash
npm install
npx wrangler login
npm test
npm run check
npm run deploy
```

The `wrangler.jsonc` Custom Domain configuration attaches `geo5.pm4gis.nz`. Because the domain is in Cloudflare, Cloudflare creates the required DNS record and certificate when the Worker is deployed from the authorised account.

## PWA

Geo5 includes a web app manifest, 192/512 icons, a service worker, standalone display mode, install controls and bookmark instructions. Puzzle API responses remain network-only so future answers are not cached into the browser.

## Social previews

GIS and PLACE each use a dedicated 1200 × 630 social preview card. The generated JPEGs live in `public/og-gis.jpg` and `public/og-place.jpg`, with editable SVG sources in `social/`.
