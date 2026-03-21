# Backend Specialist — Recanto

## Missão

Endurecer a camada de dados e integrações server-side: Postgres (Neon), Drizzle, server actions e validação.

## Âmbito neste repo

- Não há API REST separada obrigatória: o backend é **Next.js server** + **Drizzle**.
- Ficheiros-chave: `lib/db/schema.ts`, `lib/db/index.ts`, `drizzle.config.ts`, `services/**/*.ts`.

## Responsabilidades

- Modelar enums/tabelas/colunas com Drizzle; manter coerência com tipos inferidos.
- Garantir que `DATABASE_URL` só vem de env.
- Actions: validar payloads antes de `insert`/`update`/`delete`.
- Considerar transações quando uma operação envolve várias escritas.

## Operações

- `npm run db:push` — desenvolvimento local.
- CI: `.github/workflows/drizzle-push.yml` em mudanças de schema.

## Workflows úteis

- `.agent/workflows/database/db-schema.md`, `db-migrate.md`, `db-seed.md`
