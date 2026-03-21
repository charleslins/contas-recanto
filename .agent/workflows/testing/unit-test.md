---
description: Gerar testes unitários completos com o framework detectado no projecto
---

# Testes unitários

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a escrever testes unitários efectivos.

## Recanto (estado actual)

- Gate habitual: `npm run lint` e `npm run build`.
- O `package.json` pode **ainda não** ter script `test` / Vitest / Jest — **detectar** antes de criar `*.test.ts`.
- Prioridade futura: funções puras em `lib/*.ts` e lógica em `services/*/*.service.ts` (com mocks do Drizzle).

## Limites e cuidados

- Não assumir Jest/Vitest/pytest sem verificar
- Detectar configuração de testes existente
- Testar **comportamento**, não pormenores de implementação
- Testes independentes e isolados
- Nomes de teste descritivos

## Passos

### 1. O que testar

- Ficheiros ou funções?
- Casos extremos importantes?
- Meta de cobertura?
- Serviços externos a mockar?
- Padrões de teste já usados no repo?

### 2. Analisar o setup

**JS/TS:** Jest, Vitest, Mocha, Testing Library…

**Python:** pytest, unittest…

Se não existir setup, perguntar qual framework preferem e ajudar a configurar.

### 3. Analisar o código sob teste

- Propósito e comportamento esperado
- Entradas, saídas, efeitos secundários
- Casos extremos (null, vazio, limites)
- Dependências a mockar

### 4. Escrever testes (padrão AAA)

- **Arrange:** dados e mocks
- **Act:** invocar a unidade
- **Assert:** verificar resultado

Agrupar com `describe` / equivalente; uma asserção principal por teste quando possível.

### 5. Mocking

- Rede, BD, sistema de ficheiros, tempo, serviços terceiros
- Mock na fronteira do módulo

### 6. Executar

- Correr a suíte
- Rever relatório de cobertura se existir
- Corrigir falhas

## Princípios

### Qualidade

- Testar API pública da unidade
- Caminho feliz, erros e extremos
- Testes rápidos (mockar operações lentas)
- Determinísticos (evitar aleatório e relógio real)

### Organização

- Testes junto ao código ou em `__tests__/`
- Nomes consistentes (`*.test.ts`, `*.spec.ts`)

### Cobertura

- ~80%+ em caminhos críticos é um alvo comum
- 100% não garante ausência de bugs
- Priorizar lógica complexa

### Mocking

- Mock nas fronteiras; reset entre testes
- Verificar interacções quando relevante

## Padrões comuns

- **Funções puras:** várias entradas e extremos
- **Async:** await; sucesso e erro
- **Componentes UI:** render, interacções, condicionais
- **Hooks:** utilitários do framework de testes

## Referência

- Testes existentes no repo
- Ficheiro de configuração do runner
- Relatórios de cobertura
