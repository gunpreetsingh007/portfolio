import Layout from '~/components/Layout'
import HeroSection from '~/components/HeroSection'
import SkillsSection from '~/components/SkillsSection'
import ExperienceSection from '~/components/ExperienceSection'
import ProjectsSection from '~/components/ProjectsSection'
import AchievementsSection from '~/components/AchievementsSection'
import ContactSection from '~/components/ContactSection'
import Footer from '~/components/Footer'
import Head from 'next/head'
import AboutSection from '~/components/AboutSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gunpreet Singh - Associate Tech Lead & Full Stack Developer</title>
        <meta name="description" content="Portfolio of Gunpreet Singh showcasing expertise in full stack development, cloud solutions, and project management." />
        <meta name="keywords" content="Gunpreet Singh, Full Stack Developer, Tech Lead, Portfolio, Web Development, React.js, Node.js, Next.js" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Gunpreet Singh" />
        <meta property="og:title" content="Gunpreet Singh - Portfolio" />
        <meta property="og:description" content="Explore my projects, skills, and experience in tech development." />
        <meta property="og:url" content="https://www.gunpreet.in" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/coding.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer />
      </Layout>
    </>
  )
}