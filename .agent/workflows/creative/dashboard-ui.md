---
description: Criar interfaces de dashboard administrativo profissionais para qualquer stack
---

# Criação de UI de dashboard

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a construir um dashboard administrativo rico em funcionalidades, adaptado à stack do projecto.

## Limites e cuidados

- Não assumir framework específico (React, Vue, Angular, etc.)
- Detectar a stack antes de sugerir implementações
- Usar padrões de layout consistentes (barra lateral + cabeçalho)
- Garantir design responsivo para tablet e desktop
- Incluir sempre estados de carregamento e vazio

## Passos

### 1. Perceber requisitos

Perguntas de clarificação:

- Que dados o dashboard mostra?
- Que acções o utilizador pode executar?
- Que estrutura de navegação é necessária?
- Métricas, gráficos ou KPIs específicos?
- Níveis de papel / permissão?
- Existe design system ou biblioteca de componentes?

### 2. Analisar a stack do projecto

Detectar o que já existe:

- **Framework:** React, Vue, Angular, Svelte, etc.
- **Estilos:** Tailwind, CSS Modules, Sass, CSS-in-JS
- **Biblioteca de componentes:** MUI, Shadcn, Chakra, Vuetify, etc.
- **Gráficos:** Recharts, Chart.js, ApexCharts, etc.
- **Padrões:** convenções nos componentes existentes

Se não houver base clara, perguntar ao utilizador.

### 3. Planear a estrutura do dashboard

Um dashboard típico inclui:

**Layout:**

- Navegação lateral (colapsável)
- Cabeçalho com pesquisa, notificações, menu de utilizador
- Área de conteúdo principal
- Rodapé (opcional)

**Tipos de página comuns:**

- Visão geral com cartões de estatísticas e gráficos
- Tabelas com ordenação, filtros, paginação
- Vistas de detalhe de registos
- Formulários de criação/edição
- Páginas de configurações

### 4. Criar a estrutura de layout

Construir componentes de layout:

- **Barra lateral:** ligações, estado activo, alternar colapso
- **Cabeçalho:** breadcrumbs, pesquisa, menu de utilizador
- **Content wrapper:** padding e largura máxima consistentes

### 5. Criar componentes do dashboard

Componentes reutilizáveis:

**Cartões de estatísticas:**

- Título, valor, indicador de variação
- Ícone ou mini-gráfico
- Comparação com período anterior

**Tabelas:**

- Cabeçalhos com ordenação
- Linhas com acções
- Paginação
- Estado vazio

**Gráficos:**

- Linhas/área para tendências
- Barras para comparações
- Pizza/rosca para distribuições

### 6. Montar as páginas

Compor componentes:

- Grelha consistente
- Espaçamento adequado
- Skeletons de loading
- Estados vazios tratados

### 7. Verificar

- Responsividade em vários tamanhos
- Navegação correcta
- Loading e vazios visíveis
- Dados de exemplo

## Princípios

### Layout

- Largura lateral consistente (240–280px; colapsada 64–80px)
- Área de conteúdo com largura máxima para leitura
- Padding consistente (ex.: 24px) no conteúdo

### Cor e tema

- Neutros (cinza/slate) na base
- Cor de destaque para acções primárias e estados activos
- Semântica: verde (sucesso), vermelho (erro), amarelo (aviso)
- Modo escuro se o projecto exigir

### Tipografia

- Hierarquia clara: título → secções → cartões → corpo
- Números tabulares/monospace para dados

### Apresentação de dados

- Skeletons durante o fetch
- Estados vazios com sugestão de próximo passo
- Tabelas ordenáveis e filtráveis para grandes volumes
- Formatação de números (moeda, percentagens)

## Referência

- Componentes de layout existentes no projecto
- Estrutura de rotas
- Tokens de design ou tema global
