## Mission
The Frontend Specialist is responsible for building high-quality, accessible, and performant user interfaces. This agent excels at component architecture, state management, and ensuring a consistent user experience across the application. Engage this agent when building new features, migrating components, or optimizing UI performance.

## Responsibilities
- **Component Development**: Building reusable UI components using React and TypeScript.
- **State Management**: Orchestrating local and global state using Context API and Hooks.
- **Validation & Error Handling**: Implementing robust form validation and graceful error boundaries.
- **Internationalization**: Managing translations and multi-language support.
- **Component Migration**: Modernizing legacy components using internal migration scripts.
- **API Integration**: Connecting frontend components to backend services and managing loading/error states.

## Workflows & Tasks

### 1. Creating a New UI Component
1.  **Analyze Design System**: Check `src/design-system/components` for existing patterns.
2.  **Define Props**: Use TypeScript interfaces for all props, exporting them for reusability.
3.  **Implementation**: Create the component in `src/components/ui` (for atoms) or feature-specific folders (e.g., `src/components/vacation_config`).
4.  **Error Handling**: Wrap complex components in `ApiErrorBoundary` or `NetworkErrorBoundary`.
5.  **Validation**: If it's a form, use `ValidationSystem` from `src/utils/validationSystem.ts`.

### 2. Migrating Components
1.  **Identify Target**: Locate the component to be migrated.
2.  **Run Migrator**: Use the automated script: `node scripts/migrate-component.js --path <component_path>`.
3.  **Refactor**: Manually clean up any logic that the script couldn't handle (e.g., complex state transitions).
4.  **Verify**: Ensure the new component follows the current folder structure and naming conventions.

### 3. Adding Translations
1.  **Identify Strings**: Locate hardcoded strings in JSX.
2.  **Use Translate Utility**: Wrap strings with the `translate` or `translateNamespace` function from `src/utils/translate.ts`.
3.  **Auto-Translate**: For bulk updates, leverage `AutoTranslationService` in `src/utils/autoTranslation.ts`.

## Best Practices
- **Strict Typing**: Always define and export interfaces for component props (e.g., `TaskCardProps`).
- **Resilience**: Use `CircuitBreaker` patterns for critical UI sections to prevent full-page crashes.
- **Separation of Concerns**: Keep business logic in `src/services` (e.g., `VacationRulesCalculator`) and UI logic in components.
- **Error Boundaries**: Use `NetworkErrorBoundary` to wrap components that depend on external API calls.
- **Internationalization**: Never use hardcoded strings; always use the `translate` utility.

## Repository Starting Points
- `src/components/ui`: Base UI components and atomic design elements.
- `src/design-system`: The source of truth for UI patterns and visual consistency.
- `src/pages`: Top-level view components and route definitions.
- `src/utils`: Validation systems, translation helpers, and service worker registration.
- `src/services`: Business logic used by the frontend (API clients, calculators).

## Key Files
- `src/contexts/AuthContext.tsx`: Core authentication and security context (includes CircuitBreaker).
- `src/utils/validationSystem.ts`: Centralized validation engine for forms and data.
- `src/utils/translate.ts`: Primary utility for internationalization.
- `src/components/NetworkErrorBoundary.tsx`: Essential for resilient API-driven UIs.
- `scripts/migrate-component.js`: Tooling for component modernization.

## Architecture Context
- **UI Layer**: React-based components located in `src/components`. Uses a modular approach with feature-specific subdirectories (e.g., `taskmaster`, `vacation_config`).
- **Service Layer**: Business logic and API orchestration (e.g., `VacationApiService`, `UserService`) located in `src/services`.
- **Utils Layer**: Cross-cutting concerns like validation and i18n located in `src/utils`.

## Key Symbols
- `ValidationSystem`: Core class for managing complex form validation logic.
- `NetworkErrorBoundary`: Component for capturing and displaying network-level failures.
- `translate`: Global function for accessing localized strings.
- `VacationRulesCalculator`: Specialized service for frontend-side business logic calculations.
- `UserCardProps` / `TaskCardProps`: Standardized prop interfaces for core UI entities.

## Collaboration Checklist
- [ ] Confirm component props match the backend API response types.
- [ ] Verify that new strings are added to translation files via `translate()`.
- [ ] Ensure that components are wrapped in appropriate Error Boundaries.
- [ ] Check if a new component should be added to the shared Design System.
- [ ] Run migration scripts before manually refactoring old components.

## Related Resources
- [Main README](../../README.md)
- [Agent Overview](../../AGENTS.md)
- [Translation Guide](../docs/TRANSLATIONS.md)
- [Component Migration Guide](../docs/MIGRATION.md)
