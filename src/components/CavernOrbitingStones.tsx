"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";

const MINI_STONES = [
  {
    id: "mini-0",
    angleOffset: 0,
    sizeClass: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
    rotSpeed: 0.024,
    scaleMult: 1.0,
  },
  {
    id: "mini-1",
    angleOffset: (Math.PI * 2) / 3, // 120 deg
    sizeClass: "w-10 h-10 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-18 lg:h-18",
    rotSpeed: -0.028,
    scaleMult: 0.88,
  },
  {
    id: "mini-2",
    angleOffset: ((Math.PI * 2) / 3) * 2, // 240 deg
    sizeClass: "w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22",
    rotSpeed: 0.026,
    scaleMult: 0.94,
  },
];

interface CavernOrbitingStonesProps {
  stoneW: number;
  stoneH: number;
  cavernIndex: number;
  isFront: boolean;
}

export default function CavernOrbitingStones({
  stoneW,
  stoneH,
  isFront,
}: CavernOrbitingStonesProps) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useAnimationFrame((time) => {
    if (!isFront) return;

    // Fluid continuous orbital speed (~10.5s per full seamless revolution - faster orbit)
    const revSpeed = 0.00060;
    const baseTheta = time * revSpeed;

    // Tightly hug the cavern pedestal so orbiting stones stay close and cohesive
    const radiusX = stoneW * 0.49;
    const radiusY = stoneH * 0.22;

    MINI_STONES.forEach((stone, idx) => {
      const container = containerRefs.current[idx];
      const stoneEl = stoneRefs.current[idx];
      if (!container || !stoneEl) return;

      const theta = baseTheta + stone.angleOffset;
      const cosVal = Math.cos(theta);
      const sinVal = Math.sin(theta);

      const x = cosVal * radiusX;
      // Orbit around the center waist of the active bedrock stone
      const y = sinVal * radiusY + stoneH * 0.04;

      // Perspective depth scaling: larger & brighter when in front, smaller & dimmer when behind
      const depthFactor = (sinVal + 1) / 2; // 0 (furthest back) to 1 (closest front)
      const scale = (0.84 + 0.28 * depthFactor) * stone.scaleMult;
      const opacity = 0.75 + 0.25 * depthFactor;

      // True 3D Depth Sorting:
      // zIndex 15 = in front of cavern rock & artifact (z-5 and z-10)
      // zIndex 0  = behind cavern rock
      const zIndex = sinVal >= 0 ? "15" : "0";

      if (container.style.zIndex !== zIndex) {
        container.style.zIndex = zIndex;
      }
      container.style.opacity = String(opacity);
      container.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Pure monotonic axial rotation (no modulo to avoid any degree wrap-around jump)
      const rotAngle = time * stone.rotSpeed;
      stoneEl.style.transform = `scale(${scale}) rotate3d(0, 0, 1, ${rotAngle}deg)`;
    });
  });

  // Strict isolation: only orbit around the active (front) cavern to eliminate clutter & overlap
  if (!isFront) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {MINI_STONES.map((stone, idx) => (
        <div
          key={stone.id}
          ref={(el) => {
            containerRefs.current[idx] = el;
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
        >
          <div
            ref={(el) => {
              stoneRefs.current[idx] = el;
            }}
            className={`relative ${stone.sizeClass} will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.26)]`}
          >
            <Image
              src="/images/Stone Cavern Round.webp"
              alt="Orbiting Cavern Stone"
              fill
              sizes="(max-width: 768px) 64px, 96px"
              className="object-contain select-none pointer-events-none opacity-95"
              priority={idx === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
