---
type: skill
name: Bug Investigation
description: Systematic bug investigation and root cause analysis
skillSlug: bug-investigation
phases: [E, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Bug Investigation

## When to Use

Activate this skill when:
- User reports unexpected behavior or errors
- Error logs/stack traces need analysis
- Performance degradation needs investigation
- Data inconsistencies are detected
- Integration failures occur with Supabase or external services

## Investigation Framework

### Phase 1: Symptom Collection

1. **Gather Information**
   - Exact error message or unexpected behavior
   - Steps to reproduce
   - Environment (dev/staging/prod)
   - User role and permissions context
   - Browser/device if frontend issue

2. **Check Logs & Monitoring**
   - Browser console for frontend errors
   - Supabase dashboard for database errors
   - `PerformanceMonitor` metrics in `src/services/performanceMonitoring.ts`
   - Circuit breaker states in `src/utils/apiRetryUtils.ts`

### Phase 2: Root Cause Analysis

1. **Isolate the Layer**
   ```
   UI Component → Hook → Service → Supabase/API
   ```
   
2. **Key Files to Check by Issue Type**

   | Issue Type | Primary Files |
   |------------|---------------|
   | Auth/Login | `src/contexts/AuthContext.tsx`, `src/services/authService.ts` |
   | Data Fetch | `src/services/*ApiService.ts`, `src/utils/apiRetryUtils.ts` |
   | Validation | `src/schemas/validationSchemas.ts`, `src/utils/validationSystem.ts` |
   | UI/Render | Component file, related hooks in `src/hooks/` |
   | Realtime | `src/services/realtimeConnectionService.ts` |
   | Translation | `src/utils/autoTranslation.ts`, `src/services/translationService.ts` |

3. **Common Root Causes in This Project**
   - Circuit breaker tripped (`CircuitBreakerError`)
   - RLS policy blocking data access
   - Missing or expired auth token
   - Translation key not found
   - Invalid Zod schema validation
   - **🔴 Blank White Screen — Silent Killers:**
     - `opacity-0` with non-existent animation CSS classes (content stays invisible)
     - `<div>` inside `<tbody>` — invalid DOM nesting causes React tree unmount
     - `useEffect` dependency loop — state updated inside the effect listed in deps array
     - Loading state never resolves — `setLoading(false)` not called in early return / error paths

### Phase 3: Verification

1. **Create Minimal Reproduction**
   - Isolate the failing code path
   - Write a test case in `src/__tests__/` if missing

2. **Verify Fix Doesn't Break Others**
   ```bash
   npm run test
   npm run lint
   ```

3. **Check Related Functionality**
   - Review dependent components/services
   - Ensure error handling is consistent

## Project-Specific Debugging Tools

### Circuit Breaker Status
```typescript
import { getCircuitBreakerStatus } from '@/utils/apiRetryUtils';
console.log(getCircuitBreakerStatus());
```

### Supabase Query Monitor
```typescript
import { supabaseQueryMonitor } from '@/services/supabaseQueryMonitoringService';
supabaseQueryMonitor.getMetrics();
```

### Validation Debugging
```typescript
import { ValidationSystem } from '@/utils/validationSystem';
const result = ValidationSystem.validate(data, schema);
console.log(result.errors);
```

## Bug Report Template

```markdown
## Bug Description
[Clear description of the issue]

## Steps to Reproduce
1. ...
2. ...

## Expected vs Actual Behavior
- Expected: ...
- Actual: ...

## Root Cause
[Technical explanation]

## Fix Applied
[Code changes made]

## Verification
- [ ] Unit test added/updated
- [ ] Manual testing passed
- [ ] No regression in related features
```

## Related Resources

- [Error Handling Types](../../src/types/error-handling.ts)
- [API Retry Utilities](../../src/utils/apiRetryUtils.ts)
- [Validation System](../../src/utils/validationSystem.ts)
