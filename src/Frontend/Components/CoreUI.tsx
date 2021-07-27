import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import colors from 'color';
import React, { ChangeEvent, useCallback } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { GameWindowZIndex } from '../Utils/constants';

export const InlineBlock = styled.div`
  display: inline-block;
`;

export const FloatRight = styled.div`
  float: right;
`;

export const TextButton = styled.span`
  color: ${dfstyles.colors.subtext};
  cursor: pointer;
  user-select: none;
  text-decoration: underline;

  &:hover {
    color: white;
  }
`;

export const Padded = styled.div`
  ${({
    left,
    top,
    right,
    bottom,
  }: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  }) => css`
    padding-left: ${left || '8px'};
    padding-top: ${top || '8px'};
    padding-right: ${right || '8px'};
    padding-bottom: ${bottom || '8px'};
  `}
`;

export const PaddedRecommendedModalWidth = styled(Padded)`
  width: ${RECOMMENDED_MODAL_WIDTH};
`;

export const RecommendedModalWidth = styled.div`
  width: ${RECOMMENDED_MODAL_WIDTH};
`;

export const BorderlessPane = styled.div`
  transition: '200ms';
  display: inline-block;
  z-index: ${GameWindowZIndex.MenuBar};
  margin: 8px;
  padding: 8px;
  border-radius: ${dfstyles.borderRadius};
  background-color: ${dfstyles.colors.background};
  border-radius: ${dfstyles.borderRadius};
  background-color: ${dfstyles.colors.background};
`;

export const Underline = styled.span`
  text-decoration: underline;
`;

export const Display = styled.div`
  ${({ visible }: { visible?: boolean }) => css`
    ${!visible && `display: none;`}
  `}
`;

export const Emphasized = styled.span`
  font-weight: bold;
  color: ${dfstyles.colors.subtext};
`;

export const HeaderText = styled.div`
  color: ${dfstyles.colors.text};
  text-decoration: underline;
  font-weight: bold;
  display: inline;
`;

export const SectionHeader = styled(HeaderText)`
  margin-bottom: 16px;
  display: block;
`;

export const Section = styled.div`
  padding: 1em 0;

  &:first-child {
    margin-top: -8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const VerticalSplit = function ({
  children,
}: {
  children: [React.ReactNode, React.ReactNode];
}) {
  return (
    <FullWidth>
      <VerticalSplitChild>{children[0]}</VerticalSplitChild>
      <VerticalSplitChild>{children[1]}</VerticalSplitChild>
    </FullWidth>
  );
};

const VerticalSplitChild = styled.div`
  width: 50%;
  flex-grow: 1;
  display: inline-block;
`;

export const FullWidth = styled.div`
  ${({ padding }: { padding?: string }) =>
    css`
      ${padding && `padding: ${padding};`}
      width: 100%;
      display: flex;
      box-sizing: border-box;
      flex-direction: row;
    `}
`;

export const FullHeight = styled.div`
  height: 100%;
`;

export const HorizontalFlex = styled.div`
  ${({ justifyContent }: { justifyContent?: string }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${justifyContent || 'center'};
    align-items: center;
  `}
`;

export const VerticalFlex = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Expand = styled.div`
  display: inline-box;
  flex-grow: 1;
`;

export const DontShrink = styled.div`
  display: inline-box;
  flex-shrink: 0;
`;

export function Link({
  to,
  color,
  openInNewTab,
  children,
}: {
  to: string;
  color?: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
}) {
  return (
    <HoverLink href={to} color={color} target={openInNewTab ? '_blank' : undefined}>
      {children}
    </HoverLink>
  );
}

export const HoverLink = styled.a`
  ${({ color }: { color?: string }) => css`
    text-decoration: underline;
    color: ${color || dfstyles.colors.dfpurple};
  }

    &:hover {
      color: ${colors(color || dfstyles.colors.dfpurple)
        .lighten(0.3)
        .hex()};
    }
  `}
`;

export const EmSpacer = styled.div`
  ${({ width, height }: { width?: number; height?: number }) => css`
    width: 1px;
    height: 1px;
    ${width && !height ? 'display: inline-block;' : ''}
    ${width ? `width: ${width}em;` : ''}
    ${height ? `height: ${height}em;min-height:${height}em;` : ''}
  `}
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
  ${({ wide }: { wide?: boolean }) => css`
    outline: none;
    background: ${dfstyles.colors.background};
    color: ${dfstyles.colors.subtext};
    border-radius: 4px;
    border: 1px solid ${dfstyles.colors.border};
    width: ${wide ? '100%' : '12em'};
    padding: 2px 6px;
    cursor: pointer;

    &:hover {
      border: 1px solid ${dfstyles.colors.text};
      background: ${dfstyles.colors.text};
      color: ${dfstyles.colors.background};
    }
  `}
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
  wide,
}: {
  values: string[];
  value: string;
  setValue: (value: string) => void;
  labels: string[];
  style?: React.CSSProperties;
  wide?: boolean;
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
    <Select wide={wide} style={style} value={value} onChange={onChange}>
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
