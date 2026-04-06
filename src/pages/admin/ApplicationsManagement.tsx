import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, ExternalLink, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  name: string;
  email: string;
  message: string;
  resume_url: string;
  job_title: string;
  timestamp: any;
}

const ApplicationsManagement = () => {
  const { toast } = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "job_applications"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snap) => {
      setApps(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Application)));
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await deleteDoc(doc(db, "job_applications", id));
    toast({ title: "Application deleted" });
  };

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.job_title.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-semibold">Job Applications</h1>
        <span className="text-[#888] text-sm">{apps.length} total</span>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
        <input
          placeholder="Search by name, email, or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-[44px] rounded-lg border border-[#1a1a1a] bg-[#0B0B0B] pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <div key={a.id} className="bg-[#0B0B0B] border border-[#1a1a1a] rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{a.name}</p>
                <p className="text-[#888] text-xs mt-0.5">{a.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] font-medium">{a.job_title}</span>
                  {a.timestamp?.toDate && (
                    <span className="text-[#555] text-[10px]">{a.timestamp.toDate().toLocaleDateString()}</span>
                  )}
                </div>
                {a.message && <p className="text-[#888] text-xs mt-3 line-clamp-2">{a.message}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {a.resume_url && (
                  <a href={a.resume_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-[#888] hover:text-[#00D9FF] transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
                <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-[#888] hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-[#888] text-sm text-center py-8">No applications found.</p>}
      </div>
    </div>
  );
};

export default ApplicationsManagement;
