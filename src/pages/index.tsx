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
import { experienceYearsRounded, formatExperienceApprox } from '~/utils/resume'
import { useExperience } from '~/utils/useExperience'

/**
 * Experience duration is computed at build time and serialised into the page, so
 * hydration matches the prerendered HTML exactly. `useExperience` then refreshes
 * it against the visitor's own date — see src/utils/useExperience.ts.
 */
export function getStaticProps() {
  return {
    props: {
      experienceYears: experienceYearsRounded(),
      builtExperience: formatExperienceApprox(),
    },
  }
}

export default function Home({
  experienceYears,
  builtExperience,
}: {
  experienceYears: number
  builtExperience: string
}) {
  const experience = useExperience(builtExperience)

  return (
    <>
      <Head>
        <title>Gunpreet Singh - Tech Lead & Full Stack Developer</title>
        {/* Duration is interpolated from the build-time value — never hardcode it. */}
        <meta name="description" content={`Portfolio of Gunpreet Singh, a Tech Lead & Full Stack Developer with ${builtExperience} building scalable web apps, cloud solutions, and real-time products.`} />
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
        <meta property="og:description" content={`${builtExperience} building scalable web apps, cloud solutions, and real-time products. Explore my projects, skills, and experience.`} />
        <meta property="og:url" content="https://www.gunpreet.in/" />
        <meta property="og:image" content="https://www.gunpreet.in/coding.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gunpreet Singh - Tech Lead & Full Stack Developer" />
        <meta name="twitter:description" content={`${builtExperience} building scalable web apps, cloud solutions, and real-time products.`} />
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
          <HeroSection experience={experience}/>
          <AboutSection experience={experience} experienceYears={experienceYears}/>
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <Terminal />
          <ContactSection experience={experience}/>
        </main>
        <Footer />
      </Layout>
    </>
  )
}