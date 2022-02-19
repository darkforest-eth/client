import { DarkForestTheme } from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';

customElements.define(DarkForestTheme.tagName, DarkForestTheme);

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Theme = createComponent(React, DarkForestTheme.tagName, DarkForestTheme, {
  // If we had any, we would map DOM events to React handlers passed in as props. For example:
  // onClick: 'click'
});
