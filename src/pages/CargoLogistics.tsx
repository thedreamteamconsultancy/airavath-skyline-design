import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Package, Clock, Plane, ArrowLeft, Truck, BarChart3, Globe, Zap } from "lucide-react";
import solutionCargo from "@/assets/solution-cargo.jpg";
import problemCargo from "@/assets/problem-cargo.jpg";
import cardNextgen from "@/assets/card-nextgen.jpg";
import solutionNetwork from "@/assets/solution-network.jpg";

const stats = [
  { value: "70%", label: "Faster Than Ground Logistics" },
  { value: "5x", label: "More Efficient Routing" },
  { value: "500kg", label: "Max Payload Capacity" },
  { value: "200km", label: "Operational Range" },
];

const steps = [
  { number: "01", title: "Cargo Request", description: "Businesses or logistics partners submit a cargo transport request through the AIRAVATH platform.", icon: "📦" },
  { number: "02", title: "Cargo Loading", description: "Packages are loaded at the nearest cargo-enabled mobility point with automated handling systems.", icon: "⚙️" },
  { number: "03", title: "Aerial Transport", description: "Cargo aircraft fly directly to the destination point, bypassing all ground congestion.", icon: "✈️" },
  { number: "04", title: "Delivery", description: "Cargo is unloaded at the destination mobility point and dispatched for last-mile delivery.", icon: "📍" },
];

const capabilities = [
  { icon: Package, title: "Rapid Delivery", description: "Same-day and express cargo delivery across cities, reducing logistics time by up to 70%." },
  { icon: Clock, title: "Reliable Operations", description: "Weather-adaptive scheduling and real-time tracking ensure predictable and dependable cargo services." },
  { icon: Plane, title: "Scalable Network", description: "Expanding cargo mobility network enabling efficient aerial logistics across multiple cities." },
  { icon: Truck, title: "Last-Mile Integration", description: "Seamless handoff to ground delivery partners for final-mile package delivery to doorstep." },
  { icon: BarChart3, title: "Real-Time Tracking", description: "End-to-end visibility of every shipment with live GPS tracking and delivery notifications." },
  { icon: Globe, title: "Cross-City Operations", description: "Connect warehouses, distribution centers, and retail locations across entire metropolitan regions." },
];

const CargoLogistics = () => {
  const navigate = useNavigate();
  useEffect(() => { import('"@/components/SmoothScroll"').then(m => { const l = m.getLenis(); if (l) l.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionCargo} alt="Aerial cargo transport" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32 pb-16">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-heading text-[12px] tracking-[6px] text-primary/70 uppercase mb-4 block">Cargo Logistics</span>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[72px] font-bold text-foreground tracking-futuristic mb-6 leading-[1.05]">
              Aerial Logistics<br />Redefined
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-[16px] md:text-[20px] text-titanium max-w-[640px] leading-[1.7]"
          >
            AIRAVATH operates aerial cargo delivery services, moving packages and supplies efficiently across urban mobility networks.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 3%) 100%)" }}>
        <div className="container-airavath">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="text-center">
                  <div className="font-heading text-[32px] md:text-[44px] text-primary tracking-futuristic mb-1">{stat.value}</div>
                  <p className="font-body text-[12px] md:text-[14px] text-titanium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={problemCargo} alt="Ground logistics congestion" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Problem</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Cargo?
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                Urban logistics is reaching its limits. Growing demand for rapid delivery is increasing congestion, making ground-based logistics slower and more expensive. AIRAVATH's aerial cargo service offers a faster, more efficient alternative.
              </p>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7]">
                Our cargo-configured aircraft and mobility network enable businesses to move goods across cities in minutes, not hours — reducing delivery costs and improving customer satisfaction.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                The Aerial Logistics Network
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                AIRAVATH's cargo network connects warehouses, distribution centers, and delivery points across cities. Automated loading systems and AI-optimized routing ensure maximum efficiency.
              </p>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-sub text-[14px] text-foreground">Automated Operations</h4>
                  <p className="font-body text-[12px] text-titanium">AI-powered cargo management from loading to delivery handoff.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={cardNextgen} alt="Cargo aircraft operations" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Solution</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operational Flow */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Operational Flow
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.12 * i}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(189_100%_50%/0.15)] transition-all duration-300">
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <span className="font-heading text-[11px] tracking-[4px] text-primary/60 uppercase mb-3 block">Step {step.number}</span>
                  <h3 className="font-sub text-[18px] md:text-[20px] text-foreground font-medium mb-3">{step.title}</h3>
                  <p className="font-body text-[14px] md:text-[15px] text-titanium leading-[1.7]">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 3%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              Cargo Logistics Capabilities
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={0.1 * i}>
                <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-[16px] md:text-feature text-foreground mb-3">{cap.title}</h3>
                  <p className="font-body text-[13px] md:text-base text-titanium leading-[1.6]">{cap.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[350px]">
                <img src={solutionNetwork} alt="Cargo network" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4"><span className="font-sub text-[13px] text-foreground">Logistics Network</span></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[350px]">
                <img src={solutionCargo} alt="Cargo operations" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4"><span className="font-sub text-[13px] text-foreground">Aerial Delivery</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default CargoLogistics;
