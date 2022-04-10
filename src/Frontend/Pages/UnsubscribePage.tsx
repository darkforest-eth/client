import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { BlinkCursor, HideSmall, Invisible, Sub, Text } from '../Components/Text';
import LandingPageCanvas from '../Renderers/LandingPageCanvas';
import dfstyles from '../Styles/dfstyles';
import { LinkContainer } from './LandingPage';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const styles: {
  [name: string]: React.CSSProperties;
} = {
  // container stuff
  wrapper: {
    width: '100%',
    height: '100%',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: dfstyles.colors.background,
    zIndex: LandingPageZIndex.Background,
  },
  basePage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: dfstyles.colors.text,
    fontSize: dfstyles.fontSize,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: LandingPageZIndex.BasePage,
  },

  // hall of fame
  hofTitle: {
    color: dfstyles.colors.subtext,
    display: 'inline-block',
    borderBottom: `1px solid ${dfstyles.colors.subtext}`,
    lineHeight: '1em',
  },
};

const links = {
  twitter: 'http://twitter.com/darkforest_eth',
  email: 'mailto:ivan@0xparc.org',
  blog: 'https://blog.zkga.me/',
  telegram: 'https://t.me/zk_forest',
  github: 'https://github.com/darkforest-eth',
};

// note: prefer styled-components when possible because semantically easier to debug
const Header = styled.div`
  text-align: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    margin-top: 16pt;
  }
`;

const TextLinks = styled.div`
  & a {
    &:first-child {
      margin-left: 0;
    }
    margin-left: 7pt;
    &:after {
      margin-left: 7pt;
      content: '-';
      color: ${dfstyles.colors.subtext};
    }
    &:last-child:after {
      display: none;
    }

    transition: color 0.2s;
    &:hover {
      color: ${dfstyles.colors.dfblue};
    }
  }
`;

const Title = styled.div`
  font-size: ${dfstyles.fontH1};
  font-family: ${dfstyles.titleFont};
  @media (max-width: ${dfstyles.screenSizeS}) {
    font-size: ${dfstyles.fontH1S};
  }
  position: relative;

  & h1 {
    white-space: nowrap;
  }

  & h1:first-child {
    position: absolute;
  }
  & h1:last-child {
    &:before {
      content: '>';
      position: absolute;
      top: 0;
      left: -1em;
      color: #00ff00;
    }
  }
`;

const Fat = styled.span`
  display: inline-block;
  transform: scale(1, 1.2);
`;

export default function UnsubscribePage() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.background} />
      <LandingPageCanvas />

      <div style={styles.basePage}>
        {/* Spacer */}
        <div></div>

        {/* Title + CTA */}
        <Header>
          <Title>
            <h1>
              dark forest
              <Fat>
                <Sub>
                  <BlinkCursor />
                </Sub>
              </Fat>
            </h1>
            <h1>
              <Invisible>dark forest</Invisible>
            </h1>
          </Title>

          <p>
            <Sub>
              zkSNARK space warfare <HideSmall>(v0.6)</HideSmall>
            </Sub>
          </p>
        </Header>

        {/* Email CTA */}
        <EmailWrapper>
          <EmailCTA mode={EmailCTAMode.UNSUBSCRIBE} />
        </EmailWrapper>

        {/* Footer */}
        <Footer>
          <TextLinks>
            <a href={links.email}>email</a>
            <a href={links.blog}>blog</a>
          </TextLinks>
          <LinkContainer>
            <a className={'link-twitter'} href={links.twitter}>
              <span className={'icon-twitter'}></span>
            </a>
            <a className={'link-discord'} href={links.telegram}>
              <span className={'icon-discord'}></span>
            </a>
            <a className={'link-github'} href={links.github}>
              <span className={'icon-github'}></span>
            </a>
          </LinkContainer>
        </Footer>
      </div>

      {/*
      <div style={styles.linksRow}>
        <Link to='/tutorial' size='lg' style={{ marginRight: '2rem' }}>
          Tutorial
        </Link>
        <Link to='/' size='lg'>
          About
        </Link>
          <BasicEmailInput isPlayer={false} />
      </div>
      */}
    </div>
  );
}

function _GamesTable() {
  const history = useHistory();
  const games = ['Dark Forest 0.0', 'EF Workshop 2/21', 'ETHGlobal 4/29'];
  return (
    <div style={styles.gamesTable}>
      {games.map((name, ind) => (
        <div
          key={name}
          style={{
            ...styles.gamesTableRow,
            borderBottom: ind !== games.length - 1 ? '2px solid #9f9f9f' : undefined,
          }}
        >
          <div style={styles.gamesTableRowContents}>
            <Text>{name}</Text>
            <div>
              <Button
                style={{ margin: '0 1rem' }}
                onClick={() => {
                  history.push('/play');
                }}
              >
                Enter
              </Button>
              <Button
                onClick={() => {
                  history.push('/replay1');
                }}
              >
                Replay
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
