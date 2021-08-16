export class CustomTowardsCenterPattern {
  constructor(center, chunkSize) {
    const bottomLeftX = Math.floor(center.x / chunkSize) * chunkSize;
    const bottomLeftY = Math.floor(center.y / chunkSize) * chunkSize;
    const bottomLeft = { x: bottomLeftX, y: bottomLeftY };
    this.fromChunk = {
      bottomLeft,
      sideLength: chunkSize,
    };
    this.chunkSideLength = chunkSize;
    this.rowRadius = 30; // In chunks
    this.yDominant = (Math.abs(bottomLeftY) > Math.abs(bottomLeftX))
    this.slopeToCenter = bottomLeftX === 0 ? 1 : bottomLeftY / bottomLeftX // i.e. deltaY / deltaX
  }

  toChunk(coord) {
      return Math.floor(coord / this.chunkSideLength) * this.chunkSideLength
  }

  nextChunk(chunk) {
    const homeX = this.fromChunk.bottomLeft.x;
    const homeY = this.fromChunk.bottomLeft.y;
    const currX = chunk.bottomLeft.x;
    const currY = chunk.bottomLeft.y;

    if (this.yDominant) {
      const centerOfRowX = homeX + (currY - homeY) / this.slopeToCenter
      if (currX < centerOfRowX + this.chunkSideLength * (this.rowRadius - 1)) {
          return {
              bottomLeft: { x: currX + this.chunkSideLength, y: currY },
              sideLength: this.chunkSideLength,
          };
      } else {
          const nextCenterOfRowX = centerOfRowX + this.chunkSideLength / this.slopeToCenter
          return {
              bottomLeft: {
                  x: this.toChunk(nextCenterOfRowX - (this.rowRadius - 1) * this.chunkSideLength),
                  y: currY < 0 ? currY + this.chunkSideLength : currY - this.chunkSideLength
              },
              sideLength: this.chunkSideLength,
          };
      }
    }

    // We are now in the X dominant case
    const centerOfRowY = homeY + (currX - homeX) * this.slopeToCenter
    if (currY < centerOfRowY + this.chunkSideLength * (this.rowRadius - 1)) {
        return {
            bottomLeft: { x: currX, y: currY + this.chunkSideLength },
            sideLength: this.chunkSideLength,
        };
    } else {
        const nextCenterOfRowY = centerOfRowY + this.chunkSideLength * this.slopeToCenter
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
