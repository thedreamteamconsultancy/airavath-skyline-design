import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollVideoCardProps {
  src: string;
  alt: string;
  label: string;
  delay?: number;
}

const ScrollVideoCard = ({ src, alt, label, delay = 0 }: ScrollVideoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-[12px] overflow-hidden h-[420px] group cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {/* Ken Burns animated image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={
          isInView
            ? {
                scale: [1, 1.15],
                x: ["0%", "2%"],
                y: ["0%", "-2%"],
              }
            : { scale: 1, x: "0%", y: "0%" }
        }
        transition={
          isInView
            ? {
                duration: 12,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }
            : { duration: 0.6 }
        }
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30 pointer-events-none" />

      {/* Animated playback indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isInView && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-body text-[11px] text-primary uppercase tracking-wider">Playing</span>
          </span>
        )}
      </div>

      {/* Subtle scan line effect */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(189 100% 50% / 0.02) 2px, hsl(189 100% 50% / 0.02) 4px)",
          }}
          animate={{ y: [0, 8] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
      )}

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
        <p className="font-body text-[13px] text-foreground/70">{label}</p>
      </div>
    </motion.div>
  );
};

export default ScrollVideoCard;
