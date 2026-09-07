---
description: Run lint, typecheck, and the static build; report real results
allowed-tools: Bash(npm run check), Bash(npm run build), Read, Edit, Grep, Glob
---

Verify the working tree is shippable.

1. Run `npm run check` (next lint + tsc --noEmit).
2. Run `npm run build` — this is the static export; it catches errors lint misses.
3. If either fails, fix the cause in `src/` (never in `out/` or `.next/`) and re-run.
4. Report the outcome plainly: pass/fail, the First Load JS number from the build
   output, and any new warnings. If something still fails, paste the actual error
   rather than describing it.
