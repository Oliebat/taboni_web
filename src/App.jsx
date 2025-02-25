import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Who from './components/sections/Who'
import Portfolio from './components/sections/Portfolio'
import Scroll from './components/Scroll'
import './styles/scroll.css'
import CookieBanner from './cookies/CookieNotice'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Value from './components/sections/Value'

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

function App() {
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
          <Value id='value' />
          <Portfolio id='portfolio' />
          <Contact id='contact' />
        </main>
      </Container>
      <CookieBanner />
    </Scroll>
  )
}

export default App