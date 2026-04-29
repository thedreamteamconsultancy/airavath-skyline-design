import type { Location } from "react-router-dom";

export const FOOTER_RETURN_KEY = "airavath:footer-return";

export type FooterReturnState = {
  source: "footer";
  section: string;
  href: string;
  returnPath: string;
  scrollY: number;
  createdAt: number;
};

export const getPathFromLocation = (location: Pick<Location, "pathname" | "search" | "hash">) =>
  `${location.pathname}${location.search}${location.hash}`;

export const saveFooterReturnState = (state: FooterReturnState) => {
  try {
    sessionStorage.setItem(FOOTER_RETURN_KEY, JSON.stringify(state));
  } catch {
    // Session storage can be unavailable in private contexts; navigation still works.
  }
};

export const readFooterReturnState = (): FooterReturnState | null => {
  try {
    const raw = sessionStorage.getItem(FOOTER_RETURN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FooterReturnState>;

    if (
      parsed.source !== "footer" ||
      typeof parsed.returnPath !== "string" ||
      typeof parsed.scrollY !== "number" ||
      typeof parsed.createdAt !== "number"
    ) {
      return null;
    }

    return parsed as FooterReturnState;
  } catch {
    return null;
  }
};

export const clearFooterReturnState = () => {
  try {
    sessionStorage.removeItem(FOOTER_RETURN_KEY);
  } catch {
    // No-op when storage is unavailable.
  }
};

export const isFreshFooterReturnState = (state: FooterReturnState, maxAgeMs = 5 * 60 * 1000) =>
  Date.now() - state.createdAt < maxAgeMs;