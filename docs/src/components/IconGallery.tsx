// Searchable icon gallery (client-side filter by name / keyword / category).
import { useMemo, useState, type ComponentType } from 'react';
import manifest from '../generated/icons.json';
import { icons as packageIcons, mode as glyphMode } from '../generated/icon-glyphs';

interface IconEntry {
  name: string;
  component?: string;
  source?: string;
  category: string;
  keywords: string[];
  svg?: string;
}
const data = manifest as { importPath: string; sizes: unknown; glyphMode: string; icons: IconEntry[] };

function Glyph({ icon }: { icon: IconEntry }) {
  if (glyphMode === 'package' && icon.component) {
    const Cmp = (packageIcons as Record<string, ComponentType<{ size?: number; 'aria-hidden'?: boolean }>>)[icon.component];
    if (Cmp) return <Cmp aria-hidden />;
  }
  if (icon.svg) return <span className="tenet-icon__svg" aria-hidden dangerouslySetInnerHTML={{ __html: icon.svg }} />;
  return <span className="tenet-icon__svg tenet-muted" aria-hidden>?</span>;
}

export default function IconGallery() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  const categories = useMemo(() => ['all', ...Array.from(new Set(data.icons.map((i) => i.category))).sort()], []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.icons.filter((i) => {
      if (category !== 'all' && i.category !== category) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        (i.component ?? '').toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const copy = async (icon: IconEntry) => {
    const text = `import { ${icon.component ?? icon.name} } from '${data.importPath}';`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(icon.name);
      setTimeout(() => setCopied((c) => (c === icon.name ? null : c)), 1500);
    } catch {
      /* clipboard unavailable; the import is visible in the tooltip */
    }
  };

  return (
    <div className="tenet-icon-gallery not-content">
      <div className="tenet-icon-gallery__controls">
        <label>
          <span className="sr-only">Search icons</span>
          <input
            type="search"
            placeholder={`Search ${data.icons.length} icons by name, keyword or category`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </label>
        <span className="tenet-muted" aria-live="polite">
          {filtered.length} of {data.icons.length}
        </span>
      </div>
      {filtered.length === 0 ? (
        <p className="tenet-muted">No icons match “{query}”.</p>
      ) : (
        <ul className="tenet-icon-grid">
          {filtered.map((icon) => (
            <li key={icon.name}>
              <button
                type="button"
                className="tenet-icon"
                onClick={() => copy(icon)}
                title={`import { ${icon.component ?? icon.name} } from '${data.importPath}'`}
              >
                <Glyph icon={icon} />
                <span className="tenet-icon__name">{copied === icon.name ? 'Copied import' : icon.name}</span>
                <span className="tenet-icon__meta">{icon.component}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
