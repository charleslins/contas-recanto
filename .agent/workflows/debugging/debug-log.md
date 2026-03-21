---
description: Adicionar logging e pontos de depuração estratégicos
---

# Logging para depuração

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a adicionar *logging* estratégico para diagnosticar problemas.

## Limites e cuidados

- Não registar dados sensíveis (palavras-passe, tokens, PII)
- Usar níveis de log adequados
- Tornar logs analisáveis por máquina quando necessário
- Remover ou desactivar logs de debug antes de produção (salvo política contrária)

## Passos

### 1. Perceber o problema

- Que comportamento se pretende esclarecer?
- Onde se suspeita que está o problema?
- Que dados ajudariam a diagnosticar?
- Ambiente: desenvolvimento ou produção?

### 2. Detectar o setup de logging

- Node: `console`, winston, pino, etc.
- Python: `logging`, loguru
- Padrões já usados no repo

### 3. Adicionar logs estratégicos

- Entrada/saída de funções críticas
- Antes e depois de chamadas externas
- Ramos condicionais importantes
- Blocos `catch`

### 4. Incluir contexto útil

- Parâmetros de entrada
- Mudanças de estado
- Tempos / duração
- Detalhes do erro com *stack*

### 5. Níveis

- **DEBUG:** diagnóstico detalhado
- **INFO:** eventos operacionais normais
- **WARN:** situações anómalas mas não fatais
- **ERROR:** falhas

### 6. Verificar

- Percorrer o fluxo e ler os logs
- Remover ruído desnecessário quando terminar

## Princípios

- Registar o “porquê”, não só o “o quê”
- *Correlation IDs* para rastrear pedidos
- Logs pesquisáveis (estruturados quando possível)
