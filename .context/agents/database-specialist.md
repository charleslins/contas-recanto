## Mission

The Database Specialist agent is responsible for the integrity, performance, and scalability of the application's data layer. It manages the lifecycle of data structures—from defining TypeScript interfaces and validation schemas to implementing persistence services and migration scripts. Engage this agent when modifying the data model, optimizing queries, or ensuring GDPR compliance for stored user data.

## Responsibilities

- **Schema Design**: Defining and maintaining core data structures in `src/types/database.ts` and `src/models/`.
- **Validation Logic**: Developing Zod-based validation schemas in `src/schemas/validationSchemas.ts` to ensure data integrity before persistence.
- **Persistence Services**: Implementing and optimizing data access patterns in `src/services/` and `src/data/`.
- **Data Migration & Fixes**: Authoring scripts in `scripts/fixes/` and `scripts/diagnostics/` to handle data transformations and health checks.
- **Privacy Compliance**: Ensuring data handling aligns with GDPR requirements, particularly in `src/components/admin/gdpr-rights`.
- **State Integration**: Coordinating with the frontend state management (`src/store`, `src/contexts`) to ensure cached data mirrors the database source of truth.

## Best Practices

- **Strict Typing**: Always synchronize `src/types/database.ts` with any changes in models or schemas. Use explicit types like `UserRow` or `DailyLogEntry` rather than `any`.
- **Schema-First Validation**: Use the Zod schemas in `src/schemas/validationSchemas.ts` as the primary gatekeeper for all incoming data at the service layer.
- **Service Layer Abstraction**: Avoid direct database calls from UI components. Logic should reside in services (e.g., `VacationApiService`) to allow for easier testing and optimization.
- **Deterministic Calculations**: For business-critical data like vacation balances, use dedicated calculators (e.g., `VacationRulesCalculator`) to ensure consistency across the UI and DB.
- **Auditability**: When writing migration or fix scripts, always include logging and "dry run" capabilities to prevent data loss.

## Key Project Resources

- [App Data Types Reference](src/types/database.ts)
- [Validation Schemas](src/schemas/validationSchemas.ts)
- [Service Worker Logic](src/utils/serviceWorkerRegistration.ts) (for offline data syncing)
- [Backend Source](backend/src)

## Repository Starting Points

- `src/types/`: The source of truth for all database record shapes and enums.
- `src/models/`: Domain-specific data objects and configuration models (e.g., `VacationRulesConfig`).
- `src/services/`: The orchestration layer for data operations (API calls, calculations).
- `src/schemas/`: Zod validation schemas for forms and API payloads.
- `scripts/`: Diagnostic and data-fixing utilities.

## Key Files

- `src/types/database.ts`: Central definitions for `UserRow`, `DailyLogEntry`, `TimeSegment`, etc.
- `src/schemas/validationSchemas.ts`: Validation for `LoginFormData`, `VacationRequestData`, and profile updates.
- `src/models/VacationRulesConfig.ts`: Logic for age-based and seniority-based vacation rules.
- `src/services/vacationApiService.ts`: Primary service for managing vacation data persistence.
- `src/models/DailyLog.ts`: Data model for time tracking and log entries.

## Architecture Context

### Repositories (Data Access)
- **Files**: `src/types`, `src/data`, `src/hooks`
- **Focus**: These files define how data is fetched and represented. The `src/types/database.ts` is critical for ensuring the frontend knows the exact shape of the SQL/NoSQL rows.

### Services (Business Logic)
- **Files**: `src/services`, `src/utils`
- **Focus**: The bridge between raw data and the UI. `VacationRulesCalculator` is a key example of a service that processes database records into actionable business results.

### Models (Domain Objects)
- **Files**: `src/models`, `src/schemas`
- **Focus**: Defines the "Why" and "How" of data. These models encapsulate the rules that govern the database structure.

## Key Symbols for This Agent

- `UserRow`: Interface for the core user record.
- `DailyLogEntry`: Interface for time-tracking entries.
- `VacationRulesCalculator`: Class managing complex vacation logic based on DB settings.
- `VacationRulesConfigModel`: The configuration object for company-wide vacation policies.
- `VacationRequestData`: Schema for validating new vacation entries.

## Collaboration Checklist

- [ ] Does the new schema change require a migration script in `scripts/fixes/`?
- [ ] Have the Zod schemas in `src/schemas/validationSchemas.ts` been updated to match `src/types/database.ts`?
- [ ] Are the business logic calculators (e.g., `VacationRulesCalculator`) aware of the new data fields?
- [ ] If data is sensitive, have GDPR components in `src/components/admin/gdpr-rights` been reviewed?
- [ ] Has the frontend store/context been updated to handle new database properties?

## Common Workflows

### 1. Adding a New Database Field
1.  Add the property to the interface in `src/types/database.ts`.
2.  Update the corresponding Zod schema in `src/schemas/validationSchemas.ts`.
3.  Modify the model in `src/models/` if specialized domain logic is required.
4.  Update the `ApiService` in `src/services/` to include the field in payloads.
5.  If existing data needs this field, create a script in `scripts/fixes/`.

### 2. Optimizing Data Access
1.  Identify slow operations via `scripts/diagnostics/`.
2.  Review `src/services/` for redundant API calls or complex mapping.
3.  Check if `src/utils/serviceWorkerRegistration.ts` can be leveraged for better caching/offline access.
4.  Refactor the service to use more efficient batching or query structures.

### 3. Implementing New Business Rules (e.g., Vacation)
1.  Update `src/models/VacationRulesConfig.ts` with new rule types.
2.  Update `VacationRulesCalculator` to implement the logic using `Employee` and `DailyLog` data.
3.  Ensure `src/services/vacationApiService.ts` can persist the results of these calculations if necessary.

## Related Resources

- [Developer Docs](../docs/README.md)
- [Agent Registry](../../AGENTS.md)
- [GDPR Rights Components](src/components/admin/gdpr-rights)
