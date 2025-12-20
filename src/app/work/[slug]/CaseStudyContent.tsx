"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import GrainOverlay from "@/components/GrainOverlay";
import type { Project } from "@/data/projects";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { y: 30, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay, ease: EXPO_OUT },
  }),
} as const;

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CaseStudyContent({ project }: { project: Project }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryItems = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [{ src: project.heroImage, caption: project.title }];

  return (
    <SmoothScroll>
      <Cursor />
      <GrainOverlay />

      {/* Luxury Fixed Nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 md:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-none"
      >
        <Link
          href="/#work"
          data-cursor-label="Back"
          className="pointer-events-auto inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-hairline bg-bone/90 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-wider uppercase text-muted hover:text-ink hover:border-ink transition-all duration-300 shadow-2xs"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Selected Work
        </Link>
        <span className="pointer-events-auto text-[10px] sm:text-xs font-mono text-muted uppercase bg-bone/80 px-2.5 sm:px-3 py-1 rounded-full border border-hairline">
          Case Study {project.id} / 04
        </span>
      </motion.div>

      <main className="pt-28 md:pt-36">
        {/* Editorial Architecture Header */}
        <div className="section-padding py-0 mb-12 md:mb-16">
          <Section delay={0.05}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="label text-sage font-mono">{project.category}</span>
              <span className="text-muted text-xs font-mono">•</span>
              <span className="text-xs font-mono tracking-wider text-muted uppercase">{project.year}</span>
            </div>
          </Section>

          <Section delay={0.12}>
            <h1 className="headline-xl max-w-4xl mb-6 font-normal">
              {project.title}
            </h1>
          </Section>

          <Section delay={0.18}>
            <p className="body-lg max-w-3xl text-ink-light leading-relaxed mb-12">
              {project.subtitle}
            </p>
          </Section>

          {/* Architectural Meta Strip */}
          <Section delay={0.24}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-5 sm:py-6 border-y border-hairline bg-bone-dark/20 rounded-xl px-4 sm:px-6 md:px-8">
              <div>
                <span className="label text-[10px] text-muted mb-1 block">Context / Domain</span>
                <p className="text-sm text-ink font-semibold">{project.client}</p>
              </div>
              <div>
                <span className="label text-[10px] text-muted mb-1 block">Engineering Role</span>
                <p className="text-sm text-ink font-semibold">{project.role}</p>
              </div>
              <div>
                <span className="label text-[10px] text-muted mb-1 block">Execution Timeline</span>
                <p className="text-sm text-ink font-semibold">{project.timeline}</p>
              </div>
              <div>
                <span className="label text-[10px] text-muted mb-1 block">Repository / Build</span>
                <a
                  href={project.liveUrl || "https://github.com/anuragverma08002"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sage hover:underline font-mono inline-flex items-center gap-1 font-semibold"
                >
                  GitHub Source ↗
                </a>
              </div>
            </div>
          </Section>
        </div>

        {/* Featured Living Artifact Viewport (Refined Size) */}
        <div className="section-padding py-0 mb-14 md:mb-20">
          <Section delay={0.3}>
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[16/9] md:aspect-[2/1] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-bone-dark/50 border border-hairline/90 shadow-xl group">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                  sizes="(max-width: 1200px) 100vw, 1024px"
                  priority
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-bone text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-ink/80 backdrop-blur-md px-3 py-1 rounded-full border border-bone/20 text-[11px]">
                    PRIMARY VIEWPORT ARTIFACT
                  </span>
                  <span className="bg-ink/80 backdrop-blur-md px-3 py-1 rounded-full border border-bone/20 text-[11px]">
                    {project.technologies.slice(0, 3).join(" • ")}
                  </span>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Telemetry Metrics */}
        <div className="section-padding pt-0">
          <Section delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-10 md:py-14 bg-bone-dark/60 border border-hairline rounded-2xl px-8 md:px-12 shadow-2xs">
              {project.metrics.map((metric, i) => (
                <div key={i} className="text-left border-l-2 border-sage/40 pl-6">
                  <span className="font-serif text-3xl md:text-5xl text-ink tracking-tight block">
                    {metric.value}
                  </span>
                  <p className="text-sm font-semibold text-ink mt-2 uppercase font-mono tracking-wider">{metric.label}</p>
                  {metric.change && (
                    <p className="text-xs text-muted mt-1 leading-relaxed">{metric.change}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Narrative: Challenge */}
        <div className="section-padding pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <Section delay={0}>
                <span className="label mb-4 block text-sage">01</span>
                <h2 className="headline-md">The Challenge</h2>
              </Section>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Section delay={0.1}>
                <p className="body-lg">{project.challenge}</p>
              </Section>
            </div>
          </div>
        </div>

        {/* Narrative: Process */}
        <div className="section-padding pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <Section delay={0}>
                <span className="label mb-4 block text-sage">02</span>
                <h2 className="headline-md">The Process</h2>
              </Section>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {project.process.map((step, i) => (
                  <Section key={i} delay={0.1 + i * 0.08}>
                    <div className="flex gap-4">
                      <span className="label text-sage shrink-0 mt-1.5 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="body-lg">{step}</p>
                    </div>
                  </Section>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative: Solution */}
        <div className="section-padding pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <Section delay={0}>
                <span className="label mb-4 block text-sage">03</span>
                <h2 className="headline-md">The Solution</h2>
              </Section>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Section delay={0.1}>
                <p className="body-lg">{project.solution}</p>
              </Section>
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className="section-padding pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <Section delay={0}>
                <span className="label mb-4 block text-sage">04</span>
                <h2 className="headline-md">The Outcome</h2>
              </Section>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Section delay={0.1}>
                <p className="body-lg">{project.outcome}</p>
              </Section>
            </div>
          </div>
        </div>

        {/* Visual Telemetry Carousel / Gallery */}
        {galleryItems.length > 0 && (
          <div className="section-padding pt-0">
            <Section delay={0}>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-hairline/80 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <span className="label text-sage font-mono">Visual Evidence & Architecture</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                    Interface Carousel & Telemetry Captures
                  </h3>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono tracking-widest text-muted uppercase bg-bone-dark/80 px-3 py-1 rounded-full border border-hairline">
                    FIG. {String(activeSlide + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveSlide((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
                      aria-label="Previous slide"
                      data-cursor-label="Prev"
                      className="p-2 rounded-full border border-hairline bg-bone hover:bg-bone-dark text-ink transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveSlide((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
                      aria-label="Next slide"
                      data-cursor-label="Next"
                      className="p-2 rounded-full border border-hairline bg-bone hover:bg-bone-dark text-ink transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Carousel Screen (Compact & Focused with Touch-Swipe) */}
              <div className="max-w-4xl mx-auto w-full mb-6">
                <div className="relative flex flex-col bg-bone-dark/40 border border-hairline rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[16/10] md:aspect-[16/9] max-h-[460px] w-full overflow-hidden bg-bone-dark/80 select-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -40) {
                            setActiveSlide((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
                          } else if (info.offset.x > 40) {
                            setActiveSlide((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
                          }
                        }}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: EXPO_OUT }}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                      >
                        <Image
                          src={galleryItems[activeSlide].src}
                          alt={galleryItems[activeSlide].caption}
                          fill
                          className="object-cover object-top pointer-events-none"
                          sizes="(max-width: 1024px) 100vw, 896px"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Caption Bar */}
                  <div className="px-5 md:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-bone/90 backdrop-blur-md border-t border-hairline/80">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-sage bg-sage-light/30 px-2.5 py-0.5 rounded-md border border-sage/20 shrink-0">
                        FIG. {String(activeSlide + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs md:text-[13px] font-sans text-ink font-medium tracking-wide leading-relaxed">
                        {galleryItems[activeSlide].caption}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <span className="sm:hidden text-[10px] font-mono text-muted uppercase tracking-wider">
                        Swipe image ↔
                      </span>
                      <a 
                        href={galleryItems[activeSlide].src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-cursor-label="Open"
                        className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-muted hover:text-ink px-3 py-1.5 rounded-full border border-hairline bg-bone hover:bg-bone-dark transition-all duration-300"
                      >
                        Expand ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnails Strip (Scrollable on Mobile) */}
              {galleryItems.length > 1 && (
                <div className="max-w-4xl mx-auto flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {galleryItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      data-cursor-label={`FIG ${idx + 1}`}
                      className={`relative shrink-0 w-28 sm:w-auto aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-300 snap-center ${
                        activeSlide === idx
                          ? "ring-2 ring-sage border-transparent shadow-md scale-[1.02]"
                          : "border-hairline opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover object-top pointer-events-none"
                        sizes="(max-width: 768px) 112px, 220px"
                      />
                      <span className="absolute bottom-1 left-1 bg-ink/80 text-bone text-[9px] font-mono px-1.5 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </Section>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="section-padding pt-0">
            <Section delay={0}>
              <div className="bg-bone-dark rounded-xl p-8 md:p-16 max-w-3xl mx-auto text-center">
                <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed mb-8">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {project.testimonial.author}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {project.testimonial.role}, {project.testimonial.organization}
                  </p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Technologies & Awards */}
        <div className="section-padding pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-t border-hairline">
            <Section delay={0}>
              <span className="label mb-4 block">Technologies</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-hairline text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Section>
            <Section delay={0.1}>
              <span className="label mb-4 block">Recognition</span>
              <ul className="space-y-2">
                {project.awards.map((award) => (
                  <li key={award} className="flex items-center gap-2 text-sm text-ink">
                    <span className="w-1 h-1 rounded-full bg-sage shrink-0" />
                    {award}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        {/* Back to work */}
        <div className="section-padding pt-0 pb-16 text-center">
          <Link
            href="/#work"
            data-cursor-label="Back"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-ink text-sm font-medium tracking-wide text-ink hover:bg-ink hover:text-bone transition-all duration-500"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1" />
            </svg>
            Back to Selected Work
          </Link>
        </div>
      </main>
    </SmoothScroll>
  );
}
