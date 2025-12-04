"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import CavernOrbitingStones from "@/components/CavernOrbitingStones";

const PROJECTS = [
  {
    id: "omni-graph-rag",
    number: "01",
    slug: "omni-graph-rag",
    title: "Omni: Enterprise Graph RAG",
    category: "AI Systems & Knowledge Retrieval",
    year: "2026",
    summary:
      "Enterprise-grade multi-document Graph RAG workstation engineered for complex analytical synthesis with Groq LPU acceleration and hybrid vector/lexical retrieval.",
    technologies: ["FastAPI", "Qdrant Vector DB", "Groq LPUs", "GraphRAG", "LangChain"],
    metrics: [
      { label: "TTFT Latency", value: "<320ms" },
      { label: "Faithfulness", value: "98.4%" },
      { label: "Accuracy", value: "+46%" },
    ],
    artifact: "/images/artifact-1.webp",
    artifactWidth: "w-[30%] sm:w-[26%]",
    artifactBottom: "bottom-[68%]",
    floatDuration: 6.8,
    yDelta: 9,
    rotDelta: 1.4,
  },
  {
    id: "mapfolio-gis-platform",
    number: "02",
    slug: "mapfolio-gis-platform",
    title: "Mapfolio: WebGL GIS Engine",
    category: "WebGL & Spatial Engineering",
    year: "2026",
    summary:
      "High-performance WebGL cartographic workstation rendering global vector tiles, 3D building extrusions, and 4K print exports at fluid 60 FPS.",
    technologies: ["WebGL", "Three.js", "MapLibre GL", "TypeScript", "PostGIS"],
    metrics: [
      { label: "Render Rate", value: "60 FPS" },
      { label: "Export Res", value: "4K / 300 DPI" },
      { label: "Snapping", value: "<15ms" },
    ],
    artifact: "/images/artifact-2.webp",
    artifactWidth: "w-[32%] sm:w-[28%]",
    artifactBottom: "bottom-[68%]",
    floatDuration: 7.4,
    yDelta: -10,
    rotDelta: -1.5,
  },
  {
    id: "fxsync-audio-platform",
    number: "03",
    slug: "fxsync-audio-platform",
    title: "FxSync: Spatial Audio Engine",
    category: "Audio DSP & WebAssembly",
    year: "2026",
    summary:
      "Professional real-time binaural spatial audio suite featuring ultra-low latency WebAudio DSP nodes and SIMD-accelerated WebAssembly kernels.",
    technologies: ["WebAssembly", "C++ / Rust", "WebAudio API", "React", "Tailwind CSS"],
    metrics: [
      { label: "DSP Latency", value: "<8ms" },
      { label: "Channels", value: "64-ch" },
      { label: "CPU Overhead", value: "<4.2%" },
    ],
    artifact: "/images/artifact-3.webp",
    artifactWidth: "w-[32%] sm:w-[28%]",
    artifactBottom: "bottom-[68%]",
    floatDuration: 8.0,
    yDelta: 10,
    rotDelta: -1.3,
  },
  {
    id: "votely-decision-platform",
    number: "04",
    slug: "votely-decision-platform",
    title: "Votely: Spatial Governance",
    category: "Distributed Systems & Governance",
    year: "2026",
    summary:
      "Cryptographically verified spatial governance interface with real-time websocket synchronization and quadratic voting mathematics at enterprise scale.",
    technologies: ["Next.js 16", "Go / Gin", "PostgreSQL", "Tailwind CSS", "WebSockets"],
    metrics: [
      { label: "Throughput", value: "12k req/s" },
      { label: "Sync Latency", value: "<45ms" },
      { label: "Verifiability", value: "100%" },
    ],
    artifact: "/images/artifact-4.webp",
    artifactWidth: "w-[38%] sm:w-[34%]",
    artifactBottom: "bottom-[68%]",
    floatDuration: 7.1,
    yDelta: -9,
    rotDelta: 1.4,
  },
];

interface OrbitStoneProps {
  project: (typeof PROJECTS)[0];
  index: number;
  activeIndex: number;
  rotationMotion: ReturnType<typeof useMotionValue<number>>;
  emergenceProgress: ReturnType<typeof useTransform<number, number>>;
  radiusMotion: ReturnType<typeof useMotionValue<number>>;
  stoneW: number;
  stoneH: number;
  onSelect: (index: number) => void;
}

function OrbitStone({
  project,
  index,
  activeIndex,
  rotationMotion,
  emergenceProgress,
  radiusMotion,
  stoneW,
  stoneH,
  onSelect,
}: OrbitStoneProps) {
  const isFront = index === activeIndex;

  // Orbital X coordinate:
  // Center front stone stays at X = 0 (no movement)
  // Inactive side stones emerge OUTWARD from center (X = 0 -> +/- radius) on entry,
  // and retract BACK INTO center (X = +/- radius -> 0) on scroll exit.
  const x = useTransform(
    [rotationMotion, emergenceProgress, radiusMotion],
    ([rot, emergence, rad]: number[]) => {
      const angleDeg = rot + index * 90;
      const radAngle = (angleDeg * Math.PI) / 180;
      const sinVal = Math.sin(radAngle);
      const cosVal = Math.cos(radAngle);

      // Active front stone stays centered at X = 0
      const isFrontSlot = cosVal > 0.85;
      const currentRadius = isFrontSlot ? rad : rad * emergence;
      return currentRadius * sinVal;
    }
  );

  // Y coordinate:
  // Active center stone has NO vertical movement (strictly 0)
  // Inactive side stones have a subtle 12px arc drop on the orbit for turntable perspective
  const y = useTransform(rotationMotion, (rot: number) => {
    const angleDeg = rot + index * 90;
    const radAngle = (angleDeg * Math.PI) / 180;
    const cosVal = Math.cos(radAngle);

    // Front stone is strictly at Y = 0 (zero vertical movement)
    if (cosVal > 0.85) return 0;

    return 12 * (1 - Math.max(0, cosVal));
  });

  // Scale: Enhanced 1.24 at front, 0.82 at sides for bolder presence
  const scale = useTransform(rotationMotion, (rot: number) => {
    const angleDeg = rot + index * 90;
    const radAngle = (angleDeg * Math.PI) / 180;
    const cosVal = Math.cos(radAngle);
    return cosVal >= 0 ? 0.84 + 0.40 * cosVal : 0.82 + 0.22 * cosVal;
  });

  // Opacity: Front stone is always visible (1.0).
  // Side stones smoothly fade in (0 -> 0.65) on entry as they emerge out,
  // and smoothly fade back out (0.65 -> 0) on exit as they retract into the active item.
  const opacity = useTransform(
    [rotationMotion, emergenceProgress],
    ([rot, emergence]: number[]) => {
      const angleDeg = rot + index * 90;
      const radAngle = (angleDeg * Math.PI) / 180;
      const cosVal = Math.cos(radAngle);

      let baseOpacity = 0;
      if (cosVal >= 0) {
        baseOpacity = 0.65 + 0.35 * cosVal;
      } else {
        baseOpacity = Math.max(0, 0.65 * (1 + cosVal / 0.5));
      }

      if (cosVal > 0.85) {
        return baseOpacity;
      }

      return baseOpacity * emergence;
    }
  );

  // Layered zIndex: 31 at front, 16 at sides, 1 at back
  const zIndex = useTransform(rotationMotion, (rot: number) => {
    const angleDeg = rot + index * 90;
    const radAngle = (angleDeg * Math.PI) / 180;
    const cosVal = Math.cos(radAngle);
    return Math.round((cosVal + 1) * 15) + 1;
  });

  const slotDiff = ((index - activeIndex) % 4 + 4) % 4;
  const isBack = slotDiff === 2;

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex,
        position: "absolute",
        left: "50%",
        top: "50%",
        width: stoneW,
        height: stoneH,
        marginLeft: -stoneW / 2,
        marginTop: -stoneH / 2,
        pointerEvents: isBack ? "none" : "auto",
      }}
      className={`flex items-center justify-center select-none ${
        isFront ? "cursor-default" : isBack ? "pointer-events-none" : "cursor-pointer"
      }`}
      onClick={(e) => {
        if (!isFront && !isBack) {
          e.stopPropagation();
          onSelect(index);
        }
      }}
    >
      {/* Oscillation Loop: No vertical movement on active item (y: 0), only subtle anti-gravity rotational tilt */}
      <motion.div
        animate={
          isFront
            ? {
                y: 0,
                rotate: [-project.rotDelta, project.rotDelta, -project.rotDelta],
              }
            : { y: 0, rotate: 0 }
        }
        transition={{
          duration: project.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full will-change-transform transform-gpu"
      >
        <Link
          href={`/work/${project.slug}`}
          className={`group relative w-full h-full block select-none ${
            isFront ? "pointer-events-auto" : "pointer-events-none"
          }`}
          title={isFront ? `Open ${project.title} Case Study` : `View ${project.title}`}
          onClick={(e) => {
            if (!isFront) e.preventDefault();
          }}
        >
          {/* Horizontal Orbiting Round Stones revolving around this cavern */}
          {isFront && (
            <CavernOrbitingStones
              stoneW={stoneW}
              stoneH={stoneH}
              cavernIndex={index}
              isFront={isFront}
            />
          )}

          {/* Floating Cavern Rock Base - pristine unwarped 1400:764 aspect ratio */}
          <div className="relative w-full h-full z-[5]">
            <Image
              src="/images/stone-cavern.webp"
              alt={`Floating Cavern Rock - ${project.title}`}
              fill
              priority={isFront}
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 55vw, 500px"
              className={`object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] select-none pointer-events-none transition-transform duration-500 ease-out ${
                isFront ? "group-hover:scale-[1.02]" : ""
              }`}
            />
          </div>

          {/* Placed Artifact Image Resting on the Stone Cavern */}
          <div
            className={`absolute ${project.artifactBottom} left-1/2 -translate-x-1/2 ${project.artifactWidth} z-10 flex items-end justify-center pointer-events-none transition-transform duration-500 ease-out ${
              isFront ? "group-hover:scale-[1.03] group-hover:-translate-y-1" : ""
            }`}
          >
            <Image
              src={project.artifact}
              alt={project.title}
              width={800}
              height={800}
              priority={isFront}
              sizes="(max-width: 768px) 35vw, 240px"
              className="w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function AntiGravityWork() {
  const [rotation, setRotation] = useState(0);
  const [orbit, setOrbit] = useState({ radius: 440, stoneW: 480 });
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  // Motion values for fluid 120fps carousel rotation
  const rotationMotion = useMotionValue(0);
  const radiusMotion = useMotionValue(440);

  // Section reference for scroll-linked entrance & exit
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Inertial spring smoothing matching Hero section physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Side Stones Emergence & Retraction:
  // On entry from Hero: unactive items emerge OUTWARD from active item (0.15 -> 0.35)
  // Fully emerged throughout project showcase: (0.35 -> 0.62)
  // On exit into Contact: unactive items gracefully converge back into active item (0.62 -> 0.85)
  const emergenceProgress = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.62, 0.85],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Navigation buttons: fade in on entry and fade out on exit into Contact
  const navButtonsOpacity = useTransform(
    smoothProgress,
    [0.22, 0.35, 0.62, 0.82],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // 3D Carousel Stage exit transition towards Contact (and reverse back from Contact)
  const stageExitY = useTransform(smoothProgress, [0.60, 0.88], [0, -85], { clamp: true });
  const stageExitRotateX = useTransform(smoothProgress, [0.60, 0.88], [0, 16], { clamp: true });
  const stageExitScale = useTransform(smoothProgress, [0.60, 0.88], [1, 0.85], { clamp: true });
  const stageExitOpacity = useTransform(smoothProgress, [0.64, 0.88], [1, 0], { clamp: true });

  // 3D Project details panel exit transition towards Contact (and reverse back from Contact)
  const detailsExitY = useTransform(smoothProgress, [0.58, 0.85], [0, -45], { clamp: true });
  const detailsExitRotateX = useTransform(smoothProgress, [0.58, 0.85], [0, 12], { clamp: true });
  const detailsExitScale = useTransform(smoothProgress, [0.58, 0.85], [1, 0.90], { clamp: true });
  const detailsExitOpacity = useTransform(smoothProgress, [0.58, 0.82], [1, 0], { clamp: true });

  // Responsive orbit dimensions scaled up to match About section presence
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let newOrbit = { radius: 440, stoneW: 480 };
      if (w < 640) {
        newOrbit = { radius: 190, stoneW: 280 };
      } else if (w < 1024) {
        newOrbit = { radius: 280, stoneW: 350 };
      } else if (w < 1440) {
        newOrbit = { radius: 370, stoneW: 420 };
      } else {
        newOrbit = { radius: 440, stoneW: 480 };
      }
      setOrbit(newOrbit);
      radiusMotion.set(newOrbit.radius);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [radiusMotion]);

  // Compute active index from rotation
  const activeIndex = ((-Math.round(rotation / 90) % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
  const activeProject = PROJECTS[activeIndex];

  const rotateTo = useCallback(
    (newRotation: number) => {
      setRotation(newRotation);
      animate(rotationMotion, newRotation, {
        duration: 0.82,
        ease: [0.22, 1, 0.36, 1],
      });
    },
    [rotationMotion]
  );

  const nextProject = useCallback(() => {
    rotateTo(rotation - 90);
  }, [rotation, rotateTo]);

  const prevProject = useCallback(() => {
    rotateTo(rotation + 90);
  }, [rotation, rotateTo]);

  const goToProject = useCallback(
    (targetIndex: number) => {
      const currentActive = ((-Math.round(rotation / 90) % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
      let diff = (targetIndex - currentActive) % PROJECTS.length;
      if (diff > PROJECTS.length / 2) diff -= PROJECTS.length;
      if (diff < -PROJECTS.length / 2) diff += PROJECTS.length;
      rotateTo(rotation - diff * 90);
    },
    [rotation, rotateTo]
  );

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject]);

  const stoneH = orbit.stoneW * (764 / 1400);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[100dvh] bg-[#DCDCDC] overflow-hidden select-none flex flex-col justify-center items-center pt-14 sm:pt-16 md:pt-18 pb-6 sm:pb-8 [perspective:1400px]"
    >
      {/* Accessible Section Heading for Screen Readers & SEO */}
      <h2 className="sr-only">Selected Works</h2>

      {/* 3D Circular Revolving Carousel Stage - Expanded scale */}
      <motion.div
        style={{ y: stageExitY, rotateX: stageExitRotateX, scale: stageExitScale, opacity: stageExitOpacity }}
        className="relative w-full max-w-[1440px] h-[340px] sm:h-[380px] md:h-[420px] lg:h-[450px] px-4 sm:px-8 md:px-12 flex items-center justify-center cursor-grab active:cursor-grabbing mb-3 sm:mb-5 md:mb-6 transform-gpu will-change-transform [transform-style:preserve-3d] origin-center"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = e.changedTouches[0].clientX - touchStartX.current;
          if (diff < -45) nextProject();
          else if (diff > 45) prevProject();
          touchStartX.current = null;
        }}
        onMouseDown={(e) => {
          mouseStartX.current = e.clientX;
        }}
        onMouseUp={(e) => {
          if (mouseStartX.current === null) return;
          const diff = e.clientX - mouseStartX.current;
          if (diff < -50) nextProject();
          else if (diff > 50) prevProject();
          mouseStartX.current = null;
        }}
      >
        {/* Left Navigation Arrow */}
        <motion.button
          style={{ opacity: navButtonsOpacity }}
          onClick={(e) => {
            e.stopPropagation();
            prevProject();
          }}
          className="absolute left-3 sm:left-6 md:left-10 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/15 bg-[#E5E5E5] hover:bg-[#ECECEC] active:scale-95 transition-all flex items-center justify-center text-[#141416] shadow-sm hover:shadow cursor-pointer"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
        </motion.button>

        {/* Orbit Turntable Stage Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {PROJECTS.map((project, i) => (
            <OrbitStone
              key={project.id}
              project={project}
              index={i}
              activeIndex={activeIndex}
              rotationMotion={rotationMotion}
              emergenceProgress={emergenceProgress}
              radiusMotion={radiusMotion}
              stoneW={orbit.stoneW}
              stoneH={stoneH}
              onSelect={goToProject}
            />
          ))}
        </div>

        {/* Right Navigation Arrow */}
        <motion.button
          style={{ opacity: navButtonsOpacity }}
          onClick={(e) => {
            e.stopPropagation();
            nextProject();
          }}
          className="absolute right-3 sm:right-6 md:right-10 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/15 bg-[#E5E5E5] hover:bg-[#ECECEC] active:scale-95 transition-all flex items-center justify-center text-[#141416] shadow-sm hover:shadow cursor-pointer"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
        </motion.button>
      </motion.div>

      {/* Linked "About the Project" Section Below */}
      <motion.div
        style={{ y: detailsExitY, rotateX: detailsExitRotateX, scale: detailsExitScale, opacity: detailsExitOpacity }}
        className="w-full max-w-[940px] px-6 flex flex-col items-center text-center z-20 transform-gpu will-change-transform [transform-style:preserve-3d] origin-top"
      >
        {/* Dynamic Project Details Panel: Only Title, Overview, Tech Pills, CTA Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-3.5"
          >
            {/* Project Title */}
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#141416] font-normal tracking-tight">
              {activeProject.title}
            </h3>

            {/* Overview / Summary Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-[16.5px] text-[#141416]/80 max-w-[740px] font-sans leading-relaxed">
              {activeProject.summary}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full border border-black/10 bg-black/[0.03] text-[10.5px] sm:text-[11.5px] font-mono text-[#141416]/75 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View Case Study CTA Button */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                href={`/work/${activeProject.slug}`}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#141416] bg-[#141416] text-[#E5E5E5] hover:bg-[#252528] active:scale-95 transition-all text-xs sm:text-sm font-medium tracking-wide shadow-sm"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
