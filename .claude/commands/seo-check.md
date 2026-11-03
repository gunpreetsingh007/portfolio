---
description: Audit the SEO surface — head tags, JSON-LD, sitemap, robots, OG card
allowed-tools: Read, Edit, Grep, Glob, Bash(npm run build)
---

Audit the site's SEO surface and report problems before changing anything.

Check:

1. `src/pages/index.tsx` `<Head>` — title, meta description, canonical
   (`https://www.gunpreet.in`), `og:title`/`og:description`/`og:image`
   (must be an **absolute** URL), `twitter:card`, and the JSON-LD Person schema.
2. JSON-LD contact/social values match `ContactSection.tsx` and `Footer.tsx`.
3. `public/sitemap.xml` — every URL resolves to a real page or in-page anchor,
   `lastmod` is not stale relative to the latest content change, `changefreq`
   is sane.
4. `public/robots.txt` — points at the sitemap, blocks nothing that matters.
5. `public/og-card.jpg` is the OG card, exported from `og-card.html` at exactly
   1200×630 — the size `index.tsx` declares. Measure the file; do not assume.
   JSON-LD `image` and the sitemap's `<image:image>` entries point at
   `public/gunpreet-singh.jpg`.
6. `src/pages/404.tsx` has a sensible title and a way back home.

Report findings as a short list, most impactful first. Apply fixes only for the
ones I confirm, then run `npm run build`.
