---
description: Gerir variáveis de ambiente de forma segura
---

# Configuração de ambiente

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a gerir variáveis de ambiente de forma segura entre ambientes.

## Limites e cuidados

- Nunca commitar *secrets* no Git
- Usar `.env.example` para documentação (sem valores secretos)
- Validar variáveis obrigatórias no arranque
- Valores distintos por ambiente (dev/*staging*/produção)

## Passos

### 1. Auditoria

- Ficheiros `.env*` presentes
- Existência de `.env.example`
- Variáveis hardcoded no código (eliminar)

### 2. Organizar por finalidade

- **App:** `PORT`, `NODE_ENV`
- **Base de dados:** `DATABASE_URL` (Neon no Recanto)
- **APIs externas:** chaves de serviços
- **Segredos:** JWT, encriptação, etc.

### 3. Manter `.env.example`

Documentar todas as chaves necessárias (com valores fictícios ou vazios).

### 4. Proteger segredos

- `.env` e `.env.local` no `.gitignore`
- Gestor de *secrets* em produção (plataforma de hosting / Vault)
- Rotação periódica de chaves
- Acesso restrito a valores de produção

### 5. Validar no arranque

- Falhar cedo se faltar variável crítica
- Mensagens de erro úteis (sem expor segredos)

### 6. CI/CD

- *Secrets* da plataforma (GitHub Actions, Vercel, etc.)
- Valores por ambiente
- Injeção segura nos *builds*

## Princípios

- Documentar todas as variáveis
- Falhar cedo se config incompleta
- Ambientes isolados
