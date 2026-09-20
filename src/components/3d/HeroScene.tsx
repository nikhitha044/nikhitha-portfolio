import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AuroraCore from "./AuroraCore";
import ParticleField from "./ParticleField";
import HeroFallback from "./HeroFallback";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { usePageVisible } from "../../hooks/usePageVisible";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Main R3F hero visual: an emissive wireframe icosahedron core with an
 * orbiting particle field. Falls back to a static CSS composition when
 * WebGL is unavailable or the user prefers reduced motion. Render loop is
 * paused on hidden tabs and particle density is reduced on small screens.
 */
export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  const pageVisible = usePageVisible();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (reducedMotion || !webglSupported) {
    return <HeroFallback />;
  }

  const particleCount = isMobile ? 350 : 1000;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      frameloop={pageVisible ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#a78bfa" />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#06b6d4" />
      <Suspense fallback={null}>
        <AuroraCore />
        <ParticleField count={particleCount} color="#22d3ee" radius={4.2} />
        <ParticleField count={Math.round(particleCount * 0.4)} color="#a78bfa" radius={3} speed={-0.01} />
      </Suspense>
    </Canvas>
  );
}
