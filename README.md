# Recanto — Dashboard financeiro

Aplicação **Next.js** para gestão de **receitas e despesas** (transações, categorias com subcategorias, importação CSV/OFX, gráficos e exportação PDF). Interface em **pt-BR**, com máscara monetária estilo app bancário.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4** · componentes **Radix** / padrão shadcn
- **Drizzle ORM** + **LibSQL** (`@libsql/client`) — SQLite local ou **Turso** na nuvem
- **date-fns**, **papaparse** (CSV), **ofx-js** (OFX), **jspdf** (PDF), **recharts**

## Requisitos

- Node.js **20+**
- Conta gratuita (opcional para produção): [Vercel](https://vercel.com) + [Turso](https://turso.tech) (banco LibSQL)

## Rodar localmente

```bash
npm install
```

Crie `.env.local` (veja [`.env.example`](./.env.example)):

```env
DATABASE_URL="file:local.db"
```

Aplicar schema no SQLite local e semear categorias padrão:

```bash
npm run db:push
npm run db:seed
```

Subir o app:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando        | Descrição                          |
|----------------|-------------------------------------|
| `npm run dev`  | Servidor de desenvolvimento         |
| `npm run build` / `npm run start` | Build e produção local |
| `npm run lint` | ESLint                              |
| `npm run db:push` | Sincroniza schema (Drizzle → DB) |
| `npm run db:seed` | Insere categorias padrão (apaga transações/categorias antes — use com cuidado) |

## Banco de dados

- **Local:** `DATABASE_URL=file:local.db` (arquivo ignorado pelo Git — ver `.gitignore`).
- **Produção (recomendado):** banco **Turso** (plano free). Variáveis:
  - `DATABASE_URL` — URL `libsql://...` fornecida pelo Turso
  - `DATABASE_AUTH_TOKEN` — token de acesso

Depois de criar o banco na Turso, rode **`npm run db:push`** e **`npm run db:seed`** apontando para essa URL (via `.env` local ou CI), para criar tabelas e categorias iniciais.

> **Importante:** em hospedagem serverless (ex.: Vercel), **não** use apenas `file:...` — o filesystem é efêmero. Use Turso (ou outro LibSQL remoto).

## Publicar online (grátis, prático)

### 1. Repositório no GitHub

```bash
gh repo create recanto --public --source=. --remote=origin --push
```

(Ajuste o nome do repositório. Faça commit das alterações antes.)

**Não commite** dados sensíveis: `*.db`, CSVs com valores reais, `.env*`.

### 2. Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório.
2. Em **Environment Variables**, adicione `DATABASE_URL` e `DATABASE_AUTH_TOKEN` (Turso).
3. **Deploy.** Na primeira vez, rode `db:push` e `db:seed` contra o banco Turso (no seu PC com as mesmas variáveis, ou via workflow — ver abaixo).

### 3. Turso (resumo)

1. Instale a CLI: [Turso CLI](https://docs.turso.tech/cli/introduction).
2. `turso db create recanto` → copie a URL.
3. `turso db tokens create recanto` → copie o token → use como `DATABASE_AUTH_TOKEN`.

### 4. GitHub Actions — `db:push` automático

O workflow [`.github/workflows/drizzle-push.yml`](./.github/workflows/drizzle-push.yml) roda **`drizzle-kit push`** quando:

- você dispara manualmente (**Actions** → *Drizzle — push schema* → **Run workflow**), ou
- há push na branch `main` ou `master` alterando `lib/db/schema.ts` ou `drizzle.config.ts`.

**Secrets do repositório** (mesmos nomes da Vercel, para copiar/colar):

| Secret | Obrigatório | Descrição |
|--------|-------------|-----------|
| `DATABASE_URL` | Sim | URL `libsql://...` da Turso |
| `DATABASE_AUTH_TOKEN` | Sim (Turso) | Token do banco |

**Onde cadastrar (passo a passo):**

1. Abra o repositório no GitHub (ex.: `conta-recanto`).
2. Aba **Settings** (do repositório, não da sua conta).
3. Menu lateral **Secrets and variables** → **Actions**.
4. Aba **Repository secrets** → **New repository secret**.
5. Crie **dois** secrets com estes **nomes exatos** (maiúsculas e underscore):
   - `DATABASE_URL` = colar a URL `libsql://...` da Turso  
   - `DATABASE_AUTH_TOKEN` = colar o token da Turso  

Atalho direto (troque `USER/REPO`):  
`https://github.com/USER/REPO/settings/secrets/actions`

**Erro comum:** arquivo `.env.local` no seu PC ou dentro de `.github/workflows/` **não** configura o Actions — só os **Repository secrets** acima funcionam.

> O workflow **não** executa `db:seed` (o seed apaga dados — rode só manualmente quando fizer sentido).

### 5. Pós-deploy

- Com o workflow e os secrets configurados, o schema é aplicado nos pushes relevantes ou ao rodar o workflow manualmente.
- **Seed** (`npm run db:seed`), se precisar de categorias padrão num banco novo: rode **uma vez** na sua máquina com `DATABASE_URL` / `DATABASE_AUTH_TOKEN` da Turso (não está no CI).

Documentação de produto e escopo: **[PRD.md](./PRD.md)**.

## Licença

Uso pessoal / projeto próprio — ajuste conforme necessário.
