import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building2, ChevronRight, Briefcase, Rocket, Users, Target, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import heroFlight from "@/assets/hero-flight.jpg";
import heroEvtol from "@/assets/hero-evtol.jpg";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string;
  requirements: string;
}

const cultureValues = [
  { icon: Rocket, title: "Innovation First", description: "We push the boundaries of aerospace technology, embracing bold ideas that redefine urban transportation." },
  { icon: Target, title: "Mission-Driven", description: "Every team member contributes directly to our vision of making aerial mobility accessible and sustainable." },
  { icon: Users, title: "Collaborative Culture", description: "Engineers, designers, and strategists work side-by-side in an open environment that values every perspective." },
  { icon: Briefcase, title: "Growth & Impact", description: "Join a fast-growing team where your work has real-world impact on cities and communities worldwide." },
];

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  useEffect(() => {
    document.title = "Careers at AIRAVATH | Join Our Team";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Join AIRAVATH and help build the future of urban air mobility.");
    const q = query(collection(db, "job_openings"), orderBy("title"));
    const unsub = onSnapshot(q, (snap) => {
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
    });
    return unsub;
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)))];

  const filtered = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || j.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFlight} alt="Join AIRAVATH" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }}
        />

        <div className="relative z-10 container-airavath pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="font-sub text-[13px] text-primary uppercase tracking-[0.15em]">We're Hiring</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[44px] md:text-[64px] lg:text-[76px] font-semibold text-foreground tracking-futuristic leading-[1.05] mb-6"
          >
            Build the<br />
            <span className="text-gradient-blue">Future of Flight</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-[17px] md:text-[19px] text-titanium max-w-[520px] leading-relaxed"
          >
            Join our team of engineers, designers, and visionaries building the next era of urban air mobility.
          </motion.p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 atmosphere-blue" />
        <div className="relative container-airavath">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-primary" />
                <span className="font-sub text-[13px] text-primary uppercase tracking-[0.12em]">Our Culture</span>
                <div className="h-[1px] w-8 bg-primary" />
              </div>
              <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-foreground tracking-futuristic">
                Why <span className="text-gradient-blue">AIRAVATH</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i} duration={0.6}>
                <div className="group relative h-full rounded-[14px] border border-border bg-card p-7 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_8px_30px_hsl(189_100%_50%/0.1)] transition-all duration-500">
                  <div className="w-12 h-12 rounded-[10px] bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-sub text-[16px] font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-[13px] text-titanium leading-relaxed">{item.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-[240px] md:h-[280px]">
          <img src={heroEvtol} alt="AIRAVATH aircraft" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-airavath">
              <ScrollReveal>
                <div className="max-w-[600px]">
                  <h3 className="font-heading text-[24px] md:text-[32px] font-semibold text-foreground tracking-futuristic mb-3">
                    Shape Tomorrow's Skies
                  </h3>
                  <p className="font-body text-[15px] text-titanium leading-relaxed">
                    We're looking for passionate individuals who want to solve meaningful challenges in aerospace, engineering, and urban infrastructure.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Back + Search + Filter */}
      <div className="container-airavath pt-14 pb-4">
        <div className="flex flex-col gap-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm self-start">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-[300px]">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[44px] rounded-[8px] border border-border bg-card pl-11 pr-10 text-foreground placeholder:text-muted-foreground font-body text-[14px] focus:outline-none focus:border-primary/50 focus:shadow-[0_0_12px_hsl(189_100%_50%/0.1)] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Department filter */}
            {departments.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-full border font-sub text-[12px] uppercase tracking-[0.06em] transition-all duration-300 ${
                      selectedDept === dept
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <section className="container-airavath py-12 md:py-20">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-[1px] w-8 bg-primary" />
            <h3 className="font-sub text-[14px] text-primary uppercase tracking-[0.12em]">
              Open Positions {filtered.length > 0 && `(${filtered.length})`}
            </h3>
            <div className="h-[1px] flex-1 bg-border" />
          </div>
        </ScrollReveal>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full border border-border bg-card flex items-center justify-center mb-6">
              <Briefcase size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-sub text-[20px] text-foreground mb-2">
              {searchQuery || selectedDept !== "All" ? "No matching positions" : "No open positions"}
            </h3>
            <p className="font-body text-[14px] text-titanium max-w-[360px] text-center">
              {searchQuery || selectedDept !== "All"
                ? "Try adjusting your search or filter criteria."
                : "We're always looking for talent. Check back soon for new opportunities."
              }
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-[920px]">
            {filtered.map((job, i) => (
              <ScrollReveal key={job.id} delay={0.08 * i} duration={0.5}>
                <Link to={`/careers/${job.id}`} className="group block">
                  <div className="relative rounded-[12px] border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_hsl(189_100%_50%/0.1)] transition-all duration-500">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="font-sub text-[18px] md:text-[20px] font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-400">
                          {job.title}
                        </h3>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          {job.department && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/15 text-[12px] text-primary font-sub">
                              <Building2 size={12} /> {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
                              <MapPin size={13} /> {job.location}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="font-body text-[14px] text-titanium leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-400">
                        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <FooterSection />
    </div>
  );
};

export default Careers;
