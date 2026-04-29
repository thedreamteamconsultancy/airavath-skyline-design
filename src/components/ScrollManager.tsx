import { useEffect, useRef } from "react";
import { useLocation, useNavigationType, type Location } from "react-router-dom";
import {
  clearFooterReturnState,
  isFreshFooterReturnState,
  readFooterReturnState,
  type FooterReturnState,
} from "@/lib/footerNavigation";

type NavigationState = {
  returnScrollY?: number;
  restoreFooter?: boolean;
  footerReturn?: FooterReturnState;
};

type LenisLike = {
  on?: (event: "scroll", callback: () => void) => void;
  off?: (event: "scroll", callback: () => void) => void;
  resize?: () => void;
  scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

/**
 * Saves scroll position per location key and restores it on POP (back/forward).
 * On PUSH/REPLACE navigations, scrolls to top.
 * Waits for document height to be sufficient before restoring (handles lazy content).
 */
const ScrollManager = () => {
  const location = useLocation() as Location & { state: NavigationState | null };
  const navType = useNavigationType();
  const positions = useRef<Map<string, number>>(new Map());
  const lastKey = useRef<string>(location.key);
  const returnScrollY = typeof location.state?.returnScrollY === "number" ? location.state.returnScrollY : undefined;

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Continuously track scroll on both window and lenis
  useEffect(() => {
    const saveScroll = () => {
      positions.current.set(lastKey.current, window.scrollY);
    };
    window.addEventListener("scroll", saveScroll, { passive: true });

    const lenis = window.__lenis;
    if (lenis && lenis.on) {
      lenis.on("scroll", saveScroll);
    }

    return () => {
      saveScroll();
      window.removeEventListener("scroll", saveScroll);
      if (lenis && lenis.off) lenis.off("scroll", saveScroll);
    };
  }, []);

  useEffect(() => {
    // Save the previous location's scroll before switching keys
    positions.current.set(lastKey.current, window.scrollY);
    if (returnScrollY !== undefined) {
      positions.current.set(lastKey.current, returnScrollY);
    }
    const previousKey = lastKey.current;
    lastKey.current = location.key;

    const lenis = window.__lenis;

    const storedFooterReturn = readFooterReturnState();
    const footerReturn = location.state?.footerReturn ?? storedFooterReturn;
    const shouldRestoreFooter =
      location.pathname === "/" &&
      Boolean(location.state?.restoreFooter || (footerReturn && isFreshFooterReturnState(footerReturn)));

    if (navType === "POP" || shouldRestoreFooter) {
      const saved = shouldRestoreFooter
        ? footerReturn?.scrollY ?? returnScrollY ?? 0
        : positions.current.get(location.key) ?? returnScrollY ?? 0;

      // Poll until document is tall enough to scroll to saved position
      let attempts = 0;
      const maxAttempts = 60; // ~1s at 60fps

      const tryRestore = () => {
        const docHeight = document.documentElement.scrollHeight;
        const viewport = window.innerHeight;
        const maxScroll = docHeight - viewport;

        if (maxScroll >= saved - 4 || attempts >= maxAttempts) {
          if (lenis) {
            lenis.scrollTo(saved, { immediate: true, force: true });
          } else {
            window.scrollTo({ top: saved, behavior: shouldRestoreFooter ? "smooth" : "auto" });
          }
          // Resize/refresh lenis after restore
          if (lenis && lenis.resize) lenis.resize();
          if (shouldRestoreFooter) clearFooterReturnState();
        } else {
          attempts++;
          requestAnimationFrame(tryRestore);
        }
      };
      requestAnimationFrame(tryRestore);
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
    // We intentionally don't include previousKey in deps
    void previousKey;
  }, [location.key, navType, returnScrollY]);

  return null;
};

export default ScrollManager;
