---
name: security-scan
description: Orientação para varrimento de dependências e superfícies óbvias no Recanto
---

# Security scan — Recanto

## Quando usar

- Após `npm install` de pacotes novos; auditorias periódicas.

## Passos sugeridos

1. `npm audit` — rever high/critical.
2. Procurar padrões no código: `password`, `secret`, `api_key`, `DATABASE_URL` em ficheiros que não sejam `.env.example`.
3. Confirmar que ficheiros `.env*` estão no `.gitignore`.

## Limitações

- Não substitui ferramentas dedicadas (SAST/DAST) se o produto exigir compliance formal.

## Workflow

- `.agent/workflows/security/dependency-check.md`
