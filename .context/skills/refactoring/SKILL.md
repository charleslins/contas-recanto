---
name: refactoring
description: Refactor seguro no Recanto sem mudar comportamento observável
---

# Refactoring — Recanto

## Quando usar

- Reduzir duplicação, extrair hooks, clarificar serviços ou componentes grandes.

## Processo

1. Identificar comportamento actual (teste manual ou critério de aceitação).
2. Mudanças pequenas e reversíveis; commit intermédio se útil.
3. Se tocar em schema, planear `db:push` e impacto em dados.
4. `npm run lint` e `npm run build` no fim.

## Evitar

- Refactor + nova feature no mesmo passo sem necessidade.
- Alterar contratos de server action sem actualizar chamadores.

## Workflow

- `.agent/workflows/development/refactor.md`
