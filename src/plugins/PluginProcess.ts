/**
 * All plugins must conform to this interface. Provides facilities for
 * displaying an interactive UI, as well as references to game state,
 * which are set externally.
 */
export interface PluginProcess {
  /**
   * If present, called once when the user clicks 'run' in the plugin
   * manager modal.
   */
  render?: (into: HTMLDivElement) => void;

  /**
   * Called when the plugin is unloaded. Plugins unload whenever the
   * plugin is edited (modified and saved, or deleted).
   */
  destroy?: () => void;
}
