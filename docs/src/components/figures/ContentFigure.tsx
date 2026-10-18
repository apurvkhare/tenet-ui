// Content: microcopy in place, using the slot patterns and examples from the page.
import { Button, FormControl, Tag, TextInput } from 'tenet-ui';

export function ContentFigure() {
  return (
    <div className="tenet-copy">
      <div className="tenet-copy__item">
        <div className="tenet-copy__stage">
          <Button variant="invisible">Keep draft</Button>
          <Button variant="primary">Create story</Button>
        </div>
        <p className="tenet-copy__slot">Buttons</p>
        <p className="tenet-copy__rule">Verb plus object. Cancel or “Keep” plus the object.</p>
      </div>
      <div className="tenet-copy__item">
        <div className="tenet-copy__stage">
          <Button variant="danger">Delete article</Button>
        </div>
        <p className="tenet-copy__slot">Destructive action</p>
        <p className="tenet-copy__rule">Names the object. No “Confirm”, no “Yes”.</p>
      </div>
      <div className="tenet-copy__item">
        <div className="tenet-copy__stage tenet-copy__stage--field">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <TextInput type="email" defaultValue="desk@" fullWidth />
            <FormControl.Validation variant="error">Enter a valid email address.</FormControl.Validation>
          </FormControl>
        </div>
        <p className="tenet-copy__slot">Field error</p>
        <p className="tenet-copy__rule">Direct, no blame, says the fix.</p>
      </div>
      <div className="tenet-copy__item">
        <div className="tenet-copy__stage">
          <Tag variant="success">Published</Tag>
          <Tag variant="attention">In review</Tag>
        </div>
        <p className="tenet-copy__slot">Status words</p>
        <p className="tenet-copy__rule">Sentence case, written as read; the component owns the style.</p>
      </div>
    </div>
  );
}
