import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const Input = forwardRef(InputImpl);

interface InputProps {
  wide?: boolean;
}

function InputImpl(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <DFInput
      {...props}
      ref={ref}
      disabled={false}
      onChange={props.disabled ? () => {} : props.onChange}
      onKeyUp={(e) => {
        if (props.onKeyUp) {
          props.onKeyUp(e);
        }
      }}
    />
  );
}

export const DFInput = styled.input`
  ${({ wide }: { wide?: boolean }) => css`
    outline: none;
    background: ${dfstyles.colors.background};
    color: ${dfstyles.colors.subtext};
    border-radius: 4px;
    border: 1px solid ${dfstyles.colors.borderDark};
    ${wide ? `width: 100%;` : `width: 21em;`}
    padding: 2px 12px;

    &:hover,
    &:focus {
      border: 1px solid ${dfstyles.colors.border};
      background: ${dfstyles.colors.backgroundlight};
      color: ${dfstyles.colors.text};
    }
  `}
`;
