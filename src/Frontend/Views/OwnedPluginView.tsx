import React from 'react';
import styled from 'styled-components';
import { PluginManager } from '../../Backend/GameLogic/PluginManager';
import { PluginId, SerializedPlugin } from '../../Backend/Plugins/SerializedPlugin';
import { Btn } from '../Components/Btn';
import { PluginElements, Spacer, Truncate } from '../Components/CoreUI';
import { RemoteModal } from '../Components/RemoteModal';
import { Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';

const Error = styled.span`
  color: red;
`;

export const Actions = styled.div`
  float: right;
`;

/**
 * Should
 * 1) open an editor for this plugin
 * 2) return a function that closes the editor.
 */
export type OpenEditor = (pluginId: PluginId) => () => void;

interface Props {
  /**
   * The plugin editor and all of the modals are rendered into this container
   * element
   */
  modalsContainer: Element;
  plugin: SerializedPlugin;
  pluginManager: PluginManager | undefined;
  openEditorForPlugin: OpenEditor;
  deletePlugin: (id: string) => void;
}

interface State {
  error?: string;
  modalOpen: boolean;
  rendered: boolean;
}

/**
 * One row in {@link PluginLibraryView}. Represents a single plugin. Allows
 * the user to edit, delete, or open the plugin. This class is responsible for
 * evaluating a plugin's source code (as safely as we can), and calling its
 * appropriate lifecycle methods. Loads and evaluates the plugin on mount,
 * and destroys and unloads the plugin on dismount. I'm not sure I like how tightly
 * coupled rendering is to evaluating here, so I'll probably move the evaluation
 * code into {@link PluginHost} at some point.
 */
export class OwnedPluginView extends React.Component<Props, State> {
  private closeEditor: (() => void) | undefined = undefined;
  private renderedPluginRef: HTMLDivElement | null;

  state = { error: undefined, modalOpen: false, rendered: false };

  private saveRef = (el: HTMLDivElement | null) => {
    this.renderedPluginRef = el;
  };

  private runClicked = () => {
    this.setModalIsOpen(true);
  };

  private editClicked = () => {
    this.closeEditor = this.props.openEditorForPlugin(this.props.plugin.id);
  };

  private deletePluginClicked = () => {
    this.props.deletePlugin(this.props.plugin.id);
    this.closeEditor && this.closeEditor();
  };

  private setModalIsOpen = (isOpen: boolean) => {
    // Teardown before the plugin is removed from the tree
    if (!isOpen) {
      this.props.pluginManager?.destroy(this.props.plugin.id);
    }
    this.setState({ modalOpen: isOpen }, () => {
      if (this.state.modalOpen && this.renderedPluginRef) {
        // This is `async` but we don't care about the result
        this.props.pluginManager?.render(this.props.plugin.id, this.renderedPluginRef);
      }
    });
  };

  public render() {
    return (
      <>
        {this.state.modalOpen ? (
          <RemoteModal
            hook={[this.state.modalOpen, this.setModalIsOpen]}
            title={this.props.plugin.name}
            container={this.props.modalsContainer}
          >
            <PluginElements ref={this.saveRef} />
          </RemoteModal>
        ) : null}
        <div>
          <Truncate maxWidth={'150px'} style={{ verticalAlign: 'unset' }}>
            <Sub>
              {this.props.plugin.name}
              {this.state.error && <Error>{' ' + this.state.error}</Error>}
            </Sub>
          </Truncate>

          <Spacer width={8} />
          <Actions>
            <Btn
              textColor={'#aaa'}
              color={dfstyles.colors.dfblue}
              noBorder={true}
              onClick={this.editClicked}
            >
              edit
            </Btn>
            <Spacer width={4} />
            <Btn
              textColor={'#aaa'}
              color={dfstyles.colors.dfred}
              noBorder={true}
              onClick={this.deletePluginClicked}
            >
              del
            </Btn>
            <Spacer width={4} />
            <Btn
              textColor={'#aaa'}
              color={dfstyles.colors.dfgreen}
              noBorder={true}
              onClick={this.runClicked}
            >
              run
            </Btn>
          </Actions>
        </div>
      </>
    );
  }
}
