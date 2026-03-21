---
description: Testes end-to-end no browser com framework detectado
---

# Testes E2E

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a escrever testes end-to-end alinhados ao framework em uso.

## Limites e cuidados

- Detectar Playwright/Cypress/etc. antes de escrever
- Testar fluxos de utilizador, não implementação interna
- Evitar testes instáveis (*flaky*)
- Esperas explícitas (elemento visível, rede) em vez de `sleep` fixo

## Passos

### 1. O que testar

- Fluxo de utilizador crítico?
- Caminhos que não podem regredir?
- Browsers alvo?

### 2. Detectar framework

- Playwright: `playwright.config.ts`
- Cypress: `cypress.config.*`
- Selenium / Puppeteer conforme o repo

Se não houver nada, Playwright é boa escolha para projectos novos.

### 3. Casos de teste

- Cenário claro
- Pré-condições
- Acções do utilizador
- Resultado esperado na UI ou URL

### 4. Operações assíncronas

- Esperar visibilidade / conteúdo
- Esperar rede quando necessário
- Evitar timeouts arbitrários longos
- Retries no CI se configurado

### 5. Executar

- Modo *headed* para depuração
- Depois CI

## Princípios

- O que o utilizador faz, não como o código faz
- Testes determinísticos
- Dados de teste isolados
- Limpeza após testes
