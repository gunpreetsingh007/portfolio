'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 z-50"
      style={{ scaleX }}
    />
  )
}

export default ProgressBar