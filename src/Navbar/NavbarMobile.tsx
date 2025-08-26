
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; 
import { useGeneralContext } from '../context/GeneralContext';
import Link from './Link';
import './Navbar.css';


function NavbarMobile() {
  const { isOpen, setIsOpenMenu } = useGeneralContext(); 
  const menuContainer = useRef(null);
  const timeline = useRef<gsap.core.Timeline>(null);

const menuLinks = [
    { href: "#info-section", text: "About Us", linkBoolean: true },
    { href: "#story-section", text: "Our Story", linkBoolean: false  },
    { href: "#sponsors-section", text: "Partners", linkBoolean: false  },
    { href: "#values-section", text: "Our Values", linkBoolean: false  },
    { href: "#governance-section", text: "Governance", linkBoolean: false  },
    { href: "#team-section", text: "Team", linkBoolean: false  },
    { href: "#contact-section", text: "Contact", linkBoolean: false  },
    
  ];

  useGSAP(() => {

    gsap.set(menuContainer.current, { autoAlpha: 0 }); 

    timeline.current = gsap.timeline({ paused: true });

    timeline.current.fromTo(menuContainer.current, { yPercent: -100, autoAlpha: 0 },
    { yPercent: 0, autoAlpha: 1, duration:0.1, ease: "none" });

    timeline.current.fromTo(".menu-background",   {
      xPercent: 50,
      yPercent: -50,
      scale: 0.25
    },
    {
      xPercent: 0,
      yPercent: 0,
      scale: 1.5,
      duration: 0.5, 
      ease: "none" 
      }, "<");     
    timeline.current.fromTo(".gradient", {
      autoAlpha: 0,
    }, {
      duration: 0.3,
      autoAlpha: 1,
      ease: "none"
    },"-=0.1"); 
    timeline.current.fromTo(".close-menu", { autoAlpha: 0 },
    { autoAlpha: 1, ease: "none" },"<-0.5");
    timeline.current.fromTo([".menu-logo", ".menu-socials"], {
      autoAlpha: 0,
      xPercent: 100 
    }, {
      duration: 0.2,
      autoAlpha: 1,
      xPercent: 0,
      ease: 'none'
    },"-=0.4"); 
    timeline.current.fromTo(".menu-links", {
      autoAlpha: 0,
      xPercent: -100 
    }, {
      duration: 0.2,
      autoAlpha: 1,
      xPercent: 0,
      ease: 'none'
    },"=-0.6"); 
    timeline.current.fromTo(".letter", {
      yPercent: 100, 
      opacity: 0,
      stagger: 0,
    }, {
      duration: 0.1,
      yPercent: 0,
      opacity: 1,
      stagger: 0.01,
      ease: 'power2.out',
    }, "-=0.5"); 

  }, { scope: menuContainer }); 

 useEffect(() => {
    if (timeline.current) {
      if (isOpen) {
        timeline.current.play();
      } else {
        timeline.current.reverse();
      }
    }
 }, [isOpen]);
  
  return (
      <div id="menu" ref={menuContainer}>
      <span className="menu-background"></span>
        <div className="menu-links">
        {menuLinks.map((link, index) => (
          <Link key={index} href={link.href} text={link.text} link={link.linkBoolean} />
        ))}
        </div>
        <button onClick={ ()=>{setIsOpenMenu(!isOpen)}} className="close-menu" aria-label="Close Menu">
            <img src="/icons/close_menu.svg" alt="" loading="lazy"/>
        </button>
        <img className="menu-logo" src="/logos/big_logo-min.png" alt="" loading="lazy"/>
        <div className="menu-socials">
            <a href="https://www.linkedin.com/company/swanson-reserve-capital/?viewAsMember=true" target="_blank">
                <img src="/icons/linkedin.svg" alt="" loading="lazy" width="80" height="80"/>
            </a>
            <a href="https://www.youtube.com/channel/UCuepZYWsB97JJq3K1gmqpJQ" target="_blank">
                <img src="/icons/youtube.svg" alt="" loading="lazy" width="80" height="80"/>
            </a>
        </div>
        <span className="gradient"></span>
        <span className="gradient"></span>
    </div>
  );
}

export default NavbarMobile;
