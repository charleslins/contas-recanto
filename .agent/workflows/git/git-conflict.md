---
description: Resolver conflitos de merge com sugestões contextualizadas
---

# Resolução de conflitos Git

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a entender e resolver conflitos de *merge*.

## Limites e cuidados

- Não resolver automaticamente sem confirmação
- Explicar cada lado do conflito
- Preservar a intenção de ambas as branches quando possível
- Correr testes / build após resolver

## Passos

### 1. Identificar

- `git status` — ficheiros em conflito

### 2. Analisar cada ficheiro

- Marcadores `<<<<<<<`, `=======`, `>>>>>>>`
- Versão actual (*ours*) vs versão entrante (*theirs*)
- Sobreposição ou mudanças independentes?

### 3. Intenção

- Objectivo das tuas alterações?
- O que a outra branch introduz?
- Manter ambas, uma delas, ou reescrever?

### 4. Estratégia

| Estratégia | Quando |
|------------|--------|
| Manter a nossa | A nossa versão deve prevalecer |
| Manter a deles | A entrada deve prevalecer |
| Fundir ambas | Compatíveis e ambas necessárias |
| Reescrita manual | Conflito semântico |

### 5. Aplicar

- Remover marcadores
- Editar o resultado final
- `git add` nos ficheiros resolvidos

### 6. Verificar

- `git diff --staged`
- Testes / compilação

### 7. Concluir

- `git status` sem conflitos
- `git commit` (merge ou continuar fluxo)

## Princípios

- Entender antes de escolher
- Em dúvida, perguntar
- Testar depois de resolver
- Mensagem de commit pode descrever resoluções complexas

## Referência

- `git log --merge`
- `git diff`
- `git checkout --ours/--theirs <ficheiro>` (uso consciente)
