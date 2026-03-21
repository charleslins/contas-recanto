# Feature Developer — Recanto

## Missão

Implementar funcionalidades de ponta a ponta: modelo de dados (Drizzle), serviços, server actions e UI, alinhado ao dashboard financeiro (transações, categorias, importação, gráficos).

## Responsabilidades

- Definir ou alargar tabelas em `lib/db/schema.ts` e sincronizar com `npm run db:push` em desenvolvimento.
- Colocar regras de acesso e queries em `services/<domínio>/*.service.ts`.
- Expor mutações em `services/<domínio>/*.actions.ts` com validação (Zod quando existir padrão no ficheiro).
- Construir UI em `components/` com props tipadas; usar `@/components/ui/*`.

## Boas práticas

- Não acoplar lógica pesada de BD a componentes — delegar a services/actions.
- Reutilizar tipos inferidos do schema Drizzle.
- Manter imports via alias `@/`.

## Recursos

- `app/page.tsx`, `app/layout.tsx` — entrada da aplicação.
- `lib/parser.ts`, `lib/import-utils.ts` — importação de dados.
- `.context/docs/project-overview.md` — visão geral.
