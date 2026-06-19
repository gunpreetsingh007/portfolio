'use client'

import { Mail, Github, Linkedin, Send } from 'lucide-react'
import NeumorphicCard from './NeumorphicCard'
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

// Public access key from https://web3forms.com — safe to expose client-side.
const WEB3FORMS_ACCESS_KEY = '8b4706d9-9536-4a49-80d6-79f7d93d6c49';

const ContactSection = ({ experienceYears }: { experienceYears: number }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${formData.name}`,
          from_name: 'gunpreet.in',
          ...formData,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Send className="mr-2 text-red-600" />
          Get in Touch
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-stretch">
          <div className="mb-8 md:mb-0 md:w-1/2 flex">
            <NeumorphicCard className="flex-1 flex flex-col">
              <p className="text-lg mb-4">
                Ready to embark on a new adventure? With over {experienceYears} years of experience in crafting exceptional web solutions,
                I&apos;m always excited to take on new challenges and collaborations. Let&apos;s team up and create something extraordinary!
              </p>
              <p className="text-lg mb-2">Email: gunpreetsingh077@gmail.com</p>
              <p className="text-lg">Phone: +91 7780903638</p>
            </NeumorphicCard>
          </div>
          <div className="w-full md:w-1/2 max-w-md flex">
            <NeumorphicCard className="flex-1 flex flex-col">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" disabled={isSending} className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-700 transition duration-300 disabled:opacity-60">{isSending ? "Sending…" : "Send Message"}</button>
              </form>
            </NeumorphicCard>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-6">
          <a href="https://github.com/gunpreetsingh007" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/gunpreet-singh-887006159/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
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