import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';

/**
 * This component allows you to render several tabs of content. Each tab can be selected for viewing
 * by clicking on its corresponding tab button. Useful for displaying lots of slightly different but
 * related information to the user.
 */
export function TabbedView({
  tabTitles,
  tabContents,
  style,
}: {
  tabTitles: string[];
  tabContents: (tabIndex: number) => React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div style={style}>
      <TabButtonContainer>
        {tabTitles.map((title, i) => (
          <TabButton
            key={i}
            active={i === selectedTabIndex}
            onClick={() => {
              setSelectedTabIndex(i);
            }}
          >
            {title}
          </TabButton>
        ))}
      </TabButtonContainer>
      <Spacer height={8} />
      {tabContents(selectedTabIndex)}
    </div>
  );
}

const TabButton = styled.div<{ active: boolean }>`
  ${({ active }: { active: boolean }) => css`
    color: ${dfstyles.colors.subtext};
    text-decoration: underline;
    border-radius: 3px;
    border: 1px solid ${dfstyles.colors.borderDarkest};
    padding: 4px 8px;
    margin-right: 4px;
    margin-left: 4px;
    flex-grow: 1;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: ${dfstyles.colors.text};
      background-color: ${dfstyles.colors.backgroundlighter};

      ${active &&
      css`
        color: ${dfstyles.colors.text};
        background-color: ${dfstyles.colors.dfgreendark};
      `}
    }

    ${active &&
    css`
      cursor: default;
      color: ${dfstyles.colors.text};
      background-color: ${dfstyles.colors.dfgreendark};
    `}
  `}
`;

const TabButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
