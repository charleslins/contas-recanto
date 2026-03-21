# Recanto — Fluxo de desenvolvimento

## Branches

- **`main`** (ou `master`) deve permanecer deployável.
- Features em branches curtas: `feature/…`, `fix/…`.
- Merge via PR com revisão quando houver equipa.

## Ambiente local

```bash
cp .env.example .env   # preencher DATABASE_URL (Neon)
npm install
npm run dev
```

## Comandos frequentes

| Comando | Uso |
|---------|-----|
| `npm run dev` | Servidor Next.js |
| `npm run lint` | ESLint |
| `npm run build` | Build de produção |
| `npm run db:push` | Aplicar schema Drizzle ao Postgres |

## Alterações de base de dados

1. Editar `lib/db/schema.ts`.
2. `npm run db:push` em desenvolvimento.
3. No remoto, o workflow **Drizzle — push schema** corre quando há push em `schema.ts` / `drizzle.config.ts` (requer secret `DATABASE_URL` no GitHub).

## Antes de abrir PR

- `npm run lint` e `npm run build`.
- Sem ficheiros sensíveis (`.env`) no commit.
- Descrever breaking changes e novas variáveis de ambiente.

## Documentação histórica

Versões antigas deste ficheiro podiam referir outra stack — a versão válida para este repo está em [project-overview.md](./project-overview.md).
