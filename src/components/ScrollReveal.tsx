import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  /** HTML tag to render — defaults to div */
  as?: "div" | "p" | "h2" | "span" | "section";
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  as = "div",
}: ScrollRevealProps) => {
  const ref = useRef(null);
  // -20% margin ≈ trigger at 80% viewport height — works well on all screen sizes
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const Component = motion[as] as any;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // smooth ease-out curve
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
