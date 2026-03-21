# Recanto — Arquitetura

## Visão geral

Monólito modular **full-stack Next.js**: UI em React, persistência em **Postgres (Neon)** com **Drizzle ORM**. Sem backend-as-a-service externo no núcleo actual; auth multi-utilizador e políticas finas na BD podem ser evoluções futuras.

## Build e runtime

- **Framework:** Next.js 15 com **App Router** (`app/`).
- **Renderização:** Server Components por defeito; `'use client'` onde há estado ou eventos.
- **Bundling:** Turbopack/Webpack conforme versão Next; não é Vite SPA.

## Fluxo de dados (simplificado)

```mermaid
flowchart LR
  UI[components + app] --> Actions[server actions services]
  Actions --> Drizzle[Drizzle ORM]
  Drizzle --> PG[(Neon Postgres)]
```

1. Utilizador interage com componentes cliente ou páginas.
2. Mutações passam por **server actions** em `services/*/*.actions.ts` (ou chamadas equivalentes).
3. **`services/*/*.service.ts`** concentra leitura/escrita via Drizzle.
4. **Schema** e tipos inferidos em `lib/db/schema.ts`.

## Camadas sugeridas

| Camada | Local | Responsabilidade |
|--------|--------|------------------|
| Rotas / layout | `app/` | Composição, metadata, boundaries |
| UI | `components/` | Apresentação; formulários e listas |
| Domínio / dados | `services/` | Regras de acesso, actions, serviços Drizzle |
| Infraestrutura DB | `lib/db/` | Cliente, schema |
| Utilitários | `lib/*.ts` | Parsers, formatadores, helpers puros |
| Hooks | `hooks/` | Estado e efeitos reutilizáveis |

## Padrões detectados

- **Server Actions** para mutações ligadas ao servidor.
- **Separação** entre `.service.ts` (consultas) e `.actions.ts` (entrada da action + validação).
- **Zod** (quando usado) para validar input antes de persistir.

## CI/CD

- **`.github/workflows/drizzle-push.yml`** — em alterações a `lib/db/schema.ts` ou `drizzle.config.ts`, push do schema com `DATABASE_URL` em secrets.

## Riscos e cuidados

- Alterações de schema exigem coordenação com `db:push` / workflow e dados existentes.
- Manter queries tipadas com Drizzle evita SQL ad hoc inseguro.
