import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import { useGeneralContext } from '../context/GeneralContext.tsx'; 
import { useResponsiveSettings } from '../hooks/useResponsiveSettings.ts'

import './HeroSection.css';

function HeroSection() {
  const settings = useResponsiveSettings();
  const {loaded, setLoaded} = useGeneralContext()
  const esDesktopOEscritorio = useMediaQuery({ minWidth: 481 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef(null);
  const heroWrapperRef = useRef(null); 
  const frameData  = useRef({ frame : 0})

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [imageCount, setImageCount] = useState(0);

  const [images, setImages] = useState<HTMLImageElement[]>([]);


 useEffect(() => {
    setLoaded(false);
    let isCancelled = false; 

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    setImageCount(esDesktopOEscritorio ? 254 : 237)
    /*const currentFrame = (index: number) => 
      esDesktopOEscritorio
        ? `/images/last_desktop_sequence/swanson__${(index).toString().padStart(5, '0')}.jpg`
        : `/images/last_mobile_sequence/swanson_V__${(index).toString().padStart(5, '0')}.jpg`;*/
    const currentFrame = settings.imageSequencePath;

    for (let i = 0; i < imageCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (isCancelled) return; 
        loadedCount++;
        if (loadedCount === imageCount) {
          console.log(`Cargadas ${imageCount} imágenes para ${esDesktopOEscritorio ? 'desktop' : 'mobile'}.`);
          setImages(loadedImages); 
          setLoaded(true); 
        }
      };
      loadedImages.push(img);
    }
    
    return () => {
      isCancelled = true; // Activa el flag para que las cargas pendientes se ignoren
    };
  }, [esDesktopOEscritorio, setLoaded,imageCount]); 

     useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return () => window.removeEventListener('resize', handleResize);;

    // Redimensiona y redibuja el frame actual cada vez que cambia 'dimensions' o 'images'
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext('2d');
    if (!context) return () => window.removeEventListener('resize', handleResize);;

       const currentImage = images[Math.round(frameData.current.frame)];
    if (currentImage?.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(currentImage, (canvas.width - currentImage.width) / 2, (canvas.height - currentImage.height) / 2, currentImage.width,currentImage.height);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions, images]);
    //FIN useEffect para resize del canvas



  useGSAP(() => {
  
    if (!loaded) return; 

    const context = canvasRef.current?.getContext('2d');
    if (!context) return; 

    const DURATION = 3
    const masterTimeline = gsap.timeline();


    masterTimeline.to(frameData.current, {
      duration: DURATION,
      frame: imageCount - 1, 
      snap: 'frame',
      ease: 'none', 
      onUpdate: () => {
        const frameIndex = Math.round(frameData.current.frame);
        if (images[frameIndex]) {
          const imageToDraw = images[frameIndex];
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.drawImage(imageToDraw, (context.canvas.width - imageToDraw.width) / 2, (context.canvas.height - imageToDraw.height) / 2);
        }
      },
    });


    masterTimeline
      .fromTo('h1', { x: "-200vw" }, { x: "-100vw", ease: "power2.inOut" }, 0)
      .to('h1>span:nth-child(1)', { autoAlpha: 0, duration:"0.3", ease: "power2.in"}, 0)
      .to('.hero-paragraphs > p:nth-child(1)', { autoAlpha: 0, ease: "power2.out" }, 0)
      .fromTo('.hero-paragraphs > p:nth-child(2)', { autoAlpha: 0 }, { autoAlpha: 1, ease: "power2.in" }, 0)
      .to('h1', { x: "0vw", ease: "power2.inOut" }, DURATION * 0.3)
      .to('h1>span:nth-child(2)', { autoAlpha: 0, duration:"0.3", ease: "power2.in" }, DURATION * 0.3)
      .to('.hero-paragraphs > p:nth-child(2)', { autoAlpha: 0, ease: "power2.out" }, DURATION * 0.3)
      .fromTo('.hero-paragraphs > p:nth-child(3)', { autoAlpha: 0 }, { autoAlpha: 1, ease: "power2.in" }, DURATION * 0.3)
      .to('h1', { x: "-100vw", ease: "power2.inOut" }, DURATION * 0.6)
      .to('h1>span:nth-child(3)', { autoAlpha: 0, duration:"0.3", ease: "power2.inOut" }, DURATION * 0.6)
      .to('.hero-paragraphs > p:nth-child(3)', { autoAlpha: 0, ease: "power2.out" }, DURATION * 0.7)
      .fromTo('.hero-reserve', { autoAlpha: 0, yPercent: "100" }, { autoAlpha: 1, yPercent: 0, ease: "power2.inOut"}, DURATION * 0.8);
      

    const st = ScrollTrigger.create({
      animation: masterTimeline,  
      trigger: sectionRef.current,
      pin: heroWrapperRef.current, 
      start: 'top top',
      scrub: 1.5, 
      endTrigger: sectionRef.current,
      end: "bottom bottom",
      //markers:true
      //end: '+=2980', 
    });
    

    return () => {
      st.kill();
      masterTimeline.kill()
    }

  }, { scope: sectionRef, dependencies: [loaded, esDesktopOEscritorio,images] });

  return (


    <section id="hero-section" ref={sectionRef}>
      <div className="hero-wrapper" ref={heroWrapperRef}>
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-contents">
            <div className="hero-paragraphs">
                <p>
                    <span></span>
                    Multi-Strategy Private Investment Fund
                </p>
                <p>
                    <span></span>
                    Expertly Curated Structured Products
                </p>
                <p>
                    <span></span>
                    Actively Managed Algorithmic Trading
                </p>
            </div>
            <h1>
                <span>
                    swanson
                    <br />
                    reserve capital
                </span>

                <span>
                    innovation
                    <br />
                    invested
                </span>

                <span>
                    prosperity
                    <br />
                    protected
                </span>
          </h1>
          <div className="hero-reserve">
                <p>
                    <img src="/icons/plus.svg" alt="" loading="lazy" width="61" height="61" />
                    We are <br />
                    Swanson Reserve Capital
                </p>
                <span>
                    scroll to explore
                    <img src="/icons/scroll_down.svg" alt="" loading="lazy" />
                </span>
                <span className="reserve-mask"></span>
            </div>
        </div>
      </div>
      </section>
  );
};

export default HeroSection;