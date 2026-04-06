import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url?: string;
}

const fallbackTeam = [
  {
    id: "f1",
    name: "Founder / CEO",
    role: "Vision & Strategy",
    description: "Leading AIRAVATH's mission to operate the next generation of aerial mobility services.",
  },
  {
    id: "f2",
    name: "Chief Operations Officer",
    role: "Network Operations",
    description: "Responsible for fleet operations, route management, and mobility network coordination.",
  },
  {
    id: "f3",
    name: "Head of Infrastructure",
    role: "Mobility Hub Network",
    description: "Designing and managing scalable mobility hub infrastructure across cities.",
  },
  {
    id: "f4",
    name: "Head of Platform",
    role: "Mobility Platform",
    description: "Operating digital booking and fleet management systems for AIRAVATH aerial mobility services.",
  },
];

const TeamSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [members, setMembers] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "team_members"), (snap) => {
      if (snap.empty) {
        setMembers(fallbackTeam);
      } else {
        setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
      }
    });
    return unsub;
  }, []);

  return (
    <section
      ref={ref}
      id="team"
      className="relative overflow-hidden section-padding"
      style={{ background: "linear-gradient(180deg, #000000, #030303)" }}
    >
      <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />

      <div className="container-airavath relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-heading text-[36px] md:text-[48px] font-semibold text-foreground tracking-futuristic text-center mb-[24px]"
        >
          Leadership & Founding Team
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-body text-[18px] leading-[1.6] text-titanium text-center max-w-[720px] mx-auto mb-[120px]"
        >
          AIRAVATH is assembling a multidisciplinary team of operations experts,
          infrastructure specialists, and mobility innovators dedicated to operating
          the future of urban air transportation.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i + 0.3 }}
              className="group flex flex-col items-center text-center rounded-[12px] border border-border bg-card p-[32px] h-full hover:-translate-y-2 hover:shadow-[0_0_24px_hsl(189_100%_50%/0.15)] hover:border-primary/30 transition-all duration-300"
            >
              <div
                className="w-[120px] h-[120px] rounded-full mb-[24px] flex-shrink-0 flex items-center justify-center border-2 border-primary/60 group-hover:border-primary transition-colors duration-300 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #111111, #050505)",
                  boxShadow: "0 0 16px hsl(189 100% 50% / 0.15)",
                }}
              >
                <img
                  src={member.image_url || avatarPlaceholder}
                  alt={member.name}
                  className={`${member.image_url ? "w-full h-full object-cover" : "w-[72px] h-[72px] object-contain opacity-70"} group-hover:opacity-100 transition-opacity`}
                />
              </div>

              <h3 className="font-sub text-[20px] font-medium text-foreground mb-1">
                {member.name}
              </h3>

              <p className="font-body text-[14px] text-primary mb-[16px]">
                {member.role}
              </p>

              <p className="font-body text-[14px] text-titanium leading-[1.5]">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
