import React from 'react';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export interface LabeledPanelProps {
  children: React.ReactNode;
  label: string;
}

export const LabeledPanel: React.FC<LabeledPanelProps> = ({ children, label }) => {
  return (
    <Container>
      <div style={{ marginBottom: theme.spacing.lg }}>
        <Header>{label}</Header>
      </div>
      {children}
    </Container>
  );
};
const Container = styled.div`
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius};
  background: ${theme.colors.bg1};
`;

const Header = styled.span`
  font-size: 1rem;
  color: ${theme.colors.fgPrimary};
  font-family: ${theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
