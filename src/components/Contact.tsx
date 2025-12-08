"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Ferrofluid from "@/components/Ferrofluid";
import {
  ArrowUpRight,
  Check,
  Copy,
  GitBranch,
  Globe,
  Mail,
} from "lucide-react";

const SOCIAL_CHANNELS = [
  {
    name: "GitHub",
    label: "github.com/Anurag-amrev-7557",
    href: "https://github.com/Anurag-amrev-7557",
    icon: GitBranch,
  },
  {
    name: "LinkedIn",
    label: "linkedin.com/in/anurag-verma",
    href: "https://www.linkedin.com/in/anurag-verma-18645b280/",
    icon: Globe,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 15%"],
  });

  // Inertial spring smoothing matching Hero and AntiGravityWork physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Reversible two-way scroll transition (Work <-> Contact) with 3D depth
  const dividerScaleX = useTransform(smoothProgress, [0.05, 0.55], [0, 1], { clamp: true });
  const dividerOpacity = useTransform(smoothProgress, [0.05, 0.55], [0, 0.22], { clamp: true });

  // 3D Left column entrance: tilts from -12deg rotateX and scales from 0.88 → 1
  const contentOpacity = useTransform(smoothProgress, [0.12, 0.68], [0, 1], { clamp: true });
  const contentY = useTransform(smoothProgress, [0.12, 0.72], [70, 0], { clamp: true });
  const contentRotateX = useTransform(smoothProgress, [0.12, 0.72], [-12, 0], { clamp: true });
  const contentScale = useTransform(smoothProgress, [0.12, 0.72], [0.88, 1], { clamp: true });

  // 3D Right column (portal) entrance: tilts from -14deg rotateX and scales from 0.85 → 1
  const portalOpacity = useTransform(smoothProgress, [0.18, 0.78], [0, 1], { clamp: true });
  const portalY = useTransform(smoothProgress, [0.18, 0.82], [90, 0], { clamp: true });
  const portalRotateX = useTransform(smoothProgress, [0.18, 0.82], [-14, 0], { clamp: true });
  const portalScale = useTransform(smoothProgress, [0.18, 0.82], [0.85, 1], { clamp: true });

  const [copied, setCopied] = useState(false);
  const email = "anuragverma08002@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#DCDCDC] text-[#141416] w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-16 sm:pt-20 md:pt-28 pb-14 sm:pb-16 md:pb-24 overflow-clip select-none touch-pan-y [perspective:1200px]"
    >
      {/* Dynamic Expanding Spatial Divider between Work and Contact */}
      <motion.div
        style={{ scaleX: dividerScaleX, opacity: dividerOpacity }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black to-transparent origin-center pointer-events-none z-20"
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end relative z-10">
        {/* ================= LEFT COLUMN: Editorial & Contact Suite ================= */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, rotateX: contentRotateX, scale: contentScale }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col justify-end relative z-20 transform-gpu will-change-transform [transform-style:preserve-3d] origin-bottom"
        >
          {/* Status Badge */}
          <div className="mb-6 self-start inline-flex items-center gap-2 px-3 py-1.5 sm:gap-2.5 sm:px-3.5 rounded-full border border-black/15 bg-black/[0.04] backdrop-blur-md shadow-2xs max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4D38] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D4D38]" />
            </span>
            <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.12em] sm:tracking-[0.22em] uppercase text-[#141416]/90 whitespace-nowrap">
              AVAILABLE FOR NEW VENTURES • 2026
            </span>
          </div>

          {/* Editorial Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#141416] leading-[1.08] mb-6">
            Step through the portal.
            <span className="block font-serif italic text-[#141416]/90 font-normal mt-1">
              Let&apos;s build what&apos;s next.
            </span>
          </h2>

          {/* Narrative Copy */}
          <p className="text-base sm:text-lg text-[#141416]/75 max-w-xl leading-relaxed font-light mb-10">
            I partner with founders, visionary studios, and engineering teams who
            value uncommon craft, spatial intelligence, and precision execution.
            Have a project in mind? Reach out and let&apos;s turn the theoretical into reality.
          </p>

          {/* Interactive Email Action Hub */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            {/* Direct Copy Button */}
            <button
              onClick={handleCopy}
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-black/20 bg-[#141416] text-[#DCDCDC] text-sm font-medium tracking-wide hover:bg-[#2D4D38] hover:border-[#2D4D38] hover:text-white active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer"
              title="Click to copy email address"
            >
              <Mail className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-xs sm:text-sm tracking-tight">{email}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors ml-1">
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-300" />
                ) : (
                  <Copy className="w-3 h-3 opacity-80" />
                )}
              </span>

              {/* Copied pill tooltip */}
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: -34, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#141416] text-white text-[11px] font-mono tracking-wider shadow-lg border border-white/20 pointer-events-none whitespace-nowrap"
                >
                  COPIED TO CLIPBOARD ✓
                </motion.span>
              )}
            </button>

            {/* Direct Mailto */}
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141416]/85 hover:text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all duration-300 py-2"
            >
              <span>Compose directly</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Channels Strip (Last element of left content) */}
          <div className="flex flex-wrap items-center gap-3">
            {SOCIAL_CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 bg-black/[0.03] text-xs font-mono text-[#141416]/80 hover:text-black hover:border-black/30 hover:bg-black/[0.07] transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{channel.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-40" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: The Grounded Stone Portal (Base-aligned) ================= */}
        <motion.div
          style={{ opacity: portalOpacity, y: portalY, rotateX: portalRotateX, scale: portalScale }}
          className="lg:col-span-6 xl:col-span-6 flex items-end justify-center lg:justify-end relative w-full transform-gpu will-change-transform [transform-style:preserve-3d] origin-bottom"
        >
          {/* Grounded Monolithic Stone Portal Container */}
          <div className="relative w-full max-w-[580px] lg:max-w-[620px] xl:max-w-[650px] aspect-[1997/1388] flex items-end justify-center select-none transform-gpu touch-pan-y">
            {/* === FERROFLUID CLIPPED STRICTLY TO THE PORTAL CENTER VOID === */}
            <div
              className="absolute overflow-hidden rounded-full bg-[#0a0a0c] z-0 pointer-events-none"
              style={{
                left: "50.48%",
                top: "48.38%",
                width: "37%",
                height: "53%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Ferrofluid
                backgroundColor="#0a0a0c"
                colors={["#ffffff", "#ffffff", "#ffffff"]}
                speed={0.5}
                scale={1}
                turbulence={1}
                fluidity={0.1}
                rimWidth={0.2}
                sharpness={3}
                shimmer={1}
                glow={2}
                flowDirection="down"
                opacity={1}
                mouseInteraction={false}
                mouseStrength={0}
                mouseRadius={0.3}
              />
            </div>

            {/* === THE ANCIENT STONE PORTAL (Clean, no shadow, framing the void) === */}
            <div className="relative w-full h-full z-10 pointer-events-none">
              <Image
                src="/images/stone-portal-tight.webp"
                alt="Ancient Stone Portal - Spatial Gateway"
                fill
                priority
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 650px"
                className="object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
