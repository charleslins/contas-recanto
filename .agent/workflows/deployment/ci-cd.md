---
description: Configurar pipelines de CI/CD para qualquer plataforma
---

# CI/CD

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a configurar integração e *deployment* contínuos.

## Limites e cuidados

- Detectar CI/CD existente antes de acrescentar novo
- Começar simples; iterar depois
- Manter *secrets* seguros
- Testar pipelines em branches primeiro

## Passos

### 1. Perceber requisitos

- Plataforma? (GitHub Actions, GitLab CI, etc.)
- O que o pipeline deve fazer? (lint, testes, build, deploy)
- Já existe CI/CD?
- Vários ambientes? (*staging*, produção)

### 2. Detectar a plataforma

- `.github/workflows/` → GitHub Actions
- `.gitlab-ci.yml` → GitLab CI
- `Jenkinsfile` → Jenkins
- `bitbucket-pipelines.yml` → Bitbucket

### 3. Desenhar o pipeline

- **CI:** lint, testes, build
- **CD:** deploy para *staging*/produção
- Condições: quando corre cada etapa

### 4. Criar o pipeline

- *Triggers* (push, PR, agendamento)
- Passos dos *jobs*
- *Cache* de dependências
- *Secrets*

### 5. Testar

- Correr numa branch de teste
- Verificar que todos os passos passam
- Validar deploy se aplicável

### 6. Verificar

- *Triggers* correctos
- Deployments bem-sucedidos
- Notificações (se configuradas)

## Princípios

- Falhar cedo (checks rápidos primeiro)
- *Cache* de dependências
- Pipelines DRY
- Workflows reutilizáveis quando possível
