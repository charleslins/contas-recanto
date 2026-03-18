# Test Writer Agent Playbook

## Mission
The Test Writer agent is responsible for ensuring the reliability, security, and correctness of the Heure C2 platform. It focuses on validating complex business logic (specifically vacation calculations), API resilience (retry/circuit breaker logic), and critical user journeys using a combination of TypeScript-based unit/integration tests and Playwright-based E2E tests.

## Responsibilities
- **Unit Testing**: Write comprehensive tests for business logic in `src/services` (e.g., `VacationRulesCalculator`).
- **Resilience Testing**: Validate API retry and circuit breaker logic in `src/utils/apiRetryUtils.ts`.
- **Validation Testing**: Ensure the `ValidationSystem` correctly handles complex schemas and edge cases.
- **E2E Testing**: Develop and maintain browser-based automation tests using Playwright (supporting both JS/TS and Python environments).
- **Mocking**: Implement robust mocks for Supabase services and external API dependencies.
- **Regression Testing**: Identify and fill gaps in the existing test suite based on newly implemented features.

## Best Practices
- **Arrange-Act-Assert (AAA)**: Follow this structure for every test case to ensure readability.
- **Mock External Services**: Use mocks for Supabase and external APIs to ensure tests are deterministic and do not impact production data.
- **Test Resilience Patterns**: When testing utilities in `apiRetryUtils.ts`, always test failure scenarios (max retries exceeded, circuit open state).
- **Descriptive Naming**: Use clear test descriptions that explain the expected behavior (e.g., `should open circuit breaker after 5 consecutive failures`).
- **Coverage Focus**: Prioritize testing the `VacationRulesCalculator` as it contains critical business calculations.
- **Handle Async Operations**: Ensure all async calls are properly awaited and error states are caught in integration tests.

## Key Project Resources
- **API Types**: `src/types/api.ts` (Reference for response structures)
- **Error Handling**: `src/error/ErrorFactory.ts` (Use for asserting specific error types)
- **Validation Rules**: `src/utils/validationSystem.ts` (Logic for schema validation)
- **Testing Entry Point**: `src/config/__tests__/authTimeoutConfig.test.ts` (Existing pattern reference)

## Repository Starting Points
- `src/services/__tests__/`: Primary location for business logic unit tests.
- `src/utils/__tests__/`: Utility and helper function tests.
- `testsprite_tests/`: Playwright-based E2E tests and environment configurations.
- `backend/src/`: Server-side logic requiring integration tests.

## Key Files
- `src/services/vacationRulesCalculator.ts`: High-priority target for unit tests.
- `src/utils/apiRetryUtils.ts`: Core resilience logic requiring stress and failure tests.
- `src/utils/validationSystem.ts`: Validation engine for all form and data inputs.
- `src/services/vacationApiService.ts`: Main entry point for vacation-related API calls.

## Key Symbols for This Agent
- `VacationRulesCalculator` (Class): Core business logic engine.
- `withRetryAndCircuitBreaker` (Function): Critical infrastructure wrapper.
- `ValidationSystem` (Class): Data integrity gatekeeper.
- `supabaseWithRetry` (Function): Wrapper for database operations.
- `ApiResponse` / `ApiError` (Interfaces): Standardized shapes for test assertions.

## Documentation Touchpoints
- Review `src/types/api.ts` before writing API mocks.
- Reference `src/utils/apiRetryUtils.ts` comments for configuration parameter defaults.
- Check `testsprite_tests/venv/` for Playwright Python dependencies if working in the E2E suite.

## Collaboration Checklist
- [ ] **Analyze Symbols**: Use `analyzeSymbols` on the target service to identify all public methods needing coverage.
- [ ] **Identify Edge Cases**: Specifically check for null/undefined handling in vacation calculations and timeout scenarios in API calls.
- [ ] **Mock Dependencies**: Identify all imported services/libs that need to be mocked using `vi.mock` or equivalent.
- [ ] **Verify Assertions**: Ensure tests check not just for success, but for specific data shapes and error codes.
- [ ] **Local Execution**: Confirm tests pass locally before proposing changes.

## Hand-off Notes
When testing `VacationRulesCalculator`, note that `EmployeeData` and `VacationCalculationResult` are the primary data contracts. The circuit breaker metrics (`CircuitBreakerMetrics`) are useful for asserting internal state changes during resilience tests. Existing tests in `src/config/__tests__` provide a good baseline for setup/teardown patterns.
