# Glossary & Domain Concepts

The project is a human resources and workforce management platform designed for managing employee vacations, work schedules, and regional compliance, specifically focused on Switzerland and its cantonal regulations. It utilizes a modern tech stack centered on React and Supabase, with specialized services for translation, performance monitoring, and GDPR compliance.

## Domain Entities

- **Employee/User:** Central entity representing a person within the system, associated with a company, role, and specific work contract.
- **Vacation Request:** A formal submission by an employee for time off, which follows specific regional rules (e.g., age-based entitlements) and requires approval.
- **Location (Canton/Municipality):** Hierarchical regional entities determining the applicable public holidays and labor laws for an employee.
- **Work Contract:** Definitions of weekly/daily hours establishing the baseline for vacation and attendance calculations.
- **Taskmaster:** An internal service for managing background tasks and automated processes.

## Type Definitions

- [User](src/types/types.ts): Extends `BaseUser` to include platform-specific metadata like roles and settings.
- [VacationDay](src/types/types.ts): Interface defining the properties of a single day in a vacation period.
- [Holiday](src/types/holidays.ts): Represents a public holiday, often specific to a `Canton` or `Municipality`.
- [Task](src/types/taskmaster.ts): Defines a unit of work within the Taskmaster system, including priority and status.
- [AppError](src/types/types.ts): Standardized error interface used across both frontend and backend services.
- [McpPendingRequestWithUser](src/supabase/types.ts): Interface for managing invitations and pending access requests.
- [DataSubjectRightType](src/types/dataSubjectRights.ts): Types for GDPR-related requests such as data export or deletion.
- [AnimatedElementProps](src/types/animations.ts): Common props for UI components utilizing the animation framework.

## Enumerations

- [VacationStatus](src/types/types.ts): States of a vacation request (e.g., Pending, Approved, Rejected).
- [EntryType](src/types/types.ts): Categorization for time log entries.
- [ErrorCategory](src/types/error-handling.ts): High-level categorization of errors (e.g., Network, Validation, Auth).
- [CircuitBreakerState](src/types/error-handling.ts): States for the API resiliency pattern (Open, Half-Open, Closed).
- [AuditAction](src/services/auditService.ts): Types of actions tracked in the GDPR audit logs (Create, Read, Update, Delete).
- [LogLevel](src/services/LoggingService.ts): Standardized logging levels (Debug, Info, Warn, Error).
- [ConnectionStatus](src/services/ConnectionFallbackService.ts): Real-time network state tracking (Online, Offline, Degraded).

## Core Terms

- **Circuit Breaker:** A pattern implemented in `apiRetryUtils.ts` to prevent the system from repeatedly trying an operation likely to fail, thus protecting external resources.
- **Canton/Municipality:** Regional administrative levels in Switzerland used by `LocationService.ts` to calculate local holiday offsets and legal requirements.
- **Smart Translation:** An automated localization system in `translationService.ts` that supports DeepL, Google, and Azure providers with quality evaluation.
- **Performance Monitor:** A specialized utility (`supabasePerformanceMonitor.ts`) that tracks the execution time and success rate of Supabase queries.
- **Registration Wizard:** A multi-step flow (`RegistrationWizard.tsx`) for onboarding new users or companies.
- **Taskmaster:** The subsystem responsible for background processing and file-based task persistence.

## Acronyms & Abbreviations

- **GDPR:** General Data Protection Regulation; managed by `GdprAuditService` and `DataRetentionService`.
- **MCP:** Multi-Channel/Context Platform (in the context of `McpDatabase`); refers to the core Supabase schema structure.
- **RPC:** Remote Procedure Call; used for Supabase database functions (e.g., `AcceptInviteRpcResponse`).
- **SW:** Service Worker; managed via `serviceWorkerRegistration.ts` for offline capabilities.
- **RLS:** Row Level Security; the security model employed in Supabase policies (see `apply_delete_policy.ts`).

## Personas / Actors

- **Administrator:** Manages company-wide settings, validates user invites, and oversees regional compliance configurations.
- **Manager:** Reviews and approves/rejects vacation requests and views team performance reports.
- **Employee:** Records work time, requests vacations, and manages personal profiles and privacy settings.
- **Guest/Invitee:** A user who has received an invitation but has not yet completed the registration wizard.

## Domain Rules & Invariants

- **Vacation Entitlement:** Calculated based on the `AgeBasedRule` within `VacationRulesConfig.ts`. Older employees or those with specific contract terms may receive additional days.
- **Regional Holidays:** An employee's holiday calendar is strictly determined by their assigned `Canton` and `Municipality`.
- **Data Retention:** GDPR rules enforced by `DataRetentionService.ts` ensure that personal data is anonymized or deleted after a specified period of inactivity.
- **Circuit Protection:** If an external API (like a translation provider) fails 5 consecutive times (default threshold), the Circuit Breaker will transition to "Open" state for 30 seconds.
- **Invite Integrity:** An invite is only valid if the email matches the recipient and the `expires_at` timestamp is in the future.

## Related Resources

- [Project Overview](./project-overview.md)
