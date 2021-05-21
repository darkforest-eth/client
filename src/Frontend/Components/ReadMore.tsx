import React, { useState } from 'react';
import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { Spacer } from './CoreUI';

export function ReadMore({
  children,
  height,
}: {
  children: React.ReactChild[] | React.ReactChild;
  height?: string;
}) {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  return (
    <>
      <ReadMoreContainer collapsed={collapsed} height={height}>
        {children}
      </ReadMoreContainer>
      <Spacer height={4} />
      <Toggle onClick={toggle} color={dfstyles.colors.subbertext}>
        Read {collapsed ? 'More' : 'Less'}
      </Toggle>
    </>
  );
}

const Toggle = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${dfstyles.colors.subtext};

  &:hover {
    color: white;
  }
`;

const ReadMoreContainer = styled.div`
  ${({ collapsed, height }: { collapsed: boolean; height?: string }) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    ${collapsed && `max-height: ${height === undefined ? `50px` : height};`}
  `}
`;
