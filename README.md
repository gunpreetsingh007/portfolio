# gunpreet.in

Personal portfolio for **Gunpreet Singh** — Tech Lead & Full Stack Developer.

**Live:** https://www.gunpreet.in

A fully static, single-page portfolio: hero with a mouse-reactive gradient, about,
skills, experience, projects, achievements, an interactive terminal, and a contact
form. Dark mode, a ⌘K command palette, and scroll-triggered animations throughout.

## Stack

- **Next.js 15** (Pages Router) + **TypeScript**
- **Tailwind CSS** with `prettier-plugin-tailwindcss`
- **framer-motion** for animation, **lucide-react** for icons
- **Static export** — no server runtime, no database, no API routes

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000. No environment variables or services are
required — everything needed to run it is in the repo.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Static export → `./out` |
| `npm run check` | `next lint` + `tsc --noEmit` — run before every commit |
| `npm run lint:fix` | Autofix lint issues |
| `npm run format:write` | Prettier across the repo |

## Project layout

```
src/
  pages/
    index.tsx        page composition + all SEO <head> tags and JSON-LD
    _app.tsx         global providers
    404.tsx
  components/        one file per section, plus Layout / Header / Footer
    Terminal.tsx     interactive terminal section
    CommandPalette.tsx  ⌘K / Ctrl+K palette
  utils/constants.ts project + experience data
  styles/globals.css
public/              images, favicon, robots.txt, sitemap.xml
```

Imports use the `~/*` → `./src/*` path alias.

## Notable pieces

**Interactive terminal** (`src/components/Terminal.tsx`) — a Linux-style shell with
command history, Tab completion, `Ctrl+L`, and commands like `whoami`, `skills`,
`projects`, `goto <section>`, plus a few Easter eggs. Project data comes from
`~/utils/constants`, but the about/skills/experience/achievements text is mirrored
inline — if you edit those section components, update the terminal copy to match.

**Command palette** (`src/components/CommandPalette.tsx`) — ⌘K / Ctrl+K for search,
arrow-key navigation, theme toggle, and quick links. Mounted in `Layout.tsx`.

**Contact form** (`src/components/ContactSection.tsx`) — posts client-side to
[Web3Forms](https://web3forms.com). The access key in that file is a public
client-side key by design, not a secret. This is why the site needs no backend.

## Static export constraints

`next.config.js` sets `output: "export"`, so the following are unavailable by
design: API routes, server components and actions, middleware,
`getServerSideProps`, ISR, and `next/image` optimization. Anything requiring a
server has to be a client-side call to a third-party service.

Also note `tsconfig.json`'s `"exclude": ["node_modules", "out", ".next"]` is
load-bearing — `checkJs: true` combined with `**/*.js` in `include` means dropping
it makes `tsc` type-check generated build chunks and fail.

## Deploy

Cloudflare Pages, static hosting.

- Build command: `npm run build`
- Output directory: `out`

After deploying, submit `public/sitemap.xml` in Google Search Console.

## Working with AI agents

`AGENTS.md` holds project context, history, and design rules — the shared source of
truth for any AI tool used on this repo. `CLAUDE.md` imports it and adds
Claude-Code-specific workflow. Update `AGENTS.md` when project facts change.
