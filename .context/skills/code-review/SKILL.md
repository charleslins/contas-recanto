---
type: skill
name: Code Review
description: Review code quality, patterns, and best practices
skillSlug: code-review
phases: [R, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Code Review

## When to Use

Activate this skill when:
- Reviewing code changes before merge
- Evaluating code quality of existing files
- Checking adherence to project patterns
- Validating new implementations

## Review Checklist

### Architecture & Patterns

- [ ] **Service Pattern**: Business logic is in `src/services/`, not in components
- [ ] **Presenter Pattern**: Data transformation uses presenters in `src/presenters/`
- [ ] **Hook Abstraction**: Complex state logic extracted to custom hooks
- [ ] **Type Safety**: No `any` types; explicit interfaces from `src/types/` or `src/models/`

### Resilience & Error Handling

- [ ] **Circuit Breaker**: Supabase calls use `supabaseWithRetry` or `withCircuitBreaker`
```typescript
// ✅ Correct
import { supabaseWithRetry } from '@/utils/apiRetryUtils';
const result = await supabaseWithRetry(() => supabase.from('table').select());

// ❌ Wrong - no resilience
const result = await supabase.from('table').select();
```

- [ ] **Error Boundaries**: Components have appropriate error handling
- [ ] **Validation**: Input validation uses Zod schemas from `src/schemas/`

### Localization (i18n)

- [ ] **No Hardcoded Strings**: All user-facing text uses translation system
```typescript
// ✅ Correct
const { t } = useTranslation();
<span>{t('vacation.status.approved')}</span>

// ❌ Wrong
<span>Approved</span>
```

- [ ] **Translation Keys**: New keys added to `locales/*.json`

### Performance

- [ ] **Memoization**: Heavy computations use `useMemo`/`useCallback`
- [ ] **Re-render Prevention**: Components use `React.memo` where appropriate
- [ ] **Lazy Loading**: Large components use dynamic imports

### Security

- [ ] **No Sensitive Data**: API keys, secrets not in code
- [ ] **Input Sanitization**: User inputs are validated
- [ ] **RLS Awareness**: Database queries respect Row Level Security

### Code Quality

- [ ] **Naming Conventions**: camelCase for variables, PascalCase for components
- [ ] **File Organization**: Follows project structure
- [ ] **Comments**: Complex logic is documented
- [ ] **DRY Principle**: No unnecessary code duplication

## Review Response Template

```markdown
## Code Review Summary

### ✅ Strengths
- [What was done well]

### ⚠️ Suggestions
- [Non-blocking improvements]

### ❌ Required Changes
- [Must fix before merge]

### 📋 Checklist Verification
- [ ] Architecture patterns followed
- [ ] Error handling implemented
- [ ] i18n compliance
- [ ] Performance considerations
- [ ] Security review passed
```

## Common Issues in This Project

| Issue | Solution |
|-------|----------|
| Direct Supabase calls | Wrap with `supabaseWithRetry` |
| Hardcoded strings | Use `useTranslation()` hook |
| `any` type usage | Define interface in `src/types/` |
| Business logic in component | Extract to service in `src/services/` |
| Missing loading states | Add skeleton loaders from `src/components/common/` |
| `opacity-0` without animation | Remove or use verified CSS animation classes |
| `<div>` inside `<tbody>` | Move to overlay wrapper outside `<table>` |
| useEffect dependency loop | Remove state updated inside effect from deps |
| Loading never finishes | Ensure `setLoading(false)` in ALL code paths |

### Defensive Coding Checks (Anti-Regression)

> Based on real production bugs that caused blank white screens.

- [ ] **No invisible CSS**: No `opacity-0` without verified animation classes (`tailwindcss-animate` plugin must be installed)
- [ ] **Valid DOM nesting**: `<tbody>` children are only `<tr>`, `<tr>` children are only `<td>`/`<th>`
- [ ] **No useEffect loops**: State updated inside `useEffect` is NOT in its dependency array
- [ ] **Loading always resolves**: Every `useState(true)` for loading has `setLoading(false)` in ALL paths (early returns, catch, finally)
- [ ] **i18n keys exist**: All `t("key")` calls have matching keys in all 4 locales (pt, en, fr, es)

## Related Resources

- [Architecture Documentation](../../docs/architecture.md)
- [API Retry Utils](../../src/utils/apiRetryUtils.ts)
- [Validation Schemas](../../src/schemas/validationSchemas.ts)

