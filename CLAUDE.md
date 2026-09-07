# CLAUDE.md — Claude Code working agreement

Project facts, history, and design rules live in `AGENTS.md`, which is the single
source of truth shared with every AI tool used on this repo (Cursor, Claude Code, …).
Read it first:

@AGENTS.md

Everything below is Claude-Code-specific: how to work in this repo, not what it is.

## Environment

- Windows 11. The default shell here is **PowerShell**, not bash. Use PowerShell
  syntax (`Test-Path`, `$env:VAR`, `Remove-Item -Recurse -Force`) unless deliberately
  calling the Bash tool.
- Package manager is **npm** (`packageManager: npm@10.8.2`). Never use pnpm/yarn/bun.
- Node scripts under `scripts/` are `.cjs` because `package.json` sets `"type": "module"`.

## Verify before claiming done

Any change to `src/**` must pass, in this order:

```bash
npm run check
```

That is `next lint && tsc --noEmit`. For anything that touches rendering, layout,
config, or imports, also run a real build, because static export catches things
lint does not:

```bash
npm run build
```

A successful build writes `./out`. Report the actual result — if lint or the build
fails, show the output rather than summarizing it as "done".

## Repo rules

- **Never edit `out/` or `.next/`.** They are generated and gitignored. If a fix
  seems to belong there, it belongs in `src/` or `public/`.
- **`tsconfig.json`'s `"exclude": ["node_modules", "out", ".next"]` is load-bearing.**
  `checkJs: true` plus `**/*.js` in `include` means removing that exclude makes
  `tsc` type-check generated build chunks and fail. Do not "clean it up".
- **Static export constraints** (`output: "export"`): no API routes, no server
  components/actions, no middleware, no `getServerSideProps`, no ISR, no
  `next/image` optimization. Anything needing a server must be a client-side
  `fetch` to a third party (that is why contact uses Web3Forms).
- **Path alias is `~/*` → `./src/*`.** Use it for cross-directory imports;
  relative imports are fine within `src/components/`.
- `'use client'` sits at the top of interactive components. Keep it when editing them.
- No test suite exists. Do not invent one or add a test runner unless asked.

## No environment variables

The T3 scaffolding is gone (Sept 2026): `src/env.js`, `.env.example`,
`start-database.sh`, `@t3-oss/env-nextjs`, and `zod` were all removed, and
`next.config.js` no longer imports an env module. **The site builds and runs with
zero environment variables** — if a change seems to need one, it is probably a
static-export violation instead.

A local, untracked `.env` may still exist on the user's machine with old Prisma /
Gmail values. Nothing reads it. Do not read, print, or copy it — `.claude/settings.json`
denies access to `.env*` on purpose, and that rule applies to Bash commands too,
not just the Read tool.

## Résumé and site content — one source of truth

`src/utils/resume.ts` owns profile, summary, skills, experience, freelance,
education, achievements and the reference block. It feeds **all** of:
`SkillsSection`, `ExperienceSection`, `AchievementsSection`, `Terminal.tsx`, and
the `/resume` page that generates the PDF.

**Edit copy there, never in a component.** This replaced an earlier arrangement
where `Terminal.tsx` duplicated the copy inline — the two had already drifted
(the terminal claimed SafetyConnect ended Jun 2025, the site said May 2025).
Do not reintroduce local copies.

Dates are stored as `YYYY-MM` and rendered by `formatPeriod`, so a role's period
is written once. Omitting `end` renders "Present".

**Experience duration** is derived from `CAREER_START` and the roles, never
hardcoded. Two rules matter:

1. **It stops accruing when not employed.** `experienceEnd` runs to the end of the
   most recent role, and only counts to today when that role has no `end`. Adding
   a new current role resumes it automatically. A naive "now minus career start"
   silently inflates the figure during a gap between jobs.
2. **It must survive static export.** `index.tsx` computes it in `getStaticProps`
   so the first client render matches the prerendered HTML, and `useExperience`
   refreshes it after mount. That is dormant while the figure is frozen, and load
   bearing again the moment a current role exists.

`formatExperienceApprox()` ("nearly 6 years") is for prose; `formatExperience()`
("5 years 7 months") is the exact form. Terminal output is generated after
hydration, so it calls the function directly. Never hardcode a duration.

### Regenerating the PDF

```bash
npm run build && npm run resume:pdf
```

`scripts/build-resume.cjs` serves `out/` on a random port and drives headless
Chrome/Edge to print `/resume` into `public/resume.pdf`. Notes that cost time to
rediscover:

- **Stop `npm run dev` first.** The dev server watches `public/` and truncates
  the PDF mid-write into a ~1 KB blank file.
- The script waits for the PDF to stop growing rather than for the browser to
  exit, because on Windows the launched executable hands off to another process
  and exits immediately.
- `--no-proxy-server` and an isolated `--user-data-dir` are both required, or the
  browser prints its own "can't reach this page" error into the PDF.
- Never swap this for a client-side HTML-to-PDF library. Print-to-PDF keeps a
  real text layer, which is what ATS parsers read.

## Contact data — one source of truth

Email `gunpreetsingh077@gmail.com`, phone `+91 77809 03638`, GitHub
`gunpreetsingh007`, LinkedIn `gunpreet-singh-887006159`. These appear in
`ContactSection.tsx`, `Terminal.tsx`, `Footer.tsx`, and the JSON-LD in
`index.tsx`. Change all of them together or none.

## SEO surface

`src/pages/index.tsx` owns the `<Head>`: canonical, Twitter card, JSON-LD Person
schema, and an **absolute** `og:image` URL. `public/sitemap.xml` and
`public/robots.txt` are hand-maintained — bump `lastmod` when page content
changes meaningfully.

## Git

- Branch is `main` and it deploys. Do not commit or push unless asked.
- `og-card.html` and `scripts/` are build-time tooling, not part of the exported
  site. Keep them out of `public/`.

## Deploy

Cloudflare Pages, static. Build `npm run build`, output dir `out`. There is no
server runtime to debug — if something works in `npm run dev` but not in
production, suspect a static-export violation first.
