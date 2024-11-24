'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Zap, Sun, Moon } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true)
      } else {
        setIsMenuOpen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Smooth scrolling function
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false) // Close the menu on mobile after scrolling
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-gray-800 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold">Gunpreet Singh</span>
            <Zap className="text-yellow-600" />
          </motion.div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen !== undefined && (
            <motion.ul
              className={`${isMenuOpen ? 'flex' : 'hidden'
                } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 absolute md:relative top-full left-0 right-0 p-4 md:p-0 max-md:bg-white/95 max-md:dark:bg-gray-800/95`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Experience', id: 'experience' },
                { label: 'Projects', id: 'projects' },
                { label: 'Achievements', id: 'achievements' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => handleScroll(id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-300 focus:outline-none"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                >
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </li>
            </motion.ul>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header