// Shared floating-layer primitive for every overlay (Menu, Select, Popover, DatePicker, …).
//
// Why this exists: popovers used to render `position:absolute` inside their trigger's wrapper, so
// any ancestor with `overflow:hidden` (e.g. Table.Container in DataTable) CLIPPED the open layer —
// the options got cut off. Rendering the layer in a Portal to <body> escapes every ancestor
// clipping context; `useAnchoredPosition` then pins it to the trigger with viewport-fixed
// coordinates, flips when there isn't room, and clamps into the viewport. Fix it once here and
// every overlay inherits it.
import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, ReactNode, Ref, RefObject } from 'react';

// useLayoutEffect warns during SSR; fall back to useEffect when there's no DOM.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Render `children` into <body> so the floating layer escapes ancestor `overflow:hidden`. */
export function Portal({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}

export type FloatingPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top'
  | 'left'
  | 'right';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, Math.max(min, max)));

/**
 * Style applied before the first measurement: fixed + parked off-screen, so the layer is sized by
 * its own content (not the body flow) and never flashes at the wrong spot. Off-screen rather than
 * `visibility:hidden` on purpose — a hidden element silently rejects `.focus()`, which would break
 * menus that move focus to their first item on open before positioning has run.
 */
export const FLOATING_HIDDEN: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: -9999,
  margin: 0,
};

interface AnchoredOptions {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLElement | null>;
  placement?: FloatingPlacement;
  /** Make the layer at least as wide as its anchor (combobox listboxes). */
  matchWidth?: boolean;
  /** Gap between anchor and layer, in px. */
  gap?: number;
}

/**
 * Position a portaled floating layer relative to its anchor using viewport (fixed) coordinates.
 * Flips to the opposite side when the requested one doesn't fit, clamps into the viewport, and
 * recomputes on open and on any scroll/resize while open. Returns the style to spread onto the
 * floating element (FLOATING_HIDDEN until it has been measured).
 */
export function useAnchoredPosition({
  open,
  anchorRef,
  floatingRef,
  placement = 'bottom-start',
  matchWidth = false,
  gap = 6,
}: AnchoredOptions): CSSProperties {
  const [style, setStyle] = useState<CSSProperties | null>(null);

  useIsoLayoutEffect(() => {
    if (!open) {
      setStyle(null);
      return;
    }
    const anchor = anchorRef.current;
    const floating = floatingRef.current;
    if (!anchor || !floating) return;

    const compute = () => {
      const a = anchor.getBoundingClientRect();
      const f = floating.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      let top: number;
      let left: number;

      if (placement === 'left' || placement === 'right') {
        // Horizontal side (vertically centered), flipping when the requested side lacks room.
        const placeLeft =
          placement === 'left'
            ? !(a.left < f.width + gap && vw - a.right > a.left)
            : vw - a.right < f.width + gap && a.left > vw - a.right;
        left = placeLeft ? a.left - gap - f.width : a.right + gap;
        top = a.top + a.height / 2 - f.height / 2;
      } else {
        // Vertical side, flipping when the requested side lacks room and the other has more.
        const wantTop = placement.startsWith('top');
        const spaceBelow = vh - a.bottom;
        const spaceAbove = a.top;
        const placeTop = wantTop
          ? !(spaceAbove < f.height + gap && spaceBelow > spaceAbove)
          : spaceBelow < f.height + gap && spaceAbove > spaceBelow;
        top = placeTop ? a.top - gap - f.height : a.bottom + gap;
        if (placement.endsWith('end')) left = a.right - f.width;
        else if (placement.endsWith('start')) left = a.left;
        else left = a.left + a.width / 2 - f.width / 2;
      }

      top = clamp(top, gap, vh - f.height - gap);
      left = clamp(left, gap, vw - f.width - gap);

      const next: CSSProperties = { position: 'fixed', top: Math.round(top), left: Math.round(left), margin: 0 };
      if (matchWidth) next.minWidth = Math.round(a.width);
      setStyle(next);
    };

    compute();
    const onChange = () => compute();
    // capture=true so it also fires for scrolls of inner overflow containers, not just the window.
    window.addEventListener('scroll', onChange, true);
    window.addEventListener('resize', onChange);
    return () => {
      window.removeEventListener('scroll', onChange, true);
      window.removeEventListener('resize', onChange);
    };
  }, [open, placement, matchWidth, gap, anchorRef, floatingRef]);

  return style ?? FLOATING_HIDDEN;
}

/** Merge a forwarded ref with an internal ref so a component can both expose and measure a node. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as { current: T | null }).current = node;
    }
  };
}
