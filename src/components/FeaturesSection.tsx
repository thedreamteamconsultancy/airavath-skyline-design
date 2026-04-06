import { Zap, Shield, Leaf, Gauge } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

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

const FeaturesSection = () => {
  return (
    <section className="relative section-padding">
      <div className="container-airavath">
        <ScrollReveal>
          <p className="font-sub text-body-sm text-primary tracking-wide-futuristic uppercase mb-3x">
            Operational Capabilities
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-heading text-section text-foreground mb-4x max-w-3xl tracking-futuristic">
            Mobility Network Operations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-body text-body-lg text-muted-foreground max-w-2xl mb-12x">
            Operating aerial mobility services with precision, safety, and next-generation fleet management.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3x">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={0.1 * i}>
              <div className="group bg-card border border-border rounded-card p-4x hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] transition-all duration-500 h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3x group-hover:bg-primary/20 transition-colors">
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
      </div>
    </section>
  );
};

export default FeaturesSection;
