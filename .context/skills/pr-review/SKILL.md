---
name: pr-review
description: Revisar pull requests contra padrões do Recanto (Next.js, Drizzle, estrutura de pastas)
---

# PR Review — Recanto

## Quando usar

- Revisão de PR antes de merge; pedidos de segunda opinião em diff grande.

## Verificar

- **Escopo:** mudanças coerentes com o título do PR.
- **Schema:** alterações em `lib/db/schema.ts` com nota e `db:push` / CI considerados.
- **Segurança:** sem `.env` ou secrets; validação em actions.
- **Qualidade:** `lint` e `build` referidos ou assumidos pelo autor.
- **UI:** componentes e tabelas sem anti-padrões (DOM, hydration).

## Saída

- Resumo, bloqueadores, sugestões opcionais, veredicto (aprovar / pedir alterações).

## Relacionado

- `code-review/SKILL.md`, `pre-merge-check/SKILL.md`
- `.agent/workflows/git/git-pr.md`
