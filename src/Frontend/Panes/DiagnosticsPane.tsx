import { Diagnostics } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Spacer, Underline } from '../Components/CoreUI';
import { DisplayGasPrices } from '../Components/DisplayGasPrices';
import { White } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { BooleanSetting, Setting } from '../Utils/SettingsHooks';
import { ModalHook, ModalPane } from '../Views/ModalPane';
import { TabbedView } from '../Views/TabbedView';

const DiagnosticsContent = styled.div`
  min-width: 350px;
`;

export function DiagnosticsPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const [currentDiagnostics, setCurrentDiagnostics] = useState(
    new Wrapper(uiManager.getDiagnostics())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDiagnostics(new Wrapper(uiManager.getDiagnostics()));
    }, 250);

    return () => clearInterval(interval);
  }, [uiManager]);

  return (
    <ModalPane hook={hook} title={'Diagnostics'}>
      <DiagnosticsContent>
        <DiagnosticsTabs diagnostics={currentDiagnostics} />
      </DiagnosticsContent>
    </ModalPane>
  );
}

function DiagnosticsTabs({ diagnostics }: { diagnostics: Wrapper<Diagnostics> }) {
  return (
    <TabbedView
      tabTitles={['rendering', 'networking']}
      tabContents={(i) => {
        switch (i) {
          case 0:
            return <RenderingTab diagnostics={diagnostics} />;
          case 1:
            return <NetworkingTab diagnostics={diagnostics} />;
        }
      }}
    />
  );
}

function RenderingTab({ diagnostics }: { diagnostics: Wrapper<Diagnostics> }) {
  const uiManager = useUIManager();

  return (
    <>
      <DiagnosticsTableStyle>
        <tbody>
          <tr>
            <td>fps</td>
            <td>{Math.floor(diagnostics.value.fps)}</td>
          </tr>
          <tr>
            <td>visible chunks</td>
            <td>{diagnostics.value.visibleChunks.toLocaleString()}</td>
          </tr>
          <tr>
            <td>total chunks</td>
            <td>{diagnostics.value.totalChunks.toLocaleString()}</td>
          </tr>
          <tr>
            <td>visible planets</td>
            <td>{diagnostics.value.visiblePlanets.toLocaleString()}</td>
          </tr>
          <tr>
            <td>total planets</td>
            <td>{diagnostics.value.totalPlanets.toLocaleString()}</td>
          </tr>
          <tr>
            <td>queued chunk writes</td>
            <td>{diagnostics.value.chunkUpdates.toLocaleString()}</td>
          </tr>
        </tbody>
      </DiagnosticsTableStyle>
      <Spacer height={8} />
      <Underline>
        <White>Debug Options</White>
      </Underline>
      <Spacer height={8} />
      <BooleanSetting
        uiManager={uiManager}
        setting={Setting.DrawChunkBorders}
        settingDescription='draw chunk borders'
      />
    </>
  );
}

function NetworkingTab({ diagnostics }: { diagnostics: Wrapper<Diagnostics> }) {
  return (
    <DiagnosticsTableStyle>
      <tbody>
        <tr>
          <td>rpc url</td>
          <td>
            <TextPreview
              text={diagnostics.value.rpcUrl}
              unFocusedWidth={'200px'}
              focusedWidth={'300px'}
            />
          </td>
        </tr>
        <tr>
          <td>completed calls</td>
          <td>{diagnostics.value.totalCalls.toLocaleString()}</td>
        </tr>

        <tr>
          <td>queued calls</td>
          <td>{diagnostics.value.callsInQueue.toLocaleString()}</td>
        </tr>

        <tr>
          <td>completed transactions</td>
          <td>{diagnostics.value.totalTransactions.toLocaleString()}</td>
        </tr>

        <tr>
          <td>queued transactions</td>
          <td>{diagnostics.value.transactionsInQueue.toLocaleString()}</td>
        </tr>

        <tr>
          <td>oracle gas prices (gwei)</td>
          <td>
            <DisplayGasPrices gasPrices={diagnostics.value.gasPrices} />
          </td>
        </tr>
      </tbody>
    </DiagnosticsTableStyle>
  );
}

const DiagnosticsTableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    border: 1px solid ${dfstyles.colors.subbertext};
    padding: 2px 4px;

    &:first-child {
      text-align: right;
    }

    &:last-child {
      min-width: 100px;
    }
  }
`;
