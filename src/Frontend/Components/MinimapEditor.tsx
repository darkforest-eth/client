import { WorldCoords } from '@darkforest_eth/types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { removeAlphabet } from '../Panes/Lobby/LobbiesUtils';
import { MinimapConfig } from '../Panes/Lobby/MinimapUtils';

export const MinimapEditor: React.FC<{
  style?: { width: string; height: string };
  onClick: (clickedCoords: WorldCoords) => void;
  onHover?: (hoveredCoords: WorldCoords) => void;
  minimapConfig: MinimapConfig | undefined;
  mirrorAxes: { x: boolean; y: boolean };
  disabled: boolean;
}> = ({
  style = { width: '400px', height: '400px' },
  onHover,
  onClick,
  minimapConfig,
  mirrorAxes,
  disabled,
}) => {
  const canvasPlanetLayer = useRef<HTMLCanvasElement | null>(null);

  if (!minimapConfig) return <div>Loading...</div>;

  const scaleFactor = minimapConfig.worldRadius / (parseInt(removeAlphabet(style.height)) / 2);

  const getAdjustedPointer = (
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    pointerX: number,
    pointerY: number
  ): WorldCoords | undefined => {
    if (!canvas.current) return;
    const canvasRef = canvas.current;
    const canvasBounds = canvasRef.getBoundingClientRect();
    const scaleX = canvasRef.width / canvasBounds.width;
    const scaleY = canvasRef.height / canvasBounds.height;
    const adjustedX = Math.floor((pointerX - canvasBounds.left) * scaleX);
    const adjustedY = Math.floor((pointerY - canvasBounds.top) * scaleY);
    return {
      x: adjustedX,
      y: adjustedY,
    };
  };

  const handleMouseClick = (
    canvas: React.MutableRefObject<HTMLCanvasElement | null>,
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mirror: { x: boolean; y: boolean }
  ) => {
    const ctx = canvasPlanetLayer.current!.getContext('2d');
    if (!ctx) return;
    const adjustedPointer = getAdjustedPointer(canvas!, e.clientX, e.clientY);
    if (!adjustedPointer) return;
    let normalizedPlanetCoords: WorldCoords = {
      x: Math.floor((adjustedPointer.x - parseInt(removeAlphabet(style.width)) / 2) * scaleFactor),
      y: Math.floor(
        (adjustedPointer.y - parseInt(removeAlphabet(style.height)) / 2) * -scaleFactor
      ),
    };
    if (mirror.x || mirror.y) {
      normalizedPlanetCoords = {
        x: mirror.x ? normalizedPlanetCoords.x * -1 : normalizedPlanetCoords.x,
        y: mirror.y ? normalizedPlanetCoords.y * -1 : normalizedPlanetCoords.y,
      };
    }
    onClick(normalizedPlanetCoords);
    return;
  };

  return (
    <CanvasLayer
      index={2}
      ref={canvasPlanetLayer}
      width={parseInt(removeAlphabet(style.width))}
      height={parseInt(removeAlphabet(style.height))}
      showCrosshair={!disabled}
      onMouseMove={(e) => {
        if (disabled) return;
        if (!onHover) return;
        const adjustedPointer = getAdjustedPointer(canvasPlanetLayer, e.clientX, e.clientY);
        if (adjustedPointer) {
          const normalizedPointer = {
            x: Math.floor(
              (adjustedPointer.x - parseInt(removeAlphabet(style.width)) / 2) * scaleFactor
            ),
            y: Math.floor(
              (adjustedPointer.y - parseInt(removeAlphabet(style.height)) / 2) * -scaleFactor
            ),
          };
          onHover(normalizedPointer);
        }
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        handleMouseClick(canvasPlanetLayer!, e, mirrorAxes);
      }}
    />
  );
};

const CanvasLayer = styled.canvas<{ index: number; showCrosshair: boolean }>`
  z-index: ${(props) => props.index};
  cursor: ${(props) => (props.showCrosshair ? 'crosshair' : 'default')};
  grid-area: 1/1;
  z-index: 2;
  position: relative;
`;
