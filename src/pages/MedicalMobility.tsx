import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart, Clock, Plane, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import solutionMedical from "@/assets/solution-medical.jpg";
import problemAmbulance from "@/assets/problem-ambulance.jpg";

const steps = [
  {
    number: "01",
    title: "Emergency Request",
    description: "Medical teams or hospitals initiate an aerial medical transport request through the AIRAVATH platform.",
  },
  {
    number: "02",
    title: "Aircraft Dispatch",
    description: "The nearest available medical-configured aircraft is dispatched from the closest mobility hub.",
  },
  {
    number: "03",
    title: "Rapid Pickup",
    description: "The aircraft arrives at the emergency site or hospital helipad for patient pickup within minutes.",
  },
  {
    number: "04",
    title: "Hospital Delivery",
    description: "The patient is transported directly to the destination hospital's rooftop mobility hub, bypassing all ground traffic.",
  },
];

const features = [
  {
    icon: Heart,
    title: "Life-Saving Speed",
    description: "Reduce emergency transport time by up to 80% compared to ground ambulances in congested cities.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Round-the-clock aerial medical transport services available across the city mobility hub network.",
  },
  {
    icon: Plane,
    title: "Medical-Ready Aircraft",
    description: "Aircraft configured with medical equipment and staffed by trained paramedics for in-flight care.",
  },
];

const MedicalMobility = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionMedical} alt="Aerial medical transport" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <ScrollReveal>
            <h1 className="font-heading text-[40px] md:text-[64px] font-semibold text-foreground tracking-futuristic mb-6">
              Medical Mobility
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-body-lg text-titanium max-w-[640px] leading-[1.6]">
              AIRAVATH operates rapid aerial medical transport services, connecting hospitals, emergency sites, and healthcare facilities across cities in minutes instead of hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={problemAmbulance} alt="Ambulance in traffic" className="w-full h-[400px] object-cover rounded-card" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Medical Transport?
              </h2>
              <p className="font-body text-[18px] text-titanium leading-[1.7] mb-6">
                In critical medical emergencies, every minute matters. Ground ambulances are often delayed by traffic congestion, especially in dense urban areas. AIRAVATH's aerial medical mobility service bypasses all ground traffic, delivering patients to hospitals in a fraction of the time.
              </p>
              <p className="font-body text-[18px] text-titanium leading-[1.7]">
                Our medical-configured aircraft and trained paramedic crews ensure patients receive care during transport, while our mobility hub network provides direct rooftop access to partner hospitals.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operational Flow */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Operational Flow
            </h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              How AIRAVATH medical mobility operates from request to delivery.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.15 * i}>
                <div className="bg-card border border-border rounded-card p-8 h-full">
                  <span className="font-heading text-[12px] tracking-[4px] text-primary/60 uppercase mb-4 block">
                    Step {step.number}
                  </span>
                  <h3 className="font-sub text-[20px] text-foreground font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] text-titanium leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={0.15 * i}>
                <div className="group bg-card border border-border rounded-card p-8 h-full text-center hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-feature text-foreground mb-3">{f.title}</h3>
                  <p className="font-body text-base text-titanium leading-[1.6]">{f.description}</p>
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
