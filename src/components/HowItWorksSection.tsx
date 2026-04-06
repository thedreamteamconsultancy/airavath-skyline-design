import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Smartphone, MapPin, PlaneTakeoff, Flag } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Request Your Flight",
    description:
      "Open the AIRAVATH platform and book your aerial mobility service in seconds. Select your destination, preferred time, and passenger count — all from your phone.",
    stat: "< 30s",
    statLabel: "Booking Time",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Arrive at Mobility Hub",
    description:
      "Head to the nearest AIRAVATH mobility hub. Strategically located across the city, every hub is designed for seamless passenger boarding with premium lounges.",
    stat: "< 10 min",
    statLabel: "Avg. Distance",
  },
  {
    icon: PlaneTakeoff,
    number: "03",
    title: "Take Off",
    description:
      "Board the electric aircraft and experience vertical liftoff. AI-assisted flight operations ensure a smooth, ultra-quiet departure from the mobility hub.",
    stat: "65 dB",
    statLabel: "Noise Level",
  },
  {
    icon: Flag,
    number: "04",
    title: "Reach Your Destination",
    description:
      "Land at a mobility hub near your destination within minutes. What once took hours in traffic now takes a fraction of the time through aerial mobility.",
    stat: "5x Faster",
    statLabel: "vs. Road Travel",
  },
];

/* ── Vertical animated timeline ── */
const VerticalTimeline = () => {
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
      {/* Background vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 md:-translate-x-px" />

      {/* Animated fill line — scroll-driven */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top md:-translate-x-px"
        style={{ height: "100%", scaleY: lineScaleY }}
      />

      {/* Steps */}
      <div className="flex flex-col gap-[100px] md:gap-[140px]">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;

          return (
            <ScrollReveal
              key={step.title}
              delay={0.15 * i}
              direction={isLeft ? "left" : "right"}
              className="relative"
            >
              <div
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card side */}
                <div className={`w-full md:w-[calc(50%-48px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                  <div className="group relative ml-20 md:ml-0">
                    {/* Glass card */}
                    <div className="relative rounded-2xl border border-primary/10 bg-[rgba(0,0,0,0.65)] backdrop-blur-xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_0_40px_hsl(189_100%_50%/0.08)]">
                      {/* Corner accent */}
                      <div className="absolute top-0 left-0 w-16 h-16">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
                      </div>

                      {/* Step number */}
                      <span className="font-heading text-[11px] tracking-[4px] text-primary/60 uppercase mb-4 block">
                        Step {step.number}
                      </span>

                      {/* Title */}
                      <h3 className="font-sub text-[22px] md:text-[26px] text-foreground font-medium mb-4 tracking-wide">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-[15px] text-titanium leading-[1.7] mb-6">
                        {step.description}
                      </p>

                      {/* Stat pill */}
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/15">
                          <span className="font-heading text-[18px] text-primary font-semibold">
                            {step.stat}
                          </span>
                        </div>
                        <span className="font-body text-[13px] text-titanium/70 tracking-wide">
                          {step.statLabel}
                        </span>
                      </div>

                      {/* Hover glow */}
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={started ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.8, duration: 0.5, ease: "backOut" }}
                    className="relative"
                  >
                    {/* Outer pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/40"
                      animate={
                        started
                          ? { scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }
                          : {}
                      }
                      transition={{
                        delay: i * 0.8 + 1.5,
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ width: 64, height: 64, top: -8, left: -8 }}
                    />
                    {/* Node */}
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_20px_hsl(189_100%_50%/0.25)]">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for other side */}
                <div className="hidden md:block w-[calc(50%-48px)]" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Aircraft following scroll */}
      <motion.div
        className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30"
        style={{ top: aircraftTop }}
      >
        <div className="relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary rotate-180 drop-shadow-[0_0_12px_hsl(189_100%_50%/0.7)]"
          >
            <path
              d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="currentColor"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full blur-lg" />
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
        paddingTop: "180px",
        paddingBottom: "180px",
        background:
          "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(210 20% 2%) 50%, hsl(0 0% 0%) 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.04]" />

        {/* Radial glow behind content */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(189 100% 50% / 0.04) 0%, transparent 70%)",
            y: bgY,
          }}
        />

        {/* Route curves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hiwRoute" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(189,100%,50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M200,0 Q350,300 200,600 T400,1200"
            stroke="url(#hiwRoute)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M1200,0 Q1050,400 1200,800 T1000,1400"
            stroke="url(#hiwRoute)"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container-airavath relative z-10">
        {/* Heading */}
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <motion.span
            className="font-heading text-[12px] tracking-[6px] text-primary/70 uppercase mb-6 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Process
          </motion.span>
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic">
            How AIRAVATH Works
          </h2>
        </ScrollReveal>

        {/* Supporting text */}
        <ScrollReveal delay={0.15} className="flex justify-center mb-[120px]">
          <p className="font-body text-body-lg text-titanium text-center max-w-[680px] leading-[1.6]">
            AIRAVATH simplifies urban air mobility through a seamless process that
            connects passengers to mobility hubs and electric aircraft within
            minutes.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <VerticalTimeline />
      </div>
    </section>
  );
};

export default HowItWorksSection;
