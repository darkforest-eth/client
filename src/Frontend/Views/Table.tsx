import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

const TableElement = styled.table`
  overflow-y: scroll;
  scrollbar-width: initial;
  border-radius: ${dfstyles.borderRadius};
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

/**
 * React api for creating tables.
 * @param rows - rows of an arbitrary type
 * @param headers - required (for now) array of strings that head each column
 * @param columns - functions, one per column, that convert a row into the react representation of
 * that row's column's value.
 * @param alignments - optional, one per column, specifies that the text-alignment in that cell is
 * either right, center, or left, represented by the characters 'r', 'c', and 'l'
 */
export function Table<T>({
  rows,
  headers,
  columns,
  alignments,
  headerStyle,
}: {
  rows: T[];
  headers: React.ReactNode[];
  columns: Array<(t: T, i: number) => React.ReactNode>;
  alignments?: Array<'r' | 'c' | 'l'>;
  headerStyle?: React.CSSProperties;
}) {
  return (
    <TableElement>
      <thead style={headerStyle}>
        <tr>
          {headers.map((h: string, colIdx: number) => (
            <th
              key={colIdx}
              style={(alignments && { textAlign: AlignmentOptions[alignments[colIdx]] }) || {}}
            >
              {h}
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
  );
}
