import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from 'react';
import { inspectorWidthBounds, resizeInspectorWidth } from './timeline-model';

type Props = {
  width: number;
  onChange: (width: number) => void;
  workspaceRef: RefObject<HTMLDivElement | null>;
};

export function InspectorResizeHandle({ width, onChange, workspaceRef }: Props) {
  const [available, setAvailable] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<{ x: number; width: number; pointerId: number } | null>(null);
  const bounds = inspectorWidthBounds(available || width);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    observer.observe(workspace);
    return () => observer.disconnect();
  }, [workspaceRef]);

  useEffect(() => {
    if (!available) return;
    const clamped = resizeInspectorWidth(width, 0, available);
    if (clamped !== width) onChange(clamped);
  }, [available, width, onChange]);

  function begin(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { x: event.clientX, width, pointerId: event.pointerId };
    setDragging(true);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    onChange(resizeInspectorWidth(active.width, active.x - event.clientX, available));
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancel = false) {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    if (cancel) onChange(resizeInspectorWidth(active.width, 0, available));
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    let target: number;
    if (event.key === 'ArrowLeft') target = width + (event.shiftKey ? 80 : 20);
    else if (event.key === 'ArrowRight') target = width - (event.shiftKey ? 80 : 20);
    else if (event.key === 'Home') target = bounds.min;
    else if (event.key === 'End') target = bounds.max;
    else return;
    event.preventDefault();
    event.stopPropagation();
    onChange(resizeInspectorWidth(target, 0, available));
  }

  return <div className={`inspector-resize-handle ${dragging ? 'is-resizing' : ''}`}
    role="separator" aria-orientation="vertical" aria-label="Resize record inspector"
    aria-controls="record-inspector" aria-valuemin={bounds.min} aria-valuemax={bounds.max}
    aria-valuenow={Math.max(bounds.min, Math.min(bounds.max, width))} aria-valuetext={`${width} pixels wide`}
    aria-describedby="inspector-resize-help" tabIndex={0}
    title="Drag to resize · Double-click to reset"
    onPointerDown={begin} onPointerMove={move} onPointerUp={event => finish(event)}
    onPointerCancel={event => finish(event, true)}
    onLostPointerCapture={() => { gesture.current = null; setDragging(false); }}
    onDoubleClick={() => onChange(resizeInspectorWidth(348, 0, available))} onKeyDown={keyboard}>
    <span aria-hidden="true"/>
    <span id="inspector-resize-help" className="sr-only">Drag left to expand or right to narrow. Use Left and Right arrow keys to resize, Home for minimum width, or End for maximum width.</span>
  </div>;
}
