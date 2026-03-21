---
description: Gerar README completos para projectos
---

# Gerador de README

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar um README útil e actualizado.

## Limites e cuidados

- Basear-se no projecto **real** (ficheiros, scripts)
- Não listar funcionalidades inexistentes
- Manter alinhado ao código
- Estrutura escaneável (títulos, listas)

## Passos

### 1. Analisar o projecto

- `package.json` (ou equivalente)
- Docs existentes (`.context/docs`, `PRD.md`)
- Estrutura de pastas
- Funcionalidades principais

### 2. Audiência

- Desenvolvedores, utilizadores finais, ou ambos?
- O que é essencial no topo?
- Secções obrigatórias?

### 3. Estrutura sugerida

- Título e descrição
- *Badges* (CI, versão, licença) se fizer sentido
- Início rápido
- Instalação detalhada
- Utilização
- API / comandos
- Contribuição
- Licença

### 4. Redigir

- Conciso e completo
- Exemplos de comandos correctos
- Capturas para UI
- Ligações para documentação profunda

### 5. Verificar

- Comandos reproduzíveis
- Ligações válidas
- Exemplos actuais

## Princípios

- Valor logo no início (“o que isto faz”)
- *Quick start* realmente rápido
- Exemplos copiáveis
