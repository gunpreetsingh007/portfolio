'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TerminalSquare } from 'lucide-react'
import { projects } from '~/utils/constants'

const USER = 'guest'
const HOST = 'gunpreet.in'
const PROMPT = `${USER}@${HOST}:~$`

const EMAIL = 'gunpreetsingh077@gmail.com'
const PHONE = '+91 77809 03638'
const GITHUB = 'https://github.com/gunpreetsingh007'
const LINKEDIN = 'https://www.linkedin.com/in/gunpreet-singh-887006159/'

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'achievements', 'terminal', 'contact']

const SKILL_GROUPS: { category: string; skills: string[] }[] = [
  { category: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS'] },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'Python', 'REST APIs', 'WebSockets'] },
  { category: 'Database', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps & Cloud', skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'Linux'] },
]

const EXPERIENCES: { title: string; company: string; period: string }[] = [
  { title: 'Tech Lead', company: 'Just Virtual Food', period: 'Jul 2025 - Present' },
  { title: 'Associate Technical Lead', company: 'SafetyConnect', period: 'Nov 2023 - Jun 2025' },
  { title: 'Full Stack Developer', company: 'SafetyConnect', period: 'March 2022 - Oct 2023' },
  { title: 'Full Stack Developer', company: 'Innerloop Technologies Pvt. Ltd.', period: 'Feb 2021 - Feb 2022' },
  { title: 'Full Stack Developer & Software Architect', company: 'Freelance - Embark Perfumes', period: '' },
]

const ACHIEVEMENTS: { title: string; description: string }[] = [
  { title: 'Codathon Champion', description: "Secured 3rd place with 'Mbit' at the 'Codathon' by MIET Jammu." },
  { title: 'Employee of the Quarter', description: 'Earned the title thrice for consistent high performance.' },
  { title: 'Cloud Cost Optimization', description: 'Cut cloud expenses by ~65% through strategic optimizations.' },
]

function experienceYears(): number {
  const start = new Date(2021, 1)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  if (now.getMonth() < start.getMonth()) years--
  return years
}

// Small presentational helpers ------------------------------------------------

const Line = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`whitespace-pre-wrap break-words ${className}`}>
    {children === undefined || children === null || children === '' ? '\u00A0' : children}
  </div>
)

const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200"
  >
    {children}
  </a>
)

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Line className="font-semibold text-emerald-300">{children}</Line>
)

type Entry = { input?: string; output?: React.ReactNode }

const Terminal = () => {
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const openResume = useCallback(() => {
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
  }, [])

  // Command registry --------------------------------------------------------
  const commands = useMemo(() => {
    const registry: Record<
      string,
      { desc: string; hidden?: boolean; run: (args: string[]) => React.ReactNode | void }
    > = {}

    registry.help = {
      desc: 'List all available commands',
      run: () => {
        const names = Object.keys(registry).filter((n) => !registry[n]?.hidden).sort()
        return (
          <>
            <Line className="text-gray-400">Available commands — type any of these:</Line>
            <Line />
            {names.map((name) => (
              <Line key={name}>
                <span className="text-emerald-300">{name.padEnd(12)}</span>
                <span className="text-gray-400">{registry[name]?.desc}</span>
              </Line>
            ))}
            <Line />
            <Line className="text-gray-500">Tip: ↑/↓ for history · Tab to autocomplete.</Line>
          </>
        )
      },
    }

    registry.whoami = {
      desc: 'A quick one-liner about me',
      run: () => (
        <>
          <Line>Gunpreet Singh — Tech Lead & Full Stack Developer</Line>
          <Line className="text-gray-400">{experienceYears()}+ years shipping scalable, real-time web products end to end.</Line>
        </>
      ),
    }

    registry.about = {
      desc: 'More about who I am',
      run: () => (
        <>
          <Heading>About</Heading>
          <Line>
            Tech Lead and Full Stack Developer with {experienceYears()}+ years building efficient, scalable,
            and user-friendly web applications — from product UIs to cloud architecture.
          </Line>
          <Line className="text-gray-400">
            I treat every project like a new quest: overcome the challenge, unlock the achievement, ship it fast.
          </Line>
        </>
      ),
    }

    registry.skills = {
      desc: 'Technologies I work with',
      run: () => (
        <>
          <Heading>Skills</Heading>
          {SKILL_GROUPS.map((g) => (
            <Line key={g.category}>
              <span className="text-blue-300">{`${g.category}:`.padEnd(16)}</span>
              <span>{g.skills.join(', ')}</span>
            </Line>
          ))}
        </>
      ),
    }

    registry.experience = {
      desc: 'My work history',
      run: () => (
        <>
          <Heading>Experience</Heading>
          {EXPERIENCES.map((e, i) => (
            <Line key={i}>
              <span className="text-emerald-300">{e.title}</span>
              <span className="text-gray-300">{` @ ${e.company}`}</span>
              {e.period && <span className="text-gray-500">{`  (${e.period})`}</span>}
            </Line>
          ))}
        </>
      ),
    }

    registry.projects = {
      desc: 'Things I have built',
      run: () => (
        <>
          <Heading>Projects</Heading>
          {projects.map((p) => (
            <React.Fragment key={p.title}>
              <Line>
                <span className="text-emerald-300">{p.title}</span>
                <span className="text-gray-500">{` — ${p.badge}`}</span>
              </Line>
              <Line className="text-gray-400">{`  ${p.description}`}</Line>
              <Line>
                {'  ↳ '}
                <Link href={p.link}>{p.link}</Link>
              </Line>
            </React.Fragment>
          ))}
        </>
      ),
    }

    registry.achievements = {
      desc: 'Wins worth bragging about',
      run: () => (
        <>
          <Heading>Achievements</Heading>
          {ACHIEVEMENTS.map((a) => (
            <Line key={a.title}>
              <span className="text-yellow-300">★ </span>
              <span className="text-emerald-300">{a.title}</span>
              <span className="text-gray-400">{` — ${a.description}`}</span>
            </Line>
          ))}
        </>
      ),
    }

    registry.contact = {
      desc: 'How to reach me',
      run: () => (
        <>
          <Heading>Contact</Heading>
          <Line>
            <span className="text-gray-400">{'email   : '}</span>
            <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
          </Line>
          <Line>
            <span className="text-gray-400">{'phone   : '}</span>
            <span>{PHONE}</span>
          </Line>
          <Line>
            <span className="text-gray-400">{'github  : '}</span>
            <Link href={GITHUB}>{GITHUB}</Link>
          </Line>
          <Line>
            <span className="text-gray-400">{'linkedin: '}</span>
            <Link href={LINKEDIN}>{LINKEDIN}</Link>
          </Line>
        </>
      ),
    }

    registry.social = {
      desc: 'My profiles around the web',
      run: () => (
        <>
          <Line>
            <span className="text-gray-400">{'GitHub   '}</span>
            <Link href={GITHUB}>{GITHUB}</Link>
          </Line>
          <Line>
            <span className="text-gray-400">{'LinkedIn '}</span>
            <Link href={LINKEDIN}>{LINKEDIN}</Link>
          </Line>
        </>
      ),
    }

    registry.resume = {
      desc: 'Open my résumé (PDF)',
      run: () => {
        openResume()
        return (
          <Line className="text-gray-400">
            Opening <Link href="/resume.pdf">/resume.pdf</Link> … (if nothing opened, it may not be added yet)
          </Line>
        )
      },
    }

    registry.cv = { desc: 'Alias for resume', hidden: true, run: registry.resume.run }

    registry.ls = {
      desc: 'List sections of this site',
      run: () => (
        <Line>
          {SECTIONS.map((s) => (
            <span key={s} className="text-blue-300">{`${s}/  `}</span>
          ))}
          <span className="text-gray-300">resume.pdf</span>
        </Line>
      ),
    }

    registry.goto = {
      desc: 'Scroll to a section, e.g. `goto projects`',
      run: (args) => {
        const target = (args[0] ?? '').toLowerCase()
        if (!target) return <Line className="text-gray-400">Usage: goto &lt;section&gt; — try one of: {SECTIONS.join(', ')}</Line>
        if (!SECTIONS.includes(target)) {
          return <Line className="text-red-400">goto: no such section: {target}</Line>
        }
        scrollToSection(target)
        return <Line className="text-gray-400">Navigating to {target}…</Line>
      },
    }

    registry.echo = {
      desc: 'Print text back to the terminal',
      run: (args) => <Line>{args.join(' ')}</Line>,
    }

    registry.date = {
      desc: 'Show the current date & time',
      run: () => <Line>{new Date().toString()}</Line>,
    }

    registry.clear = { desc: 'Clear the terminal', run: () => undefined }

    // Easter eggs ----------------------------------------------------------
    registry.coffee = {
      desc: 'Brew a fresh cup ☕',
      run: () => (
        <>
          <Line className="text-amber-300">{'      ( ('}</Line>
          <Line className="text-amber-300">{'       ) )'}</Line>
          <Line className="text-amber-300">{'    ........'}</Line>
          <Line className="text-amber-300">{'    |      |]'}</Line>
          <Line className="text-amber-300">{'    \\      /'}</Line>
          <Line className="text-amber-300">{"     `----'"}</Line>
          <Line className="text-gray-400">Powered by coffee, late nights, and a sprinkle of anime magic.</Line>
        </>
      ),
    }

    registry.sudo = {
      desc: 'Run as superuser (nice try)',
      run: (args) => {
        if (args.join(' ').toLowerCase() === 'hire-me') {
          return (
            <Line className="text-emerald-300">
              Permission granted, let&apos;s talk: <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
            </Line>
          )
        }
        return (
          <>
            <Line className="text-red-400">{`[sudo] password for ${USER}: `}</Line>
            <Line className="text-gray-400">Nice try. {USER} is not in the sudoers file. This incident will be reported. 🙂</Line>
            <Line className="text-gray-500">(psst… try `sudo hire-me`)</Line>
          </>
        )
      },
    }

    return registry
  }, [openResume, scrollToSection])

  const commandNames = useMemo(() => Object.keys(commands), [commands])

  const banner = useMemo<React.ReactNode>(
    () => (
      <>
        <Line className="text-emerald-300">Welcome to gunpreet.in — interactive shell</Line>
        <Line className="text-gray-400">
          Type <span className="text-emerald-300">help</span> to see what I can do, or <span className="text-emerald-300">whoami</span> to start.
        </Line>
        <Line />
      </>
    ),
    [],
  )

  const [history, setHistory] = useState<Entry[]>([{ output: banner }])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      const echoEntry: Entry = { input: raw }

      if (trimmed === '') {
        setHistory((h) => [...h, echoEntry])
        return
      }

      setCmdHistory((h) => [...h, trimmed])

      const [name, ...args] = trimmed.split(/\s+/)
      const key = (name ?? '').toLowerCase()

      if (key === 'clear') {
        setHistory([])
        return
      }

      const command = commands[key]
      const output: React.ReactNode = command ? (
        command.run(args) ?? null
      ) : (
        <Line className="text-red-400">
          {key}: command not found. Type <span className="text-emerald-300">help</span> for a list.
        </Line>
      )

      setHistory((h) => [...h, echoEntry, { output }])
    },
    [commands],
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
      setHistoryIdx(null)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const next = historyIdx === null ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === null) return
      const next = historyIdx + 1
      if (next >= cmdHistory.length) {
        setHistoryIdx(null)
        setInput('')
      } else {
        setHistoryIdx(next)
        setInput(cmdHistory[next] ?? '')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const parts = input.split(/\s+/)
      if (parts.length > 1) return // only autocomplete the command name
      const frag = (parts[0] ?? '').toLowerCase()
      if (!frag) return
      const matches = commandNames.filter((n) => !commands[n]?.hidden && n.startsWith(frag))
      if (matches.length === 1) {
        setInput(matches[0] + ' ')
      } else if (matches.length > 1) {
        setHistory((h) => [
          ...h,
          { input },
          {
            output: (
              <Line>
                {matches.map((m) => (
                  <span key={m} className="text-emerald-300">{`${m}  `}</span>
                ))}
              </Line>
            ),
          },
        ])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  return (
    <section id="terminal" className="bg-gray-100 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 flex items-center justify-center text-4xl font-bold">
          <TerminalSquare className="mr-2 text-emerald-600" />
          Terminal
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-500 dark:text-gray-400">
          Prefer a keyboard? Explore my portfolio the developer way. Type{' '}
          <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm dark:bg-gray-800">help</code> to begin.
        </p>

        <div
          className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-700/60 bg-gray-950 shadow-2xl ring-1 ring-black/40"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900/80 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 select-none font-mono text-xs text-gray-400">{USER}@{HOST}: ~</span>
          </div>

          {/* Output */}
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed text-gray-200"
          >
            {history.map((entry, i) => (
              <div key={i}>
                {entry.input !== undefined && (
                  <Line>
                    <span className="text-emerald-400">{PROMPT}</span>
                    <span className="ml-2">{entry.input}</span>
                  </Line>
                )}
                {entry.output}
              </div>
            ))}

            {/* Active input line */}
            <div className="flex items-center">
              <span className="shrink-0 text-emerald-400">{PROMPT}</span>
              <div className="relative ml-2 flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-label="Terminal input"
                  className="w-full bg-transparent font-mono text-sm text-gray-100 caret-emerald-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Terminal
