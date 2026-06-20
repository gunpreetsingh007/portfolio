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
      {/* avatar.png already has the gradient backdrop baked in; the bg here is just a fallback for the "GS" state */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 shadow-xl ring-4 ring-white dark:ring-gray-800">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
            GS
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/avatar.png"
            alt="Gunpreet Singh"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
      </div>
    </div>
  )
}

const AboutSection = ({ experienceYears }: { experienceYears: number }) => {
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
              I&apos;m a Tech Lead and Full Stack Developer with over {experienceYears} years of experience in building efficient, scalable, and
              user-friendly web applications. My journey in tech has led me from crafting a wide range of websites across major categories to optimizing cloud solutions,
              always with an eye on innovation and performance.
            </p>
            <p className="text-lg">
              I approach each project like a new quest, ready to overcome challenges and unlock achievements. My expertise spans across
              modern web technologies, cloud platforms, and best practices in software development.
            </p>
          </NeumorphicCard>
          <NeumorphicCard>
            <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
            <ul ref={ref} className="space-y-3">
              <li className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <span>Years of Experience</span>
                <CountUp target={experienceYears} suffix="+" run={inView} />
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
