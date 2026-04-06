import { Building2, Plane, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import vertiportNetwork from "@/assets/vertiport-network.jpg";

const cards = [
  {
    icon: Building2,
    title: "Rooftop Vertiports",
    description:
      "Vertiports located on skyscraper rooftops provide rapid access to aerial mobility within dense urban environments.",
  },
  {
    icon: Plane,
    title: "Airport Integration",
    description:
      "Vertiports integrated with airports enable seamless connections between regional and urban transportation.",
  },
  {
    icon: Landmark,
    title: "Business District Access",
    description:
      "Strategically placed vertiports connect financial centers and commercial districts for efficient executive travel.",
  },
];

// SVG vertiport nodes and routes overlay
const NetworkOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full z-10"
    viewBox="0 0 1100 520"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="nodeGlow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(189,100%,50%)" stopOpacity="0.1" />
        <stop offset="50%" stopColor="hsl(189,100%,50%)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(189,100%,50%)" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {[
      "M180,380 Q350,200 550,260",
      "M550,260 Q700,180 900,320",
      "M180,380 Q450,300 900,320",
      "M550,260 Q400,150 300,180",
      "M900,320 Q800,200 700,150",
    ].map((d, i) => (
      <motion.path
        key={i}
        d={d}
        stroke="url(#routeLine)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 * i, ease: "easeOut" }}
      />
    ))}

    {[
      { cx: 180, cy: 380 },
      { cx: 550, cy: 260 },
      { cx: 900, cy: 320 },
      { cx: 300, cy: 180 },
      { cx: 700, cy: 150 },
    ].map((node, i) => (
      <g key={i} filter="url(#nodeGlow)">
        <motion.circle
          cx={node.cx}
          cy={node.cy}
          r="6"
          fill="hsl(189,100%,50%)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
        />
        <motion.circle
          cx={node.cx}
          cy={node.cy}
          r="14"
          fill="none"
          stroke="hsl(189,100%,50%)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{
            delay: 1 + i * 0.2,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </g>
    ))}

    <motion.circle
      r="3"
      fill="hsl(189,100%,70%)"
      filter="url(#nodeGlow)"
      animate={{
        cx: [180, 350, 550, 700, 900],
        cy: [380, 280, 260, 200, 320],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </svg>
);

const VertiportSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 0.8%) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vertiRoute" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(189,100%,50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,300 Q500,150 1000,350 T2000,250" stroke="url(#vertiRoute)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-[28px] sm:text-[36px] md:text-section text-foreground tracking-futuristic max-w-[760px] px-2">
            Mobility Hub Infrastructure
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-16 md:mb-[120px]">
          <p className="font-body text-[15px] md:text-body-lg text-titanium text-center max-w-[720px] leading-[1.6] px-4">
            AIRAVATH operates strategically located vertiports and mobility hubs across cities,
            enabling seamless take-off and landing operations while creating a scalable aerial
            mobility network connecting key urban destinations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="flex justify-center mb-[120px]">
          <div className="relative max-w-[1100px] w-full rounded-card overflow-hidden">
            <img
              src={vertiportNetwork}
              alt="Vertiport network across city skyline"
              className="w-full h-auto max-h-[520px] object-cover"
            />
            <NetworkOverlay />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-primary/10 blur-3xl rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={0.2 * i}>
              <div className="group bg-card border border-border rounded-card p-4x text-center hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] transition-all duration-500 h-full flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3x transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(189_100%_50%/0.3)]">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sub text-feature text-foreground mb-2x">
                  {card.title}
                </h3>
                <p className="font-body text-base text-titanium leading-[1.6]">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VertiportSection;
