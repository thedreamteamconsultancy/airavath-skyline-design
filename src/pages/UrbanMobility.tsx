import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Users, TrendingUp, ArrowLeft } from "lucide-react";
import problemTraffic from "@/assets/problem-traffic.jpg";
import problemSky from "@/assets/problem-sky.jpg";

const steps = [
  {
    number: "01",
    title: "Smart Route Planning",
    description: "AI-powered route optimization identifies the fastest aerial corridors, bypassing congested ground routes entirely.",
  },
  {
    number: "02",
    title: "Point-to-Point Transit",
    description: "Passengers travel between strategically placed urban mobility points, reducing commute times dramatically.",
  },
  {
    number: "03",
    title: "Seamless Multi-modal",
    description: "Integrated ground transport connects passengers from mobility points to their final destinations within minutes.",
  },
  {
    number: "04",
    title: "Scalable Network",
    description: "As demand grows, new points and routes are added to the network, creating an ever-expanding aerial transit system.",
  },
];

const features = [
  {
    icon: Clock,
    title: "80% Time Savings",
    description: "Reduce urban commute times by up to 80% compared to traditional ground transportation in congested cities.",
  },
  {
    icon: Users,
    title: "Mass Urban Transit",
    description: "Scalable aerial transit designed to serve millions of daily urban commuters across major metropolitan areas.",
  },
  {
    icon: TrendingUp,
    title: "Future-Ready Infrastructure",
    description: "Building the mobility infrastructure of tomorrow with sustainable, electric-powered aerial transit networks.",
  },
];

const UrbanMobility = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={problemSky} alt="Urban aerial mobility solution" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <ScrollReveal>
            <h1 className="font-heading text-[40px] md:text-[64px] font-semibold text-foreground tracking-futuristic mb-6">
              Urban Mobility
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body text-body-lg text-titanium max-w-[640px] leading-[1.6]">
              AIRAVATH is redefining urban transportation by building aerial mobility networks that bypass congestion, connecting cities faster and more efficiently than ever before.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={problemTraffic} alt="Traffic congestion in cities" className="w-full h-[400px] object-cover rounded-card" />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Urban Aerial Mobility?
              </h2>
              <p className="font-body text-[18px] text-titanium leading-[1.7] mb-6">
                Cities worldwide lose over 120 hours per person annually to traffic congestion. With 4.2 billion urban commuters expected by 2030 and 70% of the global population projected to live in cities by 2050, current road-based systems are reaching their limits.
              </p>
              <p className="font-body text-[18px] text-titanium leading-[1.7]">
                AIRAVATH's urban aerial mobility network provides a scalable, sustainable solution — connecting mobility points across cities with electric-powered aircraft that fly above congestion, transforming how people move through urban landscapes.
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
              How It Works
            </h2>
            <p className="font-body text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              AIRAVATH's urban mobility system from route planning to destination.
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

export default UrbanMobility;
