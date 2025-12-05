"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { EXPERIENCE } from "@/data/projects";
import ThinkingManOrbitingStones from "@/components/ThinkingManOrbitingStones";
import Iridescence from "@/components/Iridescence";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Inertial spring smoothing matching Hero and AntiGravityWork physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Dynamic Expanding Spatial Divider at the boundary with AntiGravityWork
  const dividerScaleX = useTransform(smoothProgress, [0.03, 0.22], [0, 1], { clamp: true });
  const dividerOpacity = useTransform(smoothProgress, [0.03, 0.22], [0, 0.25], { clamp: true });

  // 3D Bidirectional Entrance (from Work) and Exit (to Contact)
  // Tilts in from -10° on entry, rests flat at 0°, then tilts forward to +12° on exit
  const contentRotateX = useTransform(
    smoothProgress,
    [0.02, 0.22, 0.78, 0.98],
    [-10, 0, 0, 12],
    { clamp: true }
  );
  const contentScale = useTransform(
    smoothProgress,
    [0.02, 0.22, 0.78, 0.98],
    [0.91, 1, 1, 0.90],
    { clamp: true }
  );
  const contentY = useTransform(
    smoothProgress,
    [0.02, 0.22, 0.78, 0.98],
    [60, 0, 0, -50],
    { clamp: true }
  );
  const contentOpacity = useTransform(
    smoothProgress,
    [0.02, 0.16, 0.84, 0.98],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Balanced prominent scale for the Stone Thinker Statue (Zero tilt, golden ratio presence)
  const statueScrollScale = useTransform(smoothProgress, [0.12, 0.5, 0.88], [0.97, 1.02, 0.98], { clamp: true });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#DCDCDC] text-[#141416] w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32 overflow-clip select-none touch-pan-y [perspective:1400px]"
    >
      {/* Dynamic Expanding Spatial Divider between Work and About */}
      <motion.div
        style={{ scaleX: dividerScaleX, opacity: dividerOpacity }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black to-transparent origin-center pointer-events-none z-20"
      />

      {/* 3D Kinetic Section Content Container */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          rotateX: contentRotateX,
          scale: contentScale,
        }}
        className="w-full transform-gpu will-change-transform [transform-style:preserve-3d] origin-center"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
          {/* ================= LEFT COLUMN: The Stone Thinking Man Monolith with 4 Revolving Stones ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-start relative w-full lg:sticky lg:top-24">
            <div className="relative w-full max-w-[490px] sm:max-w-[530px] lg:max-w-[490px] xl:max-w-[550px] flex flex-col items-center justify-center select-none [perspective:1200px]">
              {/* 3D Motion Wrapper (No tilt, balanced scale) */}
              <motion.div
                style={{
                  scale: statueScrollScale,
                }}
                className="relative w-full aspect-[966/1479] flex items-center justify-center transform-gpu will-change-transform [transform-style:preserve-3d] origin-bottom"
              >
                {/* 4 Small Revolving Cavern Stones with 3D Depth (In Front and Behind) */}
                <ThinkingManOrbitingStones />

                {/* === IRIDESCENCE SHADER inside the rectangular stone void === */}
                <div
                  className="absolute z-[15] overflow-hidden pointer-events-auto"
                  style={{
                    left: '58.3%',
                    top: '72.75%',
                    width: '24.5%',
                    height: '17.65%',
                    transform: 'skewY(-14.5deg)',
                  }}
                >
                  <Iridescence
                    color={[1, 1, 1]}
                    speed={4.0}
                    amplitude={0.5}
                    mouseReact={false}
                  />
                </div>

                {/* === THE STONE THINKING MAN SCULPTURE === */}
                <div className="relative w-full h-full z-10 pointer-events-none">
                  <Image
                    src="/images/stone-thinking-man-trimmed.webp"
                    alt="Anurag Verma - The Thinker Monolithic Stone Sculpture"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 44vw, 580px"
                    className="object-contain grayscale drop-shadow-[0_24px_38px_rgba(0,0,0,0.15)] select-none pointer-events-none"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Narrative, Ethos & Track Record ================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start relative z-20">
            {/* Status / Section Marker */}
            <div className="mb-6 self-start inline-flex items-center gap-2 px-3 py-1.5 sm:gap-2.5 sm:px-3.5 rounded-full border border-black/15 bg-black/[0.04] backdrop-blur-md shadow-2xs max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4D38] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D4D38]" />
              </span>
              <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.12em] sm:tracking-[0.22em] uppercase text-[#141416]/90 whitespace-nowrap">
                THE THINKER • ARCHITECTURAL ETHOS
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#141416] leading-[1.08] mb-8">
              Systems are thought cast in stone.
              <span className="block font-serif italic text-[#141416]/90 font-normal mt-1">
                Code is thought set in motion.
              </span>
            </h2>

            {/* Narrative Bio */}
            <div className="space-y-4 text-base sm:text-lg text-[#141416]/80 leading-relaxed font-light max-w-3xl mb-12">
              <p>
                I&apos;m Anurag Verma — a software engineer operating across distributed architectures, cognitive AI pipelines, and spatial client interfaces. I view software not as disposable scripting, but as architectural sculpture: designed to withstand immense pressure while remaining weightless to operate.
              </p>
              {/* <p>
                My focus centers on constructing deterministic backends in Go and FastAPI, tuning GraphRAG retrieval hierarchies with sub-400ms latencies, and orchestrating fluid WebGL/GPU-accelerated graphics that bridge human intuition with machine precision.
              </p> */}
            </div>

            {/* Experience Track Record (Milestones) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#141416]/60">
                  Career Trajectory &amp; Track Record
                </span>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <div className="space-y-0 divide-y divide-black/10 border-t border-b border-black/10">
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={i}
                    className="py-4 sm:py-5 group transition-colors hover:bg-black/[0.02] px-2 -mx-2 rounded-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-sm sm:text-base font-semibold text-[#141416] group-hover:text-sage transition-colors">
                            {exp.role}
                          </h4>
                          <span className="text-[11px] font-mono font-semibold text-sage sm:hidden shrink-0">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#141416]/65 mt-0.5">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <span className="hidden sm:inline-block text-xs font-mono font-semibold text-sage shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#141416]/75 leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
