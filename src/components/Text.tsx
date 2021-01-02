// TODO: improve this file with more usage of styled-components

import React, { useState, useEffect, useContext } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import dfstyles from '../styles/dfstyles';
import _ from 'lodash';
import { SubmittedTx } from '../_types/darkforest/api/ContractsAPITypes';
import Viewport from '../app/board/Viewport';
import {
  Planet,
  ExploredChunkData,
  ArtifactId,
  Artifact,
} from '../_types/global/GlobalTypes';
import { BLOCK_EXPLORER_URL } from '../utils/constants';
import GameUIManager from '../app/board/GameUIManager';
import GameUIManagerContext from '../app/board/GameUIManagerContext';
import { artifactName } from '../utils/ArtifactUtils';
import UIEmitter, { UIEmitterEvent } from '../utils/UIEmitter';
import { ProcgenUtils } from '../utils/ProcgenUtils';

interface TextProps {
  children: React.ReactNode;
  size?: string;
  style?: React.CSSProperties;
}

const fontSizes: {
  [size: string]: string;
} = {
  title: '4rem',
  '4xl': '2rem',
  '3xl': '1.875rem',
  '2xl': '1.5rem',
  xl: '1.25rem',
  lg: '1.125rem',
  base: '1rem',
  sm: '0.875rem',
  xs: '0.75rem',
};

export function Text({ children, size = 'base', style = {} }: TextProps) {
  return (
    <div
      style={{
        fontSize: fontSizes[size],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text size='title'>{children}</Text>;
}

export function Header({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Text size='2xl' style={{ fontWeight: 'bold', ...style }}>
      {children}
    </Text>
  );
}

// At least one of "href" and "to" must be defined.
// - "to" is used for internal links, i.e. "/tutorial"
// - "href" is used for external links, i.e. "https://google.com"
interface LinkProps extends TextProps {
  href?: string;
  to?: string;
}

export function Link({
  href,
  to,
  children,
  size = 'base',
  style = {},
}: LinkProps) {
  const props = {
    href,
    to,
    style: {
      fontSize: fontSizes[size],
      textDecoration: 'underline',
      ...style,
    },
  };
  if (href) {
    return (
      <a {...props} target='_blank'>
        {children}
      </a>
    );
  } else {
    const propsWithTo = {
      ...props,
      to: to || '/',
    };
    return <ReactRouterLink {...propsWithTo}>{children}</ReactRouterLink>;
  }
}

export const Paragraph = styled.p`
  margin: 0.5rem 0;
`;

export const List = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 1.5rem;
`;

export const Item = styled.li``;

export function BlinkCursor() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => {
        return !v;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  return <span>{visible ? '|' : ''} </span>;
}

export const Green = styled.span`
  color: ${dfstyles.colors.dfgreen};
`;
export const Sub = styled.span`
  color: ${dfstyles.colors.subtext};
`;
export const White = styled.span`
  color: ${dfstyles.colors.text};
`;
export const Red = styled.span`
  color: ${dfstyles.colors.dfred};
`;
export const Blue = styled.span`
  color: ${dfstyles.colors.dfblue};
`;
export const Invisible = styled.span`
  color: rgba(0, 0, 0, 0);
`;

export const FakeLine = () => (
  <span>
    <Invisible>line</Invisible>
  </span>
);

// const delay = 0;

export function Space({ length }: { length: number }) {
  return (
    <>
      {_.range(0, length).map((el, i) => (
        <span key={i}>{'\u00A0'}</span>
      ))}
    </>
  );
}

export const Tab = () => <Space length={4} />;

export const BashPrompt = () => (
  <span>
    <Green>{'$'}</Green>{' '}
  </span>
);

export const JSPrompt = () => (
  <span>
    <Blue>{'>'}</Blue>{' '}
  </span>
);

export const ShellPrompt = () => (
  <span>
    <Green>{'$'}</Green>{' '}
  </span>
);

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <span>
      <ShellPrompt />
      {children}
    </span>
  );
}

export const HideSmall = styled.span`
  @media (max-width: ${dfstyles.screenSizeS}) {
    display: none;
  }
`;

// todo make this work nicely with react router links
export const BasicLink = styled.u`
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
`;

export function TxLink({ tx }: { tx: SubmittedTx }) {
  return (
    <>
      <u>
        <a onClick={() => window.open(`${BLOCK_EXPLORER_URL}/tx/${tx.txHash}`)}>
          View {tx.txHash.substring(0, 7)} on block explorer
        </a>
      </u>
      .
    </>
  );
}

export function CenterPlanetLink({
  planet,
  children,
}: {
  planet: Planet;
  children: React.ReactNode;
}) {
  return (
    <a>
      <u onClick={() => Viewport.getInstance().zoomPlanet(planet)}>
        {children}
      </u>
    </a>
  );
}

export const StyledLink = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export function ArtifactNameLink({ id }: { id: ArtifactId }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const artifact: Artifact | null = uiManager
    ? uiManager.getArtifactWithId(id)
    : null;

  const click = () => {
    UIEmitter.getInstance().emit(UIEmitterEvent.ShowArtifact, artifact);
  };

  return <StyledLink onClick={click}>{artifactName(artifact)}</StyledLink>;
}

export function PlanetNameLink({ planet }: { planet: Planet }) {
  return (
    <CenterPlanetLink planet={planet}>
      {ProcgenUtils.getPlanetName(planet)}
    </CenterPlanetLink>
  );
}

export function CenterChunkLink({
  chunk,
  children,
}: {
  chunk: ExploredChunkData;
  children: React.ReactNode;
}) {
  return (
    <a>
      <u onClick={() => Viewport.getInstance().centerChunk(chunk)}>
        {children}
      </u>
    </a>
  );
}

export function FAQ04Link({ children }: { children: React.ReactNode }) {
  return <a href={'https://blog.zkga.me/df-04-faq'}>{children} </a>;
}
