---
description: Construir landing pages com forte conversão para qualquer stack
---

# Criação de landing page

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a construir uma landing page visualmente forte e orientada à conversão, adaptada à stack do projecto.

## Limites e cuidados

- Não assumir framework específico (React, Vue, etc.)
- Detectar a stack antes de sugerir implementações
- Preferir design marcante e distintivo a opções genéricas “seguras”
- Mobile-first
- Acessibilidade: contraste, HTML semântico

## Passos

### 1. Perceber requisitos

- Que produto/serviço se promove?
- Público-alvo?
- Chamada principal à acção (registo, compra, demo)?
- Secções necessárias (hero, funcionalidades, preços, testemunhos)?
- Guia de marca ou paleta?

### 2. Analisar a stack

- **Framework:** React, Vue, Angular, Svelte ou HTML estático
- **Estilos:** Tailwind, CSS Modules, Sass, styled-components, CSS puro
- **Animação:** Framer Motion, GSAP, AOS, etc.
- **Padrões** nos componentes existentes

Se não estiver claro, perguntar ao utilizador.

### 3. Planear secções

**Acima da dobra:**

- Hero com título e proposta de valor
- CTA principal
- Imagem, ilustração ou fundo visual

**Abaixo da dobra:**

- Prova social (logos, testemunhos)
- Grelha de benefícios (3–4 pontos com ícones)
- Como funciona (passos)
- Preços (se aplicável)
- FAQ
- CTA final com formulário ou registo

### 4. Criar componentes

Por secção:

- Seguir padrões do projecto
- Estilos consistentes
- Animações de entrada quando fizer sentido
- HTML semântico

### 5. Montar a página

- Ordem lógica das secções
- Espaçamento consistente
- Scroll e navegação suaves

### 6. Verificar

- Mobile, tablet, desktop
- Contraste (WCAG AA)
- CTAs visíveis e clicáveis
- Desempenho de carregamento

## Princípios

### Design

- Tipografia: títulos grandes; interlinha confortável no corpo
- Cor: primária nos CTAs; gradientes subtis no fundo
- Espaçamento entre secções generoso no desktop (ex.: 80–120px)
- Modo escuro opcional

### Desempenho

- Imagens optimizadas (WebP, lazy loading)
- JavaScript enxuto
- Fontes web ou system fonts optimizadas

### Acessibilidade

- Estrutura semântica
- Texto alternativo em imagens
- Contraste suficiente
- Navegação por teclado

## Referência

- Componentes existentes
- Tokens ou CSS global
- Guidelines de marca
