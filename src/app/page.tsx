"use client";

import Hero from "@/components/Hero";
import AntiGravityWork from "@/components/AntiGravityWork";
import About from "@/components/About";
import SkillsSection from "@/components/SkillsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <SmoothScroll>
      <ClickSpark sparkColor="#141416" sparkSize={10} sparkRadius={18} sparkCount={8} duration={420}>
        <GrainOverlay />
        <Navigation />
        <main className="flex-1">
          <Hero />
          <AntiGravityWork />
          <About />
          <SkillsSection />
          <Contact />
        </main>
        <Footer />
      </ClickSpark>
    </SmoothScroll>
  );
}
