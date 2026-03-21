---
description: Containerizar aplicação com Docker
---

# Docker

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a containerizar a aplicação com Docker.

## Limites e cuidados

- Verificar se já existe `Dockerfile` antes de criar outro
- Boas práticas de tamanho de imagem
- Nunca incluir *secrets* na imagem
- *Multi-stage builds* quando fizer sentido

## Passos

### 1. Perceber requisitos

- Tipo de runtime? (Node, Python, etc.)
- Um contentor ou vários?
- Requisitos de imagem base?
- Necessidade de `docker-compose`?

### 2. Analisar a aplicação

- Dependências de runtime
- Portas a expor
- Ficheiros a copiar para a imagem

### 3. Criar o Dockerfile

- Tags específicas na imagem base
- Ordem de camadas para *cache*
- *Multi-stage* para imagens menores
- Copiar apenas o necessário

### 4. docker-compose (se necessário)

- Serviços (app + BD, etc.)
- Rede e volumes
- *Health checks*

### 5. Build e teste local

- `docker build`
- `docker run` e testar funcionalidade
- Rever tamanho da imagem

### 6. Verificar

- Contentor arranca
- App responde
- Logs acessíveis

## Princípios

- Imagens pequenas
- Não correr como *root* sem necessidade
- Usar `.dockerignore`
- Tags de versão claras
