
import { useRef,useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; 
import { useGeneralContext } from '../context/GeneralContext';


export default function Link({href,text, link}:{href:string,text:string, link:boolean}) {
  const linkContainer = useRef(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  const { mainScroller, setIsOpenMenu } = useGeneralContext(); 
  
  const handleNavLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      
      if (!mainScroller) {
        console.warn("ScrollSmoother not ready yet.");
        return;
      }
      const link = event.currentTarget;
      const target = link.getAttribute('href');
      if (!target || !target.startsWith('#')) return;
  
       //const offset = parseInt(link.dataset.offset || '0', 10);
  
    mainScroller.scrollTo(target, true); 
    setIsOpenMenu(false)
  
  
  }, [mainScroller]); 
  
  useGSAP(() => {

    timeline.current = gsap.timeline({ paused: true });

    timeline.current.fromTo(".letter", {
      color:"#ffffff",
    }, {
      duration: 0.3,
      color:"#dcc562",
      stagger: 0.05,
      ease: 'none',
    },); 

  }, { scope: linkContainer }); 

  const handleMouseEnter = () => {
      if (timeline.current) {
        timeline.current.play();
      }
  }
  const handleMouseLeave = () => {
      if (timeline.current) {
        timeline.current.reverse();
      }
  }

  return (

          <a ref={linkContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={link?handleNavLinkClick:()=>null} href={href}>
            {text.split("").map((char, i) => (
              <div key={i} className="letter" style={{ display: 'inline-block', position: 'relative' }}>
                {char === " " ? "\u00A0" : char}
              </div>
            ))}
          </a>
  );
}

