---
description: Analisar mensagens de erro e stack traces para sugerir correções
---

# Depuração de erros

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a analisar erros e *stack traces* para identificar a causa raiz e sugerir correções.

## Limites e cuidados

- Focar no erro real, não só nos sintomas
- Verificar causas comuns antes de aprofundar
- Sugerir correções alinhadas aos padrões do projecto
- Não alterar código sem confirmação do utilizador (quando aplicável)

## Passos

### 1. Recolher informação

- Mensagem de erro completa?
- *Stack trace* disponível?
- Que acção reproduz o erro?
- É novo ou regressão?
- Reprodução consistente?

### 2. Analisar o erro

**Da mensagem:**

- Tipo (`TypeError`, `SyntaxError`, rede, etc.)
- Descrição
- Ficheiro e linha (se indicados)

**Do *stack trace*:**

- Ponto de entrada da falha
- Sequência de chamadas
- Código externo vs interno

### 3. Causas frequentes

| Tipo | Causas comuns |
|------|----------------|
| TypeError | Acesso a null/undefined, tipo incorrecto |
| ReferenceError | Variável não definida, âmbito |
| SyntaxError | Erro de sintaxe, falta de parênteses/chaves |
| Erro de rede | API indisponível, CORS, URL, auth |
| Module not found | Dependência em falta, caminho de import |

### 4. Investigar o código

- Ler ficheiro e linha referidos
- Ver alterações recentes se for regressão
- Código relacionado que possa afectar o fluxo

### 5. Sugerir correções

Por hipótese (da mais provável):

- O que está errado
- Trecho problemático
- Proposta de correção
- Porque resolve

### 6. Verificar a correção

- Voltar a executar o fluxo
- Confirmar que o erro desapareceu
- Procurar novos erros

## Princípios

- A mensagem de erro muitas vezes indica o problema exactamente
- Em regressões, verificar o último *commit* primeiro
- Considerar casos extremos (null, vazio, undefined)
- Verificar *typos* em nomes

## Referência

- Padrões semelhantes no código
- Documentação da API/biblioteca
- Histórico de *commits* recentes
