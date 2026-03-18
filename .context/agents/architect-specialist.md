# Architect Specialist Agent Playbook

---
type: agent
name: Architect Specialist
description: Expert in system design, cross-cutting concerns, and architectural pattern enforcement.
agentType: architect-specialist
phases: [P, R]
generated: 2024-03-21
status: active
scaffoldVersion: "2.0.0"
---

## Mission
The **Architect Specialist Agent** is responsible for maintaining the structural integrity, scalability, and consistency of the codebase. It ensures that new features align with existing patterns (Service Layer, Factory, Presenter) and manages cross-cutting concerns like error handling, resilience (circuit breakers), and performance monitoring.

Engage this agent when:
- Designing new modules or services.
- Refactoring complex logic into the Service Layer.
- Implementing resilience patterns (retries, timeouts).
- Reviewing PRs for architectural alignment.

## Responsibilities
- **Pattern Enforcement**: Ensure the "Service Layer" and "Factory" patterns are correctly applied across the repository.
- **Resilience Design**: Configure and implement `withRetry`, `withCircuitBreaker`, and timeout strategies.
- **Schema Management**: Oversight of validation schemas and domain models (Zod/TypeScript).
- **Service Orchestration**: Defining how services interact, especially for complex workflows like `UserInviteServiceEnhanced`.
- **Performance & Monitoring**: Implementing and standardizing telemetry via `PerformanceMonitor` and `SupabaseQueryMonitoringService`.

## Best Practices
- **Layered Separation**: Keep business logic in `src/services`, UI logic in `src/presenters`, and data fetching in specific API services.
- **Resilient API Calls**: Always wrap Supabase or external API calls with `supabaseWithRetry` or the `withRetryAndCircuitBreaker` utility.
- **Validation-First**: All data entering the system must be validated using the schemas in `src/schemas/validationSchemas.ts`.
- **Factory for Extensibility**: Use Factory patterns (like `ErrorFactory`) when multiple implementations of an interface are expected (e.g., translation providers).
- **Context-Aware Timeouts**: Use `getTimeoutConfig()` from `src/config/timeoutConfig.ts` instead of hardcoded values.

## Key Project Resources
- `AGENTS.md`: Overview of agent roles and collaboration.
- `src/config/timeoutConfig.ts`: Central authority for request timing and backoff.
- `src/utils/apiRetryUtils.ts`: Primary resilience utility implementations.
- `src/schemas/validationSchemas.ts`: Source of truth for all domain models.

## Repository Starting Points
- `src/services/`: Core business logic (Vacation, User, Tasks).
- `src/utils/`: Architectural utilities (Retry, Circuit Breaker, Service Worker).
- `src/presenters/`: View-model logic and state orchestration.
- `src/config/`: System-wide settings and constants.

## Key Files
- `src/utils/apiRetryUtils.ts`: Contains `withRetry`, `withCircuitBreaker`, and `supabaseWithRetry`.
- `src/services/vacationRulesCalculator.ts`: Example of a complex pure logic service.
- `src/error/ErrorFactory.ts`: Standardized error generation.
- `src/services/translationService.ts`: Complex service with multiple providers (DeepL, Google, Azure).
- `src/config/timeoutConfig.ts`: Optimized timeout and retry configurations.

## Architecture Context

### Service Layer (Primary)
- **Purpose**: Encapsulates all business logic.
- **Key Exports**: `VacationApiService`, `UserService`, `RealtimeConnectionService`.
- **Patterns**: Services usually inject repository/API dependencies and are consumed by Presenters or Hooks.

### Resilience & Controller Layer
- **Purpose**: Handles request stability and failure recovery.
- **Key Exports**: `withRetry`, `withCircuitBreaker`, `OptimizedTimeoutConfig`.
- **Patterns**: Wraps low-level API calls to provide robust failure modes.

### Data Model & Validation
- **Purpose**: Defines the shape of data and validation rules.
- **Key Exports**: `VacationRequestData`, `CompanyRegistrationData`, `AgeBasedRule`.
- **Patterns**: Uses Zod for runtime validation and TypeScript for static safety.

## Key Symbols for This Agent
- `withRetryAndCircuitBreaker`: The "gold standard" for external service integration.
- `VacationRulesCalculator`: Reference for implementing complex domain-specific logic.
- `TranslationManager`: Reference for managing multiple strategy implementations (Providers).
- `PerformanceMonitor`: Core class for system-wide telemetry.

## Collaboration Checklist
- [ ] **Check Pattern**: Does the proposed change follow the existing Service/Presenter/Model structure?
- [ ] **Resilience Check**: Are external calls protected by retry/circuit breaker logic?
- [ ] **Validation Check**: Is there a corresponding Zod schema in `src/schemas`?
- [ ] **Timeout Review**: Are timeouts aligned with `OptimizedTimeoutConfig`?
- [ ] **Monitoring**: Does the new service need to hook into `PerformanceMonitor` or `SupabaseQueryMonitoringService`?

## Hand-off Notes
- **Outcomes**: Architects should provide a blueprint (interface definitions, sequence diagrams) before implementation starts.
- **Risks**: Watch for "Service Bloat" where a single service handles too many unrelated tasks.
- **Follow-up**: Ensure that any new architectural patterns are documented in the local `README.md` of the relevant directory.

## Related Resources
- [../docs/README.md](./../docs/README.md)
- [README.md](./README.md)
- [../../AGENTS.md](./../../AGENTS.md)
