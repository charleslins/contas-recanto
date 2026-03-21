---
description: Melhorar qualidade de código, extrair funções, reduzir duplicação
---

# Refactor

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a refatorar código mantendo o comportamento.

## Limites e cuidados

- Não alterar comportamento observável — só estrutura
- Mudanças pequenas e incrementais
- Garantir que testes (e `lint`/`build`) passam após cada passo
- Preservar APIs públicas salvo pedido explícito

## Passos

### 1. Perceber o âmbito

- Que ficheiros ou funções?
- Problema: duplicação, complexidade, nomes…
- Existem testes?
- Restrições?

### 2. Analisar

- Código duplicado
- Funções longas
- Aninhamento profundo
- Nomes pouco claros
- Responsabilidades misturadas

### 3. Planear

- **Extrair função:** lógica reutilizável
- **Renomear:** clareza
- **Inline:** abstracções desnecessárias
- **Mover:** melhor localização de módulo
- **Simplificar condicionais**

### 4. Executar

- Um tipo de refactor de cada vez
- Validar após cada alteração
- *Commits* frequentes

### 5. Verificar

- Testes / build / lint
- Legibilidade melhorada
- Comportamento inalterado

## Princípios

- Passos pequenos
- Tornar a mudança fácil, depois fazer a mudança fácil
- Se doer, fazer com mais frequência (em passos menores)
