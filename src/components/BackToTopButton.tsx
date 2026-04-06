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
    {/* eVTOL top-down silhouette – clean, symmetrical */}
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Fuselage */}
      <path
        d="M32 6 C30 6, 28.5 11, 28.5 18 L28.5 44 C28.5 50, 30 55, 32 58 C34 55, 35.5 50, 35.5 44 L35.5 18 C35.5 11, 34 6, 32 6Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Main wings */}
      <path
        d="M28.5 23 L10 30 C8 30.8, 8 32.2, 10 32.8 L28.5 35"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        d="M35.5 23 L54 30 C56 30.8, 56 32.2, 54 32.8 L35.5 35"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Rear stabilizers */}
      <path
        d="M30 46 L19 50.5 C17.5 51, 17.5 52.2, 19 52.5 L30 49.5"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        d="M34 46 L45 50.5 C46.5 51, 46.5 52.2, 45 52.5 L34 49.5"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Wing rotor pods */}
      <circle cx="14" cy="31.4" r="3.2" fill="currentColor" fillOpacity="0.08" />
      <circle cx="50" cy="31.4" r="3.2" fill="currentColor" fillOpacity="0.08" />
      {/* Rear rotor pods */}
      <circle cx="21" cy="51" r="2.4" fill="currentColor" fillOpacity="0.08" />
      <circle cx="43" cy="51" r="2.4" fill="currentColor" fillOpacity="0.08" />
      {/* Cockpit canopy */}
      <ellipse cx="32" cy="13" rx="2.2" ry="4" fill="currentColor" fillOpacity="0.18" />
    </g>
  </svg>
);

const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const rafRef = useRef<number>(0);

  // Use rAF-synced scroll tracking tied to Lenis
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      setScrollProgress(progress);
      setVisible(progress > 0.15);

      // Detect when scroll-to-top completes
      if (isScrollingToTop && scrollY < 10) {
        setIsScrollingToTop(false);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [isScrollingToTop]);

  const handleClick = useCallback(() => {
    const lenis = getLenis();
    if (!lenis) return;

    setIsScrollingToTop(true);

    lenis.scrollTo(0, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
    });
  }, []);

  // Aircraft vertical offset synced to scroll progress during scroll-to-top
  const aircraftY = isScrollingToTop ? -scrollProgress * 24 : 0;
  const dashOffset = CIRCUMFERENCE * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 group cursor-pointer focus:outline-none"
          aria-label="Back to top"
          whileHover={{ scale: 1.05 }}
        >
          {/* Outer glow */}
          <div
            className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow:
                "0 0 24px hsl(var(--primary) / 0.3), 0 0 48px hsl(var(--primary) / 0.12)",
            }}
          />

          {/* Background circle */}
          <div
            className="relative w-14 h-14 rounded-full border border-border/60 bg-background/80 backdrop-blur-md flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/[0.06] transition-all duration-300"
            style={{
              boxShadow: "0 0 16px hsl(var(--primary) / 0.12)",
            }}
          >
            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--primary) / 0.12)"
                strokeWidth="1.5"
              />
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 80ms linear" }}
              />
            </svg>

            {/* Aircraft icon – synced to scroll */}
            <motion.div
              className="w-7 h-7 text-primary"
              style={{ y: aircraftY }}
              whileHover={{ rotate: -7, y: -2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AircraftSilhouette className="w-full h-full" />
            </motion.div>

            {/* Glow trail during scroll-to-top */}
            <AnimatePresence>
              {isScrollingToTop && (
                <motion.div
                  initial={{ opacity: 0.5, scaleY: 0 }}
                  animate={{ opacity: 0, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-gradient-to-t from-transparent to-primary origin-bottom"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
