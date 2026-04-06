import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Mail, Settings } from "lucide-react";

const DashboardHome = () => {
  const [teamCount, setTeamCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await getCountFromServer(collection(db, "team_members"));
        setTeamCount(t.data().count);
        const i = await getCountFromServer(collection(db, "inquiries"));
        setInquiryCount(i.data().count);
      } catch {}
    };
    load();
  }, []);

  const cards = [
    { icon: Users, label: "Team Members", value: teamCount, color: "#00D9FF" },
    { icon: Mail, label: "Inquiries", value: inquiryCount, color: "#00D9FF" },
    { icon: Settings, label: "Settings", value: "Manage", color: "#00D9FF" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Welcome Back</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-[#1a1a1a] bg-[#0B0B0B] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center">
                <c.icon size={20} style={{ color: c.color }} />
              </div>
              <span className="text-[#888] text-sm">{c.label}</span>
            </div>
            <p className="text-3xl font-heading text-white">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
