---
description: Criar e analisar tokens de design system
---

# Design system

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar ou analisar um design system para o projecto.

## Limites e cuidados

- Analisar estilos existentes antes de criar novos
- Manter tokens consistentes e documentados
- Usar nomenclatura semântica
- Considerar acessibilidade

## Passos

### 1. Perceber o âmbito

Perguntas:

- Criar novo ou analisar existente?
- Que componentes são necessários?
- Guidelines de marca?
- Requisitos de acessibilidade?

### 2. Analisar o existente

Se for actualização:

- Rever cores, tipografia, espaçamentos
- Identificar inconsistências
- Registar pontos de fricção

### 3. Definir tokens

Tokens centrais:

**Cores:**

- Primária, secundária, destaque
- Semânticas (sucesso, aviso, erro)
- Neutros (escala de cinza)

**Tipografia:**

- Famílias de fonte
- Escala de tamanhos
- Pesos
- Alturas de linha

**Espaçamento:**

- Unidade base (4px ou 8px)
- Escala (xs, sm, md, lg, xl)

**Outros:**

- Raio de borda
- Sombras
- Breakpoints

### 4. Criar componentes

Primitives:

- Botão (variantes, tamanhos)
- Input (estados)
- Card
- Componentes de tipografia

### 5. Documentar

- Referência de tokens
- Exemplos de componentes
- Guidelines de uso
- Boas práticas e anti-padrões

## Princípios

- Consistência vale mais que perfeição abstracta
- Nomes semânticos
- Mobile-first
- Acessibilidade desde o início
