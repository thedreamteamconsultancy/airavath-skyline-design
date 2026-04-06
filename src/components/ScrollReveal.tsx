import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  /** HTML tag to render — defaults to div */
  as?: "div" | "p" | "h2" | "span" | "section";
}

const desktopVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -60, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  right: {
    hidden: { opacity: 0, x: 60, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
};

const mobileVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  as = "div",
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const Component = motion[as] as any;
  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: isMobile ? 0.5 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom ease-out expo
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
