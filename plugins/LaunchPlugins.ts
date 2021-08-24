import { h, render } from 'preact'
import htm from 'htm'

import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

function launch() {
  document.getElementById('./Repeat-Attack.ts')?.click()
}

function App() {
  console.log('Running Launch Plugins')

  return html`
    <div>
      <div><a href="#" onClick=${launch}>Launch</a></div>
    </div>
  `;
}

class LaunchPlugins implements DFPlugin {

  container: HTMLDivElement

  constructor() {
  }

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
export default LaunchPlugins;
