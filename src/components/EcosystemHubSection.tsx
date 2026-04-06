import { Building2, Plane, Landmark, Network, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import cardGroundport from "@/assets/card-groundport.jpg";
import cardVertiport from "@/assets/card-vertiport.jpg";
import cardSkyport from "@/assets/card-skyport.jpg";
import cardHubnetwork from "@/assets/card-hubnetwork.jpg";

const hubs = [
  {
    icon: Building2,
    title: "Ground Port",
    link: "/ground-port",
    image: cardGroundport,
    description:
      "Ground-level mobility hubs used for passenger access and service operations. These hubs serve as the primary entry point for urban air mobility.",
  },
  {
    icon: Plane,
    title: "Vertiport",
    link: "/vertiport",
    image: cardVertiport,
    description:
      "Landing and takeoff areas located on elevated building platforms — typically on first floor or mid-building levels for rapid turnaround operations.",
  },
  {
    icon: Landmark,
    title: "Sky Port",
    link: "/sky-port",
    image: cardSkyport,
    description:
      "Landing infrastructure located on top of skyscrapers and high-rise buildings. Premium access to aerial mobility from the city's highest points.",
  },
  {
    icon: Network,
    title: "Hub Network",
    link: "/hub-network",
    image: cardHubnetwork,
    description:
      "Multiple hubs connected to form a city-wide mobility network, enabling seamless aerial transportation across entire metropolitan areas.",
  },
];

const EcosystemHubSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "160px",
        paddingBottom: "160px",
        background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 1.5%) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic max-w-[820px]">
            Urban Air Mobility Hub Infrastructure
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-[100px]">
          <p className="font-body text-body-lg text-titanium text-center max-w-[720px] leading-[1.6]">
            AIRAVATH operates a multi-tier hub infrastructure that forms the backbone of the
            urban air mobility network. Each hub type serves a specific role in the ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {hubs.map((hub, i) => (
            <ScrollReveal key={hub.title} delay={0.15 * i}>
              <motion.div
                className="group bg-card border border-border rounded-[12px] overflow-hidden h-full hover:border-primary/30 hover:shadow-[0_0_30px_hsl(189_100%_50%/0.1)] transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Card Image */}
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={hub.image}
                    alt={hub.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <hub.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <h3 className="font-sub text-[24px] font-medium text-foreground mb-3">
                    {hub.title}
                  </h3>
                  <p className="font-body text-[15px] text-titanium leading-[1.7] mb-6">
                    {hub.description}
                  </p>
                  <Link
                    to={hub.link}
                    className="inline-flex items-center gap-2 font-body text-[14px] text-primary hover:text-foreground transition-colors group/link"
                  >
                    Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemHubSection;
