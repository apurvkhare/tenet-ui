import * as react from 'react';
import { SVGAttributes, ReactNode } from 'react';

/** Rendered size in CSS pixels. The glyph is always drawn on a 24×24 grid and scaled. */
type IconSize = 16 | 20 | 24;
/**
 * Props of the generic `Icon` wrapper. `width`, `height` and `viewBox` are owned by `size` so every
 * icon in the system shares the same geometry; `children` are the glyph's SVG shape nodes.
 */
interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height' | 'viewBox'> {
    /**
     * Rendered width and height in pixels. `16` sits on the text line inside controls (Button,
     * IconButton, inputs); `20` for large controls and list rows; `24` for empty states, page headers
     * and stat tiles.
     */
    size?: IconSize;
    /**
     * Accessible name. Set it ONLY when the icon carries meaning on its own (no adjacent text names
     * it). When set the SVG gets `role="img"` and `aria-label`; when absent the icon is decorative
     * (`aria-hidden="true"`) and the surrounding control must carry the name.
     */
    label?: string;
    /**
     * The glyph: SVG shape nodes (`<path>`, `<circle>`, …) drawn on Lucide's 24×24 grid. Consumers
     * normally render a named glyph from `tenet-ui/icons` (`<SearchIcon />`) which supplies this.
     */
    children: ReactNode;
}
/** Props accepted by every generated glyph (`SearchIcon`, `PlusIcon`, …): `IconProps` without `children`. */
type IconGlyphProps = Omit<IconProps, 'children'>;

/**
 * Tenet icon primitive — the `<svg>` shell every glyph in `tenet-ui/icons` renders through. It fixes
 * the geometry (24×24 grid scaled to `size`), the Lucide stroke style (`currentColor`, round caps and
 * joins, stroke width 2) and the accessibility default: decorative (`aria-hidden`) unless you pass a
 * `label`, in which case it becomes `role="img"` with that name.
 *
 * Prefer the named glyphs (`<SearchIcon />`) over composing `Icon` directly; reach for `Icon` only to
 * wrap a one-off glyph that is not yet in the set. Color is inherited from the parent's `color`, so
 * icons follow the token the surrounding text uses.
 *
 * Stroke width is a constant 2 (Lucide's native weight) rather than thinned per size: the glyphs were
 * drawn for it, it scales optically with `size` (1.33px at 16, 2px at 24) and it matches what designers
 * see in Lucide's Figma library. Override `strokeWidth` per instance if a surface truly needs lighter.
 */
declare const Icon: react.ForwardRefExoticComponent<IconProps & react.RefAttributes<SVGSVGElement>>;

export { type IconGlyphProps as I, Icon as a, type IconProps as b, type IconSize as c };
