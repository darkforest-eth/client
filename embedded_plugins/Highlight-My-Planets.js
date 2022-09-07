// Highlight my planets
//
// src: https://github.com/darkforest-eth/plugins/blob/master/content/casual/highlight-my-planets
// The highlight my planets plugin help you find your small planets.
// (Thanks to Heatmap plugin)

class Plugin {
  constructor() {
    this.highlightStyle = 0;
    this.rangePercent = 8;
    this.alpha = 0;
    this.globalAlpha = 1;
    this.ownColor = '#ffffff';

    this.highlightStyleHandler = this.highlightStyleHandler.bind(this);
    this.rangeHandler = this.rangeHandler.bind(this);
    this.alphaHandler = this.alphaHandler.bind(this);
    this.globalAlphaHandler = this.globalAlphaHandler.bind(this);
    this.ownColorHandler = this.ownColorHandler.bind(this);
  }

  hexToHsl(H) {
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = '0x' + H[1] + H[1]; g = '0x' + H[2] + H[2]; b = '0x' + H[3] + H[3];
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2]; g = '0x' + H[3] + H[4]; b = '0x' + H[5] + H[6];
    }
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0, s = 0, l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h + ', ' + s + '%, ' + l + '%'];
  }

  getSliderHtml(className, text, min, max, step, value) {

    return `<label class='${className}'>
      <div style='display: inline-block; min-width: 120px'>${text}</div><input type='range'
          value='${value}'
          min='${min}'
          max='${max}'
          step='${step}'
          style='transform: translateY(3px); margin: 0 10px;' />
        <span>${value}</span>
      </label>`;
  }

  getColorPicker(className, text, value) {
    return `<label class='${className}'>
      <div style='display: inline-block; min-width: 120px'>${text}</div><input type='color'
          value='${value}'
          style='transform: translateY(3px); margin: 0 10px;' />
      </label>`;
  }

  getSelect(className, text, items, selectedValue) {

    return `<label class='${className}'>
      <div style='display: inline-block; min-width: 120px'>${text}</div>
        <select style='background: rgb(8,8,8); margin-top: 5px; padding: 3px 5px; border: 1px solid white; border-radius: 3px;'
          value=${selectedValue}
        >
          ${items.map(
            ({ value, text }) => {return `<option value=${value}>${text}</option>`}
          )}
        </select>
      </label>`;
  }

  async render(div) {
    div.style.width = '330px';
    //div.style.height = '100px';
    //div.style.minHeight = '100px';

    div.innerHTML = [
      this.getColorPicker('ownColor', 'Color:', this.ownColor),
      this.getSelect('highlight', 'Highlight:', [{value: 0, text: "Heatmap"}, {value: 1, text: "Circle"}], this.highlightStyle),
      this.getSliderHtml('range', 'Planet Range:', 1, 100, 1, this.rangePercent),
      this.getSliderHtml('alpha', 'Gradient Alpha:', 0, 1, 0.01, this.alpha),
      this.getSliderHtml('globalAlpha', 'Global Alpha:', 0, 1, 0.01, this.globalAlpha)
    ].join('<br />');

    this.selectHighlightStyle = div.querySelector('label.highlight select');
    this.selectHighlightStyle.addEventListener('change', this.highlightStyleHandler);

    this.valueRange = div.querySelector('label.range span');
    this.sliderRange = div.querySelector('label.range input');
    this.sliderRange.addEventListener('input', this.rangeHandler);

    this.valueAlpha = div.querySelector('label.alpha span');
    this.sliderAlpha = div.querySelector('label.alpha input');
    this.sliderAlpha.addEventListener('input', this.alphaHandler);

    this.valueGlobalAlpha = div.querySelector('label.globalAlpha span');
    this.sliderGlobalAlpha = div.querySelector('label.globalAlpha input');
    this.sliderGlobalAlpha.addEventListener('input', this.globalAlphaHandler);

    this.colorPickerOwnColor = div.querySelector('label.ownColor input');
    this.colorPickerOwnColor.addEventListener('input', this.ownColorHandler);
  }

  highlightStyleHandler() {
    this.highlightStyle = this.selectHighlightStyle.value;

    //I couldn't find a better way...
    if(this.highlightStyle == 0) {
      document.querySelector('label.alpha').style.display = "inline-block";
      document.querySelector('label.range').style.display = "inline-block";
      document.querySelector('label.globalAlpha').style.display = "inline-block";
    } else {
      document.querySelector('label.alpha').style.display = "none";
      document.querySelector('label.range').style.display = "none";
      document.querySelector('label.globalAlpha').style.display = "none";
    }
  }

  rangeHandler() {
    this.rangePercent = parseInt(this.sliderRange.value);
    this.valueRange.innerHTML = `${this.sliderRange.value}%`;
  }

  alphaHandler() {
    this.alpha = parseFloat(this.sliderAlpha.value);
    this.valueAlpha.innerHTML = `${this.sliderAlpha.value}`;
  }

  globalAlphaHandler() {
    this.globalAlpha = parseFloat(this.sliderGlobalAlpha.value);
    this.valueGlobalAlpha.innerHTML = `${this.sliderGlobalAlpha.value}`;
  }

  ownColorHandler() {
    this.ownColor = this.colorPickerOwnColor.value;
  }

  draw(ctx) {
    const origGlobalAlpha = ctx.globalAlpha;
    const origFillStyle = ctx.fillStyle;
    const origSrokeStyle = ctx.strokeStyle;
    const viewport = ui.getViewport();
    const planets = df.getMyPlanets().filter(
      planet => viewport.isInViewport(planet.location.coords)
    )

    // paint bigger ones first
    // planets.sort((a, b) => b.range - a.range);

    if(this.highlightStyle == 0) for (const p of planets) {

      // draw range circle
      const { x, y } = viewport.worldToCanvasCoords(p.location.coords);
      const hsl = this.hexToHsl(this.ownColor);

      const fac = Math.max(0, Math.log2(this.rangePercent / 5));
      const range = fac * p.range;
      const trueRange = viewport.worldToCanvasDist(range);

      ctx.globalAlpha = this.globalAlpha;
      ctx.beginPath();
      ctx.arc(x, y, trueRange, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, trueRange);
      gradient.addColorStop(0, `hsla(${hsl}, 1)`);
      gradient.addColorStop(1, `hsla(${hsl}, ${this.alpha})`);
      ctx.fillStyle = gradient;
      ctx.fill();

      // reset ctx
      ctx.fillStyle = origFillStyle;
      ctx.strokeStyle = origSrokeStyle;
      ctx.globalAlpha = origGlobalAlpha;
    } else {

      ctx.fillStyle = this.ownColor;
      ctx.strokeStyle = this.ownColor;

      for (let planet of planets) {
        if (!planet.location) continue;
        let { x, y } = planet.location.coords;

        // add red circle when level <= 4
        if (planet.planetLevel <= 4) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "dashed";
          ctx.beginPath();
          ctx.arc(
            viewport.worldToCanvasX(x),
            viewport.worldToCanvasY(y),
            viewport.worldToCanvasDist(ui.getRadiusOfPlanetLevel(3) * 6),
            0,
            2 * Math.PI
          );
          // ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }

        ctx.beginPath();
        ctx.arc(
          viewport.worldToCanvasX(x),
          viewport.worldToCanvasY(y),
          viewport.worldToCanvasDist(
            ui.getRadiusOfPlanetLevel(planet.planetLevel)
          ),
          0,
          2 * Math.PI
        );
        ctx.fill();
        // ctx.stroke();
        ctx.closePath();
      }
    }
  }

  destroy() {
    this.selectHighlightStyle.removeEventListener('select', this.highlightStyleHandler);
    this.sliderRange.removeEventListener('input', this.rangeHandler);
    this.sliderAlpha.removeEventListener('input', this.alphaHandler);
    this.sliderGlobalAlpha.removeEventListener('input', this.globalAlphaHandler);
  }

}

export default Plugin;
