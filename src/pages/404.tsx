'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Gamepad2, Zap } from 'lucide-react'
import NeumorphicCard from '~/components/NeumorphicCard'


const NotFoundPage = () => {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (score < 404) {
        setScore(prevScore => prevScore + 1)
      } else {
        setGameOver(true)
        clearInterval(timer)
      }
    }, 20)

    return () => clearInterval(timer)
  }, [score])

  const handleTryAgain = () => {
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
      <NeumorphicCard className="max-w-md w-full">
        <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">Oops! Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Looks like you&apos;ve ventured into uncharted territory!
        </p>
        <div className="mb-6">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</span>
          <span className="text-gray-600 dark:text-gray-400"> / 404</span>
        </div>
        {gameOver ? (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Game Over! You&apos;ve reached the legendary 404.</p>
            <button
              onClick={handleTryAgain}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:from-blue-500 hover:to-blue-700 mr-2"
            >
              Try Again <Zap className="inline-block ml-1" />
            </button>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-4">Loading your next quest...</p>
        )}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300 mt-4">
          <ChevronLeft className="mr-1" />
          Return to Home Base
        </Link>
      </NeumorphicCard>
    </div>
  )
}

export default NotFoundPage