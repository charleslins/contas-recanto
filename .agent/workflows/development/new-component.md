---
description: Criar componentes UI reutilizáveis para qualquer framework frontend
---

# Novo componente

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar um componente de UI reutilizável e bem estruturado.

## Limites e cuidados

- Não assumir framework — detectar primeiro
- Seguir padrões de componentes e estilos do projecto
- Não gerar código até a stack estar clara
- Uma responsabilidade por componente

## Passos

### 1. Perceber requisitos

- Nome e propósito do componente?
- Props necessárias?
- Estado interno?
- Componentes semelhantes no repo para referência?

### 2. Analisar a stack

- **Framework:** React, Vue, Angular, Svelte…
- **Linguagem:** TypeScript ou JavaScript
- **Estilos:** Tailwind, CSS Modules, Styled Components, Sass…
- **Localização:** onde vivem os componentes existentes?

Consultar `package.json` e componentes actuais. Se não estiver claro, perguntar.

### 3. Estudar padrões

- 1–2 componentes semelhantes como referência
- Nomenclatura, export default vs named
- Tipagem em TypeScript

### 4. Criar o componente

- Ficheiro no directório correcto (`components/` ou `components/ui/` no Recanto)
- Abordagem de estilos do projecto
- Tipos/interfaces para props
- Acessibilidade (ARIA, foco, teclado)
- Export conforme convenção

### 5. *Barrel files*

Se o projecto usa `index.ts` de re-export, actualizar.

### 6. Verificar

- Render sem erros
- Props funcionam
- Estilo consistente
- Acessibilidade mantida

## Princípios

- Consistência com o código existente
- Começar mínimo; expandir se necessário
- Acessibilidade desde o início
- Tipos correctos em TypeScript

## Referência

- `package.json`
- Componentes existentes; pesquisa por nome ou padrão semelhante
