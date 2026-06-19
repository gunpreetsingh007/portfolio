'use client'

import { Briefcase } from 'lucide-react'
import ExperienceCard from './ExperienceCard'

const EXPERIENCES = [
  {
    title: 'Tech Lead',
    company: 'Just Virtual Food',
    companyLink: 'https://just-virtual-food.com',
    period: 'Jul 2025 - Present',
    description: [
      'Lead backend architecture for a multi-tenant SaaS platform powering virtual food brands, built on Fastify, Prisma & TypeScript with BullMQ workers and AWS (S3/SQS).',
      'Designed a modular backend template (module-registry pattern, better-auth, Chargebee) that became the foundation for the platform\u2019s v2 rewrite.',
      'Shipped a full Sales CRM, analytics dashboards, global search, and an AI overview module, alongside PostHog product analytics.',
      'Built contract management with Documenso e-signatures, multi-language localization, and handled the migration of the platform to the new v2 architecture.',
    ],
    xp: '+3500',
    badge: 'Platform Architect',
  },
  {
    title: 'Associate Technical Lead',
    company: 'SafetyConnect',
    companyLink: 'https://safetyconnect.io',
    period: 'Nov 2023 - May 2025',
    description: [
      "Lead the development of ProcessSafety, an advanced template builder to transition paper-based workflows like permit to work, incident management, into efficient digital solutions.",
      'Conducted code reviews and managed a team of 5 developers, ensuring code quality and adherence to best practices.',
      'Managed the complete development lifecycle, consistently delivering new modules on time.',
    ],
    xp: '+3000',
    badge: 'Leadership Mastery',
  },
  {
    title: 'Full Stack Developer',
    company: 'SafetyConnect',
    companyLink: 'https://safetyconnect.io',
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
    companyLink: 'https://embarkperfumes.in',
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
              companyLink={'companyLink' in experience ? experience.companyLink : undefined}
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