// Live examples: the component's Storybook stories rendered as real React, exactly as Storybook
// would (portable stories via composeStories, so `render` functions, meta.args and story args all
// apply). Each example carries its own light/dark toggle (data-color-mode on the wrapper).
import { Component, useState, type ComponentType, type ReactNode } from 'react';
import { composeStories } from '@storybook/react-vite';

export interface CatalogStory {
  id: string;
  name: string;
  exportName: string;
}

interface Props {
  component: string;
  /** The story module namespace (`import * as stories from '…stories.tsx'`). */
  stories: Record<string, unknown>;
  /** Stories registered in generated/components.json, in catalog order. */
  catalog: CatalogStory[];
  storybookUrl: string;
}

type Mode = 'inherit' | 'light' | 'dark';

function ErrorBox({ error }: { error: unknown }) {
  return (
    <p className="tenet-example-error" role="alert">
      This example failed to render: {error instanceof Error ? error.message : String(error)}
    </p>
  );
}

function Example({ name, id, Story, storybookUrl }: { name: string; id: string; Story: ComponentType; storybookUrl: string }) {
  const [mode, setMode] = useState<Mode>('inherit');
  const [error, setError] = useState<unknown>(null);
  const modeAttr = mode === 'inherit' ? undefined : mode;
  return (
    <figure className="tenet-example" data-story-id={id}>
      <figcaption className="tenet-example__bar">
        <span className="tenet-example__name">{name}</span>
        <span className="tenet-example__controls">
          <span className="tenet-example__modes" role="group" aria-label={`Color mode for ${name}`}>
            {(['inherit', 'light', 'dark'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                className="tenet-example__mode"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
              >
                {m === 'inherit' ? 'Site' : m === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </span>
          <a className="tenet-example__link" href={`${storybookUrl}/?path=/story/${id}`} rel="noopener">
            Open in Storybook
          </a>
        </span>
      </figcaption>
      <div className="tenet-example__canvas" data-color-mode={modeAttr}>
        {error ? (
          <ErrorBox error={error} />
        ) : (
          <Boundary onError={setError}>
            <Story />
          </Boundary>
        )}
      </div>
    </figure>
  );
}

// Minimal error boundary so one broken story cannot blank the whole page.
class Boundary extends Component<{ children: ReactNode; onError: (e: unknown) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function StoryExamples({ component, stories, catalog, storybookUrl }: Props) {
  let composed: Record<string, ComponentType>;
  try {
    composed = composeStories(stories as never) as unknown as Record<string, ComponentType>;
  } catch (e) {
    return <ErrorBox error={e} />;
  }
  const items = catalog
    .map((s) => ({ ...s, Story: composed[s.exportName] }))
    .filter((s): s is CatalogStory & { Story: ComponentType } => typeof s.Story === 'function');
  if (items.length === 0) {
    return (
      <p className="tenet-muted">
        The stories registered for {component} are not exported by its story module; open them in{' '}
        <a href={storybookUrl}>Storybook</a>.
      </p>
    );
  }
  return (
    <div className="tenet-examples not-content">
      {items.map((s) => (
        <Example key={s.id} id={s.id} name={s.name} Story={s.Story} storybookUrl={storybookUrl} />
      ))}
    </div>
  );
}
