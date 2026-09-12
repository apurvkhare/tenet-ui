// Colour detection + normalisation to a #rrggbb key so raw values can be matched to tokens.
export const NAMED_COLORS = {
  aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff',
  beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff',
  blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00',
  chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c',
  cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9',
  darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f',
  darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b', darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1',
  darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969',
  dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080',
  green: '#008000', greenyellow: '#adff2f', grey: '#808080', honeydew: '#f0fff0', hotpink: '#ff69b4',
  indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa',
  lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080',
  lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3', lightgreen: '#90ee90', lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategray: '#778899',
  lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32',
  linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd',
  mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc', mediumvioletred: '#c71585', midnightblue: '#191970',
  mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080',
  oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500', orangered: '#ff4500',
  orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee', palevioletred: '#db7093',
  papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd',
  powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399', red: '#ff0000', rosybrown: '#bc8f8f',
  royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460', seagreen: '#2e8b57',
  seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd',
  slategray: '#708090', slategrey: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4',
  tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee',
  wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32',
};

const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/g;
const FUNCTIONAL = /\b(rgba?|hsla?)\(\s*([^()]*)\)/g;
// A named colour has to sit where a CSS value would: after start/space/colon/comma/paren, before end/space/;/,/)/!.
const NAMED = new RegExp(`(^|[\\s:,(])(${Object.keys(NAMED_COLORS).join('|')})(?=$|[\\s;,)!'"\`])`, 'gi');

/**
 * Find raw colours in a string. Returns [{ raw, index, kind, key }], where `key` is the
 * normalised #rrggbb (or the whitespace-stripped functional form when not convertible).
 */
export function findColors(text) {
  const out = [];
  for (const m of text.matchAll(HEX)) out.push({ raw: m[0], index: m.index, kind: 'hex', key: normalizeColor(m[0]) });
  for (const m of text.matchAll(FUNCTIONAL)) {
    out.push({ raw: m[0], index: m.index, kind: m[1], key: functionalToKey(m[1], m[2]) ?? normalizeColor(m[0]) });
  }
  for (const m of text.matchAll(NAMED)) {
    const name = m[2].toLowerCase();
    out.push({ raw: m[2], index: m.index + m[1].length, kind: 'named', key: NAMED_COLORS[name] });
  }
  return out.sort((a, b) => a.index - b.index);
}

export function normalizeColor(v) {
  let s = String(v).trim().toLowerCase().replace(/\s+/g, '');
  const m = /^#([0-9a-f]{3,8})$/.exec(s);
  if (m) {
    let hex = m[1];
    if (hex.length === 3 || hex.length === 4) hex = hex.split('').map((c) => c + c).join('');
    if (hex.length === 8 && hex.endsWith('ff')) hex = hex.slice(0, 6);
    return `#${hex}`;
  }
  if (NAMED_COLORS[s]) return NAMED_COLORS[s];
  return s;
}

const toHex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

function functionalToKey(fn, args) {
  const parts = args.split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const num = (s, max) => {
    if (s.endsWith('%')) return (parseFloat(s) / 100) * max;
    return parseFloat(s);
  };
  const alpha = parts[3] !== undefined ? (parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3])) : 1;
  if (Number.isNaN(alpha)) return null;
  let r, g, b;
  if (fn.startsWith('rgb')) {
    [r, g, b] = [num(parts[0], 255), num(parts[1], 255), num(parts[2], 255)];
  } else {
    const h = ((parseFloat(parts[0]) % 360) + 360) % 360;
    const s = num(parts[1], 1) / (parts[1].endsWith('%') ? 1 : 100);
    const l = num(parts[2], 1) / (parts[2].endsWith('%') ? 1 : 100);
    [r, g, b] = hslToRgb(h, s, l);
  }
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  if (alpha < 1) {
    // Keep alpha colours comparable to token values like `rgba(20, 17, 13, 0.5)`.
    return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha})`;
  }
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/** Which semantic colour family a CSS property belongs to. */
export function colorFamilyFor(prop) {
  if (!prop) return null;
  const p = String(prop).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (/^(background|backgroundColor|backgroundImage|bg)$/.test(p) || /^background/.test(p)) return 'bgColor';
  if (/^(color|caretColor|fill|stroke|textDecorationColor|textEmphasisColor|columnRuleColor)$/.test(p)) return 'fgColor';
  if (/^(border|outline)/.test(p) || /Border|Outline/.test(p)) return 'borderColor';
  if (/^(boxShadow|textShadow|filter)$/.test(p)) return 'shadow';
  return null;
}
