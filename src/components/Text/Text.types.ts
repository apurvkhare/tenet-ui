import type { HTMLAttributes, ReactNode } from 'react';

/** Element rendered. Block copy is a `p`; inline runs are `span`/`strong`/`em`; `label` for form captions. */
export type TextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
/** Body type scale: small → `fontSize-0` (12), medium → `fontSize-1` (14), large → `fontSize-2` (16). */
export type TextSize = 'small' | 'medium' | 'large';
/** Semantic color, mapped to the `fgColor-*` tokens. */
export type TextTone = 'default' | 'muted' | 'accent' | 'success' | 'danger' | 'attention';
export type TextWeight = 'normal' | 'medium' | 'semibold';
export type TextAlign = 'start' | 'center' | 'end';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. */
  as?: TextElement;
  /** Size on the body type scale (small=12, medium=14, large=16). */
  size?: TextSize;
  /** Semantic color: `muted` for secondary copy, status tones for validation and state messages. */
  tone?: TextTone;
  /** Font weight. */
  weight?: TextWeight;
  /** Clip overflowing text to a single line with an ellipsis. */
  truncate?: boolean;
  /** Horizontal text alignment (logical: `start`/`end` follow writing direction). */
  align?: TextAlign;
  /** Associates the text with a form control; only meaningful with `as="label"`. */
  htmlFor?: string;
  /** Text content. */
  children?: ReactNode;
}
