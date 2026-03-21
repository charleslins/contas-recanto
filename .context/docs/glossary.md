# Recanto — Glossário

## Domínio

- **Transação (transaction):** Movimento financeiro com tipo `income` ou `expense`, valor, data, histórico, credor e ligação a uma categoria.
- **Categoria (category):** Agrupamento com nome, cor e tipo (`income`, `expense`, `both`).
- **Receita / despesa:** Valores enum `transaction_type` e `category_type` no schema Drizzle.
- **Importação:** Fluxos em `lib/` (ex.: CSV, OFX) que alimentam transações ou normalização de dados.

## Técnico

- **Drizzle:** ORM TypeScript; tabelas definidas em `lib/db/schema.ts`.
- **Neon:** Postgres serverless; URL em `DATABASE_URL`.
- **Server action:** Função assíncrona no servidor Next, tipicamente em `services/*/*.actions.ts`.
- **shadcn/ui:** Componentes em `components/ui/` (Radix + Tailwind).

## Tipos (código)

- **`Category`**, **`Transaction`:** Tipos inferidos de `lib/db/schema.ts` (`$inferSelect` / `$inferInsert`).
