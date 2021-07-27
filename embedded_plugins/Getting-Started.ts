/**
 * Hi there!
 *
 * Looks like you've found the Dark Forest plugins system.
 * Read through this script to learn how to write plugins!
 *
 * Most importantly, you have access these globals:
 * 1. df - Just like the df object in your console.
 * 2. ui - For interacting with the game's user interface.
 *
 * Let's log these to the console when you run your plugin!
 */
console.log(df, ui);

/**
 * Plugins are just TypeScript (or modern JavaScript, if you prefer), so you can use imports, too!
 */
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

/**
 * A plugin is a Class with render and destroy methods.
 * Other than that, you are free to do whatever, so be careful!
 */
class Readme implements DFPlugin {
  private canvas: HTMLCanvasElement;

  /**
   * A constructor can be used to keep track of information.
   */
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 400;
    this.canvas.height = 150;
  }

  /**
   * A plugin's render function is called once.
   * Here, you can insert custom html into a game modal.
   * You render any sort of UI that makes sense for the plugin!
   */
  async render(div: HTMLDivElement) {
    div.style.width = '400px';

    const firstTextDiv = document.createElement('div');
    firstTextDiv.innerText =
      'This is an example plugin. Check out its source by' +
      ' clicking "edit" button that is to the right of the' +
      ' README plugin in the Plugin Manager modal! ';

    const secondTextDiv = document.createElement('div');
    secondTextDiv.innerText = '... Or, click the button below to get a free artifact!';

    const myButton = document.createElement('button');
    myButton.innerText = 'give me an artifact';
    myButton.addEventListener('click', async () => {
      await confetti.create(this.canvas)({
        origin: { x: 0.5, y: 1 },
      });
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Sans-serif';
        ctx.fillText('Gotcha!', 150, 60);
      }
    });

    div.appendChild(firstTextDiv);
    div.appendChild(document.createElement('br'));
    div.appendChild(secondTextDiv);
    div.appendChild(document.createElement('br'));
    div.appendChild(this.canvas);
    div.appendChild(myButton);
  }

  /**
   * When this is unloaded, the game calls the destroy method.
   * So you can clean up everything nicely!
   */
  destroy() {
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

/**
 * For the game to know about your plugin, you must export it!
 *
 * Use `export default` to expose your plugin Class.
 */
export default Readme;
