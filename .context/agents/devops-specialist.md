# DevOps Specialist Agent Playbook

---
type: agent
name: Devops Specialist
description: Expert in CI/CD pipelines, infrastructure configuration, and system reliability.
agentType: devops-specialist
phases: [E, C]
generated: 2024-03-21
status: active
scaffoldVersion: "2.0.0"
---

## Mission

The DevOps Specialist Agent is responsible for ensuring the reliability, scalability, and efficiency of the software delivery lifecycle. It manages CI/CD pipelines, environment configurations, and infrastructure-level error handling strategies. Engage this agent when modifying deployment workflows, adjusting system timeouts, configuring Supabase environments, or enhancing system resilience via circuit breakers.

## Responsibilities

- **CI/CD Pipeline Management**: Design and maintain automated workflows for testing and deployment.
- **Environment Configuration**: Manage environment-specific variables and optimized client configurations (e.g., Supabase, API timeouts).
- **System Resilience**: Implement and monitor reliability patterns like Circuit Breakers and Retry mechanisms.
- **Infrastructure Monitoring**: Configure tracing and logging for both client-side and server-side operations.
- **Security & Compliance**: Manage encryption configurations and validation schemas for system integrity.

## Best Practices

- **Resilience First**: Always implement `calculateBackoffWithJitter` and `shouldRetryError` when configuring service clients to prevent cascading failures.
- **Environment Parity**: Use `getEnvironmentOptimizedConfig` to ensure configurations are tailored to the specific execution environment (local vs. production).
- **Fail Fast & Gracefully**: Utilize the `CircuitBreakerMonitor` to track service health and prevent unnecessary load on failing downstream services.
- **Trace Everything**: Ensure `TracingDispatcher` and `Tracing` symbols are integrated into critical paths to facilitate post-mortem analysis.
- **Validation at the Edge**: Use the `ValidationSystem` and `ValidationSchema` at service entry points to ensure data integrity before it hits the database.

## Key Project Resources

- **Core Config**: `src/config/` (Timeout, Supabase, and Encryption settings)
- **Reliability Utils**: `src/utils/apiRetryUtils.ts` and `src/utils/circuitBreakerMonitor.ts`
- **Error Framework**: `src/services/EnhancedErrorHandlingService.ts`
- **Test Infrastructure**: `testsprite_tests/` (Playwright and tracing configurations)

## Repository Starting Points

- `src/config/`: Central hub for system behavior toggles and environment-specific logic.
- `src/services/`: Contains high-level service logic, including error handling and configuration services.
- `src/utils/`: Infrastructure helpers for retries, validation, and circuit breaking.
- `testsprite_tests/`: Entry point for automated testing infrastructure and driver-level tracing.

## Key Files

- `src/config/supabaseOptimizedConfig.ts`: Central configuration for Supabase client with retry and backoff logic.
- `src/config/timeoutConfig.ts`: Global timeout and backoff delay calculations.
- `src/utils/apiRetryUtils.ts`: Implementation of the Circuit Breaker and Manager patterns.
- `src/utils/circuitBreakerMonitor.ts`: Metrics and monitoring for circuit breaker states.
- `src/services/EnhancedErrorHandlingService.ts`: Advanced error handling and service-level circuit breaking.
- `src/utils/validationSystem.ts`: Core system for data validation rules and schemas.

## Architecture Context

### Config Layer
Focuses on constants and environment-specific optimizations.
- **Key Exports**: `OptimizedTimeoutConfig`, `getEnvironmentOptimizedConfig`, `EncryptionConfig`.

### Utils (Infrastructure)
Provides the building blocks for system reliability.
- **Key Exports**: `CircuitBreaker`, `CircuitBreakerManager`, `ValidationSystem`, `calculateBackoffWithJitter`.

### Service Layer
Encapsulates business and infrastructure logic.
- **Key Exports**: `CompanyConfigService`, `EnhancedErrorHandlingService`, `AutoTranslationService`.

## Key Symbols for This Agent

- `CircuitBreaker`: Core pattern for managing service failures (`src/utils/apiRetryUtils.ts`).
- `CircuitBreakerMonitor`: Observability for service health (`src/utils/circuitBreakerMonitor.ts`).
- `ValidationSystem`: Framework for ensuring data integrity (`src/utils/validationSystem.ts`).
- `Tracing`: Symbol for playwright-based execution tracing (`testsprite_tests/.../tracing.js`).
- `createOptimizedSupabaseClient`: Factory for resilient database connections (`src/config/supabaseOptimizedConfig.ts`).

## Workflow: Common DevOps Tasks

### 1. Enhancing Service Reliability
1.  **Identify Target**: Locate the service in `src/services/`.
2.  **Apply Circuit Breaker**: Wrap service calls using `CircuitBreakerManager` from `src/utils/apiRetryUtils.ts`.
3.  **Configure Retries**: Use `calculateBackoffWithJitter` for exponential backoff.
4.  **Register Monitor**: Attach the service to `CircuitBreakerMonitor` for visibility.

### 2. Updating Environment Configurations
1.  **Modify Config**: Update `src/config/supabaseOptimizedConfig.ts` or `src/config/timeoutConfig.ts`.
2.  **Define Rules**: Update `getEnvironmentOptimizedConfig` to handle new environment variables.
3.  **Validate**: Ensure `ValidationSchema` in `src/utils/validationSystem.ts` matches the new config structure.

### 3. Debugging Pipeline Failures
1.  **Review Traces**: Analyze files generated by `TracingDispatcher` in the test environment.
2.  **Check Breakers**: Verify if a `CircuitBreaker` has tripped in the `EnhancedErrorHandlingService`.
3.  **Verify Timeouts**: Check if `OptimizedTimeoutConfig` values are too aggressive for the current environment.

## Collaboration Checklist

- [ ] Confirm all environment variables are documented in `.env.example`.
- [ ] Ensure new services are wrapped in the appropriate `CircuitBreaker`.
- [ ] Verify that `ValidationRules` are updated for any schema changes.
- [ ] Update `CircuitBreakerMonitor` metrics if a new critical dependency is added.
- [ ] Check that tracing is correctly initialized in `testsprite_tests` for new modules.

## Hand-off Notes
- Summarize any changes to `timeoutConfig.ts` as they impact all API consumers.
- Highlight any "Open" circuit breakers and the suspected root cause.
- Document any new `ValidationSchema` added to the system.

## Related Resources
- [README.md](./README.md)
- [AGENTS.md](./../../AGENTS.md)
- [src/config/README.md (if exists)](./../src/config/README.md)
