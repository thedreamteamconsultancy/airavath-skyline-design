import type { NavigateFunction } from "react-router-dom";
import { readFooterReturnState, type FooterReturnState } from "@/lib/footerNavigation";

type BookmarkClickEvent = {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
};

export type BookmarkNavigationState = {
  fromFooter?: boolean;
  footerReturn?: FooterReturnState;
  returnTo?: string;
  returnScrollY?: number;
};

const isStandardClick = (event?: BookmarkClickEvent) =>
  !event ||
  (!event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey);

export const prepareBookmarkNavigation = (returnTo: string, event?: BookmarkClickEvent) => {
  if (!isStandardClick(event)) return;

  try {
    window.history.replaceState(window.history.state, "", returnTo);
  } catch {
    // If history is unavailable, the link still carries return state.
  }
};

export const navigateToReturnTarget = (
  navigate: NavigateFunction,
  state: unknown,
  fallback: string,
) => {
  const navigationState = state as BookmarkNavigationState | null | undefined;
  const footerReturn = navigationState?.footerReturn || readFooterReturnState();

  if (navigationState?.fromFooter || footerReturn?.source === "footer") {
    navigate(footerReturn?.returnPath || navigationState?.returnTo || "/#footer", {
      replace: true,
      state: {
        restoreFooter: true,
        footerReturn,
        returnScrollY: footerReturn?.scrollY ?? navigationState?.returnScrollY,
      },
    });
    return;
  }

  navigate(navigationState?.returnTo || fallback, { replace: true });
};