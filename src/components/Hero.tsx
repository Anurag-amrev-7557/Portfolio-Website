"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import RevolvingStone from "@/components/RevolvingStone";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Inertial spring smoothing across all scroll speeds (slow, normal, fast flicks)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Physical slide exits calibrated to clear the viewport before next section peaks:
  // Side stones slide completely off-screen to the left & right and fade out
  const leftStoneExitX = useTransform(smoothProgress, [0, 0.72], ["0%", "-100%"], { clamp: true });
  const rightStoneExitX = useTransform(smoothProgress, [0, 0.72], ["0%", "100%"], { clamp: true });
  const stonesExitOpacity = useTransform(smoothProgress, [0, 0.35, 0.65], [1, 1, 0], { clamp: true });

  // Center laptop slides cleanly off the bottom edge, scales down slightly, and fades out completely before Work section enters
  const centerExitY = useTransform(smoothProgress, [0, 0.72], [0, 960], { clamp: true });
  const centerExitOpacity = useTransform(smoothProgress, [0, 0.32, 0.62], [1, 1, 0], { clamp: true });
  const centerExitScale = useTransform(smoothProgress, [0, 0.62], [1, 0.86], { clamp: true });

  // Mobile headline scroll exit: smoothly fades and glides upward early in the scroll
  const mobileTextExitOpacity = useTransform(smoothProgress, [0, 0.32], [1, 0], { clamp: true });
  const mobileTextExitY = useTransform(smoothProgress, [0, 0.32], [0, -45], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none"
    >
      {/* Mobile Editorial Headline & Intro (Visible on mobile screens < 768px) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          opacity: mobileTextExitOpacity,
          y: mobileTextExitY,
        }}
        className="md:hidden absolute top-14 bottom-[38vh] left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none space-y-3.5"
      >
        {/* Status / Role Badge with live radar indicator */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full border border-black/10 bg-black/[0.03] text-[10.5px] sm:text-[11px] font-sans font-medium text-[#141416]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-xs whitespace-nowrap max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4D38] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D4D38]" />
          </span>
          <span className="tracking-wide">Software Engineer &amp; AI Developer</span>
        </div>

        {/* Refined 2-tier Editorial Headline */}
        <h1 className="tracking-tight text-center max-w-[340px] mx-auto">
          <span className="block text-[23px] sm:text-[27px] font-semibold text-[#141416] leading-[1.22] tracking-[-0.025em]">
            Crafting Intelligent Systems
          </span>
          <span className="block text-[19px] sm:text-[22px] font-normal text-[#141416]/70 leading-[1.25] tracking-[-0.015em] mt-0.5">
            &amp; Spatial Web Experiences
          </span>
        </h1>

        {/* Focus Summary & Capability Tags */}
        <div className="flex flex-col items-center gap-2 pt-0.5">
          <p className="text-[11.5px] sm:text-[12.5px] text-[#141416]/65 max-w-[275px] mx-auto font-sans leading-relaxed text-center">
            Distributed backends, Graph RAG pipelines &amp; interactive 3D interfaces.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
            {["Graph RAG", "Distributed Engines", "WebGL 3D"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full border border-black/10 bg-black/[0.025] text-[10px] font-mono text-[#141416]/75 whitespace-nowrap shrink-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Cave Stone Formations: Left slides in from left, Right slides in from right (Desktop only) */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Left Cave Stone: entrance from left, scroll exit sliding left */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 bottom-0 left-0 h-full w-[min(42vw,calc(100vh*0.537))] sm:w-[min(35vw,calc(100vh*0.537))] md:w-[min(28vw,calc(100vh*0.537))] max-w-[640px] origin-bottom scale-y-[1.095] md:scale-y-[1.125] will-change-transform transform-gpu"
        >
          <motion.div
            style={{ x: leftStoneExitX, opacity: stonesExitOpacity }}
            className="relative w-full h-full will-change-transform transform-gpu"
          >
            <Image
              src="/images/Cave Stone Left.webp"
              alt="Cave Stone Left"
              fill
              priority
              sizes="(max-width: 768px) 42vw, 28vw"
              className="object-cover object-left"
            />
          </motion.div>
        </motion.div>

        {/* Right Cave Stone: entrance from right, scroll exit sliding right */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 bottom-0 right-0 h-full w-[min(42vw,calc(100vh*0.548))] sm:w-[min(35vw,calc(100vh*0.548))] md:w-[min(28vw,calc(100vh*0.548))] max-w-[640px] origin-bottom scale-y-[1.095] md:scale-y-[1.125] will-change-transform transform-gpu"
        >
          <motion.div
            style={{ x: rightStoneExitX, opacity: stonesExitOpacity }}
            className="relative w-full h-full will-change-transform transform-gpu"
          >
            <Image
              src="/images/Cave Stone Right.webp"
              alt="Cave Stone Right"
              fill
              priority
              sizes="(max-width: 768px) 42vw, 28vw"
              className="object-cover object-right"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Center / Bottom-Center: Gemini Laptop Product Photo - entrance from bottom, scroll exit sliding down */}
      <motion.div
        initial={{ y: "35%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.15, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 z-10 w-full flex justify-center items-end pointer-events-none will-change-transform transform-gpu"
      >
        <motion.div
          style={{
            y: centerExitY,
            opacity: centerExitOpacity,
            scale: centerExitScale,
          }}
          className="relative w-full flex justify-center items-end leading-none origin-bottom will-change-transform transform-gpu"
        >
          <div className="relative inline-flex items-end justify-center leading-none">
            {/* 5 Orbiting Stones - strictly behind the center bottom image, radius collapses on scroll */}
            <RevolvingStone scrollProgress={smoothProgress} />

            <Image
              src="/images/gemini-laptop-cutout.webp"
              alt="Anurag Verma - Gemini Laptop Product Showcase"
              width={1800}
              height={1600}
              priority
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 58vw, 960px"
              className="relative z-10 w-[min(94vw,calc(84vh*1.125))] sm:w-[min(80vw,calc(80vh*1.125))] md:w-[min(49vw,calc(78vh*1.125))] max-w-[960px] h-auto object-contain object-bottom block align-bottom select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


