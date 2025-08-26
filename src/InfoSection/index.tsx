import {useRef} from "react"
import ModelScene from "./ModelScene"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import "./infoSecction.css"


function InfoSection() {
  const sectionRef = useRef(null);
  const logoContainerRef = useRef(null);
  const rowInfo1 = useRef(null);
  const rowInfo2 =  useRef(null);

  const animationProxy = useRef({ 
    baseSpeed: 0.8,
    extraSpeed: 0,
    direction: 1
  }).current;

useGSAP(() => {

    //const logoTimeline = gsap.timeline();
    //const DURATION = 10;
 
  
   gsap.fromTo(
      ".logo-wrapper",
      {
        autoAlpha:1,
        x: "100vw",
        y: "-50vh",
      },
      {
        autoAlpha:1,
        x: "0vw",
        y: "0vh",
        ease: "none", 
        scrollTrigger: {
          trigger: sectionRef.current, 
          start: "top center", 
          end: "top top", 
          scrub: 1, 
        },
      }
    );
    const cardsTimelineRow1 = gsap.timeline({
      scrollTrigger: {
        trigger: rowInfo1.current,
        start: 'top bottom',
        endTrigger: sectionRef.current,
          //end: "+=500",
        end:"top 10%",
        scrub: true,
        //markers: true,
      }
    });
  
      const cardsTimelineRow2 = gsap.timeline({
      scrollTrigger: {
        trigger: rowInfo2.current,
        start: 'top bottom',
        endTrigger:  rowInfo2.current,
          //end: "+=500",
        end:"top 10%",
        scrub: true,
        //markers: true,
      }
    });


    gsap.utils.toArray<HTMLDivElement>('.row-info:nth-child(1) .info').forEach((card:HTMLDivElement) => {
      const isLeft = card.classList.contains('left');
      cardsTimelineRow1 .fromTo(card, {
        xPercent: isLeft ? -50 : 50,
        yPercent: 50,
        rotation: isLeft ? 10 : -10,
        ease: 'none',
      },{
        xPercent: isLeft ? 0 : 0,
        yPercent: 0,
        rotation: isLeft ? 0 : 0,
        ease: 'none',
        duration:0.5
      }, 0); 
    });
    gsap.utils.toArray<HTMLDivElement>('.row-info:nth-child(2) .info').forEach((card:HTMLDivElement) => {
      const isLeft = card.classList.contains('left');
      cardsTimelineRow2 .fromTo(card, {
        xPercent: isLeft ? -50 : 50,
        yPercent: 50,
        rotation: isLeft ? 10 : -10,
        ease: 'none',
      },{
        xPercent: isLeft ? 0 : 0,
        yPercent: 0,
        rotation: isLeft ? 0 : 0,
        ease: 'none',
        duration:0.5
      }, 0); 
    });

   
    ScrollTrigger.create({
      //animation: logoTimeline,
      trigger: sectionRef.current, 
      pin: logoContainerRef.current, 
      //pinSpacer:".logo-wrapper",
      start: 'top top',
      endTrigger: "#net-section",
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const direction = self.direction;
        animationProxy.direction = direction;
      
      const targetExtraSpeed = gsap.utils.clamp(0, 10.0, Math.abs(velocity) * 0.050);
        
        gsap.to(animationProxy, {
          extraSpeed: targetExtraSpeed,
          duration: 0.1,
          ease: 'power2.out',
        });
      },
      //@ts-expect-error ingnorar
       onStop: () => {
        gsap.to(animationProxy, {
          extraSpeed: 0,
          duration: 0.1, 
          ease: 'power2.in',
        });
      },
        onLeave: () => {
        gsap.to(animationProxy, {
            extraSpeed: 0,
            duration: 0.2, // Muy corto
            ease: 'power2.out',
        });
    },
    
    onLeaveBack: () => {
        gsap.to(animationProxy, {
            extraSpeed: 0,
            duration: 0.2,
            ease: 'power2.out',
        });
    },
      //end: '+=2000', 
      scrub: 1.5,
      //markers: true,
    });

  },);
return (
<section id="info-section"  ref={sectionRef}>
    <div className="row-info" ref={rowInfo1}>
        <div className="info left">
            <p>
                Unlock Alternative Fixed Income Strategies that may assist
                with living expenses, mortgage, or children's tuition.
            </p>
            <div className="media">

                <video className="info-video" muted loop={true} preload="metadata" playsInline={true} autoPlay>
                    <source src="/videos/FerrariHomecoming-Mansion+KidsB-roll.mp4"
                        type="video/mp4" />
                </video>
            </div>
        </div>
        <div className="info right">
            <p>
                Weather the storm with a proprietary blend of Institutional backed fixed income offering
                deep downside protections, with potential double digit yields.
            </p>
            <div className="media">
                <video className="info-video" muted loop preload="metadata" playsInline={true} autoPlay>
                    <source src="/videos/rainy.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    </div>
    <div className="row-info"  ref={rowInfo2}>
        <div className="info left">
            <p>
                Rigorous emphasis on low-draw downs, and risk-adjusted returns
                un-correlated to broader market.
            </p>
            <div className="media">

                <video className="info-video" muted loop preload="metadata" playsInline={true} autoPlay>
                    <source src="/videos/BullvsBearShowdownClash.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
        <div className="info right">
            <p>
                We truly believe our fund is the kicking down the doors of
                Alternative Investment innovation, we invite you join us on
                the journey.
            </p>
            <div className="media">
                <video className="info-video" muted loop preload="metadata" playsInline={true} autoPlay>
                    <source src="/videos/BlackFerarriPrivateJetHangar.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    </div>
    <div className="logo-container" ref={logoContainerRef}>
        <div className="logo-wrapper">
            <ModelScene animationProxy={animationProxy} />
        </div>
    </div>
</section>
  );
}

export default InfoSection; 

