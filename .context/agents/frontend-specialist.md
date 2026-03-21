# Frontend Specialist — Recanto

## Missão

Evoluir a interface (React 19, Next.js App Router, Tailwind, shadcn/ui) com foco em dashboard, tabelas, formulários e gráficos.

## Estrutura

- Páginas: `app/`.
- Componentes de feature: `components/*.tsx`.
- Primitivos: `components/ui/*`.
- Hooks partilhados: `hooks/`.

## Boas práticas

- `'use client'` só onde necessário; preferir dados já preparados no servidor quando fizer sentido.
- Props com interface nomeada; evitar `any`.
- Reutilizar `Dialog`, `Button`, `Input`, `Select`, etc. de `@/components/ui/*`.
- Estados de UI: loading / erro / vazio / sucesso quando houver fetch.

## Referência visual

- Seguir ritmo e densidade dos componentes existentes (`dashboard.tsx`, `transaction-table.tsx`, `transaction-modal.tsx`).

## Workflow útil

- `.agent/workflows/development/new-component.md`
