// should be able to be treated as a text element
import { BadgeType } from '@darkforest_eth/types';
import { DarkForestBadge, getBadgeElement } from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';
import styled from 'styled-components';

// TODO: Decide if this is the best place to register the custom elements
customElements.define(DarkForestBadge.tagName, DarkForestBadge);

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Badge = createComponent(React, DarkForestBadge.tagName, DarkForestBadge, {
  // If we had any, we would map DOM events to React handlers passed in as props. For example:
  // onClick: 'click'
});

export function BadgeDetails({ type, count = 1 }: { type: BadgeType; count: number }) {
  const badgeElement = getBadgeElement(type);
  if (!badgeElement) return <></>;

  return (
    <BadgeDetailsContainer>
      <Badge type={type} />
      <span style={{ fontSize: '1.25rem' }}>
        {badgeElement.name} {count > 1 ? `(x${count})` : ''}
      </span>
      <span>{badgeElement.description}</span>
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

const BadgeDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;
