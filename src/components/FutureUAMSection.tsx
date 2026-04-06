import { TrendingUp, Cpu, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import Mobile3DCardStack from "@/components/Mobile3DCardStack";
import { useIsMobile } from "@/hooks/use-mobile";
import cardAirTaxi from "@/assets/card-air-taxi.jpg";
import cardUam from "@/assets/card-uam.jpg";
import cardNextgen from "@/assets/card-nextgen.jpg";

const aircraftCards = [
  {
    title: "Medical Mobility",
    description:
      "Rapid aerial medical transport services connecting hospitals, emergency sites, and healthcare facilities across cities.",
    image: cardAirTaxi,
    link: "/medical-mobility",
  },
  {
    title: "Urban Air Mobility",
    description:
      "On-demand passenger mobility services operating across city hubs, reducing travel time from hours to minutes.",
    image: cardUam,
    link: "/cargo-logistics",
  },
  {
    title: "Cargo Logistics",
    description:
      "Aerial cargo delivery operations moving packages and supplies efficiently across urban networks.",
    image: cardNextgen,
    link: "/cargo-logistics",
  },
];

const validationBlocks = [
  {
    icon: TrendingUp,
    title: "Rapid Industry Growth",
    text: "Investment in urban air mobility is accelerating as cities search for faster mobility solutions.",
  },
  {
    icon: Cpu,
    title: "Operational Technology",
    text: "Breakthroughs in fleet management, navigation, and booking platforms are enabling scalable aerial mobility operations.",
  },
  {
    icon: Building2,
    title: "Hub Infrastructure Development",
    text: "Cities are beginning to develop vertiports and mobility hubs to support aerial transportation networks.",
  },
];

const MobileServiceCard = ({ card }: { card: typeof aircraftCards[0] }) => (
  <Link to={card.link} className="block h-full">
    <div className="h-full flex flex-col">
      <div className="relative h-[180px] overflow-hidden">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-sub text-[18px] font-medium text-foreground mb-2">
          {card.title}
        </h3>
        <p className="font-body text-[13px] text-titanium leading-[1.6]">
          {card.description}
        </p>
      </div>
    </div>
  </Link>
);

const FutureUAMSection = () => {
  const isMobile = useIsMobile();

  const mobileCards = aircraftCards.map((card) => ({
    content: <MobileServiceCard card={card} />,
  }));

  return (
    <section
      className="relative overflow-hidden atmosphere-blue"
      style={{
        paddingTop: isMobile ? "56px" : "80px",
        paddingBottom: isMobile ? "56px" : "80px",
        background: "linear-gradient(180deg, hsl(var(--surface-1)) 0%, hsl(var(--surface-0)) 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.08]" />
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q400,80 800,250 T1600,150" stroke="url(#routeGrad2)" strokeWidth="0.8" fill="none" />
            <path d="M0,400 Q300,250 700,380 T1400,280" stroke="url(#routeGrad2)" strokeWidth="0.5" fill="none" />
          </svg>
        )}
        {Array.from({ length: isMobile ? 5 : 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/15 animate-float"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-[26px] md:text-section text-foreground tracking-futuristic max-w-[720px]">
            Urban Air Mobility Network
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-8 md:mb-12x">
          <p className="font-body text-[14px] md:text-body-lg text-titanium text-center max-w-[700px] leading-[1.6]">
            AIRAVATH operates aerial mobility services across cities using electric vertical take-off
            and landing aircraft. Our network connects mobility hubs to deliver fast, safe, and
            sustainable transportation above city traffic.
          </p>
        </ScrollReveal>

        {/* Service Cards */}
        {isMobile ? (
          <ScrollReveal>
            <Mobile3DCardStack cards={mobileCards} className="mb-8" />
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12x">
            {aircraftCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={0.15 * i} direction="up">
                <Link to={card.link} className="block h-full">
                  <div className="group bg-card border border-border rounded-card overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(189_100%_50%/0.18)] hover:border-primary/30 transition-all duration-300 ease-out h-full">
                    <div className="relative h-[200px] overflow-hidden">
                      <ParallaxImage src={card.image} alt={card.title} intensity={15} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                    <div className="p-4x">
                      <h3 className="font-sub text-feature text-foreground mb-2x">
                        {card.title}
                      </h3>
                      <p className="font-body text-base text-titanium leading-[1.6]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Industry Validation Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6x" style={{ marginTop: isMobile ? "48px" : "96px" }}>
          {validationBlocks.map((block, i) => (
            <ScrollReveal key={block.title} delay={0.15 * i}>
              <div className="flex gap-3 md:gap-3x">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <block.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-sub text-[15px] md:text-feature text-foreground mb-1">
                    {block.title}
                  </h4>
                  <p className="font-body text-[13px] md:text-base text-titanium leading-[1.6]">
                    {block.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureUAMSection;
