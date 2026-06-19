'use client'

import React, { useState } from 'react'
import Header from './Header'
import ProgressBar from './ProgressBar'
import CommandPalette from './CommandPalette'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <ProgressBar />
        <CommandPalette isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        {children}
      </div>
    </div>
  )
}

export default Layout