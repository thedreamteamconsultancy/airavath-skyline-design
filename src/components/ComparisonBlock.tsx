import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollReveal from "@/components/ScrollReveal";

interface ComparisonBlockProps {
  heading: string;
  description: string;
  problemImage: string;
  problemAlt: string;
  problemCaption: string;
  solutionImage: string;
  solutionAlt: string;
  solutionCaption: string;
}

const ComparisonBlock = ({
  heading,
  description,
  problemImage,
  problemAlt,
  problemCaption,
  solutionImage,
  solutionAlt,
  solutionCaption,
}: ComparisonBlockProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Disable parallax on mobile for performance
  const parallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="container-airavath">
        {/* Heading */}
        <ScrollReveal delay={0.12} className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic max-w-[720px]">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Supporting text */}
        <ScrollReveal delay={0.2} className="flex justify-center mb-12x">
          <p className="font-body text-body-lg text-titanium text-center max-w-[640px] leading-[1.6]">
            {description}
          </p>
        </ScrollReveal>

        {/* Split Visual Comparison */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left — Problem */}
          <ScrollReveal direction="left" duration={0.7} className="relative">
            <motion.div
              className="relative h-[320px] md:h-[420px] overflow-hidden rounded-l-card md:rounded-l-card rounded-t-card md:rounded-tr-none"
              style={{ y: parallaxY }}
            >
              <img
                src={problemImage}
                alt={problemAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/35" />
              <div className="absolute bottom-4x left-4x">
                <span className="font-sub text-body-sm text-foreground tracking-wide-futuristic uppercase">
                  {problemCaption}
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right — Solution */}
          <ScrollReveal direction="right" duration={0.7} className="relative">
            <motion.div
              className="relative h-[320px] md:h-[420px] overflow-hidden rounded-r-card md:rounded-r-card rounded-b-card md:rounded-bl-none"
              style={{ y: parallaxY }}
            >
              <img
                src={solutionImage}
                alt={solutionAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10" />
              <div className="absolute bottom-4x right-4x text-right">
                <span className="font-sub text-body-sm text-foreground tracking-wide-futuristic uppercase">
                  {solutionCaption}
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Vertical divider */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[420px] bg-border z-10" />
        </div>
      </div>
    </section>
  );
};

export default ComparisonBlock;
