'use client'

import { Briefcase } from 'lucide-react'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE, FREELANCE, formatPeriod } from '~/utils/resume'

// Copy lives in ~/utils/resume so the site, the terminal and the PDF cannot drift.
const EXPERIENCES = [...EXPERIENCE, ...FREELANCE]

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Briefcase className="mr-2 text-purple-600" />
          Quest Log
        </h2>
        <div className="space-y-12">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard
              key={`${experience.company}-${experience.title}`}
              title={experience.title}
              company={experience.company}
              companyLink={experience.companyLink}
              location={experience.location}
              period={experience.start ? formatPeriod(experience.start, experience.end) : undefined}
              description={experience.highlights}
              xp={experience.xp}
              badge={experience.badge}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
