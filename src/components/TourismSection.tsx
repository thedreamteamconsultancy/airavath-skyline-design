import ComparisonBlock from "@/components/ComparisonBlock";
import { Link } from "react-router-dom";
import problemTourism from "@/assets/problem-tourism.jpg";
import solutionTourism from "@/assets/solution-tourism.jpg";

const TourismSection = () => (
  <div className="relative">
    <ComparisonBlock
      heading="Cities Deserve A Better Travel Experience"
      description="Exploring cities often involves long travel times through crowded streets. Premium aerial mobility opens a new perspective of urban travel."
      problemImage={problemTourism}
      problemAlt="Tourists stuck in crowded traffic bus"
      problemCaption="Hours Lost on the Road"
      solutionImage={solutionTourism}
      solutionAlt="Luxury eVTOL aircraft flying above scenic city landmarks with passengers"
      solutionCaption="Luxury Aerial City Tours"
    />
    <div className="flex justify-center -mt-8 md:-mt-16 mb-10 md:mb-16 px-4 relative z-10">
      <Link
        to="/tourism-mobility"
        className="w-full max-w-[340px] font-sub text-[13px] text-primary border border-primary/30 rounded-lg px-6 py-3 text-center hover:bg-primary/10 transition-all duration-300"
      >
        Learn More About Tourism Mobility →
      </Link>
    </div>
  </div>
);

export default TourismSection;
