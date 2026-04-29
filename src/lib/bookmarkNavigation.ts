import type { NavigateFunction } from "react-router-dom";
import { readFooterReturnState, type FooterReturnState } from "@/lib/footerNavigation";

const BOOKMARK_RETURN_KEY = "airavath:bookmark-return";

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
  restoreBookmark?: boolean;
};

type BookmarkReturnState = {
  source: "bookmark";
  returnTo: string;
  scrollY: number;
  createdAt: number;
};

const isStandardClick = (event?: BookmarkClickEvent) =>
  !event ||
  (!event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey);

const saveBookmarkReturnState = (state: BookmarkReturnState) => {
  try {
    sessionStorage.setItem(BOOKMARK_RETURN_KEY, JSON.stringify(state));
  } catch {
    // Navigation still works with the URL bookmark fallback.
  }
};

export const clearBookmarkReturnState = () => {
  try {
    sessionStorage.removeItem(BOOKMARK_RETURN_KEY);
  } catch {
    // No-op when storage is unavailable.
  }
};

const readBookmarkReturnState = (): BookmarkReturnState | null => {
  try {
    const raw = sessionStorage.getItem(BOOKMARK_RETURN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BookmarkReturnState>;
    if (
      parsed.source !== "bookmark" ||
      typeof parsed.returnTo !== "string" ||
      typeof parsed.scrollY !== "number" ||
      typeof parsed.createdAt !== "number" ||
      Date.now() - parsed.createdAt > 5 * 60 * 1000
    ) {
      return null;
    }

    return parsed as BookmarkReturnState;
  } catch {
    return null;
  }
};

export const prepareBookmarkNavigation = (returnTo: string, event?: BookmarkClickEvent) => {
  if (!isStandardClick(event)) return;

  const returnState: BookmarkReturnState = {
    source: "bookmark",
    returnTo,
    scrollY: window.scrollY,
    createdAt: Date.now(),
  };

  saveBookmarkReturnState(returnState);

  try {
    const currentState = window.history.state;
    const currentUserState =
      currentState && typeof currentState === "object" && "usr" in currentState && currentState.usr && typeof currentState.usr === "object"
        ? currentState.usr
        : {};

    const nextState =
      currentState && typeof currentState === "object"
        ? {
            ...currentState,
            usr: {
              ...currentUserState,
              returnTo,
              returnScrollY: returnState.scrollY,
              restoreBookmark: true,
            },
          }
        : currentState;

    window.history.replaceState(nextState, "", returnTo);
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
  const bookmarkReturn = readBookmarkReturnState();
  const matchedBookmarkReturn =
    bookmarkReturn && (!navigationState?.returnTo || bookmarkReturn.returnTo === navigationState.returnTo)
      ? bookmarkReturn
      : null;

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

  const returnTo = navigationState?.returnTo || matchedBookmarkReturn?.returnTo || fallback;
  const returnScrollY = navigationState?.returnScrollY ?? matchedBookmarkReturn?.scrollY;

  navigate(returnTo, {
    replace: true,
    state: {
      returnTo,
      returnScrollY,
      restoreBookmark: returnScrollY !== undefined,
    },
  });
};