import { useRef, useMemo, useEffect , type FC, type ReactNode} from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useResponsiveSettings } from '../hooks/useResponsiveSettings.ts'
import * as THREE from 'three';


interface ModelSceneProps {
  animationProxy: {
    baseSpeed: number
    extraSpeed: number
    direction: number
  };
}

// --- NOTA DE ERROR DE TIPOS ---
// Creamos un tipo para las props de nuestro componente Model.
// Usamos 'Omit' para tomar todas las props de 'primitive' EXCEPTO la propiedad 'object',
// porque nuestro componente se encarga de proveerla internamente y no debe recibirla desde fuera.
type ModelProps = Omit<ThreeElements['primitive'], 'object'>;

function Model(props: ModelProps) {
  const primitiveRef = useRef<THREE.Object3D>(null!);
  const { scene } = useGLTF('/models/swan_compressed_jpg.glb');
  

  const copiedScene = useMemo(() => scene.clone(), [scene]);
   useEffect(() => {
    primitiveRef.current?.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        material.metalness = 1.5;  
        material.roughness =  0.5; 
        material.needsUpdate = true;
      }
    });
  }, [copiedScene]); 


 return <primitive ref={primitiveRef} {...props} object={copiedScene} />;
}

function Experience({ animationProxy }:ModelSceneProps):ReactNode  {
  const modelRef = useRef<THREE.Group>(null!);
  const settings = useResponsiveSettings()

  useFrame((state, delta) => {
    const { viewport } = state;
    const targetScale = Math.min(viewport.width, viewport.height) / 4; 
    if (modelRef.current) {
      const totalSpeed = animationProxy.baseSpeed + animationProxy.extraSpeed;
      modelRef.current.rotation.y += totalSpeed * animationProxy.direction * delta;
      modelRef.current.scale.lerp(
        new THREE.Vector3(targetScale*1.1, targetScale*1.1, targetScale*1.1), 
        0.1 
    );
    }
  });
  return (
    <> 
      <Environment environmentIntensity={0.5} files={"/models/potsdamer_platz_1k.hdr"} blur={-1} />
      <ContactShadows 
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={1}
        blur={0}
        far={0}
      />
      {
      //<ambientLight intensity={20} />
      //<directionalLight position={[10, 10, 5]} intensity={20} />
      }
      <group ref={modelRef}>
        <Model />
      </group>
      {!settings.r3f.disableBloom && (<EffectComposer>
        <Bloom
          intensity={20}
          luminanceThreshold={0}
          luminanceSmoothing={50}
        />
      </EffectComposer>)}
    </>
  );
}
const ModelScene: FC<ModelSceneProps> = ({ animationProxy }) => {
  const settings = useResponsiveSettings()

  return (
    <Canvas  dpr={[1, settings.r3f.dpr]} camera={{ position: [0, 0.3, 2.6], fov: 65 }}
      gl={{ 
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace 
      }}>
      <Experience animationProxy={animationProxy} />
    </Canvas>
  );
};

export default ModelScene;