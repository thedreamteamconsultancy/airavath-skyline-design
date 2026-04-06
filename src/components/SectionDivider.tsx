interface SectionDividerProps {
  variant?: "blue" | "warm" | "neutral" | "horizon";
}

const gradients: Record<string, string> = {
  blue: "linear-gradient(to bottom, transparent, hsl(189 100% 50% / 0.07) 50%, transparent)",
  warm: "linear-gradient(to bottom, transparent, hsl(15 80% 50% / 0.05) 50%, transparent)",
  neutral: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.02) 50%, transparent)",
  horizon: "linear-gradient(to bottom, transparent, hsl(189 100% 50% / 0.04) 40%, hsl(210 40% 50% / 0.03) 60%, transparent)",
};

const SectionDivider = ({ variant = "neutral" }: SectionDividerProps) => (
  <div className="relative h-[120px] md:h-[200px] pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0" style={{ background: gradients[variant] }} />
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-px"
      style={{
        background: "linear-gradient(to right, transparent, hsl(189 100% 50% / 0.15), transparent)",
      }}
    />
  </div>
);

export default SectionDivider;
