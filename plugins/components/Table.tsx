import React, { CSSProperties } from 'react';
import { h, Component } from 'preact'
import styled from 'styled-components';

const TableElement = styled.table`
  overflow-y: scroll;
  scrollbar-width: initial;
  width: 100%;
`;

const ScrollableBody = styled.tbody`
  width: 100%;
  max-height: 400px;
`;

const AlignmentOptions: { [key: string]: CSSProperties['textAlign'] } = {
  r: 'right',
  l: 'left',
  c: 'center',
};

export class Table<T> extends Component
{
  render({
    rows,
    headers,
    columns,
    alignments,
    headerStyle,
  }: {
    rows: T[];
    headers: string[];
    columns: Array<(t: T, i: number) => React.ReactNode>;
    alignments?: Array<'r' | 'c' | 'l'>;
    headerStyle?: React.CSSProperties;
  }, state: any) {
    console.log(headers)
    return (
      <TableElement>
        <thead style={headerStyle}>
          <tr>
            {headers.map((txt: string, colIdx: number) => (
              <th
                key={colIdx}
                style={(alignments && { textAlign: AlignmentOptions[alignments[colIdx]] }) || {}}
              >
                {txt}
              </th>
            ))}
          </tr>
        </thead>

        <ScrollableBody>
          {rows.map((row: T, rowIdx: number) => (
            <tr key={rowIdx}>
              {columns.map((column, colIdx) => (
                <td
                  key={colIdx}
                  style={(alignments && { textAlign: AlignmentOptions[alignments[colIdx]] }) || {}}
                >
                  {column(row, rowIdx)}
                </td>
              ))}
            </tr>
          ))}
        </ScrollableBody>
      </TableElement>
    )
  }
}
