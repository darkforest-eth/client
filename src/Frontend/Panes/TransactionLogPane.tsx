import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { getPlanetName } from '@darkforest_eth/procedural';
import {
  isUnconfirmedActivateArtifactTx,
  isUnconfirmedBuyHatTx,
  isUnconfirmedCapturePlanetTx,
  isUnconfirmedDeactivateArtifactTx,
  isUnconfirmedDepositArtifactTx,
  isUnconfirmedFindArtifactTx,
  isUnconfirmedInitTx,
  isUnconfirmedInvadePlanetTx,
  isUnconfirmedMoveTx,
  isUnconfirmedProspectPlanetTx,
  isUnconfirmedRevealTx,
  isUnconfirmedTransferTx,
  isUnconfirmedUpgradeTx,
  isUnconfirmedWithdrawArtifactTx,
  isUnconfirmedWithdrawSilverTx,
} from '@darkforest_eth/serde';
import { ModalName, Planet, TooltipName, Transaction } from '@darkforest_eth/types';
import { IconType } from '@darkforest_eth/ui';
import { isEmpty, reverse, startCase, values } from 'lodash';
import React, { useCallback } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Icon } from '../Components/Icons';
import { Sub, TxLink } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { TransactionRecord, useTransactionLog, useUIManager } from '../Utils/AppHooks';
import { ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';
import { PlanetThumb } from './PlanetDexPane';
import { TooltipTrigger } from './Tooltip';

const PlanetName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;

const TableContainer = styled.div`
  min-width: 500px;
  overflow-y: scroll;
`;

function TransactionState({ tx }: { tx: Transaction }) {
  let element;
  if (tx.state === 'Init') {
    element = (
      <Sub style={{ overflowX: 'hidden', display: 'block' }}>
        <TooltipTrigger name={TooltipName.Empty} extraContent='Queued'>
          <Loader type='Circles' color={dfstyles.colors.subtext} height={23} width={23} />
        </TooltipTrigger>
      </Sub>
    );
  } else if (tx.state === 'Prioritized') {
    element = (
      <TooltipTrigger name={TooltipName.Empty} extraContent='Prioritized'>
        <Loader type='Circles' color={dfstyles.colors.dfyellow} height={23} width={23} />
      </TooltipTrigger>
    );
  } else if (['Submit', 'Processing'].includes(tx.state)) {
    element = (
      <TooltipTrigger name={TooltipName.Empty} extraContent='Submitting'>
        <Loader type='Circles' color={dfstyles.colors.dfblue} height={23} width={23} />
      </TooltipTrigger>
    );
  } else if (tx.state === 'Confirm') {
    element = (
      <TooltipTrigger name={TooltipName.Empty} extraContent='Confirmed!'>
        {' '}
        <Icon type={IconType.Check} />
      </TooltipTrigger>
    );
  } else if (tx.state === 'Cancel') {
    element = (
      <TooltipTrigger name={TooltipName.Empty} extraContent='Cancelled'>
        <Icon type={IconType.X} />
      </TooltipTrigger>
    );
  } else {
    element = (
      <TooltipTrigger
        name={TooltipName.Empty}
        extraContent={
          tx.hash
            ? 'Failed. Use the transaction has link to look up the failure on Tenderly.'
            : 'Failed.'
        }
      >
        <Icon type={IconType.X} />
      </TooltipTrigger>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '0 8px',
        lineHeight: '0',
      }}
    >
      {element}
    </div>
  );
}

const ActionButton = styled(Btn)`
  height: 24px;
  width: 36px;
`;

const ActionContainer = styled.div`
  min-width: 96px;
`;

const TransactionActions = ({
  tx,
  cancelTransaction,
  retryTransaction,
  prioritizeTransaction,
}: {
  tx: Transaction;
  cancelTransaction: (tx: Transaction) => void;
  retryTransaction: (tx: Transaction) => void;
  prioritizeTransaction: (tx: Transaction) => void;
}) => {
  let actions;

  if (tx.state === 'Fail') {
    actions = (
      <TooltipTrigger name={TooltipName.RetryTransaction}>
        <ActionButton onClick={() => retryTransaction(tx)}>
          <Icon type={IconType.Refresh} />
        </ActionButton>
      </TooltipTrigger>
    );
  } else if (tx.state === 'Init') {
    actions = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TooltipTrigger
          name={TooltipName.Empty}
          extraContent='Bump this transaction to the top of the queue.'
        >
          <ActionButton onClick={() => prioritizeTransaction(tx)}>
            <Icon type={IconType.FastForward} />
          </ActionButton>
        </TooltipTrigger>
        <Spacer width={8} />
        <TooltipTrigger name={TooltipName.CancelTransaction}>
          <ActionButton onClick={() => cancelTransaction(tx)}>
            <Icon type={IconType.X} />
          </ActionButton>
        </TooltipTrigger>
      </div>
    );
  } else if (tx.state === 'Prioritized') {
    actions = (
      <TooltipTrigger name={TooltipName.CancelTransaction}>
        <ActionButton onClick={() => cancelTransaction(tx)}>
          <Icon type={IconType.X} />
        </ActionButton>
      </TooltipTrigger>
    );
  }

  return <ActionContainer>{actions || '-'}</ActionContainer>;
};

const humanizeTransactionType = (tx: Transaction) => startCase(tx.intent.methodName);

/**
 * Grab the planet associated with the specified transction. Unfortunately, transaction intent
 * is not standardized right now, so we need to know all of the different ways the planet location
 * id is stored.
 */
const getPlanetFromTransaction = (
  uiManager: GameUIManager,
  tx: Transaction
): Planet | undefined => {
  const gameManager = uiManager.getGameManager();

  if (isUnconfirmedMoveTx(tx)) return gameManager.getPlanetWithId(tx.intent.from);
  if (isUnconfirmedUpgradeTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedActivateArtifactTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedRevealTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedInitTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedBuyHatTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedTransferTx(tx)) return gameManager.getPlanetWithId(tx.intent.planetId);
  if (isUnconfirmedFindArtifactTx(tx)) return gameManager.getPlanetWithId(tx.intent.planetId);
  if (isUnconfirmedDepositArtifactTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedWithdrawArtifactTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedProspectPlanetTx(tx)) return gameManager.getPlanetWithId(tx.intent.planetId);
  if (isUnconfirmedDeactivateArtifactTx(tx))
    return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedWithdrawSilverTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedInvadePlanetTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
  if (isUnconfirmedCapturePlanetTx(tx)) return gameManager.getPlanetWithId(tx.intent.locationId);
};

function QueuedTransactionsTable({ transactions }: { transactions: Wrapper<TransactionRecord> }) {
  const uiManager = useUIManager();
  const visibleTransactions = reverse(values(transactions.value));

  const headers = ['Type', 'Hash', 'State', 'Planet', 'Updated', 'Actions'];
  const alignments: Array<'r' | 'c' | 'l'> = ['c', 'c', 'c', 'c', 'c', 'c'];

  const cancelTransaction = useCallback(
    (tx: Transaction) => {
      uiManager.getGameManager().getContractAPI().cancelTransaction(tx);
    },
    [uiManager]
  );

  const retryTransaction = useCallback(
    (tx: Transaction) => {
      uiManager.getGameManager().getContractAPI().submitTransaction(tx.intent);
    },
    [uiManager]
  );

  const prioritizeTransaction = useCallback(
    (tx: Transaction) => {
      uiManager.getGameManager().getContractAPI().prioritizeTransaction(tx);
    },
    [uiManager]
  );

  const queuedTransctions = useCallback(() => {
    return values(transactions.value).filter((tx) => ['Init', 'Prioritized'].includes(tx.state));
  }, [transactions]);

  const cancelAllQueuedTransactions = useCallback(() => {
    queuedTransctions().forEach((queuedTx) => {
      try {
        cancelTransaction(queuedTx);
      } catch {}
    });
  }, [cancelTransaction, queuedTransctions]);

  const columns = [
    (tx: Transaction) => (
      <Sub
        style={{
          display: 'block',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '54px',
          overflow: 'hidden',
        }}
      >
        <TooltipTrigger name={TooltipName.Empty} extraContent={humanizeTransactionType(tx)}>
          {humanizeTransactionType(tx)}
        </TooltipTrigger>
      </Sub>
    ),
    (tx: Transaction) => (
      <div style={{ minWidth: '80px' }}>
        <TxLink tx={tx} />
      </div>
    ),
    (tx: Transaction) => <TransactionState tx={tx} />,
    (tx: Transaction) => {
      const planet = getPlanetFromTransaction(uiManager, tx);
      if (!planet) return <></>;

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minWidth: '144px',
          }}
        >
          <PlanetThumb planet={planet} />
          <PlanetLink planet={planet}>
            <PlanetName>{getPlanetName(planet)}</PlanetName>
          </PlanetLink>
        </div>
      );
    },
    (tx: Transaction) => (
      <Sub style={{ display: 'block', minWidth: '80px' }}>
        <TimeAgo
          date={tx.lastUpdatedAt}
          formatter={(value: number, unit: TimeAgo.Unit, suffix: TimeAgo.Suffix) => {
            let newUnit = unit as string;

            if (unit === 'second' && value === 0) return 'just now';
            if (unit === 'second') newUnit = 's';
            if (unit === 'minute') newUnit = 'm';
            if (unit === 'hour') newUnit = 'h';
            if (unit === 'day') newUnit = 'd';

            return `${value}${newUnit} ${suffix}`;
          }}
        />
      </Sub>
    ),
    (tx: Transaction) => (
      <TransactionActions
        tx={tx}
        cancelTransaction={cancelTransaction}
        retryTransaction={retryTransaction}
        prioritizeTransaction={prioritizeTransaction}
      />
    ),
  ];

  const sortingFunctions = [
    (a: Transaction, b: Transaction): number =>
      a.intent.methodName.localeCompare(b.intent.methodName),
    (_a: Transaction, _b: Transaction): number => 0,
    (a: Transaction, b: Transaction): number => a.state.localeCompare(b.state),
    (a: Transaction, b: Transaction): number => {
      const planetA = getPlanetFromTransaction(uiManager, a);
      if (!planetA) return -1;

      const planetB = getPlanetFromTransaction(uiManager, b);
      if (!planetB) return 1;

      return getPlanetName(planetB).localeCompare(getPlanetName(planetA));
    },
    (a: Transaction, b: Transaction): number => b.lastUpdatedAt - a.lastUpdatedAt,
  ];

  return (
    <TableContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {queuedTransctions().length !== 0 && (
            <Loader type='Circles' color={dfstyles.colors.subtext} height={23} width={23} />
          )}
          <Spacer width={8} />
          {queuedTransctions().length} queued transactions
          <Spacer width={8} />
          {queuedTransctions().length !== 0 && (
            <Btn onClick={cancelAllQueuedTransactions}>cancel all</Btn>
          )}
        </div>
      </div>
      <Spacer height={8} />
      <SortableTable
        paginated={true}
        rows={visibleTransactions}
        headers={headers}
        columns={columns}
        sortFunctions={sortingFunctions}
        alignments={alignments}
      />
    </TableContainer>
  );
}

export function TransactionLogPane({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const transactions = useTransactionLog();

  return (
    <ModalPane
      visible={visible}
      onClose={onClose}
      id={ModalName.TransactionLog}
      title='Transaction Log'
    >
      {isEmpty(transactions.value) ? (
        <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
          No transactions to be shown
        </CenterBackgroundSubtext>
      ) : (
        <QueuedTransactionsTable transactions={transactions} />
      )}
    </ModalPane>
  );
}
