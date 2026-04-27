import { useTheme } from './hooks/useTheme'
import Navbar from './components/NavBar'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Process from './sections/Process'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
