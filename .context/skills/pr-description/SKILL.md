---
name: pr-description
description: Redigir descrição de PR clara (contexto, mudanças, como testar) para o Recanto
---

# PR Description — Recanto

## Quando usar

- Abrir ou completar um pull request no GitHub.

## Modelo sugerido

1. **Contexto** — problema ou objectivo.
2. **O que mudou** — bullets por área (`app/`, `components/`, `lib/db`, `services/`).
3. **Schema** — se aplicável, referência a `db:push` ou workflow.
4. **Como testar** — comandos (`npm run dev`, passos na UI).
5. **Riscos** — breaking changes, dados existentes.

## Regras

- Língua: português (alinhado às convenções do repo).
- Não colar secrets nem URLs de DB completas.

## Workflow

- `.agent/workflows/git/git-pr.md`
