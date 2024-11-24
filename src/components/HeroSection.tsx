'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { ChevronDown } from 'lucide-react'

const HeroSection = () => {
  const [isRotating, setIsRotating] = useState(false)

  const handleScrollToContacts = () => {
    const section = document.getElementById('contact')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Gunpreet Singh
          </motion.h1>
          <motion.h2
            className="text-2xl mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Associate Tech Lead & Full Stack Developer
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With over 3 years of experience crafting exceptional web solutions
          </motion.p>
          <motion.a
            onClick={handleScrollToContacts}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-6 rounded-full hover:from-green-500 hover:to-green-700 pointer-events-auto cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Start Quest
          </motion.a>
        </div>
      </div>

      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" background />
        <OrbitControls
          enableZoom={false}
          autoRotate={isRotating}
          autoRotateSpeed={4}
          onStart={() => setIsRotating(true)}
          onEnd={() => setIsRotating(false)}
        />
      </Canvas>

      {!isRotating && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center z-20 pointer-events-none">
          <p className="mb-2">Click and drag to interact with the 3D model</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ justifyItems: 'center' }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default HeroSection