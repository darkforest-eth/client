import { h, Component } from 'preact'
import { Table as DFTable } from '../../src/Frontend/Views/Table';

// export function Table<T>({
//   rows,
//   headers,
//   columns,
//   alignments,
//   headerStyle,
// }: {
//   rows: T[];
//   headers: React.ReactNode[];
//   columns: Array<(t: T, i: number) => React.ReactNode>;
//   alignments?: Array<'r' | 'c' | 'l'>;
//   headerStyle?: React.CSSProperties;
// }) {
//   return <DFTable rows={rows} headers={headers} columns={columns} alignments={alignments} headerStyle={headerStyle} />
// }

export class Table extends Component
{
  render(props, state) {
    return <div>Hello world</div>
  }
}
