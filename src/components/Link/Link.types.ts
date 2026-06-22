import type { AnchorHTMLAttributes } from 'react';

export type LinkUnderline = 'hover' | 'always' | 'none';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Use the muted foreground color instead of the accent color. */
  muted?: boolean;
  /** When the underline is shown. */
  underline?: LinkUnderline;
  /**
   * Marks the link as leading off-site: sets `target="_blank"` +
   * `rel="noopener noreferrer"` and appends a visually-hidden " (opens in new tab)"
   * warning for screen-reader users.
   */
  external?: boolean;
}
