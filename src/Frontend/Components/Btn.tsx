import React from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export type BtnProps = {
  disabled?: boolean;
  noBorder?: boolean;
  wide?: boolean;
  color?: string;
  borderColor?: string;
  textColor?: string;
  forceActive?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Btn(props: BtnProps) {
  return <BtnElement {...props} onClick={props.disabled ? undefined : props.onClick} />;
}

const BtnElement = styled.span`
  ${({ disabled, color, borderColor, textColor, noBorder, wide, forceActive }: BtnProps) => css`
    user-select: none;
    display: inline-flex;
    border-radius: 3px;
    padding: 0.15em;
    border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.borderDark};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${dfstyles.colors.backgrounddark};

    ${wide && `width: 100%;`}
    ${(textColor || color) && `color: ${textColor || color};`}

    &:active,
    &:hover {
      ${!disabled &&
      css`
        border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.border};
        color: ${dfstyles.colors.background};
        background: ${color || dfstyles.colors.text};
      `}
    }

    &:active {
      ${dfstyles.game.styles.active};
    }

    ${disabled &&
    css`
      color: ${dfstyles.colors.subbesttext};
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
