import Layout from '~/components/Layout'
import HeroSection from '~/components/HeroSection'
import SkillsSection from '~/components/SkillsSection'
import ExperienceSection from '~/components/ExperienceSection'
import ProjectsSection from '~/components/ProjectsSection'
import AchievementsSection from '~/components/AchievementsSection'
import Terminal from '~/components/Terminal'
import ContactSection from '~/components/ContactSection'
import Footer from '~/components/Footer'
import Head from 'next/head'
import AboutSection from '~/components/AboutSection'

export default function Home() {
  // Calculate experience years dynamically starting from February 2021
  const startDate = new Date(2021, 1); // February (month index 1)
  const currentDate = new Date();
  let experienceYears = currentDate.getFullYear() - startDate.getFullYear();
  if (currentDate.getMonth() < startDate.getMonth()) {
    experienceYears--;
  }
  return (
    <>
      <Head>
        <title>Gunpreet Singh - Tech Lead & Full Stack Developer</title>
        <meta name="description" content="Portfolio of Gunpreet Singh, a Tech Lead & Full Stack Developer with 5+ years building scalable web apps, cloud solutions, and real-time products." />
        <meta name="keywords" content="Gunpreet Singh, Full Stack Developer, Tech Lead, Portfolio, Web Development, React.js, Node.js, Next.js, AWS, TypeScript" />
        <meta name="author" content="Gunpreet Singh" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://www.gunpreet.in/" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Gunpreet Singh" />
        <meta property="og:title" content="Gunpreet Singh - Tech Lead & Full Stack Developer" />
        <meta property="og:description" content="5+ years building scalable web apps, cloud solutions, and real-time products. Explore my projects, skills, and experience." />
        <meta property="og:url" content="https://www.gunpreet.in/" />
        <meta property="og:image" content="https://www.gunpreet.in/coding.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gunpreet Singh - Tech Lead & Full Stack Developer" />
        <meta name="twitter:description" content="5+ years building scalable web apps, cloud solutions, and real-time products." />
        <meta name="twitter:image" content="https://www.gunpreet.in/coding.png" />

        {/* Structured data: Person schema for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gunpreet Singh",
              url: "https://www.gunpreet.in/",
              jobTitle: "Tech Lead & Full Stack Developer",
              email: "mailto:gunpreetsingh077@gmail.com",
              sameAs: [
                "https://github.com/gunpreetsingh007",
                "https://www.linkedin.com/in/gunpreet-singh-887006159/",
              ],
              knowsAbout: [
                "React.js",
                "Node.js",
                "Next.js",
                "TypeScript",
                "AWS",
                "Cloud Architecture",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </Head>
      <Layout>
        <main>
          <HeroSection experienceYears={experienceYears}/>
          <AboutSection experienceYears={experienceYears}/>
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <Terminal />
          <ContactSection experienceYears={experienceYears}/>
        </main>
        <Footer />
      </Layout>
    </>
  )
}