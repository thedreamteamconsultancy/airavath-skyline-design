import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string;
  requirements: string;
}

const empty = { title: "", department: "", location: "", description: "", responsibilities: "", requirements: "" };

const CareersManagement = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "job_openings"), orderBy("title"));
    return onSnapshot(q, (snap) => {
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
    });
  }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (j: Job) => { setEditing(j); setForm({ title: j.title, department: j.department, location: j.location, description: j.description, responsibilities: j.responsibilities, requirements: j.requirements }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const data = { title: form.title.trim(), department: form.department.trim(), location: form.location.trim(), description: form.description.trim(), responsibilities: form.responsibilities.trim(), requirements: form.requirements.trim() };
      if (editing) {
        await updateDoc(doc(db, "job_openings", editing.id), data);
        toast({ title: "Job updated" });
      } else {
        await addDoc(collection(db, "job_openings"), data);
        toast({ title: "Job created" });
      }
      setShowForm(false);
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    await deleteDoc(doc(db, "job_openings", id));
    toast({ title: "Job deleted" });
  };

  const inputClass = "w-full h-[44px] rounded-lg border border-[#1a1a1a] bg-black px-4 text-white text-sm focus:outline-none focus:border-[#00D9FF] transition-colors";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-semibold">Careers</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:bg-[#00D9FF]/90 transition-colors">
          <Plus size={16} /> Add Job
        </button>
      </div>

      {showForm && (
        <div className="bg-[#0B0B0B] border border-[#1a1a1a] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-medium">{editing ? "Edit Job" : "New Job Opening"}</h2>
            <button onClick={() => setShowForm(false)} className="text-[#888] hover:text-white"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <input placeholder="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass} />
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} />
            </div>
            <textarea placeholder="Job description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} h-[100px] py-3 resize-none`} />
            <textarea placeholder="Responsibilities (one per line)" value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} className={`${inputClass} h-[120px] py-3 resize-none`} />
            <textarea placeholder="Requirements (one per line)" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className={`${inputClass} h-[120px] py-3 resize-none`} />
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:bg-[#00D9FF]/90 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update Job" : "Create Job"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="flex items-center gap-4 bg-[#0B0B0B] border border-[#1a1a1a] rounded-xl p-4">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{j.title}</p>
              <p className="text-[#888] text-xs">{j.department} · {j.location}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openEdit(j)} className="p-2 rounded-lg hover:bg-white/5 text-[#888] hover:text-[#00D9FF] transition-colors"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(j.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-[#888] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <p className="text-[#888] text-sm text-center py-8">No job openings yet.</p>}
      </div>
    </div>
  );
};

export default CareersManagement;
