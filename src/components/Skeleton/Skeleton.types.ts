import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export type SkeletonRadius = 'small' | 'medium' | 'large' | 'full';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Shape of the placeholder. `text` mimics a line of copy, `rect` a block, `circle` an avatar/icon. */
  variant?: SkeletonVariant;
  /** Width applied inline (number → px, string → as-is, e.g. '60%'). */
  width?: string | number;
  /** Height applied inline (number → px, string → as-is). For `circle` it mirrors width. */
  height?: string | number;
  /** Corner radius token. `circle` always renders as `full` regardless of this prop. */
  radius?: SkeletonRadius;
}
