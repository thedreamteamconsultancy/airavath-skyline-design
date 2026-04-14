import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import CinematicHero from "@/components/CinematicHero";
import { Plane, BatteryCharging, Building, Wifi, Gauge, Shield, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollVideoCard from "@/components/ScrollVideoCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/card-vertiport.jpg";
import heroVertiport2 from "@/assets/hero-vertiport-2.jpg";
import heroVertiport3 from "@/assets/hero-vertiport-3.jpg";
import solutionVertiport from "@/assets/solution-vertiport.jpg";
import gallery1 from "@/assets/gallery-vertiport-1.jpg";
import gallery2 from "@/assets/gallery-vertiport-2.jpg";
import hubVertiport from "@/assets/hub-vertiport.jpg";

const steps = [
  { number: "01", title: "Approach & Landing", description: "eVTOL aircraft approach the mid-building Vertiport using precision GPS guidance. Automated air traffic management ensures safe approach paths.", icon: "📡" },
  { number: "02", title: "Rapid Turnaround", description: "Aircraft dock at the Vertiport pad. Passengers disembark while the aircraft undergoes rapid charging and safety checks — all within 5 minutes.", icon: "⚡" },
  { number: "03", title: "Passenger Flow", description: "Arriving passengers exit through the Vertiport terminal directly into the building's elevator core. Departing passengers check in at the lounge.", icon: "🚶" },
  { number: "04", title: "Departure & Ascent", description: "New passengers board the charged aircraft. The eVTOL lifts off vertically from the platform and connects to the aerial corridor network.", icon: "🛫" },
];

const features = [
  { icon: Building, title: "Mid-Building Integration", description: "Vertiports are engineered into existing commercial towers at optimal heights, eliminating new standalone structures." },
  { icon: Plane, title: "Rapid Turnaround Ops", description: "Designed for 5-minute turnaround cycles — passengers off, charge, safety check, passengers on, takeoff." },
  { icon: BatteryCharging, title: "Charging Infrastructure", description: "Integrated 350 kW DC fast-charging stations enable aircraft to reach 80% charge during the turnaround window." },
  { icon: Wifi, title: "Smart Building Connect", description: "IoT-connected to the host building's systems for fire safety, HVAC integration, and shared elevator access." },
  { icon: Gauge, title: "Real-Time Monitoring", description: "Wind sensors, weather monitoring, and AI-driven traffic management for safe operations at all times." },
  { icon: Shield, title: "Safety Systems", description: "Automated fire suppression, emergency containment barriers, and backup power systems ensure operational safety." },
];

const benefits = [
  "Rapid vertical landing on mid-building platforms",
  "Seamless integration with commercial buildings",
  "Direct urban mobility access from office towers",
  "5-minute turnaround cycle per aircraft",
  "IoT-connected building systems integration",
  "Advanced weather and wind monitoring",
];

const galleryImages = [
  { src: heroImg, alt: "Vertiport Platform Overview" },
  { src: gallery1, alt: "Landing Pad Infrastructure" },
  { src: gallery2, alt: "Passenger Boarding Terminal" },
  { src: hubVertiport, alt: "Vertiport City Integration" },
];

const specs = [
  { label: "Platform Area", value: "800 – 1,500 m²" },
  { label: "Building Level", value: "Floors 5 – 30" },
  { label: "Pads", value: "1 – 2 simultaneous" },
  { label: "Turnaround", value: "< 5 minutes" },
  { label: "Max Wind", value: "45 km/h operational" },
  { label: "Weight Capacity", value: "5,000 kg per pad" },
];

const Vertiport = () => {
  useEffect(() => { import('"@/components/SmoothScroll"').then(m => { const l = m.getLenis(); if (l) l.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }); }, []);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <CinematicHero
        tagline="Mid-Building Landing Platform"
        title="Vertiport"
        description="Elevated landing platforms integrated into commercial buildings — designed for rapid turnaround operations and seamless urban connectivity."
        images={[heroImg, heroVertiport2, heroVertiport3]}
      />

      {/* Concept Overview */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={solutionVertiport} alt="Vertiport infrastructure" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Concept Overview</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">The Mid-City Mobility Node</h2>
              <p className="font-body text-[17px] text-titanium leading-[1.7] mb-6">
                Vertiports represent the workhorse of the AIRAVATH network. Positioned on mid-level building platforms, they provide the highest density of landing infrastructure across the city without requiring rooftop modifications.
              </p>
              <p className="font-body text-[17px] text-titanium leading-[1.7]">
                Each Vertiport is engineered for rapid operations — charging, boarding, and turnaround happen simultaneously, enabling one aircraft movement every 5 minutes per pad.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Visual Gallery</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">Vertiport Concepts</h2>
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

      {/* Animated Operational Flow */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Operational Cycle</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">How It Works</h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">The Vertiport turnaround — precision-engineered for speed and safety.</p>
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
            <ScrollVideoCard src={gallery1} alt="Vertiport landing sequence" label="Platform Landing Sequence" />
            <ScrollVideoCard src={gallery2} alt="Passenger boarding experience" label="Passenger Boarding Experience" delay={0.15} />
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[60px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">Technical Specifications</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
              {specs.map((spec, i) => (
                <motion.div key={spec.label} className="bg-card border border-border rounded-[12px] p-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.6 }} viewport={{ once: true }}>
                  <p className="font-heading text-[12px] tracking-[3px] text-primary/60 uppercase mb-2">{spec.label}</p>
                  <p className="font-heading text-[22px] font-semibold text-foreground">{spec.value}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Key Benefits</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-8">Why Vertiports Matter</h2>
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
                <img src={hubVertiport} alt="Vertiport benefits" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">Key Capabilities</h2>
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
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath text-center">
          <ScrollReveal>
            <h2 className="font-heading text-[28px] md:text-[36px] font-semibold text-foreground tracking-futuristic mb-6">Explore the Full Hub Network</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/ground-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Ground Port <ChevronRight size={16} /></Link>
              <Link to="/sky-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Sky Port <ChevronRight size={16} /></Link>
              <Link to="/hub-network" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Hub Network <ChevronRight size={16} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Vertiport;
