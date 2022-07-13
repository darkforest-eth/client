import React, { useState } from 'react';
import styled from 'styled-components';

const onCopy = (
  textToCopy: string,
  onCopySuccess: () => void,
  onCopyError: (msg: string) => void
) => {
  if (!navigator.clipboard) {
    onCopyError('Clipboard API not supported');
    return;
  }
  navigator.clipboard.writeText(textToCopy).then(
    () => {
      console.log('Async: Copying to clipboard was successful!');
      onCopySuccess();
    },
    (err) => {
      console.error('Async: Could not copy text: ', err);
      onCopyError("Couldn't copy to clipboard");
    }
  );
};

export const CopyableInput: React.FC<{
  copyText: string;
  displayValue?: string;
  label?: string;
  onCopyError: (msg: string) => void;
}> = ({ copyText, displayValue, label, onCopyError }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopySuccess = () => {
    setCopied(true);
  };
  return (
    <Container>
      {label && <LabelText>{label}</LabelText>}
      <InputContainer>
        <Input value={displayValue ?? copyText} onChange = {()=>{}}/>
        <CopyButton onClick={() => onCopy(copyText, handleCopySuccess, onCopyError)}>
          {copied ? '✓ Copied' : 'Copy'}
        </CopyButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content;
  position: absolute;
  right: 8px;
  height: calc(49px - 16px);
  border-radius 4px;
  background: #252525;
  border: 1px solid #5F5F5F;
  color: #bbb;
	padding: 0 8px;
	transition: .2s ease-in-out;
	&:hover {
		background: #3D3D3D;
	}
`;

const LabelText = styled.span`
  color: rgba(255, 255, 255, 0.6);
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #bbb;
  padding: 16px 8px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  background: transparent;
`;
