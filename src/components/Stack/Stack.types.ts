import type { HTMLAttributes, ReactNode } from 'react';

export type StackDirection = 'horizontal' | 'vertical';
export type StackGap = 'none' | 'condensed' | 'normal' | 'spacious';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';
export type StackPadding = 'none' | 'condensed' | 'normal' | 'spacious';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Main-axis direction. */
  direction?: StackDirection;
  /** Space between children, from the `space` scale (condensed=8, normal=16, spacious=24). */
  gap?: StackGap;
  /** Cross-axis alignment (maps to `align-items`). */
  align?: StackAlign;
  /** Main-axis distribution (maps to `justify-content`). */
  justify?: StackJustify;
  /** Allow children to wrap onto multiple lines. */
  wrap?: boolean;
  /** Inner padding, from the `space` scale. */
  padding?: StackPadding;
  children?: ReactNode;
}

export interface StackItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Grow to fill the available space along the main axis. */
  grow?: boolean;
  children?: ReactNode;
}
