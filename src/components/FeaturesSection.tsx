import { Zap, Shield, Leaf, Gauge } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: Zap,
    title: "Electric Fleet",
    description: "Operating a fleet of electric aircraft delivering silent, efficient vertical flight across cities.",
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
    title: "320 km/h Cruise",
    description: "High-speed urban transit cutting commute times by 80% across city mobility networks.",
  },
];

/* ─── Mobile 3D Floating Card ─── */
const FloatingCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 80, scale: 0.9, rotateX: 8 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 1.03 }}
      className="relative"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        marginTop: index > 0 ? "-12px" : "0",
        zIndex: features.length + index,
        willChange: "transform, opacity",
      }}
    >
      <div
        className="bg-card border border-border rounded-card p-5 flex items-start gap-4"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px hsl(189 100% 50% / 0.08)",
        }}
      >
        <div
          className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: "0 0 12px hsl(189 100% 50% / 0.15)" }}
        >
          <feature.icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-sub text-[16px] font-medium text-foreground mb-1 line-clamp-1">
            {feature.title}
          </h3>
          <p className="font-body text-[12px] text-muted-foreground leading-[1.55] line-clamp-2">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative bg-surface-0" style={{ padding: isMobile ? "48px 0" : undefined }}>
      <div className={isMobile ? "px-5" : "container-airavath section-padding"}>
        <ScrollReveal>
          <p className="font-sub text-body-sm text-primary tracking-wide-futuristic uppercase mb-3x">
            Operational Capabilities
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className={`font-heading font-semibold text-foreground tracking-futuristic max-w-3xl ${
              isMobile ? "text-[24px] mb-3x" : "text-section mb-4x"
            }`}
          >
            Mobility Network Operations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p
            className={`font-body text-muted-foreground max-w-2xl ${
              isMobile ? "text-[13px] mb-8" : "text-body-lg mb-12x"
            }`}
          >
            Operating aerial mobility services with precision, safety, and next-generation fleet management.
          </p>
        </ScrollReveal>

        {isMobile ? (
          <div className="flex flex-col" style={{ perspective: "1000px" }}>
            {features.map((feature, i) => (
              <FloatingCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
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
