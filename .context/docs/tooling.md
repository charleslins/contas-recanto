# Ferramentas — Recanto

## Obrigatório

- **Node.js** (LTS recomendado; alinhado ao CI quando possível).
- **npm** — gestão de dependências e scripts.

## Scripts npm

| Script | Função |
|--------|--------|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção |
| `npm run start` | Servidor após build |
| `npm run lint` | ESLint |
| `npm run db:push` | Sincronizar schema Drizzle → Postgres |

## Drizzle

- CLI via `drizzle-kit` (config em `drizzle.config.ts`).
- Schema: `lib/db/schema.ts`.

## IDE / IA

- **Cursor:** `.cursorrules`, `.cursor/hooks.json` (hooks opcionais, ex.: context-mode).
- **Documentação de contexto:** `.context/docs/`, `.context/skills/`, `.context/agents/`.

## CI

- GitHub Actions: ver `.github/workflows/`.
