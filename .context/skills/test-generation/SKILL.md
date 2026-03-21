---
name: test-generation
description: Propor ou gerar casos de teste alinhados ao Recanto (quando existir runner)
---

# Test generation — Recanto

## Quando usar

- Introdução de Vitest/Jest/Playwright ou pedido explícito de casos de teste.

## Prioridade de alvo

1. Funções puras em `lib/*.ts` (parsers, máscaras, helpers).
2. Lógica em `services/*.service.ts` com mocks de Drizzle ou DB de teste.
3. Fluxos E2E críticos (criar/editar transação, categorias).

## Nota

- Se o projeto ainda não tiver script de testes no `package.json`, indicar passos para o adicionar e actualizar `testing-strategy.md`.

## Workflows

- `.agent/workflows/testing/unit-test.md`, `e2e-test.md`, `test-coverage.md`
