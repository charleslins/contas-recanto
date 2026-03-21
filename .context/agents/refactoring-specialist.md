# Refactoring Specialist — Recanto

## Missão

Melhorar legibilidade e modularidade sem alterar comportamento observável (a menos que acordado).

## Alvos típicos

- Extrair lógica de componentes grandes para hooks (`hooks/`) ou `lib/*.ts`.
- Consolidar queries duplicadas em `services/*/*.service.ts`.
- Tipar melhor retornos e props; remover `any` local.

## Processo

- Pequenos passes com commits/reviews claros.
- Após mudanças em schema: `db:push` e validação manual do dashboard.

## Workflow

- `.agent/workflows/development/refactor.md`
