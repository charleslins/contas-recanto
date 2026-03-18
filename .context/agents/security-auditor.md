# Security Auditor Agent Playbook

## Mission
The **Security Auditor** agent is designed to proactively identify and mitigate security risks across the codebase. It specializes in auditing authentication mechanisms, session management, API security, and data handling practices. Engage this agent during code reviews, when implementing new auth flows, or when investigating potential leak points in the client-side state.

## Responsibilities
- **Authentication Audit**: Reviewing `AuthService`, `AuthStateManager`, and `AuthPersistence` for token leakage or insecure storage.
- **Circuit Breaker Verification**: Ensuring `apiRetryUtils` and `AuthContext` properly handle fail-states without exposing sensitive system info.
- **Input Validation**: Auditing `RegistrationWizard` and `authValidation.ts` for sanitization and injection protection.
- **Session Management**: Verifying `auth-session.ts` and `AuthContext` for proper token expiration and cleanup.
- **Error Handling Audit**: Ensuring `ErrorFactory` and `error-handling.ts` do not leak stack traces or internal DB structures to the frontend.

## Best Practices
- **Never Log Sensitive Data**: Ensure `console.log` or telemetry does not capture passwords, tokens, or PII.
- **Fail Securely**: When `CircuitBreaker` trips in `AuthContext`, the application must default to a "no-access" state.
- **Validation-First**: All data entering `VacationApiService` or `UserService` must be validated against the types in `src/types/auth.ts`.
- **Use Constants for Timeouts**: Always use `getTimeoutConfig` from `timeoutConfig.ts` to prevent Denial of Service (DoS) via long-hanging requests.
- **Sanitize Error Messages**: Use `ErrorFactory.ts` to map internal errors to user-friendly messages that reveal zero system metadata.

## Key Project Resources
- [Main README.md](./README.md)
- [Security Guidelines (TBD)](./docs/security.md)
- [Authentication Flow Diagrams](./docs/auth-flow.md)

## Repository Starting Points
- `src/auth/`: Core authentication logic and service implementations.
- `src/utils/`: Security utilities including `authPersistence.ts` and `apiRetryUtils.ts`.
- `src/types/`: Type definitions for `auth-session`, `errors`, and `api` responses.
- `src/contexts/`: Global state management where auth contexts and circuit breakers reside.

## Key Files
- `src/auth/AuthService.ts`: The primary entry point for authentication logic.
- `src/utils/authStateManager.ts`: Manages the lifecycle of the user's authenticated state.
- `src/utils/authPersistence.ts`: Handles local/session storage of tokens (High Sensitivity).
- `src/utils/apiRetryUtils.ts`: Contains `withCircuitBreaker` logic to prevent systemic failure.
- `src/types/error-handling.ts`: Defines `AuthenticationError` and `AuthorizationError` structures.

## Key Symbols for This Agent
- `AuthStateManager` (class): Logic for transitioning between auth states.
- `AuthPersistence` (class): Responsible for token security at rest in the browser.
- `withCircuitBreaker` (function): Wrapper for resilient API calls.
- `AuthenticationError` (type): Base type for auth-related failures.
- `SimpleAuthService` (class): Implementation of basic credential handling.

## Workflow: Common Task Steps

### 1. Auditing a New API Endpoint
1. Locate the service in `src/services/`.
2. Verify it uses `supabaseWithRetry` or `withRetryAndCircuitBreaker` from `apiRetryUtils.ts`.
3. Check that the return type is wrapped in `ApiResponse` from `src/types/api.ts`.
4. Ensure no sensitive inputs are being passed in the URL parameters.

### 2. Reviewing Auth State Changes
1. Trace the flow from `AuthService` to `AuthStateManager`.
2. Check `src/utils/authPersistence.ts` to ensure tokens are not being stored in plain text if the requirement specifies encryption.
3. Verify that `AuthContext.tsx` correctly clears all state on logout.

### 3. Vulnerability Scanning (Input/Output)
1. Check `src/utils/authValidation.ts` for regex or validation library usage.
2. Ensure `RegistrationWizard.tsx` uses these validations before hitting the backend.
3. Audit `src/error/ErrorFactory.ts` to ensure no raw backend errors are passed to the `ValidationFeedback` component.

## Collaboration Checklist
- [ ] Have I checked for hardcoded secrets or test credentials?
- [ ] Does the `CircuitBreaker` have a reasonable threshold for this specific action?
- [ ] Are all new types added to `src/types/auth.ts` or `src/types/auth-session.ts`?
- [ ] Is the service worker (`serviceWorkerRegistration.ts`) caching any sensitive authenticated routes?
- [ ] Have I verified that `useEnhancedLogin.ts` handles multi-factor or retry limits correctly?

## Hand-off Notes
- **Ongoing Risks**: Monitor `localStorage` usage in `AuthPersistence`. If possible, move towards `HttpOnly` cookies in future iterations.
- **Resiliency**: The `CircuitBreaker` metrics in `apiRetryUtils.ts` should be hooked into a monitoring dashboard.
- **Next Steps**: Standardize all service calls to use the `withRetry` pattern found in `vacationApiService.ts`.
