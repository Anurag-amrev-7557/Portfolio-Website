"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { skillCategories } from "./skills-data";

/* -------------------------------------------------------------------------
 * CarvedMedallion
 * Real 3D photorealistic cavern stone render with an engraved rune icon
 * etched directly onto the rock surface with chiseled chisel bevel highlights.
 * ---------------------------------------------------------------------- */
function CarvedMedallion({
  Icon,
  stoneRotation = 0,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  stoneRotation?: number;
}) {
  return (
    <div
      className="
        relative flex h-20 w-20 shrink-0 items-center justify-center
        transition-all duration-300 ease-out
        group-hover:-translate-y-1.5 group-hover:scale-105
      "
      aria-hidden="true"
    >
      {/* Authentic 3D Photorealistic Cavern Stone Render */}
      <div
        className="absolute inset-0 select-none pointer-events-none transition-transform duration-500 ease-out group-hover:rotate-[6deg]"
        style={{ transform: `rotate(${stoneRotation}deg)` }}
      >
        <Image
          src="/images/stone-cavern-round-tight.webp"
          alt="Carved Cavern Stone"
          fill
          sizes="96px"
          className="object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.24)] group-hover:drop-shadow-[0_16px_28px_rgba(0,0,0,0.30)] transition-all duration-300 select-none pointer-events-none"
        />
      </div>

      {/* Chiseled Petroglyph Rune Icon Engraved Directly Into The Stone Face with High Contrast */}
      <div className="relative z-10 flex items-center justify-center text-[#F5F4F0] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)] select-none transition-colors duration-300 group-hover:text-[#D1E2D4]">
        <Icon className="h-6 w-6" strokeWidth={1.9} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Pill — reuses the exact tag treatment already used under project titles
 * (e.g. "FastAPI · Qdrant Vector DB · Groq LPUs"), matching the site's palette.
 * ---------------------------------------------------------------------- */
function Pill({ label }: { label: string }) {
  return (
    <span
      className="
        rounded-full border border-black/10 bg-black/[0.03] px-3 py-1
        text-[12px] sm:text-[12.5px] leading-none text-[#141416]/80 transition-colors
        hover:border-black/20 hover:bg-black/[0.06] hover:text-[#141416] select-none
        whitespace-nowrap shrink-0
      "
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * FloatingStone — authentic 3D cavern stone with full multi-axis parallax
 * linked directly to scroll (Y vertical drift, X horizontal drift, rotation,
 * and scale) smoothed with inertial physics springs.
 * ---------------------------------------------------------------------- */
function FloatingStone({
  size,
  className,
  yRange,
  xRange = [0, 0],
  rotRange = [0, 0],
  scaleRange = [1, 1],
  progress,
  reduceMotion,
}: {
  size: number;
  className: string;
  yRange: [number, number];
  xRange?: [number, number];
  rotRange?: [number, number];
  scaleRange?: [number, number];
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const y = useTransform(progress, [0, 1], yRange);
  const x = useTransform(progress, [0, 1], xRange);
  const rotate = useTransform(progress, [0, 1], rotRange);
  const scale = useTransform(progress, [0, 1], scaleRange);

  return (
    // Outer layer: scroll-linked multi-axis parallax with spring smoothing
    <motion.div
      style={
        reduceMotion
          ? undefined
          : {
              y,
              x,
              rotate,
              scale,
            }
      }
      className={`absolute will-change-transform transform-gpu ${className}`}
    >
      {/* Inner layer: constant gentle idle float so stone breathes */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6.5 + (size % 3), repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size, height: size }}
        className="relative will-change-transform"
      >
        <Image
          src="/images/stone-cavern-round-tight.webp"
          alt="Parallax Floating Stone"
          fill
          sizes="110px"
          className="object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.26)] select-none pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * Motion variants — orchestrated reveal matching About section cadence.
 * ---------------------------------------------------------------------- */
const shelfVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const pedestalVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Physical inertial spring smoothing for fluid, weightless scroll tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.25,
    restDelta: 0.001,
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#DCDCDC] px-6 pt-28 sm:pt-32 md:pt-36 pb-24 sm:pb-28 md:pb-32 lg:px-16 scroll-mt-10 select-none"
    >
      {/* Divider line matching About and Contact sections */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black to-transparent pointer-events-none z-20" />

      {/* Decorative corner spread 3D cavern stones — rich scroll-linked parallax */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Corner 1: Top-Left Megalith Pebble */}
        <FloatingStone
          size={52}
          className="left-[2.5%] top-[8%]"
          yRange={[-130, 150]}
          xRange={[-15, 30]}
          rotRange={[-25, 45]}
          scaleRange={[0.94, 1.08]}
          progress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />

        {/* Corner 2: Top-Right Orbiting Stone */}
        <FloatingStone
          size={36}
          className="right-[3%] top-[10%]"
          yRange={[-160, 120]}
          xRange={[25, -20]}
          rotRange={[30, -50]}
          scaleRange={[1.05, 0.92]}
          progress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />

        {/* Side Accent: Mid-Left Satellite Stone */}
        <FloatingStone
          size={24}
          className="left-[1.5%] top-[50%]"
          yRange={[-90, 110]}
          xRange={[-10, 20]}
          rotRange={[-15, 35]}
          progress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />

        {/* Corner 3: Bottom-Left Foreground Stone */}
        <FloatingStone
          size={38}
          className="left-[3.5%] bottom-[8%]"
          yRange={[140, -130]}
          xRange={[-20, 25]}
          rotRange={[-35, 30]}
          scaleRange={[0.92, 1.06]}
          progress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />

        {/* Corner 4: Bottom-Right Deep Cavern Stone */}
        <FloatingStone
          size={48}
          className="right-[2.5%] bottom-[12%]"
          yRange={[160, -150]}
          xRange={[30, -25]}
          rotRange={[25, -45]}
          scaleRange={[0.95, 1.07]}
          progress={smoothProgress}
          reduceMotion={!!reduceMotion}
        />
      </div>

      <div className="relative mx-auto max-w-6xl z-10">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 sm:gap-2.5 sm:px-3.5 rounded-full border border-black/15 bg-black/[0.04] backdrop-blur-md text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-mono tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[#141416]/90 shadow-2xs whitespace-nowrap max-w-full"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4D38] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D4D38]" />
          </span>
          <span>THE ATELIER &bull; INSTRUMENTS OF THE CRAFT</span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#141416] tracking-tight"
        >
          Instruments, not accessories.
          <br />
          <span className="font-serif italic font-normal text-[#141416]/90">
            Every tool here has cut real stone.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#141416]/75"
        >
          Five disciplines, each kept only for what it has actually built —
          shipped systems, not a résumé wishlist.
        </motion.p>

        {/* The shelf grid */}
        <motion.ul
          variants={shelfVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.li
              key={category.id}
              variants={pedestalVariants}
              className="group flex flex-col items-start"
            >
              <CarvedMedallion Icon={category.icon} stoneRotation={category.stoneRotation} />

              <h3 className="mt-5 text-lg font-semibold text-[#141416] tracking-tight">
                {category.title}
              </h3>
              <p className="mt-1 text-[13px] text-[#141416]/70 leading-relaxed">
                {category.caption}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <Pill key={tool} label={tool} />
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
