---
status: draft
generated: 2026-02-02
agents:
  - type: "architect-specialist"
    role: "Define auth architecture and role model"
  - type: "backend-specialist"
    role: "Implement Supabase Auth integration and access control"
  - type: "frontend-specialist"
    role: "Implement UX guards and role-based navigation"
  - type: "database-specialist"
    role: "Design profiles schema and RLS policies"
  - type: "security-auditor"
    role: "Review auth and RLS for least-privilege access"
  - type: "test-writer"
    role: "Add smoke tests for auth and access control"
  - type: "documentation-writer"
    role: "Document auth rules and onboarding steps"
docs:
  - "prd.md"
  - "regras.md"
  - "backlog_mvp.md"
  - "stack.md"
  - ".context/docs/security.md"
  - ".context/docs/architecture.md"
phases:
  - id: "phase-1"
    name: "Discovery & Alignment"
    prevc: "P"
  - id: "phase-2"
    name: "Implementation & Iteration"
    prevc: "E"
  - id: "phase-3"
    name: "Validation & Handoff"
    prevc: "V"
---

# Fase 1.2 - Auth e Roles Plan

> Implementar autenticacao e controle de acesso por roles no MVP

## Task Snapshot
- **Primary goal:** Implementar autenticacao e controle de acesso por roles no MVP (Supabase Auth + RLS + guards).
- **Success signal:** Login funcional, roles persistidas em `profiles` e refletidas no JWT, RLS bloqueando acesso indevido e seed DEV/Admin aplicado.
- **Key references:**
  - [PRD](../../prd.md)
  - [Rules](../../regras.md)
  - [Backlog](../../backlog_mvp.md)
  - [Stack](../../stack.md)

## Codebase Context
- **Total files analyzed:** Scaffold inicial (Next.js App Router + Supabase CLI).
- **Architecture layers:** Frontend (Next.js), Backend (Supabase), Database (Postgres).
- **Entry points:** apps/web/app/layout.tsx, apps/web/app/page.tsx, supabase/config.toml.
- **Current utilities:** `cn` helper em apps/web/lib/utils.ts.

### Key Components

**Key Interfaces:**
- `profiles` (planned) — tabela de perfil com role e metadata.
- `auth.users` (Supabase) — identidade/autenticacao.
- `RLS policies` (planned) — regra principal de acesso.
- `route guards` (planned) — UX e navegacao.

## Agent Lineup
| Agent | Role in this plan | Playbook | First responsibility focus |
| --- | --- | --- | --- |
| Code Reviewer | Garantir qualidade e consistencia do fluxo de auth. | [Code Reviewer](../agents/code-reviewer.md) | Review code changes for quality, style, and best practices |
| Bug Fixer | Tratar edge cases de login/role. | [Bug Fixer](../agents/bug-fixer.md) | Analyze bug reports and error messages |
| Feature Developer | Implementar auth, roles e guards. | [Feature Developer](../agents/feature-developer.md) | Implement new features according to specifications |
| Refactoring Specialist | Simplificar utilitarios se necessario. | [Refactoring Specialist](../agents/refactoring-specialist.md) | Identify code smells and improvement opportunities |
| Test Writer | Cobrir smoke tests de auth e acesso. | [Test Writer](../agents/test-writer.md) | Write comprehensive unit and integration tests |
| Documentation Writer | Documentar regras e onboarding. | [Documentation Writer](../agents/documentation-writer.md) | Create clear, comprehensive documentation |
| Performance Optimizer | Sem impacto relevante no MVP. | [Performance Optimizer](../agents/performance-optimizer.md) | Identify performance bottlenecks |
| Security Auditor | Revisar RLS e claims. | [Security Auditor](../agents/security-auditor.md) | Identify security vulnerabilities |
| Backend Specialist | Integracao Supabase e RLS. | [Backend Specialist](../agents/backend-specialist.md) | Design and implement server-side architecture |
| Frontend Specialist | Guards e fluxo de sessao no app. | [Frontend Specialist](../agents/frontend-specialist.md) | Design and implement user interfaces |
| Architect Specialist | Alinhar modelo de roles ao negocio. | [Architect Specialist](../agents/architect-specialist.md) | Design overall system architecture and patterns |
| Devops Specialist | Ajustar envs e secrets (se necessario). | [Devops Specialist](../agents/devops-specialist.md) | Design and maintain CI/CD pipelines |
| Database Specialist | Schema de profiles e politicas. | [Database Specialist](../agents/database-specialist.md) | Design and optimize database schemas |
| Mobile Specialist | Fora do escopo do MVP web. | [Mobile Specialist](../agents/mobile-specialist.md) | Develop native and cross-platform mobile applications |

## Documentation Touchpoints
| Guide | File | Primary Inputs |
| --- | --- | --- |
| Product Requirements | [prd.md](../../prd.md) | MVP e regras de acesso |
| Business Rules | [regras.md](../../regras.md) | Roles e permissoes |
| Backlog | [backlog_mvp.md](../../backlog_mvp.md) | Fase 1.2 |
| Stack | [stack.md](../../stack.md) | Next.js + Supabase |
| Security Notes | [.context/docs/security.md](../docs/security.md) | Politicas e secrets |

## Risk Assessment
Identify potential blockers, dependencies, and mitigation strategies before beginning work.

### Identified Risks
| Risk | Probability | Impact | Mitigation Strategy | Owner |
| --- | --- | --- | --- | --- |
| RLS mal configurado expor dados | Medium | High | Testar com matriz de roles e revisao de politicas | Tech Lead |
| Claims divergirem de `profiles` | Medium | Medium | Sincronizar role via trigger/hook e validar no app | Backend |

### Dependencies
- **Internal:** Matriz final de roles e limites de acesso do MVP.
- **External:** Credenciais Supabase e Auth ativo.
- **Technical:** Supabase CLI e Next.js app scaffolded.

### Assumptions
- Single-tenant no MVP.
- RLS como fonte principal de acesso (app apenas UX).

## Resource Estimation

### Time Allocation
| Phase | Estimated Effort | Calendar Time | Team Size |
| --- | --- | --- | --- |
| Phase 1 - Discovery | 1 person-day | 1-2 days | 1 person |
| Phase 2 - Implementation | 3-5 person-days | 1 week | 1-2 people |
| Phase 3 - Validation | 1-2 person-days | 2-3 days | 1 person |
| **Total** | **5-8 person-days** | **~2 weeks** | **-** |

### Required Skills
- Supabase Auth e RLS
- Next.js App Router
- Postgres schema design

### Resource Availability
- **Available:** 1 dev, 1 reviewer (on-demand).
- **Blocked:** Nenhum conhecido.
- **Escalation:** Product owner / tech lead.

## Working Phases
### Phase 1 — Discovery & Alignment
**Steps**
1. Confirmar matriz de roles e limites (incluindo pre-venda) com produto.
2. Definir schema de `profiles` e estrategia de claim no JWT.

**Commit Checkpoint**
- After completing this phase, capture the agreed context and create a commit (for example, `git commit -m "chore(plan): complete phase 1 discovery"`).

### Phase 2 — Implementation & Iteration
**Steps**
1. Criar tabela `profiles` + enum de roles e seed DEV/Admin.
2. Implementar Supabase Auth no Next.js (signin, session).
3. Implementar RLS para leads/oportunidades/equipes conforme roles.
4. Adicionar guards/middleware para navegacao por role.
5. Atualizar documentacao de auth e onboarding.

**Commit Checkpoint**
- Summarize progress, update cross-links, and create a commit documenting the outcomes of this phase (for example, `git commit -m "chore(plan): complete phase 2 implementation"`).

### Phase 3 — Validation & Handoff
**Steps**
1. Validar fluxo de login/logout e enforcement de roles/RLS.
2. Registrar evidencias de teste e atualizar notas de onboarding.

**Commit Checkpoint**
- Record the validation evidence and create a commit signalling the handoff completion (for example, `git commit -m "chore(plan): complete phase 3 validation"`).

## Rollback Plan
Document how to revert changes if issues arise during or after implementation.

### Rollback Triggers
When to initiate rollback:
- Critical bugs affecting core functionality
- Performance degradation beyond acceptable thresholds
- Data integrity issues detected
- Security vulnerabilities introduced
- User-facing errors exceeding alert thresholds

### Rollback Procedures
#### Phase 1 Rollback
- Action: Discard discovery branch, restore previous documentation state
- Data Impact: None (no production changes)
- Estimated Time: < 1 hour

#### Phase 2 Rollback
- Action: Reverter migrations de auth/RLS e restaurar snapshot anterior
- Data Impact: Possivel perda de dados novos de perfil; comunicar stakeholders
- Estimated Time: 2-4 hours

#### Phase 3 Rollback
- Action: Rollback de deploy e retorno a versao anterior
- Data Impact: Invalidacao de sessoes; usuarios devem relogar
- Estimated Time: 1-2 hours

### Post-Rollback Actions
1. Document reason for rollback in incident report
2. Notify stakeholders of rollback and impact
3. Schedule post-mortem to analyze failure
4. Update plan with lessons learned before retry

## Evidence & Follow-up

List artifacts to collect (logs, PR links, test runs, design notes). Record follow-up actions or owners.
- SQL de schema/policies e arquivos de migration
- Evidencias de teste por role (DEV/Admin/Pre-venda)
- Documentacao atualizada em regras/onboarding
