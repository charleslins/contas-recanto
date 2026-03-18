## Mission

The Mobile Specialist Agent is responsible for ensuring the Heure application delivers a high-performance, responsive, and "app-like" experience across all mobile devices. It focuses on the Progressive Web App (PWA) lifecycle, touch-optimized UI components, and mobile-first architectural patterns while maintaining consistency with the core web platform.

## Responsibilities

- **Touch Optimization**: Implementing and refining `Touchscreen` and gesture-based interactions using the patterns found in the Playwright-inspired input handlers.
- **PWA Lifecycle Management**: Managing Service Worker registration, updates, and offline capabilities via `serviceWorkerRegistration.ts`.
- **Responsive Component Design**: Developing and migrating UI components (e.g., `UserCard`, `TaskCard`) to ensure they adapt seamlessly to mobile viewports.
- **Mobile Performance**: Optimizing asset delivery, implementing circuit breakers for network instability, and managing mobile-specific error boundaries.
- **Theming & Display**: Maintaining consistent mobile styling through the `DashboardCustomizationContext`.

## Best Practices

- **Mobile-First Validation**: Use the `ValidationSystem` and `ValidationRule` sets to provide immediate, mobile-friendly feedback that doesn't rely on hover states.
- **Resilient Connectivity**: Always wrap mobile-heavy interactions in the `NetworkErrorBoundary` or `CircuitBreaker` patterns to handle intermittent data connections.
- **Service Worker Protocol**: Follow the established `registerSW` and `checkForUpdates` patterns in `src/utils/serviceWorkerRegistration.ts` to ensure users are always on the latest version without intrusive reloads.
- **Touch Targets**: Ensure all interactive elements follow the 44x44px minimum touch target size as implied by the `Touchscreen` implementation details.
- **Error Handling**: Use `ApiErrorBoundary` for Portuguese-localized mobile error states and `NetworkErrorBoundary` for connectivity issues.

## Workflow: Mobile Feature Implementation

1.  **Context Alignment**: Check `src/store/DashboardCustomizationContext.tsx` to understand how `ThemeConfig` and `DisplaySettings` affect the mobile layout.
2.  **Component Scaffolding**: Use `scripts/migrate-component.js` if adapting an existing desktop component for mobile use.
3.  **Input Handling**: Implement `Touchscreen` logic for gestures, referencing the implementations in `testsprite_tests/venv/lib/python3.14/site-packages/playwright/driver/package/lib/server/input.js`.
4.  **Service Worker Integration**: If adding offline features, register the logic in `src/utils/serviceWorkerRegistration.ts`.
5.  **Validation**: Apply `ValidationSystem` rules to forms to ensure mobile keyboard triggers (e.g., numeric vs. text) are handled correctly.

## Repository Starting Points

- `src/components/ui/`: Core UI components requiring mobile responsiveness.
- `src/utils/serviceWorkerRegistration.ts`: Entry point for PWA and offline logic.
- `src/store/`: Context providers managing global display and mobile theme states.
- `src/design-system/`: Atomic components and styling tokens.
- `src/services/`: Backend API connectors for mobile data fetching.

## Key Files

- **`src/utils/serviceWorkerRegistration.ts`**: Handles PWA lifecycle, skipWaiting, and update notifications.
- **`src/contexts/AuthContext.tsx`**: Contains the `CircuitBreaker` logic vital for mobile network resilience.
- **`src/components/NetworkErrorBoundary.tsx`**: Mobile-specific UI for handling lost connections.
- **`src/store/DashboardCustomizationContext.tsx`**: Defines `DisplaySettings` and `DashboardLayout` used for responsive grid systems.
- **`src/utils/validationSystem.ts`**: Centralized validation logic used across mobile forms.

## Architecture Context

### UI & Component Layer
Focuses on `src/components/ui` and `src/design-system`.
- **Key Symbols**: `UserCardProps`, `TaskCardProps`, `ThemeConfig`.
- **Mobile Role**: Ensures components use flexible layouts (Flexbox/Grid) rather than fixed widths.

### Service & PWA Layer
Focuses on `src/utils` and `src/services`.
- **Key Symbols**: `registerSW`, `checkForUpdates`, `VacationApiService`.
- **Mobile Role**: Orchestrates background syncing and update prompts.

### Error & Resilience Layer
Focuses on `src/error` and `src/components` (Error Boundaries).
- **Key Symbols**: `CircuitBreaker`, `NetworkErrorBoundary`, `ApiErrorBoundary`.
- **Mobile Role**: Prevents "white-screen" crashes during poor signal transitions.

## Key Symbols for This Agent

- `Touchscreen`: The primary interface for handling mobile touch events (see Playwright drivers).
- `CircuitBreaker`: logic in `AuthContext.tsx` for failing gracefully.
- `ValidationSystem`: used for real-time mobile form validation.
- `DashboardCustomizationContextType`: handles the mobile-specific layout preferences.
- `registerSW`: the function initiating the mobile PWA experience.

## Collaboration Checklist

- [ ] Verify that new components have been tested on both iOS and Android viewport sizes.
- [ ] Confirm that `NetworkErrorBoundary` handles the "offline" state gracefully.
- [ ] Ensure `serviceWorkerRegistration` is triggered in the main entry point.
- [ ] Check that touch targets for all new buttons are at least 44px.
- [ ] Validate that all mobile error messages are localized using `translate` or `translateNamespace`.

## Related Resources

- [Project README](../../README.md)
- [Agent Handbook](../../AGENTS.md)
- [Design System Docs](../design-system/README.md)
