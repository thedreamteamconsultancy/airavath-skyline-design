import ComparisonBlock from "@/components/ComparisonBlock";
import { Link } from "react-router-dom";
import problemAmbulance from "@/assets/problem-ambulance.jpg";
import solutionMedical from "@/assets/solution-medical.jpg";

const EmergencySection = () => (
  <div className="relative">
    <ComparisonBlock
      heading="Emergency Response Delays Cost Lives"
      description="In critical medical emergencies, every minute matters. Traffic congestion and long ground travel times often delay access to hospitals and emergency care."
      problemImage={problemAmbulance}
      problemAlt="Ambulance stuck in heavy city traffic with flashing emergency lights"
      problemCaption="Minutes Lost in Traffic"
      solutionImage={solutionMedical}
      solutionAlt="eVTOL air ambulance landing on hospital rooftop"
      solutionCaption="Rapid Aerial Medical Transport"
    />
    <div className="flex justify-center -mt-16 mb-16 relative z-10">
      <Link
        to="/medical-mobility"
        className="font-sub text-[13px] text-primary border border-primary/30 rounded-lg px-6 py-3 hover:bg-primary/10 transition-all duration-300"
      >
        Learn More About Medical Mobility →
      </Link>
    </div>
  </div>
);

export default EmergencySection;
