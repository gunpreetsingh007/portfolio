---
description: Add or update a portfolio project end to end
allowed-tools: Read, Edit, Grep, Glob, Bash(npm run check), Bash(npm run build)
---

Add a project to the portfolio: $ARGUMENTS

Steps:

1. Read `src/utils/constants.ts` and match the existing shape exactly —
   `title`, `description`, `link`, `badge`, `image`, `keyPoints` (3 bullets,
   impact-first, past/present tense consistent with siblings).
2. Write in the established voice: senior engineer, concrete outcomes, no
   buzzword padding, no "passionate about". Keep descriptions to one sentence.
3. The `image` path points into `public/`. If the asset does not exist yet, say
   so explicitly and list what the user needs to add (target ~1200px wide,
   compressed — the repo deliberately keeps images small; see the
   `embark-perfumes` note in AGENTS.md).
4. Projects flow into both `ProjectsSection` and the terminal's `projects`
   command through the shared constant, so no Terminal.tsx edit is needed —
   confirm that is still true rather than assuming it.
5. Run `npm run check`, then `npm run build`.
