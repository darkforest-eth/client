import { Planet } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEmojiMessage } from '../../Backend/GameLogic/ArrivalUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Btn } from '../Components/Btn';
import { SpreadApart } from '../Components/CoreUI';
import { SpacedFlexRow } from '../Components/FlexRows';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Sub } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useUIManager } from '../Utils/AppHooks';
import { EmojiPicker } from './EmojiPicker';

export function EmojiPlanetNotification({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const gameManager = useUIManager().getGameManager();
  const emojiMessage = getEmojiMessage(wrapper.value);
  const currentEmoji = emojiMessage?.body?.emoji;
  const [chosenEmoji, setChosenEmoji] = useState(currentEmoji);

  useEffect(() => {
    setChosenEmoji(undefined);
  }, [wrapper?.value?.locationId]);

  let content;

  if (wrapper.value?.needsServerRefresh) {
    content = (
      <Sub style={{ width: '100%' }}>
        <LoadingSpinner initialText={'Loading...'} />
      </Sub>
    );
  } else if (emojiMessage !== undefined && currentEmoji !== undefined) {
    content = (
      <>
        <Sub style={{ width: '100%' }}>
          <SpreadApart>
            <span>current emoji: {emojiMessage?.body?.emoji}</span>
            <Btn
              style={{ width: '180px' }}
              disabled={wrapper.value?.unconfirmedClearEmoji || wrapper.value?.needsServerRefresh}
              onClick={() => {
                if (wrapper.value?.locationId) {
                  gameManager.clearEmoji(wrapper.value.locationId);
                }
              }}
            >
              Clear Emoji
            </Btn>
          </SpreadApart>
        </Sub>
      </>
    );
  } else {
    const disabled =
      wrapper.value?.unconfirmedAddEmoji || wrapper.value?.needsServerRefresh || !chosenEmoji;

    content = (
      <>
        <SpacedFlexRow>
          <SpreadApart>
            <EmojiPicker emoji={chosenEmoji} setEmoji={setChosenEmoji} />

            <TooltipTrigger
              name={disabled ? TooltipName.Empty : undefined}
              extraContent={<>choose an emoji!</>}
            >
              <Btn
                style={{ width: '180px' }}
                disabled={disabled}
                onClick={() => {
                  if (wrapper.value?.locationId && chosenEmoji) {
                    gameManager.setPlanetEmoji(wrapper.value?.locationId, chosenEmoji);
                  }
                }}
              >
                Set Emoji
              </Btn>
            </TooltipTrigger>
          </SpreadApart>
        </SpacedFlexRow>
      </>
    );
  }

  return <RowContainer>{content}</RowContainer>;
}

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
