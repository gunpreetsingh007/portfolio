'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import NeumorphicCard from './NeumorphicCard'

interface AchievementCardProps {
  title: string
  description: string
  badge: string
}

const AchievementCard = ({
  title,
  description,
  badge,
}: AchievementCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <NeumorphicCard>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 dark:text-gray-400">{description}</p>
        <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      </NeumorphicCard>
    </motion.div>
  )
}

export default AchievementCard