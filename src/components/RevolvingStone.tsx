"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useAnimationFrame, MotionValue, useMotionValue, animate } from "framer-motion";

const STONES = [
  {
    id: "stone-0",
    angleOffset: 0,
    sizeClass: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36",
    rotSpeed: 0.054,
  },
  {
    id: "stone-1",
    angleOffset: (Math.PI * 2) / 5,
    sizeClass: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28",
    rotSpeed: -0.058,
  },
  {
    id: "stone-2",
    angleOffset: ((Math.PI * 2) / 5) * 2,
    sizeClass: "w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 lg:w-38 lg:h-38",
    rotSpeed: 0.052,
  },
  {
    id: "stone-3",
    angleOffset: ((Math.PI * 2) / 5) * 3,
    sizeClass: "w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-32 lg:h-32",
    rotSpeed: -0.056,
  },
  {
    id: "stone-4",
    angleOffset: ((Math.PI * 2) / 5) * 4,
    sizeClass: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-34 lg:h-34",
    rotSpeed: 0.057,
  },
];

interface RevolvingStoneProps {
  scrollProgress?: MotionValue<number>;
  entryDelay?: number;
}

export default function RevolvingStone({
  scrollProgress,
  entryDelay = 0.75,
}: RevolvingStoneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensionsRef = useRef({ radius: 340, centerY: -30 });
  const entryProgress = useMotionValue(0);

  const currentMultiplierRef = useRef(1);

  useEffect(() => {
    const updateDimensions = () => {
      const parent = rootRef.current?.parentElement;
      if (parent && parent.clientWidth > 80) {
        const w = parent.clientWidth;
        const h = parent.clientHeight || w * (1600 / 1800);
        // Circular orbit: equal radius for both X and Y geometry
        dimensionsRef.current = {
          radius: w * 0.48,
          centerY: -h * 0.06,
        };
      } else if (typeof window !== "undefined") {
        const w = Math.min(Math.max(window.innerWidth * 0.49, 280), 960);
        const h = w * (1600 / 1800);
        dimensionsRef.current = {
          radius: w * 0.48,
          centerY: -h * 0.06,
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

  // When center bottom image appears, expand stone revolving radius from 0 to actual size
  useEffect(() => {
    const controls = animate(entryProgress, 1, {
      duration: 1.4,
      delay: entryDelay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [entryProgress, entryDelay]);

  useAnimationFrame((time) => {
    // If Hero is scrolled completely offscreen, sleep to save CPU/GPU cycles
    if (scrollProgress && scrollProgress.get() >= 0.72) return;

    const entry = entryProgress.get();

    // While entry is 0 (laptop image still entering), keep stones hidden at center
    if (entry <= 0) {
      STONES.forEach((_, idx) => {
        const container = containerRefs.current[idx];
        if (container && container.style.opacity !== "0") {
          container.style.opacity = "0";
        }
      });
      return;
    }

    // Linear constant angular speed (~11 seconds per full revolution - faster fluid orbit)
    const revSpeed = 0.00058;
    const baseTheta = time * revSpeed;

    const { radius: baseRadius, centerY } = dimensionsRef.current;

    // Dynamic radius reduction linked to page scroll with exponential smoothing (lerp)
    const scroll = scrollProgress ? Math.min(Math.max(scrollProgress.get(), 0), 1) : 0;
    const targetMultiplier = Math.max(1 - scroll * 0.85, 0.12);
    // Smooth frame-rate independent radius transition (handles fast flicks & slow ticks seamlessly)
    currentMultiplierRef.current += (targetMultiplier - currentMultiplierRef.current) * 0.14;

    // Entry expansion: radius increases from 0 to full size as entry ramps from 0 to 1
    const mult = entry * currentMultiplierRef.current;
    const r = baseRadius * mult;
    const isBlooming = entry < 1;
    const scale = isBlooming ? Math.min(Math.max(entry * 1.05, 0.1), 1) : 1;
    const opacityStr = isBlooming ? String(Math.min(entry * 2, 1)) : "1";

    STONES.forEach((stone, idx) => {
      const container = containerRefs.current[idx];
      const stoneEl = stoneRefs.current[idx];
      if (!container || !stoneEl) return;

      if (container.style.opacity !== opacityStr) {
        container.style.opacity = opacityStr;
      }

      const theta = baseTheta + stone.angleOffset;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r + centerY;

      // Pure circular revolution with scroll-linked & entry-bloomed radius (GPU-accelerated)
      container.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Monotonic continuous axial self-rotation (GPU-accelerated, no modulo degree wrap)
      const rotAngle = time * stone.rotSpeed;
      stoneEl.style.transform = isBlooming
        ? `scale(${scale}) rotate3d(0, 0, 1, ${rotAngle}deg)`
        : `rotate3d(0, 0, 1, ${rotAngle}deg)`;
    });
  });

  return (
    <div
      ref={rootRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
    >
      {STONES.map((stone, idx) => (
        <div
          key={stone.id}
          ref={(el) => {
            containerRefs.current[idx] = el;
          }}
          style={{ opacity: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center pointer-events-none"
        >
          <div
            ref={(el) => {
              stoneRefs.current[idx] = el;
            }}
            className={`relative ${stone.sizeClass} will-change-transform drop-shadow-xl`}
          >
            <Image
              src="/images/Stone Cavern Round.webp"
              alt={`Orbiting Cavern Stone ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 130px, 170px"
              className="object-contain select-none pointer-events-none opacity-95"
              priority={idx === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
