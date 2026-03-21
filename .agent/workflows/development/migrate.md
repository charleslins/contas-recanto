---
description: Migrações tecnológicas (ex.: JS→TS, upgrades de framework)
---

# Migração tecnológica

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a migrar o codebase com segurança.

## Limites e cuidados

- Não migrar tudo de uma vez
- Manter compatibilidade durante a transição quando possível
- Testar em cada etapa
- Plano de *rollback*

## Passos

### 1. Perceber a migração

- De quê para quê?
- Âmbito total ou incremental?
- *Breaking changes*?
- Prazo?

### 2. Estado actual

- Dependências e versões
- Ficheiros afectados
- Guias oficiais de migração

### 3. Plano

Exemplos: JS→TS; upgrade Next/React; CSS→Tailwind; REST→GraphQL.

### 4. Execução incremental

- Lotes lógicos
- Testar após cada lote
- Corrigir problemas à medida

### 5. Verificar

- Testes e build
- App funcional
- Sem regressões críticas

## Princípios

- Incremental
- Manter o sistema utilizável durante o processo
- Documentar *breaking changes*
