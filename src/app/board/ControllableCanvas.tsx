import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import Viewport from './Viewport';
import CanvasRenderer from './CanvasRenderer';
import GameUIManagerContext from './GameUIManagerContext';
import GameUIManager from './GameUIManager';
import WindowManager, {
  CursorState,
  WindowManagerEvent,
} from '../../utils/WindowManager';
import _ from 'lodash';

export default function ControllableCanvas() {
  // html canvas element width and height. viewport dimensions are tracked by viewport obj
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const uiEmitter: UIEmitter = UIEmitter.getInstance();
  const gameUIManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const windowManager = WindowManager.getInstance();
  const [targeting, setTargeting] = useState<boolean>(false);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const updateTargeting = (newstate) => {
      setTargeting(newstate === CursorState.TargetingExplorer);
    };
    windowManager.on(WindowManagerEvent.StateChanged, updateTargeting);
    return () => {
      windowManager.removeListener(
        WindowManagerEvent.StateChanged,
        updateTargeting
      );
    };
  }, [windowManager]);

  const doResize = useCallback(() => {
    if (canvasRef.current) {
      setWidth(canvasRef.current.clientWidth);
      setHeight(canvasRef.current.clientHeight);
      uiEmitter.emit(UIEmitterEvent.WindowResize);
    }
  }, [uiEmitter]);

  useLayoutEffect(() => {
    if (canvasRef.current) doResize();
  }, [
    // dep array gives eslint issues, but it's fine i tested it i swear - Alan
    canvasRef,
    doResize,
    /* eslint-disable react-hooks/exhaustive-deps */
    canvasRef.current?.offsetWidth,
    canvasRef.current?.offsetHeight,
    /* eslint-enable react-hooks/exhaustive-deps */
  ]);

  useEffect(() => {
    if (!imgRef || !gameUIManager || !loaded) return;

    function onResize() {
      doResize();
      uiEmitter.emit(UIEmitterEvent.WindowResize);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const { deltaY } = e;
      uiEmitter.emit(UIEmitterEvent.CanvasScroll, deltaY);
    }
    const throttledWheel = _.throttle(onWheel, 60);

    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) {
      console.error('');
      return () => {};
    }

    Viewport.initialize(gameUIManager, 250, canvas);
    CanvasRenderer.initialize(canvas, gameUIManager, img);
    // We can't attach the wheel event onto the canvas due to:
    // https://www.chromestatus.com/features/6662647093133312
    canvas.addEventListener('wheel', throttledWheel);
    window.addEventListener('resize', onResize);

    uiEmitter.on(UIEmitterEvent.UIChange, doResize);

    return () => {
      Viewport.destroyInstance();
      CanvasRenderer.destroyInstance();
      canvas.removeEventListener('wheel', throttledWheel);
      window.removeEventListener('resize', onResize);
      uiEmitter.removeListener(UIEmitterEvent.UIChange, doResize);
    };
  }, [gameUIManager, uiEmitter, doResize, imgRef, loaded]);

  // attach event listeners
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    function onMouseEvent(
      emitEventName: UIEmitterEvent,
      mouseEvent: React.MouseEvent
    ) {
      const rect = canvas.getBoundingClientRect();
      const canvasX = mouseEvent.clientX - rect.left;
      const canvasY = mouseEvent.clientY - rect.top;
      uiEmitter.emit(emitEventName, { x: canvasX, y: canvasY });
    }

    const onMouseDown = (e) => {
      onMouseEvent(UIEmitterEvent.CanvasMouseDown, e);
    };
    // this is the root of the mousemove event
    const onMouseMove = (e) => {
      onMouseEvent(UIEmitterEvent.CanvasMouseMove, e);
    };
    const onMouseUp = (e) => {
      onMouseEvent(UIEmitterEvent.CanvasMouseUp, e);
    };
    // TODO convert this to mouseleave
    const onMouseOut = () => {
      uiEmitter.emit(UIEmitterEvent.CanvasMouseOut);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseOut);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseout', onMouseOut);
    };
  }, [canvasRef, uiEmitter]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: targeting ? 'crosshair' : undefined,
      }}
    >
      <img
        ref={imgRef}
        src='/public/img/texture.jpg'
        style={{ position: 'absolute', left: '-1000px', top: '-1000px' }}
        onLoad={() => setLoaded(true)}
      />
      <canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        id='mycanvas'
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
