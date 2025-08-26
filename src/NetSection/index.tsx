import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import './netSection.css';


function NetSection() {
      const sectionRef = useRef<HTMLElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const videoRef = useRef<HTMLVideoElement>(null!);


 useGSAP(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;


    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true,  antialias: true  });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor( 0x000000, 0 );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 3.2;

    const videoAsTexture = new THREE.VideoTexture(video);

     videoAsTexture.colorSpace = THREE.SRGBColorSpace;
     videoAsTexture.minFilter = THREE.LinearFilter;
     videoAsTexture.magFilter = THREE.LinearFilter;
     videoAsTexture.format = THREE.RGBAFormat;
     video.play();
    
    
    const chromaKeyShader = {
     uniforms: {
        videoSampler: { value: videoAsTexture }, 
        
        keyColor: { value: new THREE.Color(0x000000) },
        similarity: { value: 0.05}, 
        smoothness: { value: 0.02 },
        brightness: { value: 2 }
    },

    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `

        uniform sampler2D videoSampler; 
        
        uniform vec3 keyColor;
        uniform float similarity;
        uniform float smoothness;
        uniform float brightness;
        varying vec2 vUv;

        void main() {
    
            vec4 videoColor = texture2D(videoSampler, vUv);

            float distance = distance(videoColor.rgb, keyColor);
            float alpha = smoothstep(similarity, similarity + smoothness, distance);
             vec3 finalColor = videoColor.rgb * brightness;

            gl_FragColor = vec4(finalColor, alpha);
        }
    `
    };
     const material = new THREE.ShaderMaterial({
    uniforms: chromaKeyShader.uniforms,
    vertexShader: chromaKeyShader.vertexShader,
    fragmentShader: chromaKeyShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
    });
    const geometry = new THREE.PlaneGeometry(5, 5); 
    const mesh = new THREE.Mesh(geometry, material);
    

    mesh.scale.set(1, 1, 1);
    scene.add(mesh);


    const tick = () => renderer.render(scene, camera);
    gsap.ticker.add(tick);

    gsap.fromTo(".logo-wrapper", {
        autoAlpha: 1,
    }, {
        ease: 'expo.out',
        autoAlpha: 0,
        duration: 1.5,
        scrollTrigger:{
        trigger: sectionRef.current,
        start: 'top 60%',
        endTrigger: sectionRef.current,
        end: 'center center',
        //markers:true,
        scrub: true,
    }
    })
   /*    gsap.fromTo(".logo-wrapper", {
        autoAlpha: 0,
    }, {
        ease: 'expo.out',
        autoAlpha: 1,
        duration: 1,
        scrollTrigger:{
        trigger: sectionRef.current,
        start: 'center center',
        endTrigger: sectionRef.current,
        end: 'bottom bottom+=5%',
        markers:true,
        scrub: true,
    }
       })*/
    gsap.fromTo(".logo-wrapper", {
        //autoAlpha: 1,
        autoAlpha: 0,

    }, {
        ease: 'expo.out',
        autoAlpha: 0.25,
        duration: 1,
        scrollTrigger:{
        trigger: sectionRef.current,
        //start: 'bottom bottom+=5%',
        start: 'center center',
        endTrigger: sectionRef.current,
        //end: 'bottom bottom+=10%',
        end: 'bottom bottom',
        //markers:true,
        scrub: true,
    }
    })
    const masterTimeline = gsap.timeline();
       gsap.fromTo(".cta", {
        x: "-25vw",
    }, {
        ease: 'expo.out',
        x: "0vw",
        duration: 0.5,
        scrollTrigger:{
        trigger: sectionRef.current,
        start: 'top top+=10%',
        endTrigger: sectionRef.current,
        end: 'top top',
        //markers:true,
        scrub: true,
    }
       })
      const split = new SplitText(".split", { type: "chars" });
    masterTimeline.fromTo(canvas, 
      {
        scale: 0.5,
        autoAlpha: 0,
      },
      {

        scale: 1,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'expo.out',
      }
    ).fromTo(
      split.chars, 
      {
        
        color: "#ffffff", 
      },
      {
        color: "#aa7f2c", 
        duration: 1, 
        ease: 'none',
        stagger: 0.05,
      }
    );

    ScrollTrigger.create({
        animation: masterTimeline,
        trigger: sectionRef.current,
        pin: wrapperRef.current,
        start: 'top top',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        //markers:true,
        scrub: 1.5,
    });
    const handleResize = () => { /* ... */ };
    window.addEventListener('resize', handleResize);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };

});
return (
    <section id="net-section" ref={sectionRef}>
      <div className="net-wrapper" ref={wrapperRef}>
        <canvas className="net" ref={canvasRef}></canvas>
        <video className="net-video" ref={videoRef} preload="none" playsInline muted loop width="500" height="500">
          <source src="/videos/net.mp4" type="video/mp4" />
        </video>
            <p className="split">
                Unlocking Growth<br />
                Through Strategic<br />
                Investments
            </p>
            <div className="cta">
                <p>
                    Secure your spot! <br />
                    Join our Exclusive Investor base <br />
                    capped at 99 Accredited Investors.
                </p>
                <a href="https://quiz.swansonreservecapital.com/" target="_blank">
                    <img src="/icons/schedule_icon.svg" alt="" loading="lazy" />
                    invest now
                </a>
            </div>
        </div>
    </section>
  );
}

export default NetSection;
