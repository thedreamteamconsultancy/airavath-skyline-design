import { useRef, useState, useEffect, useCallback } from "react";
import { TrendingUp, Handshake, Mic, ChevronDown, ArrowUpRight, Check, User, Mail, MessageSquare } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  type: z.enum(["investor", "partnership", "media"], { required_error: "Select inquiry type" }),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const channels = [
  {
    icon: TrendingUp,
    title: "Investor Relations",
    description: "Connect with AIRAVATH to explore investment opportunities in urban air mobility operations.",
    button: "Investor Inquiry",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description: "Collaborate with AIRAVATH to operate mobility infrastructure and aerial mobility networks.",
    button: "Partner With Us",
  },
  {
    icon: Mic,
    title: "Media & Press",
    description: "For interviews, press coverage, and media inquiries regarding AIRAVATH operations.",
    button: "Media Contact",
  },
];

/* ─── Mobile 3D Auto-Looping Carousel for Contact Cards ─── */
const MobileContactCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = channels.length;

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, count]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsPaused(true);
    setDragStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartX !== null) {
      const diff = e.changedTouches[0].clientX - dragStartX;
      if (Math.abs(diff) > 40) {
        setActiveIndex((prev) => diff < 0 ? (prev + 1) % count : (prev - 1 + count) % count);
      }
    }
    setDragStartX(null);
    setTimeout(() => setIsPaused(false), 2000);
  }, [dragStartX, count]);

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    if (diff > Math.floor(count / 2)) diff -= count;
    if (diff < -Math.floor(count / 2)) diff += count;

    const isCenter = diff === 0;
    const rotateY = diff * 10;
    const scale = isCenter ? 1 : 0.87;
    const opacity = isCenter ? 1 : 0.55;
    const translateX = diff * 72;
    const zIndex = isCenter ? 10 : 5 - Math.abs(diff);

    return {
      transform: `perspective(1000px) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform, opacity" as const,
      boxShadow: isCenter
        ? "0 0 30px hsl(189 100% 50% / 0.25), 0 12px 40px rgba(0,0,0,0.5)"
        : "0 4px 16px rgba(0,0,0,0.3)",
      borderColor: isCenter ? "hsl(189 100% 50% / 0.4)" : "hsl(var(--border))",
    };
  };

  return (
    <div className="relative mb-12" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(189 100% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-center" style={{ height: 280, perspective: 1000 }}>
        {channels.map((ch, i) => {
          const style = getCardStyle(i);
          return (
            <div
              key={ch.title}
              className="absolute rounded-[14px] overflow-hidden border bg-card flex flex-col"
              style={{
                width: "72vw",
                maxWidth: 300,
                height: 280,
                transformStyle: "preserve-3d",
                ...style,
              }}
              onClick={() => {
                setActiveIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ch.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-sub text-[17px] font-medium text-foreground mb-2">
                  {ch.title}
                </h3>
                <p className="font-body text-[12px] text-titanium leading-[1.55] flex-1">
                  {ch.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {channels.map((_, i) => (
          <button
            key={i}
            className="rounded-full transition-all duration-500"
            onClick={() => {
              setActiveIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000);
            }}
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 6,
              background: i === activeIndex ? "hsl(189 100% 50%)" : "hsl(var(--muted-foreground) / 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        name: form.name.trim(),
        email: form.email.trim(),
        inquiry_type: form.type,
        message: form.message.trim(),
        timestamp: serverTimestamp(),
        read: false,
      });
      toast({ title: "Inquiry Submitted", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", type: "", message: "" });
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) setTypeOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const inquiryOptions = [
    { value: "investor", label: "Investor Inquiry" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "media", label: "Media Inquiry" },
  ];
  const selectedLabel = inquiryOptions.find((o) => o.value === form.type)?.label;

  const fieldWrap = (name: string) =>
    `group relative rounded-[8px] border bg-[#050505]/80 backdrop-blur-sm transition-all duration-300 ${
      focusedField === name
        ? "border-primary/60 shadow-[0_0_0_1px_hsl(189_100%_50%/0.25),0_0_24px_hsl(189_100%_50%/0.18)]"
        : "border-white/[0.08] hover:border-white/[0.16]"
    }`;

  const labelClass = (active: boolean) =>
    `pointer-events-none absolute left-12 font-sub uppercase tracking-[0.12em] transition-all duration-200 ${
      active
        ? "top-[8px] text-[9px] text-primary"
        : "top-1/2 -translate-y-1/2 text-[11px] text-[#777]"
    }`;

  const inputBase =
    "w-full h-[60px] bg-transparent pl-12 pr-4 pt-4 text-foreground font-body text-[15px] focus:outline-none placeholder-transparent";

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden section-padding atmosphere-blue"
      style={{ background: "linear-gradient(180deg, hsl(var(--surface-0)), hsl(var(--surface-1)))" }}
    >
      <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />

      <div className="container-airavath relative z-10">
        <ScrollReveal delay={0.12}>
          <h2 className={`font-heading font-semibold text-foreground tracking-futuristic text-center mb-[24px] ${isMobile ? "text-[26px]" : "text-[36px] md:text-[48px]"}`}>
            Join the Urban Air Mobility Network
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className={`font-body leading-[1.6] text-titanium text-center max-w-[700px] mx-auto ${isMobile ? "text-[14px] mb-10" : "text-[18px] mb-[120px]"}`}>
            AIRAVATH welcomes collaboration with investors, partners, and media
            organizations interested in shaping the future of urban air mobility operations.
          </p>
        </ScrollReveal>

        {isMobile ? (
          <MobileContactCarousel />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] mb-[120px]">
            {channels.map((ch, i) => (
              <ScrollReveal key={ch.title} delay={0.12 * i} duration={0.6}>
                <div className="group flex flex-col rounded-[12px] border border-border bg-card p-[32px] min-h-[200px] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_24px_hsl(189_100%_50%/0.18)] hover:border-primary/30 transition-all duration-300 ease-out h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <ch.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-sub text-[22px] font-medium text-foreground mb-2">
                    {ch.title}
                  </h3>
                  <p className="font-body text-[14px] text-titanium leading-relaxed flex-1">
                    {ch.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal delay={0.15} duration={0.8}>
          <form onSubmit={handleSubmit} className="max-w-[720px] mx-auto space-y-5">
            <div>
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} maxLength={100} />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} maxLength={255} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`${inputClass} appearance-none`}>
                <option value="" disabled>Select Inquiry Type</option>
                <option value="investor">Investor Inquiry</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="media">Media Inquiry</option>
              </select>
              {errors.type && <p className="text-destructive text-xs mt-1">{errors.type}</p>}
            </div>
            <div>
              <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} h-[140px] py-4 resize-none`} maxLength={2000} />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <button type="submit" disabled={submitting} className="w-full h-[56px] rounded-[8px] bg-primary text-primary-foreground font-sub text-[14px] font-medium hover:scale-[1.02] hover:shadow-[0_0_24px_hsl(189_100%_50%/0.4)] transition-all duration-300 disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
