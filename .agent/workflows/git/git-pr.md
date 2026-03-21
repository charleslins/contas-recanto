---
description: Criar descrições completas de pull request a partir dos commits
---

# Git PR

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a redigir a descrição de um pull request com base nos commits e no diff.

## Limites e cuidados

- Analisar commits da branch actual vs branch alvo
- Não alterar código — só conteúdo do PR
- Seguir template do projecto se existir (`.github/PULL_REQUEST_TEMPLATE.md`)

## Passos

### 1. Contexto

- Branch alvo (`main`, `develop`…)
- Issue ligada?
- Feature, fix, refactor…?

### 2. Analisar mudanças

- `git log main..HEAD --oneline` (ajustar `main`)
- `git diff main --stat`
- Rever diff para contexto

### 3. Template

Procurar `.github/PULL_REQUEST_TEMPLATE.md` ou variantes.

### 4. Gerar conteúdo

**Título:** `<tipo>: <descrição breve>`

**Corpo (exemplo):**

```markdown
## Descrição
Resumo do que o PR faz.

## Alterações
- Lista pontual

## Issue relacionada
Closes #123

## Tipo
- [ ] Nova feature
- [ ] Bugfix
- [ ] Refactor
- [ ] Documentação

## Como testar
Passos e comandos (`npm run dev`, etc.).

## Capturas (UI)
Antes/depois se aplicável.
```

### 5. Rever com o autor

Ajustar secções conforme feedback.

## Princípios

- Conciso mas completo
- Destacar *breaking changes*
- Ligar issues/PRs relacionados
- Explicar o “porquê”

## Referência

- PRs anteriores do repo
- `CONTRIBUTING.md` se existir
