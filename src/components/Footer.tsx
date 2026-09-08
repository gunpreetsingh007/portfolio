'use client'

import Link from 'next/link'
import { REFERENCES_PATH, RESUME_PDF, publishedReferences } from '~/utils/resume'

const Footer = () => {
  const hasReferences = publishedReferences().length > 0

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-center py-6">
      <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Résumé (PDF)
        </a>
        {hasReferences && (
          <>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href={REFERENCES_PATH}
              className="text-emerald-700 hover:underline dark:text-emerald-400"
            >
              References
            </Link>
          </>
        )}
      </nav>
      <p>
        &copy; {new Date().getFullYear()} Gunpreet Singh. All rights reserved. | Crafted with love, a cup of coffee and a sprinkle of
        anime magic
      </p>
    </footer>
  )
}

export default Footer
