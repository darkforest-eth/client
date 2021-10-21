import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { Sub } from './Text';

export interface LoadingBarHandle {
  setFractionCompleted: (fractionCompleted: number) => void;
}

interface LoadingBarProps {
  prettyEntityName: string;
}

export const TextLoadingBar = React.forwardRef<LoadingBarHandle | undefined, LoadingBarProps>(
  TextLoadingBarImpl
);

export function TextLoadingBarImpl(
  { prettyEntityName }: LoadingBarProps,
  ref: React.Ref<LoadingBarHandle>
) {
  // value between 0 and 1
  const [fractionCompleted, setFractionCompleted] = useState(0);

  useImperativeHandle(ref, () => ({ setFractionCompleted }));

  const progressWidth = 20;

  let progressText = '';

  for (let i = 0; i < progressWidth; i++) {
    if (i < Math.floor(progressWidth * fractionCompleted)) {
      progressText += '=';
    } else {
      progressText += '\u00a0'; // &nbsp;
    }
  }

  const percentText = Math.floor(fractionCompleted * 100)
    .toString()
    .padStart(3, ' ');

  return (
    <span>
      [<Sub>{progressText}</Sub>]{' '}
      <span style={{ fontWeight: percentText === '100' ? 'bold' : undefined }}>
        {percentText}%{' '}
      </span>
      <LoadingTitle>{prettyEntityName}</LoadingTitle>
    </span>
  );
}

const LoadingTitle = styled.div`
  display: inline-block;
  color: ${dfstyles.colors.text};
`;
