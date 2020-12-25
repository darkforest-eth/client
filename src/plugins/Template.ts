import dedent from 'ts-dedent';

export const template = dedent`
  /**
   * Remember, you have access these globals:
   * 1. df - Just like the df object in your console.
   * 2. ui - For interacting with the game's user interface.
   * 3. plugin - To register the plugin, plus other helpful things.
   *
   * Let's log these to the console when you run your plugin!
   */
  console.log(df, ui, plugin);

  class Plugin {
    constructor() {}

    /**
     * Called when plugin is launched with the "run" button.
     */
    async render(container) {}

    /**
     * Called when plugin modal is closed.
     */
    destroy() {}
  }

  /**
   * And don't forget to register it!
   */
  plugin.register(new Plugin());
`;
