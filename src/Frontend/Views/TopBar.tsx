import { EthAddress } from '@darkforest_eth/types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AlignCenterHorizontally, EmSpacer, Spacer } from '../Components/CoreUI';
import { LoggedInPlayer } from '../Components/Labels/Labels';
import { Sub, White } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import { usePlayer, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { usePoll } from '../Utils/Hooks';
import { ModalTwitterVerifyIcon } from './ModalIcon';
import { ModalHook } from './ModalPane';

const TopBarContainer = styled.div`
  z-index: ${GameWindowZIndex.MenuBar};
  padding: 0 2px;
`;

function TopBarSection({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Spacer width={8} />
      {children}
    </>
  );
}

function BoardPlacement({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const [score, setScore] = useState<number | undefined>();

  const syncScore = useCallback(() => {
    setScore(uiManager.getMyScore());
  }, [uiManager, setScore]);

  usePoll(syncScore, 5000);

  let content;

  if (!account) {
    content = <Sub>error loading account</Sub>;
  } else {
    content = (
      <Sub>
        <TooltipTrigger name={TooltipName.Score}>
          <White>{score || 0}</White> pts
        </TooltipTrigger>
      </Sub>
    );
  }

  return <Points>{content}</Points>;
}

const Points = styled.div`
  display: inline-block;
`;

function ScoreSection({ account }: { account: EthAddress | undefined }) {
  return (
    <TopBarSection>
      <BoardPlacement account={account} />
    </TopBarSection>
  );
}

export function TopBar({ twitterVerifyHook }: { twitterVerifyHook: ModalHook }) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager);
  const account = player.value?.address;
  const twitter = player.value?.twitter;

  return (
    <TopBarContainer>
      <AlignCenterHorizontally style={{ width: '100%', justifyContent: 'space-between' }}>
        <LoggedInPlayer />
        <EmSpacer width={1} />
        <ModalTwitterVerifyIcon
          hook={twitterVerifyHook}
          style={{
            width: !twitter ? '100px' : '1.5em',
            height: !twitter ? '2em' : '1.5em',
            padding: '8px 8px',
            borderColor: !twitter ? undefined : 'none',
          }}
          text={!twitter ? 'Connect' : undefined}
        />
        <EmSpacer width={1} />
        <ScoreSection account={account} />
      </AlignCenterHorizontally>
    </TopBarContainer>
  );
}
