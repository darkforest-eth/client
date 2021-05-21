import React from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export interface BtnProps {
  disabled?: boolean;
  noBorder?: boolean;
  wide?: boolean;

  color?: string;

  borderColor?: string;
  textColor?: string;
}

export function Btn(props: BtnProps & React.HTMLAttributes<HTMLSpanElement>) {
  return <BtnElement {...props} onClick={props.disabled ? undefined : props.onClick} />;
}

const BtnElement = styled.span`
  ${({ disabled, color, borderColor, textColor, noBorder, wide }: BtnProps) => css`
    user-select: none;
    display: inline-flex;
    border-radius: 3px;
    padding: 0 0.3em;
    border: ${noBorder ? 0 : 1}px solid ${borderColor || color || dfstyles.colors.text};
    transition: background-color 0.2s, color 0.2s;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ${wide && `width: 100%;`}
    ${(textColor || color) && `color: ${textColor || color};`}

    &:hover {
      ${!disabled &&
      css`
        color: ${dfstyles.colors.background};
        background: ${color || dfstyles.colors.text};
      `}
    }

    &:active {
      ${dfstyles.game.styles.active};
    }

    ${disabled &&
    css`
      color: ${dfstyles.colors.subbertext};
      background: none;
      border-color: ${dfstyles.colors.subtext};
      filter: none;
    `}
  `}
`;
