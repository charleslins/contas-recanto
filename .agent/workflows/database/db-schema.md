---
description: Desenhar schemas de base de dados para qualquer ORM ou motor SQL
---

# Desenho de schema de base de dados

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto (Drizzle + Neon)

- Ficheiro de schema: **`lib/db/schema.ts`** (tabelas `categories`, `transactions`, enums PG).
- Configuração: **`drizzle.config.ts`**; cliente: **`lib/db/index.ts`**.
- Sincronização local: `npm run db:push` (sem script de seed; dados vêm de importação/UI).

Este workflow ajuda a desenhar schemas de base de dados adaptados ao ORM e ao motor usados no projecto.

## Limites e cuidados

- Não assumir ORM específico (Prisma, Drizzle, TypeORM, SQLAlchemy, etc.) sem detecção
- Detectar configuração existente antes de propor schemas
- Considerar relações, índices e restrições
- Seguir convenções de nomenclatura do schema actual

## Passos

### 1. Perceber requisitos

- Que entidades/tabelas são necessárias?
- Relações entre elas?
- Campos ou restrições específicas?
- Volume de dados esperado?

### 2. Analisar a configuração

- `prisma/schema.prisma`
- `drizzle.config.ts`
- Modelos SQLAlchemy, entidades TypeORM, etc.
- Padrões nas tabelas/modelos existentes

Se não houver base, perguntar qual ORM/base preferem.

### 3. Desenhar o schema

Por entidade:

- Nome da tabela/modelo
- Campos com tipos adequados
- Chaves primárias e `UNIQUE`
- Chaves estrangeiras e relações
- Índices para consultas frequentes
- Timestamps (`createdAt`, `updatedAt`) quando fizer sentido

### 4. Definir relações

- Um-para-um
- Um-para-muitos
- Muitos-para-muitos (tabela de junção)

### 5. Adicionar restrições

- `NOT NULL` onde obrigatório
- `UNIQUE` para emails, nomes de utilizador, etc.
- `CHECK` para domínios de valores
- Regras `ON DELETE` / `ON UPDATE`

### 6. Verificar

- Completude do schema
- Riscos de consultas N+1
- Índices alinhados às queries comuns

## Princípios

- Normalizar até 3FN salvo necessidade de desnormalização por desempenho
- Tipos de campo correctos (não guardar números como texto sem motivo)
- Índices em FKs e colunas filtradas com frequência
- *Soft deletes* para dados críticos quando aplicável

## Referência

- Ficheiros de schema existentes
- Histórico de migrações
