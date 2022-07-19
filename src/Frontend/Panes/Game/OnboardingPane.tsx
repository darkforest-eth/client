import { ModalName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../../Components/Btn';
import { Gold, Green, Red, White, Silver, Bronze } from '../../Components/Text';
import { TextPreview } from '../../Components/TextPreview';
import dfstyles from '../../Styles/dfstyles';
import { useAccount, useUIManager } from '../../Utils/AppHooks';
import { goldTime, silverTime, bronzeTime } from '../../Utils/constants';
import { ModalPane } from '../../Views/Game/ModalPane';

const StyledOnboardingContent = styled.div`
  width: 36em;
  height: 25em;
  position: relative;
  color: ${dfstyles.colors.text};

  .btn {
    position: absolute;
    right: 0.5em;
    bottom: 0em;
    gap: 8px;
  }

  .indent {
    margin-left: 1em;
  }

  & > p,
  & > div {
    margin: 1em 0;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const enum OnboardState {
  Money,
  Keys,
}

function OnboardMoney({ advance }: { advance: () => void }) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);

  const explorerAddressLink = `https://blockscout.com/poa/xdai/optimism/address/${account}`;
  const isCompetitive = uiManager.isCompetitive();
  const victoryThreshold = uiManager.contractConstants.CLAIM_VICTORY_ENERGY_PERCENT;
  return (
    <StyledOnboardingContent>
      <p>
        Race against the clock to capture the Target Planet (it has a big 🎯 floating above it) and{' '}
        <Green>
          claim victory when it contains at least <Gold>{victoryThreshold}%</Gold> energy!
        </Green>
      </p>
      <p>
        <div>INTRODUCING OUR NEW SCORING ALGORITHM</div>
        <div><White>Scoring is now calculated using time AND moves</White>.</div>
      </p>
      <p>
          Here is how scoring works: Score = time (secs) * (1 + moves / 1000). The lowest score
          wins!
        </p>
      {/* {isCompetitive && ( */}
        <p>
          <div>Earn below these scores to earn Bronze, Silver, and Gold ranks.</div>
          <div>
            Gold: <Gold>{goldTime}</Gold>
          </div>
          <div>
            Silver: <Silver>{silverTime}</Silver>
          </div>
          <div>
            Bronze: <Bronze>{bronzeTime}</Bronze>
          </div>
        </p>
      {/* )} */}
      <p>The ⏲️ starts when you make your first move. </p>
      {isCompetitive && <p>The player with the fastest time after 48hrs will win XDAI and a 🏆!</p>}
      {/* <p>
        We have initialized a{' '}
        <a onClick={() => window.open('https://github.com/austintgriffith/burner-wallet')}>
          burner wallet
        </a>{' '}
        containing 1¢ of xDAI:
        <Blue>
          <a onClick={() => window.open(explorerAddressLink)}>({account})</a>
        </Blue>
      </p> */}
      <div>
        <span></span>
        <Btn className='btn' onClick={advance}>
          Proceed
        </Btn>
      </div>
    </StyledOnboardingContent>
  );
}

function OnboardKeys({
  advance,
  setOpenTutorial,
}: {
  advance: () => void;
  setOpenTutorial: (open: boolean) => void;
}) {
  const uiManager = useUIManager();
  const [sKey, setSKey] = useState<string | undefined>(undefined);
  const [viewPrivateKey, setViewPrivateKey] = useState<boolean>(false);
  const [viewHomeCoords, setViewHomeCoords] = useState<boolean>(false);

  useEffect(() => {
    if (!uiManager) return;
    setSKey(uiManager.getPrivateKey());
  }, [uiManager]);

  const [home, setHome] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!uiManager) return;
    const coords = uiManager.getHomeCoords();
    setHome(coords ? `(${coords.x}, ${coords.y})` : '');
  }, [uiManager]);

  return (
    <StyledOnboardingContent>
      <p>
        The game stores your <White>private key</White> and home coordinates in your browser. They
        are your password, and <Red>should never be viewed by anyone else.</Red>
      </p>
      <p>
        <Btn
          onClick={() => {
            setViewPrivateKey(!viewPrivateKey);
          }}
        >
          {viewPrivateKey ? 'Hide' : 'View'} private key
        </Btn>{' '}
        <br />
        Your private key is:{' '}
        <TextPreview
          text={viewPrivateKey ? sKey : 'hidden'}
          focusedWidth={'150px'}
          unFocusedWidth={'150px'}
        />
      </p>
      <p>
        <Btn
          onClick={() => {
            setViewHomeCoords(!viewHomeCoords);
          }}
        >
          {viewHomeCoords ? 'Hide' : 'View'} home coords
        </Btn>{' '}
        <br />
        Your home coords are:{' '}
        <TextPreview
          text={viewHomeCoords ? home : 'hidden'}
          focusedWidth={'150px'}
          unFocusedWidth={'150px'}
        />
      </p>

      <p>We recommend you back this information up.</p>
      <p>
        If you are new to Dark Forest, play the tutorial! Otherwise, skip and jump into the action.
      </p>
      <div className='btn'>
        <Btn
          onClick={() => {
            advance();
            setOpenTutorial(true);
          }}
        >
          Play Tutorial
        </Btn>
        <Btn onClick={advance}>Skip Tutorial</Btn>
      </div>
      <div></div>
    </StyledOnboardingContent>
  );
}

export default function OnboardingPane({
  visible,
  onClose,
  isCompetitive = false,
}: {
  visible: boolean;
  onClose: (tutorial: boolean) => void;
  isCompetitive: boolean;
}) {
  const [onboardState, setOnboardState] = useState<OnboardState>(OnboardState.Money);
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);

  const advance = () => setOnboardState((x) => x + 1);

  useEffect(() => {
    if (onboardState === OnboardState.Keys + 1) {
      onClose(openTutorial);
    }
  }, [onboardState, onClose]);

  return (
    <ModalPane
      id={ModalName.Onboarding}
      title={`Welcome to Dark Forest Arena${isCompetitive ? ': Grand Prix' : ''}!`}
      hideClose
      visible={visible}
      onClose={() => onClose(openTutorial)}
    >
      {onboardState === OnboardState.Money && <OnboardMoney advance={advance} />}
      {onboardState === OnboardState.Keys && (
        <OnboardKeys advance={advance} setOpenTutorial={setOpenTutorial} />
      )}
    </ModalPane>
  );
}
