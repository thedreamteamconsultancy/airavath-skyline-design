import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Saves scroll position per location key and restores it on POP (back/forward).
 * On PUSH/REPLACE navigations, scrolls to top.
 * Works with Lenis smooth scroll.
 */
const ScrollManager = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const positions = useRef<Map<string, number>>(new Map());
  const lastKey = useRef<string>(location.key);

  // Disable browser's native scroll restoration so we control it
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Save scroll position before unmounting / route change
  useEffect(() => {
    const saveScroll = () => {
      positions.current.set(lastKey.current, window.scrollY);
    };
    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => {
      saveScroll();
      window.removeEventListener("scroll", saveScroll);
    };
  }, []);

  useEffect(() => {
    // Save the previous location's scroll before switching keys
    positions.current.set(lastKey.current, window.scrollY);
    lastKey.current = location.key;

    const lenis = (window as any).__lenis;

    if (navType === "POP") {
      // Restore previous scroll
      const saved = positions.current.get(location.key) ?? 0;
      // Wait a frame for the new page to render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(saved, { immediate: true });
          else window.scrollTo(0, saved);
        });
      });
    } else {
      // PUSH / REPLACE → scroll to top
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
  }, [location.key, navType]);

  return null;
};

export default ScrollManager;
