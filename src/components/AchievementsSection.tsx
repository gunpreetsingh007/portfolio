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
            description="Secured 3rd place with 'Mbit' at the prestigious 'Codathon' by MIET Jammu, showcasing leadership and coding expertise."
            badge="+1000 XP"
          />
          <AchievementCard
            title="Employee of the Quarter"
            description="Earned the title thrice, demonstrating unwavering commitment, superior problem-solving, and consistently high performance."
            badge="Consistency Master"
          />
          <AchievementCard
            title="Cloud Cost Optimization"
            description="Reduced cloud expenses by 65% through strategic optimizations, highlighting exceptional resource management and cost-saving techniques."
            badge="Efficiency Expert"
          />
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection