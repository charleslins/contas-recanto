---
description: Criar agentes de IA com ferramentas e capacidades
---

# Agente de IA

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a construir um agente de IA com ferramentas e capacidades definidas.

## Limites e cuidados

- Definir limites claros para as acções do agente
- Implementar tratamento de erros adequado
- Registar decisões do agente para depuração
- Incluir verificações de segurança para acções destrutivas

## Passos

### 1. Perceber requisitos

Perguntas de clarificação:

- O que o agente deve fazer?
- De que ferramentas precisa?
- Qual LLM o alimenta?
- Há restrições de segurança?

### 2. Desenhar o agente

Planear a arquitectura:

- Tipo de agente (ReAct, cadeia de raciocínio, etc.)
- Ferramentas disponíveis
- Memória e contexto
- Formato de saída

### 3. Definir ferramentas

Para cada capacidade:

- Nome e descrição
- Parâmetros de entrada
- Implementação
- Tratamento de erros

### 4. Implementar o agente

Construir os componentes centrais:

- Integração com o LLM
- Execução de ferramentas
- Parsing de respostas
- Gestão de contexto

### 5. Adicionar segurança

Implementar salvaguardas:

- Validação de entrada
- Confirmação para operações destrutivas
- Limitação de taxa (rate limiting)
- Recuperação de erros

### 6. Testar

Verificar comportamento:

- Cenários de caminho feliz
- Casos extremos
- Tratamento de erros
- Restrições de segurança

## Princípios

- Começar simples e aumentar complexidade gradualmente
- Registar tudo para depuração
- Falhar de forma controlada
- Humano no ciclo para acções críticas
