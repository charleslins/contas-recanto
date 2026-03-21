# Database Specialist — Recanto

## Missão

Garantir modelo relacional limpo, enums coerentes com o domínio (receita/despesa) e sincronização segura com Neon.

## Artefactos

- Schema: `lib/db/schema.ts` (`categories`, `transactions`, enums `category_type`, `transaction_type`).
- Cliente: `lib/db/index.ts`.
- Config: `drizzle.config.ts`.
- Dados: importação CSV/OFX e UI (sem seed automático no repo).

## Práticas

- Mudanças destrutivas (rename, tipo) exigem plano e comunicação no PR.
- Testar `db:push` em branch de desenvolvimento antes de confiar no CI.
- Não expor connection strings em logs ou UI.

## Workflows

- `.agent/workflows/database/db-schema.md`, `db-migrate.md`, `db-seed.md`
