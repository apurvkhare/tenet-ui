import type { HTMLAttributes } from 'react';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarShape = 'circle' | 'rounded';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Image URL. When omitted (or it fails to load), initials from `name` are shown. */
  src?: string;
  /** Person/entity name — used for initials and as the accessible label. */
  name: string;
  /** Size from the scale. */
  size?: AvatarSize;
  /** Circle (people) or rounded square (orgs/repos). */
  shape?: AvatarShape;
}
