'use client'

import { motion } from 'framer-motion'
import Image from "next/image";

interface ProjectCardProps {
  title: string
  description: string
  link: string
  badge: string
  image: string
  keyPoints: string[]
}

const ProjectCard = ({ title, description, link, badge, image, keyPoints }: ProjectCardProps) => {
  return (
    (<div className="px-4 py-4">
      <motion.div
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        className="bg-white rounded-xl overflow-hidden shadow-lg dark:bg-gray-800 h-full flex flex-col"
      >
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }} />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4">{description}</p>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside mb-4 ml-4">
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-auto">
            <a
              href={link}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300"
            >
              View Quest
            </a>
            <span className="inline-block bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          </div>
        </div>
      </motion.div>
    </div>)
  );
}

export default ProjectCard