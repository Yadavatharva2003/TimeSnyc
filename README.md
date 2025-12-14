# TimeSync — Astro Scaffold

This is a minimal Astro scaffold for the TimeSync static site (tools + blog).
It was generated to match the ultra-minimal mockups (Inter font, soft grey sections, light+dark mode).

## Quick start (after cloning / downloading)
```bash
npm install
npm run dev
```

Pages included:
- /src/pages/index.astro
- /src/pages/tools.astro
- /src/pages/timezone-converter.astro
- /src/pages/blog/index.astro
- /src/content/posts/how-to-manage-timezones.md

Components:
- /src/components/Header.astro
- /src/components/Footer.astro
- /src/components/ToolCard.astro

Static assets: /public/assets/

Notes:
- Timezone converter is a client-side island (vanilla JS) only on that page.
- Replace ad placeholders in templates with your AdSense/Ezoic snippets.
- Build with `npm run build` and deploy the `dist/` output to Netlify/Vercel.


## Map & Timezones Enhancements
- World Clock now uses Leaflet (OpenStreetMap tiles) for a proper interactive map and animated transitions.
- Timezone selector includes an expanded IANA list and a search box (matches city or country substrings).
- City coordinates are used to place markers; add more entries in `src/scripts/citycoords.js` to support more cities.


## Enhancements - Map & Data
- Added ~150 city coordinates for broader marker coverage (in `src/scripts/citycoords.js`).
- World Clock now lazy-loads Leaflet only when the map is needed (reduces initial page load). This uses dynamic import/fallback to script tag.
- Markers animate smoothly using linear interpolation when moving between points.
