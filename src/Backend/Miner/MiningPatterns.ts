import { WorldCoords } from '@darkforest_eth/types';
import { Rectangle } from '../../_types/global/GlobalTypes';

export const enum MiningPatternType {
  Home,
  Target,
  Spiral,
  Cone,
  Grid,
  ETH,
  SwissCheese,
}

export interface MiningPattern {
  type: MiningPatternType;
  fromChunk: Rectangle;
  nextChunk: (prevLoc: Rectangle) => Rectangle;
}

export class SpiralPattern implements MiningPattern {
  type: MiningPatternType = MiningPatternType.Spiral;
  fromChunk: Rectangle;
  chunkSideLength: number;

  constructor(center: WorldCoords, chunkSize: number) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    this.chunkSideLength = chunkSize;
  }

  nextChunk(chunk: Rectangle): Rectangle {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    const nextBottomLeft = { x: currX, y: currY };

    if (currX === homeX && currY === homeY) {
      nextBottomLeft.y = homeY + this.chunkSideLength;
    } else if (currY - currX > homeY - homeX && currY + currX >= homeX + homeY) {
      if (currY + currX === homeX + homeY) {
        // break the circle
        nextBottomLeft.y = currY + this.chunkSideLength;
      } else {
        nextBottomLeft.x = currX + this.chunkSideLength;
      }
    } else if (currX + currY > homeX + homeY && currY - currX <= homeY - homeX) {
      nextBottomLeft.y = currY - this.chunkSideLength;
    } else if (currX + currY <= homeX + homeY && currY - currX < homeY - homeX) {
      nextBottomLeft.x = currX - this.chunkSideLength;
    } else {
      // if (currX + currY < homeX + homeY && currY - currX >= homeY - homeX)
      nextBottomLeft.y = currY + this.chunkSideLength;
    }

    return {
      bottomLeft: nextBottomLeft,
      sideLength: this.chunkSideLength,
    };
  }
}

export class SwissCheesePattern implements MiningPattern {
  type: MiningPatternType = MiningPatternType.SwissCheese;
  fromChunk: Rectangle;
  chunkSideLength: number;

  constructor(center: WorldCoords, chunkSize: number) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    this.chunkSideLength = chunkSize;
  }

  nextChunk(chunk: Rectangle): Rectangle {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    const nextBottomLeft = { x: currX, y: currY };

    if (currX === homeX && currY === homeY) {
      nextBottomLeft.y = homeY + this.chunkSideLength * 2;
    } else if (currY - currX > homeY - homeX && currY + currX >= homeX + homeY) {
      if (currY + currX === homeX + homeY) {
        // break the circle
        nextBottomLeft.y = currY + this.chunkSideLength * 2;
      } else {
        nextBottomLeft.x = currX + this.chunkSideLength * 2;
      }
    } else if (currX + currY > homeX + homeY && currY - currX <= homeY - homeX) {
      nextBottomLeft.y = currY - this.chunkSideLength * 2;
    } else if (currX + currY <= homeX + homeY && currY - currX < homeY - homeX) {
      nextBottomLeft.x = currX - this.chunkSideLength * 2;
    } else {
      // if (currX + currY < homeX + homeY && currY - currX >= homeY - homeX)
      nextBottomLeft.y = currY + this.chunkSideLength * 2;
    }

    return {
      bottomLeft: nextBottomLeft,
      sideLength: this.chunkSideLength,
    };
  }
}
