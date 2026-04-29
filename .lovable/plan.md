## Goal

Lock in a consistent bookmark + back-navigation system across navbar, footer, ecosystem cards, "Learn More" CTAs, and sub-pages. Most plumbing already exists (`bookmarkNavigation.ts`, `footerNavigation.ts`, `ScrollManager.tsx`, `CinematicHero.handleBack`); the remaining issues are: wrong scroll-spy IDs, no URL hash sync, navbar offset is magic-number, POP restoration races Lenis on long pages, and a few CTAs bypass the shared handler.

## What's already correct (keep)

- `ScrollManager` saves `window.scrollY` per location key and restores on POP.
- Footer link click → `saveFooterReturnState` (sessionStorage) + state on `navigate`.
- `CinematicHero` back button → `navigateToReturnTarget` (footer-aware).
- `EcosystemHubSection`, `ProblemSection`, `EmergencySection`, `CargoSection`, `TourismSection` all `prepareBookmarkNavigation(returnTo)` and pass `state.returnTo`.
- Sub-page anchors exist: `#urban-mobility`, `#emergency-mobility`, `#cargo-logistics`, `#tourism-mobility`, `#ecosystem`, `#footer`.

## Changes

### 1. Fix scroll-spy in `src/hooks/useActiveSection.ts`
- Replace the stale `SECTION_IDS` (currently `["home","about","technology","vision","investors","team","contact"]` — `technology` and `investors` don't exist) with the real IDs rendered in `Index.tsx`: `home, about, urban-mobility, emergency-mobility, cargo-logistics, tourism-mobility, ecosystem, vertiport, how-it-works, vision, team, contact, footer`.
- Accept `ids: string[]` as an argument so Navbar can pass only its own nav targets.
- Verify the matching IDs exist on rendered sections; add missing `id="…"` attributes on `HeroSection` (`#home`), `AboutSection` (`#about`), `VisionSection` (`#vision`), `TeamSection` (`#team`), `ContactSection` (`#contact`) only if missing (read each file first; do not duplicate).

### 2. URL hash sync (scroll-spy → address bar)
- In `useActiveSection`, when active changes and we're on `/`, call `window.history.replaceState(history.state, "", "/#" + active)`.
- Debounced via rAF; never `pushState` (would pollute back stack).
- Skip during programmatic scroll (set a `isProgrammaticScroll` flag in `scrollToSection` for ~1.6s after invocation).

### 3. Centralize navbar offset in `SmoothScroll.tsx`
- Export `NAV_OFFSET = -80` constant; `scrollToSection` already uses `-80`. Replace literal usages.
- No layout change for users; just maintainability.

### 4. Navbar consistency (`src/components/Navbar.tsx`)
- "Join The Future" button currently calls `scrollToSection("#contact")` directly. When user is on a sub-page, this silently fails (no `#contact` element). Wrap with same logic as `handleNavClick`: if `pathname !== "/"` → `navigate("/#contact")` else `scrollToSection`.
- Same fix for the mobile bottom CTA.

### 5. Harden POP/footer restoration in `src/components/ScrollManager.tsx`
- Current poll waits up to 60 frames for document height. For very long pages (Index has lazy images), bump to 120 frames (~2s) and additionally listen for one `load` event on remaining `<img>` elements before final correction.
- After `lenis.scrollTo(saved, { immediate: true })`, schedule a single follow-up rAF that re-applies `window.scrollTo(0, saved)` to fix Lenis/native drift (the user's "small jump" symptom on returns).
- Keep behavior `instant` on POP (no animation) — matches user spec "no flicker".

### 6. Ensure footer link to `#footer` itself is a no-op
- `FooterSection.handleClick` for `href="#footer"` (none today, but Connect group could be added later) — guard: if target equals current path+hash, just scroll, don't navigate.

### 7. `Index.tsx` hash handling
- Already skips hash scroll when `restoreFooter`. Extend: also skip when navigation type is POP and `ScrollManager` has a saved position for this key (avoid double-scroll fighting). Implement by reading `useNavigationType()` and bailing early.

### 8. Cross-page back from infrastructure pages
- `CinematicHero` default `backLink="/#ecosystem"` — already correct. Confirm all 4 infra pages (`SkyPort`, `GroundPort`, `Vertiport`, `HubNetwork`) pass no override (they don't), so footer-origin still wins via `navigateToReturnTarget`.

### 9. Mobile parity
- `useIsMobile` is already used; Lenis `touchMultiplier: 1.5` stays.
- Verify `ScrollManager` listens to both `window` scroll and `lenis.on("scroll")` — it does. No change.

## Files touched

```
src/hooks/useActiveSection.ts        rewrite (real IDs + hash sync + arg)
src/components/SmoothScroll.tsx      export NAV_OFFSET, isProgrammaticScroll flag
src/components/Navbar.tsx            CTA path-aware + use updated hook
src/components/ScrollManager.tsx     longer poll, post-restore correction, POP guard
src/pages/Index.tsx                  skip hash scroll on POP
src/components/HeroSection.tsx       ensure id="home" (verify only)
src/components/AboutSection.tsx      ensure id="about" (verify only)
src/components/VisionSection.tsx     ensure id="vision" (verify only)
src/components/TeamSection.tsx       ensure id="team" (verify only)
src/components/ContactSection.tsx    ensure id="contact" (verify only)
src/components/VertiportSection.tsx  ensure id="vertiport" (verify only)
src/components/HowItWorksSection.tsx ensure id="how-it-works" (verify only)
```

(Verify-only files will only be edited if the ID is missing.)

## Test matrix (manual after build)

```
Navbar Home → About → back            → returns to Home
Navbar About → click Vision           → URL becomes /#vision, underline moves
Footer Sky Port → Back to Hub         → footer scroll position restored
Card Ecosystem → Vertiport page → Back→ #ecosystem section
Learn More Urban Mobility → Back      → #urban-mobility section
Mobile: same 4 flows                  → no jump, instant restore
Refresh on /#vision                   → loads at Vision section
```

## Out of scope

- No router rewrite, no route changes, no new pages.
- No animation system changes (Framer Motion variants stay).
- No removal of `bookmarkNavigation.ts` or `footerNavigation.ts` — they're working.
