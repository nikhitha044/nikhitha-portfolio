import { lazy, Suspense, useEffect } from 'react'
import AuroraBackground from './components/3d/AuroraBackground'
import Navbar from './components/navigation/Navbar'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Dimensions from './components/dimensions/Dimensions'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Workday from './components/workday/Workday'
import Skills from './components/skills/Skills'
import Recruitment from './components/recruitment/Recruitment'
import Resumes from './components/resumes/Resumes'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { trackEvent } from './lib/analytics'

// Internal-only hero animation comparison tool, reached via `?preview=hero`.
// Not linked from the nav and not part of the production render tree — this
// is the only integration point, and it's a no-op for every other URL.
const HeroPreviewPage = lazy(() => import('./components/hero-preview/HeroPreviewPage'))

function App() {
  const isHeroPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'hero'

  useEffect(() => {
    if (isHeroPreview) return
    trackEvent('page_view')
  }, [isHeroPreview])

  if (isHeroPreview) {
    return (
      <Suspense fallback={null}>
        <HeroPreviewPage />
      </Suspense>
    )
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AuroraBackground />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Dimensions />
        <Experience />
        <Projects />
        <Workday />
        <Skills />
        <Recruitment />
        <Resumes />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
