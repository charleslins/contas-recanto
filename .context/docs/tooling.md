# Tooling & Productivity Guide

This guide outlines the essential tools, automation scripts, and environment configurations designed to maximize developer efficiency within the codebase. By standardizing our tooling, we ensure consistent code quality and reduce the friction of local development.

## Required Tooling

To contribute to this project, you must have the following tools installed:

- **Node.js (v18.0.0+)**: The primary runtime for the frontend application.
    - **Installation**: Download from [nodejs.org](https://nodejs.org/) or use `nvm install 18`.
    - **Powers**: Development server, build processes, and dependency management.
- **npm or yarn**: Package managers for handling dependencies.
    - **Powers**: Executing scripts defined in `package.json`.
- **Supabase CLI**: Essential for local database development, migrations, and edge functions.
    - **Installation**: `npm install -g supabase` or via Homebrew `brew install supabase/tap/supabase`.
    - **Powers**: Local database emulation and schema synchronization.
- **Python (3.10+)**: Required for the testing suite and specific utility scripts found in `testsprite_tests`.
    - **Installation**: Available via [python.org](https://www.python.org/downloads/).
    - **Powers**: Playwright integration tests and automation scripts.
- **Playwright**: Used for end-to-end testing.
    - **Installation**: `npx playwright install` after installing dependencies.
    - **Powers**: UI and integration testing across different browsers.

## Recommended Automation

The repository includes several scripts and automated workflows to streamline repetitive tasks:

### Development Scripts
- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles and optimizes the application for production.
- **`npm run lint`**: Executes ESLint to check for code style issues and potential bugs.
- **`npm run preview`**: Serves the production build locally for final verification.

### Database Automation
- **`supabase start`**: Launches a local Docker-based Supabase environment including Postgres, Auth, and Storage.
- **`supabase db reset`**: Resets the local database to the current migration state and applies seeds.
- **`scripts/apply_delete_policy.ts`**: A utility script for managing Row Level Security (RLS) policies within the database.

### Task Management (Taskmaster)
The project includes a `taskmaster` tool located in the `taskmaster/` directory. This is a specialized utility for managing internal development tasks and filesystem-based task tracking.
- **`loadTasksFromFS`**: Automatically syncs local task files with the development environment.
- **`validateStatus`**: Ensures task transitions follow project-defined workflows.

### Testing Automation
- **`testsprite_tests/`**: Contains Python-based automation for heavy-duty testing. Use the provided `venv` to ensure all Playwright dependencies are correctly isolated.

## IDE / Editor Setup

We recommend using **Visual Studio Code (VS Code)** with the following configuration to maintain consistency:

### Essential Extensions
- **ESLint**: Real-time linting feedback within the editor.
- **Prettier**: Automatic code formatting on save.
- **Tailwind CSS IntelliSense**: Provides autocomplete and linting for utility classes.
- **PostgreSQL**: For managing and querying the local Supabase database.
- **Python (Microsoft)**: For working with scripts in the `testsprite_tests` directory.

### Workspace Settings
- `editor.formatOnSave`: Set to `true` to ensure Prettier formats code automatically.
- `editor.codeActionsOnSave`: Configure `"source.fixAll.eslint": true` to resolve linting issues automatically.

## Productivity Tips

- **Terminal Aliases**: Add the following to your `.zshrc` or `.bashrc` to speed up common workflows:
    ```bash
    alias sbs="supabase"
    alias sbd="npm run dev"
    alias sbt="npm run test"
    ```
- **Supabase Dashboard**: When running `supabase start`, use the local Studio URL (usually `http://localhost:54323`) to inspect your database and auth logs without needing the cloud console.
- **Diagnostic Scripts**: Utilize the `scripts/diagnostics` folder if you encounter environment issues. These scripts are designed to verify if your local Supabase and Node environments are correctly synchronized.
- **Performance Monitoring**: For local performance testing, the `SupabasePerformanceMonitor` class can be toggled via environment variables to log query durations directly to your browser console.

## Related Resources

- [development-workflow.md](./development-workflow.md)
