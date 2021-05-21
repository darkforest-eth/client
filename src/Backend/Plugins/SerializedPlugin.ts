export type PluginId = string & {
  __nothing__: never;
};

/**
 * Represents a plugin that the user has added to their game. Used
 * internally for storing plugins. Not used for evaluating plugins!
 */
export interface SerializedPlugin {
  /**
   * Unique ID, assigned at the time the plugin is first saved.
   */
  id: PluginId;

  /**
   * This code is a javascript object that complies with the
   * {@link PluginProcess} interface.
   */
  code?: string;

  /**
   * Shown in the list of plugins.
   */
  name: string;

  /**
   * {@code new Date.getTime()} at the point that this plugin was saved
   */
  lastEdited: number;

  /**
   * In development mode, Dark Forest allows you to load plugins into the
   * game via webpack's HMR. This means you can develop a plugin in VS Code,
   * hit save, and the plugin will be automatically loaded into the player's
   * plugin library. We need to keep track of which plugins
   * are local and which were loaded in by the player manually.
   */
  isLocal: boolean;
  localFilename?: string;
}
