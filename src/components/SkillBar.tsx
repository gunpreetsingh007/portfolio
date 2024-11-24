'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NeumorphicCard from './NeumorphicCard'

interface SkillBarProps {
  name: string
  level: number
  description: string
}

const SkillBar = ({ name, level, description }: SkillBarProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <NeumorphicCard>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">{name}</span>
          <span className="text-yellow-600">Lv. {level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">{description}</p>
      </NeumorphicCard>
    </motion.div>
  )
}

export default SkillBar