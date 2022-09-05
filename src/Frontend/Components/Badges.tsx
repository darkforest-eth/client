// should be able to be treated as a text element
import { BadgeType } from '@darkforest_eth/types';
import { DarkForestBadge, getBadgeElement } from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../Views/Portal/styleUtils';

// TODO: Decide if this is the best place to register the custom elements
customElements.define(DarkForestBadge.tagName, DarkForestBadge);

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Badge = createComponent(React, DarkForestBadge.tagName, DarkForestBadge, {
  // If we had any, we would map DOM events to React handlers passed in as props. For example:
  // onClick: 'click'
});

export function BadgeDetailsRow({ type, count = 1 }: { type: BadgeType; count: number }) {
  const badgeElement = getBadgeElement(type);
  if (!badgeElement) return <></>;

  return (
    <BadgeDetailsContainer>
      <Badge type={type} />
      <BadgeContent>
        <BadgeTitle>
          {badgeElement.name} {count > 1 ? `(x${count})` : ''}
        </BadgeTitle>
        <BadgeDescription>{badgeElement.description}</BadgeDescription>
      </BadgeContent>
    </BadgeDetailsContainer>
  );
}

export function BadgeDetailsCol({ type, count = 1 }: { type: BadgeType; count: number }) {
  const badgeElement = getBadgeElement(type);
  if (!badgeElement) return <></>;

  return (
    <BadgeDetailsContainer col={true}>
      <Badge type={type} />
      <BadgeContent>
        <BadgeTitle>
          {badgeElement.name} {count > 1 ? `(x${count})` : ''}
        </BadgeTitle>
        <BadgeDescription>{badgeElement.description}</BadgeDescription>
      </BadgeContent>
    </BadgeDetailsContainer>
  );
}

export function SpacedBadges({ badges }: { badges: BadgeType[] }) {
  return (
    <div>
      {badges.map((badge, idx) => (
        <Badge key={`badge-idx-${idx}`} type={badge} />
      ))}
    </div>
  );
}

export function StackedBadges({}: {}) {}

const BadgeDetailsContainer = styled.div<{ col?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.col ? 'column' : 'row')};
  gap: 4px;
  align-items: center;
  background: ${theme.colors.bg1};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
`;

const BadgeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const BadgeTitle = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.fgPrimary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const BadgeDescription = styled.span`
  color: ${theme.colors.fgMuted2};
`;
