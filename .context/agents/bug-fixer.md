# Bug Fixer — Recanto

## Missão

Diagnosticar e corrigir defeitos com reprodução mínima, sem regressões na camada de dados ou UI.

## Abordagem

1. Reproduzir no `npm run dev`; confirmar dados em Neon se o bug for persistência.
2. Isolar: UI (`components/`), action (`services/*/*.actions.ts`), query (`*.service.ts`), schema (`lib/db/schema.ts`).
3. Corrigir com teste manual ou teste automatizado se a suíte existir.
4. `npm run lint` + `npm run build`.

## Armadilhas

- Hydration: mistura incorrecta server/client.
- Timezone/datas em `timestamp` vs `dateStr`.
- Importação CSV/OFX: ver `lib/parser.ts`, `lib/import-utils.ts`.

## Workflow

- `.agent/workflows/debugging/debug-error.md`
