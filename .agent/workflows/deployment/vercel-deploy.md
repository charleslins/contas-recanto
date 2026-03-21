---
description: Fazer deploy de aplicações na Vercel
---

# Deploy na Vercel

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto

- Configurar no painel Vercel a variável **`DATABASE_URL`** (connection string Neon) para *build*/*runtime* que acede ao Drizzle.
- Garantir que o schema em produção está alinhado (processo de *push*/migrações acordado).

Este workflow cobre *deploy* na Vercel para projectos Next.js como o Recanto.

## Passos

1. Instalar a CLI da Vercel (se necessário):

   ```bash
   npm i -g vercel
   ```

2. Iniciar sessão:

   ```bash
   vercel login
   ```

3. *Deploy* de pré-visualização:

   ```bash
   vercel
   ```

4. *Deploy* de produção:

   ```bash
   vercel --prod
   ```

## Orientações

- Rever `vercel.json` se existir (comandos de build, rotas, *rewrites*).
- Definir todas as variáveis de ambiente no painel da Vercel ou via CLI (`DATABASE_URL`, etc.).
- Confirmar que `npm run build` passa localmente antes do *deploy*.
