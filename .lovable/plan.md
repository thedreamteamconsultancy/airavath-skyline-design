## Goal

Fix the mobile timeline in `src/components/HowItWorksSection.tsx` so the vertical line and every circle icon share a single fixed left axis at **32px from the viewport edge**. Desktop (md+) behavior stays unchanged.

## Root cause

The current mobile implementation uses `left-1/2` inside a `w-16` rail. That centers elements at 32px only when the rail is exactly 16 wide and unpadded — any parent padding, scrollbar, or rail width drift causes a sub-pixel offset between the line and circles. The correct approach is what you described: one fixed `axisX = 32px` value used by every element with `translateX(-50%)`.

## Changes (mobile only — all under non-`md:` classes)

In `src/components/HowItWorksSection.tsx` → `VerticalTimeline`:

1. **Vertical background line (mobile)**
   Replace the `w-16` rail wrapper with a direct absolute line:
   ```
   left-[32px] top-0 bottom-0 w-[2px] -translate-x-1/2 bg-primary/10
   ```
   No wrapper, no `w-16`, no `left-1/2`.

2. **Animated fill line (mobile)**
   Same axis as background:
   ```
   left-[32px] top-0 w-[2px] -translate-x-1/2 origin-top
   ```
   Keep `scaleY: lineScaleY`, gradient fill unchanged.

3. **Circle node wrapper (mobile)**
   Replace the current `left-0 w-16` wrapper. Each step's node container becomes:
   ```
   left-[32px] top-8 -translate-x-1/2 w-12 h-12 flex items-center justify-center
   ```
   Drop the inner `absolute left-1/2 -translate-x-1/2` — it's now redundant.
   Desktop classes (`md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-12`) remain.

4. **Aircraft icon (mobile)**
   Same axis treatment:
   ```
   left-[32px] -translate-x-1/2 w-5 h-5
   ```
   Remove the `w-16` wrapper and the inner `left-1/2 -translate-x-1/2` shim. Desktop keeps `md:left-1/2 md:-translate-x-1/2`.

5. **Card padding stays**
   Cards already use `pl-20` on mobile to clear the 32px axis + 24px circle radius + breathing room. No change needed.

## Why this works

Every mobile element resolves to:
`final_x = 32px - (own_width / 2)`

So the geometric center of the 2px line, the 48px circles, and the 20px aircraft all land on x = 32px exactly. No rail width, no percentage math, no parent-width dependency — pixel-perfect by construction.

## Verification

After the edit I'll briefly add a 1px red border on the circles and a white line color, screenshot the mobile viewport (390px) to confirm the line bisects each circle, then remove the debug styles before finishing.

## Files touched

- `src/components/HowItWorksSection.tsx` (only the `VerticalTimeline` JSX — desktop classes untouched)
