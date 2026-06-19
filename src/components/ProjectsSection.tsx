'use client'

import { Star } from 'lucide-react'
import { projects } from '~/utils/constants'
import ProjectCard from './ProjectCard'

const ProjectsSection = () => {
  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-gray-900" id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Star className="mr-2 text-yellow-600" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
