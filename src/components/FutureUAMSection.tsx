import { TrendingUp, Cpu, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import { useIsMobile } from "@/hooks/use-mobile";
import cardAirTaxi from "@/assets/card-air-taxi.jpg";
import cardUam from "@/assets/card-uam.jpg";
import cardNextgen from "@/assets/card-nextgen.jpg";

const aircraftCards = [
  {
    title: "Medical Mobility",
    description:
      "Rapid aerial medical transport services connecting hospitals, emergency sites, and healthcare facilities across cities.",
    image: cardAirTaxi,
    link: "/medical-mobility",
  },
  {
    title: "Urban Air Mobility",
    description:
      "On-demand passenger mobility services operating across city hubs, reducing travel time from hours to minutes.",
    image: cardUam,
    link: "/cargo-logistics",
  },
  {
    title: "Cargo Logistics",
    description:
      "Aerial cargo delivery operations moving packages and supplies efficiently across urban networks.",
    image: cardNextgen,
    link: "/cargo-logistics",
  },
];

const validationBlocks = [
  {
    icon: TrendingUp,
    title: "Rapid Industry Growth",
    text: "Investment in urban air mobility is accelerating as cities search for faster mobility solutions.",
  },
  {
    icon: Cpu,
    title: "Operational Technology",
    text: "Breakthroughs in fleet management, navigation, and booking platforms are enabling scalable aerial mobility operations.",
  },
  {
    icon: Building2,
    title: "Hub Infrastructure Development",
    text: "Cities are beginning to develop vertiports and mobility hubs to support aerial transportation networks.",
  },
];

/* ── Mobile 3D Card Stack ── */
const Mobile3DCardStack = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isTransitioning = useRef(false);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= aircraftCards.length || isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(index);
    setTimeout(() => { isTransitioning.current = false; }, 600);
  }, []);

  // Touch handlers for swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaTime = Date.now() - touchStartTime.current;
      const velocity = Math.abs(deltaY) / deltaTime;

      if (Math.abs(deltaY) > 40 || velocity > 0.3) {
        if (deltaY > 0) goTo(activeIndex + 1);
        else goTo(activeIndex - 1);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeIndex, goTo]);

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;

    if (diff === 0) {
      return {
        transform: "perspective(1200px) translateY(0) scale(1) rotateX(0deg)",
        opacity: 1,
        zIndex: 10,
        filter: "blur(0px) brightness(1.05)",
        boxShadow: "0 0 40px hsl(189 100% 50% / 0.2), 0 20px 60px rgba(0,0,0,0.4)",
      };
    }
    if (diff === 1) {
      return {
        transform: "perspective(1200px) translateY(60px) scale(0.92) rotateX(6deg)",
        opacity: 0.6,
        zIndex: 5,
        filter: "blur(1px) brightness(0.7)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      };
    }
    if (diff === -1) {
      return {
        transform: "perspective(1200px) translateY(-50px) scale(0.88) rotateX(-4deg)",
        opacity: 0.35,
        zIndex: 4,
        filter: "blur(2px) brightness(0.6)",
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
      };
    }
    // Far away cards
    return {
      transform: `perspective(1200px) translateY(${diff > 0 ? 120 : -100}px) scale(0.8) rotateX(${diff > 0 ? 10 : -8}deg)`,
      opacity: 0,
      zIndex: 1,
      filter: "blur(4px) brightness(0.5)",
      pointerEvents: "none" as const,
    };
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "420px", perspective: "1200px", transformStyle: "preserve-3d" }}>
      {aircraftCards.map((card, i) => (
        <div
          key={card.title}
          className="absolute inset-x-0 mx-auto will-change-transform"
          style={{
            ...getCardStyle(i),
            width: "100%",
            maxWidth: "340px",
            left: "50%",
            transform: `translateX(-50%) ${getCardStyle(i).transform}`,
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onClick={() => {
            if (i !== activeIndex) goTo(i);
          }}
        >
          <Link to={card.link} className="block" onClick={(e) => { if (i !== activeIndex) e.preventDefault(); }}>
            <div
              className="bg-card border rounded-card overflow-hidden"
              style={{
                borderColor: i === activeIndex ? "hsl(189 100% 50% / 0.3)" : "hsl(var(--border))",
              }}
            >
              <div className="relative h-[180px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-sub text-[18px] text-foreground font-medium mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-[14px] text-titanium leading-[1.6]">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-20">
        {aircraftCards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: i === activeIndex ? "hsl(189 100% 50%)" : "hsl(var(--muted-foreground) / 0.3)",
              width: i === activeIndex ? "20px" : "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Main Section ── */
const FutureUAMSection = () => {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative overflow-hidden atmosphere-blue"
      style={{
        paddingTop: isMobile ? "56px" : "80px",
        paddingBottom: isMobile ? "56px" : "80px",
        background: "linear-gradient(180deg, hsl(var(--surface-1)) 0%, hsl(var(--surface-0)) 100%)",
      }}
    >
      {/* Background effects */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-overlay opacity-[0.08]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q400,80 800,250 T1600,150" stroke="url(#routeGrad2)" strokeWidth="0.8" fill="none" />
            <path d="M0,400 Q300,250 700,380 T1400,280" stroke="url(#routeGrad2)" strokeWidth="0.5" fill="none" />
          </svg>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/15 animate-float"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className={`font-heading font-semibold text-foreground tracking-futuristic max-w-[720px] ${isMobile ? "text-[26px]" : "text-section"}`}>
            Urban Air Mobility Network
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className={`flex justify-center ${isMobile ? "mb-8" : "mb-12x"}`}>
          <p className={`font-body text-titanium text-center max-w-[700px] leading-[1.6] ${isMobile ? "text-[14px]" : "text-body-lg"}`}>
            AIRAVATH operates aerial mobility services across cities using electric vertical take-off
            and landing aircraft. Our network connects mobility hubs to deliver fast, safe, and
            sustainable transportation above city traffic.
          </p>
        </ScrollReveal>

        {/* Service Cards */}
        {isMobile ? (
          <div className="mb-10">
            <Mobile3DCardStack />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12x">
            {aircraftCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={0.15 * i} direction="up">
                <Link to={card.link} className="block h-full">
                  <div className="group bg-card border border-border rounded-card overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(189_100%_50%/0.18)] hover:border-primary/30 transition-all duration-300 ease-out h-full">
                    <div className="relative h-[200px] overflow-hidden">
                      <ParallaxImage src={card.image} alt={card.title} intensity={15} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                    <div className="p-4x">
                      <h3 className="font-sub text-feature text-foreground mb-2x">
                        {card.title}
                      </h3>
                      <p className="font-body text-base text-titanium leading-[1.6]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Industry Validation Strip */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-6" : "gap-6x"}`}
          style={{ marginTop: isMobile ? "40px" : "96px" }}
        >
          {validationBlocks.map((block, i) => (
            <ScrollReveal key={block.title} delay={0.15 * i}>
              <div className="flex gap-3x">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <block.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className={`font-sub text-foreground mb-1x ${isMobile ? "text-[14px]" : "text-feature"}`}>
                    {block.title}
                  </h4>
                  <p className={`font-body text-titanium leading-[1.6] ${isMobile ? "text-[13px]" : "text-base"}`}>
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

export default FutureUAMSection;
