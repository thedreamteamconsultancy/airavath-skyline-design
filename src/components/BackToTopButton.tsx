import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/components/SmoothScroll";

const AircraftSilhouette = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6 C30 6, 28.5 11, 28.5 18 L28.5 44 C28.5 50, 30 55, 32 58 C34 55, 35.5 50, 35.5 44 L35.5 18 C35.5 11, 34 6, 32 6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M28.5 23 L10 30 C8 30.8, 8 32.2, 10 32.8 L28.5 35" fill="currentColor" fillOpacity="0.06" />
      <path d="M35.5 23 L54 30 C56 30.8, 56 32.2, 54 32.8 L35.5 35" fill="currentColor" fillOpacity="0.06" />
      <path d="M30 46 L19 50.5 C17.5 51, 17.5 52.2, 19 52.5 L30 49.5" fill="currentColor" fillOpacity="0.06" />
      <path d="M34 46 L45 50.5 C46.5 51, 46.5 52.2, 45 52.5 L34 49.5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="14" cy="31.4" r="3.2" fill="currentColor" fillOpacity="0.08" />
      <circle cx="50" cy="31.4" r="3.2" fill="currentColor" fillOpacity="0.08" />
      <circle cx="21" cy="51" r="2.4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="43" cy="51" r="2.4" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="32" cy="13" rx="2.2" ry="4" fill="currentColor" fillOpacity="0.18" />
    </g>
  </svg>
);

const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BackToTopButton = () => {
  const progressRef = useRef(0);
  const visibleRef = useRef(false);
  const scrollingToTopRef = useRef(false);
  const [, forceRender] = useState(0);
  const ringRef = useRef<SVGCircleElement>(null);
  const aircraftRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Direct DOM updates for pixel-perfect 60fps — no React re-renders
  useEffect(() => {
    let rafId: number;
    let wasVisible = false;

    const tick = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      progressRef.current = clamped;

      // Update ring directly on DOM — zero lag
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - clamped));
      }

      // Aircraft Y offset during scroll-to-top (synced to progress, not time)
      if (aircraftRef.current) {
        const y = scrollingToTopRef.current ? -clamped * 20 : 0;
        aircraftRef.current.style.transform = `translateY(${y}px)`;
      }

      // Visibility: show after About Us section (~first viewport height)
      const shouldShow = scrollY > window.innerHeight * 0.85;
      if (shouldShow !== wasVisible) {
        wasVisible = shouldShow;
        visibleRef.current = shouldShow;
        forceRender((n) => n + 1); // Only re-render on visibility change
      }

      // Detect scroll-to-top completion
      if (scrollingToTopRef.current && scrollY < 5) {
        scrollingToTopRef.current = false;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleClick = useCallback(() => {
    const lenis = getLenis();
    if (!lenis) return;
    scrollingToTopRef.current = true;
    lenis.scrollTo(0, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }, []);

  return (
    <AnimatePresence>
      {visibleRef.current && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 group cursor-pointer focus:outline-none"
          aria-label="Back to top"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 24px hsl(var(--primary) / 0.3), 0 0 48px hsl(var(--primary) / 0.12)" }}
          />

          <div
            className="relative w-14 h-14 rounded-full border border-border/60 bg-background/80 backdrop-blur-md flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/[0.06] transition-all duration-300"
            style={{ boxShadow: "0 0 16px hsl(var(--primary) / 0.12)" }}
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r={RADIUS} fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="1.5" />
              <circle
                ref={ringRef}
                cx="28" cy="28" r={RADIUS}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE}
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={aircraftRef}
              className="w-7 h-7 text-primary group-hover:rotate-[-7deg] group-hover:-translate-y-0.5 transition-transform duration-300 ease-out"
            >
              <AircraftSilhouette className="w-full h-full" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
