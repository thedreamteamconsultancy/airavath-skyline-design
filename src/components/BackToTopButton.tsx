import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/components/SmoothScroll";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(progress);
    setIsVisible(progress > 0.2);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  const handleClick = () => {
    setIsLaunching(true);
    setTimeout(() => {
      scrollToSection("#home");
      setTimeout(() => setIsLaunching(false), 1200);
    }, 400);
  };

  // SVG progress ring
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className="fixed z-50 bottom-[30px] right-[30px] md:w-[56px] md:h-[56px] w-[48px] h-[48px] 
                     rounded-full flex items-center justify-center cursor-pointer
                     group focus:outline-none"
          style={{
            background: "rgba(11, 11, 11, 0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 25px hsl(189 100% 50% / 0.35), 0 0 60px hsl(189 100% 50% / 0.15)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="hsl(189 100% 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="group-hover:drop-shadow-[0_0_6px_rgba(0,217,255,0.6)] transition-[filter] duration-300"
            />
          </svg>

          {/* Aircraft icon */}
          <motion.svg
            viewBox="0 0 24 24"
            className="md:w-5 md:h-5 w-4 h-4 relative z-10"
            fill="none"
            animate={
              isLaunching
                ? { y: -30, opacity: 0, scale: 1.3 }
                : { y: 0, opacity: 1, scale: 1, rotate: 0 }
            }
            transition={
              isLaunching
                ? { duration: 0.6, ease: "easeIn" }
                : { duration: 0.3 }
            }
          >
            {/* Minimal aircraft pointing up */}
            <path
              d="M12 3L12 21M12 3L8 8M12 3L16 8M7 14L12 12L17 14"
              stroke="hsl(189 100% 50%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:drop-shadow-[0_0_4px_rgba(0,217,255,0.5)] transition-[filter] duration-300"
            />
          </motion.svg>

          {/* Launch trail effect */}
          <AnimatePresence>
            {isLaunching && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[2px] rounded-full bg-primary/60"
                    style={{ left: `calc(50% - 1px + ${(i - 1) * 4}px)` }}
                    initial={{ height: 0, bottom: "50%", opacity: 0.8 }}
                    animate={{ height: 20 + i * 4, bottom: "20%", opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Hover glow backdrop */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 15px hsl(189 100% 50% / 0.1)",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
