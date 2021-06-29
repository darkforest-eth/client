class RageCage implements DFPlugin {
  private img: HTMLImageElement;
  private loaded: boolean;

  /**
   * As you saw in the README plugin, you can render
   * arbitrary HTML UI into a Dark Forest modal.
   */
  async render(div: HTMLDivElement) {
    // once this plugin is run, let's load a nice image
    // from the internet, in order to draw it on top of
    // planets
    this.img = document.createElement('img');
    this.loaded = false;
    div.appendChild(this.img);

    this.img.addEventListener('load', () => {
      // we should only use the image once
      // it actually loads.
      this.loaded = true;
      div.innerText = 'welcome to nicolas cage world';
    });

    this.img.src =
      'https://upload.wikimedia.org/wikipedia/' + 'commons/c/c0/Nicolas_Cage_Deauville_2013.jpg';

    // hide the image, it doesn't need to show up
    // in the modal, we only need this img element
    // to load the image.
    this.img.style.display = 'none';

    div.style.width = '100px';
    div.style.height = '100px';
    div.innerText = 'loading, please wait!';
    // check out the helpful functions that appear
    // in the Viewport class!
    console.log(ui.getViewport());
  }

  /**
   * In addition to rendering HTML UI into a div, plugins
   * can draw directly onto the game UI. This function is
   * optional, but if it exists, it is called in sync with
   * the rest of the game, and allows you to draw onto an
   * HTML5 canvas that lays on top of the rest of the game.
   *
   * In the example below, we render an image on top of every
   * planet.
   *
   * ctx is an instance of CanvasRenderingContext2D.
   */
  draw(ctx: CanvasRenderingContext2D) {
    // don't draw anything until nic cage loads
    if (!this.loaded) return;

    // the viewport class provides helpful functions for
    // interacting with the currently-visible area of the
    // game
    const viewport = ui.getViewport();
    const planets = ui.getPlanetsInViewport();

    for (const p of planets) {
      // use the Viewport class to determine the pixel
      // coordinates of the planet on the screen
      const pixelCenter = viewport.worldToCanvasCoords(
        // @ts-ignore
        p.location.coords
      );

      // how many pixels is the radius of the planet?
      const trueRadius = viewport.worldToCanvasDist(ui.getRadiusOfPlanetLevel(p.planetLevel));

      // draw nicolas cage on top of the planet
      ctx.drawImage(
        this.img,
        50,
        50,
        400,
        400,
        pixelCenter.x - trueRadius,
        pixelCenter.y - trueRadius,
        trueRadius * 2,
        trueRadius * 2
      );
    }
  }
}

export default RageCage;
