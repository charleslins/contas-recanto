# Estratégia de testes — Recanto

## Estado actual

- **Gate mínimo:** `npm run lint` e `npm run build`.
- **Suíte unitária/E2E:** ainda não é requisito fixo no `package.json`; quando se introduzir (Vitest, Playwright, etc.), actualizar este documento e `project-overview.md`.

## Prioridades sugeridas (quando houver test runner)

1. Funções puras em `lib/*.ts` (parser, máscaras, importação).
2. Serviços com mocks do cliente Drizzle ou DB de teste.
3. Fluxos críticos E2E: criar transação, filtrar, importar ficheiro pequeno.

## CI

- Workflow existente focado em schema: `.github/workflows/drizzle-push.yml`.
- Futuros workflows de teste devem correr em PR sem depender de secrets desnecessários.

## Workflows relacionados

- `.agent/workflows/testing/unit-test.md`, `e2e-test.md`, `test-coverage.md`
