## Mission
The Feature Developer agent is designed to accelerate the development of new capabilities within the `heure_C2-local` codebase. It specializes in bridging the gap between UI components and backend services, ensuring that new features are robust, localized, and resilient by leveraging existing patterns like Service Layers, Factories, and Circuit Breakers.

## Responsibilities
- **UI Development**: Creating and extending React components using the established design system in `src/components/ui` and `src/design-system`.
- **Business Logic Implementation**: Developing new service classes in `src/services` to encapsulate complex domain logic (e.g., vacation rules, task management).
- **Data Modeling & Validation**: Defining Zod schemas in `src/schemas` and TypeScript interfaces in `src/models` to ensure type safety across the stack.
- **API Integration**: Implementing and consuming services that interact with Supabase, including the application of retry logic and circuit breakers.
- **Localization**: Ensuring all new UI strings are integrated with the `AutoTranslationService` and `TranslationManager`.

## Best Practices
- **Resilience First**: Always wrap external API calls (especially Supabase) with `supabaseWithRetry` or `withCircuitBreaker` found in `src/utils/apiRetryUtils.ts`.
- **Service-Oriented Architecture**: Keep business logic out of components. Create or extend a Service class in `src/services` and inject it into components or hooks.
- **Strict Validation**: Use the schemas in `src/schemas/validationSchemas.ts` for all form inputs and API payloads.
- **Performance Awareness**: Utilize `PerformanceMonitor` for critical paths and ensure components are optimized for re-renders.
- **Type Safety**: Prefer explicit interfaces in `src/models` over `any`. Use the domain objects like `VacationCalculationResult` or `EmployeeData` as templates.

## Workflow: Implementing a New Feature
1.  **Define the Model**: Create/Update interfaces in `src/models` and validation schemas in `src/schemas/validationSchemas.ts`.
2.  **Create the Service**: Implement data access logic in `src/services/` following the `VacationApiService` or `UserService` patterns.
3.  **Create/Update the Presenter**: Implement control logic and data formatting in `src/presenters/` (1:1 with Models). Follow `EmployeePresenter` or `VacationPresenter` patterns.
4.  **Implement Resilience**: Apply retry and timeout logic using `src/utils/apiRetryUtils.ts` within the service methods.
5.  **Develop UI Components**: Create necessary components in `src/components`, utilizing `src/components/ui` for primitive elements.
6.  **Wire Up State**: Connect the UI to the presenter/service via custom hooks in `src/hooks/`.
7.  **Add Localization**: Ensure all user-facing strings use `t()` from react-i18next. Add keys to `locales/{lang}/translation.json`.

## Key Project Resources
- **Design System**: `src/design-system/components`
- **Core Types**: `src/types/` and `src/models/`
- **Validation Rules**: `src/schemas/validationSchemas.ts`
- **API Utilities**: `src/utils/apiRetryUtils.ts`

## Repository Starting Points
- `src/services/`: The core of the application logic. Study `vacationRulesCalculator.ts` for logic-heavy services and `vacationApiService.ts` for API-heavy services.
- `src/components/`: UI layer. `src/components/ui` contains reusable primitives; feature-specific folders (like `src/components/vacation_config`) contain layout-specific logic.
- `src/schemas/`: Centralized validation logic using Zod. Essential for form handling.
- `src/pages/`: Entry points for features and routing.

## Key Files & Symbols
- `src/utils/apiRetryUtils.ts`: Contains `supabaseWithRetry`, `withCircuitBreaker`. **Crucial for stability.**
- `src/services/vacationRulesCalculator.ts`: Template for complex business logic calculations.
- `src/utils/autoTranslation.ts`: `AutoTranslationService` for handling multi-language support.
- `src/error/ErrorFactory.ts`: Use this for standardized error creation.
- `src/services/supabaseQueryMonitoringService.ts`: For monitoring and optimizing database interactions.

## Architecture Context

### Service Layer
The backbone of the application. Services are responsible for data orchestration and business rules.
- **Directory**: `src/services/`
- **Key Symbols**: `VacationRulesCalculator`, `UserService`, `TranslationManager`, `OfflineDataService`.

### Model & Schema Layer
Defines the "shape" of the application data and ensures runtime validity.
- **Directories**: `src/models/`, `src/schemas/`
- **Key Symbols**: `VacationRequestData`, `LoginFormData`, `AgeBasedRule`.

### Component Layer
Atomic and molecular UI components.
- **Directories**: `src/components/ui`, `src/design-system/components`
- **Pattern**: Composition-heavy components (e.g., `UserCard` composed of `UserInfo`, `UserName`).

## Collaboration Checklist
- [ ] Are new API calls wrapped in retry/circuit breaker logic?
- [ ] Is business logic abstracted into a service file?
- [ ] Have new validation schemas been added to `validationSchemas.ts`?
- [ ] Are all user-facing strings ready for translation via `AutoTranslationService`?
- [ ] Does the new UI follow the design system in `src/components/ui`?
- [ ] Have you verified performance impact using `PerformanceMonitor`?

## Hand-off Notes
When completing a feature, ensure:
1.  Any new environment variables are documented.
2.  New service methods have basic JSDoc explanations.
3.  Complex state transitions in components are commented.
4.  Any "Mock" providers (like `MockTranslationProvider`) used during development are replaced or documented for removal.

## Related Resources
- [Service Worker Registration](./src/utils/serviceWorkerRegistration.ts)
- [Error Handling Strategy](./src/types/error-handling.ts)
- [Performance Monitoring](./src/services/performanceMonitoring.ts)
