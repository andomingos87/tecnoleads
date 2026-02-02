# Stack Tecnoleads (MVP)

## Objetivo
Definir a stack base para o MVP e facilitar alinhamento tecnico.

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (componentes)
- React Hook Form + Zod (formularios e validacao)

## Backend / API
- Next.js Route Handlers para API interna e webhook
- Supabase SDK no server-side para acesso ao banco
- Auth via Supabase (roles e claims)

## Banco de dados
- Supabase Postgres
- RLS (Row Level Security) como regra principal de acesso
- Migracoes via Supabase CLI
- Seed inicial: DEV e primeiros Admins

## Integracoes
- Webhook de leads: `POST /api/webhooks/leads` com secret e idempotencia
- V2: n8n (WhatsApp) e Brevo (email)

## Storage
- Supabase Storage para anexos (imagens e PDF)
- URLs assinadas para acesso controlado

## Observabilidade
- Logs via console + Vercel
- Sentry (opcional no MVP)

## Testes
- Vitest (unitarios)
- Playwright (E2E para fluxos criticos)

## Infra e deploy
- Vercel para o frontend/Next.js
- Supabase para DB/Auth/Storage
- Ambientes: dev, stage, prod (variaveis de ambiente separadas)

## Lint e padronizacao
- ESLint
- Prettier
