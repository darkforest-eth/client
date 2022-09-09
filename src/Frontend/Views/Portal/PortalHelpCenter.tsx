import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { IconType } from '@darkforest_eth/ui';

import { useDisableScroll } from '../../Utils/AppHooks';
import { PortalModal } from './Components/PortalModal';
import { theme } from './styleUtils';
import { CloseButton } from './Account';
import { Icon } from '../../Components/Icons';

const HelpContent = `
Welcome to Dark Forest Arena Grand Prix! 

Grand Prix: Seasons is a formal competition based on the Dark Forest speedruns we introduced in June. During a season, players compete to get the fastest cumulative time across a new race every week.

Here is an overview of the Grand Prix Portal, which you can use to compete and view data about competitions.

## Home Page
Here you can jump into a new round, watch other live players, and view your ranking on the current round and the entire season.

## History Page

Use this page to replay old Grand Prix rounds and view your Badges.

## Create Page
Get creative and fully customize your own Dark Forest Arena experience.

## Community
Explore and play unofficial, community-made maps.

## Learn
Pick up the basics with our tutorial or master the intricacies of Dark Forest with our strategy guide.
`;

export const PortalHelpCenter = () => {
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [blockScroll, allowScroll] = useDisableScroll();

  useEffect(() => {
    if (openHelp) blockScroll();
    else allowScroll();
  }, [openHelp]);

  return (
    <>
      {openHelp && (
        <PortalModal width={520} onClick={() => setOpenHelp(false)}>
          <Content>
            <Header>
              <span
                style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '1.2rem' }}
              >
                Help Center
              </span>
            </Header>
            <CloseButton
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              onClick={() => setOpenHelp(false)}
            >
              <Icon type={IconType.X} />
            </CloseButton>
            <ReactMarkdown children={HelpContent} />
          </Content>
        </PortalModal>
      )}
      <Btn onClick={() => setOpenHelp(true)}>
        <QuestionMark />
      </Btn>
    </>
  );
};

const Btn = styled.button`
  background: ${theme.colors.bg2};
  color: ${theme.colors.fgMuted};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.bg3};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.bg3};
    color: ${theme.colors.fgPrimary};
  }
`;

const QuestionMark = () => (
  <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    ></path>
  </svg>
);

const Content = styled.div`
  text-align: left;
  color: ${theme.colors.fgMuted2};
  line-height: 1.5;
  h2 {
		margin-bottom: ${theme.spacing.md}
		font-size: 1.1rem;
		color: ${theme.colors.fgPrimary};
  }
	p {
		margin-bottom: ${theme.spacing.lg};
	}
`;

const Header = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: ${theme.spacing.lg};
`;
