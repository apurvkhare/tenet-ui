// Theming figure body: the same components twice, once per data-color-mode, rendered in one React
// tree so the generated field ids stay unique.
import { Button, FormControl, Tag, Text, TextInput } from 'tenet-ui';

export interface TokenPair {
  name: string;
  light: string;
  dark: string;
}

export function ThemePanels({ pairs }: { pairs: TokenPair[] }) {
  return (
    <div className="tenet-figure__grid">
      {(['light', 'dark'] as const).map((mode) => (
        <div key={mode} className="tenet-theme-panel" data-color-mode={mode}>
          <p className="tenet-figure__kicker">data-color-mode="{mode}"</p>
          <div className="tenet-theme-panel__card">
            <div className="tenet-theme-panel__row">
              <Text weight="semibold">Autumn issue</Text>
              <Tag variant="success">Published</Tag>
            </div>
            <Text tone="muted" size="small">
              Updated 3 minutes ago
            </Text>
            <FormControl>
              <FormControl.Label>Headline</FormControl.Label>
              <TextInput defaultValue="Field notes" fullWidth />
            </FormControl>
            <div className="tenet-theme-panel__row tenet-theme-panel__row--end">
              <Button variant="invisible">Cancel</Button>
              <Button variant="primary">Save changes</Button>
            </div>
          </div>
          <dl className="tenet-theme-panel__vals">
            {pairs.map((p) => (
              <div key={p.name}>
                <dt>
                  <span className="tenet-chain__swatch" style={{ background: mode === 'light' ? p.light : p.dark }} />
                  --{p.name}
                </dt>
                <dd>{mode === 'light' ? p.light : p.dark}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
