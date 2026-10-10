/**
 * Synthetic clinical demonstration: no real patient or source-chart content.
 * All people, organizations, messages, results and encounters are fictional.
 * Prescribed, dispensed, patient-reported and administered medication evidence
 * are distinguished in the narrative. Routine refill histories are summarized;
 * these selected encounters are not an exhaustive dispensing ledger. Timeline
 * spans are not adherence claims.
 * Patient-specific recorded plans are demonstration content, not medical advice.
 */
export type Category = 'visit' | 'message' | 'telephone' | 'lab' | 'hospital' | 'medication';
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
  "name": "Maya Bennett",
  "age": 42,
  "initials": "MB",
  "recordId": "DEMO-1042",
  "subtitle": "A fictional patient. A connected care journey.",
  "period": "January – June 2026",
  "startDate": "2026-01-05",
  "endDate": "2026-06-26",
  "summary": "Six months of connected care: new diabetes and blood-pressure treatment, an asthma admission, and the everyday messages, prescriptions and coordination that make recovery possible.",
  "conditions": [
    "Type 2 diabetes",
    "Hypertension",
    "Asthma",
    "Dyslipidemia",
    "Seasonal allergic rhinitis"
  ],
  "allergies": [
    "Penicillin — childhood rash (patient-reported; not independently verified)"
  ],
  "careTeam": [
    {
      "name": "Lena Ortiz, MD",
      "role": "Primary care"
    },
    {
      "name": "Jonah Ellis, RN",
      "role": "Clinical triage & transitions"
    },
    {
      "name": "Priya Soren, PharmD",
      "role": "Medication management"
    },
    {
      "name": "Tess Rowan, RDN",
      "role": "Diabetes education"
    },
    {
      "name": "Emery Chen, MD",
      "role": "Pulmonology"
    },
    {
      "name": "Nia Brooks",
      "role": "Scheduling & referrals"
    }
  ],
  "provenance": "Entirely synthetic demonstration. Patient, clinicians, institutions, messages, test results and care events are fictional. No real patient records or live EHR connection. Recorded treatment plans illustrate this fictional chart and are not medical advice."
};

export const categoryMeta: Record<Category, {label: string; color: string}> = {
  "visit": {
    "label": "Visits",
    "color": "#2b998a"
  },
  "message": {
    "label": "MyChart",
    "color": "#3b86b9"
  },
  "telephone": {
    "label": "Telephone",
    "color": "#bc9440"
  },
  "lab": {
    "label": "Labs & results",
    "color": "#66a6a2"
  },
  "hospital": {
    "label": "Hospital care",
    "color": "#5279b2"
  },
  "medication": {
    "label": "Medications",
    "color": "#936dc0"
  }
};

export const demoHighlights: {label: string; query: string; category?: Category}[] = [
  {
    "label": "Discharge & recovery",
    "query": "discharge"
  },
  {
    "label": "Scheduling & access",
    "query": "scheduling"
  },
  {
    "label": "Refills & prescriptions",
    "query": "refill"
  },
  {
    "label": "MyChart conversations",
    "query": "MyChart",
    "category": "message"
  }
];

export const events: TimelineEvent[] = [
  {
    "id": "jan05-registration",
    "date": "2026-01-05",
    "displayDate": "Jan 5",
    "title": "Telephone: establish primary care",
    "short": "Front desk · new-patient appointment booked",
    "category": "telephone",
    "summary": "Maya Bennett calls to establish care after moving within the fictional Harborlight service area.",
    "details": [
      "Patient: “I need a primary care doctor and help keeping my asthma prescriptions in one place. Early appointments work best before my library shift.”",
      "Nia Brooks, scheduling: Books January 6 at 8:20 AM with Dr. Ortiz; confirms the visit type, arrival instructions and preferred MyChart communication.",
      "Staff action: Sends electronic intake forms and records permission to leave generic appointment reminders. No clinical assessment or medication advice is provided."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan05-welcome",
    "date": "2026-01-05",
    "displayDate": "Jan 5",
    "title": "MyChart: welcome and intake",
    "short": "Patient goals · medication list requested",
    "category": "message",
    "summary": "A welcome thread collects Maya’s priorities and prepares the medication reconciliation.",
    "details": [
      "Nia Brooks, front desk: “Your January 6 visit is confirmed. Please complete the intake form and bring your inhalers and any medicine bottles.”",
      "Maya Bennett, patient: “My goals are to feel less tired, understand my blood pressure, and have one plan for my asthma. I have been thirstier recently.”",
      "Jonah Ellis, RN: Acknowledges the symptom report, completes a separate telephone symptom check and routes the intake information to the clinician. The scheduled visit remains in place.",
      "Thread status: Closed after the patient confirms receipt."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan06-intake",
    "date": "2026-01-06",
    "displayDate": "Jan 6",
    "title": "New-patient visit: a shared starting point",
    "short": "BP 152/94 · fatigue and thirst · asthma history",
    "category": "visit",
    "summary": "Dr. Ortiz establishes primary care and orders evaluation for elevated blood pressure, thirst and fatigue.",
    "details": [
      "Vitals: BP 152/94 mmHg, repeat 148/92; pulse 78; weight 87.4 kg; oxygen saturation 98% on room air.",
      "History: Mild persistent asthma diagnosed in adolescence, without a hospital stay in the prior five years. Maya reports budesonide inhaler use twice daily and albuterol less than once weekly before this visit.",
      "Medication reconciliation: Budesonide 180 mcg one inhalation twice daily and albuterol 90 mcg two puffs as needed are patient-reported existing prescriptions. Actual historical fills are not imported.",
      "Allergy review: Penicillin — childhood rash, patient-reported; no anaphylaxis described. The record marks the history for later clarification.",
      "Plan recorded for this fictional patient: Fasting metabolic and lipid panels, HbA1c, home blood-pressure log and a follow-up visit to review results."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan07-baseline-labs",
    "date": "2026-01-07",
    "displayDate": "Jan 7",
    "title": "Baseline labs: elevated glucose and A1c",
    "short": "HbA1c 8.4% · fasting glucose 168 mg/dL",
    "category": "lab",
    "summary": "The first synthetic laboratory panel provides a baseline for diabetes, lipid and kidney monitoring.",
    "details": [
      "HbA1c: 8.4%; fasting plasma glucose: 168 mg/dL.",
      "Lipid panel: LDL-C 146 mg/dL; HDL-C 48 mg/dL; triglycerides 182 mg/dL.",
      "Kidney / electrolytes: Creatinine 0.72 mg/dL; eGFR 104 mL/min/1.73 m²; potassium 4.1 mmol/L.",
      "Result workflow: Values are released to MyChart and routed to Dr. Ortiz. Diagnosis and treatment decisions appear in the January 9 visit."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan08-results-call",
    "date": "2026-01-08",
    "displayDate": "Jan 8",
    "title": "Telephone: results discussion arranged",
    "short": "RN callback · patient questions captured",
    "category": "telephone",
    "summary": "The triage nurse discusses the purpose of the next-day results appointment and records Maya’s questions.",
    "details": [
      "Jonah Ellis, RN: Confirms the clinician has reviewed the abnormal glucose results and verifies that Maya can attend January 9.",
      "Patient report: Fatigue and thirst are unchanged; no new vomiting, confusion or breathing concerns are reported in this fictional call.",
      "Maya asks whether she will need insulin and whether work meals can fit a diabetes plan. The questions are added to the visit agenda.",
      "Clinical handoff: RN routes the call to Dr. Ortiz; the front desk handles appointment logistics separately."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan09-diagnosis",
    "date": "2026-01-09",
    "displayDate": "Jan 9",
    "title": "Diabetes and hypertension: first care plan",
    "short": "New diagnoses · goals chosen together",
    "category": "visit",
    "summary": "Dr. Ortiz records type 2 diabetes and hypertension and develops a staged care plan with Maya.",
    "details": [
      "Assessment: HbA1c 8.4% and fasting glucose 168 mg/dL support the recorded diabetes diagnosis. Home BP readings average 149/91 mmHg across six checks.",
      "Patient priorities: Avoid an overwhelming medication schedule; prepare breakfast at home; resume walks after work.",
      "Orders for Maya: Metformin ER 500 mg with the evening meal, with a later tolerability review; losartan 25 mg daily; diabetes education, urine albumin screening and a retinal examination referral.",
      "Examination: Foot skin intact, pulses palpable and monofilament sensation preserved. No acute asthma symptoms.",
      "Follow-up ownership: Pharmacist for medication tolerance, RN for the BP log, dietitian for meal planning and PCP for treatment decisions."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan09-metformin-rx",
    "date": "2026-01-09",
    "displayDate": "Jan 9",
    "title": "Prescription: metformin ER begins",
    "short": "500 mg nightly · initial prescription",
    "category": "medication",
    "summary": "Metformin ER 500 mg is prescribed for Maya’s newly documented type 2 diabetes.",
    "details": [
      "Prescription: Metformin ER 500 mg tablets; one tablet with the evening meal; quantity 30, one refill.",
      "Status: Electronic prescription sent to Harborlight Demo Pharmacy. Dispensing is recorded separately on January 12.",
      "Titration: A possible increase is deferred until the pharmacist checks tolerance. This is a fictional patient-specific order."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 500 mg"
  },
  {
    "id": "jan09-losartan-rx",
    "date": "2026-01-09",
    "displayDate": "Jan 9",
    "title": "Prescription: losartan begins",
    "short": "25 mg daily · kidney panel planned",
    "category": "medication",
    "summary": "Losartan 25 mg daily is prescribed after review of repeated elevated blood-pressure readings.",
    "details": [
      "Prescription: Losartan 25 mg tablets; one daily; quantity 30, one refill.",
      "Order workflow: Baseline creatinine and potassium are reviewed; a follow-up metabolic panel is scheduled.",
      "Status: Prescription sent; the record does not infer that a dose was taken on the order date."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Losartan 25 mg"
  },
  {
    "id": "jan12-first-fill",
    "date": "2026-01-12",
    "displayDate": "Jan 12",
    "title": "Pharmacy: first prescriptions dispensed",
    "short": "Metformin ER and losartan · pickup confirmed",
    "category": "medication",
    "summary": "The demo pharmacy records dispensing the two new prescriptions; Maya later confirms starting both that evening.",
    "details": [
      "Dispensing record: Metformin ER 500 mg, 30 tablets; losartan 25 mg, 30 tablets.",
      "Patient report documented January 13: First doses taken January 12 after pharmacy pickup.",
      "Pharmacy counseling: Bottle labels, refill process and the medication-review appointment are discussed.",
      "Evidence distinction: Dispensing and the subsequent patient-reported start are separate facts; neither establishes every later dose."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Pharmacy",
    "medication": "Metformin ER 500 mg; losartan 25 mg"
  },
  {
    "id": "jan13-tolerance-message",
    "date": "2026-01-13",
    "displayDate": "Jan 13",
    "title": "MyChart: a question after the first doses",
    "short": "Mild stomach upset · pharmacist replies",
    "category": "message",
    "summary": "Maya sends an early tolerability question and receives a documented pharmacist response.",
    "details": [
      "Maya Bennett, patient: “I started both medicines last night. My stomach felt unsettled this morning. Is this something we should talk about before changing the dose?”",
      "Priya Soren, PharmD: “Thank you for telling us. I have reviewed your message with Dr. Ortiz. We will keep your current prescription unchanged and review how you feel at Friday’s visit.”",
      "Maya Bennett: “That works. I can take notes on when it happens and bring the bottles.”",
      "Thread outcome: Medication review remains scheduled for January 16; no dose increase is recorded in this thread."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER"
  },
  {
    "id": "jan14-education-scheduling",
    "date": "2026-01-14",
    "displayDate": "Jan 14",
    "title": "Telephone: diabetes education scheduled",
    "short": "Front desk · morning slot and waitlist",
    "category": "telephone",
    "summary": "Scheduling staff coordinate a diabetes-education visit around Maya’s work hours.",
    "details": [
      "Maya requests an appointment before her afternoon library shift and asks whether the visit can be by video.",
      "Nia Brooks, scheduling: Offers January 20 at 9:00 AM by video, sends the connection instructions through MyChart and adds Maya to an earlier-slot waitlist.",
      "Staff boundary: Questions about glucose testing are routed to the diabetes educator; front-desk staff do not issue a monitoring plan.",
      "Outcome: Patient accepts the appointment and confirms the portal invitation."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan16-pharmacist",
    "date": "2026-01-16",
    "displayDate": "Jan 16",
    "title": "Pharmacist visit: first-week check-in",
    "short": "Bottle review · stomach symptoms improving",
    "category": "visit",
    "summary": "The pharmacist reconciles the newly filled medicines and reviews tolerance with Maya.",
    "details": [
      "Patient report: Metformin ER 500 mg nightly and losartan 25 mg daily since January 12; mild stomach upset is improving and no dizziness is reported.",
      "Home BP log: Average 145/89 mmHg over the available four days; cuff technique is reviewed.",
      "Dr. Ortiz approves the next metformin step after the pharmacist’s assessment. A separate prescription update documents the change.",
      "Teach-back: Maya correctly identifies the purpose of each medicine and where to find the active list in MyChart."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan16-metformin-titration",
    "date": "2026-01-16",
    "displayDate": "Jan 16",
    "title": "Prescription update: metformin ER 1,000 mg",
    "short": "Two 500 mg tablets · evening dose",
    "category": "medication",
    "summary": "The metformin ER prescription increases to 1,000 mg nightly after the tolerability review.",
    "details": [
      "Order: Two 500 mg ER tablets with the evening meal; quantity 60, one refill.",
      "Status: New order replaces the earlier 500 mg daily instruction. Pharmacy label update and pickup are documented on January 19 within the pharmacy record.",
      "Patient report at January 20 education visit: Maya began the revised dose January 16 using her existing supply."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 1,000 mg"
  },
  {
    "id": "jan20-education",
    "date": "2026-01-20",
    "displayDate": "Jan 20",
    "title": "Diabetes education: practical daily routines",
    "short": "Meals, activity and an achievable first goal",
    "category": "visit",
    "summary": "Maya and the dietitian build a plan around her actual workday rather than a generic checklist.",
    "details": [
      "Patient context: Breakfast is often skipped, lunch breaks are short and she enjoys walking near the community garden.",
      "Agreed goal: Prepare a simple breakfast on four workdays and take a 15-minute walk after lunch on three days each week.",
      "Educational topics recorded: Reading food labels, a balanced plate, medication questions and how future A1c results will track the care plan.",
      "Patient report: Revised metformin dose is tolerated so far. Questions needing medical decisions are routed to Dr. Ortiz.",
      "Follow-up: February 26 nutrition review booked; a short progress message is invited through MyChart."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Tess Rowan, RDN · diabetes education",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan21-bp-message",
    "date": "2026-01-21",
    "displayDate": "Jan 21",
    "title": "MyChart: first home blood-pressure log",
    "short": "Seven-day average 143/88 mmHg",
    "category": "message",
    "summary": "A patient-submitted BP log becomes part of the shared longitudinal record.",
    "details": [
      "Maya Bennett, patient: “Here are my morning numbers from the past week. The cuff is easier now that I rest first.”",
      "Jonah Ellis, RN: “I have entered your seven-day average of 143/88 and sent the individual readings to Dr. Ortiz.”",
      "Lena Ortiz, MD: “I reviewed the log. We will review another set of readings at your February visit before deciding on a change.”",
      "Maya Bennett: “I will bring the cuff to the nurse visit so we can compare it.”",
      "Thread outcome: No prescription change; the existing monitoring and follow-up plan continues."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Losartan 25 mg"
  },
  {
    "id": "jan22-kidney-labs",
    "date": "2026-01-22",
    "displayDate": "Jan 22",
    "title": "Kidney screening and electrolyte follow-up",
    "short": "UACR 11 mg/g · potassium 4.2 mmol/L",
    "category": "lab",
    "summary": "Urine screening and the first follow-up metabolic panel return after losartan initiation.",
    "details": [
      "Urine albumin-to-creatinine ratio: 11 mg/g.",
      "Creatinine: 0.75 mg/dL; eGFR: 101 mL/min/1.73 m²; potassium: 4.2 mmol/L.",
      "Clinician review: Dr. Ortiz documents stable kidney function and electrolytes compared with the baseline panel.",
      "Result status: Final; patient explanation sent through the portal. The record contains no evidence of albuminuria at this check."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan23-eye-referral-call",
    "date": "2026-01-23",
    "displayDate": "Jan 23",
    "title": "Telephone: retinal screening coordinated",
    "short": "Referral received · appointment confirmed",
    "category": "telephone",
    "summary": "The referral coordinator closes the scheduling loop for the initial diabetes eye examination.",
    "details": [
      "Nia Brooks, scheduling: Confirms the referral was received by Harborlight Demo Eye Clinic and offers a January 26 cancellation slot.",
      "Maya accepts the morning appointment and asks whether she needs a separate insurance referral.",
      "Staff action: Verifies the demo plan’s referral requirement, sends the order and records receipt from the eye clinic.",
      "Outcome: Appointment confirmed; clinical interpretation remains with the eye clinician."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jan26-eye-exam",
    "date": "2026-01-26",
    "displayDate": "Jan 26",
    "title": "Retinal examination completed",
    "short": "No diabetic retinopathy documented",
    "category": "visit",
    "summary": "The fictional eye clinic completes the baseline dilated retinal examination and returns its report.",
    "details": [
      "Report: No diabetic retinopathy or macular edema identified in either eye at this examination.",
      "Visual acuity with current correction: 20/20 right eye and 20/25 left eye.",
      "Follow-up recommendation recorded by the eye clinician: Routine reassessment in one year unless symptoms prompt an earlier evaluation.",
      "Care coordination: Report received by primary care and the referral is marked completed."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Sage Mercer, OD · optometry",
    "institution": "Harborlight Demo Eye Clinic"
  },
  {
    "id": "jan28-lipid-message",
    "date": "2026-01-28",
    "displayDate": "Jan 28",
    "title": "MyChart: discussing cholesterol treatment",
    "short": "Shared decision · one change at a time",
    "category": "message",
    "summary": "Maya and Dr. Ortiz discuss the elevated LDL result and a proposed statin before the next prescription is issued.",
    "details": [
      "Lena Ortiz, MD: “Your LDL cholesterol was 146. At our next step I would like to discuss a cholesterol medicine in the context of your diabetes and overall health.”",
      "Maya Bennett, patient: “I am open to it, but I would like to know which bottle it is and what to report if I notice a problem.”",
      "Lena Ortiz, MD: Documents a follow-up conversation about expected benefit, potential adverse effects and Maya’s preferences; Maya agrees to the proposed atorvastatin prescription.",
      "Priya Soren, PharmD: “I will include the new medicine in your February bottle review so the list stays clear.”",
      "Thread outcome: Prescription issued January 30; this discussion alone is not a dispensing record."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Atorvastatin"
  },
  {
    "id": "jan30-statin-rx",
    "date": "2026-01-30",
    "displayDate": "Jan 30",
    "title": "Prescription: atorvastatin added",
    "short": "20 mg nightly · lipid follow-up planned",
    "category": "medication",
    "summary": "Atorvastatin is added after the shared decision recorded in the portal thread.",
    "details": [
      "Prescription: Atorvastatin 20 mg nightly; quantity 30, two refills.",
      "Dispensing: Harborlight Demo Pharmacy records a 30-tablet fill January 31. Maya reports beginning it that evening at her next pharmacist visit.",
      "Follow-up: Lipid testing is included in the April laboratory orders. No adverse effect is reported at the time of prescribing."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Atorvastatin 20 mg"
  },
  {
    "id": "feb03-cost-question",
    "date": "2026-02-03",
    "displayDate": "Feb 3",
    "title": "MyChart: keeping medication costs predictable",
    "short": "Pharmacist checks coverage and refill alignment",
    "category": "message",
    "summary": "Maya asks for help understanding separate pickup dates and copays for the new medicines.",
    "details": [
      "Maya Bennett, patient: “The three bottles have different refill dates. Can they eventually be ready together? I am trying to plan the monthly cost.”",
      "Priya Soren, PharmD: “I reviewed the demo pharmacy record. We can work toward one pickup date after the dose reviews, and I will check which prescriptions qualify for a 90-day supply.”",
      "Maya Bennett: “One pickup would help. Please keep me on the generic medicines when they are appropriate.”",
      "Thread outcome: Refill synchronization task opened. No formulary change or extra medication is added."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb05-reschedule",
    "date": "2026-02-05",
    "displayDate": "Feb 5",
    "title": "Telephone: follow-up rescheduled",
    "short": "Front desk · work conflict resolved",
    "category": "telephone",
    "summary": "A work conflict is resolved without losing the follow-up laboratory and medication-review tasks.",
    "details": [
      "Maya calls to move her February 11 PCP appointment because a coworker’s leave changed her shift.",
      "Nia Brooks, scheduling: Moves the visit to February 12 at 8:00 AM; retains the February 9 nurse BP check.",
      "Staff action: Updates the appointment reminder and confirms that the visit agenda includes the BP log and medication tolerance.",
      "Outcome: Both appointments are confirmed. No treatment decision is made by scheduling staff."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb09-nurse-bp",
    "date": "2026-02-09",
    "displayDate": "Feb 9",
    "title": "Nurse visit: check the home cuff",
    "short": "Office BP 142/86 · cuff comparison",
    "category": "visit",
    "summary": "An in-person nurse visit confirms usable home BP technique before the PCP follow-up.",
    "details": [
      "Office measurement: BP 142/86 mmHg after rest; home cuff at the same visit reads 144/87.",
      "Patient report: No missed losartan doses in the past week and no lightheadedness; seven-day home average 143/86.",
      "Workflow: RN records cuff size, positioning and technique, then routes the log to Dr. Ortiz.",
      "Plan: February 12 clinician review remains scheduled; the nurse does not change the prescription."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb12-pcp",
    "date": "2026-02-12",
    "displayDate": "Feb 12",
    "title": "Primary care: refine the first treatment plan",
    "short": "BP still above agreed goal · energy improving",
    "category": "visit",
    "summary": "Dr. Ortiz reviews progress and makes staged medication adjustments with follow-up monitoring.",
    "details": [
      "Vitals: BP 140/86 mmHg; weight 86.8 kg. Maya reports less thirst and gradually improving energy.",
      "Hypertension: Persistent home readings prompt a recorded increase from losartan 25 mg to 50 mg daily.",
      "Diabetes: Metformin ER 1,000 mg is now tolerated. An increase to 1,500 mg nightly is planned for February 13, with a pharmacist check the following week.",
      "Asthma: No nighttime symptoms and no increase in rescue inhaler use at this visit.",
      "Orders: Follow-up metabolic panel February 17; pharmacist February 18; A1c and lipid panel in April."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb12-losartan-increase",
    "date": "2026-02-12",
    "displayDate": "Feb 12",
    "title": "Prescription update: losartan 50 mg",
    "short": "Prior 25 mg order discontinued",
    "category": "medication",
    "summary": "Losartan increases to 50 mg daily after review of home and office readings.",
    "details": [
      "Prescription: Losartan 50 mg tablets; one daily; quantity 30, two refills. The previous 25 mg daily order is discontinued.",
      "Patient-specific transition: The pharmacy provides the updated label; Maya reports the first 50 mg dose on February 12.",
      "Follow-up: Creatinine and potassium check scheduled February 17. The old bottle is reviewed at the pharmacist visit to avoid duplicate dosing."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Losartan 50 mg"
  },
  {
    "id": "feb13-metformin-increase",
    "date": "2026-02-13",
    "displayDate": "Feb 13",
    "title": "Prescription update: metformin ER 1,500 mg",
    "short": "Three 500 mg tablets · tolerance follow-up",
    "category": "medication",
    "summary": "The previously discussed metformin step is entered as a new prescription.",
    "details": [
      "Prescription: Metformin ER 500 mg tablets; three with the evening meal; quantity 90, two refills.",
      "Dispensing: Updated supply recorded February 13. Patient-reported use at 1,500 mg is confirmed at the February 18 pharmacist visit.",
      "Reconciliation: This replaces the earlier 1,000 mg nightly instruction; both doses are not intended to remain active."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 1,500 mg"
  },
  {
    "id": "feb17-metabolic-panel",
    "date": "2026-02-17",
    "displayDate": "Feb 17",
    "title": "Metabolic panel after losartan adjustment",
    "short": "Creatinine 0.76 · potassium 4.3",
    "category": "lab",
    "summary": "The follow-up panel is reviewed after the losartan dose change.",
    "details": [
      "Creatinine: 0.76 mg/dL; eGFR: 100 mL/min/1.73 m²; potassium: 4.3 mmol/L; sodium: 139 mmol/L.",
      "Glucose: 134 mg/dL, nonfasting specimen; the result is not used as a standalone A1c substitute.",
      "Clinician interpretation: Kidney function and potassium remain stable relative to the January panel.",
      "Result routing: Final results are available to the pharmacist before the February 18 medication review."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb18-pharmacist",
    "date": "2026-02-18",
    "displayDate": "Feb 18",
    "title": "Pharmacist visit: one accurate medication list",
    "short": "Dose changes reconciled · duplicate orders removed",
    "category": "visit",
    "summary": "Maya brings all medication bottles for a structured review after the February changes.",
    "details": [
      "Patient-reported current regimen: Metformin ER 1,500 mg nightly, losartan 50 mg daily, atorvastatin 20 mg nightly, budesonide inhaler twice daily and albuterol as needed.",
      "Tolerance: Transient stomach upset has resolved; no dizziness or muscle symptoms reported.",
      "Reconciliation: The 25 mg losartan and prior metformin directions are removed from the active list. Pharmacy confirms only the current instructions remain eligible for refill.",
      "Adherence support: A simple morning/evening checklist is saved in MyChart; refill synchronization remains in progress."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb20-asthma-message",
    "date": "2026-02-20",
    "displayDate": "Feb 20",
    "title": "MyChart: routine asthma check-in",
    "short": "Controller use and rescue use documented",
    "category": "message",
    "summary": "A routine portal check establishes a clear baseline before the later respiratory illness.",
    "details": [
      "Jonah Ellis, RN: “For your chart update, how often have you used the rescue inhaler and have symptoms woken you at night?”",
      "Maya Bennett, patient: “I used albuterol once after cleaning a dusty storage area. No nights have been interrupted. I am still using the budesonide morning and evening.”",
      "Jonah Ellis, RN: “Thank you. I added this to your record and sent it to Dr. Ortiz. Your regular asthma follow-up remains in place.”",
      "Thread outcome: Stable patient-reported symptoms; no new prescription."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide; albuterol"
  },
  {
    "id": "feb23-albuterol-refill-call",
    "date": "2026-02-23",
    "displayDate": "Feb 23",
    "title": "Telephone: rescue inhaler refill request",
    "short": "Front desk routes request to clinical team",
    "category": "telephone",
    "summary": "Maya calls because the expiration date on her backup albuterol inhaler is approaching.",
    "details": [
      "Maya requests a replacement backup inhaler and reports no current breathing symptoms to the call taker.",
      "Nia Brooks, front desk: Verifies the medication name and preferred demo pharmacy, then routes the refill request to the nurse refill queue.",
      "Jonah Ellis, RN: Reviews the active medication list and forwards the request to Dr. Ortiz for authorization.",
      "Outcome: Prescription decision is documented separately on February 24; the front desk does not approve the refill."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health",
    "medication": "Albuterol"
  },
  {
    "id": "feb24-albuterol-refill",
    "date": "2026-02-24",
    "displayDate": "Feb 24",
    "title": "Prescription: albuterol refill authorized",
    "short": "Rescue inhaler · 200 actuations",
    "category": "medication",
    "summary": "Dr. Ortiz authorizes a replacement albuterol inhaler after reviewing the refill request.",
    "details": [
      "Prescription: Albuterol HFA 90 mcg per actuation, two puffs every 4–6 hours as needed for wheeze under Maya’s documented asthma plan; one inhaler, one refill.",
      "Dispensing: One 200-actuation inhaler recorded February 25.",
      "Patient context: The request replaces an expiring backup device and does not by itself indicate frequent rescue use."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Albuterol HFA 90 mcg"
  },
  {
    "id": "feb26-nutrition",
    "date": "2026-02-26",
    "displayDate": "Feb 26",
    "title": "Nutrition follow-up: make the routine sustainable",
    "short": "Breakfast goal met · walks fit the workday",
    "category": "visit",
    "summary": "The dietitian reviews Maya’s own goals and adjusts them for a changing work schedule.",
    "details": [
      "Patient report: Breakfast prepared on four of five workdays; lunch walks completed three times most weeks.",
      "Barrier identified: Long evening shifts make dinner planning difficult. Maya selects two practical meal options to prepare ahead.",
      "Progress: Maya reports fewer energy dips and feels more confident reading labels; no new weight or laboratory measurement is inferred from those reports.",
      "Plan: Continue the agreed routines and review progress after the April A1c result."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Tess Rowan, RDN · diabetes education",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "feb27-progress-message",
    "date": "2026-02-27",
    "displayDate": "Feb 27",
    "title": "MyChart: small changes are adding up",
    "short": "Home BP average 132/82 · patient goal update",
    "category": "message",
    "summary": "Maya shares a home BP log and a brief progress update with the care team.",
    "details": [
      "Maya Bennett, patient: “My last week averages 132/82, and I am keeping the breakfast goal. It feels more manageable than trying to change everything at once.”",
      "Jonah Ellis, RN: “I entered the home readings and shared your update with Dr. Ortiz and Tess.”",
      "Lena Ortiz, MD: “The trend is encouraging. I have reviewed the log and will keep the current prescription plan in place pending our next visit.”",
      "Thread status: Closed with no medication changes."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar03-cough-message",
    "date": "2026-03-03",
    "displayDate": "Mar 3",
    "title": "MyChart: a new cough after a household cold",
    "short": "Symptoms routed to clinical triage",
    "category": "message",
    "summary": "Maya reports a new respiratory illness through MyChart; the message generates a nurse follow-up.",
    "details": [
      "Maya Bennett, patient: “I caught the cold going around at home. I have a cough and a scratchy throat. Can we check whether I should come in?”",
      "Nia Brooks, front desk: “I have sent your symptom message to our nursing team for assessment. They will handle the clinical questions.”",
      "Jonah Ellis, RN: Documents a callback arrangement and reviews the symptom message before the March 4 telephone encounter.",
      "Thread outcome: Routed for clinical assessment; no automated diagnosis or medication change is made in MyChart."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar04-triage",
    "date": "2026-03-04",
    "displayDate": "Mar 4",
    "title": "Telephone: respiratory symptom triage",
    "short": "RN assessment · sick visit arranged",
    "category": "telephone",
    "summary": "The nurse conducts a clinical symptom review and arranges an office assessment.",
    "details": [
      "Patient report: Two days of cough and congestion, mild intermittent wheeze, able to speak comfortably and no shortness of breath at rest during the call.",
      "Clinical assessment: Jonah Ellis records the symptom history, current inhaler use and the absence of reported emergency warning features during this time-limited call.",
      "Routing: RN discusses the call with Dr. Ortiz and arranges a March 5 sick visit; individualized escalation instructions are recorded in the fictional chart.",
      "Scheduling handoff: Front desk confirms the appointment after the clinical disposition is made."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar05-sick-visit",
    "date": "2026-03-05",
    "displayDate": "Mar 5",
    "title": "Sick visit: respiratory illness with mild wheeze",
    "short": "Oxygen saturation 97% · close follow-up",
    "category": "visit",
    "summary": "Dr. Ortiz evaluates Maya’s cough and records a viral respiratory illness with mild asthma symptoms.",
    "details": [
      "Vitals: Temperature 37.2°C; pulse 88; respiratory rate 18; oxygen saturation 97% on room air.",
      "Examination: Mild expiratory wheeze without increased work of breathing. No focal chest findings documented.",
      "Patient-specific plan: Existing inhaled controller and rescue plan reviewed; no oral steroid or antibiotic prescribed at this encounter.",
      "Follow-up: RN check-in arranged. The clinician records escalation precautions for Maya and confirms she can reach the care team."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide; albuterol"
  },
  {
    "id": "mar06-callback-scheduling",
    "date": "2026-03-06",
    "displayDate": "Mar 6",
    "title": "Telephone: nurse callback window confirmed",
    "short": "Front desk · reachable after work",
    "category": "telephone",
    "summary": "Scheduling staff arrange a reliable callback window after Maya misses the first outreach attempt.",
    "details": [
      "Nia Brooks, front desk: Documents that Maya was at work during the first call and requests an available time for the nurse.",
      "Maya asks for a callback after 3:30 PM and confirms she can access MyChart during her break.",
      "Staff action: Updates the callback task and sends it to Jonah Ellis; no symptom interpretation is made by front-desk staff.",
      "Outcome: RN speaks with Maya later that day; she reports no interval deterioration at that check and the existing follow-up plan remains."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar10-worsening-message",
    "date": "2026-03-10",
    "displayDate": "Mar 10",
    "title": "MyChart: cough is interrupting sleep",
    "short": "Increasing rescue use · RN callback requested",
    "category": "message",
    "summary": "Maya reports a change from the stable symptoms described at her office visit.",
    "details": [
      "Maya Bennett, patient: “The cough is waking me now. I used the rescue inhaler more yesterday than I did last week.”",
      "Jonah Ellis, RN: “I received your update and will call to assess the change. I have also sent the message to Dr. Ortiz.”",
      "Maya Bennett: “I am available before my morning shift tomorrow.”",
      "Thread outcome: March 11 telephone assessment arranged after same-day callback confirms she is comfortable at rest; the record does not treat the message as a completed physical evaluation."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health",
    "medication": "Albuterol"
  },
  {
    "id": "mar11-respiratory-call",
    "date": "2026-03-11",
    "displayDate": "Mar 11",
    "title": "Telephone: symptoms require reassessment",
    "short": "Clinical triage · same-day reassessment offered",
    "category": "telephone",
    "summary": "The nurse documents worsening nighttime symptoms and discusses a same-day assessment with the physician.",
    "details": [
      "Patient report: Persistent wheeze, more frequent rescue inhaler use and disrupted sleep, without severe breathlessness at rest during the call.",
      "RN and clinician disposition: Same-day in-person reassessment is offered; Maya is unable to attend the offered slot and accepts the earliest next-morning opening.",
      "Care coordination: Dr. Ortiz reviews the call, speaks with Maya and records a patient-specific escalation plan for any worsening before that appointment.",
      "Later course: Symptoms worsen overnight; the March 12 emergency encounter records the next evaluation. This call does not imply the subsequent deterioration was predictable."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar12-ed",
    "date": "2026-03-12",
    "displayDate": "Mar 12",
    "title": "Emergency care: acute asthma exacerbation",
    "short": "Wheeze and breathlessness · admitted overnight",
    "category": "hospital",
    "summary": "Maya presents to the fictional emergency department after her breathing worsens overnight.",
    "details": [
      "Arrival findings: Respiratory rate 26; pulse 112; oxygen saturation 91% on room air; diffuse expiratory wheeze and increased work of breathing.",
      "Assessment: Acute asthma exacerbation associated with a respiratory viral illness; the team arranges hospital admission for oxygen, bronchodilator treatment and reassessment.",
      "ED treatment record: Ipratropium–albuterol nebulizers administered and oral prednisone started. Supplemental oxygen is recorded.",
      "Care continuity: Primary care receives an admission notification; the scheduled outpatient appointment is canceled by the care coordinator."
    ],
    "recordType": "Synthetic hospital encounter",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center"
  },
  {
    "id": "mar12-hospital-results",
    "date": "2026-03-12",
    "displayDate": "Mar 12",
    "title": "Hospital results: respiratory workup",
    "short": "Rhinovirus detected · no focal infiltrate",
    "category": "lab",
    "summary": "Diagnostic results support the hospital team’s recorded respiratory assessment.",
    "details": [
      "Respiratory PCR: Rhinovirus detected; influenza A/B and SARS-CoV-2 not detected.",
      "Chest radiograph: No focal air-space infiltrate or pleural effusion described in the synthetic radiology report.",
      "Laboratory panel: Glucose 176 mg/dL; creatinine 0.79 mg/dL; potassium 4.0 mmol/L; white-cell count 9.8 ×10³/µL.",
      "Result context: These fictional findings belong to the March 12 evaluation and do not describe any real test or patient."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center"
  },
  {
    "id": "mar12-nebulizer",
    "date": "2026-03-12",
    "displayDate": "Mar 12",
    "title": "Hospital medication: nebulized bronchodilators",
    "short": "Administered in ED · continued during admission",
    "category": "medication",
    "summary": "The medication administration record documents ipratropium–albuterol treatment during acute hospital care.",
    "details": [
      "Administered March 12: Ipratropium 0.5 mg / albuterol 2.5 mg per 3 mL nebulized treatments in the ED, with additional inpatient treatments through March 13.",
      "Status: Administered medication in a synthetic hospital MAR, distinct from an outpatient prescription or patient report.",
      "Disposition: Nebulized combination treatment is not prescribed for home use at discharge."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center",
    "medication": "Ipratropium–albuterol nebulizer"
  },
  {
    "id": "mar12-prednisone",
    "date": "2026-03-12",
    "displayDate": "Mar 12",
    "title": "Hospital medication: short prednisone course",
    "short": "40 mg daily · five-day course recorded",
    "category": "medication",
    "summary": "The hospital physician orders a five-day prednisone course for the acute asthma episode.",
    "details": [
      "Patient-specific order: Prednisone 40 mg orally daily, March 12 through March 16 inclusive.",
      "Administration evidence: Hospital MAR records doses March 12, 13 and 14. Two remaining outpatient doses are prescribed at discharge.",
      "Continuity: The discharge list clearly marks the stop date; this is not an ongoing maintenance medicine."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center",
    "medication": "Prednisone 40 mg"
  },
  {
    "id": "mar13-inpatient",
    "date": "2026-03-13",
    "displayDate": "Mar 13",
    "title": "Hospital day 2: breathing improves",
    "short": "Oxygen weaned · temporary glucose elevations",
    "category": "hospital",
    "summary": "The inpatient team documents improved breathing while monitoring glucose during systemic steroid treatment.",
    "details": [
      "Respiratory course: Oxygen is weaned; oxygen saturation is 95% on room air at rest. Bronchodilator treatments are spaced as symptoms improve.",
      "Diabetes management: Home metformin is held during the acute illness. Point-of-care glucose reaches 268 mg/dL after steroid initiation; temporary correction insulin is ordered.",
      "Medication reconciliation: Losartan and atorvastatin remain on the hospital list; discharge controller selection is discussed with respiratory therapy.",
      "Care planning: Inhaler technique teaching, pharmacy access review and a primary-care follow-up appointment are started before discharge."
    ],
    "recordType": "Synthetic hospital encounter",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center"
  },
  {
    "id": "mar13-inpatient-insulin",
    "date": "2026-03-13",
    "displayDate": "Mar 13",
    "title": "Hospital medication: temporary correction insulin",
    "short": "Lispro administered · no home insulin plan",
    "category": "medication",
    "summary": "Insulin lispro is used briefly for elevated glucose during the asthma admission.",
    "details": [
      "Synthetic MAR: Correction insulin lispro doses administered March 13 and 14 under the inpatient protocol; glucose values and doses are retained in the fictional hospital record.",
      "Context: Acute illness and systemic steroid treatment coincide with higher glucose readings; this record does not claim a single proven cause.",
      "Discharge decision: Insulin is discontinued before discharge. Maya is not given an outpatient insulin prescription."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center",
    "medication": "Insulin lispro · inpatient only"
  },
  {
    "id": "mar14-discharge",
    "date": "2026-03-14",
    "displayDate": "Mar 14",
    "title": "Hospital discharge: return home with one plan",
    "short": "Asthma improved · follow-up and access arranged",
    "category": "hospital",
    "summary": "Maya is discharged after improvement, with a reconciled medication list and named follow-up owners.",
    "details": [
      "Discharge condition: Oxygen saturation 97% on room air at rest and 95% during hallway walking; breathing comfortable and oral intake adequate.",
      "Diagnosis: Acute asthma exacerbation associated with rhinovirus infection; type 2 diabetes with transient inpatient hyperglycemia.",
      "Plan recorded: Finish the two remaining prednisone doses through March 16; use the new budesonide–formoterol maintenance prescription and the separate albuterol rescue prescription.",
      "Transition tasks: RN outreach March 16; pharmacist March 19; PCP March 20; pulmonology referral sent.",
      "Access: A seven-day hospital bridge supply of the new controller inhaler is dispensed while retail formulary authorization is pending."
    ],
    "recordType": "Synthetic hospital encounter",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center"
  },
  {
    "id": "mar14-controller-rx",
    "date": "2026-03-14",
    "displayDate": "Mar 14",
    "title": "Discharge prescription: controller inhaler updated",
    "short": "Budesonide–formoterol · bridge supply dispensed",
    "category": "medication",
    "summary": "The hospital team replaces the prior budesonide-only inhaler with a combination maintenance inhaler.",
    "details": [
      "Prescription: Budesonide–formoterol 80/4.5 mcg, two puffs twice daily for Maya’s maintenance regimen; albuterol remains the separately documented rescue medicine.",
      "Reconciliation: The budesonide-only inhaler is discontinued to avoid duplicate controller therapy.",
      "Dispensing: Seven-day hospital bridge supply documented March 14. The outpatient pharmacy requests prior authorization for the selected product.",
      "Evidence: The prescription, bridge dispensing and later patient-reported use are separate records."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Casey Vale, MD · hospital medicine",
    "institution": "Harborlight Demo Medical Center",
    "medication": "Budesonide–formoterol 80/4.5 mcg; budesonide discontinued"
  },
  {
    "id": "mar14-reconciliation",
    "date": "2026-03-14",
    "displayDate": "Mar 14",
    "title": "Discharge medication reconciliation",
    "short": "Continue, replace, finish and stop clearly labeled",
    "category": "hospital",
    "summary": "The discharge pharmacist reconciles the hospital and outpatient lists with Maya using teach-back.",
    "details": [
      "Continue / resume: Metformin ER 1,500 mg with the evening meal resumes March 14 after the acute hold; losartan 50 mg daily and atorvastatin 20 mg nightly continue.",
      "Replace: Budesonide-only inhaler stops; budesonide–formoterol maintenance inhaler starts. Albuterol remains available under the individualized rescue plan.",
      "Finish: Prednisone 40 mg on March 15 and 16; two doses dispensed. Stop: Inpatient ipratropium–albuterol nebulizers and insulin lispro.",
      "Teach-back: Maya identifies the new inhaler, the stopped inhaler and the prednisone stop date. The active list and discharge summary are released to MyChart.",
      "Pending task: Prior authorization tracked by the outpatient pharmacist; the bridge supply covers the expected processing interval."
    ],
    "recordType": "Synthetic hospital encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Medical Center"
  },
  {
    "id": "mar16-transition-call",
    "date": "2026-03-16",
    "displayDate": "Mar 16",
    "title": "Telephone: post-discharge transition check",
    "short": "RN outreach · symptoms and medicines reviewed",
    "category": "telephone",
    "summary": "The transitional-care nurse checks that the discharge plan is usable at home.",
    "details": [
      "Maya reports easier breathing, sleeping through the prior night and taking the final prescribed prednisone dose that morning.",
      "Medication review: She identifies the combination inhaler, confirms she stopped budesonide-only therapy and reports resuming metformin.",
      "Access check: The bridge inhaler is available at home; retail authorization is still pending. RN escalates the pending item to Priya Soren.",
      "Appointments: Pharmacist March 19 and PCP March 20 confirmed. No unresolved transportation barrier is reported."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar16-prior-auth",
    "date": "2026-03-16",
    "displayDate": "Mar 16",
    "title": "Pharmacy access: controller authorization submitted",
    "short": "Bridge supply in place · status tracked",
    "category": "medication",
    "summary": "The pharmacist submits the requested prior authorization for the new maintenance inhaler.",
    "details": [
      "Demo payer request: The selected budesonide–formoterol product requires documentation of the discharge regimen and previous budesonide therapy.",
      "Pharmacist action: Submits the discharge summary, prior controller history and prescription details; records the request as pending.",
      "Continuity: Maya has the hospital bridge supply. No missed controller doses are reported during this interval.",
      "Next step: Pharmacy follow-up task assigned for March 17. An approval is not assumed before the response arrives."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide–formoterol · prior authorization"
  },
  {
    "id": "mar17-prior-auth-approved",
    "date": "2026-03-17",
    "displayDate": "Mar 17",
    "title": "Pharmacy access: approved and dispensed",
    "short": "Controller inhaler · pickup confirmed",
    "category": "medication",
    "summary": "The demo payer approves the controller request and the outpatient pharmacy dispenses a full inhaler.",
    "details": [
      "Authorization status: Approved for the prescribed budesonide–formoterol product through the remainder of the fictional demonstration period.",
      "Dispensing record: One 120-actuation inhaler dispensed March 17; at the prescribed maintenance dose this represents a 30-day supply.",
      "Patient confirmation: Maya acknowledges pickup in MyChart that evening; the pending access task is closed.",
      "Evidence distinction: Approval establishes coverage and dispensing establishes supply; later use is documented by patient report."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Pharmacy",
    "medication": "Budesonide–formoterol 80/4.5 mcg"
  },
  {
    "id": "mar18-inhaler-message",
    "date": "2026-03-18",
    "displayDate": "Mar 18",
    "title": "MyChart: “Which inhaler stays on my list?”",
    "short": "Discharge instructions clarified in one thread",
    "category": "message",
    "summary": "Maya asks the pharmacist to resolve the old and new inhaler names shown in her medication history.",
    "details": [
      "Maya Bennett, patient: “I picked up the new inhaler. The old budesonide still appears under past prescriptions. I stopped it, but can you make sure I am reading the list correctly?”",
      "Priya Soren, PharmD: “Yes. The old budesonide-only prescription is now marked discontinued. Your active maintenance prescription is budesonide–formoterol, and albuterol is listed separately as your rescue inhaler.”",
      "Maya Bennett: “That matches the discharge sheet. I finished prednisone on Monday and am not using any insulin at home.”",
      "Priya Soren, PharmD: “I updated the reconciliation notes and will review the devices with you tomorrow.”",
      "Thread outcome: Historical entries retained with clear status; no duplicate controller remains active."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide; budesonide–formoterol; prednisone; insulin lispro"
  },
  {
    "id": "mar19-pharmacist-transition",
    "date": "2026-03-19",
    "displayDate": "Mar 19",
    "title": "Pharmacist: close the discharge medication loop",
    "short": "Technique, access and stop dates verified",
    "category": "visit",
    "summary": "The pharmacist completes a post-hospital medication review using bottles, devices and the discharge list.",
    "details": [
      "Patient-reported regimen matches the reconciled list: Metformin ER 1,500 mg, losartan 50 mg, atorvastatin 20 mg, budesonide–formoterol maintenance and albuterol as needed.",
      "Completed / stopped: Prednisone finished March 16; old budesonide inhaler discontinued; no outpatient nebulized ipratropium–albuterol or insulin lispro use.",
      "Technique: Maya demonstrates the maintenance inhaler with a spacer; the pharmacist records correction of an overly rapid inhalation and successful repeat demonstration.",
      "Access: Approved retail inhaler is in hand; refill reminder set. No reported gap between bridge and retail supplies.",
      "Handoff: Summary routed to Dr. Ortiz before the next-day transition visit."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar20-transition-visit",
    "date": "2026-03-20",
    "displayDate": "Mar 20",
    "title": "Primary care: hospital follow-up",
    "short": "Breathing near baseline · recovery plan reviewed",
    "category": "visit",
    "summary": "Dr. Ortiz reviews the hospital course, medication reconciliation and recovery progress.",
    "details": [
      "Vitals: BP 132/82 mmHg; pulse 80; oxygen saturation 98% on room air. Mild residual cough without wheeze on examination.",
      "Patient report: Sleep and activity tolerance improving; rescue inhaler used once since discharge; no new medication access issue.",
      "Diabetes: Home readings during the short post-discharge monitoring period are trending down after prednisone completion. Outpatient insulin is not started.",
      "Plan: Continue the reconciled regimen, complete a metabolic panel and attend pulmonary follow-up. Return-to-work needs are discussed and documented.",
      "Care ownership: PCP manages diabetes and BP; pulmonology evaluates asthma recovery; pharmacist maintains the consolidated medication list."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar23-pulmonary-scheduling",
    "date": "2026-03-23",
    "displayDate": "Mar 23",
    "title": "Telephone: pulmonary referral booked",
    "short": "Referral coordinator · report transfer complete",
    "category": "telephone",
    "summary": "Scheduling staff confirm the pulmonary consultation and make the hospital summary available to the specialist.",
    "details": [
      "Nia Brooks, referral coordination: Books March 30 with Dr. Chen and verifies receipt of the discharge summary and medication reconciliation.",
      "Maya asks about parking and whether to bring the new inhaler; staff provide the fictional clinic’s arrival instructions and relay the request for device review.",
      "Clinical questions about inhaler timing before lung testing are routed to the pulmonary team.",
      "Outcome: Consultation confirmed; diagnostic testing will be ordered by the specialist as appropriate."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar24-glucose-message",
    "date": "2026-03-24",
    "displayDate": "Mar 24",
    "title": "MyChart: glucose trend after the steroid course",
    "short": "Short monitoring period reviewed by PCP",
    "category": "message",
    "summary": "Maya sends the temporary home glucose log requested during the transition visit.",
    "details": [
      "Maya Bennett, patient: “The morning readings in the last three days were 139, 132 and 128. I finished the steroid on March 16.”",
      "Lena Ortiz, MD: “I reviewed the log and the discharge summary. We will keep your existing metformin prescription and review the planned April A1c.”",
      "Maya Bennett: “Thank you. I am glad the hospital insulin is not something I need to refill.”",
      "Lena Ortiz, MD: “Correct; the insulin was an inpatient-only treatment and is listed as stopped on your discharge record.”",
      "Thread outcome: Temporary monitoring history documented; no new diabetes drug added."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER; prednisone; insulin lispro"
  },
  {
    "id": "mar26-metabolic-panel",
    "date": "2026-03-26",
    "displayDate": "Mar 26",
    "title": "Recovery laboratory check",
    "short": "Glucose 127 · creatinine 0.78",
    "category": "lab",
    "summary": "The recovery panel is available before the pulmonary consultation and April diabetes review.",
    "details": [
      "Glucose: 127 mg/dL, fasting; creatinine: 0.78 mg/dL; eGFR: 97 mL/min/1.73 m²; potassium: 4.2 mmol/L.",
      "Clinician interpretation: Kidney function remains stable after the hospitalization and metformin resumption.",
      "Result workflow: Final panel released to MyChart and reviewed by Dr. Ortiz.",
      "Context: This single glucose value does not replace the planned longitudinal HbA1c measurement."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar27-recovery-message",
    "date": "2026-03-27",
    "displayDate": "Mar 27",
    "title": "MyChart: back to the morning routine",
    "short": "BP log and return-to-work update",
    "category": "message",
    "summary": "Maya reports improved function after the hospital episode and confirms upcoming care.",
    "details": [
      "Maya Bennett, patient: “I am back for shorter library shifts and walking one block at lunch. My BP average this week was 130/81.”",
      "Jonah Ellis, RN: “I added your update and readings to the record. Your pulmonary visit is confirmed for Monday.”",
      "Maya Bennett: “I have both inhalers and the spacer ready to bring.”",
      "Thread outcome: Recovery update shared with PCP and pulmonology; no medication change."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar30-pulmonary-consult",
    "date": "2026-03-30",
    "displayDate": "Mar 30",
    "title": "Pulmonology: review the asthma episode",
    "short": "Trigger history · technique · written action plan",
    "category": "visit",
    "summary": "Dr. Chen reviews the recent admission and Maya’s asthma history with the consolidated medication record.",
    "details": [
      "Patient report: No nighttime awakenings in the past week and one rescue use since the PCP follow-up. She has returned to most ordinary activities.",
      "Review: Viral trigger, prior controller therapy, environmental exposures and the March medication-access issue are discussed.",
      "Plan recorded: Maintain the current budesonide–formoterol prescription and separate rescue plan during recovery; obtain spirometry and reassess in May.",
      "Device teaching: Spacer technique reviewed and a patient-specific written asthma action plan is saved to MyChart.",
      "Coordination: Pulmonary note routed to primary care and the clinical pharmacist."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "mar31-spirometry",
    "date": "2026-03-31",
    "displayDate": "Mar 31",
    "title": "Spirometry: post-exacerbation baseline",
    "short": "FEV₁ 78% predicted · bronchodilator response",
    "category": "lab",
    "summary": "Initial pulmonary testing provides an objective recovery baseline.",
    "details": [
      "Pre-bronchodilator: FEV₁ 2.18 L (78% predicted); FVC 3.24 L (94% predicted); FEV₁/FVC 0.67.",
      "Post-bronchodilator: FEV₁ 2.54 L (91% predicted), increase 0.36 L; testing quality recorded as acceptable.",
      "Specialist interpretation: Airflow obstruction with bronchodilator responsiveness in the context of the recorded asthma history.",
      "Result plan: Continue the current recovery regimen; repeat testing is planned for May. These are synthetic measurements."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Pulmonary Lab"
  },
  {
    "id": "apr02-technique-message",
    "date": "2026-04-02",
    "displayDate": "Apr 2",
    "title": "MyChart: inhaler technique follow-through",
    "short": "Spacer routine · no overnight symptoms",
    "category": "message",
    "summary": "The pulmonary nurse checks whether device teaching translated into Maya’s home routine.",
    "details": [
      "Jonah Ellis, RN, on behalf of the pulmonary team: “Were you able to use the spacer steps reviewed at your visit?”",
      "Maya Bennett, patient: “Yes. Slowing down helped. I have not been waking with coughing, and I keep the two inhalers in separate labeled spots.”",
      "Emery Chen, MD: “I reviewed your update and the spirometry. We will continue the current plan until the scheduled reassessment.”",
      "Thread outcome: Technique follow-up completed; no unplanned dose change."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide–formoterol; albuterol"
  },
  {
    "id": "apr03-allergy-rx",
    "date": "2026-04-03",
    "displayDate": "Apr 3",
    "title": "Prescription: seasonal allergy symptom relief",
    "short": "Cetirizine as needed · short spring interval",
    "category": "medication",
    "summary": "After a brief clinical review, Dr. Ortiz records an as-needed cetirizine order for Maya’s seasonal nasal and eye symptoms.",
    "details": [
      "Patient symptoms in this fictional encounter: Sneezing and itchy eyes outdoors, without recurrent lower-airway symptoms.",
      "Order: Cetirizine 10 mg orally daily as needed for seasonal allergy symptoms; quantity 30, no refills.",
      "Dispensing: Demo pharmacy records pickup April 4. Actual intermittent use is later described by Maya; a daily course is not assumed.",
      "Follow-up: Spring symptoms and ongoing need are reviewed in the May portal thread."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Cetirizine 10 mg as needed"
  },
  {
    "id": "apr06-lab-scheduling",
    "date": "2026-04-06",
    "displayDate": "Apr 6",
    "title": "Telephone: lab visit fitted around work",
    "short": "Front desk · April 9 slot confirmed",
    "category": "telephone",
    "summary": "Scheduling staff coordinate the ordered diabetes and lipid follow-up tests before the PCP appointment.",
    "details": [
      "Maya calls to ask whether a morning draw is available before work.",
      "Nia Brooks, front desk: Books the April 9 laboratory appointment and confirms the April 10 PCP visit.",
      "Staff action: Relays the preparation instructions already attached to the clinician’s order; questions about medications are forwarded to the nurse.",
      "Outcome: The patient confirms both appointments and the laboratory requisition is present."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr09-quarterly-labs",
    "date": "2026-04-09",
    "displayDate": "Apr 9",
    "title": "Quarterly labs: measurable progress",
    "short": "HbA1c 7.1% · LDL-C 82 mg/dL",
    "category": "lab",
    "summary": "Follow-up testing shows improvement from the January baseline after the first three months of care.",
    "details": [
      "HbA1c: 7.1%, compared with 8.4% on January 7; fasting glucose: 124 mg/dL.",
      "Lipid panel: LDL-C 82 mg/dL; HDL-C 49 mg/dL; triglycerides 139 mg/dL.",
      "Creatinine: 0.77 mg/dL; eGFR: 99 mL/min/1.73 m²; potassium: 4.3 mmol/L; ALT: 22 U/L.",
      "Context: The A1c interval includes the March illness and brief prednisone course. The result is reviewed with the patient at the April 10 visit."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr10-quarterly-visit",
    "date": "2026-04-10",
    "displayDate": "Apr 10",
    "title": "Quarterly review: progress after a setback",
    "short": "A1c down 1.3 points · BP 128/80",
    "category": "visit",
    "summary": "Dr. Ortiz reviews the improving results alongside the recent hospitalization and Maya’s own goals.",
    "details": [
      "Vitals: BP 128/80 mmHg; weight 85.8 kg; oxygen saturation 98% on room air.",
      "Diabetes: HbA1c improved to 7.1%; Maya prefers to consolidate the current routine before discussing any additional therapy. Metformin ER 1,500 mg remains unchanged.",
      "Cardiovascular review: LDL-C 82 mg/dL and stable BP on the current atorvastatin and losartan prescriptions.",
      "Asthma: No urgent visits since discharge; pulmonary follow-up and May spirometry remain scheduled.",
      "Next steps: Continue patient-specific goals, maintain the reconciled medication list and review repeat labs with the June care-plan visit."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr13-nutrition-followup",
    "date": "2026-04-13",
    "displayDate": "Apr 13",
    "title": "Nutrition: rebuild activity after the hospital stay",
    "short": "Flexible goals · confidence returning",
    "category": "visit",
    "summary": "The dietitian adapts the activity goal to Maya’s recovery and work routine.",
    "details": [
      "Maya reports returning to her usual walking route in shorter segments and preparing breakfast consistently.",
      "Visit focus: Avoiding an all-or-nothing response to the March illness; planning meals around two longer shifts each week.",
      "Patient-selected next goal: Bring lunch from home on three workdays and resume comfortable walks as recovery permits under her clinician’s plan.",
      "Coordination: No medication adjustment is made in the nutrition visit; the PCP receives the goal update."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Tess Rowan, RDN · diabetes education",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr15-refill-message",
    "date": "2026-04-15",
    "displayDate": "Apr 15",
    "title": "MyChart: metformin refill before the weekend",
    "short": "Correct dose confirmed · pharmacy task opened",
    "category": "message",
    "summary": "Maya requests a refill of her reconciled metformin prescription and confirms the active tablet count.",
    "details": [
      "Maya Bennett, patient: “I have less than two weeks left of metformin. The current label says three 500 mg ER tablets at dinner. Can the refill use that same label?”",
      "Priya Soren, PharmD: “I checked the active list and your April visit. The current prescription is 1,500 mg with the evening meal. I sent the refill request to Dr. Ortiz and removed the older directions from the pharmacy queue.”",
      "Maya Bennett: “Thank you. I can pick it up Friday with my inhaler refill.”",
      "Thread outcome: Refill request routed for prescriber authorization; dispensing is recorded in the next entry."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 1,500 mg"
  },
  {
    "id": "apr16-metformin-refill",
    "date": "2026-04-16",
    "displayDate": "Apr 16",
    "title": "Prescription refill: metformin ER",
    "short": "Current 1,500 mg dose · supply synchronized",
    "category": "medication",
    "summary": "Dr. Ortiz authorizes the refill with the current directions and the pharmacy aligns the pickup window.",
    "details": [
      "Order: Metformin ER 500 mg, three tablets with the evening meal; quantity 90, two refills.",
      "Dispensing history reviewed: Metformin ER 90-tablet continuation fill March 17 and a further 90 tablets April 17; the April pickup includes the regularly scheduled budesonide–formoterol refill.",
      "Reconciliation: The dose remains 1,500 mg. This is a continuation refill, not a new titration.",
      "Access outcome: Maya confirms pickup; no interruption in supply is reported."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 1,500 mg; budesonide–formoterol refill"
  },
  {
    "id": "apr17-referral-paperwork",
    "date": "2026-04-17",
    "displayDate": "Apr 17",
    "title": "Telephone: close an eye-referral paperwork loop",
    "short": "Front desk · completed exam report re-sent",
    "category": "telephone",
    "summary": "Maya asks about a portal referral status that still appears open despite her completed eye examination.",
    "details": [
      "Maya Bennett, patient: “I went to the January eye visit, but the reminder says the referral is still waiting.”",
      "Nia Brooks, referral coordinator: Confirms the January 26 report is in the chart, updates the referral status and re-sends the completion notice to the demo plan.",
      "Staff action: Removes the duplicate scheduling reminder; no second examination is booked.",
      "Outcome: Patient receives confirmation that the baseline eye screening is complete and the planned annual follow-up remains."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr21-pulmonary-results-message",
    "date": "2026-04-21",
    "displayDate": "Apr 21",
    "title": "MyChart: understanding the lung test",
    "short": "Specialist explains recovery baseline",
    "category": "message",
    "summary": "Maya asks what the March spirometry numbers mean for the upcoming follow-up.",
    "details": [
      "Maya Bennett, patient: “I can see two FEV1 numbers on the test. Does the higher one mean I can stop the new inhaler?”",
      "Emery Chen, MD: “The second number was measured after a bronchodilator during the test. It shows a response at that visit. I recommend keeping your current recorded plan until we reassess symptoms and repeat the test in May.”",
      "Maya Bennett: “Understood. I will keep the May appointments and bring both inhalers.”",
      "Thread outcome: Test context explained for this fictional patient; no controller step-down is ordered."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide–formoterol"
  },
  {
    "id": "apr23-pharmacist",
    "date": "2026-04-23",
    "displayDate": "Apr 23",
    "title": "Pharmacist: simplify ongoing refills",
    "short": "One pickup calendar · no duplicate therapies",
    "category": "visit",
    "summary": "The pharmacist checks maintenance therapy and closes the earlier refill-synchronization task.",
    "details": [
      "Patient report: No missed doses in the past week, no recurrent metformin stomach upset, no dizziness and no statin-associated symptoms reported.",
      "Pharmacy review: Metformin, losartan and atorvastatin refill dates are aligned where the demo coverage allows; inhaler remains on its own 30-day device schedule.",
      "Inhaler review: Combination controller continues; old budesonide-only order remains discontinued. Prednisone and inpatient drugs are marked completed or stopped.",
      "Patient preference: Maya keeps a calendar reminder and requests 90-day oral supplies once the current doses have remained stable."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "apr27-goals-message",
    "date": "2026-04-27",
    "displayDate": "Apr 27",
    "title": "MyChart: a patient-defined milestone",
    "short": "Back to regular walks · care team responds",
    "category": "message",
    "summary": "Maya shares a functional milestone that complements the laboratory measures.",
    "details": [
      "Maya Bennett, patient: “I walked the whole community-garden loop after work twice this week. I used to stop halfway because I felt tired.”",
      "Tess Rowan, RDN: “I added that to your goal record. Which part of your routine made the biggest difference for you?”",
      "Maya Bennett: “Having breakfast ready and knowing which inhaler I am using. The medicine list finally makes sense.”",
      "Tess Rowan, RDN: “We will build the next goal around the routines that are working for you.”",
      "Thread outcome: Functional progress recorded as the patient’s experience, not as a measured exercise test."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Tess Rowan, RDN · diabetes education",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may01-refill-supply-call",
    "date": "2026-05-01",
    "displayDate": "May 1",
    "title": "Telephone: monthly medication supply check",
    "short": "Pharmacy team · early refill planning",
    "category": "telephone",
    "summary": "The pharmacy team checks remaining supply before the next synchronized refill window.",
    "details": [
      "Priya Soren, PharmD: Confirms Maya has enough metformin and inhaler supply and asks whether any bottle labels are unclear.",
      "Patient report: Losartan and atorvastatin are approaching the agreed refill date; no access issue or unintended discontinuation is reported.",
      "Workflow: Renewal requests are sent to Dr. Ortiz with the current doses and recent laboratory results.",
      "Outcome: Patient chooses the same demo pharmacy and a May 5 pickup window."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may05-maintenance-refills",
    "date": "2026-05-05",
    "displayDate": "May 5",
    "title": "Prescriptions renewed: BP and cholesterol therapy",
    "short": "Losartan 50 mg · atorvastatin 20 mg",
    "category": "medication",
    "summary": "Stable oral therapy is renewed after review of the April visit and laboratory results.",
    "details": [
      "Orders: Losartan 50 mg daily, quantity 30 with two refills; atorvastatin 20 mg nightly, quantity 30 with two refills.",
      "Dispensing: Both 30-day supplies recorded May 5 at Harborlight Demo Pharmacy.",
      "Evidence: Renewal confirms the prescribed plan. The pharmacist separately asks Maya about her actual use at follow-up.",
      "Next task: Assess eligibility for 90-day supplies before planned summer travel."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Losartan 50 mg; atorvastatin 20 mg"
  },
  {
    "id": "may07-bp-check",
    "date": "2026-05-07",
    "displayDate": "May 7",
    "title": "Nurse visit: blood-pressure trend holds",
    "short": "Office BP 126/78 · home log agrees",
    "category": "visit",
    "summary": "A brief nurse visit checks the reliability and durability of the improved blood-pressure readings.",
    "details": [
      "Office BP: 126/78 mmHg; home seven-day average: 127/79 mmHg.",
      "Patient report: No dizziness, falls or swelling; current losartan label matches the chart.",
      "Workflow: Nurse routes the measurements and symptom review to Dr. Ortiz, who documents continuation of the existing prescription.",
      "Follow-up: June care-plan review remains scheduled."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may11-travel-message",
    "date": "2026-05-11",
    "displayDate": "May 11",
    "title": "MyChart: planning medicines for summer travel",
    "short": "Supply question · no urgent refill gap",
    "category": "message",
    "summary": "Maya raises a practical medication-access question early enough for the pharmacy team to resolve it.",
    "details": [
      "Maya Bennett, patient: “I am visiting family in July. Could we sort out longer supplies before then so I do not have three separate pickups?”",
      "Priya Soren, PharmD: “I will review the demo plan’s 90-day options and your current refill dates. Your June appointment is a good point to confirm the plan before travel.”",
      "Maya Bennett: “That works. I have enough medicine for this month.”",
      "Thread outcome: A supply-planning task is opened; no medication change or unverified early fill is recorded."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may12-pharmacy-coverage",
    "date": "2026-05-12",
    "displayDate": "May 12",
    "title": "Pharmacy review: longer-supply options",
    "short": "Coverage checked · June conversion planned",
    "category": "medication",
    "summary": "The pharmacist records coverage findings and a future supply plan without treating it as a completed fill.",
    "details": [
      "Demo plan review: Ninety-day supplies are covered for stable metformin ER, losartan and atorvastatin prescriptions after the next eligible refill date.",
      "Controller inhaler: Existing authorization remains active; the device continues on a monthly dispensing schedule.",
      "Planned action: Ask the prescriber to convert the three oral maintenance prescriptions in June after the medication review.",
      "Status: Planned supply change only. The current drug doses and actual dispensing dates remain unchanged."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER; losartan; atorvastatin · 90-day supply planned"
  },
  {
    "id": "may15-pcp-check",
    "date": "2026-05-15",
    "displayDate": "May 15",
    "title": "Primary care: maintain momentum",
    "short": "Stable diabetes and BP plan · no acute concerns",
    "category": "visit",
    "summary": "A brief follow-up addresses Maya’s questions before the pulmonary reassessment and June review.",
    "details": [
      "Vitals: BP 128/78 mmHg; weight 85.2 kg. Maya reports steady energy and no new medication side effects.",
      "Patient priorities: Keep the routine simple, travel without refill stress and understand when each follow-up is due.",
      "Care plan: Continue current oral therapy, complete May pulmonary testing and obtain the already ordered June A1c and metabolic/lipid panels.",
      "Coordination: PCP acknowledges the pharmacy’s 90-day supply plan and records June as the conversion point if the regimen remains stable."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may19-repeat-spirometry",
    "date": "2026-05-19",
    "displayDate": "May 19",
    "title": "Repeat spirometry: recovery documented",
    "short": "FEV₁ 93% predicted · ratio 0.78",
    "category": "lab",
    "summary": "Repeat pulmonary testing gives the specialist an objective comparison with the March study.",
    "details": [
      "Pre-bronchodilator: FEV₁ 2.60 L (93% predicted); FVC 3.33 L (96% predicted); FEV₁/FVC 0.78.",
      "Comparison: FEV₁ was 2.18 L before bronchodilator on March 31. The repeat study is obtained while Maya remains on her maintenance regimen.",
      "Test quality: Acceptable and reproducible maneuvers documented.",
      "Result routing: Final report sent to Dr. Chen for the May 20 visit; the numbers alone do not trigger an automatic medication change."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Pulmonary Lab"
  },
  {
    "id": "may20-pulmonary-followup",
    "date": "2026-05-20",
    "displayDate": "May 20",
    "title": "Pulmonology: stable recovery and shared next steps",
    "short": "No nighttime symptoms · controller continued",
    "category": "visit",
    "summary": "Dr. Chen reviews improved spirometry, symptom control and the patient’s goals after the hospitalization.",
    "details": [
      "Patient report: No nighttime awakenings in four weeks, rescue inhaler used once after a dusty work task, and no urgent care since March.",
      "Review: May FEV₁ 93% predicted compared with the March recovery baseline; spacer technique demonstrated correctly.",
      "Patient-specific decision: Continue the current budesonide–formoterol maintenance prescription through the demonstration period. A future step-down discussion is deferred until a longer stable interval.",
      "Coordination: Updated plan sent to primary care and pharmacy; the March access issue remains resolved."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide–formoterol; albuterol"
  },
  {
    "id": "may22-june-reschedule",
    "date": "2026-05-22",
    "displayDate": "May 22",
    "title": "Telephone: June review moved and coordinated",
    "short": "Front desk · labs stay ahead of the visit",
    "category": "telephone",
    "summary": "The front desk reschedules Maya’s June review while preserving the order of testing and clinician follow-up.",
    "details": [
      "Maya asks to move the original June 25 visit because of a workplace event.",
      "Nia Brooks, scheduling: Offers June 26 at 8:20 AM; keeps laboratory testing on June 24 and confirms the pharmacy visit remains June 8.",
      "Staff action: Updates reminders and notes that the June visit includes the six-month care-plan review.",
      "Outcome: Patient accepts; no duplicate appointments remain."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "may27-allergy-message",
    "date": "2026-05-27",
    "displayDate": "May 27",
    "title": "MyChart: spring allergy symptoms have eased",
    "short": "Intermittent cetirizine use documented",
    "category": "message",
    "summary": "Maya updates the care team about the as-needed allergy medicine added in April.",
    "details": [
      "Maya Bennett, patient: “I used cetirizine on about ten days this spring, mostly after gardening. I have not needed it for over a week.”",
      "Lena Ortiz, MD: “I noted the intermittent use and improvement. We will mark the seasonal course inactive for now and review again if symptoms return.”",
      "Maya Bennett: “I still have tablets, so I do not need a refill.”",
      "Thread outcome: Seasonal cetirizine use is marked inactive May 27; no refill or ongoing daily exposure is assumed."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health",
    "medication": "Cetirizine 10 mg as needed"
  },
  {
    "id": "may29-controller-renewal",
    "date": "2026-05-29",
    "displayDate": "May 29",
    "title": "Prescription renewal: maintenance inhaler",
    "short": "Pulmonary plan reviewed · coverage remains active",
    "category": "medication",
    "summary": "The pulmonary team renews the controller prescription following the stable May assessment.",
    "details": [
      "Order: Budesonide–formoterol 80/4.5 mcg, two puffs twice daily; one 120-actuation inhaler with two refills.",
      "Renewal status: Sent to the demo pharmacy for the next eligible monthly fill; it is not recorded as an extra early dispensed inhaler.",
      "Access: Existing prior authorization remains valid. Pharmacy confirms no new authorization task is required.",
      "Continuity: Albuterol remains a separate rescue prescription; budesonide-only therapy remains discontinued."
    ],
    "recordType": "Synthetic medication record",
    "clinician": "Emery Chen, MD · pulmonology",
    "institution": "Harborlight Demo Health",
    "medication": "Budesonide–formoterol 80/4.5 mcg"
  },
  {
    "id": "jun02-insurance-call",
    "date": "2026-06-02",
    "displayDate": "Jun 2",
    "title": "Telephone: 90-day supply eligibility confirmed",
    "short": "Pharmacy and demo payer · final coverage check",
    "category": "telephone",
    "summary": "The pharmacist confirms the timing and coverage details for the planned longer oral medication supplies.",
    "details": [
      "Pharmacy action: Confirms the routine May 17 metformin ER fill (90 tablets) and obtains approval for the synchronized June 8 conversion to 90-day oral supplies.",
      "Patient discussion: Maya confirms the current doses and her preference for 90-day supplies. The May 5 losartan and atorvastatin supplies reach June 3; four-tablet bridge supplies of each are dispensed June 2 under the existing prescriptions to cover June 4–7.",
      "Boundary: The demo plan authorizes the early metformin supply conversion for synchronization. No dose or substitution is selected by the payer representative; the pharmacist routes renewal details to Dr. Ortiz.",
      "Outcome: Supply conversion prepared for the June 8 medication-review visit."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun04-lab-reminder-message",
    "date": "2026-06-04",
    "displayDate": "Jun 4",
    "title": "MyChart: a clear plan for June appointments",
    "short": "Labs, pharmacy and care review in one thread",
    "category": "message",
    "summary": "Scheduling staff consolidate the upcoming appointments so Maya can plan around work.",
    "details": [
      "Nia Brooks, front desk: “Your upcoming appointments are pharmacy review June 8, laboratory visit June 24, and Dr. Ortiz June 26 at 8:20 AM.”",
      "Maya Bennett, patient: “Those dates work. Can the doctor see the pulmonary note and the pharmacy list before we meet?”",
      "Nia Brooks, front desk: “Both are in your chart. I added your request to the visit agenda and routed clinical questions to the care team.”",
      "Thread outcome: Appointments confirmed; the visit agenda includes results, asthma follow-up and travel supply."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun08-pharmacy-review",
    "date": "2026-06-08",
    "displayDate": "Jun 8",
    "title": "Pharmacist: stable regimen, fewer pickups",
    "short": "90-day oral supplies dispensed · teach-back complete",
    "category": "visit",
    "summary": "The medication review confirms the current regimen and completes the planned supply conversion.",
    "details": [
      "Patient-reported use: Metformin ER 1,500 mg nightly, losartan 50 mg daily, atorvastatin 20 mg nightly, budesonide–formoterol maintenance and infrequent as-needed albuterol.",
      "Prescriber-approved orders and dispensing: Metformin ER 500 mg ×270 tablets, losartan 50 mg ×90 and atorvastatin 20 mg ×90 are dispensed June 8 as 90-day supplies with unchanged directions.",
      "Inactive therapies verified: Budesonide-only controller discontinued; prednisone course completed; inpatient insulin and nebulizer treatments stopped; seasonal cetirizine inactive.",
      "Teach-back: Maya explains her morning/evening routine and distinguishes maintenance from rescue inhalers.",
      "Outcome: Supply planning task closed before July travel. The May 17 controller continuation fill is confirmed; the next eligible monthly fill is scheduled for June 16."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Priya Soren, PharmD · clinical pharmacist",
    "institution": "Harborlight Demo Health",
    "medication": "Metformin ER 1,500 mg; losartan 50 mg; atorvastatin 20 mg"
  },
  {
    "id": "jun12-goals-message",
    "date": "2026-06-12",
    "displayDate": "Jun 12",
    "title": "MyChart: Maya sets the review agenda",
    "short": "Energy, walking and a simpler care routine",
    "category": "message",
    "summary": "Maya identifies the outcomes that matter to her before the final care-plan review.",
    "details": [
      "Maya Bennett, patient: “For our June visit, I want to check whether the numbers match how much better I feel. I am less tired, walking regularly, and spending less time sorting out refills.”",
      "Lena Ortiz, MD: “I added those goals to our agenda. We will review your June results along with your blood-pressure log and asthma follow-up.”",
      "Maya Bennett: “I also want a clear list of which appointments come next.”",
      "Thread outcome: Patient priorities appear in the June 26 care-plan note."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun16-confirmation-call",
    "date": "2026-06-16",
    "displayDate": "Jun 16",
    "title": "Telephone: final review logistics confirmed",
    "short": "Front desk · no outstanding scheduling barrier",
    "category": "telephone",
    "summary": "The front desk confirms the upcoming laboratory and care-review visits and resolves a timing question.",
    "details": [
      "Maya asks how much time to allow between the laboratory draw and her work shift.",
      "Nia Brooks, scheduling: Reviews the booked slot, confirms the requisitions are present and relays the lab’s standard arrival instructions.",
      "Staff action: Confirms the June 26 visit and notes that Maya will bring her home BP log and current inhalers.",
      "Outcome: No transportation, portal-access or scheduling barrier remains open."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Nia Brooks · front desk / scheduling",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun18-nutrition-review",
    "date": "2026-06-18",
    "displayDate": "Jun 18",
    "title": "Nutrition review: habits that lasted",
    "short": "Patient goals sustained across six months",
    "category": "visit",
    "summary": "The dietitian reviews the routines Maya chose and prepares a concise handoff for the PCP.",
    "details": [
      "Patient report: Breakfast on most workdays, lunch prepared at home three days weekly and regular comfortable walking after work.",
      "Perspective: Maya describes the March admission as a disruption she recovered from, rather than a reason to abandon the plan.",
      "Next goal: Maintain routines during July travel and arrange a nutrition follow-up only if she needs additional support.",
      "Handoff: Goal progress and remaining questions are routed to Dr. Ortiz for the June 26 review."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Tess Rowan, RDN · diabetes education",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun22-previsit-message",
    "date": "2026-06-22",
    "displayDate": "Jun 22",
    "title": "MyChart: pre-visit check-in completed",
    "short": "Medication list and home BP log submitted",
    "category": "message",
    "summary": "Maya completes the final pre-visit questionnaire and confirms the reconciled medication list.",
    "details": [
      "Maya Bennett, patient: “The active medicine list matches my bottles. My home BP average for the last week is 126/78. No new concerns to add.”",
      "Jonah Ellis, RN: “I entered the readings and reviewed the medication list. Your lab appointment is June 24 and the care-plan review is June 26.”",
      "Maya Bennett: “I will bring the inhalers and my list of questions about next appointments.”",
      "Thread outcome: Pre-visit review complete; the care team has the patient’s current report before reviewing new labs."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun24-final-labs",
    "date": "2026-06-24",
    "displayDate": "Jun 24",
    "title": "Six-month labs: sustained improvement",
    "short": "HbA1c 6.6% · LDL-C 76 mg/dL",
    "category": "lab",
    "summary": "The final synthetic laboratory panel completes the six-month trajectory.",
    "details": [
      "HbA1c: 6.6%, compared with 7.1% in April and 8.4% in January; fasting glucose: 116 mg/dL.",
      "Lipid panel: LDL-C 76 mg/dL; HDL-C 51 mg/dL; triglycerides 128 mg/dL.",
      "Creatinine: 0.79 mg/dL; eGFR: 96 mL/min/1.73 m²; potassium: 4.2 mmol/L; ALT: 21 U/L.",
      "Result workflow: Final results released to MyChart and reviewed by Dr. Ortiz before the June 26 visit."
    ],
    "recordType": "Synthetic laboratory / diagnostic result",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun25-results-call",
    "date": "2026-06-25",
    "displayDate": "Jun 25",
    "title": "Telephone: results received before the review",
    "short": "RN callback · questions added to the agenda",
    "category": "telephone",
    "summary": "The nurse confirms Maya can view the new results and records her questions for the clinician.",
    "details": [
      "Jonah Ellis, RN: Confirms that the laboratory panel is finalized and that Dr. Ortiz has reviewed it.",
      "Maya asks whether improved A1c means the medication plan will change and when the next eye examination is due.",
      "RN action: Adds both questions to the visit agenda; no medication discontinuation is proposed during the call.",
      "Outcome: June 26 care-plan review confirmed."
    ],
    "recordType": "Synthetic telephone encounter",
    "clinician": "Jonah Ellis, RN · clinical triage",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun26-care-plan",
    "date": "2026-06-26",
    "displayDate": "Jun 26",
    "title": "Six-month review: one connected care plan",
    "short": "A1c 6.6% · BP 126/78 · asthma stable",
    "category": "visit",
    "summary": "Maya and Dr. Ortiz review six months of care, sustained progress and the next follow-up responsibilities.",
    "details": [
      "Current findings: BP 126/78 mmHg; weight 84.8 kg; oxygen saturation 98% on room air. HbA1c 6.6% and LDL-C 76 mg/dL are reviewed together.",
      "Diabetes / BP / lipids: Continue the current metformin ER 1,500 mg, losartan 50 mg and atorvastatin 20 mg prescriptions. Improved results are discussed as part of an ongoing plan, not a reason to automatically stop therapy.",
      "Asthma: No further urgent care after the March admission; May lung testing and the pulmonary plan reviewed. Budesonide–formoterol maintenance and separate albuterol rescue prescription remain active.",
      "Patient goals: Energy and walking have improved by Maya’s report; refill burden is lower after supply synchronization. She demonstrates an accurate understanding of the medication list.",
      "Next steps recorded: Primary-care and A1c review in three months; pulmonary reassessment per the specialist’s plan; routine retinal examination due January 2027. Future appointments are plans beyond this demo window, not completed events.",
      "Closed loops: Controller authorization resolved; routine inhaler fills April 17, May 17 and June 16 verified; discharge reconciliation completed; eye referral completed; oral prescriptions synchronized with the June 4–7 bridge accounted for; no outstanding scheduling barrier reported."
    ],
    "recordType": "Synthetic office encounter",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  },
  {
    "id": "jun26-visit-summary",
    "date": "2026-06-26",
    "displayDate": "Jun 26",
    "title": "MyChart: the next chapter is clear",
    "short": "Patient summary · ownership and follow-up confirmed",
    "category": "message",
    "summary": "The final portal exchange leaves Maya with a concise, understandable care plan and a place to ask questions.",
    "details": [
      "Lena Ortiz, MD: “Today we reviewed your progress and kept the current medication plan. Your visit summary includes the active list, next laboratory review and which team handles each follow-up.”",
      "Maya Bennett, patient: “I can find everything now. The inhaler issue is solved, the prescriptions are lined up, and I know which appointments come next.”",
      "Priya Soren, PharmD: “Your oral supplies were dispensed June 8, and the monthly inhaler reminder remains active. The old controller and short hospital treatments are marked inactive.”",
      "Nia Brooks, front desk: “The next primary-care request is in the scheduling queue. We will send available appointment options through MyChart.”",
      "Thread outcome: Six-month demonstration complete; future scheduling is pending, not represented as a completed encounter."
    ],
    "recordType": "Synthetic MyChart message thread",
    "clinician": "Lena Ortiz, MD · primary care",
    "institution": "Harborlight Demo Health"
  }
];

export const medications: Medication[] = [
  {
    "name": "Metformin ER",
    "generic": "metformin hydrochloride ER",
    "color": "#8e78d7",
    "className": "Biguanide · diabetes",
    "summary": "Started after the January diabetes diagnosis, gradually titrated, briefly held during acute hospital care and resumed at 1,500 mg. June dispensing converted to a 90-day supply.",
    "segments": [
      {
        "start": "2026-01-09",
        "label": "500 mg nightly",
        "status": "prescribed",
        "note": "January 9 order; first 30-tablet fill January 12. Maya reports starting January 12. An order interval does not establish daily administration.",
        "end": "2026-01-15"
      },
      {
        "start": "2026-01-16",
        "label": "1,000 mg nightly",
        "status": "prescribed",
        "note": "Dose increased after tolerability review. Two 500 mg ER tablets; updated label and supply recorded January 19.",
        "end": "2026-02-12"
      },
      {
        "start": "2026-02-13",
        "label": "1,500 mg nightly",
        "status": "prescribed",
        "note": "Three 500 mg ER tablets with the evening meal. Revised supply dispensed February 13; use reported February 18.",
        "end": "2026-03-11"
      },
      {
        "start": "2026-03-12",
        "label": "Held during admission",
        "status": "planned",
        "note": "Hospital plan temporarily holds metformin during acute illness. This span explicitly represents no planned metformin dosing; temporary correction insulin is recorded separately.",
        "end": "2026-03-13"
      },
      {
        "start": "2026-03-14",
        "label": "1,500 mg resumed",
        "status": "prescribed",
        "note": "Discharge plan resumes the established dose March 14. Ninety-tablet continuation fills recorded March 17, April 17 and May 17; 270 tablets dispensed June 8 for 90 days after the demo plan approves early synchronization. Display ends at the demo boundary, not a stop order.",
        "end": "2026-06-26"
      },
      {
        "start": "2026-06-08",
        "label": "Current use confirmed",
        "status": "reported",
        "note": "At the June 8 bottle review, Maya reports taking 1,500 mg nightly without current stomach upset. This is a patient report, not a continuous administration record."
      }
    ]
  },
  {
    "name": "Losartan",
    "generic": "losartan potassium",
    "color": "#c6a054",
    "className": "ARB · blood pressure",
    "summary": "Started at 25 mg and increased to 50 mg after home BP review. Kidney function and potassium remained stable in the synthetic follow-up results.",
    "segments": [
      {
        "start": "2026-01-09",
        "label": "25 mg daily",
        "status": "prescribed",
        "note": "Initial prescription January 9; dispensed January 12. Maya reports beginning January 12.",
        "end": "2026-02-11"
      },
      {
        "start": "2026-02-12",
        "label": "50 mg daily",
        "status": "prescribed",
        "note": "Increased February 12 after home readings remained elevated. The 25 mg order is discontinued. Renewed and 30 tablets dispensed May 5; four-tablet bridge dispensed June 2 covers June 4–7; 90 tablets dispensed June 8. Ongoing at demo end.",
        "end": "2026-06-26"
      },
      {
        "start": "2026-02-18",
        "label": "50 mg use confirmed",
        "status": "reported",
        "note": "Bottle review confirms Maya reports the revised dose and has removed the old directions from her routine."
      },
      {
        "start": "2026-05-12",
        "label": "90-day supply planned",
        "status": "planned",
        "note": "Coverage review plans a longer supply without changing the dose. Dispensing is not implied until the June 8 pharmacy record.",
        "end": "2026-06-07"
      },
      {
        "start": "2026-06-08",
        "label": "50 mg use confirmed",
        "status": "reported",
        "note": "Maya reports continued daily use at the June medication review; BP readings are documented separately."
      }
    ]
  },
  {
    "name": "Atorvastatin",
    "generic": "atorvastatin calcium",
    "color": "#5b9fb4",
    "className": "Statin · cholesterol",
    "summary": "Added after a shared decision in January. LDL-C decreases from 146 to 76 mg/dL across the demo, while the recorded prescription remains 20 mg nightly.",
    "segments": [
      {
        "start": "2026-01-30",
        "label": "20 mg nightly",
        "status": "prescribed",
        "note": "Initial order January 30; 30 tablets dispensed January 31. Continued after the April and June reviews. Thirty-tablet refill dispensed May 5; four-tablet bridge dispensed June 2 covers June 4–7; 90 tablets dispensed June 8. No stop order at demo end.",
        "end": "2026-06-26"
      },
      {
        "start": "2026-02-18",
        "label": "Started Jan 31 · reported",
        "status": "reported",
        "note": "Maya reports beginning atorvastatin January 31 and no muscle symptoms at the pharmacist review."
      },
      {
        "start": "2026-05-12",
        "label": "90-day supply planned",
        "status": "planned",
        "note": "Longer supply considered for stable therapy and travel planning; prescription dose remains unchanged.",
        "end": "2026-06-07"
      },
      {
        "start": "2026-06-08",
        "label": "Current use confirmed",
        "status": "reported",
        "note": "Patient reports taking 20 mg nightly at the bottle review. The report is distinct from pharmacy dispensing."
      }
    ]
  },
  {
    "name": "Budesonide inhaler",
    "generic": "budesonide inhalation powder",
    "color": "#b189c8",
    "className": "Inhaled corticosteroid · previous controller",
    "summary": "Existing asthma controller at intake. Replaced by the combination controller at hospital discharge; the old order is explicitly marked discontinued.",
    "segments": [
      {
        "start": "2026-01-06",
        "label": "180 mcg twice daily",
        "status": "reported",
        "note": "At intake Maya reports an established prescription of one 180 mcg inhalation twice daily. February 18 and 20 follow-up supports continued reported use; historical fills before the demo are not imported.",
        "end": "2026-03-11"
      },
      {
        "start": "2026-03-14",
        "label": "Discontinued at discharge",
        "status": "planned",
        "note": "Discharge reconciliation replaces the budesonide-only inhaler with budesonide–formoterol. This marker is a stop instruction, not active treatment. Maya confirms stopping the old inhaler March 18."
      }
    ]
  },
  {
    "name": "Budesonide–formoterol",
    "generic": "budesonide / formoterol fumarate",
    "color": "#56978b",
    "className": "ICS / LABA · maintenance inhaler",
    "summary": "Introduced at March discharge. Bridge supply, prior authorization, retail dispensing and technique checks document a complete medication-access story.",
    "segments": [
      {
        "start": "2026-03-14",
        "label": "80/4.5 · 2 puffs twice daily",
        "status": "prescribed",
        "note": "Patient-specific maintenance prescription at discharge, with separate albuterol rescue therapy. Seven-day bridge supply dispensed March 14; 120-actuation retail inhaler dispensed March 17. Authorization approved March 17; routine refills recorded April 17, May 17 and June 16; renewed May 29. Ongoing at demo end.",
        "end": "2026-06-26"
      },
      {
        "start": "2026-03-16",
        "label": "Authorization pending → approved",
        "status": "planned",
        "note": "A coverage workflow interval, not a medication gap. The hospital bridge supply is available while the demo payer processes the request; Maya reports no interruption.",
        "end": "2026-03-17"
      },
      {
        "start": "2026-03-19",
        "label": "Technique and use checked",
        "status": "reported",
        "note": "Maya reports the prescribed maintenance use at pharmacist review, presents the inhaler and demonstrates spacer technique after coaching."
      },
      {
        "start": "2026-06-08",
        "label": "Current use confirmed",
        "status": "reported",
        "note": "Patient confirms the active combination controller at the June medication review. The discontinued budesonide-only product is not used concurrently."
      }
    ]
  },
  {
    "name": "Albuterol HFA",
    "generic": "albuterol sulfate",
    "color": "#6586bc",
    "className": "Short-acting bronchodilator · rescue",
    "summary": "Existing rescue inhaler with a February replacement refill, more frequent reported use before the March admission and infrequent use after recovery.",
    "segments": [
      {
        "start": "2026-01-06",
        "label": "Existing rescue · reported",
        "status": "reported",
        "note": "At intake Maya reports albuterol 90 mcg as her established rescue inhaler, used less than weekly. No pre-demo dispensing record is imported."
      },
      {
        "start": "2026-02-24",
        "label": "90 mcg · as needed",
        "status": "prescribed",
        "note": "Replacement prescription: two puffs every 4–6 hours as needed under Maya’s individualized asthma plan; one 200-actuation inhaler dispensed February 25. A prescription span does not indicate continuous use.",
        "end": "2026-06-26"
      },
      {
        "start": "2026-03-10",
        "label": "Increased use reported",
        "status": "reported",
        "note": "Portal and triage encounters record increasing rescue use during the respiratory illness; exact actuation counts are not asserted.",
        "end": "2026-03-11"
      },
      {
        "start": "2026-05-20",
        "label": "Infrequent use reported",
        "status": "reported",
        "note": "At pulmonary follow-up Maya reports one rescue use after a dusty work task during the preceding four weeks. The active prescription is unchanged."
      }
    ]
  },
  {
    "name": "Prednisone",
    "generic": "prednisone",
    "color": "#cc9276",
    "className": "Systemic corticosteroid · short course",
    "summary": "Five-day treatment during the March asthma episode: three inpatient doses and two remaining outpatient doses, then completed.",
    "segments": [
      {
        "start": "2026-03-12",
        "label": "40 mg daily · administered",
        "status": "inpatient",
        "note": "Synthetic hospital MAR records prednisone 40 mg orally on March 12, 13 and 14.",
        "end": "2026-03-14"
      },
      {
        "start": "2026-03-15",
        "label": "40 mg · final two doses",
        "status": "prescribed",
        "note": "Two remaining daily doses are dispensed at March 14 discharge, completing the five-day order. This is not maintenance treatment.",
        "end": "2026-03-16"
      },
      {
        "start": "2026-03-16",
        "label": "Course completed · reported",
        "status": "reported",
        "note": "At the March 16 transition call Maya reports taking the last dose. Completion is reconfirmed in the March 18 MyChart thread."
      }
    ]
  },
  {
    "name": "Ipratropium–albuterol",
    "generic": "ipratropium bromide / albuterol sulfate",
    "color": "#9d88a9",
    "className": "Nebulized bronchodilators · hospital only",
    "summary": "Administered during the acute asthma admission; no outpatient prescription or ongoing home nebulizer use is part of the demo.",
    "segments": [
      {
        "start": "2026-03-12",
        "label": "0.5 / 2.5 mg per 3 mL",
        "status": "inpatient",
        "note": "ED and inpatient administration documented in the synthetic MAR. Treatments are spaced as breathing improves; the plotted span does not represent continuous administration.",
        "end": "2026-03-13"
      },
      {
        "start": "2026-03-14",
        "label": "Stopped before discharge",
        "status": "planned",
        "note": "Discharge reconciliation explicitly removes inpatient nebulized combination therapy. The active home rescue prescription is albuterol HFA."
      }
    ]
  },
  {
    "name": "Insulin lispro",
    "generic": "insulin lispro",
    "color": "#bf7f96",
    "className": "Rapid-acting insulin · hospital only",
    "summary": "Brief correction treatment during steroid-associated acute-care glucose elevations. Stopped before discharge; Maya does not use insulin at home.",
    "segments": [
      {
        "start": "2026-03-13",
        "label": "Correction doses · administered",
        "status": "inpatient",
        "note": "Synthetic MAR documents protocol-directed correction doses March 13 and 14. A glucose peak of 268 mg/dL is recorded in the hospital narrative; exact doses are not invented in this summary.",
        "end": "2026-03-14"
      },
      {
        "start": "2026-03-14",
        "label": "No outpatient prescription",
        "status": "planned",
        "note": "Discharge team stops correction insulin and resumes metformin. This marker represents a discontinuation decision, not future insulin treatment."
      }
    ]
  },
  {
    "name": "Cetirizine",
    "generic": "cetirizine hydrochloride",
    "color": "#829c62",
    "className": "Antihistamine · seasonal symptoms",
    "summary": "A brief spring as-needed prescription for nasal and eye symptoms. Maya reports intermittent use and no need for a refill; marked inactive in late May.",
    "segments": [
      {
        "start": "2026-04-03",
        "label": "10 mg daily as needed",
        "status": "prescribed",
        "note": "Thirty-tablet order April 3; pickup April 4. The interval reflects an available as-needed prescription, not daily administration. Seasonal course marked inactive May 27.",
        "end": "2026-05-27"
      },
      {
        "start": "2026-05-27",
        "label": "Intermittent use · now inactive",
        "status": "reported",
        "note": "Maya reports use on about ten spring days and none for more than a week. Remaining tablets do not imply ongoing treatment."
      }
    ]
  }
];
