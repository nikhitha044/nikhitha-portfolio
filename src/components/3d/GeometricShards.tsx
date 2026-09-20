import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { usePageVisible } from "../../hooks/usePageVisible";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./GeometricShards.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ShardConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  spinSpeed: [number, number, number];
  driftPhase: number;
}

const SHARDS: ShardConfig[] = [
  {
    position: [-1.3, 0.5, 0],
    rotation: [0.4, 0.3, 0.1],
    scale: 1.3,
    color: "#0a1020",
    emissive: "#7c3aed",
    spinSpeed: [0.05, 0.08, 0.02],
    driftPhase: 0,
  },
  {
    position: [1.2, -0.4, -0.6],
    rotation: [-0.3, 0.6, 0.2],
    scale: 1.05,
    color: "#0a1020",
    emissive: "#06b6d4",
    spinSpeed: [-0.04, 0.06, 0.03],
    driftPhase: 1.4,
  },
  {
    position: [0.2, 0.9, -1.1],
    rotation: [0.2, -0.4, 0.5],
    scale: 0.85,
    color: "#0a1020",
    emissive: "#14b8a6",
    spinSpeed: [0.06, -0.05, 0.04],
    driftPhase: 2.6,
  },
  {
    position: [-0.6, -1, 0.4],
    rotation: [0.5, 0.2, -0.3],
    scale: 0.95,
    color: "#0a1020",
    emissive: "#a78bfa",
    spinSpeed: [-0.03, -0.07, 0.05],
    driftPhase: 3.9,
  },
  {
    position: [1.6, 0.7, 0.3],
    rotation: [-0.2, -0.3, 0.4],
    scale: 0.7,
    color: "#0a1020",
    emissive: "#22d3ee",
    spinSpeed: [0.07, 0.04, -0.03],
    driftPhase: 5.1,
  },
];

function Shard({ config, spin }: { config: ShardConfig; spin: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const t0 = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!spin) return;

    t0.current += delta;
    meshRef.current.rotation.x += delta * config.spinSpeed[0];
    meshRef.current.rotation.y += delta * config.spinSpeed[1];
    meshRef.current.rotation.z += delta * config.spinSpeed[2];

    // Slow independent bob so shards feel like they're drifting in zero-g,
    // not just spinning in place.
    meshRef.current.position.y =
      config.position[1] + Math.sin(t0.current * 0.4 + config.driftPhase) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <tetrahedronGeometry args={[0.85, 0]} />
      <meshPhysicalMaterial
        color={config.color}
        emissive={config.emissive}
        emissiveIntensity={0.5}
        roughness={0.15}
        metalness={0.1}
        transmission={0.55}
        thickness={0.6}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

/**
 * Cluster wrapper: owns pointer-parallax tilt (unchanged) plus the
 * scroll-driven drift/rotation/scale read each frame from `scrollProgress`
 * — a ref updated by a GSAP ScrollTrigger `onUpdate` in the parent, never
 * React state, so scrolling never triggers a re-render of the R3F tree.
 */
function ShardCluster({
  spin,
  parallax,
  shards,
  scrollProgress,
  scrollDriven,
}: {
  spin: boolean;
  parallax: boolean;
  shards: ShardConfig[];
  scrollProgress: MutableRefObject<number>;
  scrollDriven: boolean;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollDriven ? scrollProgress.current : 0;

    if (parallax) {
      const targetX = state.pointer.y * 0.15 + p * 0.35;
      const targetY = state.pointer.x * 0.2 + p * 0.55;
      groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetX, 3, delta);
      groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 3, delta);
    }

    if (scrollDriven) {
      // Diagonal parallax drift — cluster eases up and to the left as the
      // page scrolls, reinforcing depth without moving far (subtle, premium).
      groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, -p * 0.9, 4, delta);
      groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, p * 0.5, 4, delta);
      const targetScale = 1 - p * 0.12;
      const s = MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta);
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {shards.map((config, i) => (
        <Shard key={i} config={config} spin={spin} />
      ))}
    </group>
  );
}

/**
 * Concept C — Abstract Geometric Shards. Now the production hero visual.
 *
 * A small cluster of translucent, faceted tetrahedra (angular glass
 * fragments) with Aurora-tinted emissive glow, drifting and rotating
 * independently with subtle overlap for depth. Deliberately not spheres —
 * flat-faced geometry only. Falls back to a static CSS composition when
 * WebGL is unavailable, and freezes rotation/parallax/scroll-drive under
 * prefers-reduced-motion while keeping the shards visible.
 *
 * Scroll behavior: a GSAP ScrollTrigger scrubs a 0→1 progress value (stored
 * in a ref, not React state) across the hero's own height. That progress
 * drives — inside the R3F `useFrame` loop, not via re-renders — a gentle
 * diagonal drift, extra rotation, a slight scale-down, and a fade of the
 * whole canvas as the user scrolls from the hero into About.
 */
export default function GeometricShards() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  const pageVisible = usePageVisible();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const shards = useMemo(() => (isMobile ? SHARDS.slice(0, 4) : SHARDS), [isMobile]);

  useEffect(() => {
    if (reducedMotion || !webglSupported) return;

    const heroEl = document.getElementById("home");
    if (!heroEl) return;

    const trigger = ScrollTrigger.create({
      trigger: heroEl,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        // Fade the canvas as we scroll past the hero into About — applied
        // directly to the DOM node so this stays off the React render path.
        if (wrapRef.current) {
          const fade = 1 - self.progress * 0.85;
          wrapRef.current.style.opacity = String(Math.max(0.15, fade));
        }
      },
    });

    return () => trigger.kill();
  }, [reducedMotion, webglSupported]);

  if (!webglSupported) {
    return (
      <div className={styles.fallback} aria-hidden="true">
        <div className={`${styles.shardCss} ${styles.shardPurple}`} />
        <div className={`${styles.shardCss} ${styles.shardCyan}`} />
        <div className={`${styles.shardCss} ${styles.shardTeal}`} />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={pageVisible ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-4, -3, -2]} intensity={0.9} color="#06b6d4" />
        <Suspense fallback={null}>
          <ShardCluster
            spin={!reducedMotion}
            parallax={!reducedMotion}
            shards={shards}
            scrollProgress={scrollProgress}
            scrollDriven={!reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
