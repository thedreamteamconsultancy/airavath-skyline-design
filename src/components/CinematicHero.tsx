import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { readFooterReturnState } from "@/lib/footerNavigation";

interface CinematicHeroProps {
  tagline: string;
  title: string;
  description: string;
  images: [string, string, string]; // [background, secondary, tertiary]
  backLink?: string;
  backLabel?: string;
}

const CinematicHero = ({
  tagline,
  title,
  description,
  images,
  backLink = "/#ecosystem",
  backLabel = "Back to Hub Infrastructure",
}: CinematicHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handleBack = () => {
    const footerReturn = location.state?.footerReturn || readFooterReturnState();

    if (location.state?.fromFooter || footerReturn?.source === "footer") {
      navigate(footerReturn?.returnPath || "/#footer", {
        state: {
          restoreFooter: true,
          footerReturn,
          returnScrollY: footerReturn?.scrollY,
        },
        replace: true,
      });
    } else {
      navigate(backLink);
    }
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden"
    >
      {/* Background slideshow layer with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Primary background image with crossfade */}
        <motion.img
          src={images[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
      </motion.div>

      {/* Floating secondary images */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Secondary image - right side, floating */}
        <motion.div
          className="absolute right-[5%] top-[15%] w-[35%] max-w-[480px] hidden lg:block"
          style={{ y: floatY1 }}
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={images[1]}
              alt=""
              className="w-full h-auto aspect-[16/10] object-cover"
            />
            <div className="absolute inset-0 border border-primary/10 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Tertiary image - right bottom, smaller floating */}
        <motion.div
          className="absolute right-[15%] bottom-[18%] w-[22%] max-w-[320px] hidden lg:block"
          style={{ y: floatY2 }}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <img
              src={images[2]}
              alt=""
              className="w-full h-auto aspect-[16/10] object-cover"
            />
            <div className="absolute inset-0 border border-primary/10 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Mobile: single secondary image */}
        <motion.div
          className="absolute right-4 bottom-[20%] w-[45%] lg:hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            <img
              src={images[1]}
              alt=""
              className="w-full h-auto aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Subtle scan line effect */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.1) 2px, hsl(var(--primary) / 0.1) 4px)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 container-airavath pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 font-body text-body-sm text-primary mb-8 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        </motion.div>

        <ScrollReveal>
          <span className="font-heading text-[12px] tracking-[6px] text-primary uppercase mb-4 block">
            {tagline}
          </span>
          <h1 className="font-heading text-[42px] md:text-[56px] lg:text-[72px] font-bold text-foreground tracking-futuristic mb-6 leading-[1.1]">
            {title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="font-body text-[18px] md:text-[20px] text-titanium max-w-[560px] leading-[1.7]">
            {description}
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[6]" />
    </section>
  );
};

export default CinematicHero;
