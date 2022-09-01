import styled from 'styled-components';
import { theme } from '../styleUtils';

export const Orb = styled.div`
  width: ${theme.spacing.lg};
  height: ${theme.spacing.lg};
  border-radius: 100%;
  background: ${theme.colors.bg2};
  margin-right: ${theme.spacing.lg};
  animation: pulse 1.5s ease infinite;
  @keyframes pulse {
    0% {
      background: ${theme.colors.bg2};
    }
    50% {
      background: ${theme.colors.bg3};
    }
    100% {
      background: ${theme.colors.bg2};
    }
  }
`;
