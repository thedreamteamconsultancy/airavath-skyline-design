import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Package, Clock, Plane, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import solutionCargo from "@/assets/solution-cargo.jpg";
import problemCargo from "@/assets/problem-cargo.jpg";

const steps = [
  {
    number: "01",
    title: "Cargo Request",
    description: "Businesses or logistics partners submit a cargo transport request through the AIRAVATH platform.",
  },
  {
    number: "02",
    title: "Cargo Loading",
    description: "Packages are loaded at the nearest cargo-enabled mobility hub with automated handling systems.",
  },
  {
    number: "03",
    title: "Aerial Transport",
    description: "Cargo aircraft fly directly to the destination hub, bypassing all ground congestion.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Cargo is unloaded at the destination mobility hub and dispatched for last-mile delivery.",
  },
];

const features = [
  {
    icon: Package,
    title: "Rapid Delivery",
    description: "Same-day and express cargo delivery across cities, reducing logistics time by up to 70%.",
  },
  {
    icon: Clock,
    title: "Reliable Operations",
    description: "Weather-adaptive scheduling and real-time tracking ensure predictable and dependable cargo services.",
  },
  {
    icon: Plane,
    title: "Scalable Network",
    description: "Expanding cargo mobility hub network enabling efficient aerial logistics across multiple cities.",
  },
];

const CargoLogistics = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionCargo} alt="Aerial cargo transport" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <ScrollReveal>
            <h1 className="font-heading text-[40px] md:text-[64px] font-semibold text-foreground tracking-futuristic mb-6">
              Cargo Logistics
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-body-lg text-titanium max-w-[640px] leading-[1.6]">
              AIRAVATH operates aerial cargo delivery services, moving packages and supplies efficiently across urban mobility hub networks.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={problemCargo} alt="Ground logistics congestion" className="w-full h-[400px] object-cover rounded-card" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Cargo?
              </h2>
              <p className="font-body text-[18px] text-titanium leading-[1.7] mb-6">
                Urban logistics is reaching its limits. Growing demand for rapid delivery is increasing congestion, making ground-based logistics slower and more expensive. AIRAVATH's aerial cargo service offers a faster, more efficient alternative.
              </p>
              <p className="font-body text-[18px] text-titanium leading-[1.7]">
                Our cargo-configured aircraft and mobility hub network enable businesses to move goods across cities in minutes, not hours — reducing delivery costs and improving customer satisfaction.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Operational Flow
            </h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              How AIRAVATH cargo logistics operates from request to delivery.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.15 * i}>
                <div className="bg-card border border-border rounded-card p-8 h-full">
                  <span className="font-heading text-[12px] tracking-[4px] text-primary/60 uppercase mb-4 block">Step {step.number}</span>
                  <h3 className="font-sub text-[20px] text-foreground font-medium mb-3">{step.title}</h3>
                  <p className="font-body text-[15px] text-titanium leading-[1.7]">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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

export default CargoLogistics;
