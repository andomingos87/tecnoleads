# Backlog MVP (enxuto) - TecnoLeads

Baseado em `prd.md`. Estrutura por epicos, fases e tarefas.

## Epico 1: Fundacao e Base Tecnica
### Fase 1.1: Setup inicial
- Inicializar projeto Next.js (App Router) com TypeScript
- Configurar Tailwind e shadcn/ui
- Configurar ESLint e Prettier
- Configurar Supabase CLI e ambientes (dev/stage/prod)

### Fase 1.2: Auth e roles
- Implementar login via Supabase Auth
- Definir roles: DEV, Admin, Diretoria, Gerente, Gerente de Marketing, Gestor de Trafego, Vendedor, Pre-venda
- Seed inicial: DEV (via script) e primeiros Admins
- Criar middleware/guards por role

### Fase 1.3: Modelagem e RLS
- Criar esquema base (leads, oportunidades, usuarios, equipes, produtos, segmentos, categorias, tags, origens)
- Definir enums de status (lead e oportunidade)
- Implementar RLS por role e ownership
- Auditar logins (tabela de historico de login)

## Epico 2: Leads, Oportunidades e Distribuicao
### Fase 2.1: Captura de leads
- Criar webhook `POST /api/webhooks/leads` com secret e idempotencia
- Validar payload e criar lead + oportunidade
- Enfileirar lead sem proprietario quando nao houver match

### Fase 2.2: Regras de distribuicao
- Implementar regra de atribuicao por cidade/UF e produto
- Garantir exclusividade de cidades (nao duplicar)
- Permitir envio manual que sobrescreve regras

### Fase 2.3: CRUD de leads e oportunidades
- Tela de listagem (lista + kanban por etapas)
- Detalhe do lead com historico, notas e tarefas
- Criacao/edicao de oportunidade
- Mudanca de status com justificativa quando Perdido

## Epico 3: Usuarios, Perfis e Equipes
### Fase 3.1: Perfis e permissao
- CRUD de usuarios com role obrigatoria
- Criar perfil de vendedor com produto + regiao
- Validar regra: nao pode ter regiao sem produto e vice-versa

### Fase 3.2: Equipes
- CRUD de equipes
- Vincular vendedores a equipes
- Regras de visibilidade: Admin ve todas, Gerente ve apenas as suas

## Epico 4: Produtos, Segmentos e Configuracoes
### Fase 4.1: Produtos e segmentos
- CRUD de produtos
- CRUD de segmentos (categoria macro)
- Vinculo produto -> segmento

### Fase 4.2: Categorias, tags e origens
- CRUD de categorias
- CRUD de tags customizadas
- CRUD de origens de aquisicao
- Restringir criacao/edicao a DEV e Admin

## Epico 5: Dashboard e Painel de Marketing
### Fase 5.1: Dashboard base
- Cards de Carteira Gerencial (leads/clientes)
- Cards de Carteira Comercial (oportunidades)
- Lista de tarefas do dia/semana
- Lista de leads recentes

### Fase 5.2: Painel de marketing (MVP)
- Metricas basicas por origem, regiao e volume
- Acesso a leads de todos vendedores e gerentes

### Fase 5.3: Ranking
- Ranking por valor de vendas
- Ranking por quantidade de vendas

## Epico 6: Campanhas e Anexos
### Fase 6.1: Gestao de campanhas manual
- CRUD de campanhas
- Campos: nome da campanha e valor investido

### Fase 6.2: Anexos e storage
- Upload de imagens e PDF no Supabase Storage
- Anexar arquivos em oportunidades
- URL assinada para acesso controlado

## Fora do MVP (V2)
- Notificacoes via n8n (WhatsApp) e Brevo (email)
- Exportacao para Excel
- Integracoes com APIs de campanhas
