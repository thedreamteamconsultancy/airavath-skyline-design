import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, onSnapshot, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building2, Send } from "lucide-react";
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
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

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
        <h1 className="font-heading text-2xl text-foreground mb-4">Job not found</h1>
        <Link to="/careers" className="text-primary hover:underline">← Back to Careers</Link>
      </div>
    </div>
  );

  const inputClass =
    "w-full h-[52px] rounded-[6px] border border-border bg-[#050505] px-4 text-foreground placeholder:text-[#777] font-body text-[16px] focus:outline-none focus:border-primary transition-colors";

  const renderList = (text: string) =>
    text.split("\n").filter(Boolean).map((line, i) => (
      <li key={i} className="font-body text-[15px] text-titanium leading-[1.7]">{line.replace(/^[-•]\s*/, "")}</li>
    ));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container-airavath py-12 max-w-[800px]">
        <Link to="/careers" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sub text-sm mb-8">
          <ArrowLeft size={16} /> Back to Careers
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-heading text-[32px] md:text-[44px] font-semibold text-foreground tracking-futuristic mb-4 leading-[1.15]">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[14px] text-muted-foreground mb-10">
            <span className="flex items-center gap-1.5"><Building2 size={14} /> {job.department}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="font-sub text-[20px] text-foreground mb-4">About the Role</h2>
            <p className="font-body text-[15px] text-titanium leading-[1.8]">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div className="mb-10">
              <h2 className="font-sub text-[20px] text-foreground mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">{renderList(job.responsibilities)}</ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="mb-16">
              <h2 className="font-sub text-[20px] text-foreground mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2">{renderList(job.requirements)}</ul>
            </div>
          )}

          {/* Apply Form */}
          <div className="bg-card border border-border rounded-[12px] p-8">
            <h2 className="font-sub text-[22px] text-foreground mb-6">Apply for this Position</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} maxLength={100} />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} maxLength={255} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-[14px] text-titanium mb-2 font-body">Resume (PDF, DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-titanium file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-border file:text-sm file:font-medium file:bg-[#0B0B0B] file:text-foreground hover:file:bg-muted transition-colors cursor-pointer"
                />
                {errors.resume && <p className="text-destructive text-xs mt-1">{errors.resume}</p>}
              </div>
              <div>
                <textarea placeholder="Cover Letter / Message (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} h-[120px] py-4 resize-none`} maxLength={2000} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-[52px] rounded-[8px] bg-primary text-primary-foreground font-sub text-[14px] font-medium hover:scale-[1.02] hover:shadow-[0_0_24px_hsl(189_100%_50%/0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={16} /> {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetail;
