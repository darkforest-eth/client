import React, { CSSProperties } from 'react';
import { h, Component } from 'preact'
import styled from 'styled-components';

const TableStyle = {
  width: '100%'
}

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
    return (
      <table style={TableStyle}>
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

        <tbody>
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
        </tbody>
      </table>
    )
  }
}
