import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { MathUtils } from "three";

/**
 * Abstract wireframe icosahedron core with an emissive Aurora material,
 * gentle auto-rotation, and damped mouse-parallax tilt.
 */
export default function AuroraCore() {
  const groupRef = useRef<Group>(null);
  const autoYaw = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle continuous auto-rotation, tracked separately from parallax tilt.
    autoYaw.current += delta * 0.12;

    const targetX = state.pointer.y * 0.25;
    const targetY = autoYaw.current + state.pointer.x * 0.3;

    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetX, 4, delta);
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 4, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#0a1020"
          emissive="#2563eb"
          emissiveIntensity={0.55}
          wireframe
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          transparent
          opacity={0.18}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
