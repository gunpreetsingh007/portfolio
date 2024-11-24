'use client'

import { Mail, Github, Linkedin, Send } from 'lucide-react'
import NeumorphicCard from './NeumorphicCard'

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Send className="mr-2 text-red-600" />
          Start a New Quest
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-stretch">
          <div className="mb-8 md:mb-0 md:w-1/2 flex">
            <NeumorphicCard className="flex-1 flex flex-col">
              <p className="text-lg mb-4">
                Ready to embark on a new adventure? With over 3 years of experience in crafting exceptional web solutions,
                I&apos;m always excited to take on new challenges and collaborations. Let&apos;s team up and create something extraordinary!
              </p>
              <p className="text-lg mb-2">Email: gunpreetsingh077@gmail.com</p>
              <p className="text-lg">Phone: +91 7780903638</p>
            </NeumorphicCard>
          </div>
          <div className="w-full md:w-1/2 max-w-md flex">
            <NeumorphicCard className="flex-1 flex flex-col">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-700 transition duration-300">Send Message</button>
              </form>
            </NeumorphicCard>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-6">
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            <Linkedin size={24} />
          </a>
          <a href="mailto:gunpreetsingh077@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection