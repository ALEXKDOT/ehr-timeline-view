import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { events, medications, categoryMeta, patient, demoHighlights } from '../app/clinical-data.ts';

const retiredIdentity = new RegExp(['lind' + 'say', 'clan' + 'cy'].join('|'), 'i');
const caseNarrative = /\b(?:testimony|testified|courtroom|mistrial|verdict|prosecutor|defendant|criminal responsibility|trial day|exhibit \d+)\b|SRC-\d+/i;
const allContent = JSON.stringify({ patient, events, medications, demoHighlights });
const eventContent = (category: string) => events
  .filter((event) => event.category === category)
  .map((event) => [event.title, event.recordType, event.summary, ...event.details].join(' '))
  .join('\n');

function validDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value;
}

function projectFiles(entry: string): string[] {
  if (!fs.existsSync(entry)) return [];
  if (fs.statSync(entry).isFile()) return [entry];
  return fs.readdirSync(entry).flatMap((name) => projectFiles(path.join(entry, name)));
}

test('the record is clearly synthetic and the patient profile is complete', () => {
  assert.equal(patient.name, 'Maya Bennett');
  assert.equal(patient.initials, 'MB');
  assert.equal(patient.age, 42);
  assert.match(patient.recordId, /^DEMO-/);
  assert.match(patient.provenance, /fictional|synthetic/i);
  assert.ok(patient.summary.length > 40);
  assert.ok(patient.conditions.length >= 3);
  assert.ok(patient.allergies.length >= 1);
  assert.ok(patient.careTeam.length >= 4);
  for (const member of patient.careTeam) assert.ok(member.name && member.role);
  assert.doesNotMatch(allContent, retiredIdentity);
  assert.doesNotMatch(allContent, caseNarrative);
});

test('encounters form a detailed, valid chronology with distinct identities', () => {
  assert.ok(events.length >= 70, 'retain a substantial longitudinal demonstration');
  assert.ok(validDate(patient.startDate));
  assert.ok(validDate(patient.endDate));
  assert.ok(patient.startDate < patient.endDate);
  assert.equal(new Set(events.map((event) => event.id)).size, events.length);
  for (const event of events) {
    assert.ok(event.id, 'each event needs an identity for navigation');
    assert.ok(validDate(event.date), `${event.id}: valid calendar date`);
    assert.ok(event.date >= patient.startDate && event.date <= patient.endDate, `${event.id}: within patient timeline`);
    assert.ok(Object.hasOwn(categoryMeta, event.category), `${event.id}: known category`);
    assert.ok(event.title && event.short && event.displayDate && event.recordType, `${event.id}: complete labels`);
    assert.ok(event.summary.length >= 30, `${event.id}: meaningful summary`);
    assert.ok(event.details.length >= 2 && event.details.every((detail) => detail.trim().length > 10), `${event.id}: substantive details`);
  }
  assert.deepEqual(new Set(events.map((event) => event.category)), new Set(['visit', 'message', 'telephone', 'lab', 'hospital', 'medication']));
});

test('the demo covers message threads and administrative telephone workflows', () => {
  const messages = events.filter((event) => event.category === 'message');
  const calls = events.filter((event) => event.category === 'telephone');
  assert.ok(messages.length >= 10, 'include sustained patient communication');
  assert.ok(calls.length >= 6, 'include scheduling and follow-up telephone encounters');
  assert.match(eventContent('message'), /MyChart/i);
  assert.ok(messages.filter((event) => event.details.length >= 3).length >= 6, 'several message exchanges have multiple contributions');
  assert.match(eventContent('telephone'), /front desk|scheduling|scheduler/i);
  assert.match(eventContent('telephone'), /reschedul|appointment|waitlist|cancell/i);
  assert.match(eventContent('telephone'), /confirm|scheduled|booked|reserved/i);
});

test('results, prescriptions and hospital transitions carry clinical context', () => {
  const labs = events.filter((event) => event.category === 'lab');
  const hospital = events.filter((event) => event.category === 'hospital');
  const prescriptions = events.filter((event) => event.category === 'medication');
  assert.ok(labs.length >= 6, 'include serial results');
  assert.ok(labs.every((event) => /\d/.test([event.summary, ...event.details].join(' '))), 'results contain numeric values');
  assert.match(eventContent('lab'), /A1c|HbA1c|hemoglobin A1c/i);
  assert.ok(hospital.length >= 3, 'show the hospital course and transition');
  assert.match(eventContent('hospital'), /admi(?:t|ssion)/i);
  assert.match(eventContent('hospital'), /discharg/i);
  assert.match(allContent, /reconcil/i);
  assert.ok(prescriptions.length >= 8, 'include prescription and renewal events');
  assert.match(eventContent('medication'), /refill|renewal|renewed/i);
});

test('medication lanes distinguish treatment evidence and use valid intervals', () => {
  assert.ok(medications.length >= 9, 'include a diverse medication history');
  assert.equal(new Set(medications.map((medication) => medication.name)).size, medications.length);
  const statuses = new Set<string>();
  for (const medication of medications) {
    assert.ok(medication.name && medication.generic && medication.className && medication.summary.length > 30);
    assert.ok(medication.segments.length > 0, medication.name);
    for (const segment of medication.segments) {
      assert.ok(['prescribed', 'reported', 'planned', 'inpatient'].includes(segment.status), medication.name);
      statuses.add(segment.status);
      assert.ok(validDate(segment.start), medication.name);
      assert.ok(segment.start >= patient.startDate && segment.start <= patient.endDate, medication.name);
      if (segment.end) {
        assert.ok(validDate(segment.end), medication.name);
        assert.ok(segment.end >= segment.start && segment.end <= patient.endDate, medication.name);
      }
      assert.ok(segment.label && segment.note.length > 20, `${medication.name}: interval explains the evidence`);
    }
  }
  assert.deepEqual(statuses, new Set(['prescribed', 'reported', 'planned', 'inpatient']));
});

test('every featured search finds content in the fictional record', () => {
  assert.ok(demoHighlights.length >= 3);
  for (const highlight of demoHighlights) {
    assert.ok(highlight.label && highlight.query);
    const matchingEvents = events.filter((event) => [
      event.title, event.short, event.summary, ...event.details, event.clinician,
      event.institution, event.medication, event.recordType, event.displayDate,
    ].filter(Boolean).join(' ').toLowerCase().includes(highlight.query.toLowerCase()));
    assert.ok(matchingEvents.length >= 2, `${highlight.label}: featured story has multiple matching encounters`);
  }
});

test('published source, documentation and artifacts contain no retired identity', () => {
  const entries = ['app', 'standalone', 'scripts', 'tests', 'docs', 'standalone-dist', 'standalone-build', '.github', 'README.md', 'package.json', 'package-lock.json'];
  for (const filename of entries.flatMap(projectFiles)) {
    assert.doesNotMatch(filename, retiredIdentity, filename);
    if (/\.(?:tsx?|m?js|css|html|md|json|ya?ml)$/.test(filename)) {
      assert.doesNotMatch(fs.readFileSync(filename, 'utf8'), retiredIdentity, filename);
    }
  }
});

test('Pages and offline builds match and contain the complete synthetic app', { skip: !fs.existsSync('docs/index.html') }, () => {
  const html = fs.readFileSync('docs/index.html', 'utf8');
  assert.match(html, /<title>EHR Timeline View<\/title>/);
  assert.match(html, /Maya Bennett/);
  assert.match(html, /synthetic|fictional/i);
  assert.match(html, /MyChart/);
  assert.doesNotMatch(html, retiredIdentity);
  assert.doesNotMatch(html, caseNarrative);
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+rel="stylesheet"[^>]+href=/i);
  assert.equal(html, fs.readFileSync('standalone-dist/EHR_Timeline_View.html', 'utf8'));
});
