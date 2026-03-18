# Security and Compliance Documentation

This document outlines the security architecture, data protection policies, and compliance frameworks implemented within the application. The system is built with a "security-first" mindset, ensuring that employee data and organizational configurations are protected through multi-layered defense mechanisms.

## Key Security Principles

- **Principle of Least Privilege (PoLP):** Users and services are granted only the minimum permissions necessary to perform their functions.
- **Defense in Depth:** Security controls are implemented at the application, database, and infrastructure layers.
- **Data Integrity:** Strict validation of all incoming data to prevent injection attacks and ensure business logic consistency.
- **Privacy by Design:** Features are designed to minimize the exposure of Personally Identifiable Information (PII).

## Authentication & Authorization

The application utilizes **Supabase Auth** as its primary identity provider, leveraging industry-standard protocols for secure session management.

### Identity Management

- **Provider:** Supabase (GoTrue) handles user registration, password hashing, and multi-factor authentication (MFA) capabilities.
- **Token Format:** Authentication is stateful on the client-side via JSON Web Tokens (JWT). The `access_token` is used for API requests, while the `refresh_token` allows for session continuity.
- **Session Strategy:** Sessions are managed via the `AuthStateManager` and `AuthPersistence` utilities. Tokens are securely stored in persistent storage with automatic refresh logic to prevent session expiration during active use.

### Role-Based Access Control (RBAC)

Authorization is enforced through a granular role and permission model defined in `src/types/permissions.ts` and managed via the `roles.ts` utility.

- **Roles:** Defined roles include `Admin`, `Manager`, and `Employee`.
- **Permissions:** Each role maps to a set of `Permission` constants that control access to UI components (e.g., `AdminDashboardPage`) and backend RPC functions.
- **Server-Side Security:** Row Level Security (RLS) policies are active on all Supabase tables, ensuring that users can only read or modify data they are explicitly permitted to access based on their `auth.uid()`.

## Secrets & Sensitive Data

Protection of sensitive information is handled through environment-level isolation and secure storage practices.

### Storage & Management

- **Environment Variables:** Non-sensitive configuration (like Supabase URLs) is managed via `.env` files and accessed through the `ImportMetaEnv` interface.
- **Application Secrets:** Sensitive keys (e.g., API keys for DeepL or Google Translate) are never committed to the repository. They are stored in the Supabase Vault or as encrypted environment variables in the CI/CD pipeline.
- **Client-Side Safety:** No administrative "Service Role" keys are ever exposed to the client-side code. The frontend only uses the `anon_key`, relying on RLS for data protection.

### Encryption & Data Classification

- **Encryption at Rest:** All database data is encrypted at rest by the cloud provider.
- **Encryption in Transit:** All communication between the client, backend, and third-party providers (DeepL, Azure) is forced over TLS 1.2+.
- **Data Classification:**
    - **Tier 1 (Critical):** Passwords, Auth Tokens, and PII.
    - **Tier 2 (Sensitive):** Vacation schedules, employee contracts, and internal logs.
    - **Tier 3 (Public/Internal):** Regional holidays and public UI assets.

## Compliance & Policies

The system is designed to meet rigorous data protection standards, specifically catering to European and Swiss regulatory requirements.

- **GDPR (General Data Protection Regulation):** Implements "Right to be Forgotten" via automated deletion scripts (`apply_delete_policy.ts`). Provides data portability through export tools managed by the `PrivacyPolicyService`. Features a dedicated `DataSubjectRights` module for handling user requests.
- **Swiss Data Protection (FADP):** Compliance is maintained through regional data residency options and specific canton-level data handling logic in the `RegionHelper`.
- **Audit Logging:** The `AuditService` records critical actions (e.g., permission changes, data exports) including `AuditAction`, `ResourceType`, and `AuditSeverity`.
- **Privacy Policy Management:** The `privacyPolicyService.ts` tracks versioned acceptance of terms using the `AcceptanceMethod` enum.

## Incident Response

In the event of a security anomaly or system failure, the following protocols are in place:

### Detection & Monitoring

- **Performance & Error Tracking:** Real-time monitoring via `SupabasePerformanceMonitor` and `PerformanceAnalytics` detects anomalous traffic patterns or high failure rates.
- **Circuit Breakers:** The `CircuitBreakerManager` automatically trips to protect downstream services if an API or database starts failing, preventing cascading failures.
- **Network Monitoring:** `NetworkMonitoringService` tracks connection stability and potential interception attempts.

### Triage & Analysis

- **Logging:** Centralized logs are categorized by `LogLevel` (Info, Warning, Error, Critical) for rapid post-incident analysis.
- **On-Call:** Developers and system administrators are alerted via automated triggers when "Critical" severity events are logged.
- **Recovery:** Database point-in-time recovery (PITR) is enabled to restore state in case of data corruption or successful breach.

## Related Resources

- [Architecture Document](./architecture.md) - For details on how security layers integrate with the overall system structure.
- [Permissions Definitions](../src/types/permissions.ts) - Definition of the RBAC matrix.
- [Supabase Client](../src/utils/supabaseClient.ts) - Secure client initialization and credential validation.
