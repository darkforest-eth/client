import { EthAddress } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { Btn } from '../../Components/Btn';
import { DarkForestTextInput, TextInput } from '../../Components/Input';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Row } from '../../Components/Row';
import { Red, Sub } from '../../Components/Text';
import { Table } from '../../Views/Table';
import { LobbiesPaneProps, Warning } from './LobbiesUtils';
import { InvalidConfigError } from './Reducer';

const TableContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
`;

const jcFlexEnd = { display: 'flex', justifyContent: 'flex-end' } as CSSStyleDeclaration &
  React.CSSProperties;
const jcSpaceEvenly = { display: 'flex', justifyContent: 'space-evenly' } as CSSStyleDeclaration &
  React.CSSProperties;

type Status = 'creating' | 'created' | 'errored' | undefined;

const defaultAddress = '0x0000000000000000000000000000000000000000' as EthAddress;
export function WhitelistPane({
  config: config,
  onUpdate: onUpdate,
  lobbyAdminTools,
}: LobbiesPaneProps & {
  lobbyAdminTools: LobbyAdminTools | undefined;
}) {
  const [address, setAddress] = useState<EthAddress>(defaultAddress);
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>();
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<EthAddress[] | undefined>();

  useEffect(() => {
    setWhitelistedAddresses(lobbyAdminTools?.allAddresses);
  }, [lobbyAdminTools]);

  const stageHeaders = ['Staged Addresses', ''];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'c'];
  const stageColumns = [
    (address: EthAddress) => <Sub>{address}</Sub>,
    (address: EthAddress, i: number) => (
      <div style={jcSpaceEvenly}>
        <Btn disabled={!lobbyAdminTools} onClick={async () => await whitelistAddress(i)}>
          ✓
        </Btn>{' '}
        <Btn onClick={() => onUpdate({ type: 'WHITELIST', value: address, index: i })}>X</Btn>
      </div>
    ),
  ];

  async function whitelistAll() {
    setError(undefined);
    if (!config.WHITELIST.displayValue) return;

    for (let i = config.WHITELIST.displayValue.length - 1; i >= 0; i--) {
      await whitelistAddress(i);
    }
  }

  async function whitelistAddress(index: number) {
    setError(undefined)
    try {
      setStatus('creating');
      if (!lobbyAdminTools) {
        setError("You haven't created a lobby.");
        return;
      }

      if (!config.WHITELIST.displayValue) {
        setError('no addresses allowlisted');
        return;
      }
      const elem = config.WHITELIST.displayValue[index];
      if (!elem) {
        setError('Address not found.');
        return;
      }

      await lobbyAdminTools.whitelistPlayer(elem);
      onUpdate({ type: 'WHITELIST', value: address, index: index });

      setStatus('created');
    } catch (err) {
      setStatus('errored');
      console.error(err);
      if (err instanceof InvalidConfigError) {
        setError(`Invalid ${err.key} value ${err.value ?? ''} - ${err.message}`);
      } else {
        setError(err?.message || 'Something went wrong. Check your dev console.');
      }
    }
  }

  function StagedAddresses({ config }: LobbiesPaneProps) {
    return config.WHITELIST.displayValue?.length ? (
      <TableContainer>
        <Table
          paginated={true}
          rows={config.WHITELIST.displayValue || []}
          headers={stageHeaders}
          columns={stageColumns}
          alignments={alignments}
        />
      </TableContainer>
    ) : (
      <Sub>No addresses staged</Sub>
    );
  }

  const whitelistedHeaders = ['Allowlisted Addresses'];
  const whitelistedColumns = [(address: EthAddress) => <Sub>{address}</Sub>];
  function WhitelistedAddresses({ addresses }: { addresses: EthAddress[] | undefined }) {
    return addresses?.length ? (
      <TableContainer>
        <Table
          paginated={true}
          rows={addresses || []}
          headers={whitelistedHeaders}
          columns={whitelistedColumns}
          alignments={alignments}
        />
      </TableContainer>
    ) : (
      <Sub>No addresses allowlisted</Sub>
    );
  }

  function stageAddress() {
    setError(undefined);
    if (whitelistedAddresses?.find((v) => address == v)) {
      setError('address already allowlisted');
      return;
    }
    if (config.WHITELIST.displayValue?.find((v) => address == v)) {
      setError('address already staged');
      return;
    }

      onUpdate({
        type: 'WHITELIST',
        value: address,
        index: config.WHITELIST.displayValue?.length || 0,
      });
    
    setAddress(defaultAddress);
  }

  function updateAddress() {
    return (
      <TextInput
        style={{ width: '100%' } as CSSStyleDeclaration & React.CSSProperties}
        value={address}
        onChange={(e: Event & React.ChangeEvent<DarkForestTextInput>) => {
          setAddress(e.target.value as EthAddress);
        }}
      />
    );
  }

  let whitelistElems;
  if (config.WHITELIST.displayValue) {
    whitelistElems = <Row>{updateAddress()}</Row>;
  }

  return (
    <>
      {config.WHITELIST_ENABLED.displayValue ? (
        <>
          {!lobbyAdminTools && (
            <Row>
              <Sub>
                <Red>Warning:</Red> Cannot allowlist players until lobby is created
              </Sub>
            </Row>
          )}
          <span>Enter a 0x-prefixed address to stage</span>

          {whitelistElems}
          <Btn onClick={stageAddress}>Stage Address</Btn>
          <Row>
            <Warning>{config.WHITELIST.warning}</Warning>
          </Row>
          <Row>
            <Warning>{error}</Warning>
          </Row>
          <br />
          <Row>
            <StagedAddresses config={config} onUpdate={onUpdate} />
          </Row>
          {config.WHITELIST.displayValue && config.WHITELIST.displayValue.length > 0 && (
            <Btn
              style={jcFlexEnd}
              disabled={status == 'creating' || !lobbyAdminTools}
              onClick={whitelistAll}
            >
              {' '}
              {status == 'creating' ? <LoadingSpinner initialText='Adding...' /> : ` Add all `}
            </Btn>
          )}
          <Row>
            <WhitelistedAddresses addresses={whitelistedAddresses} />
          </Row>
        </>
      ) : (
        <Sub>Enable allowlist (in admin permissions) to continue</Sub>
      )}
    </>
  );
}
