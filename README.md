# Recanto — Dashboard financeiro

Aplicação **Next.js** para gestão de **receitas e despesas** (transações, categorias, importação CSV/OFX, gráficos e exportação PDF), com interface em **pt-BR**.

## Stack

- **Next.js 15** · **React 19** · **TypeScript**
- **Tailwind CSS 4** · componentes base Radix/shadcn
- **Drizzle ORM** + **Neon Postgres** (`@neondatabase/serverless`)
- `date-fns`, `papaparse`, `ofx-js`, `jspdf`, `recharts`

## Requisitos

- Node.js **20+**
- Banco Postgres (recomendado: [Neon](https://neon.tech))

## Configuração local

1. Instale dependências:

```bash
npm install
```

2. Crie `.env.local` a partir de [`.env.example`](./.env.example):

```env
DATABASE_URL="postgresql://user:password@ep-xxxxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

3. Aplique schema e seed:

```bash
npm run db:push
npm run db:seed
```

4. Rode o projeto:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Desenvolvimento |
| `npm run build` / `npm run start` | Build e execução de produção |
| `npm run lint` | Lint |
| `npm run db:push` | Sincroniza schema Drizzle com o banco |
| `npm run db:seed` | Seed de categorias padrão (limpa categorias/transações antes) |

## Deploy na Vercel

1. Vercel → **Add New Project** → importar repositório GitHub.
2. Em **Environment Variables**, configurar apenas:
   - `DATABASE_URL` (connection string do Neon)
3. Deploy.

> A Vercel compila o código que está no GitHub. Se corrigiu localmente, precisa `git push` para gerar novo deploy.

Se a Vercel continuar em commit antigo (ex.: `ab10415`), siga [docs/VERCEL-SINCRONIZAR.md](./docs/VERCEL-SINCRONIZAR.md).

## GitHub Actions (`db:push`)

O workflow [`.github/workflows/drizzle-push.yml`](./.github/workflows/drizzle-push.yml) roda `drizzle-kit push`:

- manualmente via **Actions → Run workflow**, ou
- em push para `main`/`master` quando muda `lib/db/schema.ts` ou `drizzle.config.ts`.

### Secret obrigatório no GitHub

| Secret | Uso |
|---|---|
| `DATABASE_URL` | conexão Postgres do Neon |

Não use `.env.local` do seu computador para CI: GitHub Actions lê apenas **Repository secrets**.

## Notas de migração

- O projeto foi migrado de Turso/SQLite para Neon/Postgres.
- Dados antigos em arquivo SQLite/local não migram automaticamente para Neon.

## Documentação

- Produto: [PRD.md](./PRD.md)
- Diagnóstico de sincronização Git/Vercel: [docs/VERCEL-SINCRONIZAR.md](./docs/VERCEL-SINCRONIZAR.md)
