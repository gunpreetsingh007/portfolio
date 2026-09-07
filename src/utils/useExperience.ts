'use client'

import { useEffect, useState } from 'react'
import { formatExperienceApprox } from './resume'

/**
 * Keeps the experience copy current on a statically exported site.
 *
 * Currently a no-op in practice: experience stops accruing at the end of the
 * most recent role, so the value is frozen and the build-time string stays
 * correct. It matters again the moment a role without an `end` is added — the
 * duration starts moving, and a prerendered page would otherwise show whatever
 * was true on the day of the last deploy.
 *
 * `initial` must be the value rendered at build time (passed down from
 * getStaticProps), so the first client render matches the server HTML exactly.
 * The effect then recomputes against the visitor's actual date.
 */
export function useExperience(initial: string): string {
  const [label, setLabel] = useState(initial)

  useEffect(() => {
    setLabel(formatExperienceApprox())
  }, [])

  return label
}
