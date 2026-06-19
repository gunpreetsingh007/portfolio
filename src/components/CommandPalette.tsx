'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search, User, Code, Briefcase, Star, Trophy, Send,
  Github, Linkedin, Mail, FileText, Moon, Sun, CornerDownLeft, TerminalSquare,
} from 'lucide-react'

interface CommandPaletteProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

type Command = {
  id: string
  label: string
  hint: string
  icon: React.ReactNode
  keywords?: string
  run: () => void
}

const CommandPalette = ({ isDarkMode, toggleDarkMode }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const goTo = useCallback((id: string) => {
    close()
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [close])

  const openLink = useCallback((url: string) => {
    close()
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [close])

  const commands = useMemo<Command[]>(() => [
    { id: 'about', label: 'Go to About', hint: 'Section', icon: <User size={16} />, run: () => goTo('about') },
    { id: 'skills', label: 'Go to Skills', hint: 'Section', icon: <Code size={16} />, run: () => goTo('skills') },
    { id: 'experience', label: 'Go to Experience', hint: 'Section', icon: <Briefcase size={16} />, run: () => goTo('experience') },
    { id: 'projects', label: 'Go to Projects', hint: 'Section', icon: <Star size={16} />, run: () => goTo('projects') },
    { id: 'achievements', label: 'Go to Achievements', hint: 'Section', icon: <Trophy size={16} />, run: () => goTo('achievements') },
    { id: 'terminal', label: 'Go to Terminal', hint: 'Section', icon: <TerminalSquare size={16} />, keywords: 'shell console cli', run: () => goTo('terminal') },
    { id: 'contact', label: 'Go to Contact', hint: 'Section', icon: <Send size={16} />, run: () => goTo('contact') },
    { id: 'resume', label: 'Download Résumé', hint: 'PDF', icon: <FileText size={16} />, keywords: 'cv pdf', run: () => openLink('/resume.pdf') },
    { id: 'theme', label: isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode', hint: 'Theme', icon: isDarkMode ? <Sun size={16} /> : <Moon size={16} />, keywords: 'dark light toggle', run: () => { toggleDarkMode(); close() } },
    { id: 'github', label: 'Open GitHub', hint: 'Link', icon: <Github size={16} />, keywords: 'code repo', run: () => openLink('https://github.com/gunpreetsingh007') },
    { id: 'linkedin', label: 'Open LinkedIn', hint: 'Link', icon: <Linkedin size={16} />, run: () => openLink('https://www.linkedin.com/in/gunpreet-singh-887006159/') },
    { id: 'email', label: 'Send an Email', hint: 'Link', icon: <Mail size={16} />, keywords: 'contact mail', run: () => openLink('mailto:gunpreetsingh077@gmail.com') },
  ], [isDarkMode, toggleDarkMode, goTo, openLink, close])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ''}`.toLowerCase().includes(q),
    )
  }, [query, commands])

  // Global ⌘K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[active]?.run()
    }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-gray-800">
              <Search size={18} className="text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100"
              />
              <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-xs text-gray-400 dark:border-gray-700 sm:block">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-gray-400">No results</p>
              ) : (
                filtered.map((c, i) => (
                  <button
                    key={c.id}
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={c.run}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      i === active
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className={i === active ? 'text-emerald-500' : 'text-gray-400'}>{c.icon}</span>
                    <span className="flex-1">{c.label}</span>
                    <span className="text-xs text-gray-400">{c.hint}</span>
                    {i === active && <CornerDownLeft size={14} className="text-gray-400" />}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5 text-xs text-gray-400 dark:border-gray-800">
              <span>Navigate with ↑ ↓ · Enter to select</span>
              <span className="font-medium">Gunpreet Singh</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
