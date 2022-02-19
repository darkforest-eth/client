import { Rectangle, WorldCoords } from '@darkforest_eth/types';

export const enum MiningPatternType {
  Home,
  Target,
  Spiral,
  Cone,
  Grid,
  ETH,
  SwissCheese,
  TowardsCenter,
  TowardsCenterV2,
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

export class TowardsCenterPattern implements MiningPattern {
  type: MiningPatternType = MiningPatternType.TowardsCenter;
  fromChunk: Rectangle;
  chunkSideLength: number;
  private tipX: number;
  private tipY: number;
  private maxWidth = 1600;

  constructor(center: WorldCoords, chunkSize: number) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    if (bottomLeftX < 0) {
      this.tipX = bottomLeftX + chunkSize;
    } else {
      this.tipX = bottomLeftX - chunkSize;
    }
    if (bottomLeftY < 0) {
      this.tipY = bottomLeftY + chunkSize;
    } else {
      this.tipY = bottomLeftY - chunkSize;
    }
    this.chunkSideLength = chunkSize;
  }

  nextChunk(chunk: Rectangle): Rectangle {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    const absHomeX = Math.abs(homeX);
    const absHomeY = Math.abs(homeY);
    const absTipX = Math.abs(this.tipX);
    const absTipY = Math.abs(this.tipY);
    const absCurrX = Math.abs(currX);
    const absCurrY = Math.abs(currY);

    const endX =
      currX <= 0
        ? Math.max(homeX, this.tipX - this.maxWidth)
        : Math.min(homeX, this.tipX + this.maxWidth);

    const nextBottomLeft = {
      x: currX,
      y: currY,
    };

    if (currX === homeX && currY === homeY) {
      nextBottomLeft.x = this.tipX;
      nextBottomLeft.y = this.tipY;
    } else if (currX === this.tipX && currY === this.tipY) {
      if (currX < 0) {
        nextBottomLeft.x = currX - this.chunkSideLength;
      } else if (currX > 0) {
        nextBottomLeft.x = currX + this.chunkSideLength;
      } else {
        // Exactly 0
        if (homeX < 0) {
          nextBottomLeft.x = currX - this.chunkSideLength;
        } else {
          nextBottomLeft.x = currX + this.chunkSideLength;
        }
      }
    } else if (absCurrX < absHomeX && currY === this.tipY && absCurrX - absTipX < this.maxWidth) {
      if (currX < 0) {
        nextBottomLeft.x = currX - this.chunkSideLength;
      } else if (currX > 0) {
        nextBottomLeft.x = currX + this.chunkSideLength;
      } else {
        // Exactly 0
        if (homeX < 0) {
          nextBottomLeft.x = currX - this.chunkSideLength;
        } else {
          nextBottomLeft.x = currX + this.chunkSideLength;
        }
      }
    } else if (currX === endX && currY === this.tipY) {
      nextBottomLeft.x = this.tipX;
      if (currY < 0) {
        nextBottomLeft.y = currY - this.chunkSideLength;
      } else if (currY > 0) {
        nextBottomLeft.y = currY + this.chunkSideLength;
      } else {
        // Exactly 0
        if (homeY < 0) {
          nextBottomLeft.y = currY - this.chunkSideLength;
        } else {
          nextBottomLeft.y = currY + this.chunkSideLength;
        }
      }
    } else if (currX === this.tipX && absCurrY < absHomeY && absCurrY - absTipY < this.maxWidth) {
      if (currY < 0) {
        nextBottomLeft.y = currY - this.chunkSideLength;
      } else if (currY > 0) {
        nextBottomLeft.y = currY + this.chunkSideLength;
      } else {
        // Exactly 0
        if (homeY < 0) {
          nextBottomLeft.y = currY - this.chunkSideLength;
        } else {
          nextBottomLeft.y = currY + this.chunkSideLength;
        }
      }
    } else {
      if (this.tipX < 0) {
        this.tipX += this.chunkSideLength;
      } else if (this.tipX > 0) {
        this.tipX -= this.chunkSideLength;
      } else {
        this.tipX = 0;
      }
      if (this.tipY < 0) {
        this.tipY += this.chunkSideLength;
      } else if (this.tipY > 0) {
        this.tipY -= this.chunkSideLength;
      } else {
        this.tipY = 0;
      }
      nextBottomLeft.x = this.tipX;
      nextBottomLeft.y = this.tipY;
    }

    return {
      bottomLeft: nextBottomLeft,
      sideLength: this.chunkSideLength,
    };
  }
}

export class TowardsCenterPatternV2 implements MiningPattern {
  type: MiningPatternType = MiningPatternType.TowardsCenterV2;
  fromChunk: Rectangle;
  chunkSideLength: number;
  private rowRadius: number;
  private yDominant: boolean;
  private slopeToCenter: number;

  constructor(center: WorldCoords, chunkSize: number) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    this.chunkSideLength = chunkSize;
    this.rowRadius = 5; // In chunks
    this.yDominant = Math.abs(bottomLeftY) > Math.abs(bottomLeftX);
    this.slopeToCenter = bottomLeftX === 0 ? 1 : bottomLeftY / bottomLeftX; // i.e. deltaY / deltaX
  }

  toChunk(coord: number): number {
    return Math.floor(coord / this.chunkSideLength) * this.chunkSideLength;
  }

  nextChunk(chunk: Rectangle): Rectangle {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    if (this.yDominant) {
      const centerOfRowX = Math.floor(homeX + (currY - homeY) / this.slopeToCenter);
      if (currX < centerOfRowX + this.chunkSideLength * (this.rowRadius - 1)) {
        return {
          bottomLeft: { x: currX + this.chunkSideLength, y: currY },
          sideLength: this.chunkSideLength,
        };
      } else {
        const nextCenterOfRowX = Math.floor(
          centerOfRowX + this.chunkSideLength / this.slopeToCenter
        );
        return {
          bottomLeft: {
            x: this.toChunk(nextCenterOfRowX - (this.rowRadius - 1) * this.chunkSideLength),
            y: currY < 0 ? currY + this.chunkSideLength : currY - this.chunkSideLength,
          },
          sideLength: this.chunkSideLength,
        };
      }
    }

    // We are now in the X dominant case
    const centerOfRowY = Math.floor(homeY + (currX - homeX) * this.slopeToCenter);
    if (currY < centerOfRowY + this.chunkSideLength * (this.rowRadius - 1)) {
      return {
        bottomLeft: { x: currX, y: currY + this.chunkSideLength },
        sideLength: this.chunkSideLength,
      };
    } else {
      const nextCenterOfRowY = Math.floor(centerOfRowY + this.chunkSideLength * this.slopeToCenter);
      return {
        bottomLeft: {
          x: currX < 0 ? currX + this.chunkSideLength : currX - this.chunkSideLength,
          y: this.toChunk(nextCenterOfRowY - (this.rowRadius - 1) * this.chunkSideLength),
        },
        sideLength: this.chunkSideLength,
      };
    }
  }
}
