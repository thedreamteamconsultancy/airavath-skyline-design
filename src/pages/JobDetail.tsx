import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, onSnapshot, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building2, Send, Upload, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface Job {
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string;
  requirements: string;
}

const applySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().max(2000),
});

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "job_openings", id), (snap) => {
      if (snap.exists()) {
        setJob(snap.data() as Job);
        document.title = `${(snap.data() as Job).title} | Careers at AIRAVATH`;
      }
      setLoading(false);
    });
    return unsub;
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = applySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!resume) {
      setErrors({ resume: "Please upload your resume" });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const resumeUrl = await uploadToCloudinary(resume);
      await addDoc(collection(db, "job_applications"), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        resume_url: resumeUrl,
        job_title: job?.title || "",
        job_id: id,
        timestamp: serverTimestamp(),
      });
      toast({ title: "Application Submitted", description: "Thank you! We'll review your application." });
      setForm({ name: "", email: "", message: "" });
      setResume(null);
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!job) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-[28px] text-foreground mb-4">Position Not Found</h1>
        <p className="font-body text-titanium text-[14px] mb-6">This job listing may have been closed or removed.</p>
        <Link to="/careers" className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm">
          <ArrowLeft size={16} /> Back to Careers
        </Link>
      </div>
    </div>
  );

  const renderList = (text: string) =>
    text.split("\n").filter(Boolean).map((line, i) => (
      <li key={i} className="font-body text-[15px] text-titanium leading-[1.75] pl-2">{line.replace(/^[-•]\s*/, "")}</li>
    ));

  const inputClass =
    "w-full h-[52px] rounded-[10px] border border-border bg-card px-5 text-foreground placeholder:text-muted-foreground font-body text-[15px] focus:outline-none focus:border-primary/50 focus:shadow-[0_0_16px_hsl(189_100%_50%/0.1)] transition-all duration-300";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 atmosphere-blue" />
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }}
        />

        <div className="relative container-airavath">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-sub text-sm mb-10">
            <ArrowLeft size={16} /> Back
          </button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-8 bg-primary" />
              <span className="font-sub text-[13px] text-primary uppercase tracking-[0.12em]">Open Position</span>
            </div>

            <h1 className="font-heading text-[32px] md:text-[48px] lg:text-[56px] font-semibold text-foreground tracking-futuristic leading-[1.1] mb-6">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {job.department && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-[13px] text-primary font-sub">
                  <Building2 size={14} /> {job.department}
                </span>
              )}
              {job.location && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-[13px] text-muted-foreground font-sub">
                  <MapPin size={14} /> {job.location}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container-airavath py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Job Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="font-sub text-[20px] text-foreground mb-5 flex items-center gap-3">
                <div className="w-1 h-5 bg-primary rounded-full" />
                About the Role
              </h2>
              <p className="font-body text-[15px] text-titanium leading-[1.85]">{job.description}</p>
            </motion.div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h2 className="font-sub text-[20px] text-foreground mb-5 flex items-center gap-3">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  Responsibilities
                </h2>
                <ul className="space-y-3 list-disc list-outside ml-5">{renderList(job.responsibilities)}</ul>
              </motion.div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <h2 className="font-sub text-[20px] text-foreground mb-5 flex items-center gap-3">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  Requirements
                </h2>
                <ul className="space-y-3 list-disc list-outside ml-5">{renderList(job.requirements)}</ul>
              </motion.div>
            )}
          </div>

          {/* Right: Application Form (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-[16px] border border-border bg-card p-7 md:p-8"
              >
                <h2 className="font-sub text-[18px] text-foreground mb-6 flex items-center gap-3">
                  <Send size={16} className="text-primary" />
                  Apply Now
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} maxLength={100} />
                    {errors.name && <p className="text-destructive text-[12px] mt-1.5 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} maxLength={255} />
                    {errors.email && <p className="text-destructive text-[12px] mt-1.5 font-body">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] text-titanium mb-2 font-body">Resume</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full h-[52px] rounded-[10px] border border-dashed border-border bg-background flex items-center justify-center gap-3 text-muted-foreground hover:border-primary/30 transition-colors">
                        {resume ? (
                          <>
                            <FileText size={16} className="text-primary" />
                            <span className="font-body text-[13px] text-foreground truncate max-w-[180px]">{resume.name}</span>
                          </>
                        ) : (
                          <>
                            <Upload size={16} />
                            <span className="font-body text-[13px]">Upload PDF or DOC</span>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.resume && <p className="text-destructive text-[12px] mt-1.5 font-body">{errors.resume}</p>}
                  </div>
                  <div>
                    <textarea
                      placeholder="Cover letter (optional)"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} h-[120px] py-4 resize-none`}
                      maxLength={2000}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] rounded-[10px] bg-primary text-primary-foreground font-sub text-[14px] font-medium hover:shadow-[0_0_24px_hsl(189_100%_50%/0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send size={15} /> {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </motion.div>

              {/* Back to careers link */}
              <div className="mt-6 text-center">
                <Link to="/careers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-sub text-[13px] transition-colors">
                  View all positions <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default JobDetail;
