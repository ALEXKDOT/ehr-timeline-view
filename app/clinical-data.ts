/**
 * A manually curated clinical-content prototype based on an existing timeline.
 * This is not a verified original EHR, an Epic/CareConnect export, a synthetic
 * patient record, or a complete medical chart. Descriptions summarize selected
 * treatment history and patient reports; they do not certify primary-record access.
 * Dates are calendar positions, with approximate ranges stated in the content.
 * Medication spans represent selected plans or reports, not daily administration.
 */
export type Category = 'visit' | 'message' | 'symptom' | 'hospital' | 'medication';
export type TimelineEvent = {
  id: string; date: string; displayDate: string; title: string; short: string;
  category: Category; clinician?: string; institution?: string; summary: string;
  details: string[]; medication?: string; caution?: string; recordType: string;
};
export type Medication = {
  name: string; generic: string; color: string; className: string; summary: string;
  segments: {start: string; end?: string; label: string;
    status: 'prescribed' | 'reported' | 'planned' | 'inpatient';
    level?: 0 | 1; note: string}[];
};

export const patient = {
  name: 'Lindsay Clancy',
  subtitle: 'Clinical care timeline',
  period: 'May 2022 – February 2023',
  startDate: '2022-05-26',
  endDate: '2023-02-21',
  provenance: 'Manually compiled clinical summaries from an existing timeline. Not a verified EHR export or a complete medical chart. No live Epic / CareConnect connection.',
};

export const categoryMeta: Record<Category, {label: string; color: string}> = {
  visit: {label: 'Visits', color: '#2b998a'},
  message: {label: 'Care messages', color: '#3b86b9'},
  symptom: {label: 'Symptom history', color: '#bc9440'},
  hospital: {label: 'Hospital care', color: '#5279b2'},
  medication: {label: 'Medications', color: '#936dc0'},
};

export const events: TimelineEvent[] = [
  {
    "id": "birth",
    "date": "2022-05-26",
    "displayDate": "May 26",
    "title": "Childbirth",
    "short": "Third childbirth · postpartum period begins",
    "category": "visit",
    "summary": "Clancy gave birth on May 26, 2022.",
    "details": [
      "During later care, she described the first approximately 12 weeks postpartum as going well."
    ],
    "caution": "Later symptom history is retrospective patient report.",
    "recordType": "Curated birth history"
  },
  {
    "id": "late-aug",
    "date": "2022-08-25",
    "displayDate": "Late August",
    "title": "Anxiety begins: reported history",
    "short": "Approximate onset · racing thoughts and overwhelm",
    "category": "symptom",
    "summary": "In a later clinical history, Clancy described increasing anxiety and overwhelm after an initially well postpartum period.",
    "details": [
      "She reported difficulty leaving the baby and racing thoughts.",
      "The timing is approximate and was described during later treatment."
    ],
    "caution": "This is retrospective symptom history, not a visit dated in August.",
    "recordType": "Curated patient-reported history"
  },
  {
    "id": "sep12-forms",
    "date": "2022-09-12",
    "displayDate": "September 12",
    "title": "Pre-visit intake forms",
    "short": "Anxiety, depression and sleep screening",
    "category": "message",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy completed intake materials before her first evaluation with Jennifer Tufts.",
    "details": [
      "The history included anxiety, depressive symptoms, insomnia and racing thoughts, with negative suicide, harm, voice and psychosis screening items.",
      "The forms described earlier anxiety and postpartum anxiety, and previous benefit from fluoxetine and bupropion.",
      "Prior treatment and side-effect histories differed between later clinical accounts and have not been reconciled."
    ],
    "caution": "Historical medication responses were patient reports; the intake forms preceded the September 15 encounter.",
    "recordType": "Curated care communication"
  },
  {
    "id": "tufts-intake",
    "date": "2022-09-15",
    "displayDate": "September 15",
    "title": "Initial psychiatry evaluation",
    "short": "Telehealth · anxiety, depression and insomnia",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts assessed anxiety, depressed mood, insomnia, racing thoughts, appetite changes, reduced enjoyment and functional difficulty.",
    "details": [
      "Suicide, harm, hallucination and psychosis screening responses were negative.",
      "The assessment described generalized anxiety disorder and adjustment disorder with depressed mood.",
      "Psychotherapy and medication treatment were discussed.",
      "Sertraline 25 mg daily for one week, then 50 mg if following the plan, was prescribed."
    ],
    "caution": "Findings apply to this encounter. A prescription does not establish medication use.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-sep15",
    "date": "2022-09-15",
    "displayDate": "September 15",
    "title": "Sertraline prescribed and filled",
    "short": "25 mg ×30 · planned increase to 50 mg",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Sertraline 25 mg daily for one week, followed by a planned increase to 50 mg, was prescribed; a 30-tablet supply of 25 mg was filled.",
    "details": [
      "Clancy subsequently reported that she had not started the medication on this date."
    ],
    "medication": "Sertraline 25 mg; 50 mg planned",
    "caution": "The dispensing date is distinct from the reported later start date.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "sep28-visit",
    "date": "2022-09-28",
    "displayDate": "September 28",
    "title": "Psychiatry follow-up: improved symptoms",
    "short": "Telehealth · more sleep; sertraline not started",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported feeling somewhat better as the baby slept more and she was able to sleep more.",
    "details": [
      "She reported collecting sertraline but deciding not to take it.",
      "The assessment described alertness, orientation, engagement, euthymic mood, full affect and appropriate speech and thought.",
      "No hallucinations were reported."
    ],
    "caution": "The findings describe a time-limited video encounter.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "sertraline-deferred",
    "date": "2022-09-28",
    "displayDate": "September 28",
    "title": "Sertraline plan deferred",
    "short": "Filled previously · patient reports no doses taken",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "After the September 28 visit, Tufts deferred sertraline and continued to recommend therapy.",
    "details": [
      "Clancy reported improvement without starting sertraline.",
      "The precise date of her later start remains uncertain."
    ],
    "medication": "Sertraline deferred",
    "caution": "A fill does not establish ingestion.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "leave",
    "date": "2022-09-30",
    "displayDate": "September 30",
    "title": "MyChart: difficulty returning to work",
    "short": "Patient-reported functional limitation",
    "category": "message",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy told her clinician that she did not feel ready to resume nursing care and was only well enough to function without medication.",
    "details": [
      "The message also discussed infant feeding and overnight nursing demands."
    ],
    "caution": "This is a patient report of functioning, not an independent occupational assessment.",
    "recordType": "Curated care communication"
  },
  {
    "id": "oct3-visit",
    "date": "2022-10-03",
    "displayDate": "October 3",
    "title": "Psychiatry follow-up: daily functioning",
    "short": "Telehealth · postpartum anxiety and depression",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy met with Tufts after reporting that postpartum anxiety and depression were affecting readiness to return to work.",
    "details": [
      "The mental-status assessment was described as broadly unchanged from September 28."
    ],
    "caution": "This encounter does not establish a new diagnosis.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "oct3-therapy",
    "date": "2022-10-03",
    "displayDate": "October 3",
    "title": "Initial therapy appointment",
    "short": "First encounter with Jennifer McAllister",
    "category": "visit",
    "clinician": "Jennifer McAllister",
    "institution": "Aster Mental Health",
    "summary": "Clancy had an initial therapy encounter with Jennifer McAllister after the same-day psychiatry visit.",
    "details": [
      "The complete therapy note is not available within the curated material."
    ],
    "caution": "Only the encounter and its sequence can be summarized; detailed symptom and safety findings are unavailable.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "sertraline-stop",
    "date": "2022-10-20",
    "displayDate": "October 20",
    "title": "Psychiatry follow-up: medication concerns",
    "short": "Telehealth · worse sleep, anxiety and mental fog",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported worsening sleep, anxiety, mental fog, overnight racing thoughts, appetite loss, diarrhea and tearfulness after starting sertraline and increasing from 25 to 50 mg.",
    "details": [
      "She denied suicidal and homicidal thoughts but described fear of eventually developing suicidal thoughts.",
      "She reported not wanting to be alone and seeking family support.",
      "Tufts described depressed and anxious mood, with appropriate speech and thought process and intact cognition.",
      "Sertraline was stopped; an immediate replacement prescription was deferred."
    ],
    "caution": "The reported sequence does not establish causation. Exact start dates and dose adherence are uncertain.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "med-oct20",
    "date": "2022-10-20",
    "displayDate": "October 20",
    "title": "Sertraline discontinued",
    "short": "Replacement prescription deferred",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts advised stopping sertraline following the reported symptom worsening.",
    "details": [
      "Clancy preferred not to begin another prescription immediately.",
      "Alternative approaches and supplements were discussed."
    ],
    "medication": "Sertraline stopped",
    "caution": "The exact number and timing of prior doses are unknown.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "oct21",
    "date": "2022-10-21",
    "displayDate": "October 21",
    "title": "Psychiatry follow-up: acute insomnia",
    "short": "Telehealth · severe anxiety and palpitations",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported no sleep the preceding night, severe anxiety, a racing heart, gastrointestinal symptoms, crying and fogginess.",
    "details": [
      "She described yawning without feeling drowsy.",
      "The assessment did not identify pressured speech, hyperactivity, mania, psychosis, suicidal or homicidal ideation, or hallucinations.",
      "Short-term lorazepam was prescribed as needed for severe anxiety."
    ],
    "caution": "Sleep and symptoms were reported during the encounter.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-oct21",
    "date": "2022-10-21",
    "displayDate": "October 21",
    "title": "Lorazepam prescribed",
    "short": "0.5 mg ×7 · as needed for severe anxiety",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Seven 0.5 mg lorazepam tablets were prescribed and filled for short-term, as-needed use.",
    "details": [
      "The intended indication was severe anxiety."
    ],
    "medication": "Lorazepam 0.5 mg",
    "caution": "The fill does not establish the number of doses taken.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "oct26",
    "date": "2022-10-26",
    "displayDate": "October 26",
    "title": "Psychiatry follow-up: persistent symptoms",
    "short": "Telehealth · anxiety and depression continue",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported that lorazepam reduced anxiety but did not improve sleep; diphenhydramine had been more helpful for sleep.",
    "details": [
      "Mood remained anxious and depressed.",
      "She denied suicidal and homicidal ideation; no psychosis was observed.",
      "Non-benzodiazepine options were discussed.",
      "Lorazepam, buspirone and hydroxyzine were prescribed."
    ],
    "caution": "Later use of every prescribed medication is not established.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-oct26",
    "date": "2022-10-26",
    "displayDate": "October 26",
    "title": "Anxiety regimen prescriptions",
    "short": "Lorazepam · buspirone · hydroxyzine",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Three prescriptions were filled during a change in the anxiety regimen.",
    "details": [
      "Lorazepam 1 mg ×30.",
      "Buspirone 5 mg ×30 for daily use.",
      "Hydroxyzine 25 mg ×30 as an alternative to lorazepam."
    ],
    "medication": "Lorazepam 1 mg; buspirone 5 mg; hydroxyzine 25 mg",
    "caution": "Concurrent use is not established; buspirone was later reported not started.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "therapy",
    "date": "2022-10-31",
    "displayDate": "October 31",
    "title": "Therapy follow-up",
    "short": "Modality uncertain · suicidal and homicidal thoughts denied",
    "category": "visit",
    "clinician": "Jennifer McAllister",
    "institution": "Aster Mental Health",
    "summary": "The available summary of a therapy note describes denial of suicidal and homicidal ideation.",
    "details": [
      "The appointment was approximately one hour and may have been virtual.",
      "The full therapy chart is unavailable."
    ],
    "caution": "Modality and the scope of the safety assessment cannot be confirmed.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "nov2",
    "date": "2022-11-02",
    "displayDate": "November 2",
    "title": "Psychiatry follow-up: sleep improves",
    "short": "Telehealth · lorazepam benefit; taper planned",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported that lorazepam helped and sleep improved; Tufts discussed a gradual taper rather than long-term use.",
    "details": [
      "Clancy reported not starting buspirone because she was afraid to begin another medication.",
      "Her mood was reported as euthymic, with appropriate affect.",
      "She denied suicidal and homicidal ideation."
    ],
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-nov2",
    "date": "2022-11-02",
    "displayDate": "November 2",
    "title": "Lorazepam refill and taper plan",
    "short": "0.5 mg ×40 · reductions every two weeks",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "A 40-tablet supply of lorazepam 0.5 mg was filled; the plan called for 0.25 mg reductions every two weeks.",
    "details": [
      "Clancy reported benefit at the associated visit."
    ],
    "medication": "Lorazepam taper planned",
    "caution": "The taper schedule does not establish the doses actually taken.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "rx-nov9",
    "date": "2022-11-09",
    "displayDate": "November 9",
    "title": "Buspirone refill",
    "short": "5 mg ×30 · use unknown",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "A second 30-tablet supply of buspirone 5 mg was filled.",
    "details": [
      "On November 2, Clancy had reported that she had not started buspirone."
    ],
    "medication": "Buspirone 5 mg",
    "caution": "The refill does not establish whether she subsequently took it.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "ed",
    "date": "2022-11-16",
    "displayDate": "November 16",
    "title": "South Shore emergency visit",
    "short": "Insomnia, anxiety and palpitations",
    "category": "hospital",
    "institution": "South Shore ED",
    "summary": "Clancy presented to the emergency department for insomnia, anxiety and palpitations.",
    "details": [
      "Trazodone 50 mg was prescribed following the evaluation.",
      "In a later clinical history, she reported that the treatment helped her fall asleep but did not maintain sleep."
    ],
    "caution": "The complete emergency-department chart is unavailable in this curated dataset.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "rx-nov16",
    "date": "2022-11-16",
    "displayDate": "November 16",
    "title": "Trazodone prescribed after ED visit",
    "short": "50 mg ×30",
    "category": "medication",
    "clinician": "Kayvon Izadpanah, MD",
    "institution": "South Shore Health",
    "summary": "Trazodone 50 mg, quantity 30, was filled after the South Shore emergency visit.",
    "details": [
      "Clancy later described benefit for falling asleep but not staying asleep."
    ],
    "medication": "Trazodone 50 mg",
    "caution": "Duration and regularity of use are unknown.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "paul-contact",
    "date": "2022-11-20",
    "displayDate": "November 20",
    "title": "Initial perinatal-service phone contact",
    "short": "Sleep history and safety screening",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Julie Paul spoke with Clancy before the formal intake and reviewed anxiety, overwhelm, racing thoughts and fragmented sleep.",
    "details": [
      "Clancy described an initially well postpartum period and a preference to avoid long-term medication.",
      "Responses to questions about self-harm, harm to others, hallucinations and immediate safety were negative.",
      "She reported that lorazepam plus diphenhydramine had helped sleep.",
      "Paul advised using the existing combination that night and arranged a next-day intake."
    ],
    "caution": "This was a patient-reported history and time-limited telephone safety screen.",
    "recordType": "Curated care communication"
  },
  {
    "id": "paul-intake",
    "date": "2022-11-21",
    "displayDate": "November 21",
    "title": "Perinatal psychiatry intake",
    "short": "In person · anxiety and sleep assessment",
    "category": "visit",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy described anxiety, overwhelm, racing thoughts, insomnia and prior sertraline intolerance.",
    "details": [
      "She denied suicidal and homicidal ideation and hallucinations; thought process was described as linear and goal-directed.",
      "GAD-7 was 21/21; EPDS was 23/30, with a negative self-harm item.",
      "She reported benefit from lorazepam plus diphenhydramine for sleep and no benefit from a CBD gummy.",
      "Fluoxetine 10 mg for four days, increasing to 20 mg only if tolerated, was planned."
    ],
    "caution": "Screening scores measure reported symptom severity. The planned 20 mg fluoxetine step was not established as taken.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-nov21",
    "date": "2022-11-21",
    "displayDate": "November 21",
    "title": "Fluoxetine prescribed",
    "short": "10 mg ×56 · cautious titration planned",
    "category": "medication",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Fluoxetine 10 mg was prescribed, with a 56-tablet supply filled.",
    "details": [
      "The selection reflected Clancy’s report of prior benefit.",
      "The intended increase to 20 mg depended on tolerability."
    ],
    "medication": "Fluoxetine 10 mg; 20 mg planned if tolerated",
    "caution": "Dispensing quantity does not establish the number or strength of doses taken.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "tufts-nov22",
    "date": "2022-11-22",
    "displayDate": "November 22",
    "title": "Psychiatry follow-up: transition of care",
    "short": "Telehealth · South Shore care reviewed",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy told Tufts that she had enrolled with South Shore’s perinatal service and planned to transfer psychiatric and therapy care there.",
    "details": [
      "She reported plans to start fluoxetine and continued as-needed lorazepam and diphenhydramine for sleep.",
      "She denied suicidal and homicidal ideation; Tufts observed no psychosis."
    ],
    "caution": "Medication history was patient reported.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "fluoxetine-start-report",
    "date": "2022-11-23",
    "displayDate": "November 22–23",
    "title": "Care-team contact: fluoxetine started",
    "short": "November 22–23 · phone or MyChart",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy contacted Paul because she was nervous about starting fluoxetine; the following day she reported starting it on November 22.",
    "details": [
      "The communication medium is unresolved."
    ],
    "medication": "Fluoxetine 10 mg reportedly started",
    "caution": "The reported start does not establish continuous adherence.",
    "recordType": "Curated care communication"
  },
  {
    "id": "nov25",
    "date": "2022-11-25",
    "displayDate": "November 25",
    "title": "MyChart: fluoxetine stopped",
    "short": "Sleep regimen revised",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Following a brief fluoxetine trial with worse sleep and feeling disconnected or spacey, Paul stopped fluoxetine and revised the sleep plan.",
    "details": [
      "Zolpidem, mirtazapine and clonazepam were prescribed.",
      "Paul warned against combining clonazepam with lorazepam."
    ],
    "medication": "Fluoxetine stopped; sleep regimen revised",
    "caution": "A temporal association does not establish the cause of symptoms.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-nov25",
    "date": "2022-11-25",
    "displayDate": "November 25",
    "title": "Revised sleep prescriptions",
    "short": "Zolpidem · mirtazapine · clonazepam",
    "category": "medication",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Three prescriptions were dispensed during the sleep-regimen change.",
    "details": [
      "Zolpidem 5 mg ×1 for a single-dose trial.",
      "Mirtazapine 7.5 mg ×30.",
      "Clonazepam 0.5 mg ×14; instructions included not combining it with lorazepam."
    ],
    "medication": "Zolpidem 5 mg; mirtazapine 7.5 mg; clonazepam 0.5 mg",
    "caution": "Zolpidem ingestion is unknown; later reports identify only specific nights of mirtazapine and clonazepam use.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "msg-nov26",
    "date": "2022-11-26",
    "displayDate": "November 26",
    "title": "MyChart: sleep with new regimen",
    "short": "Mirtazapine 7.5 mg + clonazepam 0.5 mg reported",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported taking mirtazapine 7.5 mg with clonazepam 0.5 mg and sleeping.",
    "details": [
      "She asked about trying mirtazapine 15 mg."
    ],
    "medication": "Mirtazapine 7.5 mg + clonazepam 0.5 mg reported",
    "caution": "This describes one reported night, not a continuous dosing record.",
    "recordType": "Curated care communication"
  },
  {
    "id": "disconnected",
    "date": "2022-11-27",
    "displayDate": "November 27",
    "title": "MyChart: feeling disconnected",
    "short": "Disconnection reported after sleep",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "After reporting mirtazapine 15 mg plus clonazepam 0.5 mg and sleep, Clancy described feeling disconnected from herself and reality.",
    "details": [
      "She reported two nights of clonazepam and considered stopping it.",
      "Paul considered sedation or disorientation and supported stopping clonazepam."
    ],
    "medication": "Mirtazapine 15 mg + clonazepam 0.5 mg reported",
    "caution": "The reported experience does not establish a diagnosis or a medication cause.",
    "recordType": "Curated care communication"
  },
  {
    "id": "panic",
    "date": "2022-11-28",
    "displayDate": "November 28",
    "title": "Care-team contact: panic symptoms",
    "short": "Phone or MyChart · higher-level care discussed",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported a panic attack. Paul discussed symptom management and recommended Women & Infants partial-hospital care.",
    "details": [
      "Clancy described practical difficulty attending the program.",
      "The contact was associated with a progress note, but whether it occurred by phone or MyChart is uncertain."
    ],
    "caution": "The communication medium is unresolved.",
    "recordType": "Curated care communication"
  },
  {
    "id": "msg-nov29",
    "date": "2022-11-29",
    "displayDate": "November 29",
    "title": "MyChart: limited sleep benefit",
    "short": "Mirtazapine 15 mg + CBD reported",
    "category": "message",
    "clinician": "Julie Paul, psychiatric NP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Before the Jollotta assessment, Clancy reported only slight sleep benefit from mirtazapine 15 mg plus CBD.",
    "details": [
      "The CBD product and dose are unknown."
    ],
    "medication": "Mirtazapine 15 mg + CBD reported",
    "caution": "Use and response are patient reported.",
    "recordType": "Curated care communication"
  },
  {
    "id": "jollotta-intake",
    "date": "2022-11-29",
    "displayDate": "November 29",
    "title": "First assessment with Rebecca Jollotta",
    "short": "Telehealth · fragmented sleep and intense anxiety",
    "category": "visit",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy described fragmented sleep, disorientation, forgetfulness, feeling disconnected from her body and intense anxiety about sleep.",
    "details": [
      "EPDS was 17 and GAD-7 was 14.",
      "She reported about two hours of sleep followed by several hours awake and occasional lorazepam use to return to sleep.",
      "She declined offered zolpidem and hydroxyzine, preferring mirtazapine 15 mg with as-needed lorazepam.",
      "No suicidal or homicidal ideation, mania, hallucinations, delusions or psychosis were observed or reported during this encounter."
    ],
    "caution": "Screening results and negative findings describe this encounter.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "quetiapine-start",
    "date": "2022-11-30",
    "displayDate": "November 30",
    "title": "MyChart: asks to stop mirtazapine",
    "short": "Worse depression and poor sleep",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy asked to stop mirtazapine after approximately five nights, reporting worse depression and only about two hours of sleep.",
    "details": [
      "Jollotta proposed low-dose quetiapine for insomnia; a nurse called to review the plan.",
      "Clancy agreed to collect the medication.",
      "Care was transitioning from Paul to Jollotta.",
      "A fluoxetine retrial was discussed but not established as started."
    ],
    "medication": "Quetiapine 25 mg planned",
    "caution": "The initial quetiapine target was sleep.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-nov30",
    "date": "2022-11-30",
    "displayDate": "November 30",
    "title": "Quetiapine prescribed",
    "short": "25 mg ×30 · sleep treatment",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Quetiapine 25 mg, quantity 30, was prescribed and filled for insomnia.",
    "details": [
      "The low-dose prescription does not establish a bipolar or psychotic diagnosis."
    ],
    "medication": "Quetiapine 25 mg",
    "caution": "A fill does not establish immediate use.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "intrusive",
    "date": "2022-12-01",
    "displayDate": "December 1",
    "title": "MyChart: new intrusive thoughts",
    "short": "Mirtazapine skipped; thought content unclear",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy told Jollotta that she disliked mirtazapine and was having intrusive thoughts she had not previously experienced.",
    "details": [
      "She reported skipping mirtazapine and preferring fluoxetine with lorazepam and diphenhydramine.",
      "She later planned mirtazapine 15 mg with quetiapine 25 mg.",
      "The immediate message did not clearly establish the content of the thoughts."
    ],
    "caution": "The message alone cannot establish a specific symptom diagnosis.",
    "recordType": "Curated care communication"
  },
  {
    "id": "tufts-dec1",
    "date": "2022-12-01",
    "displayDate": "December 1",
    "title": "Psychiatry follow-up: concern about worsening mood",
    "short": "Telehealth · fear of developing suicidal thoughts",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy denied active suicidal ideation but described fear of approaching suicidal thoughts and a lack of improvement.",
    "details": [
      "She reviewed recent sleep medications and perceived side effects.",
      "She reported a trazodone dose range of 50–150 mg with minimal effect; precise dates were not established.",
      "Tufts advised using one medication manager.",
      "Lamotrigine was discussed but not prescribed that day."
    ],
    "caution": "The medication history was patient reported and does not establish a dose-by-dose record.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "dec1-urgent-outreach",
    "date": "2022-12-01",
    "displayDate": "December 1",
    "title": "Urgent appointment outreach",
    "short": "Medication appointment requested; completion uncertain",
    "category": "message",
    "institution": "South Shore Health",
    "summary": "Clancy requested an immediate medication appointment; staff offered an urgent slot but did not reach her in time to complete it.",
    "details": [
      "The available summary does not confirm a completed visit."
    ],
    "caution": "This is an outreach attempt, not a confirmed clinical encounter.",
    "recordType": "Curated care communication"
  },
  {
    "id": "death-thoughts",
    "date": "2022-12-02",
    "displayDate": "December 2",
    "title": "MyChart: thoughts of wanting to die",
    "short": "Intrusive thoughts and emotional numbness",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "After reporting mirtazapine 15 mg and quetiapine 25 mg, Clancy described intrusive thoughts of wanting things to be over and indifference to dying.",
    "details": [
      "She reported taking lorazepam 1 mg, returning to sleep, and then no longer having the thoughts.",
      "Jollotta provided crisis information, asked about support and recommended quetiapine 50 mg for sleep."
    ],
    "medication": "Mirtazapine + quetiapine; lorazepam 1 mg reported",
    "caution": "The sequence is patient reported and does not establish medication causation.",
    "recordType": "Curated care communication"
  },
  {
    "id": "dec2-dukes",
    "date": "2022-12-02",
    "displayDate": "December 2",
    "title": "Counseling intake",
    "short": "In person · anxiety, sleep loss and passive suicidal thoughts",
    "category": "visit",
    "clinician": "Latiesha Dukes, LMHC",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported anxiety, depressive symptoms, severe sleep loss and frequent passive suicidal ideation without a plan.",
    "details": [
      "Dukes described low mood, numbness and tearfulness, with thought process and intellectual functioning within normal limits.",
      "Reported symptoms included panic, impaired attention, two to four hours of sleep, poor appetite and approximately 10 pounds of weight loss in a month.",
      "Clancy expressed concern about lorazepam dependence; the substance-use assessment did not identify a substance-use disorder.",
      "Weekly bridge therapy, continued medication management, intensive outpatient or partial-hospital care, CBT resources and crisis instructions were planned."
    ],
    "caution": "Medication use was patient reported; the complete medication list was not independently reconciled.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "dec3",
    "date": "2022-12-03",
    "displayDate": "December 3",
    "title": "MyChart: severe depression continues",
    "short": "Brief relief after reported lorazepam dose",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported approximately four hours and 45 minutes of sleep with continuing severe depression and intrusive thoughts.",
    "details": [
      "She later reported taking lorazepam 0.5 mg and feeling better."
    ],
    "medication": "Lorazepam 0.5 mg reported",
    "caution": "Response after a dose does not establish the underlying diagnosis.",
    "recordType": "Curated care communication"
  },
  {
    "id": "dec5-aspire",
    "date": "2022-12-05",
    "displayDate": "December 5",
    "title": "Counseling follow-up after crisis contact",
    "short": "Telehealth · current suicidal ideation denied",
    "category": "visit",
    "clinician": "Latiesha Dukes, LMHC",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy told Dukes that a difficult weekend of thoughts of wanting to die or no longer be present had led to a virtual Aspire crisis evaluation.",
    "details": [
      "She reported that Aspire recommended a day program; the underlying Aspire assessment is unavailable.",
      "At this follow-up she denied current suicidal ideation.",
      "Dukes did not observe psychosis, mania or an immediate crisis.",
      "Her spouse joined the visit; intensive outpatient or partial-hospital care and sleep hygiene were discussed.",
      "Clancy requested psychological testing for additional diagnostic input."
    ],
    "caution": "Aspire’s evaluation and recommendation are known through the patient’s report to her care team.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "dec6",
    "date": "2022-12-06",
    "displayDate": "December 6",
    "title": "Psychiatry assessment: diagnostic review",
    "short": "In person · sleep and activation history",
    "category": "visit",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Jollotta reviewed a reported period of little sleep without fatigue during earlier sertraline use and considered bipolar disorder in the differential.",
    "details": [
      "The prior Mood Disorder Questionnaire was negative, and diagnostic criteria for bipolar disorder were not established.",
      "EPDS was 21; mood tracking was discussed.",
      "The encounter did not identify mania, hallucinations, delusions, psychosis or a current suicidal plan or intent.",
      "Jollotta discussed reconsidering fluoxetine and replacing lorazepam with longer-half-life diazepam for tapering."
    ],
    "caution": "Bipolar disorder was a possibility under assessment, not a confirmed diagnosis.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-dec6",
    "date": "2022-12-06",
    "displayDate": "December 6",
    "title": "Diazepam prescribed",
    "short": "5 mg · dispensing quantity uncertain",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Jollotta initiated diazepam as part of a longer-half-life benzodiazepine taper strategy.",
    "details": [
      "A 5 mg fill is represented in the existing timeline; its quantity is uncertain."
    ],
    "medication": "Diazepam 5 mg",
    "caution": "Dispensing quantity and actual use are unresolved.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "dec7",
    "date": "2022-12-07",
    "displayDate": "December 7",
    "title": "MyChart: medication plan revised",
    "short": "Fluoxetine held; quetiapine titration proposed",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "After reporting approximately four hours of sleep with diazepam and melatonin, Clancy again said she was not tired. Jollotta held fluoxetine and considered possible mixed or hypomanic symptoms.",
    "details": [
      "Quetiapine was proposed at 100, 200, 300 and 400 mg on successive nights.",
      "Olanzapine with fluoxetine was discussed but not prescribed or taken.",
      "Diazepam tapering continued."
    ],
    "medication": "Quetiapine titration planned; fluoxetine held",
    "caution": "The 400 mg target was planned; use at that dose was not established.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-dec7",
    "date": "2022-12-07",
    "displayDate": "December 7",
    "title": "Quetiapine and diazepam fills",
    "short": "Quetiapine 100 mg · diazepam 5 mg ×2",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Quetiapine 100 mg and two 5 mg diazepam tablets were filled.",
    "details": [
      "The quetiapine dispensing quantity is uncertain in the curated material.",
      "The same-day quetiapine escalation was a treatment plan."
    ],
    "medication": "Quetiapine 100 mg; diazepam 5 mg",
    "caution": "The fill does not establish later use of the 300 or 400 mg targets.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "msg-dec8",
    "date": "2022-12-08",
    "displayDate": "December 8",
    "title": "MyChart: improved sleep, then panic",
    "short": "Diazepam + quetiapine reported; doses unknown",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported taking diazepam and quetiapine and sleeping from about 9 p.m. to 5 a.m. with awakenings, followed by panic.",
    "details": [
      "She asked for a slower diazepam taper.",
      "The message did not identify the doses taken."
    ],
    "medication": "Diazepam + quetiapine reported",
    "caution": "Planned titration steps cannot be used to fill in unreported doses.",
    "recordType": "Curated care communication"
  },
  {
    "id": "call-dec9",
    "date": "2022-12-09",
    "displayDate": "December 9",
    "title": "Phone follow-up: mood and safety",
    "short": "Better sleep; suicidal thoughts without plan or intent",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Jollotta spoke with Clancy and her spouse about improved sleep alongside panic, numbness, intrusive thoughts and suicidal thoughts without plan or intent.",
    "details": [
      "Women & Infants partial-hospital care was encouraged.",
      "The quetiapine plan continued while a possible mixed or activated state was assessed."
    ],
    "caution": "The diagnostic formulation remained uncertain.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-dec9",
    "date": "2022-12-09",
    "displayDate": "December 9",
    "title": "Diazepam fill",
    "short": "5 mg ×8",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "A supply of eight diazepam 5 mg tablets was filled.",
    "details": [
      "The fill was part of the benzodiazepine taper strategy."
    ],
    "medication": "Diazepam 5 mg",
    "caution": "Dispensing does not establish the dose taken each night.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "dec12",
    "date": "2022-12-12",
    "displayDate": "December 12",
    "title": "MyChart: sleep improves, low mood persists",
    "short": "Quetiapine 200 mg + diazepam 2.5 mg reported",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported taking quetiapine 200 mg plus diazepam 2.5 mg for three nights, with seven to eight hours of deep sleep.",
    "details": [
      "She continued to describe marked depression and poor motivation.",
      "The reported quetiapine dose was 200 mg."
    ],
    "medication": "Quetiapine 200 mg + diazepam 2.5 mg reported",
    "caution": "The earlier planned 400 mg target was not established as taken.",
    "recordType": "Curated care communication"
  },
  {
    "id": "dec12-dukes",
    "date": "2022-12-12",
    "displayDate": "December 12",
    "title": "Counseling follow-up: persistent suicidal ideation",
    "short": "Telehealth · referrals for structured care",
    "category": "visit",
    "clinician": "Latiesha Dukes, LMHC",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported continuing suicidal ideation without a plan or attempt and a second Aspire crisis contact during another difficult weekend.",
    "details": [
      "Dukes reviewed support from family, prior use of crisis services and willingness to follow treatment recommendations.",
      "Clancy reported a plan to begin a Norwell partial-hospital program on December 20.",
      "With consent, Dukes initiated a separate Women & Infants referral.",
      "Dukes did not identify a need for an emergency safety intervention during this encounter."
    ],
    "caution": "The Aspire contact and program plans were patient reported; safety findings apply to this encounter.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "dec13",
    "date": "2022-12-13",
    "displayDate": "December 13",
    "title": "Psychiatry follow-up: hopelessness and numbness",
    "short": "Telehealth · sleep restored, motivation remains low",
    "category": "visit",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported seven to nine hours of sleep but persistent hopelessness, numbness and poor motivation.",
    "details": [
      "She denied current suicidal ideation.",
      "The EPDS self-harm item indicated thoughts sometimes during the preceding week.",
      "Jollotta did not observe mania or psychosis."
    ],
    "caution": "Current denial and symptoms reported over the prior week cover different time windows.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-dec13",
    "date": "2022-12-13",
    "displayDate": "December 13",
    "title": "Diazepam taper prescription",
    "short": "2 mg ×7",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Diazepam 2 mg, quantity seven, was filled as tapering continued.",
    "details": [
      "The associated plan was 2 mg nightly."
    ],
    "medication": "Diazepam 2 mg",
    "caution": "The planned dose does not establish adherence.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "dec15",
    "date": "2022-12-15",
    "displayDate": "December 15",
    "title": "Phone contact: higher-level care discussed",
    "short": "Persistent suicidal thoughts; no active plan",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy and her spouse described a particularly difficult day with persistent intrusive suicidal thoughts but no active plan.",
    "details": [
      "Both agreed that a higher level of care might be needed.",
      "Jollotta discussed MGH emergency assessment, possible McLean care and sharing treatment information."
    ],
    "caution": "This summarizes the care-team exchange; it does not reconstruct the full emergency assessment.",
    "recordType": "Curated care communication"
  },
  {
    "id": "mgh-dec15",
    "date": "2022-12-15",
    "displayDate": "December 15",
    "title": "MGH emergency assessment",
    "short": "Evaluation after higher-level care discussion",
    "category": "hospital",
    "institution": "Massachusetts General Hospital",
    "summary": "Clancy attended the MGH emergency department after the December 15 care-team discussion.",
    "details": [
      "Subsequent clinical follow-up describes plans to pursue Women & Infants care.",
      "The complete MGH assessment and disposition documentation are unavailable in this curated dataset."
    ],
    "caution": "Exact recommendations and discharge details cannot be verified from the original hospital chart.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "tufts-dec16",
    "date": "2022-12-16",
    "displayDate": "December 16",
    "title": "Psychiatry follow-up after MGH",
    "short": "Telehealth · depression despite improved sleep",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported that sleep had improved while daytime depression, poor motivation and hopelessness persisted.",
    "details": [
      "She described prior suicidal thoughts in the context of hopelessness and fear of not improving, without intent or plan.",
      "She reported quetiapine 200 mg with diazepam and was awaiting Women & Infants care.",
      "Tufts prescribed lamotrigine 25 mg."
    ],
    "caution": "Reported use, a prescription and a planned dose change are distinct.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "dec16",
    "date": "2022-12-16",
    "displayDate": "December 16",
    "title": "MyChart: medication plan after MGH",
    "short": "Quetiapine target increased; lamotrigine discussed",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy told Jollotta that quetiapine 200 mg plus diazepam 2 mg helped sleep but had not improved mood.",
    "details": [
      "Jollotta recommended quetiapine 300 mg.",
      "Clancy asked about Tufts’s recommendation for lamotrigine 25 mg.",
      "Jollotta endorsed the plan and discussed rash precautions and gradual titration."
    ],
    "medication": "Lamotrigine 25 mg endorsed; quetiapine 300 mg planned",
    "caution": "Neither the endorsement nor the quetiapine target establishes ingestion or a confirmed diagnosis.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-dec16",
    "date": "2022-12-16",
    "displayDate": "December 16",
    "title": "Lamotrigine prescribed and filled",
    "short": "25 mg ×30 · use unknown",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts prescribed lamotrigine 25 mg, and a 30-tablet supply was filled.",
    "details": [
      "Jollotta endorsed the plan and provided counseling about rash and slow titration.",
      "Whether Clancy took lamotrigine is not established within the selected treatment history."
    ],
    "medication": "Lamotrigine 25 mg",
    "caution": "The prescription and fill do not establish use.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "msg-dec19",
    "date": "2022-12-19",
    "displayDate": "December 19",
    "title": "MyChart: intermittent diazepam use",
    "short": "2 mg every other night reported",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported using diazepam 2 mg every other night and asked for a refill before Women & Infants care.",
    "details": [
      "Jollotta had recommended daily dosing."
    ],
    "medication": "Diazepam 2 mg every other night reported",
    "caution": "The message is not a complete dosing record.",
    "recordType": "Curated care communication"
  },
  {
    "id": "dec19-dukes",
    "date": "2022-12-19",
    "displayDate": "December 19",
    "title": "Counseling follow-up: partial improvement",
    "short": "Telehealth · engagement improves; low mood remains",
    "category": "visit",
    "clinician": "Latiesha Dukes, LMHC",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy reported continuing low mood and numbness, with no suicidal ideation or crisis need over the preceding weekend and some improvement in sleep.",
    "details": [
      "Dukes described greater engagement and an ability to smile and laugh.",
      "Low mood and numbness still affected most of the day.",
      "Women & Infants contact and referral plans were reviewed.",
      "The counselor did not yet have the full account of the preceding MGH emergency visit."
    ],
    "caution": "Improved engagement does not by itself establish recovery.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-dec19",
    "date": "2022-12-19",
    "displayDate": "December 19",
    "title": "Quetiapine ER and diazepam fills",
    "short": "300 mg ×30 · 2 mg ×14",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Quetiapine ER 300 mg, quantity 30, and diazepam 2 mg, quantity 14, were filled.",
    "details": [
      "The quetiapine fill followed a recommendation to increase the dose."
    ],
    "medication": "Quetiapine ER 300 mg; diazepam 2 mg",
    "caution": "The 300 mg fill does not establish an increase from the previously reported 200 mg dose.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "wi",
    "date": "2022-12-20",
    "displayDate": "December 20",
    "title": "Women & Infants program assessment",
    "short": "Perinatal program pathway reviewed",
    "category": "hospital",
    "institution": "Women & Infants",
    "summary": "Clancy attended a Women & Infants program assessment and subsequently continued planning outpatient care.",
    "details": [
      "A general partial-hospital program was discussed as an alternative.",
      "The complete assessment record is unavailable in this curated dataset."
    ],
    "caution": "Program recommendations are summarized from the existing timeline and have not been verified against the original chart.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "taper",
    "date": "2022-12-21",
    "displayDate": "December 21",
    "title": "MyChart: quetiapine taper plan",
    "short": "200 → 100 → 50 mg → stop",
    "category": "message",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Jollotta sent a plan for quetiapine 200 mg for four nights, 100 mg for four nights, 50 mg for four nights, then discontinuation.",
    "details": [
      "A nurse reviewed the possibility of worsening mood or sleep and confirmed that Clancy still wished to taper.",
      "DBT-group information was provided."
    ],
    "medication": "Quetiapine taper planned",
    "caution": "The intended taper schedule does not establish every dose taken.",
    "recordType": "Curated care communication"
  },
  {
    "id": "rx-dec21",
    "date": "2022-12-21",
    "displayDate": "December 21",
    "title": "Quetiapine taper supply",
    "short": "100 mg ×14",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Quetiapine 100 mg, quantity 14, was filled to support the taper.",
    "details": [
      "The planned steps were 200, 100 and 50 mg, then discontinuation."
    ],
    "medication": "Quetiapine 100 mg",
    "caution": "Supply does not establish adherence to the schedule.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "rx-dec22",
    "date": "2022-12-22",
    "displayDate": "December 22",
    "title": "Additional quetiapine taper supply",
    "short": "25 mg ×14",
    "category": "medication",
    "clinician": "Rebecca H. Jollotta, CNP",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Quetiapine 25 mg, quantity 14, was filled as part of the taper supply.",
    "details": [
      "The smaller tablets supported planned dose reductions."
    ],
    "medication": "Quetiapine 25 mg",
    "caution": "A dispensing event does not establish ingestion.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "dec27-dukes",
    "date": "2022-12-27",
    "displayDate": "December 27",
    "title": "Counseling phone follow-up",
    "short": "Referral completed; medication concerns redirected",
    "category": "message",
    "clinician": "Latiesha Dukes, LMHC",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Dukes contacted Clancy about referral completion and, with her consent, spoke with her spouse about prescription concerns.",
    "details": [
      "Dukes redirected medication-management questions to the prescribing clinician."
    ],
    "caution": "This contact documents coordination and concerns, not a new prescription or medication reconciliation.",
    "recordType": "Curated care communication"
  },
  {
    "id": "call-dec30",
    "date": "2022-12-30",
    "displayDate": "December 30",
    "title": "Clinic phone contact: hospital placement",
    "short": "Family seeks guidance about McLean admission",
    "category": "message",
    "clinician": "South Shore clinic staff",
    "institution": "South Shore Perinatal Behavioral Health",
    "summary": "Clancy’s spouse called the South Shore clinic for guidance on McLean placement.",
    "details": [
      "The clinic entry described Clancy as safe at the time of the call.",
      "Staff advised the emergency-department or emergency-services pathway because beds could not be held."
    ],
    "caution": "This is a family report to the clinic, not a direct mental-status assessment.",
    "recordType": "Curated care communication"
  },
  {
    "id": "mgh-dec30",
    "date": "2022-12-30",
    "displayDate": "December 30",
    "title": "MGH presentation before transfer",
    "short": "Late December · exact date uncertain",
    "category": "hospital",
    "institution": "MGH",
    "summary": "Clancy presented to MGH before the January 1 voluntary transfer to McLean.",
    "details": [
      "A December 30 clinic contact documents the family seeking guidance on McLean admission.",
      "The sequence across December 29–31 is not fully resolved."
    ],
    "caution": "The displayed December 30 position is approximate; it is not a verified arrival timestamp.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "mclean",
    "date": "2023-01-01",
    "displayDate": "January 1–5",
    "title": "McLean inpatient admission",
    "short": "January 1–5 · voluntary psychiatric care",
    "category": "hospital",
    "clinician": "Alia Goodheart, MD",
    "institution": "McLean Hospital",
    "summary": "The provisional admitting formulation was severe major depression without psychotic features; bipolar disorder was considered but not firmly established.",
    "details": [
      "Early assessments described numbness or hospital anxiety, improved sleep at a lower quetiapine dose, and denial of delusions, hallucinations, suicidal or homicidal ideation.",
      "On January 3, Goodheart described anxiety with linear, goal-directed thought and no psychosis.",
      "The inpatient team did not have immediate access to the complete South Shore or Aster charts.",
      "Care included nursing contacts and groups addressing symptoms, self-compassion, medications and expressive therapy.",
      "Quetiapine was tapered through approximately 75, 50 and 25 mg before stopping; diazepam was changed to lorazepam, with trazodone and melatonin for sleep.",
      "Duloxetine was discussed as a possible later outpatient option and was not started during the admission."
    ],
    "medication": "Quetiapine taper; lorazepam; trazodone; melatonin",
    "caution": "This is a curated admission summary; individual administration times and the full inpatient chart are unavailable.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "discharge",
    "date": "2023-01-05",
    "displayDate": "January 5",
    "title": "McLean discharge",
    "short": "January 5 · next-day psychiatry follow-up arranged",
    "category": "hospital",
    "clinician": "Alia Goodheart, MD",
    "institution": "McLean Hospital",
    "summary": "Clancy requested an earlier discharge because of hospital anxiety. Discharge was arranged after a next-day outpatient psychiatry appointment was confirmed.",
    "details": [
      "The discharge assessment did not identify an acute safety concern.",
      "Planning included outpatient follow-up, case-management resources, crisis planning and after-visit information.",
      "Trazodone and lorazepam were prescribed; melatonin was planned and no further quetiapine was planned."
    ],
    "caution": "A discharge assessment describes that point in time.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "rx-jan5",
    "date": "2023-01-05",
    "displayDate": "January 5",
    "title": "Discharge prescriptions",
    "short": "Trazodone 50 mg ×28 · lorazepam 1 mg ×14",
    "category": "medication",
    "clinician": "Alia Goodheart, MD",
    "institution": "McLean Hospital",
    "summary": "McLean discharge prescriptions included trazodone 50 mg, quantity 28, and lorazepam 1 mg, quantity 14.",
    "details": [
      "The medications were described as short-term or as-needed treatment.",
      "Melatonin was included in the plan; quetiapine was to stop."
    ],
    "medication": "Trazodone 50 mg; lorazepam 1 mg; melatonin planned",
    "caution": "Home dosing is not established by the discharge prescriptions.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "jan6",
    "date": "2023-01-06",
    "displayDate": "January 6",
    "title": "Psychiatry follow-up after discharge",
    "short": "Telehealth · mood remains low and numb",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported continuing depression and numbness after the quetiapine taper, with rebound anxiety as lorazepam wore off.",
    "details": [
      "She reported trazodone 100 mg, lorazepam 1 mg and melatonin 5 mg.",
      "She denied suicidal and homicidal ideation and psychotic symptoms.",
      "Tufts planned trazodone 150 mg and observation after stopping quetiapine before adding another antidepressant.",
      "Tufts had a discharge summary but not the complete inpatient chart."
    ],
    "medication": "Trazodone 100 mg + lorazepam 1 mg + melatonin 5 mg reported",
    "caution": "Medication use was patient reported.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "tufts-jan9",
    "date": "2023-01-09",
    "displayDate": "January 9",
    "title": "Psychiatry follow-up: rebound anxiety",
    "short": "Telehealth · taper approach reviewed",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported rebound anxiety as nighttime lorazepam wore off, with flat mood but some ability to laugh and no recent suicidal thoughts.",
    "details": [
      "She denied homicidal ideation; no psychosis was observed.",
      "Amitriptyline and bupropion were discussed without selecting a new antidepressant that day.",
      "Lorazepam was replaced with diazepam for a longer-half-life taper."
    ],
    "caution": "Discussed medication options were not necessarily prescribed or taken.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "jan9",
    "date": "2023-01-09",
    "displayDate": "January 9",
    "title": "Lorazepam changed to diazepam",
    "short": "5 mg ×14 · taper strategy",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts replaced lorazepam with diazepam to address rebound anxiety and support tapering.",
    "details": [
      "Diazepam 5 mg, quantity 14, was filled."
    ],
    "medication": "Diazepam 5 mg",
    "caution": "Dispensing does not establish the subsequent dosing schedule.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "ketamine",
    "date": "2023-01-11",
    "displayDate": "January 11",
    "title": "MyChart: asks about ketamine",
    "short": "Low mood and minimal motivation",
    "category": "message",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy asked about ketamine while describing very low mood, limited motivation and a desire for faster relief.",
    "details": [
      "Tufts discussed the treatment history typically reviewed before considering ketamine."
    ],
    "caution": "The exchange does not establish ketamine prescription or treatment.",
    "recordType": "Curated care communication"
  },
  {
    "id": "traz150",
    "date": "2023-01-12",
    "displayDate": "January 12",
    "title": "Trazodone dose increased",
    "short": "150 mg ×30",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts prescribed trazodone 150 mg, and a 30-tablet supply was filled.",
    "details": [
      "The intended dose increased from the previously reported 100 mg."
    ],
    "medication": "Trazodone 150 mg",
    "caution": "The prescription does not establish the dose taken every night.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "rx-jan13",
    "date": "2023-01-13",
    "displayDate": "January 13",
    "title": "Diazepam fill",
    "short": "2 mg ×7 · prescriber unresolved",
    "category": "medication",
    "summary": "A seven-tablet supply of diazepam 2 mg is represented in the existing timeline.",
    "details": [
      "Prescriber attribution is unresolved in the curated material."
    ],
    "medication": "Diazepam 2 mg",
    "caution": "The fill does not establish ingestion or a complete taper schedule.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "jan16",
    "date": "2023-01-16",
    "displayDate": "January 16",
    "title": "Psychiatry follow-up: impaired functioning",
    "short": "Telehealth · very low mood and numbness",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported very low mood, numbness, difficulty getting out of bed and impairment in basic care and bonding.",
    "details": [
      "She described forcing herself to attend to hygiene, eating and infant care.",
      "She denied suicidal and homicidal ideation and psychotic symptoms.",
      "Amitriptyline 10 mg was prescribed; diazepam tapering continued."
    ],
    "caution": "Reported difficulty functioning can coexist with completing necessary daily activities.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-jan16",
    "date": "2023-01-16",
    "displayDate": "January 16",
    "title": "Amitriptyline started in treatment plan",
    "short": "10 mg ×30 · diazepam taper continues",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts prescribed amitriptyline 10 mg and continued the diazepam taper; both medications were dispensed.",
    "details": [
      "Amitriptyline 10 mg, quantity 30, was filled.",
      "Diazepam 2 mg was dispensed; its original quantity is unresolved."
    ],
    "medication": "Amitriptyline 10 mg; diazepam 2 mg",
    "caution": "These fills do not establish doses taken.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "rx-jan19",
    "date": "2023-01-19",
    "displayDate": "January 19",
    "title": "Diazepam refill",
    "short": "2 mg ×14 · prescriber unresolved",
    "category": "medication",
    "summary": "A 14-tablet supply of diazepam 2 mg is represented in the existing timeline.",
    "details": [
      "Prescriber attribution remains unresolved."
    ],
    "medication": "Diazepam 2 mg",
    "caution": "The refill does not establish daily dosing or adherence.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "jan23",
    "date": "2023-01-23",
    "displayDate": "January 23",
    "title": "Psychiatry follow-up: persistent depression",
    "short": "Telehealth · sleep adequate; morning anxiety",
    "category": "visit",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Clancy reported starting amitriptyline 10 mg without apparent side effects and reducing diazepam to 2 mg, with more morning anxiety.",
    "details": [
      "She remained depressed, flat and poorly motivated, while describing sleep as adequate.",
      "She denied suicidal and homicidal ideation.",
      "Tufts described appropriate appearance, speech, thought process, cognition and psychomotor activity, with no mania or psychosis.",
      "Amitriptyline was increased to 20 mg and the diazepam taper was slowed."
    ],
    "caution": "The ordered increase does not establish that a 20 mg dose was taken.",
    "recordType": "Curated encounter summary"
  },
  {
    "id": "rx-jan23",
    "date": "2023-01-23",
    "displayDate": "January 23",
    "title": "Amitriptyline dose increase ordered",
    "short": "20 mg planned · diazepam taper slowed",
    "category": "medication",
    "clinician": "Jennifer Tufts, MD",
    "institution": "Aster Mental Health",
    "summary": "Tufts increased the prescribed amitriptyline dose from 10 to 20 mg and slowed diazepam tapering.",
    "details": [
      "Clancy reported starting 10 mg without apparent side effects.",
      "A diazepam 2 mg fill is represented with an uncertain quantity."
    ],
    "medication": "Amitriptyline 20 mg prescribed; diazepam 2 mg",
    "caution": "Whether the 20 mg amitriptyline dose was taken is unknown.",
    "recordType": "Curated medication summary"
  },
  {
    "id": "jan26",
    "date": "2023-01-26",
    "displayDate": "January 26",
    "title": "Hospital psychiatry consultation",
    "short": "Communication and safety assessment",
    "category": "hospital",
    "clinician": "Jhilam Biswas, MD",
    "institution": "Brigham and Women’s Hospital",
    "summary": "While intubated, Clancy communicated through written responses during a psychiatric assessment.",
    "details": [
      "The assessment described linear communication and no psychosis during the encounter.",
      "The consultation team recommended suicide precautions and trauma-informed care while evaluating safety before spine surgery."
    ],
    "caution": "The 20–30 minute assessment describes that encounter only.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "delirium",
    "date": "2023-01-29",
    "displayDate": "January 29–30",
    "title": "Postoperative delirium follow-up",
    "short": "January 29–30 · confusion and visual hallucinations resolve",
    "category": "hospital",
    "clinician": "Sejal Shah, MD",
    "institution": "Brigham and Women’s Hospital",
    "summary": "Shah identified postoperative delirium with confusion and visual hallucinations in the setting of anesthesia, oxygen desaturation, tachycardia and acute medical illness.",
    "details": [
      "By January 30 the delirium was described as resolved.",
      "The follow-up described calm, cooperative, organized and goal-directed behavior, fair insight and judgment, and denial of suicidal or homicidal ideation, ongoing hallucinations and delusions."
    ],
    "caution": "These findings describe the postoperative treatment period.",
    "recordType": "Curated hospital care summary"
  },
  {
    "id": "feb",
    "date": "2023-02-20",
    "displayDate": "February 19–21",
    "title": "Rehabilitation-focused follow-up",
    "short": "February 19–21 · orientation and goals reviewed",
    "category": "visit",
    "clinician": "Sejal Shah, MD",
    "summary": "Shah described orientation and future-oriented thinking about rehabilitation, alongside low mood related to paralysis.",
    "details": [
      "Clancy denied suicidal and homicidal ideation and auditory or visual hallucinations."
    ],
    "caution": "The date represents an assessment range rather than a single verified appointment.",
    "recordType": "Curated encounter summary"
  }
];

export const medications: Medication[] = [
  {
    "name": "Zoloft",
    "generic": "sertraline",
    "color": "#9c6ae4",
    "className": "SSRI",
    "summary": "Prescribed in September, started later, then discontinued after reported worsening sleep and anxiety.",
    "segments": [
      {
        "start": "2022-09-15",
        "end": "2022-09-22",
        "label": "25 mg",
        "status": "prescribed",
        "note": "Planned first week of treatment. Clancy subsequently reported that she had not started sertraline during this period."
      },
      {
        "start": "2022-09-22",
        "end": "2022-09-29",
        "label": "50 mg",
        "status": "planned",
        "note": "Planned second step of the September prescription; use during this interval was not established."
      },
      {
        "start": "2022-10-20",
        "label": "25 → 50 mg reported",
        "status": "reported",
        "note": "At the October 20 visit, Clancy reported a later start at 25 mg and increase to 50 mg before stopping. Exact start dates, duration and adherence are uncertain."
      }
    ]
  },
  {
    "name": "Ativan",
    "generic": "lorazepam",
    "color": "#dc7796",
    "className": "Benzodiazepine",
    "summary": "Short-term anxiety and sleep treatment with outpatient taper plans and later inpatient use.",
    "segments": [
      {
        "start": "2022-10-21",
        "end": "2022-10-26",
        "label": "0.5 mg",
        "status": "prescribed",
        "note": "Seven 0.5 mg tablets were prescribed and filled for severe anxiety as needed. This span connects treatment decisions, not confirmed daily use."
      },
      {
        "start": "2022-10-26",
        "end": "2022-11-02",
        "label": "1 mg",
        "status": "prescribed",
        "note": "A 30-tablet supply of 1 mg was filled; actual frequency is unknown."
      },
      {
        "start": "2022-11-02",
        "end": "2022-11-16",
        "label": "0.75 mg",
        "status": "planned",
        "note": "Planned taper step for two weeks. A 0.5 mg tablet supply was filled, but actual doses are unresolved."
      },
      {
        "start": "2022-11-16",
        "end": "2022-12-05",
        "label": "0.5 mg",
        "status": "planned",
        "note": "Planned next taper step. Continued use was reported during care, but not continuously confirmed."
      },
      {
        "start": "2022-12-02",
        "label": "1 mg reported",
        "status": "reported",
        "note": "Clancy reported taking 1 mg after intrusive thoughts and returning to sleep."
      },
      {
        "start": "2022-12-03",
        "label": "0.5 mg reported",
        "status": "reported",
        "note": "Clancy reported a 0.5 mg dose and short-term relief."
      },
      {
        "start": "2023-01-01",
        "end": "2023-01-05",
        "label": "Inpatient plan",
        "status": "inpatient",
        "note": "McLean replaced diazepam with lorazepam; the discharge prescription strength was 1 mg. Individual administration times are unavailable."
      },
      {
        "start": "2023-01-05",
        "label": "1 mg ×14",
        "status": "prescribed",
        "note": "A 14-tablet supply was prescribed at discharge for short-term or as-needed use."
      },
      {
        "start": "2023-01-06",
        "label": "1 mg reported",
        "status": "reported",
        "note": "Clancy specifically reported taking 1 mg at follow-up. Lorazepam was replaced with diazepam in the January 9 plan."
      }
    ]
  },
  {
    "name": "Buspar",
    "generic": "buspirone",
    "color": "#7f84ce",
    "className": "Anxiolytic",
    "summary": "Prescribed as a daily non-benzodiazepine option; initially not started and later use unknown.",
    "segments": [
      {
        "start": "2022-10-26",
        "label": "5 mg ×30",
        "status": "prescribed",
        "note": "A 30-tablet supply was filled. On November 2 Clancy reported that she had not started it."
      },
      {
        "start": "2022-11-09",
        "label": "5 mg ×30",
        "status": "prescribed",
        "note": "A second supply was filled; subsequent use is not established."
      }
    ]
  },
  {
    "name": "Hydroxyzine",
    "generic": "hydroxyzine",
    "color": "#7aa1cd",
    "className": "Antihistamine",
    "summary": "Offered as an alternative for anxiety or sleep; ingestion is not established.",
    "segments": [
      {
        "start": "2022-10-26",
        "label": "25 mg ×30",
        "status": "prescribed",
        "note": "A 30-tablet supply was prescribed and filled; use is unknown. A later offer at the November 29 visit was declined."
      }
    ]
  },
  {
    "name": "Desyrel",
    "generic": "trazodone",
    "color": "#269f9a",
    "className": "Antidepressant / sleep treatment",
    "summary": "Used in sleep treatment plans after emergency care, during McLean admission and in outpatient follow-up.",
    "segments": [
      {
        "start": "2022-11-16",
        "label": "50 mg ×30",
        "status": "prescribed",
        "note": "Filled after the emergency-department visit. Clancy later reported help falling asleep but not maintaining sleep."
      },
      {
        "start": "2022-12-01",
        "label": "50–150 mg history",
        "status": "reported",
        "note": "During the December 1 visit Clancy described prior trazodone doses from 50 to 150 mg with minimal benefit; exact dates and duration were not established."
      },
      {
        "start": "2023-01-01",
        "end": "2023-01-05",
        "label": "50 mg / as needed",
        "status": "inpatient",
        "note": "Used in the inpatient sleep plan; the discharge prescription strength was 50 mg. Individual doses and administration times are unavailable."
      },
      {
        "start": "2023-01-05",
        "label": "50 mg ×28",
        "status": "prescribed",
        "note": "A 28-tablet supply was filled at discharge."
      },
      {
        "start": "2023-01-06",
        "label": "100 mg reported",
        "status": "reported",
        "note": "Clancy reported taking 100 mg at the January 6 follow-up."
      },
      {
        "start": "2023-01-12",
        "label": "150 mg ×30",
        "status": "prescribed",
        "note": "The prescription increased to 150 mg; a 30-tablet supply was filled. Nightly adherence is unknown."
      }
    ]
  },
  {
    "name": "Prozac",
    "generic": "fluoxetine",
    "color": "#c7a34c",
    "className": "SSRI",
    "summary": "Brief November trial; a later retrial was considered and then held.",
    "segments": [
      {
        "start": "2022-11-21",
        "label": "10 mg ×56",
        "status": "prescribed",
        "note": "A 56-tablet supply was filled with an intended increase to 20 mg only if tolerated."
      },
      {
        "start": "2022-11-22",
        "end": "2022-11-25",
        "label": "10 mg reported",
        "status": "reported",
        "note": "Clancy reported beginning November 22; treatment was stopped after a brief trial with worsening sleep and disconnection. The planned 20 mg step was not established as taken."
      },
      {
        "start": "2022-11-30",
        "end": "2022-12-07",
        "label": "Retrial considered",
        "status": "planned",
        "note": "A 10 mg retrial was discussed, then held. December use is not established."
      }
    ]
  },
  {
    "name": "Ambien",
    "generic": "zolpidem",
    "color": "#c38ac6",
    "className": "Sedative-hypnotic",
    "summary": "A one-dose trial was filled; ingestion is unknown. A later higher-dose offer was declined.",
    "segments": [
      {
        "start": "2022-11-25",
        "label": "5 mg ×1",
        "status": "prescribed",
        "note": "One 5 mg tablet was prescribed and filled as a single-dose trial; use is not established."
      }
    ]
  },
  {
    "name": "Remeron",
    "generic": "mirtazapine",
    "color": "#d084a5",
    "className": "Antidepressant",
    "summary": "Brief, interrupted treatment in late November and early December, with symptoms reported during care-team messages.",
    "segments": [
      {
        "start": "2022-11-25",
        "label": "7.5 mg ×30",
        "status": "prescribed",
        "note": "A 30-tablet supply was filled."
      },
      {
        "start": "2022-11-26",
        "label": "7.5 mg reported",
        "status": "reported",
        "note": "Clancy reported taking 7.5 mg with clonazepam 0.5 mg and sleeping."
      },
      {
        "start": "2022-11-27",
        "end": "2022-12-02",
        "label": "15 mg reported",
        "status": "reported",
        "note": "A 15 mg dose was reported on November 27 and 29 and in a stop/restart sequence through December 2. The span does not imply uninterrupted daily use."
      }
    ]
  },
  {
    "name": "Klonopin",
    "generic": "clonazepam",
    "color": "#d79676",
    "className": "Benzodiazepine",
    "summary": "Brief combination with mirtazapine; stopping was discussed after feeling disconnected.",
    "segments": [
      {
        "start": "2022-11-25",
        "label": "0.5 mg ×14",
        "status": "prescribed",
        "note": "A 14-tablet supply was filled. Instructions included not combining with lorazepam."
      },
      {
        "start": "2022-11-26",
        "end": "2022-11-28",
        "label": "0.5 mg reported",
        "status": "reported",
        "note": "Clancy reported 0.5 mg on two nights with mirtazapine, then discussed stopping after feeling disconnected. Dates are approximate within the reported sequence."
      }
    ]
  },
  {
    "name": "Seroquel",
    "generic": "quetiapine",
    "color": "#4b9fc1",
    "className": "Second-generation antipsychotic",
    "summary": "Initially targeted sleep, then a possible mood-related indication, before outpatient and inpatient tapering.",
    "segments": [
      {
        "start": "2022-11-30",
        "label": "25 mg ×30",
        "status": "prescribed",
        "note": "A 30-tablet supply was filled for insomnia."
      },
      {
        "start": "2022-12-01",
        "end": "2022-12-03",
        "label": "25 mg reported",
        "status": "reported",
        "level": 1,
        "note": "Clancy reported 25 mg with mirtazapine during the December 1–2 message sequence."
      },
      {
        "start": "2022-12-02",
        "end": "2022-12-06",
        "label": "50 mg target",
        "status": "planned",
        "note": "Jollotta recommended 50 mg for sleep; use at this dose is not established."
      },
      {
        "start": "2022-12-07",
        "end": "2022-12-08",
        "label": "100 mg target",
        "status": "planned",
        "note": "First proposed step in a four-night titration."
      },
      {
        "start": "2022-12-08",
        "end": "2022-12-09",
        "label": "200 mg target",
        "status": "planned",
        "note": "Second proposed titration step."
      },
      {
        "start": "2022-12-09",
        "end": "2022-12-10",
        "label": "300 mg target",
        "status": "planned",
        "note": "Third proposed step; use at this dose was not established."
      },
      {
        "start": "2022-12-10",
        "end": "2022-12-11",
        "label": "400 mg target",
        "status": "planned",
        "note": "Recommended target only; 400 mg was not established as taken."
      },
      {
        "start": "2022-12-09",
        "end": "2022-12-17",
        "label": "200 mg reported",
        "status": "reported",
        "level": 1,
        "note": "On December 12 Clancy reported 200 mg for the preceding three nights; 200 mg remained the reported dose at December 16 follow-up. Daily adherence is not independently confirmed."
      },
      {
        "start": "2022-12-16",
        "end": "2022-12-20",
        "label": "300 mg target",
        "status": "planned",
        "note": "A 300 mg dose was recommended and an ER supply was filled December 19; use at 300 mg is unknown."
      },
      {
        "start": "2022-12-21",
        "end": "2022-12-25",
        "label": "200 mg taper",
        "status": "planned",
        "note": "First four-night step of the outpatient taper."
      },
      {
        "start": "2022-12-25",
        "end": "2022-12-29",
        "label": "100 mg taper",
        "status": "planned",
        "note": "Second four-night step of the outpatient taper."
      },
      {
        "start": "2022-12-29",
        "end": "2023-01-02",
        "label": "50 mg taper",
        "status": "planned",
        "note": "Final planned outpatient dose before stopping; the inpatient team subsequently adjusted the taper."
      },
      {
        "start": "2023-01-01",
        "end": "2023-01-02",
        "label": "75 mg taper",
        "status": "inpatient",
        "level": 1,
        "note": "McLean taper sequence was approximately 75 → 50 → 25 mg → stop. Day boundaries are approximate; individual administration times are unavailable."
      },
      {
        "start": "2023-01-02",
        "end": "2023-01-03",
        "label": "50 mg taper",
        "status": "inpatient",
        "level": 1,
        "note": "Intermediate inpatient taper step; the day boundary is approximate."
      },
      {
        "start": "2023-01-03",
        "end": "2023-01-05",
        "label": "25 mg taper",
        "status": "inpatient",
        "level": 1,
        "note": "Final inpatient taper step before discontinuation; no further quetiapine was planned at discharge."
      }
    ]
  },
  {
    "name": "Valium",
    "generic": "diazepam",
    "color": "#c1954e",
    "className": "Benzodiazepine",
    "summary": "Used in a longer-half-life taper strategy in December and again in January.",
    "segments": [
      {
        "start": "2022-12-06",
        "end": "2022-12-09",
        "label": "5 mg fills",
        "status": "prescribed",
        "note": "Short supplies were filled December 6, 7 and 9. The December 6 quantity is uncertain; later quantities were two and eight tablets."
      },
      {
        "start": "2022-12-09",
        "end": "2022-12-13",
        "label": "2.5 mg reported",
        "status": "reported",
        "note": "On December 12 Clancy reported 2.5 mg nightly for the preceding three nights."
      },
      {
        "start": "2022-12-13",
        "end": "2022-12-20",
        "label": "2 mg taper plan",
        "status": "planned",
        "note": "The December 13 plan was 2 mg nightly; actual frequency varied in later patient reports."
      },
      {
        "start": "2022-12-19",
        "label": "2 mg every other night",
        "status": "reported",
        "note": "Clancy reported using 2 mg every other night and requested a refill."
      },
      {
        "start": "2023-01-09",
        "label": "5 mg ×14",
        "status": "prescribed",
        "note": "Tufts changed lorazepam to diazepam; a 14-tablet supply was filled. Actual taper adherence is unknown."
      },
      {
        "start": "2023-01-13",
        "end": "2023-01-23",
        "label": "2 mg fills",
        "status": "prescribed",
        "note": "Multiple 2 mg supplies are represented. Some quantities and prescriber attribution remain unresolved; this span does not establish daily use."
      },
      {
        "start": "2023-01-23",
        "label": "2 mg reported",
        "status": "reported",
        "note": "Clancy reported being down to 2 mg, with more morning anxiety; tapering was slowed."
      }
    ]
  },
  {
    "name": "Lamictal",
    "generic": "lamotrigine",
    "color": "#6fa887",
    "className": "Mood stabilizer / anticonvulsant",
    "summary": "Prescribed and filled at 25 mg; actual use is unknown in the selected treatment history.",
    "segments": [
      {
        "start": "2022-12-16",
        "label": "25 mg ×30",
        "status": "prescribed",
        "note": "Tufts prescribed a 30-tablet supply; Jollotta endorsed the plan and discussed rash precautions and gradual titration. Ingestion was not established."
      }
    ]
  },
  {
    "name": "Elavil",
    "generic": "amitriptyline",
    "color": "#9887c8",
    "className": "Tricyclic antidepressant",
    "summary": "Prescribed in January, with a reported 10 mg start and a later ordered increase to 20 mg.",
    "segments": [
      {
        "start": "2023-01-16",
        "label": "10 mg ×30",
        "status": "prescribed",
        "note": "A 30-tablet supply was prescribed and filled."
      },
      {
        "start": "2023-01-23",
        "label": "10 mg reported",
        "status": "reported",
        "note": "At follow-up Clancy reported starting 10 mg without apparent side effects; the precise first dose date was not confirmed."
      },
      {
        "start": "2023-01-23",
        "label": "20 mg ordered",
        "status": "prescribed",
        "note": "Tufts ordered an increase to 20 mg. Whether this dose was taken is unknown."
      }
    ]
  }
];
