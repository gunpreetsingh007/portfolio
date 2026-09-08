import Head from 'next/head'
import Link from 'next/link'
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  FREELANCE,
  FREELANCE_LABEL,
  PROFILE,
  REFERENCES_PATH,
  SKILL_GROUPS,
  publishedReferences,
  formatPeriod,
  summary,
  type Role,
} from '~/utils/resume'

/**
 * Print-first résumé page.
 *
 * This page IS the résumé source, and public/resume.pdf is generated from it:
 *
 *   npm run build && npm run resume:pdf
 *
 * Content lives in ~/utils/resume — edit there, not here. Stop `npm run dev`
 * before regenerating: the dev server watches public/ and truncates the PDF
 * mid-write.
 *
 * Deliberately single-column: ATS parsers read DOM order, and multi-column
 * layouts interleave unrelated text. Everything here stays selectable text —
 * never rasterise this page into an image PDF.
 */

const Rule = () => (
  <div className="mb-2 mt-1 border-b border-neutral-300 print:border-neutral-400" />
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[10.5pt] font-bold uppercase tracking-[0.14em] text-neutral-900">
    {children}
  </h2>
)

const RoleBlock = ({ role }: { role: Role }) => (
  <article className="mb-[9px] break-inside-avoid last:mb-0">
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-[11pt] font-bold text-neutral-900">
        {role.title}
        <span className="font-normal text-neutral-700">
          {' · '}
          {role.companyLink ? (
            // Anchors survive Chrome's print-to-PDF as real link annotations, so
            // the company name is clickable in the downloaded file.
            <a href={role.companyLink} className="text-neutral-700 no-underline">
              {role.company}
            </a>
          ) : (
            role.company
          )}
        </span>
      </h3>
      {role.start && (
        <span className="shrink-0 text-[9.5pt] tabular-nums text-neutral-600">
          {formatPeriod(role.start, role.end)}
        </span>
      )}
    </div>
    {role.location && (
      <p className="text-[9.5pt] italic text-neutral-600">{role.location}</p>
    )}
    {/* Real list markers, not text bullets — CSS markers are not extracted as
        content when an ATS parses the PDF. */}
    <ul className="mt-1 list-disc space-y-[2px] pl-[4.2mm] marker:text-neutral-400">
      {role.highlights.map((point) => (
        <li key={point} className="pl-1 text-[10pt] leading-[1.38] text-neutral-800">
          {point}
        </li>
      ))}
    </ul>
  </article>
)

export default function Resume() {
  const references = publishedReferences()

  // href of undefined renders as plain text (location has nowhere to point).
  const contactLine: { label: string; href?: string }[] = [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
    { label: PROFILE.location },
    { label: PROFILE.site, href: PROFILE.siteUrl },
    { label: PROFILE.linkedinHandle, href: PROFILE.linkedin },
    { label: PROFILE.githubHandle, href: PROFILE.github },
  ]

  return (
    <>
      <Head>
        <title>{`${PROFILE.name} — Résumé`}</title>
        <meta
          name="description"
          content={`Résumé of ${PROFILE.name}, ${PROFILE.title}.`}
        />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Print rules live here rather than in Tailwind so page geometry is explicit. */}
      <style>{`
        @page { size: A4; margin: 11mm 13mm; }
        @media print {
          html, body { background: #fff !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .resume-sheet { box-shadow: none !important; margin: 0 !important; width: auto !important; padding: 0 !important; }
        }
      `}</style>

      <div className="min-h-screen bg-neutral-200 py-8 print:bg-white print:py-0">
        {/* Screen-only controls */}
        <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between gap-4 px-4 print:hidden">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
          >
            ← Back to gunpreet.in
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Print / Save as PDF
          </button>
        </div>

        <main className="resume-sheet mx-auto w-[210mm] max-w-full bg-white px-[13mm] py-[11mm] font-sans text-neutral-900 shadow-xl print:w-auto print:shadow-none">
          {/* Header */}
          <header className="mb-3">
            <h1 className="text-[21pt] font-bold leading-tight tracking-tight">
              {PROFILE.name}
            </h1>
            <p className="text-[11.5pt] font-medium text-neutral-700">{PROFILE.title}</p>
            <p className="mt-1.5 text-[9.5pt] leading-relaxed text-neutral-700">
              {contactLine.map((item, i) => (
                <span key={item.label}>
                  {i > 0 && <span className="mx-1.5 text-neutral-400">·</span>}
                  {item.href ? (
                    <a href={item.href} className="text-neutral-700 no-underline">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
              ))}
            </p>
          </header>

          <Rule />

          {/* Summary */}
          <section className="mb-4">
            <p className="text-[10pt] leading-[1.5] text-neutral-800">{summary()}</p>
          </section>

          {/* Skills sit above Experience: recruiters scan for the stack first, and
              ATS keyword matching favours them appearing early in the document. */}
          <section className="mb-3 break-inside-avoid">
            <SectionTitle>Skills</SectionTitle>
            <Rule />
            <dl className="space-y-[2px]">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="flex text-[10pt] leading-[1.38]">
                  {/* Keep category labels short enough to fit this column on one line. */}
                  <dt className="w-[34mm] shrink-0 font-semibold text-neutral-900">
                    {group.category}
                  </dt>
                  <dd className="text-neutral-800">{group.skills.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Experience */}
          <section className="mb-4">
            <SectionTitle>Experience</SectionTitle>
            <Rule />
            {EXPERIENCE.map((role) => (
              <RoleBlock key={`${role.company}-${role.title}`} role={role} />
            ))}
          </section>

          {/* Freelance */}
          <section className="mb-4">
            <SectionTitle>{FREELANCE_LABEL}</SectionTitle>
            <Rule />
            {FREELANCE.map((role) => (
              <RoleBlock key={`${role.company}-${role.title}`} role={role} />
            ))}
          </section>

          {/* Education */}
          <section className="mb-3 break-inside-avoid">
            <SectionTitle>Education</SectionTitle>
            <Rule />
            {EDUCATION.map((entry) => (
              <div
                key={entry.degree}
                className="flex items-baseline justify-between gap-4 text-[10pt]"
              >
                <span>
                  <span className="font-semibold">{entry.degree}</span>
                  <span className="text-neutral-700"> · {entry.institution}</span>
                </span>
                <span className="shrink-0 tabular-nums text-[9.5pt] text-neutral-600">
                  {entry.period}
                </span>
              </div>
            ))}
          </section>

          {/* Achievements */}
          <section className="break-inside-avoid">
            <SectionTitle>Achievements</SectionTitle>
            <Rule />
            <ul className="list-disc space-y-[2px] pl-[4.2mm] marker:text-neutral-400">
              {ACHIEVEMENTS.map((item) => (
                <li key={item.title} className="pl-1 text-[10pt] leading-[1.38]">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-neutral-700"> — {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lists only letters whose author has consented to publication. */}
          {references.length > 0 && (
            <section className="mt-4 break-inside-avoid">
              <SectionTitle>{references.length > 1 ? 'References' : 'Reference'}</SectionTitle>
              <Rule />
              <p className="text-[10pt] leading-[1.38] text-neutral-800">
                {'Written '}
                {references.length > 1 ? 'references' : 'reference'}
                {' from '}
                {references.map((reference, i) => (
                  <span key={reference.id}>
                    {i > 0 && (i === references.length - 1 ? ' and ' : ', ')}
                    {reference.author} ({reference.authorTitle}, {reference.authorCompany})
                  </span>
                ))}
                {' — read '}
                {references.length > 1 ? 'them' : 'it'}
                {' at '}
                <a
                  href={`${PROFILE.siteUrl}${REFERENCES_PATH}`}
                  className="font-semibold text-neutral-900 no-underline"
                >
                  {PROFILE.site}
                  {REFERENCES_PATH}
                </a>
                .
              </p>
            </section>
          )}
        </main>
      </div>
    </>
  )
}
