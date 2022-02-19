import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { ModalName } from '@darkforest_eth/types';
import React from 'react';
import { Spacer } from '../Components/CoreUI';
import { useMyArtifactsList, useUIManager } from '../Utils/AppHooks';
import { ModalHandle, ModalPane } from '../Views/ModalPane';
import { AllArtifacts } from './ArtifactsList';

function HelpContent() {
  return (
    <div>
      <p>These are all the artifacts you currently own.</p>
      <Spacer height={8} />
      <p>
        The table is interactive, and allows you to sort the artifacts by clicking each column's
        header. You can also view more information about a particular artifact by clicking on its
        name.
      </p>
    </div>
  );
}

export function PlayerArtifactsPane({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const uiManager = useUIManager();
  const artifacts = useMyArtifactsList(uiManager);

  const render = (handle: ModalHandle) => <AllArtifacts modal={handle} artifacts={artifacts} />;

  return (
    <ModalPane
      id={ModalName.YourArtifacts}
      title={'Your Inventory'}
      visible={visible}
      onClose={onClose}
      helpContent={HelpContent}
      width={RECOMMENDED_MODAL_WIDTH}
    >
      {render}
    </ModalPane>
  );
}
