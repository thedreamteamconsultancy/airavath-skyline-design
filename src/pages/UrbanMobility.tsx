import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Users, TrendingUp, ArrowLeft, MapPin, Zap, Shield, BarChart3 } from "lucide-react";
import { navigateToReturnTarget } from "@/lib/bookmarkNavigation";
import problemTraffic from "@/assets/problem-traffic.jpg";
import problemSky from "@/assets/problem-sky.jpg";
import solutionNetwork from "@/assets/solution-network.jpg";
import solutionPlatform from "@/assets/solution-platform.jpg";
import heroSkyline from "@/assets/hero-skyline.jpg";

const stats = [
  { value: "120+", label: "Hours Lost Annually Per Commuter" },
  { value: "80%", label: "Time Savings vs Ground Transit" },
  { value: "4.2B", label: "Urban Commuters by 2030" },
  { value: "70%", label: "Urban Population by 2050" },
];

const steps = [
  { number: "01", title: "Smart Route Planning", description: "AI-powered route optimization identifies the fastest aerial corridors, bypassing congested ground routes entirely." },
  { number: "02", title: "Point-to-Point Transit", description: "Passengers travel between strategically placed urban mobility points, reducing commute times dramatically." },
  { number: "03", title: "Seamless Multi-modal", description: "Integrated ground transport connects passengers from mobility points to their final destinations within minutes." },
  { number: "04", title: "Scalable Network", description: "As demand grows, new points and routes are added to the network, creating an ever-expanding aerial transit system." },
];

const features = [
  { icon: Clock, title: "80% Time Savings", description: "Reduce urban commute times by up to 80% compared to traditional ground transportation in congested cities." },
  { icon: Users, title: "Mass Urban Transit", description: "Scalable aerial transit designed to serve millions of daily urban commuters across major metropolitan areas." },
  { icon: TrendingUp, title: "Future-Ready Infrastructure", description: "Building the mobility infrastructure of tomorrow with sustainable, electric-powered aerial transit networks." },
];

const advantages = [
  { icon: MapPin, title: "Strategic Mobility Points", description: "Carefully selected locations across cities ensure maximum coverage and minimum last-mile distance for passengers." },
  { icon: Zap, title: "Electric-Powered Fleet", description: "Zero-emission electric aircraft reduce environmental impact while delivering whisper-quiet operations over urban areas." },
  { icon: Shield, title: "AI-Powered Safety", description: "Advanced AI systems monitor every flight in real-time, ensuring the highest safety standards across all operations." },
  { icon: BarChart3, title: "Data-Driven Operations", description: "Machine learning optimizes routes, predicts demand, and manages fleet allocation for peak operational efficiency." },
];

const UrbanMobility = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => navigateToReturnTarget(navigate, location.state, "/#urban-mobility");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={problemSky} alt="Urban aerial mobility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32 pb-16">
          <button onClick={handleBack} className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-heading text-[12px] tracking-[6px] text-primary/70 uppercase mb-4 block">Urban Mobility</span>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[72px] font-bold text-foreground tracking-futuristic mb-6 leading-[1.05]">
              Redefining Urban<br />Transportation
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-[16px] md:text-[20px] text-titanium max-w-[640px] leading-[1.7]"
          >
            AIRAVATH is building aerial mobility networks that bypass congestion, connecting cities faster and more efficiently than ever before.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
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

      {/* Problem / Solution */}
      <section className="section-padding">
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={problemTraffic} alt="Traffic congestion" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Problem</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Urban Aerial Mobility?
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                Cities worldwide lose over 120 hours per person annually to traffic congestion. With 4.2 billion urban commuters expected by 2030 and 70% of the global population projected to live in cities by 2050, current road-based systems are reaching their limits.
              </p>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7]">
                AIRAVATH's urban aerial mobility network provides a scalable, sustainable solution — connecting mobility points across cities with electric-powered aircraft that fly above congestion, transforming how people move through urban landscapes.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solution Image */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                The AIRAVATH Solution
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                Our aerial mobility network creates a layer of transportation above the city, connecting strategically placed mobility points with electric aircraft. Passengers book instantly, arrive at nearby points, and fly directly to their destination.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {advantages.slice(0, 2).map((adv) => (
                  <div key={adv.title} className="bg-card border border-border rounded-xl p-4">
                    <adv.icon className="w-5 h-5 text-primary mb-2" />
                    <h4 className="font-sub text-[14px] text-foreground mb-1">{adv.title}</h4>
                    <p className="font-body text-[11px] text-titanium leading-[1.5]">{adv.description}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={solutionNetwork} alt="AIRAVATH mobility network" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Solution</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              How It Works
            </h2>
            <p className="font-body text-[16px] md:text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              AIRAVATH's urban mobility system from route planning to destination.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.12 * i}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(189_100%_50%/0.15)] transition-all duration-300">
                  <span className="font-heading text-[11px] tracking-[4px] text-primary/60 uppercase mb-3 block">Step {step.number}</span>
                  <h3 className="font-sub text-[18px] md:text-[20px] text-foreground font-medium mb-3">{step.title}</h3>
                  <p className="font-body text-[14px] md:text-[15px] text-titanium leading-[1.7]">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 3%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Operational Advantages
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <ScrollReveal key={adv.title} delay={0.1 * i}>
                <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 h-full text-center hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <adv.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-[16px] md:text-feature text-foreground mb-3">{adv.title}</h3>
                  <p className="font-body text-[13px] md:text-base text-titanium leading-[1.6]">{adv.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Key Capabilities
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={0.15 * i}>
                <div className="group bg-card border border-border rounded-2xl p-8 h-full text-center hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] hover:border-primary/30 transition-all duration-300">
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

      {/* Visual Gallery */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              The Urban Mobility Vision
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[350px]">
                <img src={solutionPlatform} alt="Digital mobility platform" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-sub text-[13px] text-foreground">Digital Platform</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[350px]">
                <img src={heroSkyline} alt="Future city skyline" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-sub text-[13px] text-foreground">Connected Cities</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default UrbanMobility;
