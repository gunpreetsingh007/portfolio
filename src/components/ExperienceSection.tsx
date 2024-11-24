'use client'

import { Briefcase } from 'lucide-react'
import ExperienceCard from './ExperienceCard'

const EXPERIENCES = [
  {
    title: 'Associate Technical Lead',
    company: 'SafetyConnect',
    period: 'Nov 2023 - Present',
    description: [
      'Conducted code reviews and managed a team of 5 developers, ensuring code quality and adherence to best practices.',
      'Managed the complete development lifecycle, consistently delivering new modules on time.',
    ],
    xp: '+3000',
    badge: 'Leadership Mastery',
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'SafetyConnect',
    period: 'March 2022 - Oct 2023',
    description: [
      'Optimized queries and database schema, reducing critical API response times by roughly 90%.',
      'Reduced cloud solution costs by 65% through strategic optimization and resource management.',
      'Stabilized product by addressing critical bugs and developed various modules, resulting in a 70% increase in product adoption and user engagement.',
    ],
    xp: '+2000',
    badge: 'Performance Guru',
  },
  {
    title: 'Full Stack Developer',
    company: 'Innerloop Technologies Pvt. Ltd.',
    period: 'Feb 2021 - Feb 2022',
    description: [
      'Spearheaded the development of Esnick, an e-commerce platform, enhancing user experience with features like local market discovery and home delivery services.',
      'Crafted an hybrid Android WebView application for Esnick, incorporating advanced features such as location tracking, push notifications via Firebase etc.',
      'Built a comprehensive merchant panel for managing products and a real-time chat system using Firebase, streamlining communication between merchants and customers.',
      'Developed administrative tools for order management and business oversight, including an admin panel for Esnick.',
    ],
    xp: '+1500',
    badge: 'E-Commerce Innovator',
  },
  {
    title: 'Full Stack Developer and Software Architect',
    company: 'Freelance - Embark Perfumes',
    description: [
      'Designed and developed a bespoke e-commerce platform for Embark Perfumes, a popular Indian Perfume brand.',
      'Implemented SEO strategies and responsive design principles to optimize visibility and accessibility across devices.',
      'Established a comprehensive admin panel for efficient product and inventory management.',
    ],
    xp: '+800',
    badge: 'Freelance Expert',
  },
]

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Briefcase className="mr-2 text-purple-600" />
          Quest Log
        </h2>
        <div className="space-y-12">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard
              key={experience.title}
              title={experience.title}
              company={experience.company}
              period={experience.period}
              description={experience.description}
              xp={experience.xp}
              badge={experience.badge}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection