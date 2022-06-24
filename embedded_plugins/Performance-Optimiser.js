// Performance Optimizer
//
// Aims to improve performance under heavy load:
// * Reduce render load by limiting percentage of total compute power to spend on rendering. Implemented by overwriting `window.requestAnimationFrame`. Could be more sophisiticated in the future if render managers get exposed.
// * Clear zk-SNARK proofs cache / Set max. limit of zk-SNARK proofs. Default is 20. Every move between the same two planets after the first one is sped up significantly.

import $ from 'https://cdn.skypack.dev/pin/jquery@v3.5.1-GJsJJ2VEWnBDZuot9fRf/min/jquery.js';

class PerformanceOptimizerState {
  constructor() {
    this.pluginWindow = null;

    this.rendering = "unlimited";
    this.renderingFps = 10;
    this.renderingPercentage = 50;

    this.cacheCount = 0;
    this.cacheLimit = 20; // SnarkArgsHelper.DEFAULT_SNARK_CACHE_SIZE = 20

    this.destroyed = false;

    const requestIDMap = {};
    let nextRequestID = 0;

    window._requestAnimationFrame = window.requestAnimationFrame;
    const requestAnimationFrame = callback => {
      let currentCallback, requestID;
      let lastRenderStart = 0;
      let lastRenderDuration = 0;

      const execute = () => {
        delete requestIDMap[requestID];
        window.requestAnimationFrame = startLoop;
        currentCallback();
        window.requestAnimationFrame = requestAnimationFrame;
      };

      const loop = () => {
        if (this.destroyed) return currentCallback();

        if (this.rendering === "fps") {
          const now = Date.now();
          if (this.renderingFps > 0 && now - lastRenderStart >= 1000 / this.renderingFps) {
            lastRenderStart = now;
            return execute();
          }
        } else if (this.rendering === "percent") {
          const now = Date.now();
          if (this.renderingPercentage > 0 && now - lastRenderStart >= Math.min(lastRenderDuration * 100 / this.renderingPercentage, 1000)) {
            lastRenderStart = now;
            execute();
            lastRenderDuration = Date.now() - now;
            return;
          }
        } else if (this.rendering !== "stopped") {
          return execute();
        }
        requestIDMap[requestID] = window._requestAnimationFrame(loop);
      }
      const startLoop = callback => {
        requestID = nextRequestID++;
        currentCallback = callback;
        requestIDMap[requestID] = window._requestAnimationFrame(loop);
        return requestID;
      }
      return startLoop(callback);
    };
    window.requestAnimationFrame = requestAnimationFrame;

    window._cancelAnimationFrame = window.cancelAnimationFrame;
    window.cancelAnimationFrame = requestID => {
      window._cancelAnimationFrame(requestIDMap[requestID]);
      delete requestIDMap[requestID];
    };

    // SNARK cache limit size adjustment
    df.snarkHelper.setSnarkCacheSize(this.cacheLimit)

  }

  destroy() {
    this.destroyed = true;
    this.pluginWindow = null;
    window.cancelAnimationFrame = window._cancelAnimationFrame;
    window.requestAnimationFrame = window._requestAnimationFrame;
    df.snarkHelper.setSnarkCacheSize(20)
    console.log("original functions restored.");
    delete df.performanceOptimizerState;
  }
}

if (df.performanceOptimizerState === undefined) df.performanceOptimizerState = new PerformanceOptimizerState();
const state = df.performanceOptimizerState;

class PerformanceOptimizer {
  constructor() {
    state.pluginWindow = this;
  }

  clearSnarkCache() {
    df.snarkHelper.moveSnarkCache.clear()
  }

  async render(div) {
    $(div)
      .append($('<p>Limit Rendering</p>'))
      .append($('<div />')
        .append($('<input type="radio" name="rendering" value="unlimited" />'))
        .append($('<span> unlimited</span>'))
      )
      .append($('<div />')
        .append($('<input type="radio" name="rendering" value="fps" />'))
        .append($('<span> max FPS: </span>'))
        .append($(`<input type="range" min="0" max="30" value="${state.renderingFps}" class="slider" id="fpsRange">`))
        .append($(`<span id="fpsSpan"> ${state.renderingFps} FPS</span>`))
      )
      .append($('<div />')
        .append($('<input type="radio" name="rendering" value="percent" />'))
        .append($('<span> max percentage: </span>'))
        .append($(`<input type="range" min="0" max="100" value="${state.renderingPercentage}" class="slider" id="percentageRange">`))
        .append($(`<span id="percentageSpan"> ${state.renderingPercentage}%</span>`))
      )
      .append($('<div />')
        .append($('<input type="radio" name="rendering" value="stopped" />'))
        .append($('<span> stopped</span>'))
      )
      .append($('<br>'))
      .append($('<p>Cache zk-SNARK Proofs</p>'))
      .append($('<div />')
        .append($('<span> max. SNARK CACHE SIZE: </span>'))
        .append($(`<input type="range" min="0" max="1000" value="${state.cacheLimit}" class="slider" id="cacheLimitSize">`))
        .append($(`<span id="cacheLimitSizeSpan"> ${state.cacheLimit} </span>`))
      )
      .append($('<div />')
        .append($(`<span class="${$("span[class^='Btn']:contains(save)").attr('class')}" id="cacheClearBtn">Clear</span>`))
      );
    $(`input:radio[name=rendering][value=${state.rendering}]`).prop("checked", true);
    $('#cachingBox').prop("checked", state.caching);
    $('input:radio[name=rendering]').change(function () { state.rendering = this.value });
    const [fpsSpan, percentageSpan, cacheLimitSizeSpan] = [$("#fpsSpan"), $("#percentageSpan"), $("#cacheLimitSizeSpan")];
    $('#fpsRange').change(function () { state.renderingFps = parseInt(this.value) }).on("input", function () { fpsSpan.text(` ${this.value} FPS`) });
    $('#percentageRange').change(function () { state.renderingPercentage = parseInt(this.value) }).on("input", function () { percentageSpan.text(` ${this.value}%`) });

    $('#cacheLimitSize').change(function () { state.cacheLimit = parseInt(this.value) }).on("input", function () { cacheLimitSizeSpan.text(` ${this.value}`) });
    $('#cacheClearBtn').click(() => { this.clearSnarkCache(); })
  }

  destroy() {
    state.pluginWindow = null;
  }
}

export default PerformanceOptimizer;