import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import CinematicHero from "@/components/CinematicHero";
import { Network, Route, Radio, BarChart3, Globe, Cpu, ArrowLeft, ChevronRight, CheckCircle2, Plane } from "lucide-react";
import ScrollVideoCard from "@/components/ScrollVideoCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/card-hubnetwork.jpg";
import heroHubnetwork2 from "@/assets/hero-hubnetwork-2.jpg";
import heroHubnetwork3 from "@/assets/hero-hubnetwork-3.jpg";
import solutionNetwork from "@/assets/solution-network.jpg";
import gallery1 from "@/assets/gallery-network-1.jpg";
import gallery2 from "@/assets/gallery-network-2.jpg";
import hubNetwork from "@/assets/hub-network.jpg";

/* Animated Network Diagram SVG */
const NetworkDiagram = () => {
  const nodes = [
    { cx: 150, cy: 80, label: "Sky Port A", type: "sky" },
    { cx: 400, cy: 60, label: "Sky Port B", type: "sky" },
    { cx: 80, cy: 220, label: "Vertiport 1", type: "verti" },
    { cx: 300, cy: 200, label: "Ground Port", type: "ground" },
    { cx: 500, cy: 220, label: "Vertiport 2", type: "verti" },
    { cx: 200, cy: 340, label: "Ground Port 2", type: "ground" },
    { cx: 450, cy: 350, label: "Sky Port C", type: "sky" },
  ];
  const routes = [
    [0, 1], [0, 2], [0, 3], [1, 4], [1, 3], [2, 3], [2, 5], [3, 4], [3, 5], [3, 6], [4, 6], [5, 6],
  ];

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <svg viewBox="0 0 580 420" className="w-full h-auto">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(189 100% 50%)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(189 100% 50%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(189 100% 50%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {routes.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="url(#routeGrad)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.05 * i }}
            viewport={{ once: true }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.cx} cy={node.cy} r="8"
              fill={node.type === "sky" ? "hsl(189 100% 50%)" : node.type === "verti" ? "hsl(189 80% 40%)" : "hsl(189 60% 30%)"}
              filter="url(#nodeGlow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
            />
            <motion.circle
              cx={node.cx} cy={node.cy} r="14"
              fill="none" stroke="hsl(189 100% 50%)" strokeWidth="1" strokeOpacity="0.3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              viewport={{ once: true }}
            />
            <text x={node.cx} y={node.cy + 28} textAnchor="middle" fill="hsl(0 0% 60%)" fontSize="10" fontFamily="Space Grotesk">
              {node.label}
            </text>
          </g>
        ))}
        {/* Animated aircraft */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="0" cy="0" r="4" fill="hsl(189 100% 50%)"
            animate={{
              cx: [nodes[0].cx, nodes[3].cx, nodes[4].cx, nodes[6].cx, nodes[5].cx, nodes[2].cx, nodes[0].cx],
              cy: [nodes[0].cy, nodes[3].cy, nodes[4].cy, nodes[6].cy, nodes[5].cy, nodes[2].cy, nodes[0].cy],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

const steps = [
  { number: "01", title: "Route Planning", description: "AI-powered algorithms analyze demand, weather, airspace, and fleet availability to compute optimal routes across the entire hub network.", icon: "🗺️" },
  { number: "02", title: "Fleet Coordination", description: "Aircraft across all hubs are coordinated centrally to balance demand, minimize wait times, and optimize energy usage.", icon: "🤖" },
  { number: "03", title: "Live Traffic Management", description: "The network operations center monitors all active flights, managing separation, sequencing, and contingency routing.", icon: "📡" },
  { number: "04", title: "Dynamic Scaling", description: "The network automatically scales operations based on demand patterns — adding routes during peak hours and optimizing during off-peak.", icon: "📊" },
];

const features = [
  { icon: Globe, title: "City-Wide Coverage", description: "The hub network spans the entire metropolitan area, connecting business districts, airports, hospitals, and landmarks." },
  { icon: Route, title: "Interconnected Routes", description: "Every hub is connected through optimized aerial corridors, creating a mesh network with no single point of failure." },
  { icon: Cpu, title: "AI Operations Engine", description: "Machine learning continuously optimizes fleet positioning, route efficiency, pricing, and predictive maintenance." },
  { icon: Radio, title: "UTM Integration", description: "Full integration with Unmanned Traffic Management systems, coordinating with aviation authorities." },
  { icon: BarChart3, title: "Demand Analytics", description: "Real-time demand forecasting enables proactive fleet positioning and dynamic capacity allocation." },
  { icon: Network, title: "Multi-Hub Transfers", description: "Passengers can seamlessly transfer between hub types with unified ticketing and scheduling." },
];

const benefits = [
  "City-wide aerial connectivity across all hub types",
  "Efficient AI-powered route management",
  "Seamless inter-hub mobility operations",
  "Real-time demand-responsive scaling",
  "99.7% network uptime reliability",
  "Unified ticketing across all hub types",
];

const galleryImages = [
  { src: heroImg, alt: "City-Wide Hub Network" },
  { src: gallery1, alt: "Network Operations Center" },
  { src: gallery2, alt: "Aerial Route Visualization" },
  { src: hubNetwork, alt: "Hub Network Coverage" },
];

const stats = [
  { value: "50+", label: "Hubs per City" },
  { value: "200+", label: "Daily Routes" },
  { value: "< 8 min", label: "Average Wait" },
  { value: "99.7%", label: "Network Uptime" },
  { value: "24/7", label: "Operations" },
  { value: "3 Tiers", label: "Hub Types" },
];

const HubNetwork = () => {
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <CinematicHero
        tagline="City-Wide Mobility Network"
        title="Hub Network"
        description="The unified city-wide aerial mobility network connecting Ground Ports, Vertiports, and Sky Ports into a seamless, AI-coordinated transportation system."
        images={[heroImg, heroHubnetwork2, heroHubnetwork3]}
      />

      {/* Concept Overview */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={solutionNetwork} alt="Network operations" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Concept Overview</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">One Network, Infinite Connections</h2>
              <p className="font-body text-[17px] text-titanium leading-[1.7] mb-6">
                The AIRAVATH Hub Network is the orchestration layer that transforms individual landing pads into a cohesive transportation system. Powered by AI, it coordinates fleet movements, manages airspace, and optimizes operations across every hub.
              </p>
              <p className="font-body text-[17px] text-titanium leading-[1.7]">
                Think of it as the nervous system of urban air mobility — sensing demand, routing aircraft, and adapting to conditions in real time.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Animated Network Diagram */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Network Visualization</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">Connected Mobility Ecosystem</h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">Aircraft travel between multiple hubs across the city in an interconnected mesh network.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-card border border-border rounded-[12px] p-8 md:p-12">
              <NetworkDiagram />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Visual Gallery</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">Hub Network Concepts</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <motion.div className="relative rounded-[12px] overflow-hidden cursor-pointer aspect-[4/3]" onHoverStart={() => setHoveredGallery(i)} onHoverEnd={() => setHoveredGallery(null)} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  <motion.div className="absolute inset-0 bg-primary/20" initial={{ opacity: 0 }} animate={{ opacity: hoveredGallery === i ? 1 : 0 }} transition={{ duration: 0.3 }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                    <p className="font-body text-[12px] text-foreground/80">{img.alt}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">Network at Scale</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} className="bg-card border border-border rounded-[12px] p-6 text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i, duration: 0.6 }} viewport={{ once: true }}>
                  <p className="font-heading text-[32px] font-bold text-primary mb-1">{stat.value}</p>
                  <p className="font-heading text-[12px] tracking-[3px] text-titanium uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Operational Flow */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Operational Flow</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">How the Network Operates</h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">AI-driven coordination from route planning to dynamic scaling.</p>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[2px]">
              <motion.div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={0.2 * i}>
                  <motion.div className="bg-card border border-border rounded-[12px] p-8 h-full relative overflow-hidden group hover:border-primary/30 transition-all duration-500" whileHover={{ y: -4 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 * i, ease: "easeOut" }} viewport={{ once: true }}>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[32px] mb-4">{step.icon}</div>
                    <span className="font-heading text-[12px] tracking-[4px] text-primary/60 uppercase mb-3 block">Step {step.number}</span>
                    <h3 className="font-sub text-[20px] text-foreground font-medium mb-3">{step.title}</h3>
                    <p className="font-body text-[15px] text-titanium leading-[1.7]">{step.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Video Demonstration</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">See It In Action</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollVideoCard src={gallery1} alt="Network operations center" label="Network Operations Center" />
            <ScrollVideoCard src={gallery2} alt="City-wide route animation" label="City-Wide Route Animation" delay={0.15} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Key Benefits</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-8">Why the Hub Network Matters</h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i, duration: 0.6 }} viewport={{ once: true }}>
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-body text-[16px] text-titanium leading-[1.6]">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={hubNetwork} alt="Hub Network benefits" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">Network Capabilities</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={0.12 * i}>
                <motion.div className="group bg-card border border-border rounded-[12px] p-8 h-full hover:border-primary/30 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.1)] transition-all duration-500" whileHover={{ y: -4 }}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-feature text-foreground mb-3">{f.title}</h3>
                  <p className="font-body text-base text-titanium leading-[1.6]">{f.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-airavath text-center">
          <ScrollReveal>
            <h2 className="font-heading text-[28px] md:text-[36px] font-semibold text-foreground tracking-futuristic mb-6">Explore Individual Hub Types</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/ground-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Ground Port <ChevronRight size={16} /></Link>
              <Link to="/vertiport" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Vertiport <ChevronRight size={16} /></Link>
              <Link to="/sky-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Sky Port <ChevronRight size={16} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default HubNetwork;
