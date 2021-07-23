import { h, render } from 'preact'
import htm from 'htm'

import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { buttonGridStyle } from './utils'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

function App() {
  return html`
  <div style=${buttonGridStyle}>
    <button>Centralise</button>
    <button>Simultaneous Attack</button>
    <button>War</button>
  </div>
  `;
}

class Playbook implements DFPlugin {

  container: HTMLDivElement

  constructor() {}

  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container: HTMLDivElement) {
      this.container = container

      render(html`<${App} />`, container)
  }

  /**
   * Called when plugin modal is closed.
   */
  destroy() {
    render(null, this.container)
  }
}

/**
 * And don't forget to export it!
 */
export default Playbook;
