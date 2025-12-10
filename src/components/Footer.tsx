"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimationFrame,
} from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  GitBranch,
  Globe,
  Mail,
  Terminal,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@Anurag-amrev-7557",
    href: "https://github.com/Anurag-amrev-7557",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    handle: "anurag-verma",
    href: "https://www.linkedin.com/in/anurag-verma-18645b280/",
    icon: Globe,
  },
  {
    label: "Email",
    handle: "anuragverma08002@gmail.com",
    href: "mailto:anuragverma08002@gmail.com",
    icon: Mail,
  },
];

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// 120 time-sampled trajectory frames produced by a 2D rigid-body physics simulation
// Solves: a = (5/7)*g*sin(theta) along bedrock terrain + vertical downward projectile free fall off left cliff
const PHYSICS_TRAJECTORY = [
  { x: 104.95, y: 10.5, r: -0.0, air: 0 }, { x: 104.72, y: 10.57, r: -2.9, air: 0 }, { x: 104.48, y: 10.64, r: -5.9, air: 0 }, { x: 104.22, y: 10.71, r: -9.1, air: 0 },
  { x: 103.95, y: 10.79, r: -12.5, air: 0 }, { x: 103.66, y: 10.87, r: -16.1, air: 0 }, { x: 103.36, y: 10.95, r: -19.9, air: 0 }, { x: 103.05, y: 11.04, r: -23.8, air: 0 },
  { x: 102.73, y: 11.14, r: -27.8, air: 0 }, { x: 102.39, y: 11.23, r: -32.0, air: 0 }, { x: 102.03, y: 11.34, r: -36.5, air: 0 }, { x: 101.67, y: 11.45, r: -41.0, air: 0 },
  { x: 101.28, y: 11.56, r: -45.9, air: 0 }, { x: 100.89, y: 11.69, r: -50.8, air: 0 }, { x: 100.48, y: 11.82, r: -55.9, air: 0 }, { x: 100.06, y: 11.96, r: -61.2, air: 0 },
  { x: 99.62, y: 12.12, r: -66.7, air: 0 }, { x: 99.17, y: 12.27, r: -72.4, air: 0 }, { x: 98.7, y: 12.44, r: -78.3, air: 0 }, { x: 98.21, y: 12.61, r: -84.4, air: 0 },
  { x: 97.72, y: 12.8, r: -90.6, air: 0 }, { x: 97.2, y: 13.0, r: -97.2, air: 0 }, { x: 96.68, y: 13.21, r: -103.7, air: 0 }, { x: 96.14, y: 13.44, r: -110.5, air: 0 },
  { x: 95.58, y: 13.69, r: -117.6, air: 0 }, { x: 95.02, y: 13.97, r: -124.7, air: 0 }, { x: 94.44, y: 14.26, r: -132.1, air: 0 }, { x: 93.84, y: 14.58, r: -139.8, air: 0 },
  { x: 93.23, y: 14.92, r: -147.6, air: 0 }, { x: 92.61, y: 15.27, r: -155.5, air: 0 }, { x: 91.97, y: 15.65, r: -163.8, air: 0 }, { x: 91.31, y: 16.04, r: -172.2, air: 0 },
  { x: 90.63, y: 16.45, r: -181.0, air: 0 }, { x: 89.94, y: 16.88, r: -189.9, air: 0 }, { x: 89.22, y: 17.33, r: -199.2, air: 0 }, { x: 88.49, y: 17.79, r: -208.6, air: 0 },
  { x: 87.76, y: 18.29, r: -218.1, air: 0 }, { x: 87.02, y: 18.82, r: -227.7, air: 0 }, { x: 86.26, y: 19.38, r: -237.7, air: 0 }, { x: 85.47, y: 19.95, r: -248.0, air: 0 },
  { x: 84.66, y: 20.51, r: -258.6, air: 0 }, { x: 83.8, y: 21.06, r: -269.7, air: 0 }, { x: 82.9, y: 21.58, r: -281.2, air: 0 }, { x: 81.93, y: 22.03, r: -293.5, air: 0 },
  { x: 80.9, y: 22.33, r: -306.4, air: 0 }, { x: 79.82, y: 22.52, r: -319.8, air: 0 }, { x: 78.73, y: 22.68, r: -333.4, air: 0 }, { x: 77.64, y: 22.89, r: -346.9, air: 0 },
  { x: 76.57, y: 23.22, r: -360.3, air: 0 }, { x: 75.54, y: 23.71, r: -373.4, air: 0 }, { x: 74.59, y: 24.38, r: -385.8, air: 0 }, { x: 73.72, y: 25.19, r: -397.5, air: 0 },
  { x: 72.93, y: 26.12, r: -408.7, air: 0 }, { x: 72.17, y: 27.11, r: -419.6, air: 0 }, { x: 71.44, y: 28.14, r: -430.4, air: 0 }, { x: 70.71, y: 29.22, r: -441.4, air: 0 },
  { x: 69.98, y: 30.32, r: -452.4, air: 0 }, { x: 69.25, y: 31.45, r: -463.5, air: 0 }, { x: 68.49, y: 32.59, r: -474.9, air: 0 }, { x: 67.69, y: 33.74, r: -486.8, air: 0 },
  { x: 66.84, y: 34.89, r: -499.2, air: 0 }, { x: 65.92, y: 36.0, r: -512.3, air: 0 }, { x: 64.87, y: 37.04, r: -526.6, air: 0 }, { x: 63.72, y: 38.01, r: -541.9, air: 0 },
  { x: 62.47, y: 38.9, r: -558.2, air: 0 }, { x: 61.14, y: 39.69, r: -575.3, air: 0 }, { x: 59.72, y: 40.39, r: -593.3, air: 0 }, { x: 58.26, y: 41.02, r: -611.8, air: 0 },
  { x: 56.76, y: 41.62, r: -630.7, air: 0 }, { x: 55.19, y: 42.06, r: -650.3, air: 0 }, { x: 53.56, y: 42.29, r: -670.6, air: 0 }, { x: 51.92, y: 42.44, r: -690.9, air: 0 },
  { x: 50.28, y: 42.68, r: -711.3, air: 0 }, { x: 48.69, y: 43.17, r: -731.2, air: 0 }, { x: 47.23, y: 44.0, r: -749.9, air: 0 }, { x: 45.95, y: 45.14, r: -767.1, air: 0 },
  { x: 44.77, y: 46.42, r: -783.4, air: 0 }, { x: 43.64, y: 47.77, r: -799.4, air: 0 }, { x: 42.48, y: 49.15, r: -815.8, air: 0 }, { x: 41.23, y: 50.47, r: -833.0, air: 0 },
  { x: 39.79, y: 51.62, r: -852.0, air: 0 }, { x: 38.11, y: 52.43, r: -873.4, air: 0 }, { x: 36.29, y: 52.91, r: -896.1, air: 0 }, { x: 34.41, y: 53.18, r: -919.5, air: 0 },
  { x: 32.52, y: 53.46, r: -943.0, air: 0 }, { x: 30.65, y: 53.81, r: -966.2, air: 0 }, { x: 28.73, y: 53.93, r: -990.0, air: 0 }, { x: 26.82, y: 54.13, r: -1013.8, air: 0 },
  { x: 25.0, y: 54.78, r: -1036.6, air: 0 }, { x: 23.45, y: 55.96, r: -1057.0, air: 0 }, { x: 22.17, y: 57.48, r: -1075.1, air: 0 }, { x: 21.02, y: 59.13, r: -1092.1, air: 0 },
  { x: 19.95, y: 60.86, r: -1108.7, air: 0 }, { x: 18.9, y: 62.64, r: -1125.2, air: 0 }, { x: 17.84, y: 64.43, r: -1141.8, air: 0 }, { x: 16.75, y: 66.24, r: -1158.8, air: 0 },
  { x: 15.56, y: 68.01, r: -1176.7, air: 0 }, { x: 14.29, y: 69.75, r: -1195.3, air: 0 }, { x: 12.97, y: 71.5, r: -1214.5, air: 0 }, { x: 11.63, y: 73.25, r: -1233.8, air: 0 },
  { x: 10.28, y: 75.04, r: -1253.4, air: 0 }, { x: 8.98, y: 76.89, r: -1272.7, air: 0 }, { x: 7.77, y: 78.83, r: -1291.3, air: 0 }, { x: 6.62, y: 80.84, r: -1309.6, air: 0 },
  { x: 5.52, y: 82.9, r: -1327.6, air: 0 }, { x: 4.41, y: 84.98, r: -1345.8, air: 0 }, { x: 3.98, y: 87.12, r: -1359.1, air: 1 }, { x: 3.63, y: 89.37, r: -1372.6, air: 1 },
  { x: 3.31, y: 91.74, r: -1386.7, air: 1 }, { x: 3.02, y: 94.22, r: -1401.3, air: 1 }, { x: 2.76, y: 96.81, r: -1416.4, air: 1 }, { x: 2.52, y: 99.52, r: -1432.1, air: 1 },
  { x: 2.31, y: 102.34, r: -1448.4, air: 1 }, { x: 2.11, y: 105.28, r: -1465.4, air: 1 }, { x: 1.93, y: 108.33, r: -1482.9, air: 1 }, { x: 1.76, y: 111.5, r: -1501.1, air: 1 },
  { x: 1.61, y: 114.78, r: -1519.9, air: 1 }, { x: 1.47, y: 118.17, r: -1539.3, air: 1 }, { x: 1.35, y: 121.68, r: -1559.3, air: 1 }, { x: 1.23, y: 125.3, r: -1580.0, air: 1 },
];

function RollingStone({ parentRef }: { parentRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stoneRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  // Exact physics simulation duration
  const ROLL_MS = 4560; // 4.56s continuous physics roll & cliff plunge
  const CYCLE_MS = 6100; // 6.1s per loop (1.54s reset pause)
  const INITIAL_DELAY_MS = 800; // start 0.8s after entering view

  useAnimationFrame((time) => {
    if (!containerRef.current || !stoneRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;
    if (elapsed < INITIAL_DELAY_MS) {
      containerRef.current.style.opacity = "0";
      return;
    }

    const cycleTime = (elapsed - INITIAL_DELAY_MS) % CYCLE_MS;

    if (cycleTime > ROLL_MS) {
      // Stone is off-screen waiting for next cycle
      containerRef.current.style.opacity = "0";
      return;
    }

    // Direct linear time mapping: physics engine already integrated true velocity & gravity acceleration over time!
    const maxIdx = PHYSICS_TRAJECTORY.length - 1;
    const progress = (cycleTime / ROLL_MS) * maxIdx;
    const i = Math.min(Math.floor(progress), maxIdx - 1);
    const frac = progress - i;

    const p0 = PHYSICS_TRAJECTORY[i];
    const p1 = PHYSICS_TRAJECTORY[i + 1];

    const xPct = p0.x + frac * (p1.x - p0.x);
    const yPct = p0.y + frac * (p1.y - p0.y);
    const rotAngle = p0.r + frac * (p1.r - p0.r);
    const isAirborne = p0.air === 1 || p1.air === 1;

    // Bedrock container pixel dimensions for subpixel GPU transform
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1000;
    const parentW = parentRef.current?.clientWidth || (screenW < 768 ? screenW * 0.96 : Math.min(screenW * 0.65, 1320));
    const parentH = parentRef.current?.clientHeight || parentW * (1265 / 2752);
    const px = (xPct / 100) * parentW;
    const py = (yPct / 100) * parentH;

    // Smooth exit opacity when plunging deep past screen bottom
    const opacity = yPct > 105 ? Math.max(0, 1 - (yPct - 105) / 16) : 1;

    // Contact shadow fades out naturally as soon as stone launches into free fall
    const shadowOpacity = isAirborne
      ? Math.max(0, 0.55 - (yPct - 85) * 0.035)
      : 0.55;

    containerRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate3d(-50%, -50%, 0)`;
    containerRef.current.style.opacity = `${opacity}`;
    stoneRef.current.style.transform = `rotate3d(0, 0, 1, ${rotAngle}deg)`;

    if (shadowRef.current) {
      shadowRef.current.style.opacity = `${shadowOpacity}`;
    }
  });

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-[3.8%] aspect-square will-change-transform transform-gpu pointer-events-none z-10"
      style={{ opacity: 0 }}
    >
      {/* Soft natural contact shadow on the rock surface, dynamically fades in midair */}
      <div
        ref={shadowRef}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/50 rounded-full blur-[3px] pointer-events-none"
      />

      {/* Rotating round cavern stone with clean natural alpha silhouette */}
      <div
        ref={stoneRef}
        className="relative w-full h-full will-change-transform transform-gpu"
      >
        <Image
          src="/images/stone-cavern-round-tight.webp"
          alt="Rolling Cavern Stone"
          fill
          sizes="80px"
          className="object-contain select-none"
        />
      </div>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bedrockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Hero-style smoothed scroll-linked rise from bottom
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const bedrockY = useTransform(smoothProgress, [0, 1], ["55%", "0%"]);
  const bedrockOpacity = useTransform(smoothProgress, [0.05, 0.75], [0, 1]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#DCDCDC] border-t border-black/15 overflow-hidden pt-16 md:pt-20 pb-5 select-none"
    >
      {/* Subtle ambient accent background */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-sage/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Anchored 3D Bedrock Formation at Immediate Bottom-Right Corner - Linked with scroll, z-20 above footer */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none z-20 leading-none">
        <motion.div
          ref={bedrockRef}
          style={{ y: bedrockY, opacity: bedrockOpacity }}
          className="relative w-[96vw] sm:w-[86vw] md:w-[75vw] lg:w-[65vw] xl:w-[58vw] max-w-[1320px] aspect-[2752/1265] origin-bottom-right will-change-transform transform-gpu"
        >
          <Image
            src="/images/stone-bedrock.webp"
            alt="Monolithic Bedrock Formation"
            fill
            priority
            sizes="(max-width: 768px) 96vw, (max-width: 1280px) 75vw, 1320px"
            className="object-contain object-right-bottom drop-shadow-[0_-8px_25px_rgba(0,0,0,0.12)]"
          />

          {/* Rolling Round Cavern Stone - Physics-derived contour tracking, no-slip rotation & gravity acceleration */}
          {isInView && <RollingStone parentRef={bedrockRef} />}
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Directory Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 md:pb-16 border-b border-black/15 text-sm">
          {/* Col 1: Identity */}
          <div className="col-span-2 lg:col-span-4 space-y-3">
            <span className="font-serif text-2xl text-[#141416] font-normal block">
              Anurag Verma
            </span>
            <p className="text-sm text-[#26262B] leading-relaxed max-w-sm font-normal">
              Software Engineer & AI Developer based in Agra, India. Crafting high-throughput distributed engines, Graph RAG systems, and WebGL cartography.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[#1E4D2B] font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                IIT Bhubaneswar Alumni Track
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#141416] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#141416]/70" />
              <span>Navigation</span>
            </div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#242428] hover:text-[#000000] hover:underline transition-colors duration-200 font-medium inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Repos */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#141416] font-bold block">
              Channels
            </span>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-[#242428] hover:text-[#000000] transition-colors duration-200 font-medium"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#141416]/70 group-hover:text-[#000000]" />
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#141416]/60 group-hover:text-[#000000] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Large Decorative Watermark */}
        <div className="pt-6 md:pt-8 pb-3 md:pb-4 select-none pointer-events-none overflow-hidden opacity-[0.06]">
          <span className="font-serif text-[clamp(3rem,14vw,13rem)] leading-none text-[#141416] font-normal block whitespace-normal sm:whitespace-nowrap tracking-tighter">
            Anurag Verma
          </span>
        </div>

        {/* Bottom Tier: Colophon & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/15 text-xs font-mono text-[#2C2C32] font-medium">
          <p>© {new Date().getFullYear()} Anurag Verma. Crafted with Next.js & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}

