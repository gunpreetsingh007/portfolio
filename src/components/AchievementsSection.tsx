'use client'

import AchievementCard from './AchievementCard'
import { Trophy } from 'lucide-react'
import { ACHIEVEMENTS } from '~/utils/resume'

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
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard
              key={achievement.title}
              title={achievement.title}
              description={achievement.description}
              badge={achievement.badge}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection