'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { CSSProperties, MouseEventHandler } from 'react'
import { projects } from '~/utils/constants'
import ProjectCard from './ProjectCard'

interface ArrowProps {
  className?: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SampleNextArrow = ({ style, onClick }: ArrowProps) => {
  return (
    <div
      className={`next-arrow z-10`}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: "-32px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ChevronRight size={24} className="text-white" />
    </div>
  )
}

const SamplePrevArrow = ({ style, onClick }: ArrowProps) => {
  return (
    <div
      className={`prev-arrow z-10`}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "-32px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ChevronLeft size={24} className="text-white" />
    </div>
  )
}

const ProjectsSection = () => {
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setSlidesToShow(1)
        setIsMobile(true)
      } else if (width < 1024) {
        setSlidesToShow(2)
        setIsMobile(false)
      } else {
        setSlidesToShow(3)
        setIsMobile(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    touchThreshold: 10,
    // Hide arrows on mobile:
    arrows: !isMobile,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-gray-900" id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center">
          <Star className="mr-2 text-yellow-600" />
          Highlighted Quests
        </h2>
        <div className="relative md:px-8">
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="h-full">
                <ProjectCard {...project} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection