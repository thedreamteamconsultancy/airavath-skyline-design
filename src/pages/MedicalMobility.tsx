import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Clock, Plane, ArrowLeft, AlertTriangle, Activity, Radio, Stethoscope } from "lucide-react";
import solutionMedical from "@/assets/solution-medical.jpg";
import problemAmbulance from "@/assets/problem-ambulance.jpg";
import heroSkyline from "@/assets/hero-skyline.jpg";
import solutionNetwork from "@/assets/solution-network.jpg";

const stats = [
  { value: "80%", label: "Faster Than Ground Ambulances" },
  { value: "24/7", label: "Round-the-Clock Operations" },
  { value: "<8min", label: "Average Response Time" },
  { value: "100+", label: "Partner Hospital Network" },
];

const steps = [
  { number: "01", title: "Emergency Request", description: "Medical team or hospital initiate an aerial medical transport request through the AIRAVATH platform.", icon: "🚨" },
  { number: "02", title: "Aircraft Dispatch", description: "The nearest available medical-configured aircraft is dispatched from the closest mobility point.", icon: "🛫" },
  { number: "03", title: "Rapid Pickup", description: "The aircraft arrives at the emergency site or hospital helipad for patient pickup within minutes.", icon: "⚡" },
  { number: "04", title: "Hospital Delivery", description: "The patient is transported directly to the destination hospital's rooftop mobility point, bypassing all ground traffic.", icon: "🏥" },
];

const capabilities = [
  { icon: Heart, title: "Life-Saving Speed", description: "Reduce emergency transport time by up to 80% compared to ground ambulances in congested cities." },
  { icon: Clock, title: "24/7 Operations", description: "Round-the-clock aerial medical transport services available across the city mobility network." },
  { icon: Plane, title: "Medical-Ready Aircraft", description: "Aircraft configured with medical equipment and staffed by trained paramedics for in-flight care." },
  { icon: AlertTriangle, title: "Critical Care Transport", description: "Specialized equipment for cardiac emergencies, trauma cases, and organ transport with real-time monitoring." },
  { icon: Activity, title: "Real-Time Monitoring", description: "In-flight patient vitals monitoring connected to receiving hospital for seamless handoff preparation." },
  { icon: Radio, title: "Hospital Coordination", description: "Direct communication with trauma centers ensuring receiving teams are ready upon arrival." },
];

const MedicalMobility = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionMedical} alt="Aerial medical transport" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32 pb-16">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-heading text-[12px] tracking-[6px] text-primary/70 uppercase mb-4 block">Emergency Mobility</span>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[72px] font-bold text-foreground tracking-futuristic mb-6 leading-[1.05]">
              When Every Minute<br />Matters
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-[16px] md:text-[20px] text-titanium max-w-[640px] leading-[1.7]"
          >
            AIRAVATH operates rapid aerial medical transport services, connecting hospital, emergency sites, and healthcare facilities across cities in minutes instead of hours.
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
                <img src={problemAmbulance} alt="Ambulance stuck in traffic" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Problem</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Medical Transport?
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                In critical medical emergencies, every minute matters. Ground ambulances are often delayed by traffic congestion, especially in dense urban areas. AIRAVATH's aerial emergency mobility service bypasses all ground traffic, delivering patients to hospital in a fraction of the time.
              </p>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7]">
                Our medical-configured aircraft and trained paramedic crew ensure patients receive care during transport, while our mobility network provides direct rooftop access to partner hospital.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operational Flow */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Emergency Response Flow
            </h2>
            <p className="font-body text-[16px] md:text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              How AIRAVATH emergency mobility operates from request to delivery.
            </p>
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

      {/* Solution Visual */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Medical-Grade Operations
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                Every AIRAVATH emergency aircraft is equipped with advanced medical systems, life-support equipment, and real-time patient monitoring — ensuring continuous care from pickup to hospital landing.
              </p>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <Stethoscope className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-sub text-[14px] text-foreground">Paramedic CREW On Board</h4>
                  <p className="font-body text-[12px] text-titanium">Trained medical professionals accompany every emergency flight.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={solutionNetwork} alt="Emergency mobility network" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 3%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              Emergency Mobility Capabilities
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

      <FooterSection />
    </div>
  );
};

export default MedicalMobility;
