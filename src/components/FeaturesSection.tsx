import { useRef, useState, useEffect, useCallback } from "react";
import { Zap, Shield, Leaf, Gauge } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: Zap,
    title: "Electric Fleet",
    description: "Aircrafts | delivering silent, efficient flights",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Triple-redundant flight systems with AI-powered navigation and emergency protocols ensure passenger safety.",
  },
  {
    icon: Leaf,
    title: "Zero Emissions",
    description: "100% electric operations supporting carbon-neutral aerial mobility services.",
  },
  {
    icon: Gauge,
    title: "High Speed Mobility",
    description: "High-speed urban transit cutting commute times by 80% across city mobility networks.",
  },
];

/* ─── Mobile 3D Auto-Looping Carousel ─── */
const MobileFeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = features.length;

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

      <div className="relative flex items-center justify-center" style={{ height: 300, perspective: 1000 }}>
        {features.map((feature, i) => {
          const style = getCardStyle(i);
          return (
            <div
              key={feature.title}
              className="absolute rounded-[14px] overflow-hidden border bg-card flex flex-col"
              style={{
                width: "72vw",
                maxWidth: 300,
                height: 300,
                transformStyle: "preserve-3d",
                ...style,
              }}
              onClick={() => {
                setActiveIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
            >
              <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-sub text-[17px] font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-[12px] text-titanium leading-[1.55]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {features.map((_, i) => (
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

const FeaturesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative section-padding bg-surface-0">
      <div className="container-airavath">
        <ScrollReveal>
          <p className="font-sub text-body-sm text-primary tracking-wide-futuristic uppercase mb-3x">
            Operational Capabilities
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className={`font-heading font-semibold text-foreground tracking-futuristic mb-4x max-w-3xl ${isMobile ? "text-[26px]" : "text-section"}`}>
            Mobility Network Operations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className={`font-body text-muted-foreground max-w-2xl mb-12x ${isMobile ? "text-[14px]" : "text-body-lg"}`}>
            Operating aerial mobility services with precision, safety, and next-generation fleet management.
          </p>
        </ScrollReveal>

        {isMobile ? (
          <MobileFeatureCarousel />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3x">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={0.12 * i} direction="up">
                <div className="group bg-card border border-border rounded-card p-4x hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(189_100%_50%/0.18)] hover:border-primary/30 transition-all duration-300 ease-out h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3x group-hover:bg-primary/20 group-hover:shadow-[0_0_16px_hsl(189_100%_50%/0.25)] transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-feature text-foreground mb-2x">
                    {feature.title}
                  </h3>
                  <p className="font-body text-body-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
