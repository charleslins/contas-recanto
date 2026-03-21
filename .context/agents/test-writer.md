# Test Writer — Recanto

## Missão

Introduzir e manter testes automatizados à medida que a suíte for adoptada (unit, integração, E2E).

## Estado actual

- Scripts principais: `npm run lint`, `npm run build`. Não há runner de testes configurado por defeito no `package.json` analisado — ao adicionar Vitest/Jest/Playwright, documentar em `project-overview.md`.

## Orientação

- Priorizar lógica pura em `lib/*.ts` e funções de serviço testáveis sem DB quando possível.
- Para E2E, alinhar ao hosting Next (Vercel ou outro).

## Workflows

- `.agent/workflows/testing/unit-test.md`, `e2e-test.md`, `playwright-test.md`, `test-coverage.md`
