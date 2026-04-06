import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Zap, PlaneTakeoff, Volume2, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import aircraftSlide1 from "@/assets/aircraft-slide-1.jpg";
import aircraftSlide2 from "@/assets/aircraft-slide-2.jpg";
import aircraftSlide3 from "@/assets/aircraft-slide-3.jpg";

const slides = [
  { src: aircraftSlide1, alt: "eVTOL aircraft flying over city at night" },
  { src: aircraftSlide2, alt: "eVTOL landing on vertiport at sunset" },
  { src: aircraftSlide3, alt: "eVTOL formation flying through city corridor" },
];
const features = [
  {
    icon: Zap,
    title: "Electric Propulsion",
    description:
      "Electric motors power the aircraft with lower emissions and reduced operational noise compared to traditional aviation.",
  },
  {
    icon: PlaneTakeoff,
    title: "Vertical Takeoff & Landing",
    description:
      "Aircraft take off and land vertically, eliminating the need for runways and enabling operations from urban mobility hubs.",
  },
  {
    icon: Volume2,
    title: "Ultra-Quiet Operation",
    description:
      "Advanced rotor systems significantly reduce noise levels, making urban air mobility practical for dense cities.",
  },
  {
    icon: Navigation,
    title: "Intelligent Flight Operations",
    description:
      "AI-assisted navigation and fleet management systems improve safety, efficiency, and operational reliability across the network.",
  },
];

const AircraftTechSection = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="technology"
      className="relative overflow-hidden"
      style={{
        paddingTop: isMobile ? "56px" : "220px",
        paddingBottom: isMobile ? "56px" : "220px",
        background: "linear-gradient(180deg, hsl(var(--surface-0)) 0%, hsl(var(--surface-1)) 50%, hsl(var(--surface-0)) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.10]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="techRoute" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(189,100%,50%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,250 Q400,120 800,280 T1600,200" stroke="url(#techRoute)" strokeWidth="0.6" fill="none" />
            <path d="M0,450 Q350,300 750,420 T1500,350" stroke="url(#techRoute)" strokeWidth="0.4" fill="none" />
          </svg>
        )}
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-[26px] md:text-section text-foreground tracking-futuristic max-w-[720px]">
            Aircraft Operations
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center">
          <p className="font-body text-[14px] md:text-body-lg text-titanium text-center max-w-[720px] leading-[1.5] md:leading-[1.6]">
            AIRAVATH operates electric vertical take-off and landing aircraft that combine
            advanced propulsion, lightweight design, and intelligent navigation to deliver safe
            and efficient aerial mobility within modern cities.
          </p>
        </ScrollReveal>

        {/* Cinematic Animated Image Carousel */}
        <div className="mt-8 md:mt-[100px]">
          <ScrollReveal delay={0.2} className="flex justify-center">
            <div className="relative max-w-[1200px] w-full">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-primary/20 blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/10 aspect-video">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={slides[current].src}
                    alt={slides[current].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
              </div>
              <div className="flex justify-center gap-2 mt-4 md:mt-6">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-8 bg-primary"
                        : "w-3 bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
              {!isMobile && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-primary/10 blur-3xl rounded-full" />}
            </div>
          </ScrollReveal>
        </div>

        {/* Feature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4x" style={{ marginTop: isMobile ? "40px" : "120px" }}>
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={isMobile ? 0.08 * i : 0.15 * i} className="text-center">
              <div className="group flex flex-col items-center px-2">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-3x transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(189_100%_50%/0.3)] group-hover:scale-110">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="font-sub text-[13px] md:text-feature text-foreground mb-2 md:mb-2x">
                  {feature.title}
                </h3>
                <p className="font-body text-[12px] md:text-base text-titanium leading-[1.5] md:leading-[1.6] max-w-[280px]">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AircraftTechSection;
