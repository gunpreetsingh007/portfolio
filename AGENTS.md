# Gunpreet Portfolio — Agent Context

Personal portfolio for **Gunpreet Singh** (Tech Lead & Full Stack Developer).
Live domain: **https://www.gunpreet.in**. Audience: CTOs, HRs, and IT recruiters —
the site must read as the work of a confident senior engineer (polished, fast,
tasteful), with a light thread of playful "gamification" (~20%, not more).

## Stack
- **Next.js 15** (Pages Router) + **TypeScript**, **Tailwind CSS**, **framer-motion**, **lucide-react** icons.
- **Static export**: `next.config.js` has `output: "export"` + `images.unoptimized: true`. `next build` emits `./out` (deployable to any static CDN). No server runtime.
- Path alias `~/*` → `./src/*`.
- `tsconfig.json` has `checkJs: true` and includes `**/*.js`, so build output is excluded via `"exclude": ["node_modules", "out", ".next"]`. Keep that exclude — removing it makes the build type-check generated chunks and fail.

## History (major refactor already done — do not re-introduce)
This project used to be a full T3 stack. It was deliberately simplified:
- **Removed Prisma + PostgreSQL** entirely (was dead scaffold, only the default `Post` model, used nowhere).
- **Removed tRPC** entirely (`src/server/**`, `src/utils/api.ts`, `src/pages/api/**`, the `withTRPC` wrapper).
- **Contact form → Web3Forms** (client-side `fetch` in `src/components/ContactSection.tsx`). No backend, no nodemailer.
- **Removed three.js / @react-three/fiber / @react-three/drei** — the hero is now a lightweight animated CSS gradient with a mouse-reactive spotlight.
- **Removed react-slick** — projects are a responsive grid now.
- Deleted ~22 MB of unused images; recompressed `embark-perfumes` (1.4 MB → 44 KB JPEG, referenced as `/embark-perfumes.jpg`).
- `npm install` pruned 97 packages. First Load JS ≈ 147 kB.

- **Removed the T3 env scaffolding** (Sept 2026): `src/env.js`, `.env.example`, `start-database.sh`, plus the `@t3-oss/env-nextjs` and `zod` dependencies. `env.js` validated only `NODE_ENV`, which Next sets itself, and was the sole consumer of both packages. `next.config.js` no longer imports it. **The project needs no environment variables at all.**
- Rewrote `README.md` — it was still create-t3-app boilerplate advertising Prisma, tRPC, and NextAuth.

Do NOT re-add Prisma, tRPC, three.js, react-slick, or env validation.

## Key files
- `src/utils/resume.ts` — **single source of truth** for profile, summary, skills, experience, freelance, education, achievements and the reference block. Feeds the site sections, the terminal and the `/resume` page. Edit copy here, never in a component.
- `src/pages/resume.tsx` — print-first, single-column résumé page. `npm run build && npm run resume:pdf` renders it to `public/resume.pdf` via headless Chrome/Edge (`scripts/build-resume.cjs`). Stop `npm run dev` before regenerating.
- `src/pages/index.tsx` — page composition + full SEO `<Head>` (Twitter cards, canonical, JSON-LD Person schema, absolute og:image).
- `src/components/HeroSection.tsx` — gradient hero, mouse spotlight, typing role rotator. (Résumé CTA is commented out until `public/resume.pdf` exists.)
- `src/components/CommandPalette.tsx` — ⌘K / Ctrl+K palette (search, ↑↓ nav, theme toggle, links). Mounted in `Layout.tsx`.
- `src/components/AboutSection.tsx` — count-up stats + headshot avatar with "GS" initials fallback.
- `src/components/SkillsSection.tsx` — grouped skill tag clusters (NO percentage bars — intentional).
- `src/components/ProjectsSection.tsx` + `ProjectCard.tsx` — responsive grid. Project data in `src/utils/constants.ts`.
- `src/components/ContactSection.tsx` — Web3Forms form.
- `src/components/Header.tsx` — nav + ⌘K hint + dark mode toggle. `Layout.tsx` owns `isDarkMode`/`toggleDarkMode`.

## Tone / design rules
- Senior, clean, fast. Keep gamification light: OK to keep the "Quest Log" experience header, achievement XP badges, the About "quest" line, and the anime footer. Avoid going back to heavy game framing (e.g. "Start Quest" buttons, `Lv. 95` skill bars).
- Section headers are professional/clear ("Featured Projects", "Get in Touch").

## PENDING WORK
_(none — all current pending work is done)_

### DONE
1. **Interactive Linux-style terminal** — built. `src/components/Terminal.tsx` rendered as a section `id="terminal"` (in `index.tsx`, between Achievements and Contact). "Terminal" nav item added in `Header.tsx`; "Go to Terminal" entry added to `CommandPalette.tsx`.
   - Real-terminal look: window chrome with red/yellow/green dots, title `guest@gunpreet.in: ~`, scrollable mono output (`h-80`), blinking caret input. Clicking anywhere focuses the input.
   - Prompt: `guest@gunpreet.in:~$`. Command history (↑/↓), Tab autocomplete of command names, Ctrl+L / `clear` to clear, auto-scroll to bottom.
   - Commands: `help`, `whoami`, `about`, `skills`, `experience`, `projects` (pulled from `~/utils/constants`), `achievements`, `contact`, `social`, `ls`, `goto <section>` (smooth-scrolls), `echo`, `date`, `clear`, plus Easter eggs: `coffee`, `sudo` (`sudo hire-me` → "Permission granted, let's talk: gunpreetsingh077@gmail.com"). `resume`/`cv` exist but are commented out until `public/resume.pdf` is added — uncomment them together with the hero CTA and the palette entry.
   - No new dependencies. Terminal stays dark in both light/dark site themes. Build verified (First Load JS ≈ 150 kB).
   - Terminal copy is no longer mirrored inline: skills, experience and achievements now come from `~/utils/resume`, and projects from `~/utils/constants`. Do not reintroduce local copies.

2. **Résumé as code** (Sept 2026) — `src/utils/resume.ts` + `src/pages/resume.tsx` + `scripts/build-resume.cjs`. Content is typed and version-controlled, the site and the PDF cannot disagree, and the PDF keeps a real text layer for ATS parsing. Layout is single-column, no photo, A4, deliberately portable across India / EU / US applications. Currently 2 pages: page 1 header + summary + skills + all four employment roles, page 2 freelance + education + achievements.

## ASSETS
Still outstanding:
- Replace `public/coding.png` (currently a generic Google image) with a proper 1200×630 OG card.
- Confirm the city for `PROFILE.location` in `src/utils/resume.ts` (currently just "India" — recruiters filter on city).
- Add a real impact metric to the Just Virtual Food role in `src/utils/resume.ts` (marked with a TODO) once the former CTO supplies figures.
- **Ask Varsha Dalal (Founder, Embark Perfumes) before publishing her letter.** `REFERENCES['embark-perfumes'].published` in `src/utils/resume.ts` is `false`; `public/reference-embark.pdf` is staged and the `/reference` page renders it the moment that flips to `true`. The letter is addressed "To Whom It May Concern" so it was written to be shown around, but that is not consent to a search-indexed page carrying her company's letterhead, stamp and street address. Niklas was asked; the same courtesy applies here.
- The Embark letter is a **scan with no text layer** — not selectable, searchable or screen-readable, and visibly lower fidelity than the Just Virtual Food PDF.

Already done (do not re-report as pending):
- `public/resume.pdf` — generated from `/resume`. The résumé entry points are all live now: hero CTA, palette entries, and the `resume`/`cv` terminal commands.
- `public/avatar.png` — transparent-cutout portrait used in the About avatar (composited over a gradient + glow via CSS). Falls back to "GS" initials only if the image fails to load. (Previously `headshot.jpg`. `avatar-old.png` is the superseded version.) Generated with `scripts/make-linkedin-avatar.cjs` — a local build-time tool, not part of the exported site.
- **Web3Forms access key** — set in `src/components/ContactSection.tsx`. It is a public client-side key by design; not a secret. A ready-made, on-brand card generator exists at repo root: open `og-card.html` in Chrome → DevTools → right-click the `.card` element → "Capture node screenshot" → save as `public/coding.png`. (`og-card.html` is a build-time tool; it is not part of the exported site.)

## Build / deploy
- Dev: `npm run dev` · Build (static): `npm run build` → outputs `./out`.
- Deploy: upload `./out` to **Cloudflare Pages** (or connect repo: build `npm run build`, output dir `out`). Point `gunpreet.in` DNS at it; the old Oracle Ubuntu server is no longer needed for this site.
- After deploy: submit `public/sitemap.xml` in Google Search Console.

## Contact data (single source of truth, keep consistent everywhere)
- Email: gunpreetsingh077@gmail.com · Phone: +91 77809 03638
- GitHub: https://github.com/gunpreetsingh007
- LinkedIn: https://www.linkedin.com/in/gunpreet-singh-887006159/
