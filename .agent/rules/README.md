# Regras do agente — Recanto

## Hierarquia

1. **`.cursorrules`** (raiz) — Regras que o Cursor aplica por defeito.
2. **`.agent/REGRAS_CONSOLIDADAS.md`** — Complemento (TypeScript, Drizzle, Next, qualidade).
3. **`.context/docs/`** — Documentação técnica (`project-overview.md`, `architecture.md`, …).

## Stack (referência rápida)

- **Next.js 15** (App Router), React 19, TypeScript, Tailwind.
- **Drizzle ORM** + **Neon** (Postgres).
- **shadcn/ui** em `components/ui/`.

## Workflows

- Índice: `.agent/workflows/registry.json` (44 entradas).
- Ficheiros extra na mesma pasta (não listados no registry): `pwa-setup.md`, `ui-ux-homogenize.md`.

## Inventário

- Ver `.context/INVENTARIO_IA_RECANTO.md`.
