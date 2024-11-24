'use client'

import AchievementCard from './AchievementCard'
import { Trophy } from 'lucide-react'

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="py-20 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Trophy className="mr-2 text-orange-600" />
          Achievements
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AchievementCard
            title="Codathon Champion"
            description="Secured 3rd place with the project Mbit at the 'Codathon' event hosted by MIET Jammu."
            badge="+1000 XP"
          />
          <AchievementCard
            title="Employee of the Quarter"
            description="Recognized as 'Employee of the Quarter' for three consecutive terms, showcasing consistent high performance."
            badge="Consistency Master"
          />
          <AchievementCard
            title="Cloud Cost Optimization"
            description="Implemented strategies that reduced cloud solution costs by 65%, saving the company significant resources."
            badge="Efficiency Expert"
          />
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection