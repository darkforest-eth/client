import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const IconButton = styled.div<{
  iconColor?: string;
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.border};
  color: ${dfstyles.colors.text};
  background-color: ${dfstyles.colors.backgrounddark};
  user-select: none;

  & svg path {
    fill: ${(props) => props.iconColor || dfstyles.colors.subtext};
  }

  &:hover {
    border: 1px solid ${dfstyles.colors.text};
    background: ${dfstyles.colors.text};
    color: ${dfstyles.colors.background};
    & svg path {
      fill: ${dfstyles.colors.background};
    }
  }

  &:active {
    ${dfstyles.game.styles.active};
  }
`;
