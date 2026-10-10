import assert from 'node:assert/strict';
import test from 'node:test';
import { events } from '../app/clinical-data.ts';
import { eventCaptions, eventCaption } from '../app/event-captions.ts';

test('every record has a concise caption without altering its full title or clinical details', () => {
  assert.deepEqual(Object.keys(eventCaptions).sort(), events.map(event => event.id).sort());
  for (const event of events) {
    assert.ok(eventCaption(event).length <= 32, `${event.id}: caption stays compact`);
    assert.doesNotMatch(eventCaption(event), /before the weekend|MyChart:|Telephone:|Prescription:/);
  }
  const refill = events.find(event => event.id === 'apr15-refill-message')!;
  assert.equal(eventCaption(refill), 'Metformin refill');
  assert.equal(refill.title, 'MyChart: metformin refill before the weekend');
});
