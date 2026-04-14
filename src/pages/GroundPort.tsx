import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import CinematicHero from "@/components/CinematicHero";
import { Building2, Users, TrainFront, ShieldCheck, Zap, Clock, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollVideoCard from "@/components/ScrollVideoCard";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/card-groundport.jpg";
import heroGroundport2 from "@/assets/hero-groundport-2.jpg";
import heroGroundport3 from "@/assets/hero-groundport-3.jpg";
import vertiportNetwork from "@/assets/vertiport-network.jpg";
import gallery1 from "@/assets/gallery-groundport-1.jpg";
import gallery2 from "@/assets/gallery-groundport-2.jpg";
import hubGroundport from "@/assets/hub-groundport.jpg";

const steps = [
  { number: "01", title: "Arrival & Check-In", description: "Passengers arrive at the street-level Ground Port via metro, taxi, or private vehicle. Automated kiosks and digital ID verification ensure seamless check-in within 60 seconds.", icon: "🚶" },
  { number: "02", title: "Security & Boarding", description: "Quick biometric security screening followed by entry into the premium departure lounge. Real-time flight status displays keep passengers informed.", icon: "🔐" },
  { number: "03", title: "Ground-to-Air Transfer", description: "Passengers are guided to the vertical lift platform where the eVTOL aircraft is prepped and ready. Boarding takes under 2 minutes.", icon: "🛫" },
  { number: "04", title: "Takeoff & Transit", description: "The aircraft lifts off vertically from the Ground Port pad, ascending to cruise altitude and connecting to the nearest hub at the destination.", icon: "✈️" },
];

const features = [
  { icon: Building2, title: "Street-Level Access", description: "Located at ground level for maximum accessibility — no elevators or rooftop access needed." },
  { icon: Users, title: "Premium Passenger Lounges", description: "Climate-controlled waiting areas with comfortable seating, refreshments, Wi-Fi, and real-time flight tracking." },
  { icon: TrainFront, title: "Multi-modal Integration", description: "Seamlessly connected to metro stations, bus stops, ride-hailing drop-offs, and bicycle docking stations." },
  { icon: ShieldCheck, title: "Automated Security", description: "AI-powered biometric screening and baggage checks that reduce wait times to under 90 seconds." },
  { icon: Zap, title: "Rapid Charging Bays", description: "High-speed 350kW charging infrastructure for eVTOL aircraft, enabling fast turnaround between flights." },
  { icon: Clock, title: "24/7 Operations Center", description: "On-site command center monitoring all Ground Port operations, coordinating with the city-wide network." },
];

const benefits = [
  "Maximum passenger accessibility at street level",
  "Seamless ground transportation integration",
  "Premium waiting lounges with real-time updates",
  "Biometric security in under 90 seconds",
  "Multi-modal first/last mile connectivity",
  "Integrated EV charging infrastructure",
];

const galleryImages = [
  { src: heroImg, alt: "Ground Port Terminal Exterior" },
  { src: gallery1, alt: "Ground Port Passenger Lounge" },
  { src: gallery2, alt: "eVTOL Charging Station" },
  { src: hubGroundport, alt: "Ground Port Aerial View" },
];

const specs = [
  { label: "Footprint", value: "2,500 – 5,000 m²" },
  { label: "Landing Pads", value: "2 – 4 simultaneous" },
  { label: "Passenger Capacity", value: "200+ / hour" },
  { label: "Turnaround Time", value: "< 5 minutes" },
  { label: "Charging Speed", value: "350 kW DC fast" },
  { label: "Noise Level", value: "< 65 dB at boundary" },
];

const GroundPort = () => {
  useEffect(() => { import('"@/components/SmoothScroll"').then(m => { const l = m.getLenis(); if (l) l.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }); }, []);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <CinematicHero
        tagline="Ground-Level Mobility Point"
        title="Ground Port"
        description="Street-level mobility terminals that serve as the primary gateway to AIRAVATH's urban air mobility network — designed for maximum accessibility and seamless multi-modal integration."
        images={[heroImg, heroGroundport2, heroGroundport3]}
      />

      {/* Concept Overview */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={vertiportNetwork} alt="Ground Port concept" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Concept Overview</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                The Foundation of Urban Air Mobility
              </h2>
              <p className="font-body text-[17px] text-titanium leading-[1.7] mb-6">
                Ground Ports are the entry-level infrastructure of the AIRAVATH ecosystem. Positioned at street level in key urban locations, they eliminate the need for rooftop or elevated access — making aerial mobility as easy as catching a bus.
              </p>
              <p className="font-body text-[17px] text-titanium leading-[1.7]">
                Each Ground Port integrates with existing public transit, ride-hailing services, and pedestrian networks, creating a true multi-modal transportation point that bridges ground and air.
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
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              Ground Port Concepts
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <motion.div
                  className="relative rounded-[12px] overflow-hidden cursor-pointer aspect-[4/3]"
                  onHoverStart={() => setHoveredGallery(i)}
                  onHoverEnd={() => setHoveredGallery(null)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredGallery === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
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
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Operational Flow</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              How It Works
            </h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              From street to sky — the Ground Port passenger journey.
            </p>
          </ScrollReveal>

          {/* Animated flow line */}
          <div className="relative">
            <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[2px]">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={0.2 * i}>
                  <motion.div
                    className="bg-card border border-border rounded-[12px] p-8 h-full relative overflow-hidden group hover:border-primary/30 transition-all duration-500"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 * i, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
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
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              See It In Action
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollVideoCard src={gallery1} alt="Ground Port terminal walkthrough" label="Passenger Terminal Walkthrough" />
            <ScrollVideoCard src={gallery2} alt="eVTOL charging operations" label="eVTOL Charging Operations" delay={0.15} />
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
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

      {/* Benefits Section */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Key Benefits</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-8">
                Why Ground Ports Matter
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-body text-[16px] text-titanium leading-[1.6]">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={hubGroundport} alt="Ground Port benefits" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
            <h2 className="font-heading text-[28px] md:text-[36px] font-semibold text-foreground tracking-futuristic mb-6">Explore the Full Mobility Network</h2>
            <p className="font-body text-body-lg text-titanium max-w-[540px] mx-auto mb-8 leading-[1.6]">Ground Ports work in concert with Vertiports, Sky Ports, and the Mobility Network.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/vertiport" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Vertiport <ChevronRight size={16} /></Link>
              <Link to="/sky-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Sky Port <ChevronRight size={16} /></Link>
              <Link to="/hub-network" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Mobility Network <ChevronRight size={16} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default GroundPort;
