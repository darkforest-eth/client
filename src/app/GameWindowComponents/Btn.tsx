import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';

// TODO clean this up
export const Btn = styled.span`
  display: inline-block;
  border-radius: 3px;
  padding: 0 0.3em;
  border: 1px solid ${dfstyles.colors.text};
  transition: background 0.2s, colors 0.2s;
  &:hover {
    color: ${dfstyles.colors.background};
    background: ${dfstyles.colors.text};
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
`;
