# Glossary

This glossary defines the terminology used across **Tecnoleads** (as reflected in the codebase), including domain entities, system concepts, and common user-facing terms. It is intended to align product/business language with implementation details so developers, QA, and stakeholders can communicate precisely.

> Cross-reference: See **[project-overview.md](./project-overview.md)** for architecture, modules, and high-level flows.

## Domain overview (conceptual)

At a high level, the system models **lead acquisition and management** workflows:

- capturing inbound leads (from forms, integrations, or manual entry),
- qualifying/enriching them,
- assigning ownership,
- tracking status and activity,
- and reporting/analytics on the pipeline.

The exact naming may vary between UI and API layers, but the concepts below should map consistently.

---

## Type Definitions

This section lists **exported types/interfaces** and links to their source locations.

**Current repository context:** No exported type definitions were discoverable from the provided repository context/symbol index. If types exist, add them here.

Use this format when adding items:

- **`TypeName`** — short description.  
  Source: `path/to/file.ts` (line X)  
  Related terms: Lead, Pipeline, Status

**Placeholders:**

- _No exported types indexed yet (update after running symbol extraction / ensuring TS types are exported)._

---

## Enumerations

This section lists **exported enums** and links to their source locations.

**Current repository context:** No exported enumerations were discoverable from the provided repository context/symbol index. If enums exist, add them here.

Use this format when adding items:

- **`EnumName`** — values summary and intended usage.  
  Source: `path/to/file.ts` (line X)  
  Examples: `NEW | QUALIFIED | WON | LOST`

**Placeholders:**

- _No exported enums indexed yet (update after running symbol extraction / ensuring enums are exported)._

---

## Core Terms

- **Lead**  
  A potential customer record representing an individual or organization that may be contacted or nurtured.  
  **Relevance:** Core entity for acquisition, qualification, ownership, and reporting.  
  **Where it surfaces:** UI lists/detail views; API payloads; persistence layer models; validation rules.

- **Prospect**  
  A lead that has been qualified to some degree (business definition may overlap with “qualified lead”).  
  **Relevance:** Often used to distinguish early-stage captured data from sales-ready opportunities.  
  **Where it surfaces:** Pipeline stages/status; reporting breakdowns.

- **Contact**  
  A person (name, email, phone, role) associated with a lead/prospect/customer.  
  **Relevance:** Normalizes identity information and communication history.  
  **Where it surfaces:** Lead detail pages; communication/activity modules.

- **Account / Company**  
  An organization associated with one or more contacts/leads (B2B).  
  **Relevance:** Deduplication, segmentation, ownership, and reporting by company.  
  **Where it surfaces:** Enrichment, CRM synchronization, reporting.

- **Source**  
  The origin of a lead (e.g., website form, campaign, referral, integration).  
  **Relevance:** Attribution, ROI, channel performance.  
  **Where it surfaces:** Lead creation inputs; analytics; filtering.

- **Campaign**  
  A marketing initiative used for tracking acquisition and attribution.  
  **Relevance:** Metrics and segmentation by campaign; UTM mapping.  
  **Where it surfaces:** Lead metadata, reports/dashboards.

- **Pipeline**  
  A structured sequence of stages representing progression from new lead to outcome.  
  **Relevance:** Sales workflow standardization and forecasting.  
  **Where it surfaces:** Kanban/board views; reports; status transitions.

- **Stage / Status**  
  A discrete value indicating current position in the pipeline (e.g., New → Contacted → Qualified → Won/Lost).  
  **Relevance:** Drives UI grouping, allowed actions, and metrics.  
  **Where it surfaces:** Lead record field; validation of transitions; analytics.

- **Owner / Assignee**  
  The user responsible for the lead (sales rep/SDR).  
  **Relevance:** Work distribution, accountability, and notification routing.  
  **Where it surfaces:** Assignment logic, permissions, filters, notifications.

- **Activity / Interaction**  
  Logged events such as calls, emails, meetings, notes, and tasks.  
  **Relevance:** Audit trail and context for sales engagement.  
  **Where it surfaces:** Timeline components; integrations; reporting.

- **Task / Follow-up**  
  A scheduled action tied to a lead/contact (e.g., “call tomorrow”).  
  **Relevance:** Ensures next steps and SLA adherence.  
  **Where it surfaces:** Reminders; dashboards; personal queues.

- **Qualification**  
  The process/criteria used to determine lead readiness (e.g., budget, authority, need, timeline).  
  **Relevance:** Separates noise from actionable opportunities.  
  **Where it surfaces:** Forms, scoring, and status changes.

- **Lead Score / Scoring**  
  A numeric or categorical ranking indicating engagement/fit.  
  **Relevance:** Prioritization and automation triggers.  
  **Where it surfaces:** Sorting/filtering; automation rules; dashboards.

- **Enrichment**  
  Augmenting lead data from external sources (company size, industry, social profiles).  
  **Relevance:** Improves conversion and segmentation.  
  **Where it surfaces:** Integration services; background jobs.

- **Deduplication (Dedup)**  
  Detecting and merging duplicates across leads/contacts.  
  **Relevance:** Data quality and accurate reporting.  
  **Where it surfaces:** Create/update flows; import; sync processes.

- **Import**  
  Bulk ingestion of leads/contacts from CSV or external systems.  
  **Relevance:** Migration and campaign uploads.  
  **Where it surfaces:** Admin tools; background processing.

- **Integration / Connector**  
  A component that exchanges data with third-party services (CRM, email, ads platforms).  
  **Relevance:** Sync workflows and automation.  
  **Where it surfaces:** API clients; webhook handlers; job queues.

- **Webhook**  
  Inbound HTTP callback triggered by third-party events (e.g., new lead from form provider).  
  **Relevance:** Near-real-time ingestion and updates.  
  **Where it surfaces:** API routes/controllers; signature validation; idempotency handling.

- **Tenant / Workspace**  
  A logical partition representing a customer organization in a multi-tenant setup.  
  **Relevance:** Security boundary for data and configuration.  
  **Where it surfaces:** Authentication claims; database scoping; RBAC.

- **RBAC (Role-Based Access Control)**  
  Authorization model controlling what actions a user can perform.  
  **Relevance:** Protects sensitive data and admin capabilities.  
  **Where it surfaces:** Middleware/guards; UI gating; admin endpoints.

---

## Acronyms & Abbreviations

- **CRM** — Customer Relationship Management (systems where leads/opportunities are managed).
- **SDR** — Sales Development Representative (often first-touch lead qualification).
- **MQL** — Marketing Qualified Lead (meets marketing criteria).
- **SQL** — Sales Qualified Lead (meets sales-readiness criteria).
- **UTM** — Urchin Tracking Module (campaign tracking parameters in URLs).
- **RBAC** — Role-Based Access Control.
- **PII** — Personally Identifiable Information (email, phone, etc.; impacts compliance).
- **SLA** — Service Level Agreement (e.g., follow-up within X hours).

---

## Personas / Actors

### Sales Representative / Account Executive (AE)

- **Goals:** Convert qualified leads into customers; maintain an accurate pipeline.
- **Key workflows:** View assigned leads → review context/activity → contact → update stage/status → log outcomes.
- **Pain points addressed:** Prioritization (scoring), visibility (activity timeline), reduced data entry (enrichment/integrations).

### Sales Development Representative (SDR) / Lead Qualifier

- **Goals:** Rapidly triage inbound leads and schedule next steps.
- **Key workflows:** Inbox/queue → quick qualification form → set follow-up tasks → handoff to AE.
- **Pain points addressed:** Fast capture, deduplication, reminders, templates.

### Marketing / Growth

- **Goals:** Attribute lead volume and conversion to campaigns/channels; improve lead quality.
- **Key workflows:** Monitor acquisition by source/campaign → adjust forms and campaigns → export/report.
- **Pain points addressed:** Attribution consistency (UTM/source), reporting, import tools.

### Admin / Operations

- **Goals:** Configure the workspace, manage users/roles, ensure data quality and compliance.
- **Key workflows:** User management → role assignment → integration setup → import/export → audit/reports.
- **Pain points addressed:** RBAC, tenant isolation, observability, dedup rules.

---

## Domain Rules & Invariants

The items below capture common invariants for lead-management systems. Adjust to match the repository’s implemented validation once verified.

### Data integrity & identity

- **Email/phone uniqueness (soft rule):** Leads/contacts may be deduplicated by normalized email and/or phone.
- **Normalization:** Emails should be lowercased; phones stored in a normalized format (e.g., E.164) when possible.
- **Merge behavior:** When duplicates are detected, merging should preserve provenance (source) and activity history.

### Pipeline/stage behavior

- **Valid transitions:** Status/stage changes should follow allowed transitions (e.g., cannot go from `NEW` directly to `WON` without intermediate qualification if the business requires it).
- **Terminal states:** “Won” and “Lost” (or equivalents) are typically terminal; moving out may require elevated permissions or an explicit “reopen” action.

### Ownership & accountability

- **Single owner invariant:** A lead should have exactly one active owner/assignee at a time (unless the system explicitly supports shared ownership).
- **Assignment permissions:** Only authorized roles can reassign leads across users/teams.

### Compliance & privacy (PII)

- **PII access control:** Viewing/exporting sensitive fields may be restricted by role.
- **Retention policies:** Activity logs and lead data may require retention rules (especially if operating in regulated regions).
- **Consent tracking (if applicable):** Communication may require consent flags and opt-out handling.

### Imports/webhooks/integrations

- **Idempotency:** Webhook events should be processed idempotently (same event does not create duplicates).
- **Auditability:** Imported or integration-created leads should record the originating system and timestamp.

---

## Related Resources

- [project-overview.md](./project-overview.md)
