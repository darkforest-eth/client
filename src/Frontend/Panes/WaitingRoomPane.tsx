import { EMPTY_ADDRESS, RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { formatNumber } from '@darkforest_eth/gamelogic';
import {
  getPlanetClass,
  getPlanetCosmetic,
  getPlanetName,
  getPlayerColor,
  rgbStr,
} from '@darkforest_eth/procedural';
import { engineConsts } from '@darkforest_eth/renderer';
import { address, isUnconfirmedNotReadyTx, isUnconfirmedReadyTx } from '@darkforest_eth/serde';
import { ModalName, Planet, PlanetType, Player, RGBVec } from '@darkforest_eth/types';
import React, { useEffect, useState, useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { getPlanetRank } from '../../Backend/Utils/Utils';
import { ContractsAPIEvent } from '../../_types/darkforest/api/ContractsAPITypes';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { AccountLabel } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Row } from '../Components/Row';
import { Green, Red, Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import dfstyles from '../Styles/dfstyles';
import { useGameStarted, useUIManager } from '../Utils/AppHooks';
import { getReadyEvent } from '../Utils/helpers';
import { ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';
import { Table } from '../Views/Table';
import { PlanetThumb } from './PlanetDexPane';

const StyledOnboardingContent = styled.div`
  width: 25em;
  //   height: 25em;
  position: relative;
  color: ${dfstyles.colors.text};
`;
const ReadyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 2em;
`;
const StyledPlanetThumb = styled.div<{ iconColor?: string }>`
  width: 20px;
  height: 20px;
  position: relative;
  line-height: 0;
  z-index: 1;

  /* Set the Icon color if specified on the outer component */
  --df-icon-color: ${({ iconColor }) => iconColor};
`;

const PlanetElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlanetName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const TableContainer = styled.div`
  overflow-y: scroll;
`;

export function WaitingRoomPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();
  const gameManager = uiManager.getGameManager();
  const objects = gameManager.getGameObjects();
  const started = useGameStarted();
  const startTime = gameManager.getStartTime();
  const spawnPlanets = uiManager.getSpawnPlanets();
  const player = uiManager.getPlayer();
  const [players, setPlayers] = useState<Array<Player | undefined>>([]);
  const confirmStart = gameManager.getContractConstants().CONFIRM_START;
  // refresh players every 10 seconds
  useEffect(() => {
    if (!uiManager) return;
    if (!visible) return;
    const refreshPlayers = () => {
      if (!uiManager) return;
      const ps: Array<Player | undefined> = [];
      spawnPlanets.forEach((planet) => ps.push(uiManager.getPlayer(planet.owner)));
      setPlayers(ps);
    };

    const intervalId = setInterval(refreshPlayers, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  // Play audio when ready
  useEffect(() => {
    const audio = new Audio('../../../public/ready-alert.mp3');
    const listener = () => {
      if (started && startTime && Math.abs(startTime - Date.now()/1000) < 60) {
        audio.play();
      }
    };
    audio.addEventListener('canplaythrough', listener);
    return () => {
      audio.pause(), audio.removeEventListener('canplaythrough', listener);
    };
  }, [started]);

  const submitting = useMemo(() => {
    const txs = uiManager.getGameManager().getGameObjects().transactions;
    const submit = txs.hasTransaction(isUnconfirmedReadyTx) || txs.hasTransaction(isUnconfirmedNotReadyTx);
    return submit;
  }, [
    objects.transactions.getTransactions(isUnconfirmedReadyTx),
    objects.transactions.getTransactions(isUnconfirmedNotReadyTx),
  ]);

  function HelpContent() {
    return (
      <div>
        <p>This is the waiting room.</p>
        <Spacer height={8} />
        {confirmStart ? (
          <p>Once all players initialize and press READY, the game will begin.</p>
        ) : (
          <p>Once a player makes a move, the game will begin.</p>
        )}
      </div>
    );
  }

  const headers = ['', 'Planet', 'Owner', confirmStart ? 'Ready' : ''];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'l', 'l', 'r'];

  const columns = [
    //thumb
    (planet: Planet) => <PlanetThumb planet={planet} />,
    // name
    (planet: Planet) => (
      <PlanetLink planet={planet}>
        <PlanetName>{getPlanetName(planet)}</PlanetName>
      </PlanetLink>
    ),
    //player
    (planet: Planet) => (
      <Sub>
        {planet.owner === EMPTY_ADDRESS ? 'nobody' : <AccountLabel ethAddress={planet.owner} />}
        {planet.owner == player?.address && '(you)'}
      </Sub>
    ),
    //ready
    (planet: Planet, i: number) => {
      if (!confirmStart) return <></>;
      const player = players[i];
      if (started || (player && player.ready)) return <Green>Y</Green>;
      return <Red>N</Red>;
    },
  ];
  let content;
  if (!player) {
    return <></>;
  }
  if (spawnPlanets.length === 0) {
    content = (
      <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
        Loading...
      </CenterBackgroundSubtext>
    );
  } else {
    const ready = player.ready;
    content = (
      <StyledOnboardingContent>
        {started ? (
          <Row>
            <Green>The game has started! </Green>
          </Row>
        ) : (
          <>
            <Row>Welcome to Dark Forest Arena!</Row>
            {confirmStart ? (
              <>
                <Row>Once everyone is ready, the game will begin.</Row>
                <ReadyContainer>
                  <Btn
                    size='stretch'
                    active={submitting}
                    disabled={submitting}
                    onClick={async () => {
                      if (ready) {
                        const res = await uiManager.getGameManager().notReady();
                      } else {
                        const res = await uiManager.getGameManager().ready();
                        const rct = await res.confirmedPromise
                        const eventDetails = getReadyEvent(rct, gameManager.getContract());
                        gameManager.getContractAPI().emit(ContractsAPIEvent.PlayerUpdate, address(eventDetails.player));
                        console.log(`updated player`, eventDetails.player);
                      }
                    }}
                  >
                    {submitting ? (
                      <LoadingSpinner initialText={'Submitting...'} />
                    ) : (
                      `I'm ${ready ? 'not ready' : 'ready'}`
                    )}
                  </Btn>
                </ReadyContainer>
              </>
            ) : (
              <Row>Once a player moves, the game will begin.</Row>
            )}
          </>
        )}

        <TableContainer>
          <Table rows={spawnPlanets} headers={headers} columns={columns} alignments={alignments} />
        </TableContainer>
      </StyledOnboardingContent>
    );
  }

  return (
    <ModalPane
      visible={visible}
      onClose={onClose}
      hideClose={!uiManager.gameStarted}
      id={ModalName.WaitingRoom}
      title='Waiting Room'
      helpContent={HelpContent}
    >
      {content}
    </ModalPane>
  );
}
