# Architect Specialist — Recanto

## Missão

Manter decisões técnicas coerentes: monólito Next.js, limites entre UI, actions e Drizzle, e evolução do schema.

## Visão actual

- **Frontend:** Next.js 15 App Router.
- **Persistência:** PostgreSQL (Neon) via Drizzle ORM.
- **Domínio:** transações financeiras, categorias, importação (CSV/OFX, etc.).

## Princípios

- Uma fonte de verdade para o schema em `lib/db/schema.ts`.
- Serviços por domínio sob `services/`; evitar “god components”.
- CI alinhado a `drizzle-push` quando o schema muda.

## Documentação

- `.context/docs/architecture.md`, `project-overview.md`.

## Workflow útil

- `.agent/workflows/documentation/architecture.md`
