import React, { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { Spacer } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';

const TableElement = styled.table`
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: initial;
  border-radius: ${dfstyles.borderRadius};
`;

const ScrollableBody = styled.tbody`
  width: 100%;
`;

const AlignmentOptions: { [key: string]: CSSProperties['textAlign'] } = {
  r: 'right',
  l: 'left',
  c: 'center',
};

const PaginationContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

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
  paginated,
}: {
  rows: T[];
  headers: React.ReactNode[];
  columns: Array<(t: T, i: number) => React.ReactNode>;
  alignments?: Array<'r' | 'c' | 'l'>;
  headerStyle?: React.CSSProperties;
  paginated?: boolean;
}) {
  const itemsPerPage = 10;
  const [page, setPage] = useState(0);
  const visibleRows = paginated
    ? rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
    : rows;

  return (
    <>
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
          {visibleRows.map((row: T, rowIdx: number) => (
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
      {paginated && rows.length > itemsPerPage && (
        <>
          <Spacer height={16} />
          <PaginationContainer>
            <div>
              <Btn onClick={() => setPage(Math.max(page - 1, 0))}>&lt;</Btn>
              <Spacer width={8} />
              Page: {page + 1} of {Math.floor(rows.length / itemsPerPage) + 1}
              <Spacer width={8} />
              <Btn
                onClick={() => setPage(Math.min(page + 1, Math.floor(rows.length / itemsPerPage)))}
              >
                &gt;
              </Btn>
            </div>
          </PaginationContainer>
        </>
      )}
    </>
  );
}
