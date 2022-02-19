import { ModalId } from '@darkforest_eth/types';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { useUIManager } from '../Utils/AppHooks';
import { useEmitterSubscribe } from '../Utils/EmitterHooks';
import { ModalPane } from '../Views/ModalPane';
import { PluginElements } from './CoreUI';

export function PluginModal({
  title,
  container,
  id,
  width,
  onClose,
  onRender,
}: {
  title: string;
  id: ModalId;
  container: Element;
  width?: string;
  onClose: () => void;
  onRender: (el: HTMLDivElement) => void;
}) {
  const uiManager = useUIManager();
  const modalManager = uiManager.getModalManager();
  /**
   * We use the existence of a window position for a given modal as an indicator
   * that it should be opened on page load. This is to satisfy the feature of
   * peristent modal positions across browser sessions for a given account.
   */
  const isModalOpen = (modalId: ModalId) => {
    const pos = modalManager.getModalPosition(modalId);
    if (pos) {
      return pos.state !== 'closed';
    } else {
      return false;
    }
  };

  const [visible, setVisible] = useState(isModalOpen(id));
  useEmitterSubscribe(
    modalManager.modalPositionChanged$,
    (modalId) => {
      if (modalId === id) {
        setVisible(isModalOpen(id));
      }
    },
    [setVisible, isModalOpen, id]
  );

  const handleRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el !== null) {
        onRender(el);
      }
    },
    [onRender]
  );

  return ReactDOM.createPortal(
    <ModalPane id={id} title={title} visible={visible} onClose={onClose} width={width}>
      <PluginElements ref={handleRef} />
    </ModalPane>,
    container
  );
}
