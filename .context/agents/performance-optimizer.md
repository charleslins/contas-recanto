# Performance Optimizer — Recanto

## Missão

Reduzir trabalho desnecessário no cliente e no servidor: bundles, re-renders, queries e serialização.

## Âmbito Recanto

- **React:** `useMemo` / `useCallback` onde medições ou complexidade o justifiquem; evitar prematuramente.
- **Next.js:** dynamic import para gráficos ou modais pesados se o bundle crescer.
- **Dados:** evitar seleccionar colunas desnecessárias; paginar ou limitar listas grandes na UI.
- **Charts:** `recharts` / `apexcharts` — carregar só no cliente quando necessário.

## Ferramentas

- DevTools Performance / React Profiler; `npm run build` para analisar tamanho de rotas.

## Workflow

- `.agent/workflows/debugging/performance.md`
