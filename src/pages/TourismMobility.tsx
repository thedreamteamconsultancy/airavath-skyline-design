import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Camera, MapPin, Plane, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import solutionTourism from "@/assets/solution-tourism.jpg";
import problemTourism from "@/assets/problem-tourism.jpg";

const steps = [
  {
    number: "01",
    title: "Book Your Tour",
    description: "Select your preferred aerial city tour route and time through the AIRAVATH platform.",
  },
  {
    number: "02",
    title: "Arrive at Hub",
    description: "Visit the nearest AIRAVATH mobility hub and enjoy the premium passenger lounge before departure.",
  },
  {
    number: "03",
    title: "Aerial Tour",
    description: "Experience breathtaking aerial views of city landmarks, coastlines, and skylines from a luxury aircraft.",
  },
  {
    number: "04",
    title: "Return",
    description: "Land back at your departure hub or choose a different drop-off location within the city network.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Scenic Routes",
    description: "Curated aerial tour routes showcasing the most iconic landmarks and views across the city.",
  },
  {
    icon: MapPin,
    title: "Multiple Hubs",
    description: "Flexible departure and arrival points across the city's mobility hub network.",
  },
  {
    icon: Plane,
    title: "Premium Experience",
    description: "Luxury aircraft with panoramic windows, in-flight commentary, and premium hospitality.",
  },
];

const TourismMobility = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionTourism} alt="Aerial tourism" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <ScrollReveal>
            <h1 className="font-heading text-[40px] md:text-[64px] font-semibold text-foreground tracking-futuristic mb-6">
              Tourism Mobility
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-body-lg text-titanium max-w-[640px] leading-[1.6]">
              AIRAVATH operates premium aerial city tour services, offering breathtaking views and a new perspective on urban exploration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={problemTourism} alt="Crowded tourism" className="w-full h-[400px] object-cover rounded-card" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Tourism?
              </h2>
              <p className="font-body text-[18px] text-titanium leading-[1.7] mb-6">
                Exploring cities often involves long travel times through crowded streets and limited perspectives. AIRAVATH's aerial tourism service offers a completely new way to experience cities — from above.
              </p>
              <p className="font-body text-[18px] text-titanium leading-[1.7]">
                Our luxury aircraft and curated routes provide passengers with panoramic city views, scenic coastal flights, and landmark tours — all operated through our mobility hub network.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 2%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-[80px]">
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Tour Experience
            </h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              How AIRAVATH tourism mobility works from booking to landing.
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

export default TourismMobility;
