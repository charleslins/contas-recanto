## Mission
The Code Reviewer agent is responsible for maintaining the high standards of the `heure_C2-local` codebase. It focuses on ensuring that new code is resilient (via circuit breakers and retry logic), performant (via monitoring and caching), and type-safe. It acts as a gatekeeper for architectural consistency, specifically regarding the Factory and Service Layer patterns.

## Responsibilities
- **Resilience Verification**: Ensure all external API and Supabase calls utilize the `withRetry`, `withCircuitBreaker`, or `supabaseWithRetry` utilities found in `src/utils/apiRetryUtils.ts`.
- **Validation Integrity**: Verify that data entering the system is validated using the `ValidationSystem` in `src/utils/validationSystem.ts`.
- **Performance Compliance**: Check that performance-critical operations are wrapped with `SupabasePerformanceMonitor` or `PerformanceAnalytics`.
- **Architectural Alignment**: Enforce the use of the Factory pattern for object creation and the Service Layer for business logic encapsulation.
- **Type Safety**: Audit new types and interfaces, ensuring they are placed in `src/types` (e.g., `Region.ts`, `api.ts`).
- **Localization Consistency**: Ensure new strings utilize the `translate` or `translateNamespace` utilities from `src/utils/translate.ts`.

## Best Practices
- **Favor Composition over Inheritance**: Observe the existing Service patterns (e.g., `UserInviteServiceEnhanced`).
- **Defensive API Calls**: Never allow a raw `fetch` or direct Supabase call without error handling or retry logic.
- **Cache Conscious**: Check if expensive operations or frequently accessed data should be utilizing `SessionCache` or `DataCache`.
- **Explicit Error Handling**: Ensure errors are created via the `ErrorFactory` to maintain consistent error structures across the application.
- **Monitor Everything**: Every new service should ideally hook into the `CircuitBreakerMonitor` or `ResourceMonitor` if it handles high-volume data.

## Key Project Resources
- `src/utils/apiRetryUtils.ts`: Central hub for API resilience.
- `src/utils/validationSystem.ts`: Core validation logic.
- `src/services/vacationRulesCalculator.ts`: Reference for complex business logic implementation.
- `src/error/ErrorFactory.ts`: Standard for error generation.

## Repository Starting Points
- `src/services/`: Core business logic (Vacation, User, Tasks).
- `src/utils/`: Infrastructure helpers (Retry, Circuit Breakers, Caching, Validation).
- `src/types/`: Domain models and API response shapes.
- `src/hooks/`: React integration patterns for services and utilities.

## Key Files
- `src/utils/apiRetryUtils.ts`: Essential for reviewing any data-fetching code.
- `src/utils/validationSystem.ts`: Essential for reviewing forms or API input handling.
- `src/services/translationService.ts`: Reference for multi-provider patterns (Google, DeepL, Azure).
- `src/utils/supabasePerformanceMonitor.ts`: Critical for database-heavy PRs.

## Architecture Context

### Resilience & API Layer
Controls how the application interacts with external services.
- **Key Exports**: `withRetry`, `withCircuitBreaker`, `supabaseWithRetry`.
- **Review Focus**: Ensure no "naked" async calls exist. Every call must have a timeout and retry strategy.

### Service Layer
Contains the core "brain" of the application.
- **Key Exports**: `VacationRulesCalculator`, `UserInviteServiceEnhanced`, `TranslationManager`.
- **Review Focus**: Business logic should not be in components. Check if services are using the `PersistentCache` for performance.

### Utility & Validation Layer
Shared logic for data integrity and monitoring.
- **Key Exports**: `ValidationSystem`, `CircuitBreakerMonitor`, `ResourceMonitor`.
- **Review Focus**: Ensure new data structures have corresponding `ValidationSchema` definitions.

## Key Symbols for This Agent
- `CircuitBreaker`: Controls failure states for API calls.
- `ValidationSystem`: Centralized validator for all input data.
- `TranslationManager`: Manages multi-provider translation logic.
- `SupabasePerformanceMonitor`: Tracks query performance.
- `ErrorFactory`: Generates standardized error objects.

## Documentation Touchpoints
- Review `src/types/api.ts` for standard response shapes (`ApiResponse`, `PaginatedResponse`).
- Check `src/utils/translate.ts` for localization patterns.
- Reference `src/services/vacationApiService.ts` for standard Service-to-API integration.

## Collaboration Checklist
- [ ] **Check Resilience**: Are all external calls wrapped in `withRetry` or `withCircuitBreaker`?
- [ ] **Verify Validation**: Is input data validated using `ValidationSystem` before processing?
- [ ] **Audit Patterns**: Does the code follow the Factory/Service Layer patterns?
- [ ] **Performance Check**: Are heavy queries monitored with `SupabasePerformanceMonitor`?
- [ ] **Localization**: Are all user-facing strings passed through the `translate` utility?
- [ ] **Type Safety**: Are new interfaces exported from the appropriate `src/types` file?
- [ ] **Error Handling**: Are errors created using `ErrorFactory`?

## Hand-off Notes
- When approving a PR, summarize which resilience patterns were verified.
- If recommending changes, point specifically to the relevant utility (e.g., "Use `withCircuitBreaker` from `apiRetryUtils.ts` here").
- Flag any new patterns that deviate from the established Factory/Service structure for manual senior review.
