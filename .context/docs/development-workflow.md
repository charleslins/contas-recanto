# Development Workflow Documentation

The development workflow in this repository is designed to ensure code stability, rapid iteration, and high-quality releases. This document outlines the procedures for feature development, code review, branching, local development setup, and onboarding tasks.

## Workflow Overview

1. **Feature Selection**
   - Identify a task from the backlog or the "Onboarding Tasks" section.

2. **Implementation**
   - Create a dedicated branch.
   - Develop the feature and ensure all local tests pass.

3. **Validation**
   - Run linting and performance checks locally to maintain architectural standards.

4. **Submission**
   - Open a Pull Request (PR) against the `main` branch.
   - Ensure the CI/CD pipeline executes successfully.

5. **Review & Merge**
   - Address feedback from maintainers or automated agents.
   - Once approved, merge the PR via squash-and-merge to keep a clean history.

## Branching & Releases

We use a **Trunk-Based Development** model with short-lived feature branches:

- **Main Branch**: The `main` branch must always be in a deployable state. Direct commits to `main` are restricted.
- **Feature Branches**: Follow the naming convention `feature/description` or `fix/issue-id`. Merge branches within 48 hours to avoid stale code.
- **Tagging**: Releases are marked with Semantic Versioning (SemVer) tags (e.g., `v1.2.3`).
- **Release Cadence**: Deployments to production occur automatically upon successful merges to `main`, provided all integration tests in `testsprite_tests` pass.

## Local Development

To set up your environment and manage the build lifecycle, use the following commands:

- **Install Dependencies**: 
  ```bash
  npm install
  ```
- **Run Development Server**:
  ```bash
  npm run dev
  ```
  (Starts the Vite development server with Hot Module Replacement.)

- **Execute Tests**:
  ```bash
  npm test
  ```
  (Runs Vitest for unit and service tests.)

- **Production Build**: 
  ```bash
  npm run build
  ```
  (Generates optimized assets in the `dist` folder.)

- **Linting & Formatting**: 
  ```bash
  npm run lint
  npm run format
  ```

- **Backend/Mock Services**: 
  If working on MCP or Taskmaster integrations, navigate to `taskmaster/` and use:
  ```bash
  npm run build
  ```

## Code Review Expectations

Code reviews are a collaborative process to ensure new code aligns with architectural and performance standards:

- **Checklist for Contributors**:
  - Ensure new UI components use established `design-system` tokens.
  - Verify that new Supabase queries are wrapped with `monitorSupabaseOperation` for performance tracking.
  - Update relevant types in `src/types` if schema changes occur.
  - Documentation must be updated if public APIs or utility functions are modified.

- **Approvals**: At least one approval from a code owner is required. For AI-assisted contributions, refer to `AGENTS.md` for interaction guidelines.

- **Performance**: Any PR affecting the core bundle size or introducing complex re-renders in `src/components/Dashboard` will undergo a stricter performance audit.

## Onboarding Tasks

If you are new to the repository, start with these tasks to familiarize yourself with the codebase:

1. **Environment Setup**: Clone the repo, then ensure `npm run dev` loads the `CompanyLandingPage` correctly.
2. **First Issue**: Look for issues labeled `good-first-issue` in the tracker. These usually involve minor UI refinements or adding unit tests.
3. **Explore the Dashboard**: Review `src/pages/DashboardPage.tsx` and its connected services to understand the data flow from Supabase to the UI.
4. **Internal Runbooks**: Check the `scripts/diagnostics` folder for tools that help debug common connectivity or data synchronization issues.

## Related Resources

- [Testing Strategy](./testing-strategy.md) - Detailed guide on unit, integration, and E2E testing.
- [Tooling Documentation](./tooling.md) - Overview of the CLI tools, scripts, and MCP servers used in this project.
