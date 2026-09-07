---
description: Audit Terminal.tsx copy against the real section components
allowed-tools: Read, Edit, Grep, Glob, Bash(npm run check)
---

`src/components/Terminal.tsx` hardcodes its own copy for `about`, `skills`,
`experience`, and `achievements`. Only `projects` is shared via `~/utils/constants`.

Compare each of these against its source of truth and report every drift:

| Terminal command | Source of truth |
| --- | --- |
| `about`        | `src/components/AboutSection.tsx` |
| `skills`       | `src/components/SkillsSection.tsx` |
| `experience`   | `src/components/ExperienceSection.tsx` + `ExperienceCard.tsx` |
| `achievements` | `src/components/AchievementsSection.tsx` |
| `contact` / `social` | `src/components/ContactSection.tsx`, `Footer.tsx` |
| `goto <section>` | the section `id`s rendered in `src/pages/index.tsx` |

Also confirm every `goto` target actually exists as an `id` on the page, and that
the `help` output lists exactly the commands the registry defines (no stale
entries for commands that are commented out, e.g. `resume`/`cv`).

$ARGUMENTS

List the differences first. Only edit `Terminal.tsx` to match the sections after
saying what you're changing, then run `npm run check`.
