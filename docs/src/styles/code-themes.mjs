// Syntax themes for code blocks (Expressive Code), drawn from the Editorial Ink palette: ink for
// code, clay for keywords and tags, olive for strings, ochre for literals, muted ink for comments.
// Values mirror tenet-ui's base color tokens (tokens/tokens.json); Expressive Code needs literal
// colors because it pre-computes contrast at build time.

function theme({ name, type, c }) {
  return {
    name,
    type,
    colors: {
      'editor.background': c.bg,
      'editor.foreground': c.fg,
      'editor.selectionBackground': c.selection,
      'editorGroupHeader.tabsBackground': c.chrome,
      'editorGroupHeader.tabsBorder': c.border,
      'tab.activeBackground': c.bg,
      'tab.activeForeground': c.fg,
      'tab.inactiveForeground': c.muted,
      'tab.activeBorderTop': c.keyword,
      'tab.border': c.border,
      'titleBar.activeBackground': c.chrome,
      'titleBar.activeForeground': c.muted,
      'titleBar.border': c.border,
      'terminal.background': c.bg,
      'terminal.foreground': c.fg,
      focusBorder: c.border,
      'editorLineNumber.foreground': c.muted,
    },
    tokenColors: [
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.muted, fontStyle: 'italic' } },
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control'],
        settings: { foreground: c.keyword },
      },
      { scope: ['keyword.operator', 'punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: c.muted } },
      { scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'], settings: { foreground: c.string } },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant', 'variable.other.constant'],
        settings: { foreground: c.literal },
      },
      { scope: ['entity.name.tag', 'support.class.component', 'entity.name.tag.tsx'], settings: { foreground: c.keyword } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: c.attr, fontStyle: 'italic' } },
      { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: c.fg } },
      {
        scope: ['entity.name.type', 'support.type', 'entity.name.class', 'entity.other.inherited-class'],
        settings: { foreground: c.type },
      },
      { scope: ['variable', 'variable.other', 'meta.object-literal.key'], settings: { foreground: c.fg } },
      { scope: ['support.type.property-name', 'meta.property-name'], settings: { foreground: c.attr } },
      { scope: ['support.type.property-name.css', 'support.type.vendored.property-name.css'], settings: { foreground: c.type } },
      { scope: ['variable.css', 'variable.argument.css', 'support.type.custom-property'], settings: { foreground: c.keyword } },
      { scope: ['markup.inserted'], settings: { foreground: c.string } },
      { scope: ['markup.deleted'], settings: { foreground: c.keyword } },
    ],
  };
}

export const editorialInkLight = theme({
  name: 'editorial-ink-light',
  type: 'light',
  c: {
    bg: '#fbf7f0', // neutral-50
    chrome: '#f4eee3', // neutral-100
    border: '#ddd2bf', // neutral-300
    selection: '#f5e4db',
    fg: '#2a241b', // neutral-900
    muted: '#6e6049', // neutral-650
    keyword: '#a23e1f', // clay-600
    string: '#3c5630', // olive-600
    literal: '#80600f', // ochre-600
    attr: '#574b39', // neutral-700
    type: '#3d3528', // neutral-800
  },
});

export const editorialInkDark = theme({
  name: 'editorial-ink-dark',
  type: 'dark',
  c: {
    bg: '#14110d', // neutral-1000
    chrome: '#211d17', // neutral-950
    border: '#3d3528', // neutral-800
    selection: '#3a2117',
    fg: '#f4eee3', // neutral-100
    muted: '#a1927a', // neutral-500
    keyword: '#e9a487', // clay-300
    string: '#9cb87a', // olive-300
    literal: '#dcc06a', // ochre-300
    attr: '#c7b9a1', // neutral-400
    type: '#ddd2bf', // neutral-300
  },
});
