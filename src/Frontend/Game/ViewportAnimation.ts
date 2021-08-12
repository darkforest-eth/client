import { WorldCoords } from '@darkforest_eth/types';
import anime from 'animejs';
import Viewport from './Viewport';

export class ViewportAnimation {
  public readonly timeStarted: number;
  public readonly coordsStart: WorldCoords;
  public readonly coordsEnd: WorldCoords;
  public readonly heightStart: number;
  public readonly heightEnd: number;
  public readonly durationMs: number;

  public constructor(
    timeStarted: number,
    coordsStart: WorldCoords,
    coordsEnd: WorldCoords,
    heightStart: number,
    heightEnd: number,
    durationMs: number
  ) {
    this.timeStarted = timeStarted;
    this.coordsStart = coordsStart;
    this.coordsEnd = coordsEnd;
    this.heightStart = heightStart;
    this.heightEnd = heightEnd;
    this.durationMs = durationMs;
  }

  public static between(
    timeStarted: number,
    from: WorldCoords,
    to: WorldCoords,
    heightStart: number,
    heightEnd: number
  ): ViewportAnimation {
    return new ViewportAnimation(timeStarted, from, to, heightStart, heightEnd, 1250);
  }

  public apply(percent: number, viewport: Viewport): void {
    const dx = this.coordsEnd.x - this.coordsStart.x;
    const dy = this.coordsEnd.y - this.coordsStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) {
      return;
    }

    const normX = dx / length;
    const normY = dy / length;
    const currentDx = percent * length * normX;
    const currentDy = percent * length * normY;
    const currentX = this.coordsStart.x + currentDx;
    const currentY = this.coordsStart.y + currentDy;

    viewport.centerCoords({ x: currentX, y: currentY });
    viewport.setWorldHeight(viewport.heightInWorldUnits);
  }
}

export class AnimationManager {
  private currentAnimation?: anime.AnimeInstance;

  public stopCurrentAnimation() {
    if (this.currentAnimation) {
      this.currentAnimation.pause();
      this.currentAnimation = undefined;
    }
  }

  public replaceAnimation(animation: ViewportAnimation) {
    this.stopCurrentAnimation();

    const progress = {
      percent: 0,
    };

    this.currentAnimation = anime({
      targets: progress, // this library will take a value in the `progress` object
      percent: 100, // .. and animate it between 0 and 100
      duration: animation.durationMs,
      easing: 'easeInOutCubic', // .. using this easing function
      update: () => {
        animation.apply(progress.percent / 100, Viewport.getInstance());
      },
    });
  }
}
