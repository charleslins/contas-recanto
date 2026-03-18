---
type: skill
name: Pr Review
description: Review pull requests against team standards and best practices
skillSlug: pr-review
phases: [R, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# PR Review

## When to Use

Activate this skill when:
- Reviewing pull requests
- Preparing PR for submission
- Validating changes before merge

## PR Review Checklist

### 1. PR Metadata

- [ ] **Title**: Follows conventional commit format
- [ ] **Description**: Clearly explains what and why
- [ ] **Labels**: Appropriate labels applied
- [ ] **Linked Issues**: Related issues are referenced

### 2. Code Quality

| Area | Check |
|------|-------|
| Types | No `any`, proper interfaces |
| Patterns | Services, Presenters, Hooks separation |
| Resilience | Circuit breaker on API calls |
| i18n | No hardcoded strings |
| Security | No secrets, proper validation |

### 3. Testing

- [ ] Unit tests for new logic
- [ ] Integration tests for cross-module changes
- [ ] E2E tests for user-facing flows
- [ ] All existing tests pass

### 4. Documentation

- [ ] JSDoc for public functions
- [ ] README updated if needed
- [ ] Architecture docs updated for significant changes

## PR Description Template

```markdown
## Summary
[Brief description of what this PR does]

## Changes
- [Change 1]
- [Change 2]

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] No new warnings introduced
- [ ] Documentation updated

## Related Issues
Closes #[issue-number]
```

## Review Response Template

```markdown
## PR Review: #[PR-number]

### Summary
[Overall assessment]

### ✅ Approved Items
- [What looks good]

### ⚠️ Suggestions (non-blocking)
- [ ] [Suggestion 1]
- [ ] [Suggestion 2]

### ❌ Required Changes (blocking)
- [ ] [Required change 1]
- [ ] [Required change 2]

### Testing Verification
- [ ] Ran tests locally
- [ ] Tested feature manually
- [ ] Verified no regressions

### Final Verdict
- [ ] **Approved** - Ready to merge
- [ ] **Request Changes** - Needs updates before merge
- [ ] **Comment** - Discussion needed
```

## Common PR Issues

| Issue | Resolution |
|-------|------------|
| Large PR (>500 lines) | Split into smaller, focused PRs |
| No tests | Add tests before approval |
| Missing types | Define interfaces in `src/types/` |
| Direct Supabase calls | Wrap with retry logic |
| Hardcoded strings | Use translation system |
| Console.log statements | Remove or use proper logging |

## Branch Naming Convention

```
<type>/<issue-number>-<brief-description>
```

Examples:
- `feat/123-vacation-balance-calculator`
- `fix/456-login-redirect-loop`
- `refactor/789-api-error-handling`

## Merge Requirements

Before merging:
1. All CI checks pass
2. At least 1 approval (2 for critical changes)
3. No unresolved conversations
4. Branch is up to date with target

## Related Resources

- [Code Review Skill](../code-review/SKILL.md)
- [Development Workflow](../../docs/development-workflow.md)
- [Testing Strategy](../../docs/testing-strategy.md)
