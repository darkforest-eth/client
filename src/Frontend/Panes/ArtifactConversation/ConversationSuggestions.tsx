import React from 'react';
import styled, { css } from 'styled-components';
import { Sub } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';

export function ConversationSuggestions({
  exampleQuestions,
  selectQuestion,
  disabled,
}: {
  exampleQuestions?: string[];
  selectQuestion: (question: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      {exampleQuestions && exampleQuestions.length > 0 && (
        <Title>Suggested Questions (if you're feeling lazy):</Title>
      )}
      {exampleQuestions?.map((q, i) => (
        <SuggestedQuestion
          disabled={disabled}
          key={i}
          onClick={() => !disabled && selectQuestion(q)}
        >
          {q}
        </SuggestedQuestion>
      ))}
    </div>
  );
}

const Title = styled(Sub)`
  padding: 4px 4px 2px 4px;
`;

const SuggestedQuestion = styled.div`
  ${({ disabled }: { disabled: boolean }) => css`
    box-sizing: border-box;
    border-radius: 2px;
    background-color: ${dfstyles.colors.background};
    color: ${disabled ? dfstyles.colors.subtext : dfstyles.colors.text};
    padding: 2px 4px;
    cursor: pointer;
    border: 1px solid transparent;

    ${!disabled &&
    css`
      &:hover {
        background-color: ${dfstyles.colors.backgroundlight};
        border: 1px solid ${dfstyles.colors.dfblue};
      }
    `}
  `}
`;
