import ComparisonBlock from "@/components/ComparisonBlock";
import { Link } from "react-router-dom";
import { prepareBookmarkNavigation } from "@/lib/bookmarkNavigation";
import problemCargo from "@/assets/problem-cargo.jpg";
import solutionCargo from "@/assets/solution-cargo.jpg";

const CargoSection = () => (
  <div id="cargo-logistics" className="relative">
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
    <div className="flex justify-center -mt-8 md:-mt-16 mb-10 md:mb-16 px-4 relative z-10">
      <Link
        to="/cargo-logistics"
        state={{ returnTo: "/#cargo-logistics", returnScrollY: window.scrollY, restoreBookmark: true }}
        onClick={(e) => prepareBookmarkNavigation("/#cargo-logistics", e)}
        className="w-full max-w-[340px] font-sub text-[13px] text-primary border border-primary/30 rounded-lg px-6 py-3 text-center hover:bg-primary/10 transition-all duration-300"
      >
        Learn More About Cargo Logistics →
      </Link>
    </div>
  </div>
);

export default CargoSection;
