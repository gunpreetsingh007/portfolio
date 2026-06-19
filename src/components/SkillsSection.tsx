'use client'

import { Code } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NeumorphicCard from './NeumorphicCard'

const SKILL_GROUPS: { category: string; skills: string[] }[] = [
  { category: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS'] },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'Python', 'REST APIs', 'WebSockets'] },
  { category: 'Database', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps & Cloud', skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'Linux'] },
]

const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-gray-800" id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex text-center justify-center">
          <Code className="mr-2 mt-2 text-green-600" />
          Skills
        </h2>
        <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <NeumorphicCard>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-600">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 ring-1 ring-gray-200 transition hover:ring-green-500 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:hover:ring-green-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
