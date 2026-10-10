# EHR Timeline View

An interactive, fully fictional patient timeline that brings visits, MyChart-style conversations, telephone encounters, prescriptions, results, and care transitions into one longitudinal view.

**[Explore the live demo](https://alexkdot.github.io/ehr-timeline-view/)**

Meet **Maya Bennett**, a fictional 42-year-old patient whose care unfolds from January through June 2026. Follow primary care and specialty visits, message exchanges, scheduling calls, medication changes, a hospital stay, and the follow-up that connects them. Every patient, clinician, organization, encounter, and clinical value in this demonstration is invented. This is synthetic demonstration content, not a medical record or guidance for patient care.

## Explore the story

- Search across the record for a symptom, result, medicine, or care-team member.
- Filter visits, MyChart messages, telephone encounters, lab results, hospital care, and prescriptions.
- Open an entry to read its context, care-team actions, and follow-up.
- Follow medications across prescribed, patient-reported, planned, and inpatient intervals. An order or reported interval does not establish daily administration.
- Trace the complete care journey: appointment coordination, results and questions, treatment changes, discharge, reconciliation, and follow-up.

The interface is a demonstration of a longitudinal record viewer. It has no live connection to MyChart, Epic, an EHR, a pharmacy, or a patient portal. MyChart is used only to describe the familiar patient-message format; the project is not affiliated with or endorsed by Epic.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

## Validate and publish

```sh
npm run build
npm test
```

The build checks TypeScript, bundles the React application with Vite, and inlines its JavaScript and CSS into two identical, self-contained files:

- `docs/index.html` — the published GitHub Pages site.
- `standalone-dist/EHR_Timeline_View.html` — an offline copy that opens directly in a modern browser.

GitHub Pages serves the **main** branch's **/docs** folder. Rebuild and commit both generated files after changing the application or demonstration data. Relative asset paths and inline assets keep the site independent of the repository URL and let the offline copy work without a server.

## Project structure

| File | Purpose |
| --- | --- |
| `app/clinical-data.ts` | Synthetic patient profile, encounter history, categories, and medication intervals |
| `app/page.tsx` | Interactive timeline, search, filters, and detail views |
| `app/globals.css` | Responsive interface styles |
| `standalone/main.tsx` | React entry point |
| `standalone/vite.config.ts` | Static application build configuration |
| `scripts/inline-build.mjs` | Self-contained Pages and offline output generation |
| `tests/clinical-data.test.ts` | Data integrity, demo coverage, privacy, and generated-output checks |

The application remains a static React/TypeScript application. There is no backend, authentication, database, upload, analytics, remote storage, or clinical integration. Search and filtering run locally in the browser; the entire synthetic dataset is included in the published HTML.

## Synthetic data boundary

The record is intentionally detailed enough to demonstrate clinical context and administrative workflow while remaining entirely fictional. Calendar dates position events in the timeline. Medication orders, intended treatment, inpatient treatment, and patient reports remain distinct. Encounter details explain transitions and uncertainty rather than inferring medication adherence.

Keep this public demo synthetic. A future implementation using real records would require an authorized import pipeline, appropriate access controls, and a separate deployment suited to that data. This static public build is designed only for fictional records.
