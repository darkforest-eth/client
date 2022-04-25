import { EthAddress } from '@darkforest_eth/types';
import { DarkForestCheckbox } from '@darkforest_eth/ui';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Spacer, Title } from '../../Components/CoreUI';
import { Checkbox } from '../../Components/Input';
import { Row } from '../../Components/Row';
import { LinkButton } from './LobbiesUtils';

const ButtonRow = styled(Row)`
  gap: 8px;

  .button {
    flex: 1 1;
  }
`;

export function GameModePane({ lobbyAddress }: { lobbyAddress: EthAddress | undefined }) {

    type mode = 'solo' | 'team' | undefined;

  const [active, setActive] = useState<mode>('solo');
  
  const content = (
    <>
      <Title slot='title'>Customize Lobby</Title>
      <div>
        Welcome Cadet! You can launch a copy of Dark Forest from this UI. We call this a Lobby.
        <Spacer height={12} />
        First, choose a game mode:
        <Spacer height={12} />
      </div>

      <Spacer height={10} />

      <Row>
        <Checkbox
          label='Free for all'
          checked={active == 'solo'}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            setActive(e.target.checked ? 'solo' : undefined)}
          
        />
      </Row>
      <Row>
        <Checkbox
          disabled
          label='Team battle (coming soon)'
          checked={active == 'team'}
          onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
            setActive(e.target.checked ? 'team' : undefined)
          }
        />
      </Row>
      
      <Spacer height={20} />

      <ButtonRow >
        <LinkButton disabled = {!active} to={`/settings`}>Customize Lobby Settings</LinkButton>
      </ButtonRow>
    </>
  );

  return content;
}
