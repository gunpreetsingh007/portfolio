'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Github, Linkedin } from 'lucide-react'

const ROLES = [
  'scalable APIs',
  'real-time apps',
  'cloud architecture',
  'developer tools',
  'delightful UX',
]

const HeroSection = ({ experienceYears }: { experienceYears: number }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 })

  // Typing rotator state
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx] ?? ''
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1))
      }, deleting ? 45 : 85)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  const handleMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Lightweight animated gradient background (replaces the heavy 3D canvas) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950" />
        <motion.div
          className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mouse-reactive spotlight */}
        <div
          className="absolute inset-0 transition-[background] duration-200"
          style={{
            background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(16,185,129,0.12), transparent 45%)`,
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <motion.p
          className="mb-4 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech Lead & Full Stack Developer · {experienceYears}+ years
        </motion.p>

        <motion.h1
          className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hi, I&apos;m Gunpreet Singh
        </motion.h1>

        <motion.div
          className="mb-6 text-2xl font-medium text-gray-200 md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          I build{' '}
          <span className="text-emerald-400">{text}</span>
          <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-emerald-400 align-middle md:h-7" />
        </motion.div>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Full-stack engineer shipping products end to end — cutting API latency by
          ~90%, slashing cloud costs by ~65%, and turning complex ideas into
          reliable, real-time experiences.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-7 py-3 font-semibold text-white transition hover:from-emerald-500 hover:to-emerald-700"
          >
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          {/* Résumé button hidden until a resume PDF is available
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            <FileText size={18} /> Résumé
          </a>
          */}
          <div className="flex items-center gap-4 sm:ml-2">
            <a href="https://github.com/gunpreetsingh007" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 transition hover:text-white">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/gunpreet-singh-887006159/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 transition hover:text-white">
              <Linkedin size={22} />
            </a>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Press{' '}
          <kbd className="rounded border border-gray-700 bg-gray-800/80 px-1.5 py-0.5 text-xs text-gray-300">⌘ K</kbd>
          {' '}to navigate
        </motion.p>
      </div>

      <motion.button
        onClick={() => handleScrollTo('about')}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 transition hover:text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}

export default HeroSection
