// Forms: the anatomy of a form built the way the rules describe, annotated part by part.
import { Banner, Button, Checkbox, FormControl, Grid, Stack, TextInput } from 'tenet-ui';

const PARTS = [
  'Form-level error: a danger Banner above the fields',
  'Visible label, with required set on the FormControl',
  'One field per FormControl, filling its column',
  'Caption for instructions, never the placeholder',
  'Field error inside its own FormControl',
  'Checkbox carries its own label and caption',
  'One row of actions, a single primary, verb plus object',
];

// Marks sit outside FormControl: it wires its direct children, so nothing may wrap them.
const Mark = ({ n, top }: { n: number; top?: string }) => (
  <span className="tenet-anno__mark" aria-hidden="true" style={top ? { top } : undefined}>
    {n}
  </span>
);

export function FormsFigure() {
  return (
    <div className="tenet-anatomy">
      <div className="tenet-anatomy__stage">
        <form onSubmit={(e) => e.preventDefault()} aria-label="Example story form">
          <Stack gap="normal">
            <div className="tenet-anno">
              <Mark n={1} />
              <Banner variant="danger" title="Could not save the story">
                The server did not respond. Try again in a few minutes.
              </Banner>
            </div>
            <div className="tenet-anno">
              <Mark n={2} />
              <Mark n={3} top="2rem" />
              <Mark n={4} top="4.05rem" />
              <FormControl required>
                <FormControl.Label>Headline</FormControl.Label>
                <TextInput name="headline" defaultValue="Field notes from the coast" fullWidth />
                <FormControl.Caption>Shown in search results and social previews.</FormControl.Caption>
              </FormControl>
            </div>
            <div className="tenet-anno">
              <Mark n={5} top="4.6rem" />
              <Grid columns={{ base: 1, sm: 2 }} gap="normal">
                <FormControl required>
                  <FormControl.Label>Author email</FormControl.Label>
                  <TextInput name="email" type="email" defaultValue="desk@" fullWidth />
                  <FormControl.Validation variant="error">Enter a valid email address.</FormControl.Validation>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Section</FormControl.Label>
                  <TextInput name="section" defaultValue="Travel" fullWidth />
                </FormControl>
              </Grid>
            </div>
            <div className="tenet-anno">
              <Mark n={6} />
              <Checkbox name="notify" label="Notify subscribers" caption="Sends the daily digest early." />
            </div>
            <div className="tenet-anno">
              <Mark n={7} />
              <Stack direction="horizontal" gap="condensed">
                <Button variant="invisible" type="button">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Stack>
            </div>
          </Stack>
        </form>
      </div>
      <ol className="tenet-anatomy__legend">
        {PARTS.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
    </div>
  );
}
