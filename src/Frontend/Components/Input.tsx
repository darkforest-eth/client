import {
  DarkForestCheckbox,
  DarkForestColorInput,
  DarkForestNumberInput,
  DarkForestTextInput,
} from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';

customElements.define(DarkForestCheckbox.tagName, DarkForestCheckbox);
customElements.define(DarkForestColorInput.tagName, DarkForestColorInput);
customElements.define(DarkForestNumberInput.tagName, DarkForestNumberInput);
customElements.define(DarkForestTextInput.tagName, DarkForestTextInput);

export { DarkForestCheckbox, DarkForestColorInput, DarkForestNumberInput, DarkForestTextInput };

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Checkbox = createComponent<
  DarkForestCheckbox,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestCheckbox>) => void;
  }
>(React, DarkForestCheckbox.tagName, DarkForestCheckbox, {
  onChange: 'input',
});

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const ColorInput = createComponent<
  DarkForestColorInput,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestColorInput>) => void;
  }
>(React, DarkForestColorInput.tagName, DarkForestColorInput, {
  // The `input` event is more like what we expect as `onChange` in React
  onChange: 'input',
});

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const NumberInput = createComponent<
  DarkForestNumberInput,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestNumberInput>) => void;
  }
>(React, DarkForestNumberInput.tagName, DarkForestNumberInput, {
  // The `input` event is more like what we expect as `onChange` in React
  onChange: 'input',
});

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const TextInput = createComponent<
  DarkForestTextInput,
  {
    onChange: (e: Event & React.ChangeEvent<DarkForestTextInput>) => void;
    onBlur: (e: Event) => void;
  }
>(React, DarkForestTextInput.tagName, DarkForestTextInput, {
  // The `input` event is more like what we expect as `onChange` in React
  onChange: 'input',
  onBlur: 'blur',
});
