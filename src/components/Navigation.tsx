"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.querySelector(item.href);
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          setActiveSection(item.label.toLowerCase());
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop and on click outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, opts?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.15 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92vw] sm:w-[82vw] md:w-[70vw] max-w-[740px] md:max-w-[800px] pointer-events-none"
    >
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto w-full h-11 md:h-[50px] p-1.5 md:p-[6px] flex items-center justify-between rounded-full border border-black/15 bg-[#E5E5E5] transition-colors select-none shadow-sm"
        style={{ boxShadow: "none" }}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="h-full flex items-center gap-2 md:gap-2.5 px-3 rounded-full text-[#141416] hover:opacity-80 transition-opacity cursor-pointer"
          title="Back to top"
        >
          <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4D38] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-[#2D4D38]" />
          </span>
          <span className="font-sans text-[13px] md:text-[14.5px] font-semibold tracking-tight text-[#141416]">
            Anurag Verma
          </span>
        </button>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center h-full gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.label.toLowerCase();
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative h-full px-3.5 rounded-full text-[13.5px] font-sans font-medium transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "text-[#141416] font-semibold"
                    : "text-[#28282C] hover:text-[#141416] hover:bg-black/[0.05]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 rounded-full bg-black/[0.08]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    style={{ boxShadow: "none" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right CTA with Lucide Icon (Desktop) */}
        <div className="hidden md:flex items-center h-full">
          <button
            onClick={() => scrollTo("#contact")}
            className="group h-full flex items-center gap-1.5 px-4 rounded-full border border-black/15 bg-black/[0.04] text-[13.5px] font-sans font-medium text-[#141416] hover:bg-black/[0.08] transition-all cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4 text-[#141416]/75 group-hover:text-[#141416] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button (Mobile) */}
        <div className="flex md:hidden items-center h-full">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-black/10 bg-black/[0.04] text-[#141416] hover:bg-black/[0.08] active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#141416]" />
            ) : (
              <Menu className="w-4 h-4 text-[#141416]" />
            )}
          </button>
        </div>
      </nav>

      {/* Animated Mobile Menu Dropdown Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mt-2 w-full rounded-2xl border border-black/15 bg-[#E5E5E5]/95 backdrop-blur-md p-2 shadow-lg flex flex-col gap-1 md:hidden select-none"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.label.toLowerCase();
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-sans font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-black/[0.08] text-[#141416] font-semibold"
                      : "text-[#28282C] hover:bg-black/[0.04] hover:text-[#141416]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D4D38]" />
                  )}
                </button>
              );
            })}

            <div className="pt-1.5 mt-0.5 border-t border-black/10">
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#141416] text-[#E5E5E5] text-[12.5px] font-medium transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>Contact Anurag</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
