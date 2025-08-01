// components/ThreeDBackground.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, PointLight } from "@react-three/drei";

// Simple, performant 3D animated background with floating glowing objects
export default function ThreeDBackground() {
    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas camera={{ position: [0, 0, 13], fov: 60 }}>
                {/* Dark background */}
                <color attach="background" args={["#181425"]} />
                <ambientLight intensity={0.5} />
                <PointLight position={[10, 10, 10]} intensity={2} />
                {/* Animated spheres */}
                <FloatingSpheres />
                {/* Subtle camera control for parallax experience */}
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/2.1} minPolarAngle={Math.PI/2.8} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
        </div>
    );
}

// Encapsulate floating/animated spheres logic here
function FloatingSpheres() {
    // Map spheres with unique color, size, position, and animated movement
    const spheres = [
        { color: "#8b5cf6", position: [-4, 2, 0], scale: 1.5 },
        { color: "#a78bfa", position: [3, -2, 1], scale: 2 },
        { color: "#f472b6", position: [1, 3, -2], scale: 1.2 },
        { color: "#fcd34d", position: [-2.8, -2.5, -1], scale: 1.3 },
        { color: "#60a5fa", position: [4, 0.5, -3], scale: 1.1 },
    ];

    return spheres.map((s, i) => (
        <Sphere key={i} args={[s.scale, 64, 64]} position={s.position}>
            <meshStandardMaterial
                color={s.color}
                emissive={s.color}
                emissiveIntensity={0.7}
                metalness={0.5}
                roughness={0.1}
            />
        </Sphere>
    ));
}
