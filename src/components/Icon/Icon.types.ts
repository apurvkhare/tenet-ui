import type { ReactNode, SVGAttributes } from 'react';

/** Rendered size in CSS pixels. The glyph is always drawn on a 24×24 grid and scaled. */
export type IconSize = 16 | 20 | 24;

/**
 * Props of the generic `Icon` wrapper. `width`, `height` and `viewBox` are owned by `size` so every
 * icon in the system shares the same geometry; `children` are the glyph's SVG shape nodes.
 */
export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height' | 'viewBox'> {
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
export type IconGlyphProps = Omit<IconProps, 'children'>;
