import React from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export interface DropdownItem {
  label: string;
  action: () => void;
}

export interface DropdownProps {
  items: DropdownItem[];
  open: boolean;
  title?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, open, title }) => {
  if (items.length == 0) {
    return <></>;
  }
  if (!open) return <></>;
  return (
    <Root>
      <Content>
        {title && <span>{title}</span>}
        {items.map((item, idx) => (
          <Item onMouseDown={item.action} key={idx}>
            {item.label}
          </Item>
        ))}
      </Content>
    </Root>
  );
};

const Root = styled.div`
  z-index: 2;
  position: absolute;
  top: 100%;
`;

const Content = styled.div`
  background: ${dfstyles.colors.backgroundlighter};
  color: #bbb;
  border-radius: 6px;
  width: 100%;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const Item = styled.div`
  color: #bbb;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: ${dfstyles.colors.backgrounddark};
    color: #fff;
    outline: none;
  }
`;
