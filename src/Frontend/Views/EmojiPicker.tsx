import React, { useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import Picker from 'emoji-picker-react';

export function EmojiPicker({
  emoji,
  setEmoji,
}: {
  emoji: string | undefined;
  setEmoji: (emoji: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <EmojiPickerContainer>
      <SelectedEmoji onClick={() => setPickerOpen(true)}>{emoji || '\u00a0'}</SelectedEmoji>
      <EmojiPickerElementContainer
        style={{
          display: pickerOpen ? 'initial' : 'none',
        }}
      >
        <Picker
          disableSearchBar={true}
          onEmojiClick={(event, emojiObject) => {
            setEmoji(emojiObject.emoji);
            setPickerOpen(false);
          }}
        />
      </EmojiPickerElementContainer>
    </EmojiPickerContainer>
  );
}

const SelectedEmoji = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${dfstyles.colors.backgroundlight};
  border: 1px solid ${dfstyles.colors.subtext};
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.5em;
  width: 30px;
  height: 30px;
  margin-right: 4px;

  &:hover {
    background-color: ${dfstyles.colors.backgroundlighter};
  }

  &:hover:active {
    border: 1px solid ${dfstyles.colors.text};
  }
`;

const EmojiPickerContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const EmojiPickerElementContainer = styled.div`
  position: absolute;
  bottom: 100%;
  right: 100%;

  .emoji-picker-react {
    background-color: ${dfstyles.colors.backgroundlight};
    box-shadow: none;
  }

  .emoji-group::before {
    background-color: ${dfstyles.colors.backgroundlight};
  }

  .emoji-categories {
    display: none;
  }

  .active-category-indicator-wrapper {
    display: none;
  }

  .emoji-search {
    display: none;
  }

  .content-wrapper::before {
    display: none;
  }
`;
