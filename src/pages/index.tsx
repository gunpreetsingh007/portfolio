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
import ReferencesSection from '~/components/ReferencesSection'
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
        <title>Gunpreet Singh - Tech Lead helping founders build their first product</title>
        {/* Duration is interpolated from the build-time value — never hardcode it. */}
        <meta name="description" content={`Gunpreet Singh helps early-stage founders build and launch their first product. Tech Lead and Full Stack Engineer with ${builtExperience} of experience, working with product and marketing partners.`} />
        <meta name="keywords" content="Gunpreet Singh, Tech Lead, Full Stack Engineer, MVP development, startup consultant, first product, React.js, Node.js, Next.js, AWS, TypeScript, AI agents" />
        <meta name="author" content="Gunpreet Singh" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://www.gunpreet.in/" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Gunpreet Singh" />
        <meta property="og:title" content="Gunpreet Singh - Tech Lead helping founders build their first product" />
        <meta property="og:description" content={`I help early-stage founders build and launch their first product. Tech Lead with ${builtExperience} of experience, plus product and marketing partners.`} />
        <meta property="og:url" content="https://www.gunpreet.in/" />
        {/* og-card.jpg is exported from og-card.html at exactly 1200×630 — keep these in step. */}
        <meta property="og:image" content="https://www.gunpreet.in/og-card.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gunpreet Singh, Tech Lead helping early-stage founders build their first product" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gunpreet Singh - Tech Lead helping founders build their first product" />
        <meta name="twitter:description" content={`I help early-stage founders build and launch their first product. Tech Lead with ${builtExperience} of experience.`} />
        <meta name="twitter:image" content="https://www.gunpreet.in/og-card.jpg" />

        {/* Structured data: Person schema for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gunpreet Singh",
              url: "https://www.gunpreet.in/",
              // A real photo here is what lets Google pair the name with a face.
              image: "https://www.gunpreet.in/gunpreet-singh.jpg",
              jobTitle: "Tech Lead & Full Stack Engineer",
              description:
                "Tech Lead and Full Stack Engineer who helps early-stage founders build and launch their first product.",
              address: { "@type": "PostalAddress", addressLocality: "Jammu", addressCountry: "IN" },
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
                "MVP Development",
                "LLM Agents",
              ],
            }),
          }}
        />
      </Head>
      <Layout>
        <main>
          <HeroSection experience={experience}/>
          <AboutSection experience={experience} experienceYears={experienceYears}/>
          <ReferencesSection />
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