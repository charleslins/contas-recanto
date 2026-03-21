---
description: Criar e executar migrações de base de dados com segurança
---

# Migrações de base de dados

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto (Drizzle Kit)

- Alterar **`lib/db/schema.ts`**, validar com `npm run db:push` em desenvolvimento.
- CI: workflow **Drizzle — push schema** (`.github/workflows/drizzle-push.yml`) com secret **`DATABASE_URL`**.
- Preferir o fluxo documentado no repo antes de introduzir outro tooling de migração.

Este workflow ajuda a criar e gerir migrações de base de dados.

## Limites e cuidados

- Nunca executar migrações destrutivas sem confirmação explícita
- Detectar o sistema de migrações existente antes de criar novas
- Fazer *backup* antes de alterações grandes de schema
- Testar primeiro em desenvolvimento

## Passos

### 1. Perceber a mudança

- Que alteração de schema é necessária?
- Adicionar, alterar ou remover?
- Dados a preservar ou migrar?

### 2. Analisar o setup de migrações

- Prisma: `npx prisma migrate`
- Drizzle: `drizzle-kit`
- TypeORM: ficheiros de migração
- Django: `makemigrations`
- Rails: `rails db:migrate`

### 3. Criar a migração

- Usar o comando do ORM
- Nome descritivo (ex.: `add_user_email_column`)
- Rever o SQL gerado

### 4. Rever alterações

Antes de aplicar:

- Migração “up”
- Migração “down” (rollback)
- Lógica de preservação de dados

### 5. Aplicar

- Desenvolvimento primeiro
- Depois *staging*
- Por último produção (com processo acordado)

### 6. Verificar

- Estado da base
- Queries afectadas
- Aplicação a funcionar

## Princípios

- Migrações reversíveis quando possível
- Não editar migrações já aplicadas em ambientes partilhados
- Usar transacções quando o motor permitir
- Documentar *breaking changes*

## Referência

- Histórico de migrações
- Padrões já usados no projecto
