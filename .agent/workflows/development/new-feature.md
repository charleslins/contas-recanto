---
description: Implementação completa de feature desde o desenho até ao deploy
---

# Nova feature

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto (pipeline típico)

1. `lib/db/schema.ts` se o modelo mudar → `npm run db:push` / CI.
2. `services/<domínio>/*.service.ts` + `*.actions.ts`.
3. UI em `components/` + `app/`; `npm run lint` e `npm run build`.

Este workflow ajuda a implementar uma feature completa.

## Limites e cuidados

- Perceber requisitos antes de codar
- Seguir padrões do codebase
- Incluir testes quando a suíte existir
- Documentar enquanto se constrói

## Passos

### 1. Perceber requisitos

- O que a feature deve fazer?
- Quem usa?
- *Mockups* ou especificação?
- Critérios de aceitação?

### 2. Planear

- Alterações de base de dados
- Endpoints ou server actions
- Componentes de UI
- Pontos de integração

### 3. Camada de dados / servidor

- Schema e migrações/push
- Actions ou rotas API
- Regras e validação

### 4. Frontend

- Componentes e estado
- Integração com servidor
- Erros e estados vazios

### 5. Testes (quando existirem)

- Lógica unitária
- Integração
- E2E nos fluxos críticos

### 6. Verificar

- Comportamento conforme aceitação
- Testes a passar
- Sem regressões óbvias

## Princípios

- *Fatias verticais* (ponta a ponta) em vez de só uma camada isolada
- Ter algo funcional antes de polir
- *Commits* frequentes com mensagens claras
