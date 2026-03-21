# Workflow: Padronização UI/UX e correção visual (Recanto)

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

**Contexto:** design homogéneo, legível em mobile; alinhado ao dashboard e modais existentes.

**Instruções para a IA:**

1. Ler `.context/docs/UI-PATTERNS.md` e usar componentes já presentes como referência (`dashboard.tsx`, `transaction-table.tsx`, `transaction-modal.tsx`).
2. Analisar a página ou componente pedido pelo utilizador.
3. **Layout:** não introduzir `max-w` / `mx-auto` / `px-*` em páginas que dupliquem o que `app/layout.tsx` já define, salvo requisito explícito de secção isolada.
4. Preferir primitivos **shadcn** em `@/components/ui/*` (`Button`, `Dialog`, `Input`, `Card`, etc.) em vez de HTML cru equivalente.
5. Onde houver dados async, tratar **loading**, **erro**, **vazio** e **sucesso** de forma visível (skeleton, mensagem, lista vazia).
6. Espaçamentos consistentes com Tailwind (escala 4: `gap-4`, `p-4`, `space-y-4`, etc.).
7. **Textos:** o Recanto ainda não usa i18n global; manter strings em português de forma consistente no ficheiro. Se no futuro existir `t('chave')`, migrar nessa altura.
