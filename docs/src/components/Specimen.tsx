// Home-page specimen sheet: real tenet-ui components, rendered on the server with the package's
// own stylesheet, so the first thing a visitor sees is the system itself rather than a picture of it.
import { Button, FormControl, ProgressBar, Switch, Tag, TextInput } from 'tenet-ui';

const SWATCHES = [
  { name: 'Clay', token: '--bgColor-accent-emphasis' },
  { name: 'Olive', token: '--bgColor-success-emphasis' },
  { name: 'Ochre', token: '--bgColor-attention-emphasis' },
  { name: 'Brick', token: '--bgColor-danger-emphasis' },
  { name: 'Ink', token: '--base-color-neutral-900' },
];

export function Specimen({ version }: { version: string }) {
  return (
    <figure className="tenet-specimen not-content" aria-label="Specimen of tenet-ui components">
      <figcaption className="tenet-specimen__head">
        <span>Editorial Ink</span>
        <span>tenet-ui@{version}</span>
      </figcaption>
      <div className="tenet-specimen__body">
        <div className="tenet-specimen__type">
          <span className="tenet-specimen__glyph" aria-hidden="true">
            Aa
          </span>
          <p>
            <strong>Iowan Old Style</strong>A serif for display, a humanist sans for reading, a mono for code.
          </p>
        </div>
        <ul className="tenet-specimen__swatches" aria-label="Accent and status hues">
          {SWATCHES.map((s) => (
            <li key={s.name}>
              <div className="tenet-specimen__swatch" style={{ background: `var(${s.token})` }} />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
        <div className="tenet-specimen__row">
          <Tag variant="success">Stable</Tag>
          <Tag variant="attention">Review</Tag>
          <Tag variant="danger">Overdue</Tag>
          <Tag variant="accent">Draft</Tag>
        </div>
        <div className="tenet-specimen__split">
          <FormControl>
            <FormControl.Label>Issue title</FormControl.Label>
            <TextInput defaultValue="Autumn issue" />
          </FormControl>
          <Switch label="Notify editors" defaultChecked />
        </div>
        <ProgressBar value={64} aria-label="Issue progress" />
        <div className="tenet-specimen__row">
          <Button variant="primary">Publish</Button>
          <Button>Save draft</Button>
          <Button variant="invisible">Cancel</Button>
        </div>
      </div>
    </figure>
  );
}
