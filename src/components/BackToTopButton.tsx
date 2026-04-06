import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/components/SmoothScroll";

const AircraftSilhouette = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* eVTOL / Urban Air Mobility aircraft – top-down silhouette */}
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Fuselage */}
      <path d="M32 8 C30.5 8, 29 12, 29 18 L29 44 C29 50, 30 54, 32 56 C34 54, 35 50, 35 44 L35 18 C35 12, 33.5 8, 32 8Z" fill="currentColor" fillOpacity="0.15" />
      {/* Main wings */}
      <path d="M29 24 L12 30 C10 30.8, 10 32, 12 32.5 L29 34" fill="currentColor" fillOpacity="0.08" />
      <path d="M35 24 L52 30 C54 30.8, 54 32, 52 32.5 L35 34" fill="currentColor" fillOpacity="0.08" />
      {/* Rear stabilizers */}
      <path d="M30 46 L20 50 C19 50.5, 19 51.5, 20 51.8 L30 49" fill="currentColor" fillOpacity="0.08" />
      <path d="M34 46 L44 50 C45 50.5, 45 51.5, 44 51.8 L34 49" fill="currentColor" fillOpacity="0.08" />
      {/* Rotor pods on wings */}
      <circle cx="16" cy="31" r="3" fill="currentColor" fillOpacity="0.1" />
      <circle cx="48" cy="31" r="3" fill="currentColor" fillOpacity="0.1" />
      {/* Rear rotor pods */}
      <circle cx="22" cy="50" r="2.2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="42" cy="50" r="2.2" fill="currentColor" fillOpacity="0.1" />
      {/* Cockpit */}
      <ellipse cx="32" cy="14" rx="2" ry="3.5" fill="currentColor" fillOpacity="0.2" />
    </g>
  </svg>
);

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);
      setVisible(progress > 0.2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setLaunching(true);
    // Start scroll immediately with the animation
    scrollToSection("#home");
    // Reset launching state after scroll completes
    setTimeout(() => setLaunching(false), 1600);
  };

  const circumference = 2 * Math.PI * 24;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={launching 
            ? { opacity: 0, scale: 0.9, y: -40 } 
            : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 group cursor-pointer focus:outline-none"
          aria-label="Back to top"
          whileHover={{ scale: 1.08 }}
        >
          {/* Outer glow */}
          <div
            className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 30px rgba(0, 217, 255, 0.35), 0 0 60px rgba(0, 217, 255, 0.15)" }}
          />

          {/* Background circle */}
          <div className="relative w-14 h-14 rounded-full border border-white/[0.1] bg-background/80 backdrop-blur-md flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/[0.08] transition-all duration-300"
               style={{ boxShadow: "0 0 20px rgba(0, 217, 255, 0.15)" }}>

            {/* Scroll progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="1.5"
              />
              <circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - scrollProgress)}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>

            {/* Aircraft icon */}
            <motion.div
              className="w-7 h-7 text-primary"
              animate={launching ? { y: -30, opacity: 0 } : { y: 0, opacity: 1, rotate: 0 }}
              whileHover={{ rotate: -10, y: -2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AircraftSilhouette className="w-full h-full" />
            </motion.div>

            {/* Launch trail effect */}
            <AnimatePresence>
              {launching && (
                <motion.div
                  initial={{ opacity: 0.6, scaleY: 0 }}
                  animate={{ opacity: 0, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-gradient-to-t from-transparent to-primary origin-bottom"
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
