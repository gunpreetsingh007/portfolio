'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NeumorphicCardProps {
  children: ReactNode
  className?: string
  scale?: number
}

const NeumorphicCard = ({ children, className = '', scale = 1.05 }: NeumorphicCardProps) => (
  <motion.div
    whileHover={{ scale, transition: { duration: 0.2 } }}
    className={`bg-white rounded-xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)] ${className}`}
  >
    {children}
  </motion.div>
)

export default NeumorphicCard