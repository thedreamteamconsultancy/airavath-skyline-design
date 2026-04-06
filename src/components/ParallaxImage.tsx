import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number; // px of parallax travel, default 20
}

const ParallaxImage = forwardRef<HTMLDivElement, ParallaxImageProps>(({ src, alt, className = "", intensity = 20 }, _ref) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [intensity, -intensity]
  );

  return (
    <div ref={ref} className="overflow-hidden w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{ y, scale: 1.1 }}
        loading="lazy"
      />
    </div>
  );
});

ParallaxImage.displayName = "ParallaxImage";

export default ParallaxImage;
