---
name: perf-review
description: Rever performance no Recanto (bundle, listas, gráficos, queries Drizzle)
---

# Performance review — Recanto

## Quando usar

- Lentidão perceptível; PRs que adicionam bibliotecas pesadas ou listas grandes.

## Verificar

- **Cliente:** re-renders desnecessários; charts só no cliente quando pesados.
- **Listagens:** limitar dados na query ou paginar na UI para conjuntos grandes.
- **Bundle:** dynamic import para módulos volumosos se medido.
- **Build:** `npm run build` sem avisos críticos novos.

## Ferramentas

- React Profiler; Network tab; análise de tamanho de rotas Next.

## Workflow

- `.agent/workflows/debugging/performance.md`
