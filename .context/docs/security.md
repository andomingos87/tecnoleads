# Security & Compliance

This document defines the baseline security and compliance guardrails for the Tecnoleads codebase and supporting infrastructure. It is intended to be practical: if a change introduces a new security-relevant behavior (new integration, new data type, new public endpoint, new privileged operation), it must be aligned with these guardrails and reviewed accordingly.

## Core security principles

- **Least privilege by default:** services, users, and automation must have only the permissions required to perform their tasks.
- **Secure-by-default configuration:** production must ship with hardened defaults (no debug modes, no permissive CORS, no open admin endpoints, no default credentials).
- **Defense in depth:** rely on multiple controls (authN/authZ, input validation, rate limiting, logging/alerting, encryption).
- **Auditability:** security-relevant events must be logged and retained long enough to support incident investigation and compliance evidence.
- **Minimize data collection:** collect only what is required to deliver product functionality; prefer aggregated/anonymized forms where possible.

## Security reviews and change management

Security review is required when changes include any of the following:

- New authentication flows or identity providers
- New storage of personal data (PII) or credentials/secrets
- New external integrations (webhooks, third-party APIs, payment providers, email/SMS)
- Publicly exposed endpoints or changes to network boundaries
- New background jobs / schedulers with elevated permissions
- Cryptography changes (algorithms, key storage, encryption at rest/in transit)
- Changes to logging that may include sensitive fields

Recommended workflow:

1. Identify data involved (classification and retention needs).
2. Confirm authN/authZ model for new endpoints and operations.
3. Validate secrets handling and secure configuration.
4. Add tests for permission boundaries and negative cases.
5. Ensure observability: logs, metrics, and alerts for abuse patterns.

## Secure coding expectations

- **Input validation:** validate and normalize user input at boundaries (HTTP handlers, job payloads, webhook handlers). Reject unexpected types and oversized payloads.
- **Injection prevention:** use parameterized queries/ORM methods; never concatenate untrusted input into SQL, shell commands, or template contexts.
- **CSRF/XSS protections:** use CSRF tokens for cookie-based sessions; encode output and avoid unsafe HTML injection.
- **Error handling:** do not leak secrets, tokens, stack traces, or internal identifiers in client responses. Log detailed errors server-side.
- **Dependency management:** keep dependencies updated; address high/critical CVEs promptly. Prefer locked dependency versions and reproducible builds.
- **Security headers:** enforce baseline headers (HSTS, X-Content-Type-Options, X-Frame-Options/frame-ancestors via CSP, Referrer-Policy, CSP as appropriate).

## Operational guardrails

- **Environment separation:** development, staging, and production must use separate credentials, databases, storage buckets, and API keys.
- **Hardening:** production environments must disable verbose logging, debug endpoints, and development tooling.
- **Backups:** backups must be encrypted; test restore procedures periodically; restrict access to backup locations.

---

## Authentication & Authorization

This section describes how identity is established (authentication) and how permissions are enforced (authorization). If the implementation differs, update this document to match current behavior and ensure the implementation aligns with these expectations.

### Authentication (AuthN)

Supported patterns (choose what applies to the deployment; avoid mixing without clear boundaries):

- **Token-based authentication (recommended for APIs):**
  - **Format:** signed tokens (e.g., JWT) or opaque tokens with server-side introspection.
  - **Transport:** `Authorization: Bearer <token>` over HTTPS only.
  - **Token lifetime:** short-lived access tokens (e.g., minutes to hours) with refresh tokens where applicable.
  - **Validation:** verify signature/issuer/audience; validate `exp`, `nbf`, and clock skew; reject tokens missing required claims.

- **Session-based authentication (recommended for browser apps):**
  - **Session storage:** server-side sessions (preferred) or signed/encrypted cookies.
  - **Cookie settings:** `HttpOnly`, `Secure`, `SameSite=Lax/Strict` (based on cross-site needs), narrow `Path`, and appropriate domain scoping.
  - **Session lifetime:** limited duration with idle timeout; rotate session identifiers on login and privilege changes.

- **Third-party identity providers (IdP):**
  - If using OAuth2/OIDC/SAML, enforce:
    - PKCE for public clients
    - strict redirect URI allowlists
    - state/nonce verification
    - well-defined issuer/audience configuration per environment

### Authorization (AuthZ)

Authorization must be enforced server-side for every protected operation.

- **Model:** role-based access control (RBAC) and/or permission-based checks.
  - **RBAC:** users are assigned roles (e.g., `admin`, `manager`, `user`, `readonly`) mapped to allowed operations.
  - **Permissions:** fine-grained permissions (e.g., `leads:read`, `leads:write`, `settings:write`) may be used to avoid role explosion.
- **Resource scoping:** enforce tenant/account ownership where applicable (e.g., users can only access leads belonging to their organization/account).
- **Default deny:** endpoints require explicit allow rules; missing/unknown role/permission must deny access.
- **Administrative actions:** require elevated roles and should be additionally protected by:
  - step-up authentication where supported
  - audit logging with actor, target, and change details
  - confirmation flows for destructive actions

### Webhooks and service-to-service auth

- **Inbound webhooks:** verify signatures (HMAC or asymmetric), validate timestamps, enforce replay protection, and restrict accepted IP ranges if possible.
- **Outbound calls to third parties:** store API keys securely (see Secrets section), use least-privileged tokens/scopes, and handle rate limits safely.
- **Internal service auth:** prefer mTLS or signed service tokens with short TTL; do not use long-lived shared secrets without rotation.

### Logging and audit requirements for auth

Security events that must be logged:

- login success/failure (without storing raw credentials)
- token issuance/refresh/revocation
- permission/role changes
- access denials for protected resources (rate-limited to avoid log flooding)
- administrative and destructive operations

Logs must not contain secrets, raw tokens, or sensitive personal data.

---

## Secrets & Sensitive Data

This section defines where secrets must be stored, how they are rotated, and how sensitive data is classified and protected.

### Data classification

Use the following classifications when handling data:

- **Public:** safe to disclose.
- **Internal:** non-public operational details; disclosure is undesirable but not critical.
- **Confidential:** business-sensitive and user-related data; disclosure may cause harm.
- **Restricted:** credentials, tokens, encryption keys, and high-risk PII; disclosure has severe impact.

Examples of **Restricted** data:

- database passwords, API keys, OAuth client secrets
- signing keys (JWT/cookie), encryption keys
- refresh tokens, session secrets
- payment-related tokens (if applicable)

### Secrets storage (source control policy)

- **Never commit secrets** to the repository, including:
  - `.env` files containing real credentials
  - private keys, certificates, service account JSON
  - access tokens embedded in code, configs, or documentation
- Provide **example templates** instead (e.g., `.env.example`) with placeholder values and clear instructions.

### Runtime secrets management

Secrets must be provided at runtime via a managed secret store or secure deployment mechanism. Acceptable approaches:

- **Managed secret vault** (preferred): e.g., HashiCorp Vault / cloud secret manager.
- **Parameter store / secrets manager:** per-environment values with strict IAM access controls.
- **CI/CD secret injection:** secrets stored in the CI system and injected as environment variables at deploy time.

Requirements:

- **Access controls:** per-environment policies; production secrets accessible only to production runtime identities.
- **Encryption at rest:** enabled by the secret store provider.
- **Encryption in transit:** TLS enforced for retrieval and rotation.
- **No secret echoing:** prevent secrets from being printed in logs, stack traces, or CI output.

### Rotation policy

Minimum rotation cadence (or earlier on suspicion of compromise):

- **API keys and service credentials:** every 90 days (or per provider best practice).
- **JWT/session signing secrets:** every 90–180 days with overlap strategy (support old+new during cutover).
- **Database passwords:** every 90 days; prefer short-lived credentials if supported.
- **Third-party OAuth client secrets:** every 180 days or upon staff/vendor changes.

Rotation must include:

- inventory of where the secret is used
- staged rollout to avoid downtime
- revocation of old credentials after cutover
- post-rotation verification

### Handling sensitive data in application logic

- **Encryption in transit:** all external traffic must use HTTPS; internal traffic should use TLS where feasible.
- **Encryption at rest:** ensure databases and object storage have encryption at rest enabled.
- **Field-level protection:** consider encrypting highly sensitive fields (Restricted) at the application level where appropriate.
- **Masking/redaction:** redact secrets and sensitive identifiers in logs and error reports (e.g., only last 4 characters).
- **Data minimization:** avoid storing raw tokens and third-party payloads unless necessary; store references and metadata when possible.

### Local development guidance

- Use **development-only** credentials and isolated services.
- Keep secrets in local environment variables or local secret managers; do not share `.env` files via chat/email.
- If production data must be used for debugging, it must be **sanitized/anonymized** first and approved by the appropriate owner.

---

## Compliance & Policies

Applicable compliance requirements depend on the deployment context and customer contracts. The following list defines commonly applicable standards and the expected evidence developers should be prepared to provide.

- **GDPR / Data protection (if EU data subjects are involved)**
  - Evidence: data inventory, lawful basis documentation, data retention rules, deletion/export procedures, breach notification process.
- **SOC 2 (if pursuing or maintaining trust assurance)**
  - Evidence: access control reviews, change management records, incident response documentation, audit logs, vulnerability management records.
- **OWASP ASVS / Top 10 alignment (security baseline)**
  - Evidence: secure coding practices, dependency scanning results, security tests for auth and input validation, remediation tracking.
- **Internal security policies**
  - Evidence: secrets management compliance (no secrets in repo), least privilege IAM, environment separation, backup and restore tests.

If a customer contract specifies additional controls (e.g., HIPAA, PCI DSS), document the scope and technical measures explicitly and update this section accordingly.

---

## Incident Response

This section defines the minimum incident handling process for security events (suspected credential compromise, data exposure, abnormal access, or active exploitation).

### Detection and triage

- **Detection sources:** application logs, infrastructure logs, WAF/rate-limit alerts, CI/CD audit trails, database audit logs, third-party provider security alerts.
- **Triage goals:**
  1. Confirm whether the event is a security incident.
  2. Determine scope (affected services, users, data types, time window).
  3. Contain quickly while preserving evidence.

### Containment and eradication

- Revoke/rotate affected credentials and tokens immediately.
- Disable compromised accounts and remove unknown access keys.
- Apply emergency mitigations (feature flag off, block IP ranges, tighten firewall/WAF rules, disable impacted endpoints).
- Patch the vulnerability and validate with tests.

### Recovery and post-incident actions

- Restore services safely (verify integrity, redeploy clean builds, confirm access controls).
- Perform a post-incident review:
  - timeline of events
  - root cause analysis
  - customer impact assessment
  - corrective and preventive actions (CAPA)
- Preserve relevant logs and artifacts to support investigation and compliance obligations.

### Communications and escalation

- Maintain a clear escalation path (engineering lead → security owner → product/legal as required).
- If personal data may be involved, notify the responsible privacy/compliance contact promptly to evaluate regulatory notification obligations.
- Avoid sharing sensitive incident details in public channels; use designated secure communication channels.

---

## Related Resources

- [architecture.md](./architecture.md)
