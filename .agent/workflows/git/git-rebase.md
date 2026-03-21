---
description: Assistência a rebase interactivo para limpar o histórico Git
---

# Git rebase

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a fazer *rebase* interactivo para organizar o histórico.

## Limites e cuidados

- **Não** fazer rebase de commits já partilhados/pushados sem avisar a equipa
- Criar branch de *backup* antes
- Entender cada passo
- Resolver conflitos com cuidado

## Passos

### 1. Objectivo

- Squash, reordenar, editar mensagens?
- Quantos commits?
- Já foram enviados ao remoto?

### 2. Preparar

- Working tree limpa
- `git branch backup/nome` opcional
- Identificar commit base

### 3. Iniciar rebase interactivo

```bash
git rebase -i HEAD~n
# ou até um commit específico
```

### 4. Acções por commit

- `pick` — manter
- `squash` — fundir com o anterior
- `reword` — alterar mensagem
- `edit` — parar para amend
- `drop` — remover

### 5. Conflitos

- Resolver ficheiros
- `git add`
- `git rebase --continue`

### 6. Verificar

- `git log --oneline`
- Testes / build
- `git push --force-with-lease` só se acordado (branch não partilhada ou equipa alinhada)

## Princípios

- Evitar rebase em histórico público sem coordenação
- Agrupar commits relacionados
- Mensagens claras
- Testar após rebase
