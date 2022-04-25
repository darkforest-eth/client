import {
    ModifierType,
    ModifierTypeNames
  } from '@darkforest_eth/types';
  import React from 'react';
  
  export const ModifierText = ({ modifier }: { modifier: ModifierType }) => (
    <>{ModifierTypeNames[modifier as ModifierType]}</>
  );
  
  // combined labels