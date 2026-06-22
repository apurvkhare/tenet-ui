import { forwardRef, useState } from 'react';
import type { AvatarProps } from './Avatar.types';
import './Avatar.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/** Up to two initials from a name ("Avery Kim" -> "AK", "design-tokens" -> "D"). */
function initialsOf(name: string): string {
  const words = name.trim().split(/[\s-_]+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Tenet avatar — an image, or initials derived from `name` when there is no image (or it fails to
 * load). Always pass `name`: it drives the initials and the accessible label, so an avatar is never
 * an unlabelled blob to assistive tech.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, size = 'medium', shape = 'circle', className, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cx('Tenet-Avatar', `Tenet-Avatar--size-${size}`, `Tenet-Avatar--shape-${shape}`, className)}
      {...rest}
    >
      {showImage ? (
        <img src={src} alt="" className="Tenet-Avatar__img" onError={() => setFailed(true)} />
      ) : (
        <span className="Tenet-Avatar__initials" aria-hidden="true">
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
});
