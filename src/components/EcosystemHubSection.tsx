import { useRef, useState, useEffect, useCallback } from "react";
import { Building2, Plane, Landmark, Network, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import cardGroundport from "@/assets/card-groundport.jpg";
import cardVertiport from "@/assets/card-vertiport.jpg";
import cardSkyport from "@/assets/card-skyport.jpg";
import cardHubnetwork from "@/assets/card-hubnetwork.jpg";

const hubs = [
  {
    icon: Building2,
    title: "Ground Port",
    link: "/ground-port",
    image: cardGroundport,
    description:
      "Ground-level mobility points used for passenger access and service operations. These serve as the primary entry point for urban air mobility.",
  },
  {
    icon: Plane,
    title: "Vertiport",
    link: "/vertiport",
    image: cardVertiport,
    description:
      "Landing and takeoff areas located on elevated building platforms — typically on first floor or mid-building levels for rapid turnaround operations.",
  },
  {
    icon: Landmark,
    title: "Sky Port",
    link: "/sky-port",
    image: cardSkyport,
    description:
      "Landing infrastructure located on top of skyscrapers and high-rise buildings. Premium access to aerial mobility from the city's highest points.",
  },
  {
    icon: Network,
    title: "Network",
    link: "/hub-network",
    image: cardHubnetwork,
    description:
      "Multiple points connected to form a city-wide mobility network, enabling seamless aerial transportation across entire metropolitan areas.",
  },
];

/* ─── Mobile 3D Auto-Looping Carousel ─── */
const MobileHubCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = hubs.length;

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, count]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsPaused(true);
    setDragStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartX !== null) {
      const diff = e.changedTouches[0].clientX - dragStartX;
      if (Math.abs(diff) > 40) {
        setActiveIndex((prev) => diff < 0 ? (prev + 1) % count : (prev - 1 + count) % count);
      }
    }
    setDragStartX(null);
    setTimeout(() => setIsPaused(false), 2000);
  }, [dragStartX, count]);

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    if (diff > Math.floor(count / 2)) diff -= count;
    if (diff < -Math.floor(count / 2)) diff += count;

    const isCenter = diff === 0;
    const rotateY = diff * 10;
    const scale = isCenter ? 1 : 0.87;
    const opacity = isCenter ? 1 : 0.55;
    const translateX = diff * 72;
    const zIndex = isCenter ? 10 : 5 - Math.abs(diff);

    return {
      transform: `perspective(1000px) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform, opacity" as const,
      boxShadow: isCenter
        ? "0 0 30px hsl(189 100% 50% / 0.25), 0 12px 40px rgba(0,0,0,0.5)"
        : "0 4px 16px rgba(0,0,0,0.3)",
      borderColor: isCenter ? "hsl(189 100% 50% / 0.4)" : "hsl(var(--border))",
    };
  };

  return (
    <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(189 100% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-center" style={{ height: 380, perspective: 1000 }}>
        {hubs.map((hub, i) => {
          const style = getCardStyle(i);
          return (
            <div
              key={hub.title}
              className="absolute rounded-[14px] overflow-hidden border bg-card flex flex-col"
              style={{
                width: "72vw",
                maxWidth: 300,
                height: 380,
                transformStyle: "preserve-3d",
                ...style,
              }}
              onClick={() => {
                setActiveIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
            >
              <div className="relative h-[140px] overflow-hidden">
                <ParallaxImage src={hub.image} alt={hub.title} intensity={8} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-background/70 backdrop-blur-md border border-primary/20 flex items-center justify-center">
                  <hub.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-sub text-[17px] font-medium text-foreground mb-1.5 line-clamp-2">
                  {hub.title}
                </h3>
                <p className="font-body text-[12px] text-titanium leading-[1.55] line-clamp-3 mb-4">
                  {hub.description}
                </p>
                <Link
                  to={hub.link}
                  className="mt-auto inline-flex items-center gap-1.5 font-body text-[12px] text-primary"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {hubs.map((_, i) => (
          <button
            key={i}
            className="rounded-full transition-all duration-500"
            onClick={() => {
              setActiveIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000);
            }}
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
const EcosystemHubSection = () => {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: isMobile ? "56px" : "80px",
        paddingBottom: isMobile ? "56px" : "80px",
        background: "linear-gradient(180deg, hsl(var(--surface-1)) 0%, hsl(var(--surface-2)) 50%, hsl(var(--surface-1)) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className={`font-heading font-semibold text-foreground tracking-futuristic max-w-[820px] ${isMobile ? "text-[26px]" : "text-section"}`}>
            Airavath Mobility Network
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className={`flex justify-center ${isMobile ? "mb-8" : "mb-[100px]"}`}>
          <p className={`font-body text-titanium text-center max-w-[720px] leading-[1.6] ${isMobile ? "text-[14px]" : "text-body-lg"}`}>
            AIRAVATH operates a multi-tier infrastructure that forms the backbone of the
            urban air mobility network. Each type serves a specific role in the ecosystem.
          </p>
        </ScrollReveal>

        {isMobile ? (
          <MobileHubCarousel />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {hubs.map((hub, i) => (
              <ScrollReveal key={hub.title} delay={0.14 * i} direction="up">
                <motion.div
                  className="group bg-card border border-border rounded-[12px] overflow-hidden h-full hover:border-primary/30 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.18)] transition-all duration-300 ease-out"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <ParallaxImage src={hub.image} alt={hub.title} intensity={15} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <hub.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-sub text-[24px] font-medium text-foreground mb-3">
                      {hub.title}
                    </h3>
                    <p className="font-body text-[15px] text-titanium leading-[1.7] mb-6">
                      {hub.description}
                    </p>
                    <Link
                      to={hub.link}
                      className="inline-flex items-center gap-2 font-body text-[14px] text-primary hover:text-foreground transition-colors group/link"
                    >
                      Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EcosystemHubSection;
