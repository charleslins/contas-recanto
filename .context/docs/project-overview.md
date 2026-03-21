# Recanto — Visão geral

Aplicação **Next.js** para acompanhamento de receitas e despesas: categorias, lançamentos, importação (ex.: CSV/OFX) e visualização no dashboard.

## Factos rápidos

| Item | Valor |
|------|--------|
| **Pacote** | `recanto` (`package.json`) |
| **Runtime** | Node.js; framework **Next.js 15** (App Router) |
| **UI** | React 19, Tailwind CSS, **shadcn/ui** (`components/ui/`) |
| **Base de dados** | **PostgreSQL** (Neon) via **Drizzle ORM** |
| **Alias TS** | `@/*` → raiz do repositório |

## Entradas principais

- **`app/layout.tsx`** — layout raiz.
- **`app/page.tsx`** — página inicial (dashboard).
- **`lib/db/schema.ts`** — tabelas `categories`, `transactions` e enums.
- **`lib/db/index.ts`** — cliente Drizzle.
- **`drizzle.config.ts`** — configuração Drizzle Kit.

## Organização do código

- **`services/`** — por domínio (`transaction/`, `category/`): serviços e **server actions** (`*.actions.ts`).
- **`components/`** — UI: dashboard, tabelas, modais, gráficos; primitivos em `components/ui/`.
- **`lib/`** — parsers, máscaras, importação, helpers de categorias (`lib/category-helpers.ts`).

## Scripts úteis

```bash
npm install
npm run dev          # desenvolvimento
npm run build        # build de produção
npm run lint         # ESLint
npm run db:push      # sincronizar schema (Drizzle → DB)
```

## Variáveis de ambiente

Ver **`.env.example`**. Tipicamente **`DATABASE_URL`** (connection string Neon).

## Documentação relacionada

- [architecture.md](./architecture.md) — camadas e decisões técnicas.
- [development-workflow.md](./development-workflow.md) — fluxo de trabalho (ajustar comandos se divergirem).
- [glossary.md](./glossary.md) — termos do domínio Recanto.
