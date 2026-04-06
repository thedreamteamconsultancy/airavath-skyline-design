const ParticleGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
      
      {/* Glowing route lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,300 Q400,100 800,350 T1600,200" stroke="url(#routeGrad)" strokeWidth="1" fill="none" />
        <path d="M0,500 Q300,300 700,450 T1400,300" stroke="url(#routeGrad)" strokeWidth="0.5" fill="none" />
        <path d="M200,700 Q500,400 900,550 T1600,400" stroke="url(#routeGrad)" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 animate-float"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleGrid;
