import { useRef, useState, useEffect, useCallback } from "react";
import { Plane, Building, Smartphone, Layers, Globe, Leaf } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import { useIsMobile } from "@/hooks/use-mobile";
import solutionNetwork from "@/assets/solution-network.jpg";
import solutionVertiport from "@/assets/solution-vertiport.jpg";
import solutionPlatform from "@/assets/solution-platform.jpg";

const pillars = [
  {
    icon: Plane,
    title: "Air Mobility Network",
    description:
      "AIRAVATH operates a network of electric vertical take-off aircraft enabling fast, safe, and premium urban air mobility between key city destinations.",
    image: solutionNetwork,
  },
  {
    icon: Building,
    title: "Mobility Hub Infrastructure",
    description:
      "Strategically located vertiports and mobility hubs across cities enable seamless take-off and landing operations from rooftops, airports, and business districts.",
    image: solutionVertiport,
  },
  {
    icon: Smartphone,
    title: "On-Demand Air Platform",
    description:
      "A digital platform that allows passengers to request air mobility services instantly and access premium aerial transportation within minutes.",
    image: solutionPlatform,
  },
];

const highlights = [
  {
    icon: Layers,
    title: "Operating Ecosystem",
    text: "Aircraft operations, hub infrastructure, and digital platforms combined into a unified mobility network.",
  },
  {
    icon: Globe,
    title: "Scalable Across Cities",
    text: "Mobility hub networks enable expansion across major cities.",
  },
  {
    icon: Leaf,
    title: "Sustainable Operations",
    text: "Electric aircraft operations enable quieter and more environmentally responsible urban transportation.",
  },
];

/* ─── Mobile 3D Horizontal Scroll Card System ─── */
const MobileCardShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.78 + 16; // card width + gap
    const scrollLeft = el.scrollLeft;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), pillars.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const getCardStyle = (i: number) => {
    const diff = i - activeIndex;
    const isActive = diff === 0;
    const rotateY = diff * 25;
    const scale = isActive ? 1 : 0.9;
    const opacity = isActive ? 1 : 0.6;

    return {
      transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform, opacity" as const,
      boxShadow: isActive
        ? "0 0 30px hsl(189 100% 50% / 0.2), 0 8px 32px rgba(0,0,0,0.4)"
        : "0 4px 16px rgba(0,0,0,0.3)",
      borderColor: isActive ? "hsl(189 100% 50% / 0.4)" : "hsl(var(--border))",
    };
  };

  return (
    <div className="relative">
      {/* Ambient glow behind cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(189 100% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-6 px-[11%]"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className="flex-shrink-0 rounded-[14px] overflow-hidden border bg-card flex flex-col"
            style={{
              width: "78vw",
              scrollSnapAlign: "center",
              transformStyle: "preserve-3d",
              ...getCardStyle(i),
            }}
          >
            <div className="relative h-[180px] overflow-hidden">
              <ParallaxImage src={pillar.image} alt={pillar.title} intensity={10} />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-background/70 backdrop-blur-md border border-primary/20 flex items-center justify-center">
                <pillar.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-sub text-[18px] font-medium text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="font-body text-[13px] text-titanium leading-[1.6]">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {pillars.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 6,
              background: i === activeIndex ? "hsl(189 100% 50%)" : "hsl(var(--muted-foreground) / 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const SolutionSection = () => {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative overflow-hidden atmosphere-blue"
      style={{
        paddingTop: isMobile ? "56px" : "80px",
        paddingBottom: isMobile ? "56px" : "80px",
        background: "linear-gradient(180deg, hsl(var(--surface-0)) 0%, hsl(var(--surface-1)) 50%, hsl(var(--surface-0)) 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.07]" />
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.10]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="solutionRoute" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
                <stop offset="40%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.4" />
                <stop offset="60%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,150 Q300,50 600,200 T1200,120 T1800,180" stroke="url(#solutionRoute)" strokeWidth="0.7" fill="none" />
            <path d="M0,350 Q250,200 500,300 T1000,250 T1600,320" stroke="url(#solutionRoute)" strokeWidth="0.5" fill="none" />
            <path d="M200,500 Q450,350 700,480 T1200,400" stroke="url(#solutionRoute)" strokeWidth="0.4" fill="none" />
          </svg>
        )}
        {!isMobile && Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 animate-float"
            style={{
              width: `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 5 + 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className={`font-heading font-semibold text-foreground tracking-futuristic max-w-[820px] ${isMobile ? "text-[26px]" : "text-section"}`}>
            Urban Air Mobility Ecosystem
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className={`flex justify-center ${isMobile ? "mb-8" : "mb-12x"}`}>
          <p className={`font-body text-titanium text-center max-w-[720px] leading-[1.6] ${isMobile ? "text-[14px]" : "text-body-lg"}`}>
            AIRAVATH operates a complete urban air mobility ecosystem by coordinating electric
            aircraft operations, mobility hub infrastructure, and an intelligent platform that enables
            on-demand aerial transportation across cities.
          </p>
        </ScrollReveal>

        {/* Cards: 3D horizontal scroll on mobile, grid on desktop */}
        {isMobile ? (
          <MobileCardShowcase />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={0.15 * i} direction="up">
                <div className="group bg-card border border-border rounded-card overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(189_100%_50%/0.18)] hover:border-primary/30 transition-all duration-300 ease-out h-full flex flex-col">
                  <div className="relative h-[260px] overflow-hidden">
                    <ParallaxImage src={pillar.image} alt={pillar.title} intensity={18} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-background/70 backdrop-blur-md border border-primary/20 flex items-center justify-center shadow-[0_0_15px_hsl(189_100%_50%/0.2)]">
                      <pillar.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-[36px] flex-1 flex flex-col">
                    <h3 className="font-sub text-feature text-foreground mb-2x">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-base text-titanium leading-[1.6]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Highlight Strip */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6x`} style={{ marginTop: isMobile ? "48px" : "120px" }}>
          {highlights.map((block, i) => (
            <ScrollReveal key={block.title} delay={0.15 * i}>
              <div className="flex gap-3x">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <block.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-sub text-feature text-foreground mb-1x">
                    {block.title}
                  </h4>
                  <p className="font-body text-base text-titanium leading-[1.6]">
                    {block.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
