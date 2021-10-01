import { EthAddress } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { AlignCenterHorizontally, EmSpacer } from '../Components/CoreUI';
import { AccountLabel } from '../Components/Labels/Labels';
import { Sub, Text } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import { usePlayer, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { ModalTwitterVerifyIcon } from './ModalIcon';
import { ModalHook } from './ModalPane';
import { NetworkHealth } from './NetworkHealth';

const TopBarContainer = styled.div`
  z-index: ${GameWindowZIndex.MenuBar};
  padding: 0 2px;
`;

function BoardPlacement({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager, account);

  let content;

  if (!player.value) {
    content = <Sub>n/a</Sub>;
  } else {
    let formattedScore = 'n/a';
    if (player.value.score !== undefined && player.value.score !== null) {
      formattedScore = player.value.score.toLocaleString();
    }

    content = (
      <Sub>
        <TooltipTrigger name={TooltipName.Score}>
          score: <Text>{formattedScore}</Text>
        </TooltipTrigger>
      </Sub>
    );
  }

  return <Points>{content}</Points>;
}

const Points = styled.div`
  display: inline-block;
`;

export function TopBar({ twitterVerifyHook }: { twitterVerifyHook: ModalHook }) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager);
  const account = player.value?.address;
  const twitter = player.value?.twitter;

  return (
    <TopBarContainer>
      <AlignCenterHorizontally style={{ width: '100%', justifyContent: 'space-between' }}>
        <EmSpacer width={1} />
        <AccountLabel includeAddressIfHasTwitter={true} />
        <EmSpacer width={1} />
        <ModalTwitterVerifyIcon
          small
          hook={twitterVerifyHook}
          style={{
            width: !twitter ? '100px' : '1.5em',
            height: !twitter ? '2em' : '1.5em',
            border: !twitter ? undefined : 'none',
          }}
          text={!twitter ? 'Connect' : undefined}
        />
        <EmSpacer width={1} />
        <BoardPlacement account={account} />
        <EmSpacer width={1} />
      </AlignCenterHorizontally>
      <NetworkHealth />
    </TopBarContainer>
  );
}
