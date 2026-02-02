# PRD - TecnoLeads MVP (consolidado de gaps e inconsistencias)

## Fontes analisadas
- `regras.md`
- `resumo_executivo_tecnoleads.md`

## Objetivo deste documento
Consolidar ambiguidades, inconsistencias e gaps entre as fontes para destravar o MVP.

## Resolucao de divergencias entre documentos
- Pipeline/etapas: manter Orcamento, Negociacao, Ganho e Perdido.
- Roadmap de notificacoes: deixar WhatsApp e email para V2.
- Painel de marketing: incluir no MVP.
- Captura automatica: criar webhook para criacao de leads nas landing pages.
- Gestao de campanhas: manter gestao manual de campanhas.
- Exportacao de dados: deixar para V2.
- Personas/roles: manter Perfil DEV das regras como fonte de verdade.

## Definicoes do MVP
### Modelo de dados e pipeline
- Pipeline oficial de oportunidades: Orcamento, Negociacao, Ganho e Perdido.
- Lead vira cliente quando uma oportunidade atribuida ao lead e marcada como Ganho (cliente = ja comprou ao menos uma vez).
- "Carteira Gerencial" e "Carteira Comercial": divisao visual; gerencial mostra cards de leads/clientes (pessoas) e comercial mostra oportunidades/negocios/vendas.
- Manter apenas valor proposta e valor fechado, sem historico de revisoes.
- Numero do orcamento sequencial com escopo global.
- Segmentos sao similares a categorias de produtos.

### Permissoes e perfis
- Roles oficiais no MVP: Admin, Gerente, Vendedor, Gerente de Marketing, Gestor de Trafego, Diretoria, DEV e Pre-venda.
- Cadastro de usuarios nao pode ocorrer sem role/perfil; se nao existir, exibir botao para criar.
- DEV acima de Admin: criado via script no banco e cadastra os primeiros admins; no futuro tera acesso a dados e funcoes exclusivas.
- Auditoria: registrar apenas historico de login.

### Territorio, produto e distribuicao de leads
- Distribuicao automatica: lead de cidade/UF com produto de interesse e atribuido ao usuario que corresponde as regras.
- Territorio exclusivo: nao pode duplicar cidades; se um perfil atende Guarulhos/SP, e exclusivo.
- Fallback: role de pre-venda acessa leads sem proprietario e atribui manualmente.
- Regiao + produto recebe lead automaticamente; envio manual sobrescreve qualquer regra (vale para qualquer usuario de vendas).

### Captura, integracoes e comunicacao
- Captura automatica via webhooks (usados nas landing pages).
- "Falar via WhatsApp" e "enviar email": link externo.
- Notificacoes via n8n/Brevo: V2.

### Dashboard, relatorios e exportacao
- Metricas basicas por perfil no MVP; evoluir conforme necessario.
- Ranking de vendedores: por valor e por quantidade de vendas.
- Exportacao em Excel: V2.

### Campanhas e marketing
- Gestao manual de campanhas: nome da campanha e valor investido (MVP).
- Painel de marketing no MVP: metricas basicas e acesso a todos os leads de vendedores e gerentes.

### Tarefas, notas e anexos
- Estrutura de tarefas mantida; notas devem existir em leads e oportunidades.
- Anotacoes e notas sao a mesma coisa; visibilidade segue permissao do lead.
- Anexos: imagens e PDF, limite basico de mercado, armazenamento no Supabase Storage.

### Produto, categorias, tags e origem
- Apenas DEV e Admin podem criar/editar segmentos, categorias, tags e origens de aquisicao.
- Categorias/tags impactam apenas filtros, nao restricoes de venda.

### Multi-tenant e configuracoes globais
- Single-tenant.
- Moeda R$ fixa (sem parametrizacao no MVP).

## Decisoes tomadas para o MVP
- Pipeline oficial Orcamento/Negociacao/Ganho/Perdido e cliente quando oportunidade e Ganho.
- Roles oficiais com DEV acima de Admin e pre-venda para leads sem proprietario.
- Distribuicao automatica por territorio/produto com exclusividade de cidades; envio manual sobrescreve regras.
- Captura por webhook; WhatsApp/email via link externo; notificacoes via n8n/Brevo em V2.
- Dashboard com metricas basicas e ranking por valor/quantidade; exportacao em V2.
- Gestao manual de campanhas com nome e valor investido.
- Single-tenant com moeda R$ fixa.
