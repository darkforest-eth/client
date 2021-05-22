import React, { useState } from 'react';
import styled from 'styled-components';
import { Hook } from '../../_types/global/GlobalTypes';
import dfstyles from '../Styles/dfstyles';
import { GameWindowZIndex } from '../Utils/constants';
import { LongDash } from '../Components/Text';

/** Left bar (with all the modal icons) */

export const MenuBar = styled.div`
  background: ${dfstyles.colors.background};
  z-index: ${GameWindowZIndex.MenuBar};
  border-right: 1px solid ${dfstyles.colors.subtext};
  border-bottom: 1px solid ${dfstyles.colors.subtext};

  & > div {
    border-top: 1px solid ${dfstyles.colors.subtext};

    &:first-child {
      border-top: none;
    }
  }

  border-bottom-right-radius: ${dfstyles.borderRadius};
`;

const StyledMenuBarSection = styled.div`
  padding: 0.5em;
  width: fit-content;

  display: flex;
  flex-direction: column;

  & > span {
    margin-top: 4pt;
    &:first-child {
      margin-top: 0;
    }
  }
`;

const StyledCollapser = styled.span`
  width: 1.5em;
  text-align: center;
  color: ${dfstyles.colors.subtext};

  &:hover {
    cursor: pointer;
    color: ${dfstyles.colors.text};
  }
`;

function Collapser({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: Hook<boolean>[1];
}) {
  return (
    <StyledCollapser onClick={() => setExpanded((b: boolean) => !b)}>
      {expanded ? <LongDash /> : '+'}
    </StyledCollapser>
  );
}

export function MenuBarSection({
  children,
  collapsible,
}: {
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <StyledMenuBarSection>
      {(!collapsible || (collapsible && expanded)) && children}
      {collapsible && <Collapser expanded={expanded} setExpanded={setExpanded} />}
    </StyledMenuBarSection>
  );
}
