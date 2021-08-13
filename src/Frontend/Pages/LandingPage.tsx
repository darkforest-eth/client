import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { EmSpacer, Link, Spacer } from '../Components/CoreUI';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { HideSmall, Sub, Text, White } from '../Components/Text';
import LandingPageCanvas from '../Renderers/LandingPageCanvas';
import dfstyles from '../Styles/dfstyles';
import { LandingPageRoundArt } from '../Views/LandingPageRoundArt';
import { LeadboardDisplay } from '../Views/Leaderboard';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const links = {
  twitter: 'http://twitter.com/darkforest_eth',
  email: 'mailto:contact@zkga.me',
  blog: 'https://blog.zkga.me/',
  discord: 'https://discord.gg/2u2TN6v8r6',
  github: 'https://github.com/darkforest-eth',
};

export default function LandingPage() {
  const history = useHistory();

  return (
    <>
      <LandingPageCanvas />
      <PrettyOverlayGradient />

      <Page>
        <Spacer height={150} />

        <MainContentContainer>
          <Header>
            <LandingPageRoundArt />
            <EmSpacer height={1.5} />

            <p>
              <White>Dark Forest</White>
              <br />
              <Text>zkSNARK space warfare</Text>
              <br />
              <Text>Round 3: Grape Extra-Small - Race to the Center</Text>
            </p>

            <Spacer height={16} />

            <Btn
              style={{ borderRadius: '8px', padding: '4px 8px' }}
              color={dfstyles.colors.dfgreen}
              onClick={() => {
                history.push('/play');
              }}
            >
              Enter
            </Btn>
          </Header>

          <EmSpacer height={3} />

          <div style={{ color: dfstyles.colors.text }}>
            <HallOfFameTitle>Space Masters</HallOfFameTitle>
            <Spacer height={8} />
            <table>
              <tbody>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.1
                  </td>
                  <td>
                    02/22/<HideSmall>20</HideSmall>20
                  </td>
                  <td>
                    <a href='https://twitter.com/zoink'>Dylan Field</a>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.2
                  </td>
                  <td>
                    06/24/<HideSmall>20</HideSmall>20
                  </td>
                  <td>Nate Foss</td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.3
                  </td>
                  <td>
                    08/07/<HideSmall>20</HideSmall>20
                  </td>
                  <td>
                    <Link to='https://twitter.com/hideandcleanse'>@hideandcleanse</Link>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.4
                  </td>
                  <td>
                    10/02/<HideSmall>20</HideSmall>20
                  </td>
                  <td>
                    <Link to='https://twitter.com/jacobrosenthal'>Jacob Rosenthal</Link>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.5
                  </td>
                  <td>
                    12/25/<HideSmall>20</HideSmall>20
                  </td>
                  <td>0xb05d9542...</td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.6 round 1
                  </td>
                  <td>
                    05/22/<HideSmall>20</HideSmall>21
                  </td>
                  <td>
                    <Link to='https://twitter.com/adietrichs'>Ansgar Dietrichs</Link>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.6 round 2
                  </td>
                  <td>
                    07/07/<HideSmall>20</HideSmall>21
                  </td>
                  <td>
                    <Link to='https://twitter.com/orden_gg'>@orden_gg</Link>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>v</HideSmall>0.6 round 3
                  </td>
                  <td>
                    08/22/<HideSmall>20</HideSmall>21
                  </td>
                  <td>t.b.d</td>
                </TRow>
              </tbody>
            </table>
          </div>

          <Spacer height={32} />

          <EmailWrapper>
            <EmailCTA mode={EmailCTAMode.SUBSCRIBE} />
          </EmailWrapper>

          <Spacer height={16} />

          <VariousLinksContainer>
            <TextLinks>
              <a href={links.email}>email</a>
              <Spacer width={4} />
              <Sub>-</Sub>
              <Spacer width={8} />
              <a href={links.blog}>blog</a>
            </TextLinks>

            <Spacer width={8} />

            <IconLinks>
              <a className={'link-twitter'} href={links.twitter}>
                <span className={'icon-twitter'}></span>
              </a>
              <Spacer width={8} />
              <a className={'link-discord'} href={links.discord}>
                <span className={'icon-discord'}></span>
              </a>
              <Spacer width={8} />
              <a className={'link-github'} href={links.github}>
                <span className={'icon-github'}></span>
              </a>
            </IconLinks>
          </VariousLinksContainer>
        </MainContentContainer>

        <Spacer height={128} />

        <LeadboardDisplay />

        <Spacer height={256} />
      </Page>
    </>
  );
}

const VariousLinksContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrettyOverlayGradient = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left top, rgba(219, 10, 20, 0.2), rgba(1, 255, 22, 0.2)) fixed;
  background-position: 50%, 50%;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
`;

const Header = styled.div`
  text-align: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TRow = styled.tr`
  & td:first-child {
    color: ${dfstyles.colors.subtext};
  }
  & td:nth-child(2) {
    padding-left: 12pt;
  }
  & td:nth-child(3) {
    text-align: right;
    padding-left: 16pt;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TextLinks = styled.span`
  vertical-align: center;
  & a {
    transition: color 0.2s;

    &:hover {
      color: ${dfstyles.colors.dfblue};
    }
  }
`;

const IconLinks = styled.span`
  font-size: 18pt;

  & a {
    margin: 0 6pt;
    transition: color 0.2s;
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

const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  font-size: ${dfstyles.fontSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${LandingPageZIndex.BasePage};
`;

const HallOfFameTitle = styled.div`
  color: ${dfstyles.colors.subtext};
  display: inline-block;
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  line-height: 1em;
`;
