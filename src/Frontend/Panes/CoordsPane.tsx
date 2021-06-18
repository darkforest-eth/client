import { SpaceType, WorldCoords } from '@darkforest_eth/types';
import React, { useState } from 'react';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

class CoordsText extends React.Component<
  {
    uiManager: GameUIManager | undefined;
  },
  never
> {
  private coordsRef = React.createRef<HTMLSpanElement>();
  private spacetypeRef = React.createRef<HTMLSpanElement>();
  private uiEmitter = UIEmitter.getInstance();

  componentDidMount() {
    this.uiEmitter.on(UIEmitterEvent.WorldMouseMove, this.update);
  }

  componentWillUnmount() {
    this.uiEmitter.removeListener(UIEmitterEvent.WorldMouseMove, this.update);
  }

  update = (coords: WorldCoords) => {
    this.setCoords(coords);
    this.setSpacetype(coords);
  };

  setCoords(coords: WorldCoords) {
    if (this.coordsRef.current) {
      this.coordsRef.current.innerText = coords
        ? `(${Math.round(coords.x)}, ${Math.round(coords.y)})`
        : '(x, y)';
    }
  }

  setSpacetype(coords: WorldCoords) {
    let spacetypeText = '???';

    if (this.props.uiManager) {
      const per = this.props.uiManager.getSpaceTypePerlin(coords, false);
      const spaceType = this.props.uiManager.spaceTypeFromPerlin(per);

      let suff = '';
      if (spaceType === SpaceType.NEBULA) suff = '\u00b0 (NEBULA)';
      else if (spaceType === SpaceType.SPACE) suff = '\u00b0 (SPACE)';
      else if (spaceType === SpaceType.DEEP_SPACE) suff = '\u00b0 (DEEP SPACE)';
      else if (spaceType === SpaceType.DEAD_SPACE) suff = '\u00b0 (DEAD SPACE)';

      spacetypeText = `${Math.floor((16 - per) * 16)}${suff}`;
    }

    if (this.spacetypeRef.current) {
      this.spacetypeRef.current.innerText = 'TEMP: ' + spacetypeText;
    }
  }

  render() {
    return (
      <>
        <span ref={this.coordsRef}></span>
        <span ref={this.spacetypeRef}></span>
      </>
    );
  }
}

const StyledCoordsPane = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5em;

  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 16em;
  height: 4em;
`;

export function CoordsPane() {
  const [hovering, setHovering] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const uiManager = useUIManager();

  return (
    <StyledCoordsPane
      onClick={() => setHidden((b) => !b)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hidden ? (
        <span>{hovering ? 'Click to show' : ''}</span>
      ) : hovering ? (
        <span>Click to hide</span>
      ) : (
        <CoordsText uiManager={uiManager} />
      )}
    </StyledCoordsPane>
  );
}
