import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      {/* Шапка */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-8 py-5">
        <span className="text-white font-bold text-lg md:text-xl tracking-wide">
          АТЛАС
          <span className="text-[#FFD700]">.</span>
          <span className="text-[#FFD700] font-light">энергосети</span>
        </span>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="tel:89375551144" className="hover:text-[#FFD700] transition-colors">
              8-937-555-11-44
            </a>
            <a href="mailto:ftkm@mail.ru" className="hover:text-[#FFD700] transition-colors">
              ftkm@mail.ru
            </a>
          </div>
          <a
            href="tel:89375551144"
            className="md:hidden text-sm font-semibold text-black bg-[#FFD700] px-4 py-2 rounded-md shadow-[0_0_14px_rgba(255,215,0,0.4)] hover:bg-[#FFA500] transition-colors"
          >
            Заявка
          </a>
        </div>
      </div>

      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}