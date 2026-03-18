# Feature Developer Agent Playbook - Heure C2

This playbook provides the specific workflows, architectural patterns, and best practices for developing new features within the Heure C2 repository.

## 1. Role Overview
The **Feature Developer Agent** is responsible for implementing end-to-end features, from data validation schemas and service-layer business logic to UI components. The agent must strictly adhere to the project's established "Service Layer" and "Factory" patterns.

## 2. Core Focus Areas
When implementing a feature, focus on these directory structures:
- **Business Logic**: `src/services/` (The primary location for feature logic)
- **Data Models & Validation**: `src/schemas/validationSchemas.ts` and `src/models/`
- **API Integration**: `src/types/api.ts` and `src/utils/apiRetryUtils.ts`
- **UI Components**: `src/components/` (Task-specific) and `src/components/ui/` (Shared)
- **Internationalization**: `src/services/translationService.ts` and `src/utils/autoTranslation.ts`

## 3. Standard Feature Workflow

### Step 1: Schema & Type Definition
Always start by defining the data structure.
- **Action**: Add new validation schemas to `src/schemas/validationSchemas.ts`.
- **Pattern**: Use the existing exported types like `VacationRequestData` or `UserFormData` as templates.
- **Validation**: Ensure all new forms have a corresponding Zod schema for runtime validation.

### Step 2: Service Layer Implementation
Heure C2 relies heavily on a decoupled Service Layer.
- **Logic**: Create or update a service in `src/services/` (e.g., `NewFeatureService.ts`).
- **Data Fetching**: If the feature requires external API calls, use the `ApiService` pattern (e.g., `VacationApiService`).
- **Resiliency**: Wrap all external service calls with the `withRetryAndCircuitBreaker` utility from `src/utils/apiRetryUtils.ts`.
- **Pattern**: Follow the `VacationRulesCalculator` pattern for complex calculations and `UserService` for CRUD operations.

### Step 3: UI Component Development
- **Consistency**: Use components from `src/components/ui` or `src/design-system/components`.
- **Feature Components**: Place feature-specific UI in appropriate sub-directories:
  - Task management -> `src/components/taskmaster/`
  - Vacation/Leave -> `src/components/vacation_config/`
  - Admin tools -> `src/components/admin/`
- **Props**: Use typed interfaces for all props (e.g., `TaskCardProps`).

### Step 4: Integration & Monitoring
- **Real-time**: If the feature requires live updates, integrate with `src/services/realtimeConnectionService.ts`.
- **Performance**: Register critical actions with `PerformanceMonitor` in `src/services/performanceMonitoring.ts`.
- **Offline Support**: If applicable, ensure data is handled by `src/services/offlineDataService.ts`.

## 4. Key Code Patterns & Conventions

### Service Layer Pattern
Most business logic is encapsulated in classes. 
- **Example**: `VacationRulesCalculator` handles logic, while `VacationApiService` handles the I/O. 
- **Guideline**: Do not put complex business logic directly in React components.

### Resilient API Calls
The codebase uses a circuit breaker and retry mechanism.
```typescript
// Pattern to follow
import { withRetryAndCircuitBreaker } from '@/utils/apiRetryUtils';

const result = await withRetryAndCircuitBreaker(
  () => supabase.from('table').select('*'),
  'operation-name'
);
```

### Factory Pattern for Errors
Use `ErrorFactory` to maintain consistent error structures across the application.
- Location: `src/error/ErrorFactory.ts`

### Internationalization (i18n)
All user-facing strings should be processed through the translation system.
- Use `TranslationManager` from `src/services/translationService.ts`.
- For automated translations, refer to `AutoTranslationService`.

## 5. Key Files for Reference

| File | Purpose |
| :--- | :--- |
| `src/schemas/validationSchemas.ts` | Central repository for all Zod validation schemas. |
| `src/utils/apiRetryUtils.ts` | Utilities for resilient API communication. |
| `src/services/userService.ts` | Template for user-related business logic. |
| `src/services/vacationRulesCalculator.ts` | Reference for complex domain logic implementation. |
| `src/types/api.ts` | Standardized API response and error types. |
| `src/services/notificationService.ts` | System for handling user notifications and alerts. |

## 6. Best Practices
1. **Error Handling**: Always use the `ErrorHandler` observer pattern defined in `src/types/error-handling.ts`.
2. **Monitoring**: Features that involve Supabase queries should be registered with `SupabaseQueryMonitoringService`.
3. **Type Safety**: Avoid using `any`. Leverage the robust typing in `src/types/` and the auto-generated types for Supabase.
4. **Modularity**: If a feature logic grows beyond 500 lines, split it into sub-services (e.g., `InviteService` vs `InviteEmailService`).
5. **Privacy**: If handling user data, consult `src/services/privacyPolicyService.ts` and ensure `GdprAuditService` requirements are met.
