/**
 * This file declares globals that are available to all plugins.
 */

import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';

declare global {
  const df: GameManager;
  const ui: GameUIManager;

  // TODO: Figure out a way to share this
  /**
   * All plugins must conform to this interface. Provides facilities for
   * displaying an interactive UI, as well as references to game state,
   * which are set externally.
   */
  interface DFPlugin {
    /**
     * If present, called once when the user clicks 'run' in the plugin
     * manager modal.
     */
    render?: (div: HTMLDivElement) => Promise<void>;

    /**
     * If present, called at the same framerate the the game is running at,
     * and allows you to draw on top of the game UI.
     */
    draw?: (ctx: CanvasRenderingContext2D) => void;

    /**
     * Called when the plugin is unloaded. Plugins unload whenever the
     * plugin is edited (modified and saved, or deleted).
     */
    destroy?: () => void;
  }
}
