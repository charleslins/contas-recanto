---
description: Criar endpoints de API para qualquer framework backend
---

# Novo endpoint de API

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto (Next.js)

- Padrão actual: **server actions** em `services/*/*.actions.ts` e dados via **Drizzle** — nem toda a feature precisa de `app/api/...`.
- Para **Route Handlers**: ficheiros `app/api/<rota>/route.ts` (GET/POST/…); validar entrada; não expor *secrets*.
- Persistência: reutilizar `lib/db` e serviços existentes.

Este workflow ajuda a criar um endpoint de API robusto.

## Limites e cuidados

- Não assumir framework — detectar primeiro
- Seguir padrões de API já usados no projecto
- Não gerar código até a stack estar clara
- Validação de entrada e tratamento de erros sempre

## Passos

### 1. Perceber requisitos

- Métodos HTTP? (GET, POST, PUT, DELETE)
- Caminho da rota?
- Corpo/query e formato de resposta?
- Autenticação necessária?
- Recurso ou entidade envolvida?

### 2. Analisar a stack

- **Framework:** Next.js (App/Pages), Express, NestJS, FastAPI, Django, Go, etc.
- **Linguagem:** TS, JS, Python, Go…
- **Validação:** Zod, Joi, Yup, Pydantic…
- **ORM:** Prisma, Drizzle, TypeORM, SQLAlchemy…
- **Auth:** NextAuth, Passport, JWT…

Consultar `package.json`, `requirements.txt`, `go.mod`, etc. Se não estiver claro, perguntar.

### 3. Estudar padrões existentes

- Encontrar 1–2 rotas semelhantes no código
- Estrutura de pastas e nomenclatura
- Formato de erros e respostas
- Como a auth é aplicada noutras rotas

### 4. Schema de validação

- Corpo, *query* e *params* conforme biblioteca detectada
- Mensagens de erro coerentes com o resto do projecto

### 5. Implementar o *handler*

- Ficheiro no sítio correcto (`app/api/.../route.ts` no App Router)
- Método(s) HTTP
- Validação + códigos de estado HTTP adequados
- Auth se necessário
- Formato de resposta consistente

### 6. Verificar

- Pedidos válidos funcionam
- Entrada inválida rejeitada com mensagens úteis
- Erros com status apropriados
- Auth quando exigida

## Princípios

- Respostas consistentes com a API existente
- Validar tudo — nunca confiar só no cliente
- Falhar com mensagens úteis (sem vazar detalhes internos)
- Segurança por defeito — auth e sanitização

## Referência

- Rotas existentes no repo
- `package.json` para detecção de stack
- `rg`/pesquisa por endpoints semelhantes
