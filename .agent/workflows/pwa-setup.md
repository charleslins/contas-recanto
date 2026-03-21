# Workflow: PWA com Next.js (Recanto)

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).


**Instruções para a IA**

1. Confirmar versão Next.js e se PWA é requisito do produto (este repo não inclui PWA por defeito).
2. Para Next.js 15, avaliar **`next-pwa`** (ou pacote mantido equivalente) ou **manual** `manifest.json` + service worker em `public/` com registo em `app/layout.tsx` ou componente cliente dedicado.
3. Definir `manifest.json` (nome **Recanto**, ícones, `theme_color` alinhado ao Tailwind/shadcn do projeto).
4. Estratégia de cache: documentar trade-offs (stale-while-revalidate vs network-first) para assets estáticos; evitar cache agressivo de dados financeiros sem invalidação clara.
5. Não assumir `vite.config.ts`, `src/services/offlineDataService.ts` ou domínio de RH — qualquer sincronização offline deve mapear para o modelo **transactions/categories** actual se for implementada.

**Referência de UI:** `.context/docs/UI-PATTERNS.md`
