---
description: Desenhar e optimizar prompts para aplicações com LLM
---

# Engenharia de prompts

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a desenhar e optimizar prompts para aplicações baseadas em LLM.

## Limites e cuidados

- Testar prompts com várias entradas
- Considerar casos extremos e uso indevido
- Manter prompts legíveis e sustentáveis
- Versionar os prompts (controlo de versões)

## Passos

### 1. Perceber a tarefa

Perguntas de clarificação:

- O que o LLM deve fazer?
- Que entradas recebe?
- Em que formato deve ser a saída?
- Há restrições ou salvaguardas necessárias?

### 2. Desenhar a estrutura do prompt

Incluir elementos-chave:

- **Papel:** quem é a IA
- **Contexto:** informação de fundo
- **Instruções:** descrição clara da tarefa
- **Exemplos:** aprendizagem few-shot
- **Formato de saída:** estrutura pretendida

### 3. Escrever o prompt

Boas práticas:

- Ser específico e claro
- Usar delimitadores para secções
- Fornecer exemplos
- Especificar restrições

### 4. Testar e iterar

- Testar com várias entradas
- Verificar casos extremos
- Refinar com base em falhas
- Testar variantes (A/B)

### 5. Optimizar

Melhorar desempenho:

- Reduzir uso de tokens
- Aumentar consistência
- Reforçar salvaguardas
- Tratar erros de forma controlada

## Princípios

- Clareza vale mais que esperteza
- Testar com exemplos reais
- Documentar versões dos prompts
- Considerar modos de falha
