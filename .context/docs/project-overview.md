# Project Overview

Heure C2 is a comprehensive workforce management and vacation planning platform designed to streamline human resource operations for organizations. It simplifies the complexity of tracking employee work time, managing vacation requests, and ensuring compliance with regional labor laws (specifically tailored for Swiss cantons and municipalities) by providing a unified, real-time dashboard for both employees and administrators.

## Quick Facts

- **Root**: `/Users/chlins/Desktop/DEV/projetos/heure_C2-local`
- **Languages**: TypeScript (Main Application), Python (Automated Testing with Playwright), SQL (Supabase/PostgreSQL)
- **Primary Entry**: `src/main.tsx` (Frontend), `taskmaster/src/index.ts` (Task Management Server)
- **Infrastructure**: Supabase (Database & Auth), Vite (Build Tool), Playwright (E2E Testing)
- **Detailed Codebase Analysis**: Refer to [`codebase-map.json`](./codebase-map.json)

## Entry Points

- **Web Application**: [`src/main.tsx`](../src/main.tsx) — Main entry point for the React frontend application.
- **Routing Engine**: [`src/components/Routes.tsx`](../src/components/Routes.tsx) — Defines the application's navigation structure and protected routes.
- **Taskmaster Server**: [`taskmaster/src/index.ts`](../taskmaster/src/index.ts) — Specialized MCP (Model Context Protocol) server for task automation and management.
- **Diagnostic Tools**: [`scripts/diagnostics/`](../scripts/diagnostics/) — Collection of scripts for environment and database health checks.

## Key Exports

- **Presenters**: 
  - [`VacationRequestPresenter`](../src/presenters/VacationRequestPresenter.ts)
  - [`EmployeePresenter`](../src/presenters/EmployeePresenter.ts)
- **Services**: 
  - [`VacationApiService`](../src/services/vacationApiService.ts)
  - [`UserInviteServiceEnhanced`](../src/services/userInviteServiceEnhanced.ts)
- **Utilities**: 
  - [`ValidationSystem`](../src/utils/validationSystem.ts)
  - [`SupabasePerformanceMonitor`](../src/utils/supabasePerformanceMonitor.ts)
- **Types**: For a full list of exported interfaces and enums, see [`codebase-map.json`](./codebase-map.json)

## File Structure & Code Organization

- `src/models/` — Domain interfaces and pure type definitions (Employee, Vacation, DailyLog, etc.).
- `src/presenters/` — Control logic and data formatting layer (1:1 with Models).
- `src/services/` — Data access layer: Supabase calls, API integrations, and business logic.
- `src/components/` — React UI components organized by features (Admin, Dashboard, Charts, etc.).
- `src/pages/` — Application pages/routes.
- `src/hooks/` — Custom React hooks for shared state and side-effect management.
- `src/contexts/` — React Context providers (Auth, GlobalData, Notifications, etc.).
- `src/auth/` — Authentication service and types (AuthService, AuthContext types).
- `src/types/` — Centralized TypeScript definitions and Supabase schema mappings.
- `src/utils/` — Common utility functions, including performance monitoring, validation, and accessibility helpers.
- `src/config/` — Centralized configuration files.
- `src/i18n/` — Module-specific translation configurations.
- `locales/` — Translation files for pt, fr, en, es.
- `taskmaster/` — A standalone service for managing automated tasks and background operations.
- `scripts/` — Maintenance scripts for database policies, diagnostics, and environment fixes.
- `testsprite_tests/` — Playwright-based end-to-end testing suite written in Python.

## Technology Stack Summary

The project is built on a modern **TypeScript** ecosystem. The frontend utilizes **React** with **Vite** for optimized building and **Tailwind CSS** for styling. The backend is powered by **Supabase**, providing PostgreSQL as the database, built-in Authentication, and Realtime subscriptions.

The codebase enforces strict type safety through TypeScript and uses **ESLint/Prettier** for code consistency. Automated testing is handled by **Jest** for unit/integration tests and **Playwright (Python)** for end-to-end flows.

## Core Framework Stack

- **Frontend**: React (Functional Components with Hooks). Architecture follows a layered pattern: Components -> Presenters -> Services -> Supabase.
- **Backend-as-a-Service**: Supabase (Auth, DB, Storage). The data layer utilizes Row Level Security (RLS) policies for multi-tenant isolation.
- **Data Fetching**: Custom service wrappers around the Supabase client with built-in **Circuit Breaker** patterns and retry logic for resilience.
- **State Management**: React Context API and specialized hooks for local/global state.

## UI & Interaction Libraries

- **UI Kit**: Custom design system built with Radix UI primitives and Lucide React icons.
- **Animations**: Framer Motion is used for sophisticated interface transitions and the registration wizard.
- **Accessibility**: ARIA-compliant components with specialized utilities in `src/utils/accessibility.ts`.
- **Localization**: Multi-language support (Portuguese, French, English, Spanish) via `react-i18next`. Locale files in `locales/{pt,fr,en,es}/translation.json`.

## Development Tools Overview

The repository includes several developer-focused tools to ensure code quality:
- **Diagnostic Scripts**: Run `npm run check-env` to verify Supabase connectivity and local configurations.
- **Taskmaster CLI**: A specialized interface for managing internal tasks and documentation generation.
- **Performance Monitor**: Integrated tools to track Supabase query latency and frontend render times in real-time.

## Getting Started Checklist

1. **Environment Setup**: Copy `.env.example` to `.env` and populate it with your Supabase credentials.
2. **Install Dependencies**: Run `npm install` to install frontend dependencies.
3. **Database Preparation**: Review and apply necessary policies using `npm run apply-policies`.
4. **Launch Development Server**: Run `npm run dev` to start the Vite HMR server.
5. **Verify Installation**: Run `npm run test` to execute the Vitest suite and ensure core logic is passing.
6. **Review Workflow**: See [development-workflow.md](./development-workflow.md) for contribution guidelines.

## Next Steps

For a deeper dive into specific areas of the system, please refer to the following documentation:
- Understand the data flow and service layers in [architecture.md](./architecture.md).
- Learn how to use the built-in diagnostic and maintenance tools in [tooling.md](./tooling.md).
- Explore the automated testing strategy in the `testsprite_tests/` directory.

## Related Resources

- [architecture.md](./architecture.md)
- [development-workflow.md](./development-workflow.md)
- [tooling.md](./tooling.md)
- [codebase-map.json](./codebase-map.json)
