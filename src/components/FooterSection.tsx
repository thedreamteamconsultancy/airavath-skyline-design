import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Linkedin, Twitter, Youtube, ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { scrollToSection } from "@/components/SmoothScroll";
import { useIsMobile } from "@/hooks/use-mobile";
import airavathLogo from "@/assets/airavath-logo.png";

const navColumns = [
  {
    title: "Company",
    links: [
      { label: "About AIRAVATH", href: "#about" },
      { label: "Vision", href: "#vision" },
      { label: "Leadership Team", href: "#team" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Operations",
    links: [
      { label: "Aircraft Operations", href: "#technology" },
      { label: "Mobility Points", href: "#vertiport" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Cargo Logistics", href: "/cargo-logistics" },
      { label: "Emergency Mobility", href: "/medical-mobility" },
      { label: "Tourism Mobility", href: "/tourism-mobility" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Investor Relations", href: "#contact" },
      { label: "Partnerships", href: "#contact" },
      { label: "Media Inquiries", href: "#contact" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "SkyPort", href: "/skyport" },
      { label: "GroundPort", href: "/groundport" },
      { label: "Vertiport", href: "/vertiport" },
      { label: "Mobility Network", href: "/hub-network" },
    ],
  },
];

interface SiteSettings {
  logo_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  youtube_url?: string;
}

/* ── Mobile Accordion Item ── */
const AccordionSection = ({
  title,
  links,
  isOpen,
  onToggle,
  handleClick,
}: {
  title: string;
  links: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) => (
  <div className="border-b border-white/[0.06]">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-1"
    >
      <span className="font-sub text-[13px] uppercase tracking-[0.08em] text-primary">
        {title}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronDown size={16} className="text-primary/70" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-4 pl-1 space-y-3">
            {links.map((link) => (
              <li key={link.label} className="list-none">
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="group flex items-center gap-1 font-body text-[13px] text-[#BFC4C9] hover:text-foreground transition-colors duration-300"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary"
                  />
                </a>
              </li>
            ))}
          </div>
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
);

/* ── Main Footer ── */
const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [settings, setSettings] = useState<SiteSettings>({});
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "website_settings", "main"), (snap) => {
      if (snap.exists()) setSettings(snap.data() as SiteSettings);
    });
    return unsub;
  }, []);

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: settings.linkedin_url || "#" },
    { icon: Twitter, label: "X (Twitter)", href: settings.twitter_url || "#" },
    { icon: Youtube, label: "YouTube", href: settings.youtube_url || "#" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    }
    // Let normal links (/newsroom etc.) navigate naturally
  };

  const scrollToTop = () => scrollToSection("#home");

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, rgba(0,217,255,0.08) 40%, rgba(0,217,255,0.12) 70%, #000000 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center bottom, rgba(0,217,255,0.15), transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      {/* Top separator */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: "60%" } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--primary) / 0.2)" }}
        />
      </div>

      {/* Ambient particles – hidden on mobile for perf */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 8, 16].map((delay) => (
            <motion.div
              key={delay}
              className="absolute w-[2px] h-[2px] rounded-full bg-primary/40"
              style={{ top: `${15 + delay * 3}%` }}
              animate={{ x: ["-5vw", "105vw"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear", delay }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container-airavath">
        {/* ═══════ MOBILE FOOTER ═══════ */}
        {isMobile ? (
          <div className="pt-10 pb-6">
            {/* Brand / Contact / Socials – always visible */}
            <div className="flex flex-col items-start mb-6">
              <img src={settings.logo_url || airavathLogo} alt="AIRAVATH" className="h-8 w-auto mb-3" />
              <p className="font-sub text-[12px] text-[#BFC4C9] leading-relaxed mb-4">
                Operating the future of urban air mobility.
              </p>
              <div className="flex flex-col gap-1.5 mb-4">
                <a href="mailto:pradyaviation@gmail.com" className="flex items-center gap-2 font-body text-[12px] text-[#BFC4C9]">
                  <Mail size={13} className="text-primary" />
                  pradyaviation@gmail.com
                </a>
                <a href="mailto:airavath@gmail.com" className="flex items-center gap-2 font-body text-[12px] text-[#BFC4C9]">
                  <Mail size={13} className="text-primary" />
                  airavath@gmail.com
                </a>
                <a href="tel:+13213899564" className="flex items-center gap-2 font-body text-[12px] text-[#BFC4C9]">
                  <Phone size={13} className="text-primary" />
                  +1 (321) 389-9564
                </a>
              </div>
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <s.icon size={15} className="text-[#BFC4C9]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Glowing divider */}
            <div className="h-px w-full mb-2" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />

            {/* Accordion nav */}
            {navColumns.map((col) => (
              <AccordionSection
                key={col.title}
                title={col.title}
                links={col.links}
                isOpen={openSection === col.title}
                onToggle={() => setOpenSection(openSection === col.title ? null : col.title)}
                handleClick={handleClick}
              />
            ))}

            {/* Bottom bar */}
            <div className="mt-6 flex items-center justify-between">
              <p className="font-body text-[11px] text-[#BFC4C9]/50">
                © 2026 AIRAVATH
              </p>
              <button onClick={scrollToTop} className="font-sub text-[11px] text-[#BFC4C9]/60 hover:text-primary transition-colors">
                Back to top ↑
              </button>
            </div>
          </div>
        ) : (
          /* ═══════ DESKTOP FOOTER (unchanged) ═══════ */
          <div className="pt-[80px] pb-[60px]">
            <div className="grid grid-cols-12 gap-[48px]">
              {/* Brand column */}
              <motion.div
                className="col-span-4 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <img src={settings.logo_url || airavathLogo} alt="AIRAVATH" className="h-10 w-auto mb-5 self-start" />
                <p className="font-sub text-body-sm text-[#BFC4C9] leading-relaxed max-w-[280px] mb-5">
                  Operating the future of urban air mobility with electric aircraft services and intelligent mobility networks.
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <a href="mailto:pradyaviation@gmail.com" className="flex items-center gap-2 font-body text-body-sm text-[#BFC4C9] hover:text-foreground transition-colors duration-300">
                    <Mail size={14} className="text-primary" />
                    <span>pradyaviation@gmail.com</span>
                  </a>
                  <a href="mailto:airavath@gmail.com" className="flex items-center gap-2 font-body text-body-sm text-[#BFC4C9] hover:text-foreground transition-colors duration-300">
                    <Mail size={14} className="text-primary" />
                    <span>airavath@gmail.com</span>
                  </a>
                  <a href="tel:+13213899564" className="flex items-center gap-2 font-body text-body-sm text-[#BFC4C9] hover:text-foreground transition-colors duration-300">
                    <Phone size={14} className="text-primary" />
                    <span>+1 (321) 389-9564</span>
                  </a>
                </div>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={s.label}
                      className="group relative w-10 h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <s.icon size={16} className="text-[#BFC4C9] group-hover:text-primary transition-colors duration-300" />
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.25)" }} />
                    </motion.a>
                  ))}
                </div>
                <p className="font-body text-body-sm text-[#BFC4C9] mt-5 leading-relaxed">
                  <span className="text-primary font-medium">Social Media Management :</span><br />
                  Instagram , linkedin , youtube & X
                </p>
              </motion.div>

              {/* Nav columns */}
              {navColumns.map((col, ci) => (
                <motion.div
                  key={col.title}
                  className="col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + ci * 0.1 }}
                >
                  <h4 className="font-sub text-[13px] uppercase tracking-[0.08em] text-primary mb-5">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => handleClick(e, link.href)}
                          className="group flex items-center gap-1 font-body text-body-sm text-[#BFC4C9] hover:text-foreground transition-colors duration-300"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight
                            size={12}
                            className="opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop bottom bar */}
        {!isMobile && (
          <motion.div
            className="border-t border-white/[0.08] py-6 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p className="font-body text-[12px] text-[#BFC4C9]/60">© 2026 AIRAVATH. All rights reserved.</p>
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-sub text-[12px] text-[#BFC4C9] hover:text-primary transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <span>Back to top</span>
              <div className="w-7 h-7 rounded-md border border-white/[0.08] flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                <svg viewBox="0 0 64 64" fill="none" className="w-4 h-4 text-foreground/60 group-hover:text-primary transition-colors duration-300">
                  <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M32 8 C30.5 8, 29 12, 29 18 L29 44 C29 50, 30 54, 32 56 C34 54, 35 50, 35 44 L35 18 C35 12, 33.5 8, 32 8Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M29 24 L12 30 C10 30.8, 10 32, 12 32.5 L29 34" fill="currentColor" fillOpacity="0.08" />
                    <path d="M35 24 L52 30 C54 30.8, 54 32, 52 32.5 L35 34" fill="currentColor" fillOpacity="0.08" />
                  </g>
                </svg>
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </footer>
  );
};

export default FooterSection;
