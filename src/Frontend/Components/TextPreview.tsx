import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Input } from './Input';

const DEFAULT_UNFOCUSED_WIDTH = 50;
const DEFAULT_FOCUSED_WIDTH = 150;

export function TextPreview({
  text,
  unFocusedWidthPx,
  focusedWidthPx,
}: {
  text: string;
  unFocusedWidthPx?: number;
  focusedWidthPx?: number;
  maxLength?: number;
}) {
  const [isTextBox, setIsTextbox] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const onClick = useCallback(() => {
    setIsTextbox(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsTextbox(false);
    setInputRef(null);
  }, []);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  if (isTextBox) {
    return (
      <PreviewTextInput
        width={focusedWidthPx === undefined ? DEFAULT_FOCUSED_WIDTH : focusedWidthPx}
        value={text}
        onChange={() => {}}
        onBlur={onBlur}
        ref={(element: HTMLInputElement) => setInputRef(element)}
      />
    );
  }

  return (
    <ShortenedText
      width={unFocusedWidthPx === undefined ? DEFAULT_UNFOCUSED_WIDTH : unFocusedWidthPx}
      onClick={onClick}
    >
      {text}
    </ShortenedText>
  );
}

const ShortenedText = styled.span`
  ${({ width }: { width: number }) => css`
    cursor: zoom-in;
    display: block;
    width: ${width}px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const PreviewTextInput = styled(Input)`
  ${({ width }: { width: number }) => css`
    width: ${width}px;
    padding: 2px 4px;
    display: block;
  `}
`;
