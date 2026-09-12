// An "existing UI" written without the design system in mind. Every construct below is
// something the tenet-ui ESLint rules should catch. Used by `npm run demo`.
import * as React from 'react';
import styled from 'styled-components';
import { Button, TextInput, Label, Card, Stack } from 'tenet-ui';

const Panel = styled.div`
  background: #ffffff;
  border: 1px solid #ddd2bf;
  border-radius: 6px;
  padding: 20px;
`;

const heading: React.CSSProperties = { fontSize: '22px', color: '#2a241b', marginBottom: 12 };

export function Newsroom({ onSave }: { onSave: () => void }) {
  return (
    <Panel>
      <h1 style={heading}>Newsroom</h1>
      <Stack gap="var(--space-3)">
        <Label variant="accent">Draft</Label>
        <TextInput block placeholder="Headline" />
        <Card style={{ padding: 12, background: 'rgb(244, 238, 227)', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}>
          <p style={{ color: 'var(--fgColor-mutted)', margin: '0 0 8px' }}>Last edited 2 minutes ago</p>
          <table>
            <tbody>
              <tr>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid gray' }}>Story</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <input type="checkbox" /> Notify subscribers
        <a href="/drafts">All drafts</a>
        <button onClick={onSave} style={{ background: '#c2502e', color: 'white', borderRadius: 5 }}>
          Save
        </button>
        <Button block variant="primary" onClick={onSave}>Publish</Button>
      </Stack>
    </Panel>
  );
}
