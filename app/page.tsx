"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { categoryMeta, events, medications, patient, type Category, type Medication, type TimelineEvent } from "./clinical-data";

const categories = Object.keys(categoryMeta) as Category[];
const chronologicalEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
const DAY = 86_400_000;
const CARD_WIDTH = 260;
const CARD_HEIGHT = 132;
const CARD_ROW_STEP = 152;
const BASE_WIDTH = 6200;
const startTime = stamp(patient.startDate);
const endTime = stamp(patient.endDate);
const gapStart = stamp("2022-06-02");
const gapEnd = stamp("2022-08-23");

function stamp(value: string) { return Date.parse(`${value.slice(0, 10)}T12:00:00Z`); }
function formatDate(value: string | number, options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date(typeof value === "number" ? value : stamp(value)));
}
function timeFraction(time: number) {
  if (time <= gapStart) return .025 * (time - startTime) / (gapStart - startTime);
  if (time < gapEnd) return .025 + .055 * (time - gapStart) / (gapEnd - gapStart);
  return .08 + .92 * (time - gapEnd) / Math.max(DAY, endTime - gapEnd);
}
function fractionTime(fraction: number) {
  if (fraction <= .025) return startTime + fraction / .025 * (gapStart - startTime);
  if (fraction < .08) return gapStart + (fraction - .025) / .055 * (gapEnd - gapStart);
  return gapEnd + (fraction - .08) / .92 * (endTime - gapEnd);
}
function position(value: string | number, width: number) {
  return 112 + Math.max(0, Math.min(1, timeFraction(typeof value === "number" ? value : stamp(value)))) * (width - 224);
}
function colorStyle(color: string): CSSProperties { return { "--accent": color } as CSSProperties; }

const months: { time: number; label: string; short: string }[] = [];
const month = new Date(startTime);
month.setUTCDate(1);
month.setUTCMonth(month.getUTCMonth() + 1);
while (month.getTime() < endTime) {
  months.push({ time: month.getTime(), label: formatDate(month.getTime(), { month: "long", year: "numeric" }), short: formatDate(month.getTime(), { month: "short" }) });
  month.setUTCMonth(month.getUTCMonth() + 1);
}

type Selection = { kind: "event"; event: TimelineEvent } | { kind: "cluster"; items: TimelineEvent[] } | { kind: "medication"; medication: Medication; segmentIndex?: number };
type Card = { id: string; items: TimelineEvent[]; x: number; left: number; lane: number; top: number; color: string };

function layoutCards(items: TimelineEvent[], width: number) {
  const groups: { items: TimelineEvent[]; x: number }[] = [];
  for (const event of items) {
    const x = position(event.date, width);
    const previous = groups.at(-1);
    if (previous && x - previous.x < (CARD_WIDTH + 18) / 6) previous.items.push(event);
    else groups.push({ items: [event], x });
  }
  const ends: number[] = [];
  const packed = groups.map((group) => {
    const left = Math.max(12, Math.min(width - CARD_WIDTH - 12, group.x - CARD_WIDTH / 2));
    let lane = ends.findIndex((end) => end + 12 <= left);
    if (lane === -1) lane = ends.length;
    ends[lane] = left + CARD_WIDTH;
    return { ...group, id: group.items[0].id, left, lane, color: group.items.length === 1 ? categoryMeta[group.items[0].category].color : "#a6bfc9" };
  });
  const rowsAbove = Math.max(1, Math.ceil(ends.length / 2));
  const rowsBelow = Math.max(1, Math.floor(ends.length / 2));
  const axis = rowsAbove * CARD_ROW_STEP + 32;
  const height = axis + rowsBelow * CARD_ROW_STEP + 32;
  const cards: Card[] = packed.map((card) => ({ ...card, top: card.lane % 2 === 0 ? 20 + Math.floor(card.lane / 2) * CARD_ROW_STEP : axis + 24 + Math.floor(card.lane / 2) * CARD_ROW_STEP }));
  return { cards, axis, height };
}

function medicationLayout(medication: Medication, width: number) {
  const laneEnds: number[] = [];
  const segments = medication.segments.map((segment, index) => ({ segment, index, left: position(segment.start, width), right: position(segment.end ?? segment.start, width) }))
    .sort((a, b) => a.left - b.left || a.index - b.index)
    .map((item) => {
      // Labels remain readable even for a single date. The separate rail shows
      // the actual interval; the label width never represents treatment duration.
      const labelWidth = Math.min(250, Math.max(116, item.segment.label.length * 8.5 + 28));
      const labelLeft = Math.max(12, Math.min(item.left, width - labelWidth - 12));
      const right = Math.max(labelLeft + labelWidth, item.right);
      let lane = laneEnds.findIndex((end) => end + 12 <= Math.min(labelLeft, item.left));
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = right;
      return { ...item, labelLeft, labelWidth, top: 12 + lane * 54 };
    });
  return { segments, height: Math.max(74, laneEnds.length * 54 + 20) };
}

function CategoryDot({ category }: { category: Category }) {
  return <i className="category-dot" style={colorStyle(categoryMeta[category].color)} aria-hidden="true" />;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<Category[]>(categories);
  const [view, setView] = useState<"timeline" | "list">("timeline");
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showMedications, setShowMedications] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pendingCenter = useRef<number | null>(null);
  const query = search.trim().toLowerCase();
  const filteredEvents = useMemo(() => chronologicalEvents.filter((event) => activeCategories.includes(event.category) && (!query || [event.title, event.short, event.summary, ...event.details, event.clinician, event.institution, event.medication, event.recordType, event.displayDate].filter(Boolean).join(" ").toLowerCase().includes(query))), [activeCategories, query]);
  const filteredMedications = useMemo(() => medications.filter((medication) => !query || [medication.name, medication.generic, medication.summary, ...medication.segments.map((segment) => `${segment.label} ${segment.note}`)].join(" ").toLowerCase().includes(query)), [query]);
  const canvasWidth = fit ? Math.max(320, viewportWidth) : Math.max(viewportWidth, BASE_WIDTH * zoom);
  const layout = useMemo(() => layoutCards(filteredEvents, canvasWidth), [filteredEvents, canvasWidth]);
  const activeIndex = selection?.kind === "event" ? filteredEvents.findIndex((event) => event.id === selection.event.id) : -1;
  const rangeLabel = `${formatDate(startTime)} – ${formatDate(endTime)}`;
  const isFiltered = search.length > 0 || activeCategories.length !== categories.length;
  const dialogOpen = selection !== null;
  const maxScroll = Math.max(0, canvasWidth - viewportWidth);
  const scrollHintVisible = showScrollHint && maxScroll > 0;

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    if (pendingCenter.current !== null) {
      element.scrollLeft = position(pendingCenter.current, canvasWidth) - element.clientWidth / 2;
      pendingCenter.current = null;
    }
    setScrollLeft(element.scrollLeft);
  }, [canvasWidth, view]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialogOpen && !dialog.open) dialog.showModal();
    else if (!dialogOpen && dialog.open) dialog.close();
  }, [dialogOpen]);

  const centerDate = useCallback((value: string | number) => {
    viewportRef.current?.scrollTo({ left: position(value, canvasWidth) - viewportWidth / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [canvasWidth, viewportWidth]);

  const selectEvent = useCallback((event: TimelineEvent) => { setSelection({ kind: "event", event }); centerDate(event.date); }, [centerDate]);
  const stepEvent = useCallback((direction: number) => {
    const next = filteredEvents[activeIndex + direction];
    if (next) selectEvent(next);
  }, [activeIndex, filteredEvents, selectEvent]);

  function changeZoom(next: number) {
    const middle = scrollLeft + viewportWidth / 2;
    pendingCenter.current = fractionTime(Math.max(0, Math.min(1, (middle - 112) / (canvasWidth - 224))));
    setFit(false);
    setZoom(Math.max(0.35, Math.min(2, next)));
  }
  function resetFilters() { setSearch(""); setActiveCategories(categories); }
  function toggleCategory(category: Category) { setActiveCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]); }

  return <main className="app-shell">
    <a href="#timeline-workspace" className="skip-link">Skip to clinical records</a>
    <header className="topbar">
      <div className="brand-lockup"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><div><h1>Clinical timeline</h1></div></div>
      <div className="prototype-tag"><span aria-hidden="true" />Prototype</div>
    </header>

    <section className="patient-header" aria-labelledby="patient-name">
      <div className="patient-identity"><div className="patient-avatar" aria-hidden="true">LC</div><div><p className="eyebrow">Patient</p><h2 id="patient-name">{patient.name}</h2></div></div>
      <div className="patient-period"><span className="eyebrow">Date range</span><strong>{rangeLabel}</strong><span>Encounters · messages · treatment history</span></div>
      <dl className="patient-stats"><div><dt>Clinical entries</dt><dd>{events.length}</dd></div><div><dt>Messages</dt><dd>{events.filter((event) => event.category === "message").length}</dd></div><div><dt>Medications</dt><dd>{medications.length}</dd></div></dl>
    </section>

    <div className="prototype-note"><span className="note-symbol" aria-hidden="true">i</span><p><strong>Why this case.</strong> The widely publicized Lindsay Clancy case offers unusually detailed public documentation of care. It illustrates how a unified timeline could clarify treatment changes, care transitions, and fragmentation across clinicians and settings.</p></div>

    <section id="timeline-workspace" className="workspace" aria-label="Clinical records">
      <div className="control-deck">
        <div className="workspace-heading"><div><h2>Clinical records</h2></div><div className="view-switch" role="group" aria-label="Record view"><button className={view === "timeline" ? "active" : ""} aria-pressed={view === "timeline"} onClick={() => setView("timeline")}><span aria-hidden="true">↔</span> Timeline</button><button className={view === "list" ? "active" : ""} aria-pressed={view === "list"} onClick={() => setView("list")}><span aria-hidden="true">☷</span> Record list</button></div></div>
        <div className="tools-row">
          <label className="search-control"><span className="search-icon" aria-hidden="true" /><span className="sr-only">Search clinical records and medications</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search symptoms, medications, clinicians…" type="search" maxLength={200} /></label>
          {view === "timeline" && <div className="zoom-control" role="group" aria-label="Timeline zoom"><button aria-label="Zoom out" disabled={!fit && zoom <= .35} onClick={() => changeZoom(fit ? .35 : zoom - .2)}>−</button><span>{fit ? "All dates" : `${Math.round(zoom * 100)}%`}</span><button aria-label="Zoom in" disabled={!fit && zoom >= 2} onClick={() => changeZoom(fit ? .55 : zoom + .2)}>+</button><button className={fit ? "fit active" : "fit"} aria-pressed={fit} onClick={() => { setFit(!fit); }}>Fit</button></div>}
          <button className="primary-button" disabled={!filteredEvents.length} onClick={() => selectEvent(filteredEvents[0])}><span aria-hidden="true">▷</span> Open first entry</button>
        </div>
        <div className="filter-row" role="group" aria-label="Filter by entry type"><span className="filter-label">Show</span>{categories.map((category) => <button key={category} className={`filter-chip ${activeCategories.includes(category) ? "active" : ""}`} aria-pressed={activeCategories.includes(category)} onClick={() => toggleCategory(category)} style={colorStyle(categoryMeta[category].color)}><CategoryDot category={category} />{categoryMeta[category].label}<span className="chip-count">{chronologicalEvents.filter((event) => event.category === category).length}</span></button>)}{isFiltered && <button className="text-button" onClick={resetFilters}>Reset filters</button>}</div>
      </div>

      <div className="timeline-status"><p aria-live="polite"><strong>{filteredEvents.length}</strong> of {events.length} entries{query && <> matching “{search}”</>}</p>{view === "timeline" ? <><span className="scroll-hint">Scroll horizontally · select a card for details</span><button className={`medication-toggle ${showMedications ? "active" : ""}`} aria-pressed={showMedications} onClick={() => setShowMedications(!showMedications)}><span aria-hidden="true">{showMedications ? "−" : "+"}</span> Medication history</button></> : <span>Chronological order</span>}</div>

      {view === "timeline" ? <>
        <nav className="month-navigation" aria-label="Jump to month"><span>Jump to</span><button onClick={() => centerDate(startTime)}>{formatDate(startTime, { month: "short", year: "numeric" })}</button>{months.map((month) => <button key={month.time} onClick={() => centerDate(month.time)}>{month.short}{month.short === "Jan" ? " 2023" : ""}</button>)}<small className="calendar-note">June–August spacing is compressed</small></nav>
        <div className="timeline-stage">
          <div className={`timeline-scroll-coach ${scrollHintVisible ? "visible" : ""}`} aria-hidden={!scrollHintVisible}>
            <div className="scroll-coach-visual" aria-hidden="true"><kbd>Shift</kbd><span>+</span><i className="scroll-coach-mouse"><b /></i></div>
            <div className="scroll-coach-copy"><strong>Move through the timeline</strong><span>Hold Shift while scrolling</span></div>
          </div>
        <div className="timeline-scroll" ref={viewportRef} tabIndex={0} role="region" aria-label="Scrollable clinical timeline. Hold Shift while scrolling, or use left and right arrow keys." onScroll={(event) => { const left = event.currentTarget.scrollLeft; if (left !== scrollLeft) setShowScrollHint(false); setScrollLeft(left); }} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.currentTarget.scrollBy({ left: event.key === "ArrowRight" ? 320 : -320 }); } if (event.key === "Home" || event.key === "End") { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : canvasWidth }); } }}>
          <div className="timeline-canvas" style={{ width: canvasWidth }}>
            <div className="time-ruler"><span className="range-start">{formatDate(startTime, { month: "short", day: "numeric" })}</span>{months.filter((month) => (month.time <= gapStart || month.time >= gapEnd) && (!fit || canvasWidth > 900 || [8, 10, 0].includes(new Date(month.time).getUTCMonth()))).map((month) => <div className="tick" key={month.time} style={{ left: position(month.time, canvasWidth) }}><span>{fit ? month.short : month.label}</span></div>)}<span className="range-end">{formatDate(endTime, { month: "short", day: "numeric" })}</span></div>
            <div className="event-field" style={{ height: layout.height }}>
              {months.filter((month) => month.time <= gapStart || month.time >= gapEnd).map((month) => <div className="month-guide" key={month.time} style={{ left: position(month.time, canvasWidth) }} />)}
              <div className="main-axis" style={{ top: layout.axis }} /><div className="compressed-gap" style={{ left: position(gapStart, canvasWidth), width: position(gapEnd, canvasWidth) - position(gapStart, canvasWidth) }} aria-label="Spacing from June 2 through August 23 is compressed"><span style={{ top: layout.axis + 23 }}>{canvasWidth < 2000 ? "Jun–Aug" : "June–August · spacing compressed"}</span></div>
              {layout.cards.map((card) => {
                const first = card.items[0];
                const last = card.items.at(-1)!;
                const cluster = card.items.length > 1;
                const datesDiffer = first.date.slice(0, 10) !== last.date.slice(0, 10);
                const topSide = card.top < layout.axis;
                const connectorTop = topSide ? card.top + CARD_HEIGHT : layout.axis + 2;
                return <div className="event-anchor" key={card.id} style={colorStyle(card.color)}><div className="connector" style={{ left: card.x, top: connectorTop, height: topSide ? layout.axis - connectorTop : card.top - connectorTop }} /><i className="axis-dot" style={{ left: card.x, top: layout.axis }} /><button className={`event-card ${cluster ? "cluster-card" : ""}`} style={{ left: card.left, top: card.top, width: CARD_WIDTH, height: CARD_HEIGHT }} aria-label={cluster ? `${card.items.length} entries, ${first.displayDate}${datesDiffer ? ` through ${last.displayDate}` : ""}` : `${first.displayDate}: ${first.title}`} onClick={() => cluster ? setSelection({ kind: "cluster", items: card.items }) : selectEvent(first)}><span className="card-date">{cluster ? `${formatDate(first.date, { month: "short", day: "numeric" })}${datesDiffer ? ` – ${formatDate(last.date, { month: "short", day: "numeric" })}` : ""}` : first.displayDate}</span><strong>{cluster ? `${card.items.length} clinical entries` : first.title}</strong>{cluster ? <span className="cluster-kinds">{[...new Set(card.items.map((item) => item.category))].map((category) => <CategoryDot category={category} key={category} />)}<span>Open entries <b aria-hidden="true">↗</b></span></span> : <span className="card-category">{categoryMeta[first.category].label}</span>}</button></div>;
              })}
              {!filteredEvents.length && <div className="empty-state" style={{ left: scrollLeft + viewportWidth / 2 }}><strong>No matching entries.</strong><button className="text-button" onClick={resetFilters}>Reset filters</button></div>}
            </div>
            {showMedications && <section className="medication-field" aria-label="Medication history"><div className="medication-heading" style={{ width: viewportWidth }}><div><h3>Medication history</h3></div><span>Select a dose for details</span></div>
              <div className="medication-legend" style={{ width: viewportWidth }}><span><i className="prescribed" />Prescribed / filled</span><span><i className="reported" />Reported use</span><span><i className="planned" />Planned</span><span><i className="inpatient" />Inpatient</span></div>
              {filteredMedications.map((medication) => {
                const packed = medicationLayout(medication, canvasWidth);
                const stacked = fit && canvasWidth < 700;
                const headerHeight = stacked ? 56 : 0;
                return <div className={`medication-row ${stacked ? "stacked" : ""}`} style={{ height: packed.height + headerHeight, ...colorStyle(medication.color) }} key={medication.name}>
                  <button className="medication-name" onClick={() => setSelection({ kind: "medication", medication })}><strong>{medication.name}</strong><span>{medication.generic}</span></button>
                  {packed.segments.map(({ segment, index, left, right, labelLeft, labelWidth, top }) => <span key={index}>
                    <span aria-hidden="true" className={`${segment.end ? "medication-duration" : "medication-point"} ${segment.status}`} style={{ left, width: segment.end ? Math.max(0, right - left) : 7, top: top + headerHeight + 42 }} />
                    <button className={`medication-segment ${segment.status}`} style={{ left: labelLeft, width: labelWidth, top: top + headerHeight }} aria-label={`${medication.name}, ${segment.label}, ${segment.status}, ${formatDate(segment.start)}${segment.end ? ` through ${formatDate(segment.end)}` : ""}`} title={`${medication.name} · ${segment.label} · ${segment.status}`} onClick={() => setSelection({ kind: "medication", medication, segmentIndex: index })}>{segment.label}</button>
                  </span>)}
                </div>;
              })}
              {!filteredMedications.length && <p className="medication-empty" style={{ width: viewportWidth }}>No matching medications.</p>}
              <p className="medication-footnote" style={{ width: viewportWidth }}>Lines show date ranges; dots mark single dates. Label width does not indicate duration. Prescriptions and treatment plans do not confirm use.</p>
            </section>}
          </div>
        </div>
        </div>
        <div className="overview-control"><label htmlFor="timeline-position">Timeline position</label><input id="timeline-position" type="range" min={0} max={Math.max(1, maxScroll)} step={1} value={Math.min(scrollLeft, maxScroll)} disabled={maxScroll === 0} onChange={(event) => { if (viewportRef.current) viewportRef.current.scrollLeft = Number(event.target.value); }} /><span>{fit ? "All dates shown" : "Scroll timeline"}</span></div>
      </> : <div className="record-list">{filteredEvents.length ? filteredEvents.map((event, index) => <div className="record-row" key={event.id} style={colorStyle(categoryMeta[event.category].color)}>{(index === 0 || event.date.slice(0, 7) !== filteredEvents[index - 1].date.slice(0, 7)) && <h3 className="record-month">{formatDate(event.date, { month: "long", year: "numeric" })}</h3>}<button className="record-button" onClick={() => selectEvent(event)}><time dateTime={event.date}>{event.displayDate}</time><CategoryDot category={event.category} /><div><span className="record-type">{categoryMeta[event.category].label}{event.clinician ? ` · ${event.clinician}` : ""}</span><strong>{event.title}</strong><p>{event.short}</p></div><span className="record-arrow" aria-hidden="true">↗</span></button></div>) : <div className="list-empty"><h3>No matching entries.</h3><button className="text-button" onClick={resetFilters}>Reset filters</button></div>}</div>}
    </section>

    <dialog className="detail-dialog" ref={dialogRef} onCancel={() => setSelection(null)} onClose={() => setSelection(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelection(null); }} onKeyDown={(event) => { const target = event.target as HTMLElement; if (target.closest("input, textarea, select, [contenteditable=true]")) return; if (selection?.kind === "event" && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); stepEvent(event.key === "ArrowRight" ? 1 : -1); } }} aria-labelledby="detail-title">
      <div className="drawer-content" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-top"><span className="eyebrow">{selection?.kind === "medication" ? "Medication detail" : selection?.kind === "cluster" ? "Entries in this period" : "Clinical entry"}</span><button className="close-button" aria-label="Close details" onClick={() => setSelection(null)} autoFocus>×</button></div>
        {selection?.kind === "event" && <><div className="detail-category" style={colorStyle(categoryMeta[selection.event.category].color)}><CategoryDot category={selection.event.category} />{categoryMeta[selection.event.category].label}</div><time className="detail-date" dateTime={selection.event.date}>{selection.event.displayDate}</time><h2 id="detail-title">{selection.event.title}</h2><p className="detail-summary">{selection.event.summary}</p>{(selection.event.clinician || selection.event.institution) && <dl className="care-team">{selection.event.clinician && <div><dt>Clinician</dt><dd>{selection.event.clinician}</dd></div>}{selection.event.institution && <div><dt>Care setting</dt><dd>{selection.event.institution}</dd></div>}</dl>}<div className="detail-section"><h3>Clinical details</h3><ul className="detail-list">{selection.event.details.map((detail, index) => <li key={index}>{detail}</li>)}</ul></div>{selection.event.medication && <div className="detail-medication"><span className="eyebrow">Medications</span><p>{selection.event.medication}</p></div>}{selection.event.caution && <div className="record-note"><strong>Record note</strong><p>{selection.event.caution}</p></div>}<div className="entry-provenance"><span className="eyebrow">Summary type</span><p>{selection.event.recordType}</p></div><div className="drawer-navigation"><button onClick={() => stepEvent(-1)} disabled={activeIndex <= 0}>← Previous</button><span>{activeIndex >= 0 ? `${activeIndex + 1} / ${filteredEvents.length}` : "Selected entry"}</span><button onClick={() => stepEvent(1)} disabled={activeIndex < 0 || activeIndex >= filteredEvents.length - 1}>Next →</button></div></>}
        {selection?.kind === "cluster" && <><h2 id="detail-title">{selection.items.length} clinical entries</h2><p className="detail-summary">{formatDate(selection.items[0].date)}{selection.items[0].date.slice(0, 10) !== selection.items.at(-1)!.date.slice(0, 10) ? ` – ${formatDate(selection.items.at(-1)!.date)}` : ""}</p><p className="cluster-explanation">Entries are grouped at this zoom level.</p><div className="cluster-entry-list">{selection.items.map((event) => <button key={event.id} onClick={() => selectEvent(event)} style={colorStyle(categoryMeta[event.category].color)}><span className="cluster-entry-meta"><CategoryDot category={event.category} />{event.displayDate} · {categoryMeta[event.category].label}</span><strong>{event.title}</strong><p>{event.short}</p><span className="cluster-entry-open">Open entry →</span></button>)}</div></>}
        {selection?.kind === "medication" && <><div className="detail-category" style={colorStyle(selection.medication.color)}><i className="category-dot" aria-hidden="true" />Medication history</div><h2 id="detail-title">{selection.medication.name}</h2><p className="generic-name">{selection.medication.generic}</p><p className="detail-summary">{selection.medication.summary}</p><div className="medication-detail-list">{selection.medication.segments.map((segment, index) => <article className={selection.segmentIndex === index ? "selected" : ""} key={index}><span className={`status-badge ${segment.status}`}>{segment.status === "reported" ? "Reported use" : segment.status}</span><time>{formatDate(segment.start)}{segment.end && segment.end !== segment.start ? ` – ${formatDate(segment.end)}` : ""}</time><h3>{segment.label}</h3><p>{segment.note}</p></article>)}</div><p className="entry-provenance">Entries do not confirm continuous medication use between dates.</p></>}
      </div>
    </dialog>
  </main>;
}
