import styled, { css } from 'styled-components';
import dfstyles from '../../styles/dfstyles';

// TODO clean this up
export const Btn = styled.span`
  ${({
    disabled,
    color,
    borderColor,
    textColor,
  }: {
    disabled?: boolean;
    color?: string;
    borderColor?: string;
    textColor?: string;
  }) => css`
    user-select: none;
    display: inline-block;
    border-radius: 3px;
    padding: 0 0.3em;
    border: 1px solid ${borderColor || color || dfstyles.colors.text};
    transition: background 0.2s, colors 0.2s;
    ${textColor && `color: ${textColor};`}
    &:hover {
      color: ${dfstyles.colors.background};
      background: ${color || dfstyles.colors.text};
      cursor: pointer;
    }
    &:active {
      ${dfstyles.game.styles.active};
    }

    &.btn-disabled,
    &.btn-disabled:hover,
    &.btn-disabled:active {
      color: ${dfstyles.colors.subtext};
      background: none;
      border: 1px solid ${dfstyles.colors.subtext};
      cursor: default;
      filter: none;
    }

    ${disabled &&
    css`
      color: ${dfstyles.colors.subtext};
      background: none;
      border: 1px solid ${dfstyles.colors.subtext};
      cursor: default;
      filter: none;
    `}
  `}
`;
