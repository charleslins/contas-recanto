---
description: Criar workflows stack-agnostic para o repositório Recanto (.agent/workflows)
---

# Criador de workflows

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar um novo procedimento alinhado à filosofia **stack-agnostic** e orientada a **perguntas**.

## Limites e cuidados

- Cada workflow deve ser **stack-agnostic**
- Nunca fixar frameworks, bibliotecas ou ferramentas específicas no texto
- Incluir sempre um passo de **detecção de stack**
- Incluir sempre **perguntas de clarificação**
- Manter o workflow focado numa **única tarefa**

## Passos

### 1. Definir o workflow

Recolher informação:

- **Nome:** identificador em kebab-case (ex.: `git-commit`, `debug-error`)
- **Categoria:** development, git, testing, debugging, security, documentation, deployment, database, ai-tools ou creative
- **Descrição:** resumo numa linha (5–10 palavras)
- **Propósito:** que problema resolve?

### 2. Seguir a estrutura de modelo

Cada workflow deve ter estas secções:

```markdown
---
description: [descrição em 5-10 palavras]
---

# Nome do workflow

Introdução breve: o que faz e quando usar.

## Limites e cuidados
- O que EVITAR
- Limites de âmbito
- Restrições críticas

## Passos

### 1. Perceber o contexto
Perguntas de clarificação:
- Qual o objectivo?
- Que restrições existem?
- Qual o resultado esperado?

### 2. Analisar o projecto
Detectar stack existente:
- Ver ficheiros de configuração relevantes
- Identificar framework, ferramentas, padrões
- Olhar código existente para convenções

Se não estiver claro, perguntar ao utilizador.

### 3. [Passos centrais de implementação]
Descrever O QUE fazer, não código exacto.
Deixar a IA gerar a implementação adequada.

### 4. Verificar
- Como confirmar sucesso
- O que testar

## Princípios
- Boas práticas universais

## Referência
- Ligações à documentação relevante
```

### 3. Validar face aos princípios centrais

Garantir que o workflow cumpre:

| Princípio | Verificação |
|-----------|-------------|
| Stack-agnostic | Funciona com qualquer framework? |
| Orientado a perguntas | Pede clarificações? |
| Responsabilidade única | Faz UMA coisa bem? |
| Divulgação progressiva | Começa mínimo e expande sob demanda? |
| Componível | Pode combinar com outros workflows? |

### 4. Criar o ficheiro

Criar o ficheiro em:

```
.agent/workflows/<categoria>/<nome>.md
```

### 5. Actualizar o registry

Adicionar entrada em `.agent/workflows/registry.json`:

```json
"<nome>": {
  "category": "<categoria>",
  "description": "<descrição 5-10 palavras>",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### 6. Testar o workflow

1. Colocar o ficheiro em `.agent/workflows/` deste repositório (ou clone de teste)
2. Abrir o projeto no **Cursor** (ou IDE com suporte a workflows/agentes)
3. Invocar o workflow pelo nome ou caminho acordado com a equipa
4. Confirmar que faz perguntas adequadas
5. Confirmar que detecta a stack do projecto correctamente

## Erros comuns a evitar

### Não fazer: fixar frameworks

```markdown
### Instalar dependências
npm install react tailwindcss
```

### Fazer: detectar e adaptar

```markdown
### Analisar a stack do projecto
- Verificar framework UI existente
- Verificar abordagem CSS
Se não estiver claro, perguntar ao utilizador.
```

### Não fazer: dar boilerplate completo

```markdown
Criar `Button.tsx`:
import React from 'react'
export const Button = () => <button>Clique</button>
```

### Fazer: descrever o que criar

```markdown
Criar um componente de botão que:
- Aceite props de variante (primary, secondary)
- Siga os padrões de componentes do projecto
- Use a abordagem de estilos do projecto
```

## Referência

- Ver workflows existentes em `.agent/workflows/` como exemplos
- Se existir `CONTRIBUTING.md` na raiz, seguir as directrizes lá descritas
