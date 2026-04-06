import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollToSection = (target: string, offset = -80) => {
  const el = document.querySelector(target);
  if (!el || !lenisInstance) return;
  
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
