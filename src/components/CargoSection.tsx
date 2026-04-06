import ComparisonBlock from "@/components/ComparisonBlock";
import { Link } from "react-router-dom";
import problemCargo from "@/assets/problem-cargo.jpg";
import solutionCargo from "@/assets/solution-cargo.jpg";

const CargoSection = () => (
  <div className="relative">
    <ComparisonBlock
      heading="Urban Logistics Is Slowing Down Cities"
      description="Growing demand for rapid delivery is increasing congestion across cities, making traditional ground logistics slower and less efficient."
      problemImage={problemCargo}
      problemAlt="Delivery trucks stuck in city congestion with packages"
      problemCaption="Delays in Ground Logistics"
      solutionImage={solutionCargo}
      solutionAlt="Cargo eVTOL aircraft transporting packages across city skyline"
      solutionCaption="Fast Aerial Cargo Delivery"
    />
    <div className="flex justify-center -mt-16 mb-16 relative z-10">
      <Link
        to="/cargo-logistics"
        className="font-sub text-[13px] text-primary border border-primary/30 rounded-lg px-6 py-3 hover:bg-primary/10 transition-all duration-300"
      >
        Learn More About Cargo Logistics →
      </Link>
    </div>
  </div>
);

export default CargoSection;
