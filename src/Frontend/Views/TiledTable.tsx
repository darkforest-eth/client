import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { Spacer } from '../Components/CoreUI';
import { Row } from '../Components/Row';

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollableBody = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const PaginationContainer = styled.div`
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
export function TiledTable({
  items,
  paginated,
  rowsPerPage = 2,
  columnsPerPage = 3,
  title,
}: {
  items: React.ReactNode[];
  headerStyle?: React.CSSProperties;
  paginated?: boolean;
  rowsPerPage?: number;
  columnsPerPage?: number;
  title?: string | JSX.Element;
}) {
  const [page, setPage] = useState(0);

  const itemsPerPage = rowsPerPage * columnsPerPage;
  const visibleItems = useMemo(
    () =>
      createTable(
        paginated ? items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage) : items
      ),
    [page, items]
  );

  function createTable(items: React.ReactNode[]) {
    return _.chunk(items, columnsPerPage).map((row, colIdx) => {
      return (
        <Row key={`tiledTable-row-${colIdx}`}>
          {row.map((item, itemIdx) => (
            <React.Fragment key={`tiled-Table-item-${colIdx}-${itemIdx}`}>{item}</React.Fragment>
          ))}
        </Row>
      );
    });
  }

  return (
    <TableContainer>
      <Row>
        <span>{title}</span>
        {paginated && items.length > itemsPerPage && (
          <>
            <Spacer height={16} />
            <PaginationContainer>
              <div>
                <Btn onClick={() => setPage(Math.max(page - 1, 0))}>&lt;</Btn>
                <Spacer width={8} />
                Page: {page + 1} of {Math.floor(items.length / itemsPerPage) + 1}
                <Spacer width={8} />
                <Btn
                  onClick={() =>
                    setPage(Math.min(page + 1, Math.floor(items.length / itemsPerPage)))
                  }
                >
                  &gt;
                </Btn>
              </div>
            </PaginationContainer>
          </>
        )}
      </Row>
      <ScrollableBody>{visibleItems}</ScrollableBody>
    </TableContainer>
  );
}
