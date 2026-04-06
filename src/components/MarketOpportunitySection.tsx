import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ScrollReveal from "@/components/ScrollReveal";

const useCountUp = (target: string, duration = 1200) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numMatch = target.match(/^([\d.]+)/);
    if (!numMatch) { setDisplay(target); return; }
    const numericValue = parseFloat(numMatch[1]);
    const suffix = target.slice(numMatch[1].length);
    const startTime = performance.now();
    const animate = (t: number) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      setDisplay((Number.isInteger(numericValue) ? Math.round(current) : current.toFixed(1)) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return { ref, display };
};

const stats = [
  { number: "$30B+", description: "Projected eVTOL market value by 2030." },
  { number: "200+", description: "Active electric aircraft programs worldwide." },
  { number: "70%", description: "Projected urban population worldwide by 2050." },
  { number: "3×", description: "Expected increase in demand for urban air mobility services.", suffix: " Growth" },
];

const lineData = [
  { year: "2024", value: 2 },
  { year: "2026", value: 5 },
  { year: "2028", value: 10 },
  { year: "2030", value: 18 },
  { year: "2032", value: 28 },
  { year: "2035", value: 45 },
];

const barData = [
  { name: "Urban Population", value: 70 },
  { name: "Congestion Cost", value: 85 },
  { name: "Travel Demand", value: 92 },
];

const StatCard = ({ stat, delay }: { stat: typeof stats[0]; delay: number }) => {
  const { ref, display } = useCountUp(stat.number);
  return (
    <ScrollReveal delay={delay}>
      <div className="bg-card border border-border rounded-card p-[28px] h-[160px] flex flex-col justify-center text-center hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(189_100%_50%/0.1)] transition-all duration-500">
        <div className="font-heading text-[40px] leading-[1.1] text-primary tracking-futuristic mb-2x">
          <span ref={ref}>{display}</span>
          {stat.suffix && <span>{stat.suffix}</span>}
        </div>
        <p className="font-body text-body-sm text-titanium">{stat.description}</p>
      </div>
    </ScrollReveal>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3x">
      <p className="font-sub text-body-sm text-foreground">{label}</p>
      <p className="font-heading text-base text-primary">{payload[0].value}B</p>
    </div>
  );
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3x">
      <p className="font-sub text-body-sm text-foreground">{label}</p>
      <p className="font-heading text-base text-primary">{payload[0].value}%</p>
    </div>
  );
};

const MarketOpportunitySection = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-100px" });
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    if (chartInView) setShowCharts(true);
  }, [chartInView]);

  return (
    <section
      id="investors"
      className="relative overflow-hidden"
      style={{
        paddingTop: "180px",
        paddingBottom: "180px",
        background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 1.2%) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="marketRoute" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(189,100%,50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(189,100%,50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={i}
              cx={100 + Math.random() * 1400}
              cy={100 + Math.random() * 400}
              r="1.5"
              fill="hsl(189,100%,50%)"
              opacity={0.15 + Math.random() * 0.2}
            />
          ))}
          <path d="M200,300 Q500,150 800,280 T1400,200" stroke="url(#marketRoute)" strokeWidth="0.5" fill="none" />
          <path d="M100,400 Q400,250 700,350 T1300,280" stroke="url(#marketRoute)" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      <div className="container-airavath relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-3x">
          <h2 className="font-heading font-semibold text-section text-foreground tracking-futuristic">
            A Massive Market Opportunity
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center mb-[120px]">
          <p className="font-body text-body-lg text-titanium text-center max-w-[720px] leading-[1.6]">
            Urban air mobility is expected to transform transportation across
            major cities. Rapid urbanization, increasing congestion, and operational
            breakthroughs are accelerating the growth of aerial mobility networks.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4x mb-[120px]">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={0.2 * i} />
          ))}
        </div>

        <div ref={chartRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ScrollReveal delay={0.1}>
            <div className="bg-card border border-border rounded-card p-4x h-[320px]">
              <h3 className="font-sub text-feature text-foreground mb-4x">
                Urban Air Mobility Market Growth
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,11%)" />
                  <XAxis dataKey="year" stroke="hsl(210,6%,77%)" fontSize={12} fontFamily="Poppins" />
                  <YAxis stroke="hsl(210,6%,77%)" fontSize={12} fontFamily="Poppins" tickFormatter={(v) => `$${v}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  {showCharts && (
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(189,100%,50%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(189,100%,50%)", r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "hsl(189,100%,50%)", stroke: "hsl(189,100%,70%)", strokeWidth: 2 }}
                      isAnimationActive={showCharts}
                      animationDuration={1800}
                      animationEasing="ease-out"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="bg-card border border-border rounded-card p-4x h-[320px]">
              <h3 className="font-sub text-feature text-foreground mb-4x">
                Demand for Faster Urban Transportation
              </h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,11%)" />
                  <XAxis dataKey="name" stroke="hsl(210,6%,77%)" fontSize={11} fontFamily="Poppins" />
                  <YAxis stroke="hsl(210,6%,77%)" fontSize={12} fontFamily="Poppins" tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<BarTooltip />} />
                  {showCharts && (
                    <Bar
                      dataKey="value"
                      fill="hsl(189,100%,50%)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={showCharts}
                      animationDuration={1800}
                      animationEasing="ease-out"
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunitySection;
