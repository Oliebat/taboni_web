import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Who from './components/sections/Who'
import Works from './components/sections/Works'
import Portfolio from './components/sections/Portfolio'
import Scroll from './components/Scroll'
import './styles/scroll.css'
import CookieBanner from './cookies/CookieNotice'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import { ModelsProvider, useModelsLoaded } from './context/ModelContext'

const Container = styled.div`
  min-height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  opacity: 0;
  color: white;
  background: center/cover no-repeat url('./img/bg.webp');
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

// Optionnel : si vous souhaitez afficher un loader pendant le préchargement
function AppContent() {
  const ref = useRef(null)


  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, { opacity: 1, duration: 1, ease: 'sine.out' })
    }
  }, [])


  return (
    <Scroll>
      <Container ref={ref}>
        <Navbar />
        <main>
          <Hero id='home' />
          <Who id='studio' />
          <Works id='works' />
          <Portfolio id='portfolio' />
          <Contact id='contact' />
        </main>
      </Container>
      <CookieBanner />
    </Scroll>
  )
}

function App() {
  return (
    <ModelsProvider>
      <AppContent />
    </ModelsProvider>
  )
}

export default App
