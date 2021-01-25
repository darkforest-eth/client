import * as React from 'react';
import {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  Artifact,
  ArtifactRarity,
  Biome,
  Hook,
} from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { ModalHook, ModalName, ModalPane } from './ModalPane';
import styled, { css } from 'styled-components';
import dfstyles, { ARTIFACT_ROW_H } from '../../styles/dfstyles';
import {
  aDexCanvasH,
  aDexCanvasW,
  aListCanvasH,
  aListCanvasW,
  artifactColM,
  artifactColW,
  ArtifactRenderer,
} from '../artifacts/ArtifactRenderer';
import _ from 'lodash';
import {
  artifactTitle,
  rarityName,
  rarityNameFromArtifact,
} from '../../utils/ArtifactUtils';
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import { artifactName } from '../../utils/ArtifactUtils';
import { Sub } from '../../components/Text';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';

const { text, subtext, backgroundlight } = dfstyles.colors;

const ArtifactsHeader = styled.div`
  margin: 1.5em 0 0.5em 0;
  min-height: 1.5em;
  position: relative;
`;

const dexStart = 130;
const artifactDexW = aDexCanvasW + dexStart;
const artifactDexH = aDexCanvasH;

const artifactListW = 800;
const artifactListH = aListCanvasH;

export const Rarity = styled.span<{ rarity: ArtifactRarity }>`
  position: absolute;
  left: ${({ rarity }) => dexStart + rarity * (artifactColW + artifactColM)}px;
`;

const colorOther = css`
  &:nth-child(2n + 1) {
    background: ${backgroundlight};
  }
`;

const ArtifactList = styled.div`
  width: 100%;
  height: ${artifactListH}px;
  overflow-y: scroll;
`;

const ArtifactsBody = styled.div<{ isDex: boolean }>`
  position: relative;
  width: ${({ isDex }) => (isDex ? artifactDexW : artifactListW)}px;
  height: ${({ isDex }) => (isDex ? artifactDexH : artifactListH)}px;

  canvas {
    position: absolute;
    right: 0;
    top: 0;
  }

  .row {
    height: ${ARTIFACT_ROW_H}px;
    line-height: ${ARTIFACT_ROW_H}px;

    ${({ isDex }) => !isDex && colorOther}
  }
`;

const TableRow = styled.div<{ hover?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.header {
    border-bottom: 1px solid ${subtext};
  }

  & span {
    &:first-child {
      width: 12em;
    }
    &:nth-child(2) {
      width: 5em;
    }
    &:nth-child(3) {
      width: 10em;
    }
    &:nth-child(4) {
      width: 12em;
    }
  }

  &.row {
    &:hover {
      cursor: pointer;
      & span:first-child {
        ${({ hover }) => hover && 'text-decoration: underline;'}
      }
    }

    .planet:hover {
      text-decoration: underline;
    }
  }
`;

function ArtifactRow({
  artifact,
  selectedArtifactHook,
  artifactDetailsHook,
}: { artifact: Artifact } & ArtifactHooks) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const planetArtifactName = (a: Artifact): string | null => {
    const onPlanet = uiManager?.getArtifactPlanet(a);
    if (!onPlanet) return null;
    return ProcgenUtils.getPlanetName(onPlanet);
  };

  const [_selected, setSelected] = selectedArtifactHook;
  const [_detailsVisible, setDetailsVisible] = artifactDetailsHook;

  const [planetHover, setPlanetHover] = useState<boolean>(false);
  const [rowHover, setRowHover] = useState<boolean>(false);

  const [flip, setFlip] = useState<boolean>(false);
  const rowClicked = (): void => {
    setSelected(artifact);
    setDetailsVisible(false);
    setFlip(true);
  };

  // hack which lets us pop the artifact details modal to the top whenever an artifact is clicked
  useLayoutEffect(() => {
    if (flip) {
      setDetailsVisible(true);
      setFlip(false);
    }
  }, [flip, setDetailsVisible, setFlip]);

  const planetClicked = (): void => {
    if (artifact.onPlanetId) uiManager?.setSelectedId(artifact.onPlanetId);
  };

  return (
    <TableRow
      className='row'
      onClick={rowClicked}
      onMouseOver={() => setRowHover(true)}
      onMouseOut={() => setRowHover(false)}
      hover={rowHover && !planetHover}
    >
      <span>{ProcgenUtils.ellipsStrEnd(artifactName(artifact), 20)}</span>
      <span>{rarityNameFromArtifact(artifact)}</span>
      <span>{artifactTitle(artifact)}</span>
      {planetArtifactName(artifact) ? (
        <span
          className='planet'
          onMouseOver={() => setPlanetHover(true)}
          onMouseOut={() => setPlanetHover(false)}
          onClick={(e) => {
            planetClicked();
            e.stopPropagation();
          }}
        >
          {planetArtifactName(artifact)}
        </span>
      ) : (
        <span>n / a</span>
      )}
      {/* spacer for thumb icon */}
      <span></span>
    </TableRow>
  );
}

const Chooser = styled.span<{ active: boolean }>`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  color: ${({ active }) => (active ? text : subtext)};

  margin-right: 2em;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

// TODO encapsulate these guys into some sort of setter
type ArtifactHooks = {
  artifactDetailsHook: ModalHook;
  selectedArtifactHook: Hook<Artifact | null>;
};

export function PlayerArtifactsPane({
  hook,
  artifactDetailsHook,
  selectedArtifactHook,
}: {
  hook: ModalHook;
} & ArtifactHooks) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const [renderer, setRenderer] = useState<ArtifactRenderer | null>(null);
  const [isDex, setIsDex] = useState<boolean>(true);
  const [visible, setVisible] = hook;
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  // sync artifacts
  useEffect(() => {
    const updateArtifacts = () => {
      if (!visible) return;
      if (!uiManager) return;
      const myAddr = uiManager.getAccount();
      if (!myAddr) return;
      const newArtifacts = uiManager.getMyArtifacts();
      setArtifacts(newArtifacts);
    };

    const intervalId = setInterval(updateArtifacts, 2000);
    updateArtifacts();

    return () => clearInterval(intervalId);
  }, [uiManager, visible]);

  useEffect(() => {
    renderer?.setArtifacts(artifacts);
  }, [artifacts, renderer]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myRenderer = new ArtifactRenderer(canvasRef.current);
    setRenderer(myRenderer);

    () => {
      myRenderer.destroy();
      setRenderer(null);
    };
  }, [canvasRef]);

  // sync values
  useEffect(() => {
    renderer?.setVisible(visible);
  }, [visible, renderer]);

  // force the modal to update when size changes (prevents overflow)
  const [tick, setTick] = useState<number>(0);
  useLayoutEffect(() => {
    renderer?.setIsDex(isDex);
    setTick((x) => x + 1);
  }, [isDex, renderer]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const doScroll = useCallback(
    (_e) => {
      if (!scrollRef.current || !renderer) return;
      renderer.setScroll(scrollRef.current.scrollTop);
    },
    [renderer, scrollRef]
  );

  const [canvasW, setCanvasW] = useState<number>(aListCanvasW);
  const [canvasH, setCanvasH] = useState<number>(aListCanvasH);

  useLayoutEffect(() => {
    if (isDex) {
      setCanvasW(aDexCanvasW);
      setCanvasH(aDexCanvasH);
    } else {
      setCanvasW(aListCanvasW);
      setCanvasH(aListCanvasH);
    }
    renderer?.setProjectionMatrix();
  }, [isDex, renderer]);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    const onSelect = () => {
      setVisible(true);
      setIsDex(false);
    };
    uiEmitter.addListener(UIEmitterEvent.SelectArtifact, onSelect);
    return () => {
      uiEmitter.removeAllListeners(UIEmitterEvent.SelectArtifact);
    };
  }, [setVisible, setIsDex]);

  return (
    <ModalPane
      title={'Artifacts'}
      hook={hook}
      name={ModalName.YourArtifacts}
      tick={tick}
    >
      <div>
        <Chooser active={isDex} onClick={() => setIsDex(true)}>
          Artifact Dex
        </Chooser>
        <Chooser active={!isDex} onClick={() => setIsDex(false)}>
          My Artifacts
        </Chooser>
      </div>
      <div>
        {artifacts.length === 0 && (
          <p>
            <br />
            You have no artifacts! Artifacts can be found on planets. Maybe you
            could use a plugin to help...
          </p>
        )}
      </div>
      <ArtifactsHeader>
        {isDex &&
          _.range(0, 4).map((r: ArtifactRarity) => (
            <Rarity rarity={r} key={r}>
              {rarityName(r)}
            </Rarity>
          ))}
        {!isDex && (
          <TableRow className='header'>
            <span>Name</span>
            <span>Rarity</span>
            <span>Type</span>
            <span>Located On</span>
            {/* spacer for thumb icon */}
            <span></span>
          </TableRow>
        )}
      </ArtifactsHeader>
      <ArtifactsBody isDex={isDex}>
        {uiManager &&
          isDex &&
          _.range(Biome.MIN, Biome.MAX + 1).map((biome) => {
            const name = uiManager.getDiscoverBiomeName(biome);
            return (
              <div className='row' key={biome}>
                {name === 'Undiscovered' ? (
                  <Sub>{name}</Sub>
                ) : (
                  <span>{name}</span>
                )}
              </div>
            );
          })}

        {!isDex && (
          <ArtifactList onScroll={doScroll} ref={scrollRef}>
            {artifacts.map((a, i) => (
              <ArtifactRow
                artifactDetailsHook={artifactDetailsHook}
                selectedArtifactHook={selectedArtifactHook}
                artifact={a}
                key={i}
              />
            ))}
          </ArtifactList>
        )}

        <canvas ref={canvasRef} width={canvasW} height={canvasH}></canvas>
      </ArtifactsBody>
    </ModalPane>
  );
}
