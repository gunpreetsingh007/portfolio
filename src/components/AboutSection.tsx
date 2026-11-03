'use client'

import { useEffect, useRef, useState } from "react"
import { User } from "lucide-react"
import { useInView } from "react-intersection-observer"
import NeumorphicCard from "./NeumorphicCard"

function CountUp({ target, suffix = "", run }: { target: number; suffix?: string; run: boolean }) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!run || started.current) return
    started.current = true
    const duration = 1200
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [run, target])

  return <span className="font-bold">{value}{suffix}</span>
}

function Avatar() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative mx-auto mb-6 h-32 w-32 shrink-0">
      {/* Soft ambient glow */}
      <div
        className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-emerald-400/50 to-blue-600/50 blur-md"
        aria-hidden
      />
      {/* The gradient only shows in the "GS" fallback state; the photo covers it otherwise. */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 shadow-xl ring-4 ring-white dark:ring-gray-800">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
            GS
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/gunpreet-singh.jpg"
            alt="Gunpreet Singh"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
      </div>
    </div>
  )
}

const AboutSection = ({
  experience,
  experienceYears,
}: {
  experience: string
  /** Rounded whole years — the count-up stat animates a number. */
  experienceYears: number
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <User className="mr-2 text-blue-600" />
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <NeumorphicCard>
            <Avatar />
            <p className="text-lg mb-6">
              I help early-stage founders turn an idea into a real product, and get it in front of their first users.
              I&apos;m a Tech Lead and Full Stack Engineer with {experience} of experience building production software.
            </p>
            <p className="text-lg mb-6">
              Most recently I was Technical Lead at Just Virtual Food, a foodtech company in Vienna, where I owned the
              architecture of three platforms used by 600+ restaurant partners across Austria, Germany and Switzerland.
              Before that, at SafetyConnect, I led ProcessSafety from scratch and cut API response times by about 90%.
            </p>
            <p className="text-lg">
              Code is only one part of an early product, so I work with two partners: a senior product manager and a
              marketing leader. Together we cover product, tech and marketing, from the first version to launch. I approach
              each project like a new quest: understand the problem, build it properly, ship it.
            </p>
          </NeumorphicCard>
          <NeumorphicCard>
            <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
            <ul ref={ref} className="space-y-3">
              <li className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <span>Years of Experience</span>
                {/* No "+" here: the figure is rounded up from 5y7m, so "6+" would overstate. */}
                <CountUp target={experienceYears} run={inView} />
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <span>Projects Completed</span>
                <CountUp target={20} suffix="+" run={inView} />
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <span>Technologies Mastered</span>
                <CountUp target={15} suffix="+" run={inView} />
              </li>
              <li className="flex justify-between">
                <span>Client Satisfaction</span>
                <CountUp target={100} suffix="%" run={inView} />
              </li>
            </ul>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
