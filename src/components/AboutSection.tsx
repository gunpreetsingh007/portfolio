'use client'

import { User } from "lucide-react"
import NeumorphicCard from "./NeumorphicCard"

const AboutSection = ({ experienceYears }: { experienceYears: number }) => {

    return (
        <section
            id="about"
            className="py-20 bg-gray-100 dark:bg-gray-800"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
                   <User className="mr-2 text-blue-600" />
                    About Me
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <NeumorphicCard>
                        <p className="text-lg mb-6">
                            I&apos;m an Associate Tech Lead and Full Stack Developer with over {experienceYears} years of experience in building efficient, scalable, and
                            user-friendly web applications. My journey in tech has led me from crafting wide range of websites across major categories to optimizing cloud solutions,
                            always with an eye on innovation and performance.
                        </p>
                        <p className="text-lg">
                            I approach each project like a new quest, ready to overcome challenges and unlock achievements. My expertise spans across
                            modern web technologies, cloud platforms, and best practices in software development.
                        </p>
                    </NeumorphicCard>
                    <NeumorphicCard>
                        <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>Years of Experience</span>
                                <span className="font-bold">{experienceYears}+</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Projects Completed</span>
                                <span className="font-bold">20+</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Technologies Mastered</span>
                                <span className="font-bold">15+</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Client Satisfaction</span>
                                <span className="font-bold">100%</span>
                            </li>
                        </ul>
                    </NeumorphicCard>
                </div>
            </div>
        </section>
    )
}

export default AboutSection