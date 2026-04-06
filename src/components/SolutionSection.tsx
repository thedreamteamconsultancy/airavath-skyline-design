import { Plane, Building, Smartphone, Layers, Globe, Leaf } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
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

const SolutionSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "160px",
        paddingBottom: "160px",
        background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.07]" />
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
        {Array.from({ length: 10 }).map((_, i) => (
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
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic max-w-[820px]">
            Urban Air Mobility Ecosystem
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-12x">
          <p className="font-body text-body-lg text-titanium text-center max-w-[720px] leading-[1.6]">
            AIRAVATH operates a complete urban air mobility ecosystem by coordinating electric
            aircraft operations, mobility hub infrastructure, and an intelligent platform that enables
            on-demand aerial transportation across cities.
          </p>
        </ScrollReveal>

        {/* Solution Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={0.2 * i}>
              <div className="group bg-card border border-border rounded-card overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] transition-all duration-500 h-full flex flex-col">
                <div className="relative h-[260px] overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
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

        {/* Highlight Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6x" style={{ marginTop: "120px" }}>
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
