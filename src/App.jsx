import styled from "styled-components";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Who from "./components/sections/Who";
import Works from "./components/sections/Works";
import Scroll from "./components/Scroll";
import "./styles/scroll.css"
import CookieBanner from "./cookies/CookieNotice";



const Container = styled.div`
  min-height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;

  color: white;
  background: center/cover no-repeat url("./img/bg.jpeg");

  
  scrollbar-width: none;
    
  &::-webkit-scrollbar{
    display: none;
  }

`;



function App() {
  return (
    <Scroll>
    <Container>
      <Hero id="home" />
      <Who id="studio" />
      <Works id="works" />
      <Contact id="contact" />
    </Container>
    <CookieBanner />
    </Scroll>
  );
}

export default App;
