---
name: api-design
description: Desenhar contratos de API ou server actions do Recanto (REST futuro ou boundaries internas)
---

# API design — Recanto

## Contexto do repo

- O núcleo actual são **server actions** e serviços Drizzle, não uma API REST pública obrigatória.
- Use este skill quando: expor **Route Handlers** (`app/api/...`), integrar webhook, ou definir contratos entre módulos.

## Princípios

- Validação de entrada explícita (Zod ou equivalente).
- Respostas tipadas; erros com mensagem segura para o cliente (sem stack em produção).
- Autenticação/autorização documentadas antes de expor endpoints.

## Se for apenas server action

- Nomear funções de forma clara; argumentos serializáveis; retornar `{ ok, data }` / `{ ok: false, error }` se for o padrão do projeto.

## Workflow

- `.agent/workflows/development/new-api.md`
