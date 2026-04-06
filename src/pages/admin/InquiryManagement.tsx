import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Search, Trash2, Eye, X, Mail, MailOpen } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  message: string;
  timestamp: any;
  read?: boolean;
}

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Inquiry | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry)));
    });
    return unsub;
  }, []);

  const filtered = inquiries.filter(
    (i) =>
      i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.email?.toLowerCase().includes(search.toLowerCase()) ||
      i.inquiry_type?.toLowerCase().includes(search.toLowerCase())
  );

  const markRead = async (inq: Inquiry) => {
    await updateDoc(doc(db, "inquiries", inq.id), { read: true });
    setViewing({ ...inq, read: true });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await deleteDoc(doc(db, "inquiries", id));
    toast({ title: "Inquiry deleted" });
    if (viewing?.id === id) setViewing(null);
  };

  const formatDate = (ts: any) => {
    if (!ts) return "";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Inquiries</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-[400px]">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          placeholder="Search inquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 rounded-lg border border-[#222] bg-[#0B0B0B] pl-10 pr-4 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-[#00D9FF] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              <th className="text-left px-5 py-3 text-[#666] font-medium"></th>
              <th className="text-left px-5 py-3 text-[#666] font-medium">Name</th>
              <th className="text-left px-5 py-3 text-[#666] font-medium">Email</th>
              <th className="text-left px-5 py-3 text-[#666] font-medium">Type</th>
              <th className="text-left px-5 py-3 text-[#666] font-medium">Date</th>
              <th className="text-right px-5 py-3 text-[#666] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr key={inq.id} className="border-b border-[#111] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3">
                  {inq.read ? (
                    <MailOpen size={14} className="text-[#444]" />
                  ) : (
                    <Mail size={14} className="text-[#00D9FF]" />
                  )}
                </td>
                <td className="px-5 py-3 text-white">{inq.name}</td>
                <td className="px-5 py-3 text-[#888]">{inq.email}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-1 rounded-md bg-[#00D9FF]/10 text-[#00D9FF] text-xs capitalize">
                    {inq.inquiry_type}
                  </span>
                </td>
                <td className="px-5 py-3 text-[#666]">{formatDate(inq.timestamp)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setViewing(inq);
                        if (!inq.read) markRead(inq);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-[#888] hover:text-[#00D9FF] transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-[#888] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-[#555]">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading text-white">Inquiry Detail</h2>
              <button onClick={() => setViewing(null)} className="text-[#666] hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[#666]">Name:</span>{" "}
                <span className="text-white">{viewing.name}</span>
              </div>
              <div>
                <span className="text-[#666]">Email:</span>{" "}
                <span className="text-white">{viewing.email}</span>
              </div>
              <div>
                <span className="text-[#666]">Type:</span>{" "}
                <span className="text-[#00D9FF] capitalize">{viewing.inquiry_type}</span>
              </div>
              <div>
                <span className="text-[#666]">Date:</span>{" "}
                <span className="text-white">{formatDate(viewing.timestamp)}</span>
              </div>
              <div>
                <span className="text-[#666] block mb-1">Message:</span>
                <p className="text-white bg-black rounded-lg p-4 border border-[#1a1a1a] whitespace-pre-wrap">
                  {viewing.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;
