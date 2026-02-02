### Gerente de Marketing
- Quantidade de Leads
- Localizacao Cidade / Estado
- Origem de aquisicao (instagram, facebook, site, etc...)
- Leads por Perfis (Vendedor matriz, externo, franquias, etc...)
- Data de criacao
- Data de atualizacoes
- Produto
- Valor proposta / Valor fechado
- Painel de marketing no MVP com metricas basicas e acesso a todos os leads de vendedores e gerentes;
- Controle de acesso

### Perfil ADMIN
- Pode cadastrar usuarios (exceto DEV): novos Admin, Gerentes, Diretoria, Gerente de Marketing, Gestor de Trafego, Pre-venda e perfis de vendedores;
- Pode gerenciar equipes de vendas, produtos, categorias, tags e origens de aquisicao;
- Controle de acesso: historico de login;
- Relatorios de leads por cidade, estado, perfis de vendedores, gerentes, produto, segmento, origem de aquisicao, ranking de vendedores por valor e quantidade de vendas;
- Exportacao para Excel: V2.

### Diretoria/Gestao
- Dashboards executivos e relatorios globais;
- Visao de performance por regiao, produto e equipe.

### Gestor de Trafego
- Relatorios de leads por origem de trafego e regiao;
- Gestao de campanhas manual (nome da campanha e valor investido);
- V2: integracao com APIs para receber dados reais de orcamento e metricas gerais;

### Perfis de vendedores
- O sistema deve conter gestao de tipos de usuarios vendedores. Ou seja, deve ser possivel criar perfis de vendedores que se tornarao roles.
- O perfil deve ser configuravel em relacao ao tipo de produto que o perfil pode vender e regiao (Cidade / UF).
- Lead de determinada cidade/UF com produto de interesse e atribuido automaticamente ao usuario que corresponder as regras.
- Nao pode duplicar cidades; se um perfil atende Guarulhos/SP, e exclusivo.
- Exemplo de perfis:
  - Franquia: So pode vender porta de enrolar instalada na cidade de Guarulhos/SP
  - Vendedor Matriz: So pode vender material para o estado de SP inteiro (deve excluir cidades que ja tem um perfil vendendo, exemplo: Guarulhos nesse caso);
  - Vendedor Externo: se tiver regiao + produto recebe automaticamente; se estiver em branco, so recebe por envio manual.
    - Se ele tiver autorizacao para alguma regiao, deve ser obrigatorio selecionar produtos;
    - Nao pode ter apenas regiao sem produto e nem produto sem regiao;
  - Outros perfis de vendedor;

### Perfis de gerentes
- Um usuario gerente gerencia uma equipe de vendedores;
- Um gerente é obrigatório ter uma equipe pelo menos, pode ter mais de uma;
- Para incluir pelo menos um vendedor pra ele gerenciar, necessariamente tem que criar uma nova equipe;

#### Gestão de equipes
- Deve ser possivel fazer gestão de equipes colocando nome, adicionando vendedores;
- Admin pode ver todas equipes;
- Gerentes so podem ver as equipes deles;

### Perfil Pre-venda
- Acessa leads sem proprietario e atribui manualmente para vendedores ou gerentes.

### Leads, Clientes e Negócios
- Quando um lead se cadastra em alguma LP ou campanha via webhook, e criado um novo lead vinculado a uma nova oportunidade;
- Lead se refere a pessoa, oportunidade ao negocio;
- Cliente e o lead que ja comprou pelo menos uma vez (oportunidade marcada como Ganho).
- **Status de lead**: Novo lead, Em contato, Cliente (automatico quando oportunidade e Ganho), Inativo;
- **Status de oportunidades**: Orçamento, Negociação, Ganho, Perdido;
- **Status de clientes**: Ativo, Potencial, Inativo;

#### Novo lead
*Marcados com * são obrigatorios*
- Nome *
- Email / telefone (Obrigatório ter pelo menos um dos dois);
- Cidade
- UF
- Origem (Origem de aquisição)
- Proprietario (Perfil vendedor) - opcional; se vazio, fica na fila de pre-venda.

#### Funcionalidades
- Falar via whatsapp (link externo);
- Enviar email (link externo);
- Enviar lead para outro usuario (sobrescreve regra de territorio/produto);
- Mudar status;
- Inativar lead (com justificativa);
- Ver detalhes;
- Criar oportunidade;
- Nova tarefa;
- Nova anotacao;

#### Nova oportunidade
- Segmento (categoria macro do produto) *
- Produto *
- Etapa (Padrao "Orcamento"); *
- Proprietario (Padrao Usuario atual); *
- Valor em R$ *
- Numero do orcamento (gerar automatico sequencial, escopo global) *
- Funcionalidades
  - Mudar etapa (se for perdido, justificar);
  - Nova tarefa;
  - Nova nota;
  - Novo anexo(s);
  - Mudar proprietario;

#### Origens de aquisição
- Compostas por nome obrigatório e descrição opcional;
- Exemplos: Instagram, Facebook, Site, telefone, indicação, etc...
- Somente DEV e Admin podem criar/editar.

## Módulo de produtos
### Produto
- Nome do produto (obrigatorio)
- Segmento (categoria macro, configuravel via DB) (obrigatorio) - se nao tiver disponivel, pode adicionar novo na criacao do produto;
- Descrição (Opcional)
- Foto (Opcional)
- Unidade de medida (Obrigatório) Un, metros, kg, adicionar nova
### Segmento
- Origem dos dados: via DB
- Comercial, industrial, residencial; Dev e Admin podem cadastrar outros;
- Segmentos sao similares a categorias de produto (categoria macro).

### Categorias
- Categorias configuraveis via DB;
- Dev e Admin podem criar categorias;
- Apenas nome;
- Uma categoria e composta por nome (obrigatorio) e descricao (Opcional).
### Tags customizadas
- Dev e Admin podem criar tags customizadas;
- Uma tag e composta por nome (obrigatorio) e descricao (Opcional).
- Categorias e tags impactam apenas filtros, nao restricoes de venda.


## Notificacoes
- V2: notificacoes para o whatsapp via n8n (webhook POST);
- V2: notificacoes por email via Brevo;

## Perfil DEV
- Role exclusiva para DEV, acima de Admin;
- Criado via script direto no banco;
- Cadastra os primeiros Admins e pode cadastrar todos tipos de usuarios;
- Futuro: acesso a dados e funcoes exclusivas;
- 

## Cadastro de usuarios
*Marcados com * sao obrigatorios*
- Nome *
- Email *
- Whatsapp *
- Perfil (obrigatorio). Se nao existir nenhum, mostrar botao para criar novo;

## Dashboard
- Cards com metricas seguindo regras de usuario;
  - Carteira Gerencial (divisao visual para leads/clientes)
    - Novo lead, Em contato, Cliente, Inativo
  - Carteira Comercial (divisao visual para oportunidades/negocios)
    - Orçamento, Negociação, Ganho, Perdido;
- Listas
  - Tarefas do dia / semana;
  - Leads recentes;
### Header
- Sempre visivel botão de novo lead para usuarios Gerente e vendedores;
- Perfil do usuario com nome, avatar, cargo e email.
  - Ao clicar abre menu:
    - Meu perfil
    - Sair
### Páginas
**Listas**: Valido para leads, clientes, negócios
- Visualização Lista;
- Visualização Kanban por etapas;
- Filtros;
- Ordenação;
