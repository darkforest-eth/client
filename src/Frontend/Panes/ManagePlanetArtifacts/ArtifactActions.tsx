import { Artifact, ArtifactRarityNames, ArtifactType } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { artifactAvailableTimestamp, isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { HoverableTooltip } from '../../Components/CoreUI';
import { Hoverable, TOOLTIP_SLOW } from '../../Components/Hoverable';
import { ActivateIcon, DeactivateIcon, DepositIcon, WithdrawIcon } from '../../Components/Icons';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Smaller, Sub } from '../../Components/Text';
import { TimeUntil } from '../../Components/TimeUntil';

export function ArtifactActions({
  artifact,
  viewingDepositList,
  anyArtifactActive,
  planetOwnedByPlayer,
  planetIsTradingPost,
  planetLevel,
  activate,
  deactivate,
  deposit,
  withdraw,
}: {
  artifact: Artifact;
  viewingDepositList: boolean;
  anyArtifactActive: boolean;
  planetOwnedByPlayer: boolean;
  planetIsTradingPost: boolean;
  planetLevel: number;
  activate: (artifact: Artifact) => void;
  deactivate: (artifact: Artifact) => void;
  deposit: (artifact: Artifact) => void;
  withdraw: (artifact: Artifact) => void;
}) {
  const actions: Array<{
    tooltip: string;
    action: () => void;
    icon: React.ReactElement;
  }> = [];

  if (artifact.unconfirmedWithdrawArtifact) {
    return (
      <ArtifactSpinnerContainer>
        <LoadingSpinner initialText={'Withdrawing...'} />
      </ArtifactSpinnerContainer>
    );
  } else if (artifact.unconfirmedDepositArtifact) {
    return (
      <ArtifactSpinnerContainer>
        <LoadingSpinner initialText={'Depositing...'} />
      </ArtifactSpinnerContainer>
    );
  } else if (artifact.unconfirmedActivateArtifact) {
    return (
      <ArtifactSpinnerContainer>
        <LoadingSpinner initialText={'Activating...'} />
      </ArtifactSpinnerContainer>
    );
  } else if (artifact.unconfirmedDeactivateArtifact) {
    return (
      <ArtifactSpinnerContainer>
        <LoadingSpinner initialText={'Deactivating...'} />
      </ArtifactSpinnerContainer>
    );
  } else if (artifact.unconfirmedMove) {
    return (
      <ArtifactSpinnerContainer>
        <LoadingSpinner initialText={'Moving...'} />
      </ArtifactSpinnerContainer>
    );
  }

  const now = Date.now();
  const available = artifactAvailableTimestamp(artifact);

  const waitUntilAvailable = available - now;
  const availableToActivate = waitUntilAvailable <= -0;

  const canHandleArtifact = planetLevel > artifact.rarity;

  if (planetOwnedByPlayer) {
    if (viewingDepositList) {
      // should only be able to view deposit list in the first place if planet is trading post
      // but just in case...
      if (planetIsTradingPost) {
        actions.unshift({
          tooltip: canHandleArtifact
            ? 'deposit this artifact'
            : `${ArtifactRarityNames[artifact.rarity]} artifacts can only be deposited into level ${
                artifact.rarity + 1
              }+ spacetime rips`,
          icon: <DepositIcon color={canHandleArtifact ? undefined : 'grey'} />,
          action: canHandleArtifact ? () => deposit(artifact) : () => {},
        });
      }
    } else if (isActivated(artifact) && artifact.artifactType !== ArtifactType.BlackDomain) {
      actions.unshift({
        tooltip: 'deactivate this artifact',
        icon: <DeactivateIcon />,
        action: () => deactivate(artifact),
      });
    } else {
      if (planetIsTradingPost) {
        actions.unshift({
          tooltip: canHandleArtifact
            ? 'withdraw this artifact'
            : `${ArtifactRarityNames[artifact.rarity]} artifacts can only be withdrawn from level ${
                artifact.rarity + 1
              }+ spacetime rips`,
          icon: <WithdrawIcon color={canHandleArtifact ? undefined : 'grey'} />,
          action: canHandleArtifact ? () => withdraw(artifact) : () => {},
        });
      }

      if (!anyArtifactActive && availableToActivate) {
        actions.unshift({
          tooltip: 'activate this artifact',
          icon: <ActivateIcon />,
          action: () => activate(artifact),
        });
      }
    }
  }

  return (
    <ActionsContainer>
      {!availableToActivate && (
        <Hoverable
          quick
          hoverDelay={TOOLTIP_SLOW}
          hoverContents={() => (
            <HoverableTooltip>
              wait time until you can <br /> activate this artifact
            </HoverableTooltip>
          )}
        >
          <Smaller>
            <Sub>
              <TimeUntil timestamp={available} ifPassed={''} />
            </Sub>
          </Smaller>
        </Hoverable>
      )}
      {actions.map((a, i) => (
        <Hoverable
          key={i}
          quick
          hoverDelay={TOOLTIP_SLOW}
          hoverContents={() => <HoverableTooltip>{a.tooltip}</HoverableTooltip>}
        >
          <ArtifactActionIconContainer
            onClick={(e) => {
              a.action();
              e.stopPropagation();
            }}
          >
            {a.icon}
          </ArtifactActionIconContainer>
        </Hoverable>
      ))}
    </ActionsContainer>
  );
}
const ArtifactActionIconContainer = styled.div`
  line-height: 0;
  padding-left: 8px;
`;

const ArtifactSpinnerContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 4px;
  font-size: 80%;
`;

const ActionsContainer = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
