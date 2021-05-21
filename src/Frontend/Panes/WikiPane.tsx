import React from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export function WikiPane({ children }: { children: React.ReactNode }) {
  return <WikiPaneContainer>{children}</WikiPaneContainer>;
}

const WikiPaneContainer = styled.div`
  width: 400px;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 2px;
  border: 1px solid ${dfstyles.colors.text};
  background-color: ${dfstyles.colors.blueBackground};
  color: #ccc;
  padding: 8px 16px;
`;
