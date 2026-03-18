# Testing Strategy

This document outlines the testing strategy for the codebase, ensuring high reliability, performance, and maintainability. Quality is maintained through a multi-layered testing approach that combines automated validation at the unit, integration, and end-to-end levels, enforced by automated quality gates in the CI/CD pipeline.

The strategy focuses on validating core business logic (services and utils), critical user journeys (authentication and management), and system resilience (circuit breakers and performance monitors).

## Test Types

### Unit Tests

- **Frameworks**: Jest and React Testing Library
- **Scope**: Individual functions, utility classes, and isolated components.
- **Naming Convention**: `*.test.ts` or `*.test.tsx`.
- **Location**: Typically co-located with the source file in `__tests__` directories or alongside the file.
- **Focus Areas**:
  - Validation logic (e.g., `ValidationSystem`)
  - Mathematical calculations (e.g., `VacationRulesCalculator`)
  - State management

### Integration Tests

- **Scope**: Focused on the interaction between multiple modules or services.
- **Examples**: 
  - Service-to-service interactions, such as `UserInviteService` interacting with `EmailService`
  - Complex hooks like `useSessionCache`
- **Scenarios**: Mocking Supabase responses to test data flow through repositories and presenters, and verifying error handling decorators.
- **Tooling**: Jest with specialized mocks for external dependencies like Supabase and LocalStorage.

### End-to-End (E2E) Tests

- **Framework**: Automated browser testing with Playwright.
- **Scope**: Full user journeys from the UI to the backend (or mocked backend).
- **Location**: Tests are located in the `testsprite_tests` directory using a Python-based Playwright environment.
- **Environments**: Executed against a local dev server or a staging environment.
- **Focus Areas**:
  - Critical paths like Registration Wizards, Admin Dashboards, and Employee Management workflows.

## Running Tests

### Frontend (Jest)

- **All tests**: 
  ```bash
  npm run test
  ```
- **Watch mode**: 
  ```bash
  npm run test -- --watch
  ```
- **Coverage report**: 
  ```bash
  npm run test -- --coverage
  ```

### E2E Tests (Playwright/Python)

- **Run E2E suite**:
  ```bash
  cd testsprite_tests && pytest
  ```

## Quality Gates

To maintain a high standard of code quality, the following requirements must be met before merging any Pull Request:

- **Minimum Code Coverage**:
    - **Overall**: 80% line coverage.
    - **Critical Services**: 90% coverage for files in `src/services` and `src/utils` containing business logic (e.g., `apiRetryUtils`, `validationSystem`).
- **Linting & Formatting**: 
    - All linting errors must be resolved (run `npm run lint`).
    - Consistency in style is required (run `npm run format:check` with Prettier).
- **Type Safety**:
    - TypeScript checks must pass (run `npm run type-check`).
- **Build Validation**:
    - The project must compile successfully (`npm run build`) to ensure production readiness.

## Troubleshooting

- **Flaky E2E Tests**: Address timing issues in E2E tests involving animations or real-time connections (e.g., with Supabase) by using `waitForSelector` or `waitForResponse` rather than hardcoded timeouts.
- **Circuit Breaker States**: Reset `CircuitBreaker` between tests to prevent persistent "Open" states from affecting subsequent cases.
- **Memory Usage**: If tests fail in CI due to memory limitations, run tests serially using the `--runInBand` flag in Jest.
- **Environment Variables**: Ensure a `.env.test` file is set up for tests that require Supabase keys or API endpoints to avoid unintended writes to production databases.

## Related Resources

- [Development Workflow](./development-workflow.md): Understand how testing integrates into the branching and deployment model of the project.
