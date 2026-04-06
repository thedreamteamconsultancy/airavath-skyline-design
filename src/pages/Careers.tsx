import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building2, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroFlight from "@/assets/hero-flight.jpg";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string;
  requirements: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <img src={heroFlight} alt="Futuristic aviation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="relative z-10 text-center container-airavath">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-[40px] md:text-[56px] font-semibold text-foreground tracking-futuristic mb-4"
          >
            Careers at AIRAVATH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-[18px] text-titanium max-w-[600px] mx-auto"
          >
            Join us in building the future of urban air mobility.
          </motion.p>
        </div>
      </section>

      {/* Back to home */}
      <div className="container-airavath pt-8">
        <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sub text-sm">
          <ArrowLeft size={16} /> Back to Home
        </a>
      </div>

      {/* Job Listings */}
      <section className="container-airavath py-16 md:py-24">
        {jobs.length === 0 ? (
          <p className="text-center text-titanium font-body text-lg">No open positions at this time. Check back soon.</p>
        ) : (
          <div className="flex flex-col gap-5 max-w-[900px] mx-auto">
            {jobs.map((job, i) => (
              <ScrollReveal key={job.id} delay={0.1 * i} duration={0.6}>
                <Link to={`/careers/${job.id}`} className="group block">
                  <div className="bg-[#0B0B0B] border border-[#1C1C1C] rounded-[10px] p-[28px] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(189_100%_50%/0.1)] transition-all duration-500">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-sub text-[20px] font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground mb-3">
                          <span className="flex items-center gap-1.5">
                            <Building2 size={13} /> {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} /> {job.location}
                          </span>
                        </div>
                        <p className="font-body text-[14px] text-titanium leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Careers;
