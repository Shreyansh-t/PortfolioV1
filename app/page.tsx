import HexCanvas from './components/HexCanvas'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import ArticlesSection from './components/ArticlesSection'
import ContactSection from './components/ContactSection'
import FooterStatusLine from './components/FooterStatusLine'

const DIVIDER = (
  <div style={{ borderTop: '1px solid rgba(200,169,106,0.08)' }} />
)

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Subtle scrolling hex dump — fixed behind all content */}
      <HexCanvas />

      {/* Gradient overlay for readability */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'rgba(17,19,21,0.62)' }}
        aria-hidden="true"
      />

      {/* Foreground */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <main>
          <HeroSection />
          {DIVIDER}
          <AboutSection />
          {DIVIDER}
          <ExperienceSection />
          {DIVIDER}
          <ProjectsSection />
          {DIVIDER}
          <ArticlesSection />
          {DIVIDER}
          <ContactSection />
        </main>
        <FooterStatusLine />
      </div>
    </div>
  )
}
