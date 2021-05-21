import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const IconButton = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '1.5em'};
  height: 1.5em;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-radius: 2px;
  border: 1px solid ${dfstyles.colors.text};

  transition: color 0.2s, background-color 0.2s;

  &:hover,
  &.active {
    background: ${dfstyles.colors.text};
    color: ${dfstyles.colors.background};
    & svg path {
      fill: ${dfstyles.colors.background};
    }
    cursor: pointer;
  }

  &:active {
    ${dfstyles.game.styles.active};
  }
`;
