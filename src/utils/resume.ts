/**
 * Single source of truth for résumé + site content.
 *
 * Everything here feeds BOTH the website sections and the /resume page that
 * generates public/resume.pdf. Do not duplicate this copy into components —
 * that is what caused Terminal.tsx and ExperienceSection.tsx to drift apart.
 */

// Dates ----------------------------------------------------------------------

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/** '2025-07' -> 'Jul 2025' */
function formatMonth(iso: string): string {
  const [year, month] = iso.split('-')
  const index = Number(month) - 1
  const name = MONTHS[index]
  if (!year || !name) return iso
  return `${name} ${year}`
}

/** Renders a role's date range. Omitting `end` means the role is current. */
export function formatPeriod(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

/** Whole completed years of professional experience. */
export function yearsOfExperience(now = new Date()): number {
  return experienceDuration(now).years
}

/**
 * Years rounded to nearest, for the stat counter — so it agrees with the
 * "nearly 6 years" prose instead of contradicting it with "5+".
 */
export function experienceYearsRounded(now = new Date()): number {
  const { years, months } = experienceDuration(now)
  return months >= 6 ? years + 1 : years
}

/**
 * Experience accrues only while employed, so it stops at the end of the most
 * recent role and resumes automatically when a role without an `end` is added.
 * Returns the exclusive end month — the month after the last one worked.
 *
 * The measure is career span rather than a sum of worked intervals: when a new
 * current role is added, any gap before it is absorbed into the total. That is
 * the conventional reading of "N years of experience", and summing intervals
 * would double-count the concurrent freelance work anyway.
 */
function experienceEnd(now: Date): Date {
  const latest = EXPERIENCE[0]
  if (!latest?.end) return now
  const [year, month] = latest.end.split('-')
  // +1 because the final month was worked in full.
  return new Date(Number(year), Number(month))
}

/** Years and months of actual professional experience. */
export function experienceDuration(now = new Date()): { years: number; months: number } {
  const [year, month] = CAREER_START.split('-')
  const start = new Date(Number(year), Number(month) - 1)
  const end = experienceEnd(now)
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12 }
}

/** Exact duration, e.g. "5 years 7 months". */
export function formatExperience(now = new Date()): string {
  const { years, months } = experienceDuration(now)
  const yearPart = `${years} ${years === 1 ? 'year' : 'years'}`
  if (months === 0) return yearPart
  return `${yearPart} ${months} ${months === 1 ? 'month' : 'months'}`
}

/**
 * Rounded duration for prose, e.g. "nearly 6 years".
 *
 * A bare "5+ years" undersells someone 7 months into their sixth year, and an
 * exact "5 years 7 months" reads oddly in a summary line. The exact dates sit
 * beside this on the page, so a reader can always check the rounding.
 */
export function formatExperienceApprox(now = new Date()): string {
  const { years, months } = experienceDuration(now)
  if (months >= 7) return `nearly ${years + 1} years`
  if (months >= 3) return `over ${years} years`
  return `${years} years`
}

export const CAREER_START = '2021-02'

// Profile --------------------------------------------------------------------

export const PROFILE = {
  name: 'Gunpreet Singh',
  title: 'Tech Lead & Full Stack Developer',
  email: 'gunpreetsingh077@gmail.com',
  phone: '+91 77809 03638',
  location: 'Jammu, India',
  site: 'gunpreet.in',
  siteUrl: 'https://www.gunpreet.in',
  github: 'https://github.com/gunpreetsingh007',
  githubHandle: 'github.com/gunpreetsingh007',
  linkedin: 'https://www.linkedin.com/in/gunpreet-singh-887006159/',
  linkedinHandle: 'linkedin.com/in/gunpreet-singh-887006159',
} as const

/**
 * Short paragraph at the top of the résumé. Front-loads scope, then evidence.
 * The duration is interpolated at render time so it never goes stale.
 */
export const summary = (experience = formatExperienceApprox()) =>
  `Tech Lead and full-stack engineer with ${experience} owning production SaaS platforms end to end. ` +
  'Most recently held technical leadership of the software organisation at an Austrian foodtech ' +
  'company, across three products serving 600+ restaurant partners in the DACH region. Comfortable ' +
  'from database schema to production infrastructure, with a track record of measurable impact — ' +
  '~90% faster critical APIs and 65% lower cloud spend.'

// Skills ---------------------------------------------------------------------

export type SkillGroup = { category: string; skills: string[] }

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Fastify', 'Express.js', 'Prisma', 'REST APIs', 'WebSockets', 'BullMQ', 'PHP / Laravel'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'Linux'],
  },
]

// Experience -----------------------------------------------------------------

export type Role = {
  title: string
  company: string
  companyLink?: string
  location?: string
  /** 'YYYY-MM'. Omit `end` for a current role. */
  start?: string
  end?: string
  /** Shared bullets — these appear on the site AND in the PDF. Keep them tight. */
  highlights: string[]
  /** Site-only flourish. */
  xp: string
  badge: string
}

export const EXPERIENCE: Role[] = [
  {
    title: 'Technical Lead',
    company: 'Just Virtual Food Brands GmbH',
    companyLink: 'https://www.just-virtual-food.com',
    location: 'Vienna, Austria (Remote)',
    start: '2025-07',
    end: '2026-08',
    // Figures below were supplied and cleared by the CTO (Sept 2026). He asked that
    // order volume, user volume, revenue, commissions and detailed internal
    // workflows stay out of anything public — do not add them.
    highlights: [
      'Held technical leadership of the software organisation — architecture, code quality and technical standards across three production platforms serving 9+ virtual food brands and 600+ restaurant partners across three DACH markets.',
      'Owned JMS, the internal management system (TypeScript, Fastify, Prisma, PostgreSQL, React), spanning sales CRM, contracts, analytics dashboards and global search.',
      'Designed a modular backend template that became the foundation of the platform’s v2 rewrite and led the migration onto it, delivering a rebuilt sales pipeline, faster feature development, lower infrastructure costs and a more stable platform.',
      'Delivered Partnerhub, the partner-facing platform, and the backend services behind the mobile app, with e-signature contracts, multi-language localisation and product analytics.',
    ],
    xp: '+3500',
    badge: 'Platform Architect',
  },
  {
    title: 'Associate Technical Lead',
    company: 'SafetyConnect',
    companyLink: 'https://safetyconnect.io',
    start: '2023-11',
    end: '2025-05',
    highlights: [
      'Led development of ProcessSafety, a template builder that digitised paper-based workflows such as permit to work and incident management.',
      'Managed and code-reviewed a team of 5 developers, owning quality standards and the full delivery lifecycle.',
      'Shipped new modules consistently on schedule across the product.',
    ],
    xp: '+3000',
    badge: 'Leadership Mastery',
  },
  {
    title: 'Full Stack Developer',
    company: 'SafetyConnect',
    companyLink: 'https://safetyconnect.io',
    start: '2022-03',
    end: '2023-10',
    highlights: [
      'Cut critical API response times by ~90% through query and database schema optimisation.',
      'Reduced cloud costs by 65% through resource right-sizing and architectural changes.',
      'Stabilised the product by resolving critical defects and shipping new modules, contributing to a ~70% increase in adoption and engagement.',
    ],
    xp: '+2000',
    badge: 'Performance Guru',
  },
  {
    title: 'Full Stack Developer',
    company: 'Innerloop Technologies Pvt. Ltd.',
    start: '2021-02',
    end: '2022-02',
    highlights: [
      'Built Esnick, an e-commerce platform with local market discovery and home delivery, plus a hybrid Android WebView app using Firebase location tracking and push notifications.',
      'Delivered the merchant panel, a real-time Firebase chat system, and admin tooling for order management.',
    ],
    xp: '+1500',
    badge: 'E-Commerce Innovator',
  },
]

export const FREELANCE_LABEL = 'Freelance'

export const FREELANCE: Role[] = [
  {
    title: 'Full Stack Developer & Software Architect',
    company: 'Embark Perfumes',
    // The client's live storefront, and the domain their own recommendation
    // letter cites. Previously pointed at embark.gunpreet.in / embarkperfumes.in,
    // neither of which is the client's canonical address.
    companyLink: 'https://www.embarkperfumes.com',
    highlights: [
      'Designed and built a bespoke e-commerce platform for an established Indian perfume brand, including an admin panel for product and inventory management.',
      'Implemented SEO and responsive design, improving visibility and cross-device accessibility.',
    ],
    xp: '+800',
    badge: 'Freelance Expert',
  },
]

// Education & achievements ---------------------------------------------------

export const EDUCATION = [
  {
    degree: 'B.E. Computer Engineering',
    institution: 'Jammu University',
    period: '2017 – 2021',
  },
] as const

export type Achievement = { title: string; description: string; badge: string }

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Employee of the Quarter, three consecutive terms',
    description: 'Recognised three quarters running at SafetyConnect.',
    badge: 'Consistency Master',
  },
  {
    title: 'Cloud cost reduction of 65%',
    description: 'Cut cloud spend by roughly two thirds through right-sizing and architectural change.',
    badge: 'Efficiency Expert',
  },
  {
    title: 'Codathon, 3rd place',
    description: "Placed 3rd with 'Mbit' at the Codathon hosted by MIET Jammu.",
    badge: '+1000 XP',
  },
]

// Reference ------------------------------------------------------------------

/**
 * Reference letters. Each is gated on its own author's consent — publishing a
 * letter puts someone else's name, words and company on a public page, so the
 * `published` flag is per letter and not a blanket switch.
 *
 * Just Virtual Food: Niklas Braun cleared publication (Sept 2026) and said either
 * version was fine. public/reference.pdf is the SIGNED copy, at Gunpreet's
 * decision. The unsigned original is in the repo root (gitignored) if that is ever
 * reversed; the wording is identical, so swapping the file is the only change.
 * He also asked to review the claims derived from the role before they go live.
 *
 * Embark Perfumes: not published — Varsha Dalal has not been asked yet. The letter
 * is addressed "To Whom It May Concern", so it was written for circulation, but
 * that is not the same as consenting to a search-indexed page carrying her
 * company's letterhead, stamp and street address.
 */
export type Reference = {
  id: string
  /** Gate publication per letter — each author consents separately. */
  published: boolean
  /**
   * Verbatim passages, in the order they appear in the letter. Each entry is a
   * SEPARATE excerpt and is rendered as such — they are not contiguous text, so
   * they must never be run together into one quotation. Trailing "…" marks where
   * a sentence continues in the original.
   */
  excerpts: string[]
  /** One verbatim sentence for compact contexts. */
  pullQuote: string
  author: string
  authorTitle: string
  authorCompany: string
  /** Which engagement the letter speaks to. */
  role: string
  date: string
  pdfPath: string
  /** Scans have no text layer: not selectable, not searchable, not screen-readable. */
  scanned?: boolean
}

export const REFERENCES_PATH = '/reference'

export const REFERENCES: Reference[] = [
  {
    id: 'just-virtual-food',
    published: true,
    excerpts: [
      'During his employment, Mr Singh was responsible for the technical leadership of our software organisation and for the design, delivery and quality of our product platforms…',
      'Mr Singh performed all of his duties always to our fullest satisfaction.',
      'We thank Mr Singh for his outstanding contribution to Just Virtual Food and confirm that we were always extremely pleased with his performance in every respect. We recommend him without reservation…',
    ],
    pullQuote: 'We recommend him without reservation…',
    author: 'Niklas Braun',
    authorTitle: 'Chief Technology Officer',
    authorCompany: 'Just Virtual Food Brands GmbH',
    role: 'Technical Lead, 2025–2026',
    date: '3 September 2026',
    pdfPath: '/reference.pdf',
  },
  {
    id: 'embark-perfumes',
    // Not yet published — Varsha Dalal has not been asked. See AGENTS.md.
    published: false,
    excerpts: [
      'It is our absolute pleasure and honour to recommend the services of Mr. Gunpreet Singh.',
      'During the scope of the project, Gunpreet Singh demonstrated a good work ethic and successfully completed the project within the agreed upon time. We can happily report that the work not only met my expectations, it exceeded them.',
      'We have no reservations giving Gunpreet my highest recommendation. We are very confident that you cannot go wrong by hiring him.',
    ],
    // Transcribed by eye — the letter is a scan with no text layer, so unlike the
    // Just Virtual Food excerpts these cannot be machine-checked against a source.
    pullQuote: 'We can happily report that the work not only met my expectations, it exceeded them.',
    author: 'Varsha Dalal',
    authorTitle: 'Founder',
    authorCompany: 'Embark Perfumes',
    role: 'Freelance web development',
    date: '15 January 2024',
    pdfPath: '/reference-embark.pdf',
    scanned: true,
  },
]

export const publishedReferences = () => REFERENCES.filter((r) => r.published)

export const RESUME_PDF = '/resume.pdf'
