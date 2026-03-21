---
description: Construir aplicações de linha de comando com parsing de argumentos
---

# Ferramenta CLI

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a construir uma CLI adaptada à linguagem do projecto.

## Limites e cuidados

- Detectar linguagem/runtime antes de sugerir bibliotecas
- Boas práticas: `--help`, `--version`, códigos de saída
- Mensagens de erro claras
- Modo interactivo e não-interactivo quando fizer sentido

## Passos

### 1. Requisitos

- O que a CLI faz?
- Comandos e subcomandos?
- Argumentos e *flags*?
- Interactiva ou só argumentos?

### 2. Detectar linguagem

- Node: Commander, Yargs, etc.
- Python: argparse, Click
- Go: Cobra
- Rust: Clap

### 3. Estrutura

- Ponto de entrada e parsing
- Subcomandos
- Texto de ajuda
- *Flag* de versão

### 4. Implementar comandos

- Parse e validação
- Lógica
- Erros tratados
- Saída legível

### 5. Experiência de utilização

- Cores (chalk, rich…) se apropriado
- Progresso em operações longas
- Prompts interactivos quando necessário

### 6. Verificar

- Todos os comandos
- Saída de ajuda
- Erros

## Princípios

- Falhar cedo com mensagens claras
- *Flags* e variáveis de ambiente quando útil
- Convenções da plataforma
