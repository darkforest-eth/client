import _ from 'lodash';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Green, Red, Sub } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import {
  artifactName,
  artifactTitle,
  dateMintedAt,
  rarityNameFromArtifact,
} from '../../utils/ArtifactUtils';
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { getUpgradeStat } from '../../utils/Utils';
import { TooltipName } from '../../utils/WindowManager';
import {
  Artifact,
  EthAddress,
  Hook,
  StatIdx,
  Upgrade,
} from '../../_types/global/GlobalTypes';
import { ArtifactCanvas, artifactCanvasDim } from '../artifacts/ArtifactCanvas';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { StatIcon } from '../Icons';
import { ModalHook, ModalPane } from './ModalPane';
import { TooltipTrigger } from './Tooltip';

const { text } = dfstyles.colors;
const StyledArtifactPane = styled.div`
  width: 20em;
  height: 25.5em; // TODO calc properly

  canvas {
    border: 1px solid ${text};
  }
`;

const ArtifactDetailsHeader = styled.div`
  width: 100%;
  height: ${artifactCanvasDim}px;

  & > div:last-child {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .statrow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > span:first-child {
      margin-right: 1.5em;
    }

    & > span:last-child {
      text-align: right;
      width: 6em;
    }
  }
`;

export function UpgradeStatInfo({
  upgrade,
  stat,
}: {
  upgrade: Upgrade;
  stat: StatIdx;
}) {
  const mult = getUpgradeStat(upgrade, stat);
  return (
    <div className='statrow'>
      <TooltipTrigger name={TooltipName.Energy + stat}>
        <StatIcon stat={stat} />
      </TooltipTrigger>
      <span>
        {mult > 100 && <Green>+{mult - 100}%</Green>}
        {mult === 100 && <Sub>--</Sub>}
        {mult < 100 && <Red>-{100 - mult}%</Red>}
      </span>
    </div>
  );
}
const StyledArtifactDetailsBody = styled.div`
  width: 100%;
  margin-top: 1em;

  & > div:first-child p {
    text-decoration: underline;
  }

  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > span:first-child {
      color: ${dfstyles.colors.subtext};
    }

    &.mtop {
      margin-top: 0.5em;
    }
  }

  & .link {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export function ArtifactDetailsBody({
  artifact,
  visible,
}: {
  artifact: Artifact;
  visible: boolean;
}) {
  const upgrade = artifact.upgrade;
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const account = (addr: EthAddress) => {
    const twitter = uiManager?.getTwitter(addr);
    if (twitter) {
      return '@' + twitter;
    }
    return ProcgenUtils.ellipsisStr(artifact.discoverer, 20);
  };

  const owner = () => {
    if (!artifact) return '';
    return account(artifact.currentOwner);
  };

  const discoverer = () => {
    if (!artifact) return '';
    return account(artifact.discoverer);
  };

  // TODO make this common with playerartifactspane
  const planetArtifactName = (a: Artifact): string | null => {
    const onPlanet = uiManager?.getArtifactPlanet(a);
    if (!onPlanet) return null;
    return ProcgenUtils.getPlanetName(onPlanet);
  };

  const planetClicked = (): void => {
    if (artifact.onPlanetId) uiManager?.setSelectedId(artifact.onPlanetId);
  };

  return (
    <StyledArtifactPane>
      <ArtifactDetailsHeader>
        <ArtifactCanvas visible={visible} artifact={artifact} />
        <div>
          {_.range(0, 5).map((val) => (
            <UpgradeStatInfo upgrade={upgrade} stat={val} key={val} />
          ))}
        </div>
      </ArtifactDetailsHeader>
      <StyledArtifactDetailsBody>
        <div>
          <p>{artifactName(artifact)}</p>
        </div>
        <div className='row mtop'>
          <span>Artifact Type</span>
          <span>{artifactTitle(artifact)}</span>
        </div>
        <div className='row'>
          <span>Rarity</span>
          <span>{rarityNameFromArtifact(artifact)}</span>
        </div>
        <div className='row'>
          <span>Located On</span>
          {planetArtifactName(artifact) ? (
            <span className='link' onClick={planetClicked}>
              {planetArtifactName(artifact)}
            </span>
          ) : (
            <span>n / a</span>
          )}
        </div>
        <div className='row mtop'>
          <span>Artifact ID</span>
          <span>{ProcgenUtils.ellipsisStr(artifact.id, 20)}</span>
        </div>
        <div className='row'>
          <span>Owner</span>
          <span>{owner()}</span>
        </div>
        <div className='row mtop'>
          <span>Discovered On</span>
          <span>
            {ProcgenUtils.getPlanetNameHash(artifact.planetDiscoveredOn)}
          </span>
        </div>
        <div className='row'>
          <span>Discovered By</span>
          <span>{discoverer()}</span>
        </div>
        <div className='row'>
          <span>Minted At</span>
          <span>{dateMintedAt(artifact)}</span>
        </div>
      </StyledArtifactDetailsBody>
    </StyledArtifactPane>
  );
}

export function ArtifactDetailsPane({
  hook,
  artifactHook,
}: {
  hook: ModalHook;
  artifactHook: Hook<Artifact | null>;
}) {
  const uiEmitter = UIEmitter.getInstance();

  const [artifact, setArtifact] = artifactHook;
  useEffect(() => {
    uiEmitter.emit(UIEmitterEvent.DepositArtifact, artifact);
  }, [artifact, uiEmitter]);

  const [visible, setVisible] = hook;

  useEffect(() => {
    if (!visible) {
      setArtifact(null);
    }
  }, [visible, setArtifact]);

  useEffect(() => {
    const onShow = (a: Artifact | null) => {
      setVisible(true);
      setArtifact(a);
    };
    uiEmitter.addListener(UIEmitterEvent.ShowArtifact, onShow);
    return () => {
      uiEmitter.removeAllListeners(UIEmitterEvent.ShowArtifact);
    };
  }, [setVisible, setArtifact, uiEmitter]);

  return (
    <ModalPane hook={hook} title={'Artifact Details'}>
      {artifact && (
        <ArtifactDetailsBody artifact={artifact} visible={hook[0]} />
      )}
      {!artifact && <p>Please select an artifact.</p>}
    </ModalPane>
  );
}
