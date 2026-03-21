---
description: Gerar dados de seed e dados de teste para bases de dados
---

# Seed de base de dados

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto

- Script: **`lib/db/seed.ts`**; comando: **`npm run db:seed`** (categorias padrão, etc.).
- Usar o cliente Drizzle já configurado em **`lib/db/index.ts`**.

Este workflow ajuda a gerar dados de seed realistas para a base de dados.

## Limites e cuidados

- Nunca fazer seed em produção sem confirmação explícita
- Detectar padrões de seed existentes antes de criar novos
- Usar dados fictícios realistas (sem PII real)
- Tornar seeds **idempotentes** quando possível

## Passos

### 1. Perceber requisitos

- Que tabelas precisam de seed?
- Quantidade de registos?
- Dados simples ou realistas?
- Relações a respeitar?

### 2. Analisar o setup de seed

- Prisma: `prisma/seed.ts`
- Drizzle: scripts de seed
- Django: fixtures ou comandos de gestão
- Rails: `db/seeds.rb`

### 3. Desenhar os dados

- Ordem de dependências entre entidades
- Relações
- Valores de campo realistas
- Casos extremos para testes

### 4. Gerar o script

- Limpar dados existentes (opcional, com aviso)
- Inserir na ordem correcta
- Manter integridade referencial
- Usar faker/chance se fizer sentido

### 5. Executar

- Em desenvolvimento
- Verificar erros e dados na BD
- Testar a app com os dados carregados

## Princípios

- Seed na ordem de dependências (ex.: categorias antes de transações que as referenciam)
- IDs consistentes para cenários de teste
- Incluir casos extremos (strings vazias, nulos) quando útil
- Seeds repetíveis

## Referência

- Ficheiros de seed existentes
- Schema para campos obrigatórios
