import { DFAnimation, DFStatefulAnimation, PlanetLevel } from '@darkforest_eth/types';
import anime from 'animejs';

export function sinusoidalAnimation(rps: number): DFAnimation {
  const startTime = Date.now() + Math.random() * 1000;

  return new DFAnimation(() => {
    const timeElapsed = Date.now() - startTime;
    return Math.sin((timeElapsed / 1000) * rps * Math.PI * 2);
  });
}

export function easeInAnimation(durationMs: number, delayMs?: number): DFAnimation {
  const progress = {
    percent: 0,
  };

  setTimeout(
    () => {
      anime({
        targets: progress, // this library will take a value in the `progress` object
        percent: 1, // .. and animate it between 0 and 1
        duration: durationMs,
        easing: 'easeInOutCubic', // .. using this easing function
        update: () => {},
      });
    },
    delayMs === undefined ? 0 : delayMs
  );

  return new DFAnimation(() => {
    return progress.percent;
  });
}

export function emojiEaseOutAnimation(durationMs: number, emoji: string) {
  const progress = {
    percent: 0,
  };

  anime({
    targets: progress, // this library will take a value in the `progress` object
    percent: 1, // .. and animate it between 0 and 1
    duration: durationMs,
    easing: 'easeInOutCubic', // .. using this easing function
    update: () => {},
  });

  return new DFStatefulAnimation(emoji, () => {
    return progress.percent;
  });
}

export function constantAnimation(constant: number): DFAnimation {
  return new DFAnimation(() => constant);
}

export function planetLevelToAnimationSpeed(level: PlanetLevel): number {
  return 1 / (1 + level);
}
