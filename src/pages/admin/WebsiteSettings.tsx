import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface SiteSettings {
  logo_url: string;
  linkedin_url: string;
  twitter_url: string;
  youtube_url: string;
}

const defaults: SiteSettings = {
  logo_url: "",
  linkedin_url: "",
  twitter_url: "",
  youtube_url: "",
};

const WebsiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "website_settings", "main"));
      if (snap.exists()) {
        const data = snap.data();
        setSettings({
          logo_url: data.logo_url || "",
          linkedin_url: data.linkedin_url || "",
          twitter_url: data.twitter_url || "",
          youtube_url: data.youtube_url || "",
        });
      }
    };
    load();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setSettings((s) => ({ ...s, logo_url: url }));
      toast({ title: "Logo uploaded" });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "website_settings", "main"), settings, { merge: true });
      toast({ title: "Settings saved" });
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full h-12 rounded-lg border border-[#222] bg-black px-4 text-white placeholder:text-[#555] focus:outline-none focus:border-[#00D9FF] transition-colors text-sm";

  return (
    <div className="max-w-[600px]">
      <h1 className="text-2xl font-heading text-white mb-8">Website Settings</h1>

      <div className="space-y-6">
        {/* Logo */}
        <div>
          <label className="text-sm text-[#888] mb-2 block">Logo</label>
          <div className="flex items-center gap-4">
            {settings.logo_url && (
              <img src={settings.logo_url} alt="Logo" className="h-12 w-auto rounded bg-[#111] p-1" />
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#222] bg-[#0B0B0B] text-sm text-[#888] cursor-pointer hover:border-[#00D9FF] transition-colors">
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploading ? "Uploading..." : "Upload Logo"}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Social links */}
        <div>
          <label className="text-sm text-[#888] mb-2 block">LinkedIn URL</label>
          <input
            value={settings.linkedin_url}
            onChange={(e) => setSettings((s) => ({ ...s, linkedin_url: e.target.value }))}
            placeholder="https://linkedin.com/company/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-[#888] mb-2 block">Twitter (X) URL</label>
          <input
            value={settings.twitter_url}
            onChange={(e) => setSettings((s) => ({ ...s, twitter_url: e.target.value }))}
            placeholder="https://x.com/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-[#888] mb-2 block">YouTube URL</label>
          <input
            value={settings.youtube_url}
            onChange={(e) => setSettings((s) => ({ ...s, youtube_url: e.target.value }))}
            placeholder="https://youtube.com/..."
            className={inputClass}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="h-12 px-8 rounded-lg bg-[#00D9FF] text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default WebsiteSettings;
