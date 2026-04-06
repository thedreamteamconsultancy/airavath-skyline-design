import { useState, useEffect } from "react";

const SECTION_IDS = ["home", "about", "technology", "vision", "investors", "team", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observers.push(observer);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
