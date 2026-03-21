---
name: commit-message
description: Gerar mensagens de commit convencionais em português para o repositório Recanto
---

# Commit message — Recanto

## Quando usar

- Após implementar uma alteração e antes do commit; quando pedirem sugestão de mensagem.

## Formato

```
tipo(área): descrição curta em português
```

**Tipos comuns:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`

**Áreas exemplo:** `db`, `ui`, `import`, `dashboard`, `transactions`, `categories`

## Regras

- Uma ideia principal por commit; corpo opcional para contexto extra.
- Não incluir secrets ou nomes de credenciais.
- Alinhar ao que está realmente no diff (`git diff --staged`).

## Referência

- `.agent/workflows/git/git-commit.md`
