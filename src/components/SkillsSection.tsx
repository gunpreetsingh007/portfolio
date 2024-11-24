'use client'

import { Code } from 'lucide-react'
import SkillBar from './SkillBar'

const SKILLS = [
  { name: 'React.js', level: 95, description: 'Expert in building complex, interactive UIs', category: 'Frontend' },
  { name: 'Node.js', level: 95, description: 'Proficient in server-side JavaScript development', category: 'Backend' },
  { name: 'Express.js', level: 95, description: 'Building robust RESTful APIs', category: 'Backend' },
  { name: 'Next.js', level: 92, description: 'SSR and static site generation specialist', category: 'Backend' },
  { name: 'JavaScript', level: 90, description: 'Versatile across frontend and backend development', category: 'Backend' },
  { name: 'TypeScript', level: 90, description: 'Strong typing for large-scale applications', category: 'Backend' },
  { name: 'Redux', level: 88, description: 'State management for scalable applications', category: 'Frontend' },
  { name: 'AWS', level: 80, description: 'Cloud infrastructure and serverless architecture', category: 'DevOps' },
  { name: 'Docker', level: 80, description: 'Containerization and deployment', category: 'DevOps' },
  { name: 'Azure', level: 75, description: 'Cloud infrastructure and services', category: 'DevOps' },
  { name: 'PHP', level: 80, description: 'Efficient web server scripting and integration', category: 'Backend' },
  { name: 'Laravel', level: 80, description: 'Building robust PHP applications', category: 'Backend' },
  { name: 'Python', level: 80, description: 'Automation and scripting', category: 'Backend' },
  { name: 'PostgreSQL', level: 85, description: 'Relational database management', category: 'Database' },
  { name: 'MySQL', level: 80, description: 'Efficient database design and querying', category: 'Database' },
  { name: 'MongoDB', level: 78, description: 'NoSQL database for scalable applications', category: 'Database' },
  { name: 'Redis', level: 80, description: 'In-memory caching for high performance', category: 'Database' },
]

const SkillsSection = () => {
  return (
    <section className="min-h-screen w-full py-20 bg-gray-100 dark:bg-gray-800" id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex text-center justify-center">
          <Code className="mr-2 mt-2 text-green-600" />
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection