import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Planet } from '@darkforest_eth/types';
import { Btn } from '../Components/Btn';
import { Sub } from '../Components/Text';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { getEmojiMessage } from '../../Backend/GameLogic/ArrivalUtils';
import { SpacedFlexRow } from '../Components/FlexRows';
import { LoadingSpinner } from '../Components/LoadingSpinner';
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
      <SpacedFlexRow>
        <Sub>off-chain data</Sub>
        <Sub>
          <LoadingSpinner initialText={'Loading...'} />
        </Sub>
      </SpacedFlexRow>
    );
  } else if (emojiMessage !== undefined && currentEmoji !== undefined) {
    content = (
      <>
        <SpacedFlexRow>
          <Sub>current emoji: {emojiMessage?.body?.emoji}</Sub>
          <Btn
            disabled={wrapper.value?.unconfirmedClearEmoji || wrapper.value?.needsServerRefresh}
            onClick={() => {
              if (wrapper.value?.locationId) {
                gameManager.clearEmoji(wrapper.value.locationId);
              }
            }}
          >
            Clear Emoji
          </Btn>
        </SpacedFlexRow>
      </>
    );
  } else {
    content = (
      <>
        <SpacedFlexRow>
          <Sub>set planet emoji</Sub>

          <PostEmojiActionsContainer>
            <EmojiPicker emoji={chosenEmoji} setEmoji={setChosenEmoji} />

            <PostButton
              disabled={
                wrapper.value?.unconfirmedAddEmoji ||
                wrapper.value?.needsServerRefresh ||
                !chosenEmoji
              }
              onClick={() => {
                if (wrapper.value?.locationId && chosenEmoji) {
                  gameManager.setPlanetEmoji(wrapper.value?.locationId, chosenEmoji);
                }
              }}
            >
              Set
            </PostButton>
          </PostEmojiActionsContainer>
        </SpacedFlexRow>
      </>
    );
  }

  return <RowContainer>{content}</RowContainer>;
}

const RowContainer = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostEmojiActionsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PostButton = styled(Btn)`
  width: 60px;
  height: 30px;
  padding: 0;
  display: 'inline-block';
`;
