# Napkin Runbook — Recanto

> Stack: Next.js 15, Drizzle, Neon, shadcn. Regras Cursor: `.cursorrules`. Docs: `.context/docs/project-overview.md`.

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-03-19] Validar ferramentas com comando oficial de diagnóstico**
   Do instead: antes de concluir, rodar diagnóstico oficial (`doctor`/health check) e confirmar resultado final.

## Shell & Command Reliability
1. **[2026-03-19] Confirmar contexto antes de comandos de projeto**
   Do instead: validar diretório de trabalho e estado do terminal antes de executar comandos que dependem do repo atual.

## Domain Behavior Guardrails
1. **[2026-03-19] `context-mode upgrade` pode sobrescrever hooks do projeto**
   Do instead: após upgrade, validar `~/.cursor/hooks.json` e `./.cursor/hooks.json` e confirmar qual arquivo o `doctor` está carregando.
2. **[2026-03-19] Priorizar verificação local para ferramentas de contexto**
   Do instead: testar CLI/MCP local primeiro e usar docs apenas para confirmar comportamento esperado.

## User Directives
1. **[2026-03-19] Responder sempre em português**
   Do instead: redigir todas as atualizações e respostas finais em português.
