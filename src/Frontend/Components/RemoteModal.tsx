import * as React from 'react';
import ReactDOM from 'react-dom';
import { ModalPane } from '../Views/ModalPane';

/**
 * Allows you to instantiate a modal, and render it into the desired element.
 * Useful for loading temporary modals from ANYWHERE in the UI, not just
 * {@link GameWindowLayout}
 */
export function RemoteModal({
  title,
  container,
  children,
  hook,
}: {
  title: string;
  container: Element;
  children: React.ReactElement;
  hook: [boolean, (set: boolean) => void];
}) {
  return ReactDOM.createPortal(
    <ModalPane title={title} hook={hook}>
      {children}
    </ModalPane>,
    container
  );
}
