import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

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
      <ReadMoreContainer
        onClick={toggle}
        collapsed={collapsed}
        height={(collapsed && height) || 'initial'}
      >
        {children}
      </ReadMoreContainer>
    </>
  );
}

const active = css`
  background-color: ${dfstyles.colors.backgroundlighter};
  border: 1px solid ${dfstyles.colors.border};
`;

const ReadMoreContainer = styled.div`
  ${({ height, collapsed }: { height: string; collapsed?: boolean }) => css`
    cursor: pointer;
    border: 1px solid ${dfstyles.colors.borderDark};
    padding: 4px;
    margin: 8px;
    border-radius: 3px;
    background-color: ${dfstyles.colors.backgroundlight};
    height: ${height};
    overflow: hidden;
    ${collapsed && 'user-select: none;'}

    &:hover,
    &:active {
      ${active}
    }
  `}
`;
