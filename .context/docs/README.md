# Technical Documentation for heure_C2-local

Welcome to the technical documentation for the **heure_C2-local** repository. This guide provides a comprehensive overview of the codebase, architecture, and development processes.

## 📚 Core Documentation Guides

| Guide | Description |
| :--- | :--- |
| **[Project Overview](./project-overview.md)** | High-level summary of the application purpose, tech stack, and core features. |
| **[Architecture Notes](./architecture.md)** | Technical deep dive into the system design, directory structure, and module boundaries. |
| **[Development Workflow](./development-workflow.md)** | Guide for contributors: environment setup, branching strategy, and CI/CD. |
| **[Testing Strategy](./testing-strategy.md)** | Overview of Unit, E2E (Playwright), and integration testing protocols. |
| **[Glossary & Domain Concepts](./glossary.md)** | Definitions of business logic, user roles, and domain-specific terminology. |
| **[Data Flow & Integrations](./data-flow.md)** | Mapping of state management, Supabase interactions, and external API flows. |
| **[Security & Compliance](./security.md)** | Authentication models, GDPR compliance, and data protection strategies. |
| **[Tooling & Productivity](./tooling.md)** | CLI scripts, automation utilities, and IDE configurations used in the project. |

---

## 🛠 Repository Structure

The project is a TypeScript-based monorepo-style application primarily focused on a React frontend with a Supabase backend.

### Key Directories

- **`src/`**: The main application source code.
    - `components/`: UI components organized by domain (Admin, Auth, Dashboard, UI).
    - `services/`: Business logic layer (API clients, monitoring, notification services).
    - `hooks/`: Custom React hooks for state and lifecycle management.
    - `utils/`: Common utilities including performance monitoring and circuit breakers.
    - `types/`: TypeScript interfaces and type definitions (including Supabase schema).
- **`supabase/`**: Database migrations, edge functions, and configuration.
- **`scripts/`**: Maintenance, diagnostics, and data fix scripts.
- **`taskmaster/`**: Internal tool or service for task orchestration and management.
- **`e2e-tests/` & `testsprite_tests/`**: End-to-end testing suites using Playwright.

---

## 🚀 Getting Started for Developers

### Prerequisites
- Node.js (Latest LTS recommended)
- Supabase CLI
- Docker (for local database environment)

### Quick Start
1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd heure_C2-local
   npm install
   ```
2. **Environment Setup**:
   Copy `.env.example` to `.env` and fill in your Supabase credentials.
3. **Run Locally**:
   ```bash
   npm run dev
   ```

---

## 🏗 Key Architectural Patterns

The repository follows a strict decoupled architecture to ensure scalability:

1. **Service Layer**: All external interactions (Supabase, APIs) are wrapped in classes located in `src/services/`. This allows for features like the `CircuitBreaker` and `PerformanceMonitor` to be applied consistently.
2. **Performance First**: Real-time monitoring is integrated into the core via `SupabasePerformanceMonitor` and `ResourceMonitor`.
3. **Resilience**: The system uses `CircuitBreaker` patterns (see `src/utils/apiRetryUtils.ts`) to handle network instability gracefully.
4. **Localization**: A robust translation system (`src/utils/autoTranslation.ts`) supports multi-language deployments with fallback providers (Google, DeepL, Azure).

---

## 📝 Recent Fixes & Critical Documentation
The root directory contains several Markdown files documenting specific system fixes and architectural decisions:
- `SOLUCAO_DEFINITIVA_AUTH.md`: Details the final implementation of the authentication system.
- `DIAGNOSTICO_REAL_SISTEMA.md`: Analysis of system performance and bottlenecks.
- `CORRECAO_ROTEAMENTO_ADMIN.md`: Documentation on how administrative routing and permissions are handled.

---

*For more information, please refer to the specific guides listed in the [Core Documentation Guides](#core-guides) section.*
