import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { Diagnostics, ModalName, Setting } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { EmSpacer, Separator, SpreadApart } from '../Components/CoreUI';
import { DisplayGasPrices } from '../Components/DisplayGasPrices';
import { TextPreview } from '../Components/TextPreview';
import { useUIManager } from '../Utils/AppHooks';
import { BooleanSetting } from '../Utils/SettingsHooks';
import { ModalPane } from '../Views/ModalPane';
import { TabbedView } from '../Views/TabbedView';

export function DiagnosticsPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
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
    <ModalPane
      id={ModalName.Diagnostics}
      title={'Diagnostics'}
      visible={visible}
      onClose={onClose}
      width={RECOMMENDED_MODAL_WIDTH}
    >
      <DiagnosticsTabs diagnostics={currentDiagnostics} />
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
      <Separator />

      <SpreadApart>
        <span>fps</span>
        <span>{Math.floor(diagnostics.value.fps)}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>visible chunks</span>
        <span>{diagnostics.value.visibleChunks.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>total chunks</span>
        <span>{diagnostics.value.totalChunks.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>visible planets</span>
        <span>{diagnostics.value.visiblePlanets.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>total planets</span>
        <span>{diagnostics.value.totalPlanets.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>queued chunk writes</span>
        <span>{diagnostics.value.chunkUpdates.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>viewport</span>
        <span>
          <span>{diagnostics.value.width?.toLocaleString()}</span>
          <span> x </span>
          <span>{diagnostics.value.height?.toLocaleString()}</span>
        </span>
      </SpreadApart>
      <Separator />
      <EmSpacer height={0.5} />
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
    <>
      <Separator />

      <SpreadApart>
        <span>rpc url</span>
        <span>
          <TextPreview
            text={diagnostics.value.rpcUrl}
            unFocusedWidth={'100px'}
            focusedWidth={'100px'}
          />
        </span>
      </SpreadApart>
      <Separator />
      <SpreadApart>
        <span>completed calls</span>
        <span>{diagnostics.value.totalCalls.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>queued calls</span>
        <span>{diagnostics.value.callsInQueue.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>completed transactions</span>
        <span>{diagnostics.value.totalTransactions.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>queued transactions</span>
        <span>{diagnostics.value.transactionsInQueue.toLocaleString()}</span>
      </SpreadApart>

      <Separator />

      <SpreadApart>
        <span>oracle gas prices</span>
        <span>
          <DisplayGasPrices gasPrices={diagnostics.value.gasPrices} />
        </span>
      </SpreadApart>
    </>
  );
}
