---
description: Criar pacotes e bibliotecas publicáveis
---

# Biblioteca / pacote

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar uma biblioteca publicável (npm, PyPI, etc.).

## Limites e cuidados

- Detectar se já existe monorepo ou pacote no repo
- Seguir convenções da plataforma de publicação
- Documentação e exemplos
- Testes e CI

## Passos

### 1. Requisitos

- Finalidade da biblioteca
- Plataforma (npm, PyPI…)
- TypeScript/JavaScript ou Python…

### 2. Configurar projecto

- `package.json`, `setup.py` ou equivalente
- Build e tipos
- Testes e lint

### 3. Desenhar API pública

- Exportações
- Opções e configuração
- Erros e versão semântica

### 4. Implementar

- Funcionalidade central
- Validação
- Tipos ou *type hints*

### 5. Documentar

- README com exemplos
- Referência de API
- Instalação e *changelog*

### 6. Publicar

- CI/CD
- *Bundling* se necessário
- Licença
- Teste de `npm install` / `pip install` local

## Princípios

- API superficial pequena
- *Defaults* sensatos
- Mensagens de erro úteis
- Semver
