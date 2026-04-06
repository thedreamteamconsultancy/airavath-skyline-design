import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

interface CardData {
  content: ReactNode;
}

interface Mobile3DCardStackProps {
  cards: CardData[];
  className?: string;
}

const Mobile3DCardStack = ({ cards, className = "" }: Mobile3DCardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= cards.length || isAnimating.current) return;
      isAnimating.current = true;
      setActiveIndex(index);
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    },
    [cards.length]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      if (Math.abs(e.deltaY) < 20) return;
      lastScrollTime.current = now;
      if (e.deltaY > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    };

    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeIndex, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (deltaX > Math.abs(deltaY)) return; // horizontal swipe, ignore
    if (Math.abs(deltaY) < 40) return;
    if (deltaY > 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;

    if (diff === 0) {
      return {
        transform: "scale(1) rotateX(0deg) translateY(0px)",
        opacity: 1,
        zIndex: cards.length,
        filter: "blur(0px) brightness(1.05)",
        boxShadow: "0 0 40px hsla(189, 100%, 50%, 0.2), 0 8px 32px rgba(0,0,0,0.4)",
      };
    }

    if (diff === 1) {
      return {
        transform: "scale(0.92) rotateX(8deg) translateY(50px)",
        opacity: 0.65,
        zIndex: cards.length - 1,
        filter: "blur(1px) brightness(0.7)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      };
    }

    if (diff === -1) {
      return {
        transform: "scale(0.88) rotateX(-4deg) translateY(-50px)",
        opacity: 0.35,
        zIndex: cards.length - 2,
        filter: "blur(2px) brightness(0.6)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      };
    }

    if (diff > 1) {
      return {
        transform: "scale(0.85) rotateX(12deg) translateY(100px)",
        opacity: 0,
        zIndex: 0,
        filter: "blur(4px) brightness(0.5)",
        pointerEvents: "none",
      };
    }

    return {
      transform: "scale(0.82) rotateX(-8deg) translateY(-100px)",
      opacity: 0,
      zIndex: 0,
      filter: "blur(4px) brightness(0.5)",
      pointerEvents: "none",
    };
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mx-auto"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          height: "380px",
          maxWidth: "400px",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute inset-0 rounded-[16px] overflow-hidden border border-border bg-card will-change-transform"
              style={{
                ...getCardStyle(index),
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                transformOrigin: "center center",
              }}
              onClick={() => goTo(index)}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="rounded-full transition-all duration-500"
            style={{
              width: index === activeIndex ? "24px" : "8px",
              height: "8px",
              background:
                index === activeIndex
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground) / 0.3)",
              boxShadow:
                index === activeIndex
                  ? "0 0 12px hsl(var(--primary) / 0.5)"
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Mobile3DCardStack;
