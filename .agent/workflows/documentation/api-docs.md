---
description: Gerar documentação de API (OpenAPI, JSDoc, etc.)
---

# Documentação de API

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

> **Recanto:** muitas operações passam por **server actions**; documentar contratos (entrada/saída) e, se existirem, **Route Handlers** em `app/api/`.

Este workflow ajuda a gerar documentação de API alinhada ao código.

## Limites e cuidados

- Documentar a partir do código real
- Manter docs sincronizadas com a implementação
- Formatos standard (OpenAPI, JSDoc/TSDoc)
- Exemplos por endpoint ou função pública

## Passos

### 1. Inventariar a API

- Rotas ou funções expostas
- Formatos de pedido/resposta
- Autenticação
- Documentação já existente

### 2. Escolher formato

- REST: OpenAPI/Swagger
- GraphQL: schema com descrições
- Biblioteca: JSDoc, TSDoc
- CLI: páginas man ou Markdown

### 3. Documentar cada endpoint

- Método e caminho (ou nome da action)
- Descrição
- Parâmetros e corpo
- Respostas e códigos HTTP
- Auth
- Exemplos de pedido/resposta

### 4. Gerar *site* ou export

- Swagger UI, Redoc, TypeDoc, etc.

### 5. Verificar

- Cobertura completa dos endpoints públicos
- Exemplos executáveis
- Tipos correctos

## Princípios

- Explicar o “porquê”, não só o “o quê”
- Exemplos realistas
- Docs próximas do código (comentários ou ficheiros colaterais)
