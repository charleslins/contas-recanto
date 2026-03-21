---
description: Melhorar cobertura de testes para ficheiros ou funções específicas
---

# Cobertura de testes

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a aumentar a cobertura de forma **significativa**, não só o número.

## Limites e cuidados

- Valor em testes úteis, não só percentagem
- Priorizar caminhos críticos
- Não testar código do framework
- Manter testes sustentáveis

## Passos

### 1. Analisar cobertura actual

- `npm run test -- --coverage` (se existir)
- `pytest --cov`, etc.
- Identificar ficheiros/linhas descobertos

### 2. Lacunas

- Que módulos importam?
- Meta de percentagem realista?
- Funções prioritárias?

### 3. Priorizar

- Lógica de negócio
- Funções complexas
- Tratamento de erros
- Casos extremos

### 4. Escrever testes

- Compreender o comportamento
- Casos de teste com significado
- Extremos cobertos

### 5. Verificar

- Relatório de cobertura actualizado
- Testes que realmente protegem o comportamento

## Princípios

- 100% de cobertura ≠ sem bugs
- Testar comportamento
- Caminhos críticos primeiro
- Evitar testar *boilerplate* vazio
