import { useState, useEffect } from "react";
import { isProgrammaticScroll } from "@/components/SmoothScroll";

const DEFAULT_SECTION_IDS = [
  "home",
  "about",
  "urban-mobility",
  "emergency-mobility",
  "cargo-logistics",
  "tourism-mobility",
  "ecosystem",
  "vertiport",
  "how-it-works",
  "vision",
  "team",
  "contact",
  "footer",
];

/**
 * Tracks the currently visible section and (on the home route) syncs
 * `window.location.hash` to it via history.replaceState — so the URL
 * always reflects the user's position without polluting back history.
 */
export function useActiveSection(ids: string[] = DEFAULT_SECTION_IDS) {
  const [active, setActive] = useState<string>(ids[0] ?? "home");

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      // Pick the entry with the largest intersection ratio that is intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  // Sync URL hash (replaceState only — never pollute back stack)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;
    if (isProgrammaticScroll()) return;

    const desired = `#${active}`;
    if (window.location.hash === desired) return;

    let frame = 0;
    frame = requestAnimationFrame(() => {
      try {
        window.history.replaceState(window.history.state, "", `/${desired}`);
      } catch {
        // ignore (some browsers throttle replaceState)
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return active;
}
