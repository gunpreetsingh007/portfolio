'use client'

import Link from 'next/link'
import { Quote } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NeumorphicCard from './NeumorphicCard'
import { REFERENCES_PATH, type Reference } from '~/utils/resume'

interface ExperienceCardProps {
  title: string
  company: string
  companyLink?: string
  location?: string
  period?: string
  description: string[]
  xp: string
  badge: string
  /** Published reference for this role, if its author has consented. */
  reference?: Reference
}

const ExperienceCard = ({
  title,
  company,
  companyLink,
  location,
  period,
  description,
  xp,
  badge,
  reference,
}: ExperienceCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <NeumorphicCard scale={1.02}>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 dark:text-gray-400">
          {companyLink ? (
            <a
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              {company}
            </a>
          ) : (
            company
          )}{' '}
          {period && `| ${period}`}
        </p>
        {location && (
          <p className="-mt-3 mb-4 text-sm text-gray-500 dark:text-gray-500">{location}</p>
        )}
        <ul className="list-disc list-inside space-y-2 mb-4">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {/* The reference sits with the role it describes. Without this the page is
            only reachable from ⌘K or the terminal, which most visitors never open. */}
        {reference && (
          <Link
            href={`${REFERENCES_PATH}#${reference.id}`}
            className="group mb-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-sm transition hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/30 dark:hover:border-emerald-700"
          >
            <Quote size={15} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-300">
              &ldquo;{reference.pullQuote}&rdquo;{' '}
              <span className="whitespace-nowrap font-medium text-emerald-700 group-hover:underline dark:text-emerald-400">
                — {reference.author}, {reference.authorTitle} →
              </span>
            </span>
          </Link>
        )}
        <div className="flex items-center space-x-2">
          <span className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-2 py-1 rounded-full">
            {xp} XP
          </span>
          <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        </div>
      </NeumorphicCard>
    </motion.div>
  )
}

export default ExperienceCard