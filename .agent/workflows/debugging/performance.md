---
description: Perfilizar e optimizar caminhos de código lentos
---

# Desempenho

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a identificar e corrigir problemas de desempenho.

## Limites e cuidados

- Medir antes de optimizar
- Focar nos *bottlenecks* reais
- Não sacrificar legibilidade por micro-optimizações
- Confirmar ganhos com medições

## Passos

### 1. Perceber o problema

- O que está lento? (carregamento de página, API, render, etc.)
- Ordem de grandeza actual?
- Meta de desempenho?
- Consistente ou intermitente?

### 2. Perfilizar

- **Browser:** separador Performance (Chrome DevTools)
- **Node:** `--inspect`, ferramentas de profiling
- **Python:** cProfile, py-spy
- **Base de dados:** `EXPLAIN` nas queries lentas

### 3. Identificar *bottlenecks*

- Consultas N+1
- Colunas sem índice
- *Bundles* grandes
- Re-renders desnecessários (React)
- Operações bloqueantes síncronas
- *Memory leaks*

### 4. Optimizar

- Índices na BD
- *Batch* de queries
- *Cache* onde seguro
- *Lazy loading* de recursos
- `useMemo` / `useCallback` com critério
- Paginação de listas

### 5. Verificar melhorias

- Medir de novo com o mesmo método
- Comparar métricas antes/depois
- Garantir que a funcionalidade não regrediu

## Princípios

- Não adivinhar — medir
- Optimizar primeiro o caminho crítico
- *Cache* para operações caras
- Perfilizar em condições próximas da produção
