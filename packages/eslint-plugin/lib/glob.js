// Tiny dependency-free glob matcher: supports `**`, `*`, `?`, `{a,b}` and character classes.
// Matches against forward-slash paths; a pattern without a slash matches the basename.
const cache = new Map();

export function globToRegExp(glob) {
  if (cache.has(glob)) return cache.get(glob);
  let re = '';
  let i = 0;
  const g = glob.replace(/\\/g, '/');
  while (i < g.length) {
    const c = g[i];
    if (c === '*') {
      if (g[i + 1] === '*') {
        // `**/` matches zero or more path segments; trailing `**` matches anything.
        if (g[i + 2] === '/') {
          re += '(?:.*/)?';
          i += 3;
        } else {
          re += '.*';
          i += 2;
        }
      } else {
        re += '[^/]*';
        i += 1;
      }
    } else if (c === '?') {
      re += '[^/]';
      i += 1;
    } else if (c === '{') {
      const end = g.indexOf('}', i);
      if (end === -1) {
        re += '\\{';
        i += 1;
      } else {
        const alts = g.slice(i + 1, end).split(',').map((a) => globToRegExp(a).source.slice(1, -1));
        re += `(?:${alts.join('|')})`;
        i = end + 1;
      }
    } else if (c === '[') {
      const end = g.indexOf(']', i);
      if (end === -1) {
        re += '\\[';
        i += 1;
      } else {
        re += g.slice(i, end + 1);
        i = end + 1;
      }
    } else {
      re += /[.+^$()|\\]/.test(c) ? `\\${c}` : c;
      i += 1;
    }
  }
  const out = new RegExp(`^${re}$`);
  cache.set(glob, out);
  return out;
}

export function matchesGlob(filePath, glob) {
  const p = String(filePath).replace(/\\/g, '/');
  const re = globToRegExp(glob);
  if (re.test(p)) return true;
  if (!glob.includes('/')) return re.test(p.slice(p.lastIndexOf('/') + 1));
  return false;
}

export function matchesAny(filePath, globs) {
  return (globs || []).some((g) => matchesGlob(filePath, g));
}
