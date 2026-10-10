import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { events } from './clinical-data';
import { DAY, stamp, formatDate, fullRange, adjustOverviewRange, type Range } from './timeline-model';

type Gesture = 'move' | 'start' | 'end';
const extent = fullRange.end - fullRange.start + DAY;
const dayIndex = (date: number) => Math.round((date - fullRange.start) / DAY);
const shortDate = (date: number) => formatDate(date, { month: 'short', day: 'numeric' });
const bins = Array.from({ length: 24 }, (_, index) => {
  const start = fullRange.start + index * extent / 24;
  const end = fullRange.start + (index + 1) * extent / 24;
  return { start, end, count: events.filter(event => stamp(event.date) >= start && stamp(event.date) < end).length };
});
const maxCount = Math.max(...bins.map(bin => bin.count), 1);
const months: { start: number; end: number; label: string }[] = [];
for (let cursor = new Date(fullRange.start); cursor.getTime() <= fullRange.end;) {
  const year = cursor.getUTCFullYear(), month = cursor.getUTCMonth();
  months.push({ start: Math.max(fullRange.start, Date.UTC(year, month, 1)), end: Math.min(fullRange.end, Date.UTC(year, month + 1, 0)), label: formatDate(cursor.getTime(), { month: 'short' }) });
  cursor = new Date(Date.UTC(year, month + 1, 1));
}

export function ActivityOverview({ range, onChange }: { range: Range; onChange: (range: Range) => void }) {
  const plotRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ mode: Gesture; range: Range; x: number; width: number; pointerId: number } | null>(null);
  const [dragging, setDragging] = useState<Gesture | null>(null);
  const label = `${formatDate(range.start)} through ${formatDate(range.end)}`;

  function begin(event: PointerEvent<HTMLDivElement>, mode: Gesture) {
    if (!event.isPrimary || event.button !== 0) return;
    const width = plotRef.current?.getBoundingClientRect().width;
    if (!width) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { mode, range: { ...range }, x: event.clientX, width, pointerId: event.pointerId };
    setDragging(mode);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointerId) return;
    onChange(adjustOverviewRange(active.range, active.mode, (event.clientX - active.x) / active.width * extent));
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancel = false) {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointerId) return;
    if (cancel) onChange(active.range);
    gesture.current = null;
    setDragging(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>, mode: Gesture) {
    let delta: number;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') delta = -(event.shiftKey ? 7 : 1) * DAY;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') delta = (event.shiftKey ? 7 : 1) * DAY;
    else if (event.key === 'PageUp') delta = 7 * DAY;
    else if (event.key === 'PageDown') delta = -7 * DAY;
    else if (event.key === 'Home') delta = -extent;
    else if (event.key === 'End') delta = extent;
    else return;
    event.preventDefault();
    event.stopPropagation();
    onChange(adjustOverviewRange(range, mode, delta));
  }

  const control = (mode: Gesture) => ({
    tabIndex: 0,
    role: 'slider',
    'aria-orientation': 'horizontal' as const,
    'aria-label': mode === 'move' ? 'Move visible period' : mode === 'start' ? 'Visible period start date' : 'Visible period end date',
    'aria-valuemin': mode === 'end' ? dayIndex(range.start) : 0,
    'aria-valuemax': mode === 'start' ? dayIndex(range.end) : mode === 'move' ? dayIndex(fullRange.end) - dayIndex(range.end) + dayIndex(range.start) : dayIndex(fullRange.end),
    'aria-valuenow': dayIndex(mode === 'end' ? range.end : range.start),
    'aria-valuetext': mode === 'move' ? label : formatDate(mode === 'start' ? range.start : range.end),
    'aria-describedby': 'overview-keyboard-help',
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => begin(event, mode),
    onPointerMove: move,
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => finish(event),
    onPointerCancel: (event: PointerEvent<HTMLDivElement>) => finish(event, true),
    onLostPointerCapture: () => { gesture.current = null; setDragging(null); },
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => keyboard(event, mode),
  });

  return <div className="history-overview" aria-label="Full record overview">
    <div className="overview-label"><strong>RECORD ACTIVITY</strong><span>{shortDate(fullRange.start)} – {shortDate(fullRange.end)}</span></div>
    <div className="overview-body">
      <div className={`activity-plot ${dragging ? 'is-dragging' : ''}`} ref={plotRef} onClick={event => {
        if ((event.target as HTMLElement).closest('.activity-window')) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const target = fullRange.start + (event.clientX - rect.left) / rect.width * extent;
        onChange(adjustOverviewRange(range, 'move', target - (range.start + range.end + DAY) / 2));
      }}>
        <div className="activity-bars" aria-hidden="true">{bins.map((bin, index) => <span key={index} title={`${shortDate(bin.start)}–${shortDate(bin.end - DAY)} · ${bin.count} entries`}><i style={{ height: `${Math.max(5, bin.count / maxCount * 100)}%` }}/></span>)}</div>
        <div className={`activity-window ${dragging ? `dragging-${dragging}` : ''}`} style={{ left: `${(range.start - fullRange.start) / extent * 100}%`, width: `${(range.end - range.start + DAY) / extent * 100}%` }}>
          <div className="window-drag-area" {...control('move')} title={`Drag to move · ${label}`}><span aria-hidden="true" className="window-grip">⠿</span></div>
          <div className="window-handle start-handle" {...control('start')} title={`Drag start date · ${formatDate(range.start)}`}><span aria-hidden="true"/></div>
          <div className="window-handle end-handle" {...control('end')} title={`Drag end date · ${formatDate(range.end)}`}><span aria-hidden="true"/></div>
        </div>
      </div>
      <div className="overview-months">{months.filter((_, index) => index % Math.max(1, Math.ceil(months.length / 12)) === 0).map(month => <button key={month.start} onClick={() => onChange({ start: month.start, end: month.end })}>{month.label}</button>)}</div>
      <span className="sr-only" id="overview-keyboard-help">Use arrow keys to adjust by one day, Shift and arrow keys by seven days. Home and End move to the limits.</span>
    </div>
  </div>;
}
