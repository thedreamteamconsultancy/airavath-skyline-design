import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Linkedin, Twitter, Youtube, ArrowUpRight, ChevronUp, Mail, Phone } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import airavathLogo from "@/assets/airavath-logo.png";

const navColumns = [
  {
    title: "Company",
    links: [
      { label: "About AIRAVATH", href: "#about" },
      { label: "Vision", href: "#vision" },
      { label: "Leadership Team", href: "#team" },
    ],
  },
  {
    title: "Operations",
    links: [
      { label: "Aircraft Operations", href: "#technology" },
      { label: "Mobility Hubs", href: "#vertiport" },
      { label: "How It Works", href: "#how-it-works" },
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
];

interface SiteSettings {
  logo_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  youtube_url?: string;
}

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [settings, setSettings] = useState<SiteSettings>({});

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
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-background">
      {/* Top separator */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: "60%" } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--primary) / 0.2)" }}
        />
      </div>

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
        <div className="absolute inset-0 grid-overlay opacity-[0.04]" />
      </div>

      {/* Floating aircraft lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 7, 14].map((delay) => (
          <motion.div
            key={delay}
            className="absolute w-[3px] h-[3px] rounded-full bg-primary"
            style={{
              top: `${20 + delay * 2}%`,
              boxShadow: "0 0 6px 2px hsl(var(--primary) / 0.4), -20px 0 15px hsl(var(--primary) / 0.1)",
            }}
            animate={{ x: ["-5vw", "105vw"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear", delay }}
          />
        ))}
      </div>

      <div className="relative z-10 container-airavath">
        <div className="pt-16 pb-10 md:pt-20 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand column */}
            <motion.div
              className="md:col-span-4 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img src={settings.logo_url || airavathLogo} alt="AIRAVATH" className="h-10 w-auto mb-5 self-start" />
              <p className="font-sub text-body-sm text-muted-foreground leading-relaxed max-w-[280px] mb-5">
                Operating the future of urban air mobility with electric aircraft services and intelligent mobility hub networks.
              </p>

              {/* Contact Info */}
              <div className="flex flex-col gap-2 mb-6">
                <a href="mailto:pradyaviation@gmail.com" className="flex items-center gap-2 font-body text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={14} className="text-primary" />
                  <span>pradyaviation@gmail.com</span>
                </a>
                <a href="tel:+13213899564" className="flex items-center gap-2 font-body text-body-sm text-muted-foreground hover:text-foreground transition-colors">
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
                    className="group relative w-10 h-10 rounded-lg border border-border bg-card/50 flex items-center justify-center
                               hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <s.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.2)" }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Nav columns */}
            {navColumns.map((col, ci) => (
              <motion.div
                key={col.title}
                className="md:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + ci * 0.1 }}
              >
                <h4 className="font-sub text-[13px] uppercase tracking-wide-futuristic text-primary mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className="group flex items-center gap-1 font-body text-body-sm text-muted-foreground
                                   hover:text-foreground transition-colors duration-300"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0
                                     transition-all duration-300 text-primary"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* CTA column */}
            <motion.div
              className="md:col-span-2 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h4 className="font-sub text-[13px] uppercase tracking-wide-futuristic text-primary mb-5">
                Stay Updated
              </h4>
              <p className="font-body text-body-sm text-muted-foreground mb-4">
                Get the latest on urban air mobility operations and launches.
              </p>
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="group inline-flex items-center gap-2 font-sub text-[13px] text-foreground
                           border border-border rounded-lg px-4 py-2.5 w-fit
                           hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <span>Get Connected</span>
                <ArrowUpRight size={14} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="font-body text-[12px] text-muted-foreground">
            © 2026 AIRAVATH. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-sub text-[12px] text-muted-foreground
                       hover:text-primary transition-colors duration-300"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center
                            group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
              <ChevronUp size={14} className="group-hover:text-primary transition-colors duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
