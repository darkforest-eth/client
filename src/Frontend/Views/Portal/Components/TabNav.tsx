import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export interface TabType {
  label: string;
  to: string;
  secondary?: string;
  wildcard?: string;
  dropdown?: TabType[];
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
  const [hoveringDropdownTab, setHoveringDropdownTab] = useState<boolean>(false);
  const [hoveringMenu, setHoveringMenu] = useState<boolean>(false);

  return (
    <Container>
      {tabs.map((tab, i) => (
        <div key={i}>
          {tab.dropdown ? (
            <div style={{ position: 'relative' }} key={`${tab.label}-${i}`}>
              <Tab
                key={tab.label}
                active={false}
                onMouseEnter={() => setHoveringDropdownTab(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setHoveringDropdownTab(false);
                  }, 200);
                }}
              >
                {tab.label}
              </Tab>
              {tab.dropdown && (
                <DropdownContainer
                  onMouseEnter={() => {
                    setHoveringMenu(true);
                  }}
                  onMouseLeave={() => setHoveringMenu(false)}
                  active={hoveringDropdownTab || hoveringMenu}
                >
                  {tab.dropdown.map((dropdownTab, j) => (
                    <DropdownItemContainer key={`dropdownItem-${j}`}>
                      {dropdownTab.to.startsWith('http') ? (
                        <a href={dropdownTab.to} target='_blank' rel='noreferrer'>
                          <DropdownItemCol>
                            <DropdownTitle>{dropdownTab.label}</DropdownTitle>
                            {dropdownTab.secondary && (
                              <span style={{ color: theme.colors.fgMuted2 }}>
                                {dropdownTab.secondary}
                              </span>
                            )}
                          </DropdownItemCol>
                        </a>
                      ) : (
                        <Link key={j} to={dropdownTab.to}>
                          <DropdownItemCol>
                            <DropdownTitle>{dropdownTab.label}</DropdownTitle>
                            {dropdownTab.secondary && (
                              <span style={{ color: theme.colors.fgMuted2 }}>
                                {dropdownTab.secondary}
                              </span>
                            )}
                          </DropdownItemCol>
                        </Link>
                      )}
                    </DropdownItemContainer>
                  ))}
                </DropdownContainer>
              )}
            </div>
          ) : (
            <Link key={`${tab.label}-${i}`} to={tab.to}>
              <Tab key={tab.label} active={getTabActive(loc.pathname, tab)}>
                {tab.label}
              </Tab>
            </Link>
          )}
        </div>
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
  position: relative;
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

const DropdownContainer = styled.div<{ active: boolean }>`
  z-index: 999;
  position: absolute;
  top: calc(100% + ${theme.spacing.md});
  right: -180px;
  width: 360px;
  max-width: calc(100vw - ${theme.spacing.xl});
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  background: ${theme.colors.bg2};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.2s ease-in-out; 
  animation: ${(props) => (props.active ? 'animateDropdown 0.2s ease' : 'none')};
  @keyframes animateDropdown {
    0% {
      opacity: 0;
      transform: scale(0.96) translateZ(4px);
      tranform-origin: 0% 0px;
  },
  100% {
    opacity: 1;
    transform: scale(1) translateZ(0);
    transform-origin: 50% 0px;
  }
`;

const DropdownItemContainer = styled.div`
  display: flex;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${theme.colors.bg3};
    color: ${theme.colors.fgPrimary};
  }
`;

const DropdownItemCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const DropdownTitle = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 0.9rem;
  color: ${theme.colors.fgPrimary};
`;
