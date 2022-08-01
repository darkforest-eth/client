import { getConfigName } from '@darkforest_eth/procedural';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from '../../Components/CoreUI';
import dfstyles from '../../Styles/dfstyles';
import { useTwitters } from '../../Utils/AppHooks';
import { formatStartTime } from '../../Utils/TimeUtils';

export interface TimelineProps {
  configHashes: string[];
}

export interface RoundHistoryItem {
  configHash: string;
  name: string;
  startTime: number;
  winner: string;
}

export const PortalHistoryView: React.FC<{}> = ({}) => {
  const [rounds, setRounds] = useState<RoundHistoryItem[]>([]);
  const history = useHistory();
  const twitters = useTwitters() as Object;

  useEffect(() => {
    async function getRoundHistory() {
      const rounds = await fetch('http://localhost:3000/rounds', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const roundText = await rounds.text();
      return JSON.parse(roundText).body;
    }
    getRoundHistory().then((rounds) => {
      rounds.forEach((round: any) => {
        const roundToAdd = {
          configHash: round.configHash,
          name: getConfigName(round.configHash),
          startTime: round.startTime,
          endTIme: round.endTime,
          winner: round.winner,
        };
        setRounds((prevRounds) => [...prevRounds, roundToAdd]);
      });
    });
  }, []);

  const addressToTwitter = (address: string) => {
    const foundTwitter = Object.entries(twitters).find((t) => t[1] == address.toLowerCase().trim());
    if (foundTwitter) {
      return foundTwitter[0];
    } else {
      return address;
    }
  };

  return (
    <Container>
      <Header>Previous Grand Prix Rounds</Header>
      {rounds.length === 0 ? (
        <span>Unable to load Grand Prix round history.</span>
      ) : (
        <TimelineContainer>
          <thead>
            <tr>
              <TimelineHeader>Started</TimelineHeader>
              <TimelineHeader>Name</TimelineHeader>
              <TimelineHeader>Winner</TimelineHeader>
            </tr>
          </thead>
          <tbody>
            {rounds
              .filter((round) => round.startTime < Date.now())
              .map((historyItem: RoundHistoryItem) => (
                <TimelineRow
                  onClick={() => {
                    history.push(`/portal/map/${historyItem.configHash}`);
                  }}
                >
                  <TimelineItem>{formatStartTime(historyItem.startTime)}</TimelineItem>
                  <TimelineItem>{historyItem.name}</TimelineItem>
                  <TimelineItem>
                    {historyItem.winner !== '' ? (
                      <Link to={`https://twitter.com/${addressToTwitter(historyItem.winner)}`}>
                        {addressToTwitter(historyItem.winner)}
                      </Link>
                    ) : (
                      'None'
                    )}
                  </TimelineItem>
                  <TimelineItem>
                    <HoverIcon />
                  </TimelineItem>
                </TimelineRow>
              ))}
          </tbody>
        </TimelineContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const TimelineContainer = styled.table`
  margin-top: 3rem;
  border-collapse: collapse;
  display: block;
  border-spacing: 0;
  font-size: 1rem;
  overflow-y: auto;
`;

const TimelineRow = styled.tr`
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #252525;
  }
`;

const TimelineHeader = styled.th`
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${dfstyles.colors.subtext};
`;

const TimelineItem = styled.td`
  padding: 8px 16px;
`;

const HoverIcon = () => {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z'
        fill='currentColor'
        fill-rule='evenodd'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};
