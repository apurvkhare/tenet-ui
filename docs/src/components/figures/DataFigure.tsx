// Data display: a small table using the components the page settles on, each where it belongs.
import { Badge, ProgressBar, Skeleton, Table, Tag } from 'tenet-ui';

const rows = [
  { story: 'Field notes from the coast', section: 'Travel', status: 'Published', variant: 'success' as const, reads: 12840 },
  { story: 'The quiet return of letterpress', section: 'Culture', status: 'In review', variant: 'attention' as const, reads: 0 },
  { story: 'A week without a phone', section: 'Essays', status: 'Blocked', variant: 'danger' as const, reads: 0 },
];

export function DataFigure() {
  return (
    <div className="tenet-datafig">
      <Table.Container>
        <div className="tenet-datafig__title">
          Stories <Badge count={3} />
        </div>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>Story</Table.Header>
              <Table.Header>Section</Table.Header>
              <Table.Header>Status</Table.Header>
              <Table.Header align="end">Reads</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.map((r) => (
              <Table.Row key={r.story}>
                <Table.Cell>{r.story}</Table.Cell>
                <Table.Cell>
                  <Tag>{r.section}</Tag>
                </Table.Cell>
                <Table.Cell>
                  <Tag variant={r.variant}>{r.status}</Tag>
                </Table.Cell>
                <Table.Cell align="end">{r.reads ? r.reads.toLocaleString('en') : '0'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Container>
      <div className="tenet-datafig__loading">
        <div>
          <Skeleton width="70%" height={12} />
          <Skeleton width="45%" height={12} />
          <span className="tenet-datafig__cap">Skeleton: known layout, loading</span>
        </div>
        <div>
          <ProgressBar value={42} aria-label="Import progress" />
          <span className="tenet-datafig__cap">ProgressBar: a measurable job</span>
        </div>
      </div>
    </div>
  );
}
