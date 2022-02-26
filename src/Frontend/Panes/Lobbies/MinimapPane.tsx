import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Modal } from '../../Components/Modal';
import { DrawMessage, MinimapConfig } from './MinimapUtils';

function getWorker() {
  return new Worker(new URL('./minimap.worker.ts', import.meta.url));
}

function drawOnCanvas(canvas: HTMLCanvasElement | null, msg: DrawMessage) {
  if (!canvas) {
    console.error(`No canvas to draw to`);
    return;
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error(`Couldn't get the planet context`);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dot = 4;
  const sizeFactor = 380;
  const { radius, data } = msg;

  const normalize = (val: number) => {
    return Math.floor(((val + radius) * sizeFactor) / (radius * 2));
  };

  // draw mini-map

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 0) {
      ctx.fillStyle = '#186469'; // inner nebula
    } else if (data[i].type === 1) {
      ctx.fillStyle = '#24247d'; // outer nebula
    } else if (data[i].type === 2) {
      ctx.fillStyle = '#000000'; // deep space
    } else if (data[i].type === 3) {
      ctx.fillStyle = '#038700'; // dead space
    }
    ctx.fillRect(normalize(data[i].x) + 10, normalize(data[i].y * -1) + 10, dot, dot);
  }

  // draw extents of map

  const radiusNormalized = normalize(radius) / 2;

  ctx.beginPath();
  ctx.arc(radiusNormalized + 12, radiusNormalized + 12, radiusNormalized, 0, 2 * Math.PI);
  ctx.strokeStyle = '#DDDDDD';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function Minimap({
  modalIndex,
  config,
}: {
  modalIndex: number;
  config: MinimapConfig | undefined;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const worker = useMemo(getWorker, []);

  useEffect(() => {
    if (config) {
      setRefreshing(true);
      worker.postMessage(JSON.stringify(config));
    }
  }, [worker, config, setRefreshing]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data) {
        drawOnCanvas(canvasRef.current, JSON.parse(e.data));
        setRefreshing(false);
      }
    }

    worker.addEventListener('message', onMessage);

    return () => worker.removeEventListener('message', onMessage);
  }, [worker, setRefreshing]);

  return (
    <Modal width='416px' initialX={650} initialY={200} index={modalIndex}>
      <div slot='title'>World Minimap</div>
      <canvas
        ref={canvasRef}
        style={{ width: '400px', height: '400px' }}
        width='400'
        height='400'
      />
      <div style={{ textAlign: 'center', height: '24px' }}>
        {refreshing ? <LoadingSpinner initialText='Refreshing...' /> : null}
      </div>
    </Modal>
  );
}
