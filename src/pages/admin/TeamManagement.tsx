import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
}

const empty = { name: "", role: "", description: "", image_url: "" };

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<(Omit<TeamMember, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "team_members"), (snap) => {
      setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
    });
    return unsub;
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setEditing({ ...editing, image_url: url });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const { id, ...data } = editing as TeamMember;
      if (id) {
        await updateDoc(doc(db, "team_members", id), data);
        toast({ title: "Member updated" });
      } else {
        await addDoc(collection(db, "team_members"), data);
        toast({ title: "Member added" });
      }
      setEditing(null);
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await deleteDoc(doc(db, "team_members", id));
    toast({ title: "Member deleted" });
  };

  const inputClass =
    "w-full h-12 rounded-lg border border-[#222] bg-black px-4 text-white placeholder:text-[#555] focus:outline-none focus:border-[#00D9FF] transition-colors text-sm";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-white">Team Members</h1>
        <button
          onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Member list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] p-5">
            {m.image_url && (
              <img src={m.image_url} alt={m.name} className="w-16 h-16 rounded-full object-cover mb-3" />
            )}
            <h3 className="text-white font-medium">{m.name}</h3>
            <p className="text-[#00D9FF] text-sm">{m.role}</p>
            <p className="text-[#666] text-sm mt-2 line-clamp-2">{m.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditing(m)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#222] text-[#888] text-xs hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors"
              >
                <Pencil size={12} /> Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#222] text-[#888] text-xs hover:border-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-[480px] rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] p-6 mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading text-white">
                {editing.id ? "Edit Member" : "Add Member"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-[#666] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Name"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Role"
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className={inputClass}
              />
              <textarea
                placeholder="Description"
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className={`${inputClass} h-24 py-3 resize-none`}
              />

              {/* Image upload */}
              <div>
                <div className="flex items-center gap-3">
                  {editing.image_url && (
                    <img src={editing.image_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#222] text-sm text-[#888] cursor-pointer hover:border-[#00D9FF] transition-colors">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? "Uploading..." : "Upload Photo"}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !editing.name}
                  className="flex-1 h-11 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="h-11 px-6 rounded-lg border border-[#222] text-[#888] text-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
