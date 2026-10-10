# EHR Timeline View

A clinical timeline for reconstructing a patient's history across visits, messages, telephone encounters, results, hospital care, and medication changes.

**[Open the live demo](https://alexkdot.github.io/ehr-timeline-view/)**

The demonstration follows **Maya Bennett**, a fictional 42-year-old patient, from **January 5 through June 26, 2026**. Its 94 records and 10 medication histories include MyChart-style conversations, front-desk scheduling, prescriptions and renewals, serial results, an admission, discharge, and follow-up. Every patient, clinician, organization, encounter, and clinical value is invented.

## Review the clinical course

The desktop timeline puts six record tracks and medication evidence on one **linear calendar axis**. A compact activity overview shows the full six-month record and the current date window. Drag the blue view window to move the displayed period. Drag its left or right handle to change that date boundary. The controls snap to calendar days. You can also select a month, click outside the window to recenter it, enter exact dates, choose 30 days, or return to **Overview**.

Dense periods become numbered groups. Opening a group reveals every included record and offers a closer date window. Search and category filters keep their results connected to the chronology; counts distinguish entries in the current window from matches elsewhere. Filtering preserves the current date window.

Select a record or group to open the **record inspector** sidebar. The right-pointing arrow on its left edge collapses it; the arrow at the right edge of the workspace reopens it. Collapsing preserves the selection and releases space for the timeline. It separates the summary, author and care setting, complete fictional source narrative, cautions, internal record ID, and date precision. Previous/next controls move through matching records. Hospital navigation and the seven-day context action help investigate care transitions without abandoning the timeline.

The **Record list** provides a chronological ledger with dates, categories, and summaries. This becomes the primary view on narrow screens, with the inspector opening as a drawer from the right. Medication histories remain available in both views.

**Presentation** simplifies the controls and enlarges record labels for a focused review. It is a local presentation view; it does not synchronize audience windows or provide a live pointer. **Print current view** opens the browser's print dialog with application controls removed.

## Controls and keyboard

| Action | Control |
| --- | --- |
| Search records and medication histories | Search field; `/` focuses it outside editable fields |
| Inspect a record or group | Select its timeline marker or ledger row |
| Move through time | Drag the blue overview window, select a month, enter dates, or use previous/next period |
| Resize the visible period | Drag either overview edge; **30d** and **Overview** remain available |
| Adjust the overview with the keyboard | Tab to its body or either handle; arrows adjust one day, Shift + arrows seven days, Home/End move to the limits |
| Pan with the keyboard | Focus the timeline region, then use Left/Right; Home restores the overview |
| Move between records | Inspector **Previous/Next**, or Left/Right while the event heading has focus |
| Collapse or reopen details | Arrow on the inspector’s left edge; Escape collapses and returns focus to the selected record |
| Exit presentation | **Exit presentation**, or Escape when no inspector is open |
| Print | **Print current view** |

Shift + mouse-wheel also pans the timeline. Search, selected categories, and the displayed dates remain visible so a filtered or partial view is identifiable.

## Read medication evidence carefully

Medication tracks distinguish **orders/prescriptions**, **patient-reported use**, **documented inpatient administration**, and **plans or instructions** through labels, symbols, and line patterns. Hold, stop, access, and supply instructions retain their specific meaning in the inspector. Fill information appears only where stated in the fictional narrative; it is not inferred from an order.

A bar represents a recorded interval, not verified continuous use. A point represents single-date evidence. An interval reaching the record boundary does not establish discontinuation. Temporal proximity does not establish causation, and a blank interval does not establish absence of care.

All original synthetic narratives, dates, categories, cautions, and medication segments are retained by the interface redesign. Records have calendar-day precision. Separate occurrence, authored, and signed timestamps are not supplied, and no external chart document is attached. Related medication mentions are navigation aids, not validated source links.

## Run, test, and build

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm test
```

The 22 automated tests cover synthetic-data integrity, preservation of the dataset, date handling, range movement and edge-resizing bounds, complete clustering, search, medication evidence, and generated-output boundaries. The build adds TypeScript checking. Browser interaction, visual review, accessibility review, printing, and offline operation require separate checks; a successful build is not a claim of full WCAG conformance or clinical validation.

The Vite build inlines the application, styles, and bundled IBM Plex fonts into two matching output targets:

- `docs/index.html` — GitHub Pages output.
- `standalone-dist/EHR_Timeline_View.html` — self-contained offline output.

GitHub Pages serves the **main** branch's **/docs** folder. Rebuild and commit both outputs after source changes. Check the offline file directly before distributing it. Font notices are preserved in the embedded stylesheet and in [the font license](licenses/IBM-Plex-OFL.txt).

## Architecture and design

This remains a static React/TypeScript application built with Vite. There is no backend, authentication, database, upload, analytics, remote storage, or clinical integration. Search and filtering run locally in the browser. The public HTML includes the full synthetic dataset and is intended only for fictional records.

| File | Responsibility |
| --- | --- |
| `app/clinical-data.ts` | Synthetic patient profile, encounters, and medication evidence |
| `app/timeline-model.ts` | Calendar ranges, search, grouping, and evidence interpretation |
| `app/page.tsx` | Timeline, ledger, controls, and collapsible record inspector |
| `app/activity-overview.tsx` | Pointer and keyboard controls for moving and resizing the visible period |
| `app/globals.css` / `app/fonts.css` | Responsive visual system and embedded fonts |
| `scripts/inline-build.mjs` | Pages and offline output generation |
| `tests/` | Data and timeline-model regression checks |
| [DESIGN.md](DESIGN.md) | Design alternatives, clinical conventions, tokens, and resource decisions |

The message format is inspired by familiar patient-portal workflows. There is no live connection to MyChart, Epic, an EHR, or a pharmacy, and the project is not affiliated with Epic.
