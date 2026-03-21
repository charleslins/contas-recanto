---
name: feature-breakdown
description: Decompor uma feature do Recanto em tarefas implementáveis (dados, actions, UI)
---

# Feature breakdown — Recanto

## Quando usar

- Novo pedido grande (“importar X”, “relatório Y”); planeamento antes de codar.

## Passos

1. **Domínio** — afecta `transactions`, `categories`, importação, dashboard?
2. **Dados** — precisa mudança em `lib/db/schema.ts`?
3. **Servidor** — novos métodos em `services/*/*.service.ts` e `*.actions.ts`?
4. **UI** — novos componentes ou extensão de `dashboard` / modais / tabelas?
5. **Entrega** — ordem sugerida (schema → service → action → UI → lint/build).

## Saída

- Lista ordenada de tarefas com ficheiros prováveis e dependências.

## Workflow

- `.agent/workflows/development/new-feature.md`
