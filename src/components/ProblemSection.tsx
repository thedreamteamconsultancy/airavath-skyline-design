import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollReveal from "@/components/ScrollReveal";
import problemTraffic from "@/assets/problem-traffic.jpg";
import problemSky from "@/assets/problem-sky.jpg";

interface CountUpProps {
  target: string;
  duration?: number;
}

const CountUp = ({ target, duration = 1200 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numMatch = target.match(/^([\d.]+)/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }
    const numericValue = parseFloat(numMatch[1]);
    const suffix = target.slice(numMatch[1].length);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      if (Number.isInteger(numericValue)) {
        setDisplay(Math.round(current) + suffix);
      } else {
        setDisplay(current.toFixed(1) + suffix);
      }
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{display}</span>;
};

const stats = [
  {
    number: "120+",
    description: "Average yearly hours lost in traffic across major cities.",
    suffix: " Hours",
  },
  {
    number: "4.2",
    description: "Billion urban commuters expected worldwide by 2030.",
    suffix: " Billion",
  },
  {
    number: "70%",
    description: "Projected urban population worldwide by 2050.",
    suffix: "",
  },
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="container-airavath">
        <ScrollReveal delay={0.12} className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic max-w-[720px]">
            Cities Are Running Out of Time
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="flex justify-center mb-12x">
          <p className="font-body text-body-lg text-titanium text-center max-w-[640px] leading-[1.6]">
            Urban congestion continues to grow across modern cities, slowing transportation
            and reducing efficiency. Current road-based systems are reaching their limits.
          </p>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 mb-12x">
          <ScrollReveal direction="left" duration={0.7} className="relative">
            <motion.div
              className="relative h-[320px] md:h-[420px] overflow-hidden rounded-l-card md:rounded-l-card rounded-t-card md:rounded-tr-none"
              style={{ y: parallaxY }}
            >
              <img
                src={problemTraffic}
                alt="Heavy traffic congestion in a modern city"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/35" />
              <div className="absolute bottom-4x left-4x">
                <span className="font-sub text-body-sm text-foreground tracking-wide-futuristic uppercase">
                  Hours Lost in Traffic
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={0.7} className="relative">
            <motion.div
              className="relative h-[320px] md:h-[420px] overflow-hidden rounded-r-card md:rounded-r-card rounded-b-card md:rounded-bl-none"
              style={{ y: parallaxY }}
            >
              <img
                src={problemSky}
                alt="eVTOL aircraft flying peacefully above the city"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10" />
              <div className="absolute bottom-4x right-4x text-right">
                <span className="font-sub text-body-sm text-foreground tracking-wide-futuristic uppercase">
                  Minutes in the Sky
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[420px] bg-border z-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6x">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={0.12 * i} className="text-center">
              <div className="font-heading text-[42px] leading-[1.1] text-primary tracking-futuristic mb-2x">
                <CountUp target={stat.number} />
                {stat.suffix}
              </div>
              <p className="font-body text-base text-titanium max-w-[280px] mx-auto leading-[1.6]">
                {stat.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
