import React from 'react';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export interface LabeledPanelProps {
  children: React.ReactNode;
  label: string;
  headerRight?: () => React.ReactElement;
}

export const LabeledPanel: React.FC<LabeledPanelProps> = ({
  children,
  label,
  headerRight: HeaderRight,
}) => {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Header>{label}</Header>
        {HeaderRight && <HeaderRight />}
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
