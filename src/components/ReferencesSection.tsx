'use client'

import Link from 'next/link'
import { Quote, ArrowRight } from 'lucide-react'
import NeumorphicCard from './NeumorphicCard'
import { REFERENCES_PATH, publishedReferences } from '~/utils/resume'

/*
 * The letters sit straight after About: for a founder deciding whether to trust
 * a stranger, a CTO's and a founder's written word is the strongest evidence on
 * the page. Copy comes from REFERENCES in ~/utils/resume, so only letters whose
 * author has consented ever appear here.
 */
const ReferencesSection = () => {
  const references = publishedReferences()
  if (references.length === 0) return null

  return (
    <section id="references" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <Quote className="mr-2 text-emerald-600" />
          References
        </h2>
        <p className="mb-12 text-center text-gray-600 dark:text-gray-400">
          Written letters, published with each author&apos;s permission.
        </p>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {references.map((reference) => (
            <NeumorphicCard key={reference.id} scale={1.02} className="flex h-full flex-col">
              <Quote size={28} className="mb-4 text-emerald-500/60" aria-hidden />
              <blockquote className="mb-6 flex-1 text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-100">
                &ldquo;{reference.pullQuote}&rdquo;
              </blockquote>
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <p className="font-semibold">{reference.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reference.authorTitle}, {reference.authorCompany}
                </p>
                <p className="mb-4 text-sm text-gray-500">{reference.role}</p>
                <Link
                  href={`${REFERENCES_PATH}#${reference.id}`}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Read the full letter
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReferencesSection
