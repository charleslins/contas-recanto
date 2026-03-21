# Regras complementares — Recanto

> **Hierarquia:** `.cursorrules` (obrigatório) → este ficheiro (detalhes opcionais) → `.context/docs/project-overview.md` / `architecture.md`  
> **Projeto:** Recanto — Next.js 15, Drizzle, Neon, shadcn/ui.

Este documento **não** duplica o `.cursorrules`. Serve como notas de implementação e checklist estendido.

## TypeScript

- `strict` activo: evitar `any`; preferir tipos inferidos do Drizzle (`$inferSelect`) onde fizer sentido.
- Funções exportadas: preferir retorno explícito (`Promise<…>` em async).
- Evitar `enum`; usar unions ou `as const`.

## React / Next.js

- App Router: Server Components por defeito; `'use client'` só com estado, eventos ou APIs de browser.
- Props: interface nomeada por componente.
- Tabelas HTML válidas (`tbody` → `tr`); overlays fora da `<table>`.

## Dados (Drizzle / Neon)

- Schema único em `lib/db/schema.ts`; cliente em `lib/db/index.ts`.
- Sem `DATABASE_URL` ou segredos no código versionado.
- Preferir API do Drizzle a SQL raw com strings interpoladas com input do utilizador.

## Serviços e actions

- Lógica de persistência em `services/<domínio>/*.service.ts`.
- Mutações expostas via `*.actions.ts` (server actions), com validação de entrada.

## UI

- Primitivos: `components/ui/` (shadcn). Novos ecrãs: reutilizar padrões de `components/dashboard.tsx`, modais e tabelas existentes.

## Qualidade

- Antes de PR: `npm run lint`, `npm run build`.
- Evitar `console.log` em código de app (scripts como `db:seed` podem usar `console`).

## Workflows e skills

- Procedimentos reutilizáveis: `.agent/workflows/` (ver `registry.json`).
- Skills de revisão/commits: `.context/skills/`.
- Inventário completo: `.context/INVENTARIO_IA_RECANTO.md`.

## Commits

- Mensagens em português, preferencialmente convencionais: `tipo(área): descrição`.
