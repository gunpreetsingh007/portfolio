'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NeumorphicCard from './NeumorphicCard'

interface ExperienceCardProps {
  title: string
  company: string
  period?: string
  description: string[]
  xp: string
  badge: string
}

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  xp,
  badge,
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
          {company} {period && `| ${period}`}
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
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