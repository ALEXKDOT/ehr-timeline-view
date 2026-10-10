import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { events, medications, patient, categoryMeta, type Category, type TimelineEvent } from "../app/clinical-data.ts";
import { DAY, stamp, isoDate, formatDate, fullRange, clampRange, zoomRange, panRange, adjustOverviewRange,
  filterEvents, groupEvents, medicationEvidence, relatedMedicationEvents } from "../app/timeline-model.ts";

const categories = Object.keys(categoryMeta) as Category[];

test("label edits preserve clinical records, chronology and medication evidence", () => {
  const { summary, subtitle, ...profile } = patient;
  const clinical = {
    patient: profile,
    events: events.map(({ title, short, summary, ...record }) => record),
    medications: medications.map(({ summary, ...medication }) => medication),
  };
  assert.equal(createHash("sha256").update(JSON.stringify(clinical)).digest("hex"), "ee06f57c2f6cc301e6b2f870b623f11705d00c8551c8ee0a8397a4ecb98c9d29");
});

test("calendar-day helpers do not invent timestamps or roll invalid dates into another day", () => {
  assert.equal(isoDate(stamp("2026-03-12")), "2026-03-12");
  assert.equal(stamp("2026-03-12T23:59:00-08:00"), stamp("2026-03-12"));
  assert.equal(stamp("2026-03-13") - stamp("2026-03-12"), DAY);
  assert.equal(stamp("2026-03-09") - stamp("2026-03-08"), DAY, "daylight saving must not alter spacing");
  assert.ok(Number.isNaN(stamp("2026-02-30")));
  assert.equal(formatDate("2026-03-12"), "Mar 12, 2026");
  assert.equal(formatDate("2026-03-12", { month: "long" }), "March");
});

test("range clipping and panning preserve visible duration at the record boundaries", () => {
  const span = 20 * DAY;
  assert.deepEqual(clampRange({ start: fullRange.start - 5 * DAY, end: fullRange.start + 15 * DAY }),
    { start: fullRange.start, end: fullRange.start + span });
  assert.deepEqual(clampRange({ start: fullRange.end - 15 * DAY, end: fullRange.end + 5 * DAY }),
    { start: fullRange.end - span, end: fullRange.end });
  assert.deepEqual(clampRange({ start: fullRange.start - DAY, end: fullRange.end + DAY }), fullRange);
  const range = { start: stamp("2026-03-01"), end: stamp("2026-03-21") };
  const before = { ...range };
  assert.deepEqual(panRange(range, 500 * DAY), { start: fullRange.end - span, end: fullRange.end });
  assert.deepEqual(panRange(range, -500 * DAY), { start: fullRange.start, end: fullRange.start + span });
  assert.deepEqual(panRange(range, DAY), { start: range.start + DAY, end: range.end + DAY });
  assert.deepEqual(range, before, "navigation helpers do not mutate state supplied by the caller");
});

test("zoom preserves the central date when possible and stays within record boundaries", () => {
  const range = { start: stamp("2026-03-01"), end: stamp("2026-03-21") };
  const smaller = zoomRange(range, 0.5);
  assert.equal(smaller.end - smaller.start, 10 * DAY);
  assert.equal((smaller.start + smaller.end) / 2, (range.start + range.end) / 2);
  assert.deepEqual(zoomRange(smaller, 2), range);
  assert.deepEqual(zoomRange(range, 100), fullRange);
  const narrow = zoomRange(range, 0.001);
  assert.equal(narrow.end - narrow.start, DAY);
  const edge = zoomRange({ start: fullRange.start, end: fullRange.start + 10 * DAY }, 2);
  assert.deepEqual(edge, { start: fullRange.start, end: fullRange.start + 20 * DAY });
});

test("dragging the overview preserves the interval, snaps to days and clamps at either boundary", () => {
  const range = { start: stamp("2026-03-01"), end: stamp("2026-03-21") };
  assert.deepEqual(adjustOverviewRange(range, "move", 2.4 * DAY), { start: stamp("2026-03-03"), end: stamp("2026-03-23") });
  assert.deepEqual(adjustOverviewRange(range, "move", -2.4 * DAY), { start: stamp("2026-02-27"), end: stamp("2026-03-19") });
  assert.deepEqual(adjustOverviewRange(range, "move", 999 * DAY), { start: fullRange.end - 20 * DAY, end: fullRange.end });
  assert.deepEqual(adjustOverviewRange(range, "move", -999 * DAY), { start: fullRange.start, end: fullRange.start + 20 * DAY });
  assert.deepEqual(adjustOverviewRange(fullRange, "move", 7 * DAY), fullRange);
  assert.deepEqual(range, { start: stamp("2026-03-01"), end: stamp("2026-03-21") });
});

test("overview edge resizing holds the other edge fixed and cannot cross it", () => {
  const range = { start: stamp("2026-03-01"), end: stamp("2026-03-21") };
  assert.deepEqual(adjustOverviewRange(range, "start", 4 * DAY), { start: stamp("2026-03-05"), end: range.end });
  assert.deepEqual(adjustOverviewRange(range, "end", -4 * DAY), { start: range.start, end: stamp("2026-03-17") });
  assert.deepEqual(adjustOverviewRange(range, "start", -999 * DAY), { start: fullRange.start, end: range.end });
  assert.deepEqual(adjustOverviewRange(range, "end", 999 * DAY), { start: range.start, end: fullRange.end });
  assert.deepEqual(adjustOverviewRange(range, "start", 999 * DAY), { start: range.end, end: range.end });
  assert.deepEqual(adjustOverviewRange(range, "end", -999 * DAY), { start: range.start, end: range.start });
});

test("a single-day overview selection can move and expand without losing its calendar date", () => {
  const day = { start: stamp("2026-03-14"), end: stamp("2026-03-14") };
  assert.deepEqual(adjustOverviewRange(day, "move", DAY), { start: stamp("2026-03-15"), end: stamp("2026-03-15") });
  assert.deepEqual(adjustOverviewRange(day, "start", -DAY), { start: stamp("2026-03-13"), end: day.end });
  assert.deepEqual(adjustOverviewRange(day, "end", DAY), { start: day.start, end: stamp("2026-03-15") });
  assert.deepEqual(adjustOverviewRange(day, "move", NaN), day);
});

test("clusters retain all 94 records exactly once, chronologically, at every supported density", () => {
  for (const width of [0, 320, 800, 1280, 1920, 6000]) {
    const groups = groupEvents(events, fullRange, width);
    const flattened = groups.flatMap((group) => group.items);
    assert.equal(flattened.length, 94);
    assert.equal(new Set(flattened.map((event) => event.id)).size, 94);
    assert.deepEqual(flattened.map((event) => event.id), [...events].sort((a, b) => a.date.localeCompare(b.date)).map((event) => event.id));
    for (const group of groups) {
      assert.equal(group.start, stamp(group.items[0].date));
      assert.equal(group.end, stamp(group.items.at(-1)!.date));
      assert.ok(group.items.every((event) => events.includes(event)), "source identity is retained");
    }
  }
});

test("dense March clusters preserve every same-day record and inclusive date boundaries", () => {
  const range = { start: stamp("2026-03-12"), end: stamp("2026-03-14") };
  const groups = groupEvents(events, range, 900);
  const expected = events.filter((event) => event.date >= "2026-03-12" && event.date <= "2026-03-14");
  assert.deepEqual(groups.flatMap((group) => group.items), expected);
  assert.ok(groups.some((group) => group.items.length > 1), "same-day clinical records remain explicitly grouped");
  const noonRange = { start: range.start + DAY / 2, end: range.end + DAY / 2 };
  assert.deepEqual(groupEvents(events, noonRange, 900).flatMap((group) => group.items), expected);
  assert.ok(groups.flatMap((group) => group.items).some((event) => event.id === "mar14-reconciliation"));
});

test("clustering uses bounded calendar buckets rather than chaining neighboring records", () => {
  const items: TimelineEvent[] = [0, 2, 4, 6, 8, 10].map((offset) => ({
    ...events[0], id: `synthetic-layout-fixture-${offset}`, date: isoDate(stamp("2026-01-05") + offset * DAY),
  }));
  const range = { start: stamp("2026-01-05"), end: stamp("2026-01-15") };
  const groups = groupEvents(items, range, 300, 100);
  assert.equal(groups.length, 3);
  assert.ok(groups.every((group) => group.end - group.start <= 4 * DAY));
  assert.deepEqual(groupEvents(items, range, 300, 100), groups, "clustering is deterministic");
});

test("search covers source details and metadata while respecting explicit category filters", () => {
  assert.equal(filterEvents(events, "", categories).length, 94);
  assert.equal(filterEvents(events, "MyChart", ["message"]).length, 22);
  assert.ok(filterEvents(events, "268 mg/dL", categories).length > 0, "numeric source details are searchable");
  assert.ok(filterEvents(events, "Nia Brooks", ["telephone"]).length > 0);
  assert.equal(filterEvents(events, "metformin", []).length, 0);
  assert.equal(filterEvents(events, "unmatched-phrase-1234", categories).length, 0);
});

test("medication evidence keeps prescriptions, patient reports, administration and instructions distinct", () => {
  const segment = (name: string, label: string) => medications.find((medication) => medication.name === name)!.segments.find((entry) => entry.label === label)!;
  assert.equal(medicationEvidence(segment("Metformin ER", "500 mg nightly")).label, "Order / prescription");
  assert.equal(medicationEvidence(segment("Metformin ER", "Current use confirmed")).label, "Patient-reported use");
  assert.equal(medicationEvidence(segment("Prednisone", "40 mg daily · administered")).label, "Administration documented");
  assert.equal(medicationEvidence(segment("Metformin ER", "Held during admission")).label, "Hold instruction");
  assert.equal(medicationEvidence(segment("Budesonide inhaler", "Discontinued at discharge")).label, "Stop instruction");
  assert.equal(medicationEvidence(segment("Insulin lispro", "No outpatient prescription")).label, "Stop instruction");
  assert.equal(medicationEvidence(segment("Budesonide–formoterol", "Authorization pending → approved")).label, "Access workflow");
  assert.equal(medicationEvidence(segment("Losartan", "90-day supply planned")).label, "Supply plan");
  for (const medication of medications) for (const entry of medication.segments) {
    assert.doesNotMatch(medicationEvidence(entry).label, /filled|dispensed/i, "a fill must not be fabricated from a source status");
  }
});

test("retrospective medication reports retain their report date and narrative", () => {
  const medication = medications.find((entry) => entry.name === "Atorvastatin")!;
  const report = medication.segments.find((entry) => entry.label === "Started Jan 31 · reported")!;
  assert.equal(report.start, "2026-02-18");
  assert.match(report.note, /beginning atorvastatin January 31/);
  assert.equal(medicationEvidence(report).label, "Patient-reported use");
  assert.equal(report.start, "2026-02-18", "deriving evidence must not move the report to the retrospective start");
});

test("related medication records are conservative mention matches, with original evidence intact", () => {
  const metformin = medications.find((entry) => entry.name === "Metformin ER")!;
  const related = relatedMedicationEvents(metformin);
  assert.ok(related.some((event) => event.id === "jan09-metformin-rx"));
  assert.ok(related.every((event) => events.includes(event)));
  assert.ok(related.every((event, index) => index === 0 || related[index - 1].date <= event.date));
  const absent = { ...metformin, name: "Synthetic nonexistent medicine", generic: "unrecorded generic fixture" };
  assert.equal(relatedMedicationEvents(absent).length, 0);
});
