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
 * Fixed buckets are anchored to the displayed range, never chained from neighboring events.
 * Range bounds include their calendar days; partial-day zoom boundaries therefore cannot
 * silently remove a day-precision source record. No records or source objects are modified.
 */
export function groupEvents(items: readonly TimelineEvent[], range: Range, width: number, minGap = 100): EventGroup[] {
  if (!Number.isFinite(range.start) || !Number.isFinite(range.end)) return [];
  const start = Math.floor(Math.min(range.start, range.end) / DAY) * DAY;
  const end = Math.floor(Math.max(range.start, range.end) / DAY) * DAY;
  const span = end - start + DAY;
  const bucketCount = Math.max(1, Math.floor((Number.isFinite(width) ? Math.max(0, width) : 0) / Math.max(1, minGap)));
  const buckets = new Map<number, EventGroup>();
  const sorted = items.map((event, index) => ({ event, index, time: stamp(event.date) }))
    .filter(({ time }) => Number.isFinite(time) && time >= start && time <= end)
    .sort((a, b) => a.time - b.time || a.index - b.index);
  for (const { event, time } of sorted) {
    const key = Math.min(bucketCount - 1, Math.floor(((time - start) / span) * bucketCount));
    const group = buckets.get(key);
    if (group) { group.items.push(event); group.end = time; }
    else buckets.set(key, { items: [event], start: time, end: time });
  }
  return [...buckets.values()];
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
