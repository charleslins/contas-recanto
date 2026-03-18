# Backend Specialist Agent Playbook

## Mission
The Backend Specialist agent is responsible for the integrity, scalability, and resiliency of the application's business logic and data persistence layers. In this Supabase-centric architecture, the backend specialist focuses on service-layer orchestration, database type safety, complex calculations (e.g., vacation rules), and external API integration.

## Responsibilities
- **Service Orchestration**: Implementing complex business logic within the `src/services` directory.
- **Data Modeling**: Maintaining and extending the database schema definitions in `src/types/database.ts`.
- **Validation Logic**: Developing robust data validation schemas in `src/schemas/validationSchemas.ts`.
- **API Resiliency**: Implementing retry logic and circuit breakers for external service dependencies.
- **Performance & Monitoring**: Integrating performance tracking and query monitoring.
- **Offline Sync**: Managing data persistence and synchronization strategies for offline capabilities.

## Repository Starting Points
- `src/services/`: Core business logic (Vacation rules, User management, Notifications).
- `src/types/database.ts`: Source of truth for database entities and types.
- `src/schemas/`: Zod/Validation schemas for data entry and API requests.
- `src/utils/apiRetryUtils.ts`: Resiliency patterns (Circuit Breaker, Retries).
- `src/utils/autoTranslation.ts`: Translation logic and provider management.

## Key Project Resources
- **Supabase Integration**: Primary data and auth provider.
- **Service Layer Pattern**: Heavy use of class-based services for modularity.
- **Resiliency Framework**: Built-in Circuit Breaker and Retry utilities.

## Standard Workflows

### 1. Implementing a New Business Service
1. **Define Types**: Add necessary interfaces to `src/types/database.ts` or a service-specific type file.
2. **Create Schema**: Add validation logic in `src/schemas/validationSchemas.ts`.
3. **Scaffold Service**: Create `src/services/[Name]Service.ts`.
4. **Apply Resiliency**: Wrap external or database calls with `supabaseWithRetry` or `withCircuitBreaker` from `apiRetryUtils.ts`.
5. **Add Monitoring**: Integrate with `PerformanceMonitor` or `SupabaseQueryMonitoringService` if performance is critical.

### 2. Updating Database Schema
1. **Modify Database Types**: Update `UserRow`, `DailyLogEntry`, or relevant interfaces in `src/types/database.ts`.
2. **Update Service Methods**: Align `UserService`, `TaskApiService`, etc., with the new schema.
3. **Adjust Validations**: Update corresponding schemas in `validationSchemas.ts`.
4. **Verify Calculations**: If affecting hours/vacation, update `VacationRulesCalculator`.

### 3. Integrating External APIs
1. **Choose Provider**: Implement using the provider pattern (see `TranslationManager` in `translationService.ts`).
2. **Implement Resiliency**: Use `CircuitBreaker` to prevent cascading failures.
3. **Add Throttling**: Use `RequestThrottleService` to respect provider rate limits.

## Best Practices

### Resiliency & Error Handling
- **Never direct-call Supabase for critical writes**: Always wrap in `supabaseWithRetry` to handle transient network issues.
- **Circuit Breakers**: Apply `withCircuitBreaker` to all third-party integrations (Translation, Geolocation).
- **Graceful Degradation**: Provide fallback mocks (see `MockTranslationProvider`) for development or service outages.

### Performance
- **Query Monitoring**: Use `SupabaseQueryMonitoringService` to log slow queries.
- **Batching**: Use `OfflineDataService` patterns for batching updates when possible.
- **Caching**: Utilize `PersistentCache` for expensive lookups like translations.

### Data Integrity
- **Zod Validation**: Validate all incoming data using schemas in `src/schemas/validationSchemas.ts` before processing.
- **Calculations**: Use dedicated calculator classes (e.g., `VacationRulesCalculator`) for complex logic to ensure testability.

## Key Files & Symbols

### Core Services
- `src/services/userService.ts`: Primary user and profile management.
- `src/services/vacationRulesCalculator.ts`: The "engine" for vacation and contract calculations.
- `src/services/userInviteService.ts`: Workflow for user onboarding and activation.
- `src/services/notificationService.ts`: Centralized messaging and alerts.

### Resiliency & Utilities
- `src/utils/apiRetryUtils.ts`: `CircuitBreaker`, `withRetry`, `supabaseWithRetry`.
- `src/services/requestThrottleService.ts`: `RequestThrottleService` for rate limiting.
- `src/services/performanceMonitoring.ts`: `PerformanceMonitor` for telemetry.

### Data Models
- `UserRow`, `DailyLogEntry`, `TimeSegment` @ `src/types/database.ts`.
- `VacationCalculationResult` @ `src/services/vacationRulesCalculator.ts`.

## Collaboration Checklist
- [ ] **Type Consistency**: Does the new logic match the types in `database.ts`?
- [ ] **Resiliency Check**: Are external API calls wrapped in a Circuit Breaker?
- [ ] **Validation**: Is user input validated against a schema before service processing?
- [ ] **Performance**: Have you considered the impact of complex queries on the Supabase instance?
- [ ] **Documentation**: Are new service methods commented with JSDoc for frontend consumption?

## Related Resources
- [Service Layer Documentation](./../docs/architecture/services.md)
- [Database Schema Guide](./../docs/database/schema.md)
- [API Resiliency Patterns](./../docs/guides/resiliency.md)
