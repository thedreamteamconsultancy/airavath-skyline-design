import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Camera, MapPin, Plane, ArrowLeft, Eye, Star, Mountain, Compass } from "lucide-react";
import solutionTourism from "@/assets/solution-tourism.jpg";
import problemTourism from "@/assets/problem-tourism.jpg";
import visionSkyline from "@/assets/vision-skyline.jpg";
import heroSkyline from "@/assets/hero-skyline.jpg";

const stats = [
  { value: "360°", label: "Panoramic City Views" },
  { value: "15+", label: "Curated Aerial Routes" },
  { value: "30min", label: "Average Tour Duration" },
  { value: "100%", label: "Electric & Silent" },
];

const steps = [
  { number: "01", title: "Book Your Tour", description: "Select your preferred aerial city tour route and time through the AIRAVATH platform.", icon: "📱" },
  { number: "02", title: "Arrive at Point", description: "Visit the nearest AIRAVATH mobility point and enjoy the premium passenger lounge before departure.", icon: "🏛️" },
  { number: "03", title: "Aerial Tour", description: "Experience breathtaking aerial views of city landmarks, coastlines, religious temples, and skylines from an aircraft.", icon: "🛫" },
  { number: "04", title: "Return", description: "Land back at your departure point or choose a different drop-off location within the city network.", icon: "📍" },
];

const experiences = [
  { icon: Camera, title: "Scenic Routes", description: "Curated aerial tour routes showcasing the most iconic landmarks, religious temples, and views across the city." },
  { icon: MapPin, title: "Multiple Points", description: "Flexible departure and arrival points across the city's mobility network." },
  { icon: Plane, title: "Premium Experience", description: "Aircraft with panoramic windows, in-flight commentary, and premium hospitality." },
  { icon: Eye, title: "Landmark Tours", description: "Fly over historical monuments, religious temples, modern architecture, and cultural heritage sites." },
  { icon: Star, title: "Sunset & Night Flights", description: "Special golden hour and night flights offering stunning illuminated cityscapes from above." },
  { icon: Mountain, title: "Coastal & Nature Routes", description: "Explore coastlines, mountain ranges, and natural reserves from a unique aerial perspective." },
];

const tourRoutes = [
  { name: "Heritage Circuit", description: "Fly over ancient religious temples, historical forts, and heritage monuments", duration: "25 min" },
  { name: "Skyline Explorer", description: "Experience the modern city skyline, business districts, and iconic towers", duration: "30 min" },
  { name: "Coastal Panorama", description: "Soar along coastlines, beaches, and waterfront developments", duration: "35 min" },
  { name: "Full City Tour", description: "Complete aerial tour covering all major landmarks, religious temples, and city highlights", duration: "45 min" },
];

const TourismMobility = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={solutionTourism} alt="Aerial tourism" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container-airavath pt-32 pb-16">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-heading text-[12px] tracking-[6px] text-primary/70 uppercase mb-4 block">Tourism Mobility</span>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[72px] font-bold text-foreground tracking-futuristic mb-6 leading-[1.05]">
              Cities From<br />A New Perspective
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-[16px] md:text-[20px] text-titanium max-w-[640px] leading-[1.7]"
          >
            AIRAVATH operates premium aerial city tour services, offering breathtaking views of religious temples, landmarks, and a new perspective on urban exploration.
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
                <img src={problemTourism} alt="Crowded tourism" className="w-full h-[300px] md:h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-lg font-sub text-[12px] uppercase tracking-wider">The Problem</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-6">
                Why Aerial Tourism?
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7] mb-6">
                Exploring cities often involves long travel times through crowded streets and limited perspectives. AIRAVATH's aerial tourism service offers a completely new way to experience cities — from above.
              </p>
              <p className="font-body text-[16px] md:text-[18px] text-titanium leading-[1.7]">
                Our aircraft and curated routes provide passengers with panoramic city views, scenic coastal flights, religious temples, and landmark tours — all operated through our mobility network.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tour Routes */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 0%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Aerial Tour Routes
            </h2>
            <p className="font-body text-[16px] md:text-body-lg text-titanium max-w-[640px] mx-auto leading-[1.6]">
              Choose from curated aerial experiences showcasing the best of your city.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tourRoutes.map((route, i) => (
              <ScrollReveal key={route.name} delay={0.1 * i}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(189_100%_50%/0.15)] transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Compass className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-sub text-[16px] md:text-[18px] text-foreground font-medium">{route.name}</h3>
                      <span className="font-heading text-[12px] text-primary bg-primary/10 px-2 py-1 rounded-md">{route.duration}</span>
                    </div>
                    <p className="font-body text-[13px] md:text-[15px] text-titanium leading-[1.6]">{route.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic mb-4">
              Tour Experience
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

      {/* Experiences */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 3%) 100%)" }}>
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              Tourism Experiences
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={0.1 * i}>
                <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.15)] hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <exp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sub text-[16px] md:text-feature text-foreground mb-3">{exp.title}</h3>
                  <p className="font-body text-[13px] md:text-base text-titanium leading-[1.6]">{exp.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="section-padding">
        <div className="container-airavath">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
              See the World From Above
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[400px]">
                <img src={visionSkyline} alt="Panoramic city view" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4"><span className="font-sub text-[13px] text-foreground">Skyline Panorama</span></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[400px]">
                <img src={heroSkyline} alt="City at sunset" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute bottom-4 left-4"><span className="font-sub text-[13px] text-foreground">Golden Hour</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default TourismMobility;
