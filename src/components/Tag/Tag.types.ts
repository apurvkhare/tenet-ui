import type { HTMLAttributes, ReactNode } from 'react';

export type TagVariant = 'default' | 'accent' | 'success' | 'danger' | 'attention' | 'muted';
export type TagSize = 'small' | 'medium';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic color scheme. Pick by meaning, never by raw color: `accent` for an active/selected token,
   * `success` / `danger` / `attention` for status words, `muted` for a quiet neutral, `default` otherwise.
   */
  variant?: TagVariant;
  /** Tag size. */
  size?: TagSize;
  /** Optional leading icon rendered before the label; decorative (aria-hidden). */
  leadingIcon?: ReactNode;
  /** The tag label content. */
  children?: ReactNode;
  /**
   * When provided, renders a real remove button. Wire it to drop the tag from your collection.
   * Tag does not remove itself — it has no internal state.
   */
  onRemove?: () => void;
  /**
   * Accessible label for the remove button when `children` is not a plain string.
   * Falls back to the string children, otherwise "Remove".
   */
  removeLabel?: string;
}
