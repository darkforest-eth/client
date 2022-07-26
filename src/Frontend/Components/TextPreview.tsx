import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { TextInput } from './Input';

const DEFAULT_UNFOCUSED_WIDTH = '50px';
const DEFAULT_FOCUSED_WIDTH = '150px';

export function TextPreview({
  text = '',
  unFocusedWidth = DEFAULT_UNFOCUSED_WIDTH,
  focusedWidth = DEFAULT_FOCUSED_WIDTH,
  style,
  disabled = false,
}: {
  text?: string;
  unFocusedWidth?: string;
  focusedWidth?: string;
  maxLength?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const [isTextBox, setIsTextbox] = useState(false);

  const onClick = useCallback((e: React.SyntheticEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setIsTextbox(true);
  }, []);

  const onBlur = useCallback(() => {
    if (disabled) return;
    setIsTextbox(false);
  }, []);

  const ShortenedText = styled.span`
    ${({ width }: { width: string }) => css`
      cursor: ${disabled ? 'pointer' : 'zoom-in'};
      display: inline-block;
      width: ${width};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    `}
  `;

  if (isTextBox) {
    return (
      <InputContainer style={style} width={focusedWidth}>
        <TextInput selected={true} readonly={true} value={text} onBlur={onBlur} />
      </InputContainer>
    );
  }

  return (
    <ShortenedText style={style} width={unFocusedWidth} onClick={onClick}>
      {text}
    </ShortenedText>
  );
}

const InputContainer = styled.div`
  ${({ width }: { width: string }) => css`
    display: inline-block;
    width: ${width};
  `}
`;
