import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Spacer } from './CoreUI';

export const Sidebar: React.FC<{
  children: React.ReactNode;
  previousPath: string | undefined;
  title: string;
}> = ({ children, previousPath, title }) => {
  const history = useHistory();
  return (
    <SidebarContainer>
      <div
        style={{
          padding: '24px 24px 0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <SidebarTitle onClick={() => previousPath ? history.push(previousPath): null}>{title}</SidebarTitle>
      </div>
      <Spacer height={8} />
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: relative;
  width: 330px;
  height: 100%;
  max-width: 340px;
  min-width: 230px;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
`;

const SidebarContent = styled.div`
  height: calc(100% - 68px);
  overflow-y: auto;
  padding: 12px 24px 24px;
`;

const SidebarTitle = styled.span`
  font-weight: 500;
  color: #fff;
  font-size: 1.125rem;
  cursor: pointer;
`;
