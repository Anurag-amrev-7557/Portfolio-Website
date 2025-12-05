"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";

const STONES = [
  {
    id: "orbit-stone-0",
    angleOffset: 0,
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20",
    rotSpeed: 0.024,
    scaleMult: 1.04,
  },
  {
    id: "orbit-stone-1",
    angleOffset: Math.PI / 2, // 90 deg
    sizeClass: "w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-17 lg:h-17",
    rotSpeed: -0.028,
    scaleMult: 0.88,
  },
  {
    id: "orbit-stone-2",
    angleOffset: Math.PI, // 180 deg
    sizeClass: "w-15 h-15 sm:w-17 sm:h-17 md:w-19 md:h-19 lg:w-22 lg:h-22",
    rotSpeed: 0.022,
    scaleMult: 1.0,
  },
  {
    id: "orbit-stone-3",
    angleOffset: (Math.PI * 3) / 2, // 270 deg
    sizeClass: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18",
    rotSpeed: -0.026,
    scaleMult: 0.92,
  },
];

export default function ThinkingManOrbitingStones() {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensionsRef = useRef({ radiusX: 260, radiusY: 90, centerY: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const parent = rootRef.current?.parentElement;
      if (parent && parent.clientWidth > 50) {
        const w = parent.clientWidth;
        const h = parent.clientHeight || w * (1479 / 966);
        dimensionsRef.current = {
          radiusX: w * 0.54, // reaches just past the statue silhouette
          radiusY: h * 0.17, // 3D perspective foreshortening
          centerY: h * 0.02, // centered around the middle mass
        };
      }
    };

    updateDimensions();

    const parent = rootRef.current?.parentElement;
    let observer: ResizeObserver | null = null;
    if (parent && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateDimensions);
      observer.observe(parent);
    }

    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useAnimationFrame((time) => {
    // Constant smooth orbital velocity (~9.8s per full rotation - faster orbit)
    const revSpeed = 0.00064;
    const baseTheta = time * revSpeed;
    const { radiusX, radiusY, centerY } = dimensionsRef.current;

    // Slight celestial tilt (-10 deg) for 3D depth perspective
    const tiltRad = -10 * (Math.PI / 180);
    const cosTilt = Math.cos(tiltRad);
    const sinTilt = Math.sin(tiltRad);

    STONES.forEach((stone, idx) => {
      const container = containerRefs.current[idx];
      const stoneEl = stoneRefs.current[idx];
      if (!container || !stoneEl) return;

      const theta = baseTheta + stone.angleOffset;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      // Raw unrotated ellipse coordinates
      const rawX = cosTheta * radiusX;
      const rawY = sinTheta * radiusY;

      // Rotate around the tilt angle for a dynamic 3D orbit plane
      const x = rawX * cosTilt - rawY * sinTilt;
      const y = rawX * sinTilt + rawY * cosTilt + centerY;

      // 3D Depth Sorting:
      // When sinTheta >= 0, the stone is in front of the statue (foreground)
      // When sinTheta < 0, the stone is behind the statue (background)
      const depthFactor = (sinTheta + 1) / 2; // 0 (deepest back) to 1 (closest front)
      const scale = (0.78 + 0.32 * depthFactor) * stone.scaleMult;
      const opacity = 0.65 + 0.35 * depthFactor;

      // Statue is at zIndex 10.
      // Front stones get zIndex 20, back stones get zIndex 2.
      const zIndex = sinTheta >= 0 ? "20" : "2";

      if (container.style.zIndex !== zIndex) {
        container.style.zIndex = zIndex;
      }
      container.style.opacity = String(opacity);
      container.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Axial self-rotation on each stone
      const rotAngle = time * stone.rotSpeed;
      stoneEl.style.transform = `scale(${scale}) rotate3d(0, 0, 1, ${rotAngle}deg)`;
    });
  });

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
    >
      {STONES.map((stone, idx) => (
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
            className={`relative ${stone.sizeClass} will-change-transform drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)]`}
          >
            <Image
              src="/images/stone-cavern-round-tight.webp"
              alt="Orbiting Cavern Stone"
              fill
              sizes="(max-width: 768px) 68px, 92px"
              className="object-contain grayscale select-none pointer-events-none opacity-95"
              priority={idx === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
