import { Planet, TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEmojiMessage } from '../../Backend/GameLogic/ArrivalUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Btn } from '../Components/Btn';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Row } from '../Components/Row';
import { Sub } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { EmojiPicker } from './EmojiPicker';

const TextWrapper = styled.span`
  width: 120px;
  font-size: ${dfstyles.fontSizeXS};
  text-align: center;
`;

export function EmojiPlanetNotification({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const gameManager = useUIManager().getGameManager();
  const emojiMessage = getEmojiMessage(wrapper.value);
  const currentEmoji = emojiMessage?.body?.emoji;
  const [chosenEmoji, setChosenEmoji] = useState(currentEmoji);

  useEffect(() => {
    setChosenEmoji(undefined);
  }, [wrapper?.value?.locationId]);

  if (wrapper.value?.needsServerRefresh) {
    return (
      <Row>
        <Sub style={{ width: '100%' }}>
          <LoadingSpinner initialText='Loading...' />
        </Sub>
      </Row>
    );
  } else if (emojiMessage !== undefined && currentEmoji !== undefined) {
    return (
      <Row>
        <Sub>Current emoji: {emojiMessage?.body?.emoji}</Sub>
        <Btn
          disabled={wrapper.value?.unconfirmedClearEmoji || wrapper.value?.needsServerRefresh}
          onClick={() => {
            if (wrapper.value?.locationId) {
              gameManager.clearEmoji(wrapper.value.locationId);
            }
          }}
        >
          <TextWrapper>Clear Emoji</TextWrapper>
        </Btn>
      </Row>
    );
  } else {
    const disabled =
      wrapper.value?.unconfirmedAddEmoji || wrapper.value?.needsServerRefresh || !chosenEmoji;

    return (
      <Row>
        <EmojiPicker emoji={chosenEmoji} setEmoji={setChosenEmoji} />

        <TooltipTrigger
          name={disabled ? TooltipName.Empty : undefined}
          extraContent='Choose an emoji!'
        >
          <Btn
            disabled={disabled}
            onClick={() => {
              if (wrapper.value?.locationId && chosenEmoji) {
                gameManager.setPlanetEmoji(wrapper.value?.locationId, chosenEmoji);
              }
            }}
          >
            <TextWrapper>Set Emoji</TextWrapper>
          </Btn>
        </TooltipTrigger>
      </Row>
    );
  }
}
