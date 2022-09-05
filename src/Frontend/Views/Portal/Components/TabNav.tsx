import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export interface TabType {
  label: string;
  to: string;
  wildcard?: string;
}

export interface TabNavTypes {
  tabs: TabType[];
}

const getTabActive = (currentPath: string, tab: TabType) => {
  if (tab.wildcard) {
    const splitPath = currentPath.trim().split('/');
    const pathWithoutWildcard = splitPath.filter((p) => p !== tab.wildcard);
    const splitTabLoc = tab.to.trim().split('/');
    const currentPathIsSubsetOfTab = pathWithoutWildcard.every((p) => splitTabLoc.includes(p));
    return currentPathIsSubsetOfTab;
  } else {
    return location.pathname === tab.to;
  }
};

export const TabNav: React.FC<TabNavTypes> = ({ tabs }) => {
  const loc = useLocation();
  return (
    <Container>
      {tabs.map((tab, i) => (
        <Link key={i} to={tab.to}>
          <Tab key={tab.label} active={getTabActive(loc.pathname, tab)}>
            {tab.label}
          </Tab>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  gap: ${theme.spacing.md};
  background: ${theme.colors.bg1};
  justify-content: center;
  margin: 0 auto;
`;

const Tab = styled.div<{ active: boolean }>`
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  padding: ${theme.spacing.md};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? theme.colors.fgPrimary : theme.colors.fgMuted)};
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  background: ${(props) => (props.active ? theme.colors.bg2 : 'transparent')};
  font-family: ${theme.fonts.mono};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${theme.colors.bg2};
    color: ${theme.colors.fgPrimary};
  }
`;
