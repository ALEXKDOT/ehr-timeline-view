import { events, patient, type Category, type Medication, type TimelineEvent } from "./clinical-data";

/** Dates in the source have calendar-day precision, with no time-zone or clock evidence. */
export const DAY = 86_400_000;
export type Range = { start: number; end: number };
export type EventGroup = { items: TimelineEvent[]; start: number; end: number };
type MedicationSegment = Medication["segments"][number];

export function stamp(value: string): number {
  const date = value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NaN;
  const time = Date.parse(`${date}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === date ? time : NaN;
}

export function isoDate(time: number): string {
  return Number.isFinite(time) ? new Date(time).toISOString().slice(0, 10) : "";
}

export function formatDate(value: string | number, options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }): string {
  const time = typeof value === "number" ? value : stamp(value);
  if (!Number.isFinite(time)) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(time);
}

export const fullRange: Range = { start: stamp(patient.startDate), end: stamp(patient.endDate) };

/** Translate an overflowing range instead of shortening it, except when it exceeds all bounds. */
export function clampRange(range: Range, bounds: Range = fullRange): Range {
  if (!Number.isFinite(range.start) || !Number.isFinite(range.end)) return { ...bounds };
  const start = Math.min(range.start, range.end);
  const span = Math.abs(range.end - range.start);
  const extent = Math.max(0, bounds.end - bounds.start);
  if (span >= extent) return { ...bounds };
  const clippedStart = Math.max(bounds.start, Math.min(start, bounds.end - span));
  return { start: clippedStart, end: clippedStart + span };
}

/** A factor below one zooms in; a factor above one zooms out. */
export function zoomRange(range: Range, factor: number, bounds: Range = fullRange): Range {
  const current = clampRange(range, bounds);
  if (!Number.isFinite(factor) || factor <= 0) return current;
  const extent = Math.max(0, bounds.end - bounds.start);
  const span = Math.min(extent, Math.max(Math.min(DAY, extent), (current.end - current.start) * factor));
  const center = (current.start + current.end) / 2;
  return clampRange({ start: center - span / 2, end: center + span / 2 }, bounds);
}

export function panRange(range: Range, delta: number, bounds: Range = fullRange): Range {
  const current = clampRange(range, bounds);
  if (!Number.isFinite(delta)) return current;
  return clampRange({ start: current.start + delta, end: current.end + delta }, bounds);
}

/** Overview gestures snap to calendar days. Resizing keeps the opposite edge fixed. */
export function adjustOverviewRange(range: Range, mode: 'move' | 'start' | 'end', delta: number, bounds: Range = fullRange): Range {
  const current = clampRange(range, bounds);
  if (!Number.isFinite(delta)) return current;
  const days = Math.round(delta / DAY) * DAY;
  if (mode === 'move') return panRange(current, days, bounds);
  if (mode === 'start') return { start: Math.max(bounds.start, Math.min(current.end, current.start + days)), end: current.end };
  return { start: current.start, end: Math.min(bounds.end, Math.max(current.start, current.end + days)) };
}

function searchableText(event: TimelineEvent): string {
  return [event.id, event.date, event.displayDate, event.title, event.short, event.summary,
    ...event.details, event.clinician, event.institution, event.medication, event.recordType, event.caution]
    .filter(Boolean).join(" ").toLocaleLowerCase("en-US");
}

export function filterEvents(items: readonly TimelineEvent[], query: string, categories: readonly Category[]): TimelineEvent[] {
  const term = query.trim().toLocaleLowerCase("en-US");
  return items.filter((event) => categories.includes(event.category) && (!term || searchableText(event).includes(term)));
}

/**
 * Form bounded groups from the complete track before clipping to the view. Their
 * anchors stay fixed while panning; only changes in date density regroup records.
 * Calendar-day bounds include every source record on the first and last day.
 */
export function groupEvents(items: readonly TimelineEvent[], range: Range, width: number, minGap = 100): EventGroup[] {
  if (!Number.isFinite(range.start) || !Number.isFinite(range.end)) return [];
  const start = Math.floor(Math.min(range.start, range.end) / DAY) * DAY;
  const end = Math.floor(Math.max(range.start, range.end) / DAY) * DAY;
  const slots = Math.max(1, Math.floor((Number.isFinite(width) ? Math.max(0, width) : 0) / Math.max(1, minGap)));
  const groupSpan = Math.max(DAY, Math.ceil((end - start + DAY) / slots / DAY) * DAY);
  const groups: EventGroup[] = [];
  const sorted = items.map((event, index) => ({ event, index, time: stamp(event.date) }))
    .filter(({ time }) => Number.isFinite(time))
    .sort((a, b) => a.time - b.time || a.index - b.index);
  for (const { event, time } of sorted) {
    const previous = groups.at(-1);
    if (previous && time - previous.start < groupSpan) { previous.items.push(event); previous.end = time; }
    else groups.push({ items: [event], start: time, end: time });
  }
  return groups.flatMap(group => {
    const visible = group.items.filter(event => stamp(event.date) >= start && stamp(event.date) <= end);
    return visible.length ? [{ items: visible, start: stamp(visible[0].date), end: stamp(visible.at(-1)!.date) }] : [];
  });
}

/** Caption and marker share a date anchor; only edge labels tuck inside the plot. */
export function layoutEventGroups(groups: readonly EventGroup[], range: Range, width: number) {
  const plotWidth = Math.max(3, width);
  const duration = Math.max(DAY, range.end - range.start);
  const position = (time: number) => Math.max(0, Math.min(plotWidth, (time - range.start) / duration * plotWidth));
  const anchors = groups.map(group => ({ group, x: position(group.start), end: position(group.end) }));
  const labels = anchors.map((item, index) => {
    const previous = anchors[index - 1];
    // Retain a readable label at the right boundary without crossing its neighbor.
    return Math.min(item.x, Math.max(previous ? (previous.x + item.x) / 2 : 0, plotWidth - 110));
  });
  return anchors.map(({ group, x, end }, index) => {
    const left = labels[index];
    const labelWidth = Math.max(0, Math.min(160, (labels[index + 1] ?? plotWidth + 6) - left - 6));
    const markerLeft = Math.min(x, plotWidth - 3);
    const markerWidth = Math.min(plotWidth - markerLeft, Math.max(3, end - x));
    return { group, left, width: Math.max(labelWidth, markerLeft - left + markerWidth),
      labelWidth, markerOffset: markerLeft - left, markerWidth };
  });
}

export function inspectorWidthBounds(workspaceWidth: number) {
  const available = Math.max(0, Number.isFinite(workspaceWidth) ? workspaceWidth : 348);
  const max = Math.min(960, available < 480 ? available : available - 48);
  return { min: Math.min(280, max), max };
}

export function resizeInspectorWidth(width: number, delta: number, workspaceWidth: number) {
  const bounds = inspectorWidthBounds(workspaceWidth);
  const next = Number.isFinite(width + delta) ? width + delta : 348;
  return Math.round(Math.max(bounds.min, Math.min(bounds.max, next)));
}

export function medicationEvidence(segment: MedicationSegment): { label: string; symbol: string; description: string } {
  if (segment.status === "prescribed") return {
    label: "Order / prescription", symbol: "Rx",
    description: "Recorded prescription or order interval. It does not establish dispensing or medication use; any fill information is stated separately in the source narrative.",
  };
  if (segment.status === "reported") return {
    label: "Patient-reported use", symbol: "R",
    description: "Patient-reported medication history. This is not an administration record or proof of uninterrupted use between dates.",
  };
  if (segment.status === "inpatient") return {
    label: "Administration documented", symbol: "A",
    description: "The synthetic inpatient record documents administrations within this period. The interval does not represent continuous administration; see the source narrative for available details.",
  };
  // These labels clarify the source's explicitly written instruction while retaining its raw status.
  const label = segment.label.toLowerCase();
  if (/\bheld\b|\bhold\b/.test(label)) return {
    label: "Hold instruction", symbol: "Ⅱ",
    description: "A recorded instruction to hold treatment. This is not an active dosing interval or proof of what was administered.",
  };
  if (/\bdiscontinued\b|\bstopped\b|\bno outpatient prescription\b/.test(label)) return {
    label: "Stop instruction", symbol: "×",
    description: "A documented stop or discharge instruction. This is not a plan for future medication exposure; any reported cessation remains separate evidence.",
  };
  if (/\bauthorization\b|\bcoverage\b/.test(label)) return {
    label: "Access workflow", symbol: "↔",
    description: "Medication access or coverage workflow. Its duration does not establish a medication gap or interruption.",
  };
  if (/\bsupply\b/.test(label)) return {
    label: "Supply plan", symbol: "◇",
    description: "A proposed supply arrangement. It does not establish that medication was dispensed or taken.",
  };
  return { label: "Recorded plan", symbol: "◇", description: "An intended treatment decision, not evidence that the plan was carried out." };
}

export type MedicationTimelineItem = {
  segment: MedicationSegment;
  index: number;
  start: number;
  end: number;
  plotEnd: number;
  kind: 'dose' | 'instruction' | 'stop';
};

/** Timeline presentation only; source evidence and inspector indices remain intact. */
export function medicationTimelineItems(medication: Medication): MedicationTimelineItem[] {
  const items = medication.segments.flatMap((segment, index): MedicationTimelineItem[] => {
    if (segment.status === 'reported') return [];
    const start = stamp(segment.start);
    const end = stamp(segment.end ?? segment.start);
    const kind = medicationEvidence(segment).label === 'Stop instruction' ? 'stop'
      : segment.status === 'planned' ? 'instruction' : 'dose';
    return [{ segment, index, start, end, plotEnd: end, kind }];
  });
  for (const stop of items.filter(item => item.kind === 'stop')) {
    // An interval through the previous calendar day can meet the stop cap at the
    // next day's boundary. Do not bridge an unrecorded gap or infer another dose.
    const dose = items.filter(item => item.kind === 'dose' && item.end <= stop.start && stop.start - item.end <= DAY)
      .sort((a, b) => b.end - a.end || b.start - a.start)[0];
    if (dose) dose.plotEnd = stop.start;
  }
  return items;
}

function normalizedWords(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

/** Related mentions are navigational matches, not asserted source links or causal associations. */
export function relatedMedicationEvents(medication: Medication): TimelineEvent[] {
  const names = [...new Set([medication.name, medication.generic].map(normalizedWords).filter(Boolean))];
  return events.filter((event) => {
    const explicit = ` ${normalizedWords(event.medication ?? "")} `;
    const narrative = ` ${normalizedWords([event.title, event.short, event.summary, ...event.details].join(" "))} `;
    return names.some((name) => explicit.includes(` ${name} `) || narrative.includes(` ${name} `));
  }).sort((a, b) => a.date.localeCompare(b.date));
}
