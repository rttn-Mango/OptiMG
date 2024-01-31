import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import ScaleLoader from 'react-spinners/ScaleLoader';
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { Analytics } from '@vercel/analytics/react';

//Pages/Components
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import OpenedHamburgerNav from './Components/OpenedHamburgerNav';
import { Suspense, lazy } from "react";

//Lazy loaded Pages
const Homepage = lazy(() => import("./Pages/Homepage"))
const Compress = lazy(() => import("./Pages/Compress"))
const Convert = lazy(() => import("./Pages/Convert"))

//Icon
import burger from '/public/burger.svg'

function App() {
  const [isOpened, setIsOpened] = useState(null);

  //To open or close the Hamburger Navigation
  useEffect(() =>{
    const menu = document.querySelector('.floating-menu');

    const handleBurgerMenu = () => {
      if(isOpened){
        menu.classList.add('show');
        document.body.classList.add('disabled');
      }
      else{
        menu.classList.remove('show');
        document.body.classList.remove('disabled');
      }
    }

    handleBurgerMenu();
  }, [isOpened])

  //Smooth scrolling effect
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf);
  }, [])

  //Floating Burger Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.floating-burger', {scale: 0, opacity: 0}, {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      },
      scrollTrigger: {
        trigger: '#trigger',
        scrub: 1,
        start: '10% top',
        end: '10% top',
      }
    })
  }, [])

  return (
    
    <>
      <Header setIsOpened={setIsOpened}/>
      <div className="floating-burger">
        <button type="button" onClick={() => setIsOpened(true)}><img src={burger} alt="Open Nav" draggable="false" height={50} width={50}/></button>
      </div>
      <div className="floating-menu">
        <OpenedHamburgerNav setIsOpened={setIsOpened}/>
      </div>
      <Suspense fallback={<div aria-hidden='true' className="loading-fallback"> <ScaleLoader color="#fff" size={100}/> </div>}>
        <Routes>
          <Route index path="/" element={<Homepage/>}/>
          <Route path="/compress" element={<Compress/>}/>
          <Route path="/convert" element={<Convert/>}/>
        </Routes>
      </Suspense>
      <Footer/>
      <Analytics />
    </>
  )
}

export default App
