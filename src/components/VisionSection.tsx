import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollReveal from "@/components/ScrollReveal";
import visionSkyline from "@/assets/vision-skyline.jpg";

const AircraftFormation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: 0, y: 0, delay: 0 },
      { x: -40, y: -30, delay: 0.4 },
      { x: 40, y: -30, delay: 0.4 },
      { x: -80, y: -60, delay: 0.8 },
      { x: 80, y: -60, delay: 0.8 },
    ].map((a, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{
          top: "45%",
          left: "50%",
          marginLeft: a.x,
          marginTop: a.y,
          boxShadow: "0 0 12px 4px hsl(189 100% 50% / 0.6)",
        }}
        animate={{ x: [0, 300], y: [0, -40] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: a.delay,
        }}
      />
    ))}
  </div>
);

const VisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative overflow-hidden"
      style={{ paddingTop: 220, paddingBottom: 220 }}
    >
      <motion.div className="absolute inset-0 -top-[15%] -bottom-[15%]" style={{ y: bgY }}>
        <img
          src={visionSkyline}
          alt="Futuristic city skyline at night with aircraft"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-background/55" />

      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, hsl(189 100% 50% / 0.15), transparent)",
        }}
      />

      <AircraftFormation />

      <div className="relative z-10 container-airavath">
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto">
          <ScrollReveal delay={0} duration={0.7}>
            <p
              className="font-heading text-[28px] font-medium text-primary mb-[24px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              Our Vision
            </p>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.15} duration={1}>
            <h2 className="font-heading text-[28px] md:text-[48px] lg:text-[64px] font-bold text-foreground leading-[1.15] mb-[32px] tracking-futuristic">
              A World Where Cities Move Through the Sky
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.35} duration={0.7}>
            <p className="font-body text-[18px] leading-[1.6] text-titanium max-w-[620px]">
              AIRAVATH envisions a future where urban mobility extends beyond roads
              and railways. By operating aerial mobility networks across cities,
              we aim to redefine how people move through the world's most dynamic
              urban environments.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
