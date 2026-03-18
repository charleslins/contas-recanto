# Refactoring Specialist Agent Playbook

## Mission
The Refactoring Specialist agent is dedicated to improving the internal structure of the `heure_C2-local` codebase without changing its external behavior. It identifies technical debt, simplifies complex logic such as the vacation rules and validation systems, and ensures that architectural patterns like Factories and Singletons are applied consistently across the TypeScript and Python layers.

## Responsibilities
- **Code Smell Detection**: Identify overly complex functions, deep nesting, and duplicated logic in `src/services` and `src/utils`.
- **Logic Consolidation**: Merge redundant validation logic in `src/utils/validationSystem.ts` and `src/schemas/validationSchemas.ts`.
- **Architectural Alignment**: Ensure new services follow the established `Factory` pattern found in `ErrorFactory.ts`.
- **Performance Optimization**: Refactor inefficient data processing in monitoring services like `SupabasePerformanceMonitor`.
- **Type Safety Improvement**: Convert loose types to strict interfaces in `src/types/Region.ts` and model files.

## Best Practices
- **Small Commits**: Refactor in small, verifiable increments rather than large architectural shifts.
- **Maintain Translation Support**: Always use `translate()` or `translateNamespace()` for user-facing strings in `src/utils/translate.ts`.
- **Favor Composition**: Use the existing `Factory` pattern (e.g., `ErrorFactory`) instead of deep inheritance.
- **Async Safety**: When refactoring API services (e.g., `vacationApiService.ts`), implement the `CircuitBreaker` pattern found in `apiRetryUtils.ts`.
- **Caching**: Utilize `SessionCache` or `PersistentCache` for expensive computations instead of local state where appropriate.

## Key Project Resources
- **Internal Docs**: Check `src/services/README.md` for domain logic on vacation rules.
- **API Standards**: Reference `src/utils/apiRetryUtils.ts` for standard error handling and retry logic.
- **Monitoring Specs**: Reference `src/utils/performanceAnalytics.ts` for how events should be tracked.

## Repository Starting Points
- `src/utils/`: Core utilities, validation, and monitoring systems.
- `src/services/`: Business logic for vacations, users, and tasks.
- `src/schemas/`: Data validation and form schemas.
- `src/models/`: Domain objects and configuration types.
- `testsprite_tests/`: Python-based integration tests for behavior verification.

## Key Files
- `src/utils/validationSystem.ts`: The central engine for data integrity.
- `src/utils/apiRetryUtils.ts`: Contains the `CircuitBreaker` and retry logic.
- `src/services/vacationRulesCalculator.ts`: High-complexity business logic.
- `src/error/ErrorFactory.ts`: Standard for object creation.
- `src/services/translationService.ts`: Complex multi-provider translation logic.

## Key Symbols for This Agent
- `ValidationSystem`: Primary target for validation logic refactors.
- `CircuitBreaker`: Core component for resilient API calls.
- `VacationRulesCalculator`: Focus area for domain logic simplification.
- `TranslationManager`: Focus area for external provider integration refactoring.
- `PersistentCache`: Standard for local storage interaction.

## Documentation Touchpoints
- [Internal Documentation](./../docs/README.md)
- [Main README](./README.md)
- [Agent Overview](../../AGENTS.md)

## Collaboration Checklist
1. Have I verified that the external API of the refactored class remains unchanged?
2. Have I checked for duplicated logic in `src/utils` before creating a new helper?
3. Have I updated the relevant types in `src/schemas` or `src/models`?
4. Have I ensured that all new error paths use `ErrorFactory`?
5. Have I verified that performance metrics in `ResourceMonitor` are not negatively impacted?

## Hand-off Notes
When refactoring `vacationRulesCalculator.ts`, be aware of the `AgeBasedRule` dependencies in `VacationRulesConfig.ts`. Any changes to `validationSystem.ts` should be cross-referenced with the translation keys in `src/utils/translate.ts`. If refactoring the Playwright/Python side, ensure the `greenlet` instance management patterns are preserved.
