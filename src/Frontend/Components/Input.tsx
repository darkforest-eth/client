import React, { forwardRef } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const Input = forwardRef(InputImpl);

function InputImpl(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <DFInput
      {...props}
      ref={ref}
      disabled={false}
      onChange={props.disabled ? () => {} : props.onChange}
      onKeyUp={(e) => {
        // we stop propogation of key up events because key up is used
        // by dark forest at the document level for keyboard shortcuts
        // that bring up various panes.
        e.stopPropagation();
        if (props.onKeyUp) {
          props.onKeyUp(e);
        }
      }}
    />
  );
}

export const DFInput = styled.input`
  transition: background-color 0.2s color 0.2s width 0.2s !important;
  outline: none;
  background: ${dfstyles.colors.background};
  color: ${dfstyles.colors.subtext};
  border-radius: 4px;
  border: 1px solid ${dfstyles.colors.text};
  width: 20em;
  padding: 2px 6px;

  &:focus {
    background: ${dfstyles.colors.backgroundlight};
    color: ${dfstyles.colors.text};
  }
`;
