import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Smartphone, MapPin, PlaneTakeoff, Flag } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Request Your Flight",
    description:
      "Book your aerial mobility service in seconds from your phone.",
    descriptionFull:
      "Open the AIRAVATH platform and book your aerial mobility service in seconds. Select your destination, preferred time, and passenger count — all from your phone.",
    stat: "< 30s",
    statLabel: "Booking Time",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Arrive at Mobility Hub",
    description:
      "Head to the nearest hub, strategically located across the city.",
    descriptionFull:
      "Head to the nearest AIRAVATH mobility hub. Strategically located across the city, every hub is designed for seamless passenger boarding with premium lounges.",
    stat: "< 10 min",
    statLabel: "Avg. Distance",
  },
  {
    icon: PlaneTakeoff,
    number: "03",
    title: "Take Off",
    description:
      "Board the electric aircraft and experience smooth vertical liftoff.",
    descriptionFull:
      "Board the electric aircraft and experience vertical liftoff. AI-assisted flight operations ensure a smooth, ultra-quiet departure from the mobility hub.",
    stat: "65 dB",
    statLabel: "Noise Level",
  },
  {
    icon: Flag,
    number: "04",
    title: "Reach Your Destination",
    description:
      "Land at a hub near your destination — minutes instead of hours.",
    descriptionFull:
      "Land at a mobility hub near your destination within minutes. What once took hours in traffic now takes a fraction of the time through aerial mobility.",
    stat: "5x Faster",
    statLabel: "vs. Road Travel",
  },
];

/* ── Mobile card list ── */
const MobileTimeline = () => (
  <div className="flex flex-col gap-4">
    {steps.map((step, i) => (
      <ScrollReveal key={step.title} delay={0.08 * i} direction="up">
        <div className="relative rounded-xl border border-primary/10 bg-card/80 backdrop-blur-sm p-4 overflow-hidden">
          {/* Top row: number + icon */}
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <step.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="font-heading text-[9px] tracking-[3px] text-primary/50 uppercase block">
                Step {step.number}
              </span>
              <h3 className="font-sub text-[14px] text-foreground font-medium tracking-wide leading-tight">
                {step.title}
              </h3>
            </div>
          </div>

          <p className="font-body text-[12px] text-muted-foreground leading-[1.5] mb-2.5 pl-12">
            {step.description}
          </p>

          {/* Stat */}
          <div className="flex items-center gap-2 pl-12">
            <span className="font-heading text-[13px] text-primary font-semibold px-2 py-1 rounded-md bg-primary/10 border border-primary/15">
              {step.stat}
            </span>
            <span className="font-body text-[10px] text-muted-foreground tracking-wide">
              {step.statLabel}
            </span>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-6 h-6">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>
);

/* ── Desktop animated timeline ── */
const DesktopTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [started, setStarted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const aircraftTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (isInView) setStarted(true);
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-px" />
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top -translate-x-px"
        style={{ height: "100%", scaleY: lineScaleY }}
      />

      <div className="flex flex-col gap-[140px]">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <ScrollReveal
              key={step.title}
              delay={0.15 * i}
              direction={isLeft ? "left" : "right"}
              className="relative"
            >
              <div className={`flex flex-row items-center ${isLeft ? "" : "flex-row-reverse"}`}>
                <div className="w-[calc(50%-48px)]">
                  <div className="group relative">
                    <div className="relative rounded-2xl border border-primary/10 bg-[rgba(0,0,0,0.65)] backdrop-blur-xl p-10 overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_0_40px_hsl(189_100%_50%/0.08)]">
                      <div className="absolute top-0 left-0 w-16 h-16">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
                      </div>
                      <span className="font-heading text-[11px] tracking-[4px] text-primary/60 uppercase mb-4 block">
                        Step {step.number}
                      </span>
                      <h3 className="font-sub text-[26px] text-foreground font-medium mb-4 tracking-wide">
                        {step.title}
                      </h3>
                      <p className="font-body text-[15px] text-titanium leading-[1.7] mb-6">
                        {step.descriptionFull}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/15">
                          <span className="font-heading text-[18px] text-primary font-semibold">{step.stat}</span>
                        </div>
                        <span className="font-body text-[13px] text-titanium/70 tracking-wide">{step.statLabel}</span>
                      </div>
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={started ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.8, duration: 0.5, ease: "backOut" }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/40"
                      animate={started ? { scale: [1, 2, 1], opacity: [0.4, 0, 0.4] } : {}}
                      transition={{ delay: i * 0.8 + 1.5, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 64, height: 64, top: -8, left: -8 }}
                    />
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_20px_hsl(189_100%_50%/0.25)]">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                </div>

                <div className="w-[calc(50%-48px)]" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <motion.div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ top: aircraftTop }}>
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary rotate-180 drop-shadow-[0_0_12px_hsl(189_100%_50%/0.7)]">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full blur-lg" />
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        paddingTop: isMobile ? "48px" : "220px",
        paddingBottom: isMobile ? "48px" : "220px",
        background:
          "linear-gradient(180deg, hsl(var(--surface-0)) 0%, hsl(210 20% 2%) 50%, hsl(var(--surface-0)) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.04]" />
        {!isMobile && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(189 100% 50% / 0.04) 0%, transparent 70%)",
              y: bgY,
            }}
          />
        )}
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-2 md:mb-3x">
          <motion.span
            className="font-heading text-[10px] md:text-[12px] tracking-[6px] text-primary/70 uppercase mb-2 md:mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Process
          </motion.span>
          <h2 className="font-heading font-semibold text-[24px] md:text-section text-foreground tracking-futuristic">
            How AIRAVATH Works
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-6 md:mb-[120px]">
          <p className="font-body text-[13px] md:text-body-lg text-titanium text-center max-w-[680px] leading-[1.5] md:leading-[1.6]">
            A seamless process connecting passengers to mobility hubs and electric aircraft within minutes.
          </p>
        </ScrollReveal>

        {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
      </div>
    </section>
  );
};

export default HowItWorksSection;
