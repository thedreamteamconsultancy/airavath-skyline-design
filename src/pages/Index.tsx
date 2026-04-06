import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProblemSection from "@/components/ProblemSection";
import EmergencySection from "@/components/EmergencySection";
import CargoSection from "@/components/CargoSection";
import TourismSection from "@/components/TourismSection";
import FutureUAMSection from "@/components/FutureUAMSection";
import SolutionSection from "@/components/SolutionSection";
import EcosystemHubSection from "@/components/EcosystemHubSection";
import AircraftTechSection from "@/components/AircraftTechSection";
import VertiportSection from "@/components/VertiportSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MarketOpportunitySection from "@/components/MarketOpportunitySection";
import FeaturesSection from "@/components/FeaturesSection";
import VisionSection from "@/components/VisionSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const location = useLocation();
  const [showTeam, setShowTeam] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "website_settings", "main"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setShowTeam(data.show_team_section !== false);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <EmergencySection />
      <CargoSection />
      <TourismSection />
      <FutureUAMSection />
      <SolutionSection />
      <EcosystemHubSection />
      <AircraftTechSection />
      <VertiportSection />
      <HowItWorksSection />
      <MarketOpportunitySection />
      <FeaturesSection />
      <VisionSection />
      {showTeam && <TeamSection />}
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
