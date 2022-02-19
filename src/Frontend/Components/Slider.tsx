import { DarkForestSlider, DarkForestSliderHandle } from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';

customElements.define(DarkForestSlider.tagName, DarkForestSlider);
customElements.define(DarkForestSliderHandle.tagName, DarkForestSliderHandle);

export { DarkForestSlider, DarkForestSliderHandle };

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Slider = createComponent<
  DarkForestSlider,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestSlider>) => void;
  }
>(React, DarkForestSlider.tagName, DarkForestSlider, {
  // The `input` event is more like what we expect as `onChange` in React (live-updating as you slide)
  onChange: 'input',
});

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const SliderHandle = createComponent<
  DarkForestSliderHandle,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestSliderHandle>) => void;
  }
>(React, DarkForestSliderHandle.tagName, DarkForestSliderHandle, {
  // The `change` event on a handle is all we really care about on handles
  onChange: 'change',
});
