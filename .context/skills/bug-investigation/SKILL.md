---
name: bug-investigation
description: Investigação sistemática de bugs no Recanto (UI, actions, Drizzle, importação)
---

# Bug investigation — Recanto

## Quando usar

- Regressões, erros em runtime, dados incorrectos após importação.

## Passos

1. **Reproduzir** — `npm run dev`, passos mínimos.
2. **Camada** — UI vs server action vs query vs parser (`lib/parser.ts`, `import-utils.ts`).
3. **Evidência** — mensagem de erro, estado da BD se relevante.
4. **Hipóteses** — lista curta; validar com logs controlados (sem `console` em produção se política o exigir).
5. **Correção** — patch mínimo + lint/build.

## Workflow

- `.agent/workflows/debugging/debug-error.md`
