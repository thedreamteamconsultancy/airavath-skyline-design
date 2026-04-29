import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const NAV_OFFSET = -80;

export const getLenis = () => lenisInstance;

// Programmatic-scroll guard so scroll-spy doesn't fight with user-initiated
// jumps (e.g. clicking a navbar link) and rewrite the URL mid-animation.
let programmaticScrollUntil = 0;
export const isProgrammaticScroll = () => Date.now() < programmaticScrollUntil;
const markProgrammaticScroll = (durationMs: number) => {
  programmaticScrollUntil = Date.now() + durationMs;
};

export const scrollToSection = (target: string, offset = NAV_OFFSET) => {
  const el = document.querySelector(target);
  if (!el || !lenisInstance) return;

  // Block scroll-spy URL writes for the full animation + small buffer
  markProgrammaticScroll(1800);

  // Small delay for cinematic feel
  setTimeout(() => {
    lenisInstance!.scrollTo(el as HTMLElement, {
      offset,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
    });
  }, 60);
};

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
