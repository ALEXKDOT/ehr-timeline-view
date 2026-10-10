import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { events, medications, categoryMeta, patient } from '../app/clinical-data.ts';

const nonClinical = /\b(?:testimon(?:y|ies)|testified|courtroom|mistrial|verdict|prosecutor|defendant|attorney|forensic|offense|civil complaint|civil pleading|criminal responsibility|trial day|exhibit \d+)\b|SRC-\d+/i;

test('clinical dataset contains no case narrative or source references', () => {
  assert.equal(nonClinical.test(JSON.stringify({ events, medications, patient })), false);
  for (const event of events) assert.ok(Object.hasOwn(categoryMeta, event.category), event.id);
});

test('clinical events have unique identities, meaningful summaries, and valid dates', () => {
  assert.ok(events.length > 50, 'retain the detailed care history');
  assert.equal(new Set(events.map((event) => event.id)).size, events.length);
  for (const event of events) {
    assert.match(event.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(event.date)), event.id);
    assert.ok(event.title && event.summary && event.recordType && event.details.length, event.id);
  }
});

test('patient messages, counseling and later inpatient care remain available', () => {
  const ids = new Set(events.map((event) => event.id));
  for (const id of ['ketamine', 'msg-nov26', 'msg-nov29', 'msg-dec8', 'msg-dec19', 'dec2-dukes', 'dec5-aspire', 'dec12-dukes', 'dec19-dukes', 'dec27-dukes', 'call-dec30', 'jan26', 'delirium', 'feb']) {
    assert.ok(ids.has(id), `Missing clinical event: ${id}`);
  }
  assert.ok(events.filter((event) => event.category === 'message').length >= 15);
});

test('medication chronology retains uncertainty and valid intervals', () => {
  assert.equal(medications.length, 13);
  const statuses = new Set<string>();
  for (const medication of medications) {
    assert.ok(medication.generic && medication.summary && medication.segments.length);
    for (const segment of medication.segments) {
      assert.ok(['prescribed', 'reported', 'planned', 'inpatient'].includes(segment.status));
      statuses.add(segment.status);
      assert.ok(Number.isFinite(Date.parse(segment.start)));
      if (segment.end) assert.ok(Date.parse(segment.end) >= Date.parse(segment.start));
      assert.ok(segment.note.length > 15);
    }
  }
  assert.equal(statuses.size, 4);
});

test('built site is self-contained and independent', { skip: !fs.existsSync('docs/index.html') }, () => {
  const html = fs.readFileSync('docs/index.html', 'utf8');
  assert.equal(nonClinical.test(html), false);
  assert.doesNotMatch(html, /firebaseio\.com|clancy-timeline-default|presentations\/main|clancytimeline\//i);
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+rel="stylesheet"[^>]+href=/i);
  assert.match(html, /CareConnect/);
  assert.equal(html, fs.readFileSync('standalone-dist/Clancy_Clinical_Timeline.html', 'utf8'));
});
