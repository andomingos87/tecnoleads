# Design Tokens — CRM Dashboard (Inspiração: SyncSphere)

> Tokens extraídos da interface de referência para desenvolvimento de um CRM web responsivo.

---

## 1. Paleta de Cores

### 1.1 Cores de Background

| Token | Valor | Uso |
|---|---|---|
| `--bg-app` | `#F0F2F5` | Fundo geral da aplicação |
| `--bg-sidebar` | `#FFFFFF` | Fundo da sidebar (com leve transparência/glassmorphism) |
| `--bg-card` | `#FFFFFF` | Fundo dos cards de conteúdo |
| `--bg-card-hover` | `#F8FAFC` | Hover sutil em cards |
| `--bg-sidebar-active` | `#1B2B4B` | Item ativo na sidebar (dark navy) |
| `--bg-input` | `#F5F7FA` | Fundo de inputs e search bar |
| `--bg-table-header` | `#F8FAFC` | Cabeçalho de tabelas |
| `--bg-table-row-alt` | `#FAFBFC` | Linhas alternadas da tabela |

### 1.2 Cores Primárias

| Token | Valor | Uso |
|---|---|---|
| `--primary-900` | `#0F1A2E` | Texto principal sidebar / títulos fortes |
| `--primary-800` | `#1B2B4B` | Item ativo sidebar / backgrounds escuros |
| `--primary-700` | `#1E3A5F` | Hover em elementos primários |
| `--primary-500` | `#3B82F6` | Links, ícones ativos, elementos interativos |
| `--primary-100` | `#DBEAFE` | Backgrounds leves de destaque |
| `--primary-50` | `#EFF6FF` | Hover muito sutil |

### 1.3 Cores de Acento / Gráficos

| Token | Valor | Uso |
|---|---|---|
| `--accent-blue-light` | `#93C5FD` | Barras de gráfico (tom claro) |
| `--accent-blue-medium` | `#60A5FA` | Barras de gráfico (tom médio) |
| `--accent-blue-dark` | `#3B82F6` | Barras de gráfico (tom escuro / destaque) |
| `--accent-green` | `#34D399` | Donut chart - segmento "Paid" |
| `--accent-purple` | `#A78BFA` | Donut chart - segmento "Overdue" |
| `--accent-amber` | `#FBBF24` | Donut chart - segmento "Unpaid" |
| `--accent-teal` | `#2DD4BF` | Ícone do CTA card |

### 1.4 Cores Semânticas / Status

| Token | Valor | Uso |
|---|---|---|
| `--status-success` | `#10B981` | Badge "Paid", indicadores positivos |
| `--status-success-bg` | `#D1FAE5` | Background do badge "Paid" |
| `--status-warning` | `#F59E0B` | Badge "Waiting", indicadores neutros |
| `--status-warning-bg` | `#FEF3C7` | Background do badge "Waiting" |
| `--status-danger` | `#EF4444` | Badge "Overdue", indicadores negativos |
| `--status-danger-bg` | `#FEE2E2` | Background do badge "Overdue" |
| `--status-info` | `#3B82F6` | Links, informações complementares |

### 1.5 Cores de Variação (KPIs)

| Token | Valor | Uso |
|---|---|---|
| `--kpi-positive` | `#10B981` | Seta/texto de variação positiva (↑ +9.7%) |
| `--kpi-negative` | `#EF4444` | Seta/texto de variação negativa (↓ -0.10%) |

### 1.6 Cores de Texto

| Token | Valor | Uso |
|---|---|---|
| `--text-primary` | `#111827` | Títulos, valores principais |
| `--text-secondary` | `#6B7280` | Descrições, labels, texto auxiliar |
| `--text-tertiary` | `#9CA3AF` | Placeholders, texto desabilitado |
| `--text-on-dark` | `#FFFFFF` | Texto sobre backgrounds escuros |
| `--text-sidebar` | `#6B7280` | Itens inativos da sidebar |
| `--text-sidebar-active` | `#FFFFFF` | Item ativo da sidebar |

### 1.7 Cores de Borda

| Token | Valor | Uso |
|---|---|---|
| `--border-default` | `#E5E7EB` | Bordas de cards, separadores |
| `--border-light` | `#F3F4F6` | Bordas sutis internas |
| `--border-input` | `#D1D5DB` | Bordas de inputs |
| `--border-input-focus` | `#3B82F6` | Foco em inputs |

---

## 2. Tipografia

### 2.1 Font Family

| Token | Valor | Notas |
|---|---|---|
| `--font-primary` | `'Plus Jakarta Sans', sans-serif` | Sugestão: body + headings (geométrica, moderna) |
| `--font-mono` | `'JetBrains Mono', monospace` | Para valores numéricos/IDs |

> **Alternativas compatíveis com o estilo:** `'DM Sans'`, `'Outfit'`, `'Satoshi'`, `'General Sans'`

### 2.2 Escala Tipográfica

| Token | Size | Weight | Line-Height | Uso |
|---|---|---|---|---|
| `--text-display` | `28px` | `700` | `1.2` | "Welcome Back, Anna 👋" |
| `--text-heading-lg` | `20px` | `600` | `1.3` | Títulos de seção ("Sales Analytics") |
| `--text-heading-md` | `16px` | `600` | `1.4` | Subtítulos, nomes de cards |
| `--text-heading-sm` | `14px` | `600` | `1.4` | Labels de KPI ("Customers", "Revenue") |
| `--text-kpi-value` | `32px` | `700` | `1.1` | Valores grandes ("1,590", "$32,325") |
| `--text-kpi-variation` | `12px` | `500` | `1.4` | Variações ("↑ +9.7% vs last month") |
| `--text-body` | `14px` | `400` | `1.5` | Texto geral, conteúdo de tabelas |
| `--text-body-sm` | `13px` | `400` | `1.5` | Texto secundário na tabela |
| `--text-caption` | `12px` | `400` | `1.4` | Labels de eixo, metadata |
| `--text-badge` | `12px` | `600` | `1` | Badges de status |
| `--text-nav` | `14px` | `500` | `1.4` | Itens de navegação sidebar |
| `--text-nav-section` | `11px` | `600` | `1.2` | Seções da sidebar ("General", "Support") — uppercase |

---

## 3. Espaçamento

### 3.1 Escala Base (múltiplos de 4px)

| Token | Valor | Uso |
|---|---|---|
| `--space-1` | `4px` | Micro gaps internos |
| `--space-2` | `8px` | Gap entre ícone e texto |
| `--space-3` | `12px` | Padding interno de badges |
| `--space-4` | `16px` | Padding interno de inputs, gap entre itens nav |
| `--space-5` | `20px` | Padding interno de cards |
| `--space-6` | `24px` | Gap entre cards, padding de seções |
| `--space-8` | `32px` | Margem entre seções principais |
| `--space-10` | `40px` | Padding lateral do content area |
| `--space-12` | `48px` | Margem superior do main content |

### 3.2 Espaçamentos Específicos de Layout

| Token | Valor | Uso |
|---|---|---|
| `--sidebar-width` | `260px` | Largura da sidebar |
| `--sidebar-padding-x` | `16px` | Padding horizontal da sidebar |
| `--sidebar-padding-y` | `24px` | Padding vertical da sidebar |
| `--content-padding` | `32px` | Padding do main content area |
| `--header-height` | `64px` | Altura do header/topbar |
| `--card-padding` | `24px` | Padding interno dos cards |
| `--card-gap` | `24px` | Gap entre cards no grid |
| `--table-cell-padding-x` | `16px` | Padding horizontal das células |
| `--table-cell-padding-y` | `16px` | Padding vertical das células |
| `--table-row-height` | `56px` | Altura de cada linha da tabela |

---

## 4. Bordas e Arredondamento

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `6px` | Badges, tags, small elements |
| `--radius-md` | `8px` | Inputs, buttons, dropdowns |
| `--radius-lg` | `12px` | Cards, modais internos |
| `--radius-xl` | `16px` | Cards maiores, containers |
| `--radius-2xl` | `20px` | Sidebar, main container |
| `--radius-full` | `9999px` | Avatares, badges circulares, pills |

---

## 5. Sombras e Elevação

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Elevação sutil (inputs) |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Cards padrão |
| `--shadow-card-hover` | `0 4px 12px rgba(0,0,0,0.08)` | Hover em cards interativos |
| `--shadow-dropdown` | `0 4px 16px rgba(0,0,0,0.12)` | Dropdowns, popovers |
| `--shadow-sidebar` | `2px 0 8px rgba(0,0,0,0.04)` | Sombra lateral da sidebar |
| `--shadow-container` | `0 8px 32px rgba(0,0,0,0.08)` | Container principal (glassmorphism) |

---

## 6. Efeitos Visuais

### 6.1 Glassmorphism / Frosted Glass

```css
/* Aplicado na sidebar e main container */
.glass-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}
```

### 6.2 Gradient do CTA Card

```css
/* Card "Stay on track with your sales!" */
.cta-card {
  background: linear-gradient(135deg, #34D399 0%, #3B82F6 40%, #8B5CF6 70%, #EC4899 100%);
  border-radius: var(--radius-xl);
}
```

### 6.3 Gradient Background da Aplicação

```css
/* Background geral - sutil gradiente */
.app-background {
  background: linear-gradient(180deg, #EEF2F7 0%, #E8ECF2 50%, #F0F2F5 100%);
}
```

---

## 7. Ícones

| Propriedade | Valor |
|---|---|
| **Biblioteca sugerida** | Lucide React / Phosphor Icons |
| **Tamanho sidebar** | `20px` |
| **Tamanho KPI cards** | `20px` (dentro de container 36×36px com bg colorido) |
| **Tamanho ações tabela** | `16px` |
| **Stroke width** | `1.5px` |
| **Estilo** | Outline/linear, cantos arredondados |

### Ícone Containers (KPI Cards)

```css
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Variantes por cor */
.icon-container--green  { background: #D1FAE5; color: #10B981; }
.icon-container--blue   { background: #DBEAFE; color: #3B82F6; }
.icon-container--purple { background: #EDE9FE; color: #8B5CF6; }
.icon-container--orange { background: #FEF3C7; color: #F59E0B; }
```

---

## 8. Componentes — Especificações

### 8.1 KPI Card

```
┌──────────────────────────────────┐
│  [Label]              [Ícone]    │  padding: 24px
│  [Valor Grande]                  │  border-radius: 12px
│  [↑ Variação vs last month]     │  bg: white
└──────────────────────────────────┘
Largura: ~25% do grid (4 colunas)
Gap entre cards: 24px
```

### 8.2 Sidebar Navigation Item

```
Estado inativo:
  padding: 10px 16px
  border-radius: 8px
  color: var(--text-sidebar)
  font: 14px/500

Estado ativo:
  background: var(--bg-sidebar-active) → #1B2B4B
  color: white
  border-radius: 8px
  font-weight: 600
```

### 8.3 Status Badge

```
  padding: 4px 12px
  border-radius: 9999px (pill)
  font-size: 12px
  font-weight: 600

  Paid:    bg #D1FAE5, text #059669
  Waiting: bg #FEF3C7, text #D97706
  Overdue: bg #FEE2E2, text #DC2626
```

### 8.4 Tabela (Recent Invoices)

```
  Header: bg #F8FAFC, text uppercase 11px/600, color --text-tertiary
  Row height: ~56px
  Cell padding: 16px horizontal
  Separator: 1px solid #F3F4F6
  Hover row: bg #F9FAFB
  Actions: ícone "more" (⋮) no final
```

### 8.5 Search Bar

```
  width: ~240px
  height: 40px
  padding: 8px 16px
  border-radius: 8px
  background: var(--bg-input)
  border: 1px solid var(--border-light)
  placeholder color: var(--text-tertiary)
  ícone: search (esquerda)
```

### 8.6 Dropdown / Select (Monthly)

```
  height: 32px
  padding: 6px 12px
  border-radius: 20px (pill)
  border: 1px solid var(--border-default)
  font-size: 13px
  ícone: chevron-down (direita)
```

### 8.7 Notification Badge

```
  width: 20px, height: 20px
  border-radius: 9999px
  background: #EF4444
  color: white
  font-size: 11px
  font-weight: 700
  position: absolute (top-right do ícone)
```

### 8.8 User Avatar (Sidebar Footer)

```
  width: 40px, height: 40px
  border-radius: 9999px
  border: 2px solid var(--border-light)
  Texto ao lado: nome (14px/600) + email (12px/400 --text-secondary)
```

---

## 9. Layout Grid — Responsivo

### 9.1 Estrutura Principal

```
┌────────────┬──────────────────────────────────────────────┐
│            │  Header (Welcome + Search + Date)             │
│  Sidebar   ├──────────┬──────────┬──────────┬────────────│
│  (260px)   │ KPI 1    │ KPI 2    │ KPI 3    │ KPI 4      │
│            ├──────────┴────┬─────┴──────────┼────────────│
│  fixed     │ Sales Chart   │ Donut Chart    │ CTA Card   │
│  position  │ (col-span 2)  │ (col-span 1)   │ (col 1)    │
│            ├───────────────┴────────────────┴────────────│
│            │ Recent Invoices Table (full width)           │
└────────────┴─────────────────────────────────────────────┘
```

### 9.2 Grid System

```css
/* Main content grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--card-gap); /* 24px */
}

/* KPI cards: cada um ocupa 1 coluna */
.kpi-card { grid-column: span 1; }

/* Charts row */
.sales-chart { grid-column: span 2; }
.donut-chart { grid-column: span 1; }
.cta-card    { grid-column: span 1; }

/* Table: full width */
.invoices-table { grid-column: span 4; }
```

### 9.3 Breakpoints Responsivos

| Token | Valor | Layout |
|---|---|---|
| `--bp-mobile` | `< 640px` | Sidebar collapsa (drawer), 1 coluna, cards empilhados |
| `--bp-tablet` | `640–1024px` | Sidebar mini (ícones), grid 2 colunas |
| `--bp-desktop` | `1024–1440px` | Layout completo, sidebar aberta |
| `--bp-wide` | `> 1440px` | Max-width container, conteúdo centralizado |

```css
/* Mobile: sidebar como drawer overlay */
@media (max-width: 639px) {
  .sidebar { position: fixed; transform: translateX(-100%); z-index: 50; }
  .sidebar.open { transform: translateX(0); }
  .dashboard-grid { grid-template-columns: 1fr; }
  .kpi-card { grid-column: span 1; }
}

/* Tablet: sidebar colapsada em ícones */
@media (min-width: 640px) and (max-width: 1023px) {
  .sidebar { width: 72px; } /* Apenas ícones */
  .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
  .sales-chart { grid-column: span 2; }
  .invoices-table { grid-column: span 2; }
}

/* Desktop: layout completo */
@media (min-width: 1024px) {
  .sidebar { width: 260px; }
  .dashboard-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 10. Animações e Transições

| Token | Valor | Uso |
|---|---|---|
| `--transition-fast` | `150ms ease` | Hover em botões, ícones |
| `--transition-base` | `200ms ease` | Mudança de cor, background |
| `--transition-slow` | `300ms ease-in-out` | Sidebar expand/collapse |
| `--transition-chart` | `600ms cubic-bezier(0.4, 0, 0.2, 1)` | Animação de barras/donut |

```css
/* Hover suave em cards */
.card {
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}

/* Sidebar item hover */
.nav-item {
  transition: background var(--transition-fast), color var(--transition-fast);
}
```

---

## 11. Z-Index Scale

| Token | Valor | Uso |
|---|---|---|
| `--z-base` | `0` | Conteúdo normal |
| `--z-card` | `1` | Cards elevados |
| `--z-sticky` | `10` | Headers fixos, table header sticky |
| `--z-sidebar` | `20` | Sidebar |
| `--z-dropdown` | `30` | Dropdowns, popovers |
| `--z-overlay` | `40` | Overlay/backdrop (mobile sidebar) |
| `--z-modal` | `50` | Modais |
| `--z-toast` | `60` | Toasts e notificações |

---

## 12. Implementação CSS Variables

```css
:root {
  /* Cores */
  --bg-app: #F0F2F5;
  --bg-sidebar: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-sidebar-active: #1B2B4B;
  --bg-input: #F5F7FA;

  --primary-900: #0F1A2E;
  --primary-800: #1B2B4B;
  --primary-500: #3B82F6;
  --primary-100: #DBEAFE;

  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;

  --status-success: #10B981;
  --status-success-bg: #D1FAE5;
  --status-warning: #F59E0B;
  --status-warning-bg: #FEF3C7;
  --status-danger: #EF4444;
  --status-danger-bg: #FEE2E2;

  --border-default: #E5E7EB;
  --border-light: #F3F4F6;

  /* Tipografia */
  --font-primary: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Espaçamento */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --sidebar-width: 260px;
  --card-padding: 24px;
  --card-gap: 24px;

  /* Bordas */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;

  /* Sombras */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-dropdown: 0 4px 16px rgba(0,0,0,0.12);

  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease-in-out;

  /* Z-Index */
  --z-sidebar: 20;
  --z-dropdown: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-toast: 60;
}
```

---

## 13. Mapeamento de Dados (Referência)

### KPI Cards

| Card | Label | Valor | Variação | Ícone |
|---|---|---|---|---|
| 1 | Customers | 1,590 | ↓ -0.10% vs last month | Users (verde) |
| 2 | Revenue | $32,325 | ↑ +9.7% vs last month | DollarSign (azul) |
| 3 | Profit | 60% | ↓ -0.2% vs last month | TrendingUp (roxo) |
| 4 | Invoices | 1,382 | ↑ 11.2% vs last month | FileText (laranja) |

### Sidebar Navigation

```
General:
  - Dashboard (ativo)
  - Shopping
  - Wallet
  - Accountant
  - Payroll
  - Thirty-party
  - Inventory

Support:
  - Notifications (badge: 2)
  - Support
  - Settings
```

### Tabela — Colunas

```
No. | Customers Name | Customers ID | Taxes | Retention | Status | Total | Date | Actions
```