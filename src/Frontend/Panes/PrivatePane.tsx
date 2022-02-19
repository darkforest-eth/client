import { ModalName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { useUIManager } from '../Utils/AppHooks';
import { ModalPane } from '../Views/ModalPane';

const StyledPrivatePane = styled.div`
  width: 36em;
  height: 10em;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export function PrivatePane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();

  const [sKey, setSKey] = useState<string | undefined>(undefined);
  const [home, setHome] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!uiManager) return;
    setSKey(uiManager.getPrivateKey());
    const coords = uiManager.getHomeCoords();
    setHome(coords ? `(${coords.x}, ${coords.y})` : '');
  }, [uiManager]);
  return (
    <ModalPane
      id={ModalName.Private}
      title='View Secret Key and Home Coords'
      visible={visible}
      onClose={onClose}
    >
      <StyledPrivatePane>
        <p>
          <Sub>
            <u>secret key</u>
          </Sub>
        </p>
        <p>
          <TextPreview text={sKey} focusedWidth={'150px'} unFocusedWidth={'150px'} />
        </p>
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
