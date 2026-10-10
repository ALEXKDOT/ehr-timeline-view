# EHR Timeline View — Design System

## Purpose and direction

Help clinicians reconstruct a longitudinal history without repeatedly switching between chart sections. The chronology is the primary workspace; patient context, search, evidence, and source reading support it. Preserve the complete synthetic dataset and its uncertainty rather than adding interpretation through visual styling.

Three directions were evaluated:

| Direction | Benefit | Tradeoff |
| --- | --- | --- |
| **Coordinated clinical tracks — selected** | Encounters, communications, results, hospital care, and medication evidence share a date axis | Dense periods need explicit grouping and a narrow-screen alternative |
| Chronological ledger | Efficient reading and source navigation; strong on smaller screens | Treatment intervals and cross-category relationships are less visible |
| Episode review board | Highlights major periods for rapid orientation | Editorial grouping can imply conclusions and fragment the chronology |

Use coordinated tracks on desktop and retain the ledger as an alternate view and the mobile layout. Identity comes from this clinical structure, not decorative dashboard components.

## Clinical workflow references

The design review inspected two supplied Epic interface screenshots: a note/encounter workspace and a patient-summary demonstration. They informed workflow choices only; their patient content was not imported.

| Preserve | Modify | Reject |
| --- | --- | --- |
| Compact patient identity and context | Put essential context in a slim top strip, with the care team in a disclosure | Saturated application chrome |
| Recognizable encounter terminology and aligned rows | Coordinate separated record types on a shared axis | Multiple competing navigation bars |
| Explicit documentation and status labels | Show evidence distinctions only where the dataset supports them | Disconnected boxed summaries |
| Selected record beside its documentation | Keep a nonmodal inspector adjacent to the chronology | Unexplained icon-heavy controls |

## Typography and surfaces

**IBM Plex Sans** carries clinical prose, names, labels, and controls. Its embedded variable font supports the 400–600 weights used for hierarchy. **IBM Plex Mono** is reserved for dates, identifiers, and selected numeric information; tabular numerals support alignment. Fonts are embedded as WOFF2 data URIs, with SIL OFL notices retained for offline distribution. See [IBM's typeface project](https://github.com/IBM/plex) and [local license](licenses/IBM-Plex-OFL.txt).

Use a compact type scale, clear weight changes, and readable line spacing rather than oversized headings. Standard panels have fine borders, small radii, and little or no shadow. Spacing groups related controls closely and separates clinical sections with ruled rows.

| Token / role | Color |
| --- | --- |
| Primary ink | `#26363f` |
| Secondary text | `#5c6b72` |
| Canvas / paper | `#f2f3f0` / `#ffffff` |
| Dividers | `#d4dbdc` |
| Selection / selection surface | `#355d86` / `#eaf1f9` |
| Hospital / visits | `#87573b` / `#306d67` |
| MyChart / telephone | `#456b96` / `#856824` |
| Results / medication events | `#486e79` / `#786194` |

Category codes, labels, and evidence patterns supplement color. These colors identify information types; they do not rank clinical outcomes as good or bad.

## Timeline and evidence conventions

- All tracks use a linear calendar scale. The activity overview marks the displayed window within the complete record.
- Bounded calendar groups show their record count and reveal every member. Grouping changes presentation, not source dates or record membership.
- Search and category changes retain the date window. Visible counts distinguish records in view, matching records, and total records.
- The inspector separates the clinical summary from the complete fictional source narrative. Provenance exposes the internal record ID and calendar-day precision; missing occurrence/authored/signed timestamps remain explicitly unavailable.
- Medication evidence uses solid order bands, dashed patient-report bands, patterned administration bands, and dotted plan/instruction bands. Single-date evidence remains a point. A marked record boundary is not a stop date.
- Fills remain narrative evidence where supplied. Orders, instructions, reports, and administration are not interchangeable. Related mentions support navigation only; no graphic establishes adherence or causation.

## Interaction and responsive behavior

On larger screens the timeline and inspector remain side by side. Below the side-panel breakpoint the inspector moves beneath the chronology; at phone widths the ledger becomes the primary record view. Core records, search, filters, medication history, and source reading remain available.

Native buttons, disclosures, inputs, a date range form, and a range slider provide familiar controls. Selected and excluded states are explicit. The timeline supports keyboard panning and overview restoration; the inspector supports previous/next records, Escape, heading focus, and focus return. Empty states distinguish a period with no matches from a query with no matches anywhere.

Presentation mode reduces control clutter and increases record-label emphasis. It is a local view of the same data. Printing removes navigation controls and retains the current record context.

Motion is limited to brief state feedback. Reduced-motion styling removes animation and smooth movement while retaining visible selection, focus, and state changes. Accurate date positioning takes precedence over animated transitions.

## Accessibility and verification

Require meaningful control names, visible keyboard focus, semantic regions, redundant category/evidence cues, and usable disclosure and empty states. Review contrast, text scaling, clipped content, keyboard order, focus recovery, and touch operation in the rendered application. A resized screenshot proves layout, not touch behavior. Keep viewport and physical-device evidence distinct.

The project has 19 automated data/model/build-boundary tests. Visual, browser, print, offline, and assistive-technology checks are separate work; this document does not assert complete WCAG conformance, clinical validation, or production readiness.

## Free resources actually used

| Resource | Use and boundary |
| --- | --- |
| [Impeccable](https://github.com/pbakaus/impeccable) | Primary written guidance: Operate mode, audit, critique, adaptation, and design craft. Reference text was reviewed locally; its CLI, detector, browser overlay, and hooks were not installed or run. Clinical density and this brief take precedence over generic aesthetic rules. |
| [shadcn/ui skill and documentation](https://ui.shadcn.com/docs/skills) | Reference for semantic tokens, titled details, and consistent controls. No shadcn/Tailwind installation or component migration. |
| [Refero Styles](https://styles.refero.design/) | Public style descriptions informed restrained dividers and technical hierarchy. No paid account, copied branding, or wholesale external design system. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Official repository and license reviewed; its website returned an access error. No component or runtime dependency adopted. |
| [Fontsource](https://fontsource.org/fonts/ibm-plex-sans) | IBM Plex Sans variable and Mono regular WOFF2 files from versioned 5.3.0 packages, embedded without installing or executing those packages. |
| [21st](https://21st.dev/) | Public catalog inspected; no component copied and no paid tools used. |

Taste Skill was not used for this clinical interface. The application remains React/TypeScript/Vite with local CSS and no backend or new UI-library dependencies.
