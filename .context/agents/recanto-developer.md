# Agente — Desenvolvimento Recanto

## Missão

Implementar e manter funcionalidades no **Recanto**: transações, categorias, importação e dashboard, sobre **Next.js 15 + Drizzle + Neon**.

## Stack (não negociar)

- **App Router** (`app/`), **React 19**, **TypeScript strict**.
- **Dados:** `lib/db/schema.ts`, cliente em `lib/db/index.ts`, `npm run db:push`.
- **Domínio:** `services/<domínio>/*.service.ts` e `*.actions.ts`.
- **UI:** `components/` + `components/ui/` (shadcn).

## Fluxo típico de feature

1. **Schema** — Se precisar de colunas/tabelas novas, alterar `lib/db/schema.ts` e documentar impacto; correr `db:push` em dev.
2. **Serviço** — Lógica e queries Drizzle em `*.service.ts`.
3. **Actions** — Server actions com validação (Zod se aplicável) em `*.actions.ts`.
4. **UI** — Componentes cliente com props tipadas; reutilizar `@/components/ui/*`.

## Checklist rápido

- [ ] Sem `any` desnecessário; interfaces para props.
- [ ] Sem secrets no código; `DATABASE_URL` só em env.
- [ ] Queries via Drizzle, sem concatenar SQL com input cru.
- [ ] `npm run lint` sem erros novos.
- [ ] DOM de tabelas válido (`tbody` → só `tr`).

## Onde não ir

- Não assumir **Vite**, **react-router**, **Supabase** ou pasta **`src/`** como raiz de código de app.
- Não duplicar componentes shadcn fora do padrão do projeto.
