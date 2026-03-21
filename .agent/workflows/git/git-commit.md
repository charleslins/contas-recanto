---
description: Gerar mensagens de commit convencionais a partir das alterações em stage
---

# Git commit

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

> **Recanto:** o `.cursorrules` pede mensagens de commit em **português**; pode combinar com o formato Conventional Commits, ex.: `feat(ui): adicionar filtro na tabela`.

Este workflow ajuda a gerar mensagens de commit claras com base em `git diff --staged`.

## Limites e cuidados

- Analisar só o que está em *stage* (`git diff --staged`)
- Formato [Conventional Commits](https://www.conventionalcommits.org/) (tipo e âmbito opcional)
- Linha de assunto até ~72 caracteres
- Não fazer commit se não houver alterações em *stage*

## Passos

### 1. Analisar o *stage*

- `git diff --staged`
- `git diff --staged --stat` para resumo
- Identificar tipo e âmbito das mudanças

### 2. Escolher o tipo

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Só documentação |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refactor sem fix nem feature |
| `perf` | Desempenho |
| `test` | Testes |
| `chore` | Build, tooling, dependências |
| `ci` | CI/CD |

### 3. Âmbito (opcional)

- Módulo (`auth`, `api`, `db`, `ui`…)
- Área da feature

### 4. Mensagem

Formato: `<tipo>(<âmbito>): <descrição>`

- Modo imperativo (“adicionar” em PT ou “add” se preferir EN)
- Sem ponto final na primeira linha
- Específico e curto

Exemplos (PT): `feat(transacoes): permitir filtro por categoria`, `fix: corrigir importação CSV com linha vazia`

### 5. Corpo (opcional)

- Linha em branco após o assunto
- Explicar O QUÊ e PORQUÊ
- ~72 colunas por linha

### 6. Executar

Sugerir a mensagem e confirmar com o utilizador antes de `git commit`.

## Princípios

- Um commit = uma mudança lógica
- Se precisar de “e” no título, considerar dividir
- Referenciar issues: `fixes #123`

## Referência

- [Conventional Commits](https://www.conventionalcommits.org/)
- `git log --oneline -10` para ver o estilo do repo
