---
type: skill
name: Commit Message
description: Generate commit messages following conventional commits with scope detection
skillSlug: commit-message
phases: [E, C]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Commit Message

## When to Use

Activate this skill when:
- Creating git commits
- Writing changelog entries
- Documenting code changes

## Conventional Commits Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(vacation): add vacation request form` |
| `fix` | Bug fix | `fix(auth): resolve login redirect loop` |
| `docs` | Documentation only | `docs(readme): update setup instructions` |
| `style` | Formatting, no code change | `style(ui): fix button alignment` |
| `refactor` | Code change, no new feature/fix | `refactor(services): extract API retry logic` |
| `perf` | Performance improvement | `perf(queries): optimize vacation list query` |
| `test` | Adding/updating tests | `test(auth): add login flow tests` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `ci` | CI/CD changes | `ci(github): add deploy workflow` |

## Scopes for This Project

| Scope | Directory/Feature |
|-------|-------------------|
| `auth` | Authentication, login, session |
| `vacation` | Vacation requests, approvals |
| `employee` | Employee management |
| `admin` | Admin dashboard, settings |
| `ui` | UI components, design system |
| `i18n` | Translations, localization |
| `api` | API services, Supabase calls |
| `hooks` | Custom React hooks |
| `utils` | Utility functions |
| `config` | Configuration files |
| `deps` | Dependencies |
| `ci` | CI/CD pipelines |
| `db` | Database schemas, migrations |

## Auto-Detect Scope

Based on changed files:
- `src/components/` → `ui` or feature name
- `src/services/` → `api` or feature name
- `src/hooks/` → `hooks`
- `src/contexts/` → feature name (e.g., `auth`)
- `locales/` → `i18n`
- `supabase/` → `db`
- `.github/` → `ci`

## Examples

### Feature Commit
```
feat(vacation): add vacation balance calculator

- Implement VacationCalculator service
- Add age-based vacation rules
- Include public holiday deduction logic

Closes #123
```

### Bug Fix Commit
```
fix(auth): resolve session persistence after page refresh

The auth token was not being stored correctly in localStorage.
Updated AuthContext to properly persist session state.

Fixes #456
```

### Refactoring Commit
```
refactor(api): centralize error handling in services

- Extract common error handling to ErrorFactory
- Apply consistent error types across all services
- Add retry logic wrapper for Supabase calls
```

### Multi-scope Commit
```
feat(vacation,i18n): add French translations for vacation module

- Add FR translations for vacation request form
- Update translation keys structure
- Fix missing DE translations
```

## Breaking Changes

Use `!` after type/scope or `BREAKING CHANGE:` footer:

```
feat(api)!: change vacation request payload structure

BREAKING CHANGE: The vacation request API now requires
`startDate` and `endDate` instead of `dateRange` object.
```

## Commit Message Checklist

- [ ] Type correctly identifies the change
- [ ] Scope accurately reflects affected area
- [ ] Description is clear and concise (max 72 chars)
- [ ] Body explains "why" not just "what" (if needed)
- [ ] References related issues/PRs
- [ ] Breaking changes are clearly marked

## Related Resources

- [Conventional Commits Spec](https://www.conventionalcommits.org/)
- [Development Workflow](../../docs/development-workflow.md)
