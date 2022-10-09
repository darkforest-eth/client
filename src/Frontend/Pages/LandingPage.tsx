import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { IconType } from '@darkforest_eth/ui';
import React, { CSSProperties, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { createGlobalStyle, CSSObject } from 'styled-components';
import { EmSpacer, Link, Spacer } from '../Components/CoreUI';
import { Icon } from '../Components/Icons';
import dfstyles from '../Styles/dfstyles';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

export default function LandingPage() {
  const history = useHistory();
  return (
    <>
      <Container>
        <Nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#000' }}>
            <img src='/icons/logo-black.svg' style={{ width: '80px', height: '80px' }} />
            <span style={{ color: '#000', fontFamily: 'sans-serif', fontWeight: 500 }}>
              Galactic Protection Division
            </span>
          </div>
        </Nav>
        <Content>
          <Split>
            <BigHeader style={{ opacity: 0.6 }}>ITEM #149</BigHeader>
            <BigHeader>ANTIMATTER CUBE</BigHeader>
            <SmallHeader>DESCRIPTION</SmallHeader>
            <LongText>
              The Animatter Cube is an extremely unstable multiversal object that rapidly depletes
              energy from the planet it is found on. Previous manifestations of the Antimatter Cube
              have historically been perceived as extremely valuable to intergalactic empires for
              its use as an interdimensional communication device.
            </LongText>
            <SmallHeader>CONTAINMENT PROCEDURE</SmallHeader>
            <LongText style={{ marginBottom: '1rem' }}>
              The Antimatter Cube has been discovered in the center of the B-12 universe. The
              Antimatter Cube is to be contained via extraction from a{' '}
              <a target='_blank' href='https://dfwiki.net/wiki/Spacetime_Rip'>
                Spacetime Rip
              </a>
              .
            </LongText>
            <Button onClick={() => history.push('/portal')}>Accept mission</Button>
          </Split>
          <Split>
            <img src='/img/landing-cube.png' />
            <Caption>
              <span>
                Photograph of an instance of the Antimatter Cube manifesting in Universe E-14.
                Source unknown.
              </span>
            </Caption>
          </Split>
        </Content>
        <Footer>
          <Marquee>
            <MarqueeGroup>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
              <Label>Confidential</Label>
            </MarqueeGroup>
          </Marquee>
        </Footer>
      </Container>
    </>
  );
}

const Button = styled.button`
  background: #8d1a1a;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  padding: 1rem 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #b13131;
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  justify-content: center;
  background: #e5e2db;
  color: #000;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  position: relative;
  --size: clamp(10rem, 1rem + 40vmin, 30rem);
  --gap: calc(var(--size) / 14);
  --duration: 60s;
  --scroll-start: 0;
  --scroll-end: calc(-100% - var(--gap));
  @media (max-width: 768px) {
    overflow-y: auto;
    margin-bottom: 3rem;
  }
`;

const Marquee = styled.div`
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  overflow: hidden;
  mask-image: linear-gradient(
    var(--mask-direction, to right),
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 20%,
    hsl(0 0% 0% / 1) 80%,
    hsl(0 0% 0% / 0)
  );
`;

const MarqueeGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 2rem;
  align-items: flex-start;
  margin: 0 2rem;
  max-width: 1080px;
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  width: 100%;
  padding: 1rem 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LongText = styled.p`
  font-size: 1.2rem;
`;

const SmallHeader = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  color: #000;
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 100vh;
  display: fixed;
  background-image: url(/public/img/screenshots/deathstar.png);
  background-size: cover;
  filter: blur(5px) brightness(0.9);
  background-position: 50%, 50%;
  // display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: -1;
`;

const Split = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 6pt;
    transition: color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      &.link-twitter {
        color: ${dfstyles.colors.icons.twitter};
      }
      &.link-github {
        color: ${dfstyles.colors.icons.github};
      }
      &.link-discord {
        color: ${dfstyles.colors.icons.discord};
      }
      &.link-blog {
        color: ${dfstyles.colors.icons.blog};
      }
      &.link-email {
        color: ${dfstyles.colors.icons.email};
      }
    }
  }
`;

const BigHeader = styled.span`
  text-transform: uppercase;
  font-size: 2.2rem;
  font-weight: 500;
`;

const Label = styled.div`
  opacity: 0.6;
  text-transform: uppercase;
  color: #8d1a1a;
  font-size: 1rem;
  font-weight: 500;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
`;

const Caption = styled.div`
  padding: 1rem;
  border: 1px solid #000;
`;
