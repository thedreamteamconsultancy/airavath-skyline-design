import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Pencil, Trash2, Plus, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  publish_date: string;
}

const empty = { title: "", description: "", content: "", image_url: "", publish_date: new Date().toISOString().slice(0, 10) };

const NewsroomManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "news_articles"), orderBy("publish_date", "desc"));
    return onSnapshot(q, (snap) => {
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)));
    });
  }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (a: Article) => { setEditing(a); setForm({ title: a.title, description: a.description, content: a.content, image_url: a.image_url, publish_date: a.publish_date }); setShowForm(true); };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, image_url: url }));
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const data = { title: form.title.trim(), description: form.description.trim(), content: form.content.trim(), image_url: form.image_url, publish_date: form.publish_date };
      if (editing) {
        await updateDoc(doc(db, "news_articles", editing.id), data);
        toast({ title: "Article updated" });
      } else {
        await addDoc(collection(db, "news_articles"), data);
        toast({ title: "Article created" });
      }
      setShowForm(false);
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await deleteDoc(doc(db, "news_articles", id));
    toast({ title: "Article deleted" });
  };

  const inputClass = "w-full h-[44px] rounded-lg border border-[#1a1a1a] bg-black px-4 text-white text-sm focus:outline-none focus:border-[#00D9FF] transition-colors";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-semibold">Newsroom</h1>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:bg-[#00D9FF]/90 transition-colors">
          <Plus size={16} /> Add Article
        </button>
      </div>

      {showForm && (
        <div className="bg-[#0B0B0B] border border-[#1a1a1a] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-medium">{editing ? "Edit Article" : "New Article"}</h2>
            <button onClick={() => setShowForm(false)} className="text-[#888] hover:text-white"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            <input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
            <textarea placeholder="Full content (use new lines for paragraphs)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={`${inputClass} h-[200px] py-3 resize-none`} />
            <input type="date" value={form.publish_date} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} className={inputClass} />
            <div>
              <label className="text-[#888] text-xs block mb-2">Featured Image</label>
              <div className="flex items-center gap-4">
                {form.image_url && <img src={form.image_url} alt="" className="w-20 h-14 object-cover rounded-md border border-[#1a1a1a]" />}
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1a1a1a] text-[#888] text-sm cursor-pointer hover:text-white hover:border-[#333] transition-colors">
                  <ImageIcon size={14} /> {uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-lg bg-[#00D9FF] text-black text-sm font-medium hover:bg-[#00D9FF]/90 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update Article" : "Create Article"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((a) => (
          <div key={a.id} className="flex items-center gap-4 bg-[#0B0B0B] border border-[#1a1a1a] rounded-xl p-4">
            {a.image_url ? (
              <img src={a.image_url} alt="" className="w-16 h-12 object-cover rounded-md flex-shrink-0" />
            ) : (
              <div className="w-16 h-12 rounded-md bg-[#111] flex items-center justify-center flex-shrink-0"><ImageIcon size={16} className="text-[#333]" /></div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{a.title}</p>
              <p className="text-[#888] text-xs">{a.publish_date}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-white/5 text-[#888] hover:text-[#00D9FF] transition-colors"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-[#888] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="text-[#888] text-sm text-center py-8">No articles yet.</p>}
      </div>
    </div>
  );
};

export default NewsroomManagement;
