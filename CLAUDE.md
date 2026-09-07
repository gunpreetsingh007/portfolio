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

## The Terminal mirror trap

`src/components/Terminal.tsx` duplicates the about / skills / experience /
achievements copy inline. Projects are shared from `~/utils/constants`, but the
rest is not. **Whenever you change copy in `AboutSection`, `SkillsSection`,
`ExperienceSection`, or `AchievementsSection`, update the matching block in
`Terminal.tsx` in the same change**, or the site and the terminal will disagree.

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
