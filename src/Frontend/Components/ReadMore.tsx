import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { EmSpacer, TextButton } from './CoreUI';

export function ReadMore({
  children,
  height,
  text,
}: {
  children: React.ReactNode[] | React.ReactNode;
  height?: string;
  text?: string;
}) {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  return (
    <>
      <ContentContainer style={{ height: collapsed ? height : 'unset' }}>
        {children}
      </ContentContainer>
      {!collapsed && <EmSpacer height={0.1} />}
      <TextButton
        style={{
          fontSize: '80%',
          display: 'block',
          textAlign: 'right',
          marginTop: collapsed ? '-0.6em' : undefined,
        }}
        onClick={toggle}
      >
        {text ?? (collapsed ? 'more' : 'less')} info
      </TextButton>
    </>
  );
}

const ContentContainer = styled.div`
  overflow: hidden;
`;
