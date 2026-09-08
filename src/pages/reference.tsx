import Head from 'next/head'
import Link from 'next/link'
import { Download, Quote } from 'lucide-react'
import { PROFILE, REFERENCES_PATH, publishedReferences, type Reference } from '~/utils/resume'

/**
 * Public reference-letter page.
 *
 * Only letters whose author has consented are listed — see REFERENCES in
 * ~/utils/resume. Order is most senior and most recent first.
 */

const ReferenceCard = ({ reference }: { reference: Reference }) => (
  // id is the anchor target for the résumé's per-role reference links.
  <figure
    id={reference.id}
    className="scroll-mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
  >
    <Quote className="text-emerald-600 dark:text-emerald-400" size={28} aria-hidden />
    {/*
      Excerpts are NOT contiguous in the original letter, so they must not read as
      one quotation. Each sits in its own blockquote, separated by a divider, and
      the caption below says they are excerpts. Running them together would
      misrepresent what the author wrote.
    */}
    <div className="mt-4 space-y-5">
      {reference.excerpts.map((excerpt, i) => (
        <div key={excerpt}>
          {i > 0 && (
            <div className="mb-5 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400 dark:text-gray-600">· · ·</span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
          <blockquote className="text-lg leading-relaxed">{excerpt}</blockquote>
        </div>
      ))}
    </div>
    <p className="mt-5 text-sm text-gray-500 dark:text-gray-500">
      Excerpts from separate parts of the letter. Read it in full below.
    </p>
    <figcaption className="mt-6 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
      <span className="font-semibold">{reference.author}</span>
      <span className="text-gray-600 dark:text-gray-400">
        {' '}
        · {reference.authorTitle}, {reference.authorCompany}
      </span>
      <span className="mt-1 block text-gray-500 dark:text-gray-500">
        {reference.role} · {reference.date}
      </span>
    </figcaption>
    <a
      href={reference.pdfPath}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      <Download size={16} />
      Read the full letter
    </a>
  </figure>
)

export default function ReferencePage() {
  const references = publishedReferences()
  const plural = references.length > 1

  return (
    <>
      <Head>
        <title>{`${plural ? 'References' : 'Reference'} — ${PROFILE.name}`}</title>
        <meta
          name="description"
          content={`Written employment ${plural ? 'references' : 'reference'} for ${PROFILE.name}, ${PROFILE.title}.`}
        />
        <link rel="canonical" href={`${PROFILE.siteUrl}${REFERENCES_PATH}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="text-sm font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-600 dark:text-emerald-400"
          >
            ← Back to {PROFILE.site}
          </Link>

          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            {plural ? 'References' : 'Employment Reference'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {plural
              ? 'Written by people I have worked for, published with their permission.'
              : // Derived, not hardcoded — an earlier hardcoded line said "Technical
                // Lead in Vienna", which implied working on-site in Austria rather
                // than remotely for an Austrian company.
                `Written on completion of my role at ${references[0]?.authorCompany}, published with permission.`}
          </p>

          <div className="mt-10 space-y-8">
            {references.map((reference) => (
              <ReferenceCard key={reference.id} reference={reference} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
