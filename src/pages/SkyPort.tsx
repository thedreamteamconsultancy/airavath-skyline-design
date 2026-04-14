import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import CinematicHero from "@/components/CinematicHero";
import { Landmark, Eye, Crown, Wind, Sun, Radar, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollVideoCard from "@/components/ScrollVideoCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/card-skyport.jpg";
import heroSkyport2 from "@/assets/hero-skyport-2.jpg";
import heroSkyport3 from "@/assets/hero-skyport-3.jpg";
import visionSkyline from "@/assets/vision-skyline.jpg";
import gallery1 from "@/assets/gallery-skyport-1.jpg";
import gallery2 from "@/assets/gallery-skyport-2.jpg";
import hubSkyport from "@/assets/hub-skyport.jpg";

const steps = [
  { number: "01", title: "VIP Arrival", description: "Passengers arrive at the building's dedicated Sky Port lobby via express elevator. VIP concierge and private check-in ensure a premium experience.", icon: "🏢" },
  { number: "02", title: "Rooftop Lounge", description: "Passengers enter the panoramic rooftop lounge with 360° city views. Premium refreshments and private waiting areas available before departure.", icon: "🌆" },
  { number: "03", title: "Express Boarding", description: "Direct walk-out boarding onto the rooftop landing pad. No stairs, no transfers — step from lounge to aircraft in under 60 seconds.", icon: "🚪" },
  { number: "04", title: "Vertical Departure", description: "The eVTOL lifts off from the rooftop pad, clearing the building and entering the aerial corridor. Passengers enjoy unobstructed city views.", icon: "🛫" },
];

const features = [
  { icon: Crown, title: "Premium Experience", description: "Sky Ports are designed for executive and VIP travelers. Premium lounges, concierge services, and private boarding." },
  { icon: Eye, title: "Panoramic City Views", description: "Located atop the tallest buildings, Sky Ports offer breathtaking 360° views during boarding." },
  { icon: Landmark, title: "Prime Locations", description: "Positioned on landmark skyscrapers in business districts, financial centers, and premium hotel towers." },
  { icon: Wind, title: "Wind Management", description: "Advanced wind deflection barriers and real-time atmospheric monitoring ensure safe operations." },
  { icon: Sun, title: "Solar Integration", description: "Rooftop solar arrays supplement charging infrastructure, reducing the carbon footprint of operations." },
  { icon: Radar, title: "360° Radar Coverage", description: "Full-perimeter radar and LiDAR systems provide comprehensive airspace awareness." },
];

const benefits = [
  "Fast rooftop access from premium city locations",
  "VIP and executive-class travel experience",
  "Panoramic 360° city views during boarding",
  "Express elevator access in under 90 seconds",
  "Minimal ground-level congestion impact",
  "Solar-powered sustainable operations",
];

const galleryImages = [
  { src: heroImg, alt: "Sky Port Rooftop Platform" },
  { src: gallery1, alt: "Premium Rooftop Lounge" },
  { src: gallery2, alt: "eVTOL Rooftop Approach" },
  { src: hubSkyport, alt: "Sky Port City Integration" },
];

const specs = [
  { label: "Elevation", value: "100 – 400m+" },
  { label: "Pad Size", value: "600 – 1,200 m²" },
  { label: "Pads", value: "1 – 2 per building" },
  { label: "Express Elevator", value: "< 90 seconds" },
  { label: "Wind Tolerance", value: "55 km/h gusts" },
  { label: "Solar Output", value: "150 kW peak" },
];

const SkyPort = () => {
  useEffect(() => { const l = (window as any).__lenis; if (l) l.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }, []);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <CinematicHero
        tagline="Rooftop Landing Infrastructure"
        title="Sky Port"
        description="Rooftop landing infrastructure on skyscrapers and high-rise buildings — delivering premium, express aerial mobility from the city's highest points."
        images={[heroImg, heroSkyport2, heroSkyport3]}
      />

      {/* Concept Overview */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-[12px] overflow-hidden">
                <img src={visionSkyline} alt="Sky Port view" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">Concept Overview</span>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">The Pinnacle of Urban Air Mobility</h2>
              <p className="font-body text-[17px] text-titanium leading-[1.7] mb-6">
                Sky Ports sit atop the city's tallest structures, providing the fastest access to aerial mobility with the shortest vertical climb. They're designed for executives, VIP travelers, and time-critical services.
              </p>
              <p className="font-body text-[17px] text-titanium leading-[1.7]">
                With express elevator access, panoramic lounges, and direct rooftop boarding, Sky Ports deliver a premium experience that redefines urban transportation.
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
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic">Sky Port Concepts</h2>
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
            <span className="font-heading text-[12px] tracking-[4px] text-primary uppercase mb-4 block">The Sky Port Experience</span>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">How It Works</h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">From lobby to liftoff — a premium journey above the skyline.</p>
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
            <ScrollVideoCard src={gallery1} alt="Premium rooftop lounge" label="Premium Rooftop Lounge Tour" />
            <ScrollVideoCard src={gallery2} alt="eVTOL rooftop landing" label="eVTOL Rooftop Landing Sequence" delay={0.15} />
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
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-8">Why Sky Ports Matter</h2>
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
                <img src={hubSkyport} alt="Sky Port benefits" className="w-full h-[400px] object-cover" />
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
            <h2 className="font-heading text-[28px] md:text-[36px] font-semibold text-foreground tracking-futuristic mb-6">Explore the Full Mobility Network</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/ground-port" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Ground Port <ChevronRight size={16} /></Link>
              <Link to="/vertiport" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Vertiport <ChevronRight size={16} /></Link>
              <Link to="/hub-network" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-body hover:border-primary/30 transition-all">Mobility Network <ChevronRight size={16} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SkyPort;
