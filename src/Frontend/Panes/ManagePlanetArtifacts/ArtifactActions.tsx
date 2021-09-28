import { Artifact, ArtifactType } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { artifactAvailableTimestamp, isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { ActivateIcon, DeactivateIcon, DepositIcon, WithdrawIcon } from '../../Components/Icons';
import { ArtifactRarityLabelAnim } from '../../Components/Labels/ArtifactLabels';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Smaller, Sub } from '../../Components/Text';
import { TimeUntil } from '../../Components/TimeUntil';
import { TooltipName } from '../../Game/WindowManager';
import { TooltipTrigger, TooltipTriggerProps } from '../Tooltip';

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
  const actions: TooltipTriggerProps[] = [];

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
      if (planetIsTradingPost) {
        actions.unshift({
          name: TooltipName.DepositArtifact,
          extraContent: !canHandleArtifact && (
            <>
              . <ArtifactRarityLabelAnim rarity={artifact.rarity} />
              {` artifacts can only be deposited on level ${artifact.rarity + 1}+ spacetime rips`}
            </>
          ),
          children: (
            <ArtifactActionIconContainer
              onClick={(e) => {
                e.stopPropagation();
                canHandleArtifact && deposit(artifact);
              }}
            >
              <DepositIcon color={canHandleArtifact ? undefined : 'grey'} />
            </ArtifactActionIconContainer>
          ),
        });
      }
    } else if (isActivated(artifact) && artifact.artifactType !== ArtifactType.BlackDomain) {
      actions.unshift({
        name: TooltipName.DeactivateArtifact,
        children: (
          <ArtifactActionIconContainer
            onClick={(e) => {
              e.stopPropagation();
              deactivate(artifact);
            }}
          >
            <DeactivateIcon />
          </ArtifactActionIconContainer>
        ),
      });
    } else {
      if (planetIsTradingPost) {
        actions.unshift({
          name: TooltipName.WithdrawArtifact,
          extraContent: !canHandleArtifact && (
            <>
              . <ArtifactRarityLabelAnim rarity={artifact.rarity} />
              {` artifacts can only be withdrawn from level ${artifact.rarity + 1}+ spacetime rips`}
            </>
          ),
          children: (
            <ArtifactActionIconContainer
              onClick={(e) => {
                e.stopPropagation();
                canHandleArtifact && withdraw(artifact);
              }}
            >
              <WithdrawIcon color={canHandleArtifact ? undefined : 'grey'} />
            </ArtifactActionIconContainer>
          ),
        });
      }

      if (!anyArtifactActive && availableToActivate) {
        actions.unshift({
          name: TooltipName.ActivateArtifact,
          children: (
            <ArtifactActionIconContainer
              onClick={(e) => {
                e.stopPropagation();
                activate(artifact);
              }}
            >
              <ActivateIcon />
            </ArtifactActionIconContainer>
          ),
        });
      }
    }
  }

  return (
    <ActionsContainer>
      {!availableToActivate && (
        <TooltipTrigger name={TooltipName.TimeUntilActivationPossible}>
          <Smaller>
            <Sub>
              <TimeUntil timestamp={available} ifPassed={''} />
            </Sub>
          </Smaller>
        </TooltipTrigger>
      )}
      {actions.map((a, i) => (
        <TooltipTrigger key={i} {...a} />
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
