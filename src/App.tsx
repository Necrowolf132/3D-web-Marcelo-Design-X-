import { useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { NavbarDesktop, NavbarMobile } from "./Navbar"
import InfoSection from './InfoSection';
import GradientsBackgound from './Effects/GradientsBackground.tsx';
import { useGeneralContext } from './context/GeneralContext.tsx'; 
import HeroSection from "./HeroHeader";
import NetSection from './NetSection';
import Logo from "./Logo"


gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin,SplitText);

function App() {
  const { setMainScroller, loaded } = useGeneralContext()
  useGSAP(() => {

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2.2, 
      smoothTouch: 2.2, 
      effects: true,
      normalizeScroll: true, 
    });
    setMainScroller(smoother)
    ScrollToPlugin.config({autoKill:true})
    return () => smoother.kill(); 


  });
  const { contextSafe } = useGSAP()

  const OffPreloder = contextSafe(useCallback(() => {
    gsap.timeline().to('html,body', { overflow: 'hidden' })
      .to(".brand-logo", { autoAlpha: 0 },"<")
      .to("header", { autoAlpha: 0 },"<")
      .to(".hero-contents", { autoAlpha: 0 },"<")
      .to('.preloader', { autoAlpha: 0, duration: 0.3 })
      .to(window, { scrollTo: 0 })
      .fromTo("main", {autoAlpha: 0}, { duration:0.5, autoAlpha:1},"<")
      .to(".brand-logo", { duration: 0.6, autoAlpha: 1 },"+=0.3")
      .to("header", { duration: 0.6, autoAlpha: 1 },"<")
      .to(".hero-contents", { duration: 0.6, autoAlpha: 1 }, "<")
      .to('html,body', { overflow: 'inherit' });
  },[]))
  
  const ONPreloder = contextSafe(useCallback(() => {
    const animationLoadedOn = gsap.timeline()
    animationLoadedOn.to('html,body', { overflow: 'hidden' }).to(window, { duration:0.1, scrollTo: 800 }).to('.preloader', { autoAlpha: 1, duration: 0.5 });
  },[]))
  useEffect(() => {
    if (loaded) {
      OffPreloder()
    } else {
      ONPreloder()
    }
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  },[loaded])

  return (
    <>
      <div className="preloader">
        <img src="/logos/big_logo-min.png" alt="logo" width="601" height="516" />
      </div>
      <Logo/>
      <header>
        <NavbarDesktop></NavbarDesktop>
      </header>
      <NavbarMobile></NavbarMobile>
      <GradientsBackgound></GradientsBackgound> 
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
            <HeroSection/>
            <InfoSection/>
            <NetSection/>
            </main>
          </div>
        </div>
    </>
  )
}

export default App
