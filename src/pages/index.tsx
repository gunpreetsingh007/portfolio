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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
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
          <ContactSection experienceYears={experienceYears}/>
        </main>
        <Footer />
      </Layout>
    </>
  )
}