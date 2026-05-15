"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

export default function LaptopModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/laptop.glb");

  // Rotación suave
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={group} object={scene} scale={1.5} />;
}

// Necesario para que Next.js no tire warnings
useGLTF.preload("/models/laptop.glb");
