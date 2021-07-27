import { GasPrices } from '@darkforest_eth/types';
import React from 'react';
import { Underline } from './CoreUI';

export function DisplayGasPrices({ gasPrices }: { gasPrices?: GasPrices }) {
  return (
    <div>
      {!gasPrices ? (
        'unknown'
      ) : (
        <>
          <Underline>slow</Underline>: {gasPrices.slow + ' '}
          <Underline>average</Underline>: {gasPrices.average + ' '}
          <Underline>fast</Underline>: {gasPrices.fast + ' '}
        </>
      )}
    </div>
  );
}
