# Bug-Fixer Agent Playbook

---
type: agent
name: Bug Fixer
description: Specialized agent for diagnosing, reproducing, and resolving issues within the heure_C2-local codebase.
agentType: bug-fixer
phases: [E, V]
generated: 2024-05-22
status: active
scaffoldVersion: "2.0.0"
---

## Mission
The Bug-Fixer agent is designed to accelerate the resolution of technical issues by providing a systematic approach to error diagnosis, root cause analysis, and implementation of robust fixes. It should be engaged when there are reported regressions, API failures, UI inconsistencies, or validation errors.

## Responsibilities
- **Error Analysis**: Interpret stack traces and logs using the `UnifiedErrorLogger` and `ErrorFactory` context.
- **Root Cause Identification**: Trace bugs across the frontend (React/Hooks) and backend services.
- **Regression Testing**: Identify or create test cases to ensure bugs do not resurface.
- **Resilience Implementation**: Apply patterns like Circuit Breakers and Retries to prevent cascading failures.
- **Validation Correction**: Fix schema mismatches in `src/schemas/validationSchemas.ts` or `src/utils/validationSystem.ts`.

## Bug-Fixer Workflow

### 1. Diagnosis & Triage
- **Analyze the Stack**: Identify if the error is a `WebError`, `ProtocolError`, or a custom application error via `src/error/ErrorFactory.ts`.
- **Trace the Origin**: Use `src/services/ErrorHandlingService.ts` to understand how the error was captured and reported.
- **Check Network State**: For API issues, investigate `src/utils/apiRetryUtils.ts` to see if retry logic or circuit breakers are being triggered.

### 2. Reproduction
- Locate relevant tests in `src/services/__tests__`.
- If no test exists, create a minimal reproduction script using existing patterns in the `testsprite_tests` or local `__tests__` directories.

### 3. Implementation of Fix
- **UI/Frontend**: Check `src/components/ApiErrorBoundary.tsx` or `src/components/NetworkErrorBoundary.tsx` if the issue is related to error display.
- **Logic/Services**: Modify business logic in `src/services/` (e.g., `VacationApiService`, `UserService`).
- **Data/Validation**: Update schemas in `src/schemas/validationSchemas.ts` if the bug is due to invalid data being rejected or accepted incorrectly.

### 4. Verification
- Run existing test suites.
- Verify that the `EnhancedErrorHandlingService` correctly logs the resolution or no longer captures the error.

## Best Practices
- **Use the Error Factory**: Always use `ErrorFactory` for creating new error types to maintain consistency across the codebase.
- **Leverage Circuit Breakers**: If a bug is caused by an unstable downstream service, wrap the call using `withCircuitBreaker` from `src/utils/apiRetryUtils.ts`.
- **Maintain Translation Integrity**: When fixing validation messages, ensure they are compatible with the `translate` utility in `src/utils/translate.ts`.
- **Defensive Programming**: Utilize the `ValidationSystem` in `src/utils/validationSystem.ts` to harden inputs before they reach the service layer.

## Key Project Resources
- **Error Handling Guide**: See `src/services/EnhancedErrorHandlingService.ts` for implementation details.
- **API Documentation**: Refer to `src/types/api.ts` for standard response formats (`ApiResponse`, `ApiError`).
- **Validation Rules**: Refer to `src/utils/validationSystem.ts` for the core validation engine.

## Repository Starting Points
- `src/error/`: Centralized error definitions and logging.
- `src/services/`: Core business logic where most functional bugs reside.
- `src/utils/`: Infrastructure helpers (API retries, validation, translations).
- `src/components/`: UI error boundaries and common components.

## Key Files & Purposes
- `src/error/ErrorFactory.ts`: The source of truth for all application-level errors.
- `src/utils/apiRetryUtils.ts`: Governs how the application handles transient network failures.
- `src/services/ErrorHandlingService.ts`: Orchestrates error reporting and side effects.
- `src/schemas/validationSchemas.ts`: Defines the shape of data for login, registration, and vacation requests.
- `src/components/ApiErrorBoundary.tsx`: The primary safety net for API-related UI failures.

## Architecture Context
- **Service Layer**: Encapsulates logic (e.g., `VacationRulesCalculator`). Errors here usually involve business rule violations.
- **Utility Layer**: Provides cross-cutting concerns like `ValidationSystem`. Errors here usually involve data integrity.
- **Component Layer**: Uses `ErrorBoundaries` to prevent app crashes. Errors here are often related to state management or prop mismatches.

## Key Symbols
- `ErrorFactory`: Factory for creating standardized error objects.
- `withRetryAndCircuitBreaker`: Wrapper for resilient API calls.
- `ValidationSystem`: Core class for executing complex data validation.
- `UnifiedErrorLogger`: Centralized utility for logging errors to external or internal monitors.

## Collaboration Checklist
- [ ] Have you checked the `UnifiedErrorLogger` for the specific error trace?
- [ ] Does the fix require an update to `validationSchemas.ts`?
- [ ] If the fix is in a service, have you added a unit test in the corresponding `__tests__` directory?
- [ ] Does this fix require a new translation key in `src/utils/translate.ts`?
- [ ] Have you verified that the `CircuitBreaker` state is correctly handled after the fix?

## Related Resources
- [README.md](../../README.md)
- [AGENTS.md](../../AGENTS.md)
- [src/types/api.ts](../types/api.ts)
