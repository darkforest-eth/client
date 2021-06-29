import React, { ChangeEvent } from 'react';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const Underline = styled.span`
  text-decoration: underline;
`;

export const Spacer = styled.div`
  ${({ width, height }: { width?: number; height?: number }) => css`
    width: 1px;
    height: 1px;
    ${width && !height ? 'display: inline-block;' : ''}
    ${width ? `width: ${width}px;` : ''}
    ${height ? `height: ${height}px;min-height:${height}px;` : ''}
  `}
`;

export const Truncate = styled.div`
  ${({ maxWidth }: { maxWidth?: string }) => css`
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${maxWidth !== undefined && `max-width: ${maxWidth};`};
  `}
`;

/**
 * The container element into which a plugin renders its html elements.
 * Contains styles for child elements so that plugins can use UI
 * that is consistent with the rest of Dark Forest's UI. Keeping this up
 * to date will be an ongoing challange, but there's probably some better
 * way to do this.
 */
export const PluginElements = styled.div`
  color: white;
  width: 400px;
  min-height: 100px;
  max-height: 600px;
  overflow: scroll;

  button {
    border: 1px solid white;
    border-radius: 4px;
    padding: 0 0.3em;

    transition: background-color 0.2s colors 0.2s;

    &:hover {
      background-color: white;
      color: black;
      border: 1px transparent;
    }
  }
`;

export const MaxWidth = styled.div`
  ${({ width }: { width: string }) => {
    return css`
      max-width: ${width};
    `;
  }}
`;

export const Hidden = styled.div`
  display: none;
`;

export const Select = styled.select`
  transition: background-color 0.2s, color 0.2s, width 0.2s !important;
  outline: none;
  background: ${dfstyles.colors.background};
  color: ${dfstyles.colors.subtext};
  border-radius: 4px;
  border: 1px solid ${dfstyles.colors.text};
  width: 12em;
  padding: 2px 6px;

  &:focus {
    background: ${dfstyles.colors.backgroundlight};
    color: ${dfstyles.colors.text};
  }
`;

/**
 * Controllable input that allows the user to select from one of the
 * given string values.
 */
export function SelectFrom({
  values,
  value,
  setValue,
  labels,
  style,
}: {
  values: string[];
  value: string;
  setValue: (value: string) => void;
  labels: string[];
  style?: React.CSSProperties;
}) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const copyOfValues = [...values];
  const copyOfLabels = [...labels];

  if (!copyOfValues.includes(value)) {
    copyOfLabels.push(value);
    copyOfValues.push(value);
  }

  return (
    <Select style={style} value={value} onChange={onChange}>
      {copyOfValues.map((value, i) => {
        return (
          <option key={value} value={value}>
            {copyOfLabels[i]}
          </option>
        );
      })}
    </Select>
  );
}

export const HoverableTooltip = styled.div`
  max-width: 400px;
  background-color: ${dfstyles.colors.blueBackground};
  border: 1px solid white;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 12px;
`;

export const CenterRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

/**
 * A box which centers some darkened text. Useful for displaying
 * *somthing* instead of empty space, if there isn't something to
 * be displayed. Think of it as a placeholder.
 */
export const CenterBackgroundSubtext = styled.div`
  ${({ width, height }: { width: string; height: string }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${dfstyles.colors.subtext};
    width: ${width};
    height: ${height};
    user-select: none;
    text-align: center;
  `}
`;
