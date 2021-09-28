import colorFn from 'color';
import React from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export type BtnProps = {
  disabled?: boolean;
  noBorder?: boolean;
  wide?: boolean;
  small?: boolean;
  color?: string;
  borderColor?: string;
  textColor?: string;
  forceActive?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Btn(props: BtnProps) {
  return <BtnElement {...props} onClick={props.disabled ? undefined : props.onClick} />;
}

const BtnElement = styled.span`
  ${({
    disabled,
    color,
    borderColor,
    textColor,
    noBorder,
    wide,
    forceActive,
    small,
  }: BtnProps) => css`
    user-select: none;
    display: inline-flex;
    border-radius: 3px;
    padding: 2px 8px;
    ${small ? `padding: 0 4px;` : `padding: 2px 8px;`}
    border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.borderDark};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${dfstyles.colors.backgrounddark};

    ${small && `font-size: 0.8em;`}
    ${wide && `width: 100%;`}
    color: ${textColor || color || dfstyles.colors.text};

    &:hover {
      ${!disabled &&
      css`
        ${dfstyles.game.styles.active};
        border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.border};
        color: ${dfstyles.colors.background};
        background: ${color || dfstyles.colors.text};
        span svg path {
          fill: ${dfstyles.colors.background};
        }
      `}
    }

    &:active {
      ${!disabled &&
      css`
        background: ${color || colorFn(dfstyles.colors.text).lighten(0.5).hex()};
      `}
    }

    ${disabled &&
    css`
      color: ${dfstyles.colors.subtext};
      border-color: ${dfstyles.colors.border};
      background: none;
      filter: none;
    `}

    ${forceActive &&
    css`
      border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.border};
      color: ${dfstyles.colors.background};
      background: ${color || dfstyles.colors.text};
    `}
  `}
`;
