import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../../components/Text';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { ModalHook, ModalName, ModalPane } from './ModalPane';

const StyledPrivatePane = styled.div`
  width: 36em;
  height: 10em;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export function PrivatePane({ hook }: { hook: ModalHook }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const [sKey, setSKey] = useState<string | null>(null);
  const [home, setHome] = useState<string | null>(null);
  useEffect(() => {
    if (!uiManager) return;
    setSKey(uiManager.getPrivateKey());
    const coords = uiManager.getHomeCoords();
    setHome(coords ? `(${coords.x}, ${coords.y})` : '');
  }, [uiManager]);
  return (
    <ModalPane
      hook={hook}
      title={'View SKEY and Home Coords'}
      name={ModalName.Private}
    >
      <StyledPrivatePane>
        <p>
          <Sub>
            <u>SKEY</u>
          </Sub>
        </p>
        <p>{sKey}</p>
        <br />
        <p>
          <Sub>
            <u>Home Coords</u>
          </Sub>
        </p>
        <p>{home}</p>
      </StyledPrivatePane>
    </ModalPane>
  );
}
