---
description: Gerar scaffold de projecto com stack detectada ou escolhida
---

# Novo projecto

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar um novo projecto alinhado à stack escolhida.

> **Nota:** o repositório **Recanto** já existe; use este fluxo para **outros** projectos ou para comparar boas práticas com `create-next-app`.

## Limites e cuidados

- Não assumir framework sem perguntar
- Recolher requisitos antes do scaffold
- Preferir geradores oficiais
- Estrutura e ferramentas base desde o primeiro dia

## Passos

### 1. Requisitos

- Tipo: web, API, CLI, biblioteca?
- Preferências de framework?
- TypeScript ou JavaScript?
- Funcionalidades iniciais?

### 2. Escolher stack

Sugestão coerente com os requisitos (frontend, backend, BD, estilos).

### 3. Scaffold

- Next.js: `npx create-next-app@latest`
- React/Vite: `npm create vite@latest`
- Vue, Express, Python/FastAPI, etc. — geradores oficiais

### 4. Configurar o essencial

- Git
- `.editorconfig`, Prettier
- ESLint ou equivalente
- `tsconfig` se aplicável

### 5. Verificar

- Servidor de desenvolvimento
- Estrutura de pastas
- Funcionalidade mínima

## Princípios

- Começar enxuto; complexidade depois
- Seguir convenções do framework
- Tooling desde o primeiro dia
