import { useRef } from 'react';
import { gsap } from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import "./gradientsBackground.css"


function GradientsBackground() {
  const gradients = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (gradients.current) {
            gsap.to("div:nth-child(1)>span, div:nth-child(9)>span", {
                autoAlpha: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "bottom center",
                    endTrigger: "#hero-section",
                    end: "bottom 40%",
                    scrub: true,
                    //markers: true,
                },
            })
            gsap.to("div:nth-child(1)>span, div:nth-child(9)>span", {
                autoAlpha: 0,
                scrollTrigger: {
                    trigger: "#net-section",
                    start: "top 20%",
                    endTrigger: "#net-section",
                    end: "top 10%",
                    scrub: true,
                    //markers: true,
                }
            })
            gsap.to("div:nth-child(4)>span", {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: "#net-section",
                    start: "top 20%",
                    endTrigger: "#net-section",
                    end: "top 10%",
                    scrub: true,
                    //markers: true,
                }
            })
        }

  },{ dependencies:[gradients]});
  




  return (
      <div ref={gradients} id="gradients-background">
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
        <div><span></span></div>
    </div>
  )
}

export default GradientsBackground
