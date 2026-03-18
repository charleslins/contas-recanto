---
type: skill
name: Refactoring
description: Safe code refactoring with step-by-step approach
skillSlug: refactoring
phases: [E]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Refactoring

## When to Use

Activate this skill when:
- Improving code structure without changing behavior
- Extracting reusable logic
- Reducing code duplication
- Improving performance
- Enhancing readability/maintainability

## Safe Refactoring Process

### Phase 1: Preparation

1. **Verify Test Coverage**
   ```bash
   npm run test -- --coverage
   ```
   - Ensure affected code has tests
   - Add tests if coverage is low

2. **Identify Dependencies**
   - Find all files importing the target
   - Document breaking change risks

3. **Create Refactoring Plan**
   - List specific changes
   - Estimate impact
   - Plan rollback strategy

### Phase 2: Execution

1. **Small, Incremental Changes**
   - One refactoring type at a time
   - Commit after each successful step
   - Run tests between changes

2. **Maintain Backward Compatibility**
   ```typescript
   // Step 1: Add new signature, keep old
   /** @deprecated Use getUserById instead */
   export function getUser(id: string) {
     return getUserById(id);
   }
   
   export function getUserById(id: string) {
     // new implementation
   }
   
   // Step 2: Update all usages
   // Step 3: Remove deprecated function
   ```

### Phase 3: Verification

1. **Run Full Test Suite**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

2. **Manual Verification**
   - Test affected user flows
   - Verify no visual regressions

## Common Refactoring Patterns

### Extract Service

**Before:**
```typescript
// Component with business logic
function VacationList() {
  const calculateDays = (start: Date, end: Date) => {
    // complex calculation
  };
  
  const checkEligibility = (employee: Employee) => {
    // complex rules
  };
  
  // ... component code
}
```

**After:**
```typescript
// src/services/vacationCalculatorService.ts
export class VacationCalculatorService {
  static calculateDays(start: Date, end: Date): number {
    // complex calculation
  }
  
  static checkEligibility(employee: Employee): boolean {
    // complex rules
  }
}

// Component is now clean
function VacationList() {
  const days = VacationCalculatorService.calculateDays(start, end);
  // ... component code
}
```

### Extract Hook

**Before:**
```typescript
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);
  
  // ... lots of render logic
}
```

**After:**
```typescript
// src/hooks/useDashboardData.ts
export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);
  
  return { data, loading, error };
}

// Component is now simple
function Dashboard() {
  const { data, loading, error } = useDashboardData();
  // ... render logic
}
```

### Consolidate Types

**Before:**
```typescript
// Scattered across files
interface UserData { /* ... */ }
type UserResponse = { /* ... */ }
interface IUser { /* ... */ }
```

**After:**
```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
  // ...
}

export type UserRole = 'admin' | 'employee' | 'manager';

export interface UserApiResponse {
  data: User;
  error: ApiError | null;
}
```

### Apply DRY Principle

**Before:**
```typescript
// Repeated in multiple services
const handleError = (error: unknown) => {
  console.error('API Error:', error);
  throw new Error('Operation failed');
};
```

**After:**
```typescript
// src/utils/errorHandling.ts
export function handleApiError(error: unknown, context: string): never {
  console.error(`API Error in ${context}:`, error);
  throw ErrorFactory.create('API_ERROR', { context, originalError: error });
}

// Usage in services
import { handleApiError } from '@/utils/errorHandling';
catch (error) {
  handleApiError(error, 'VacationService.getRequests');
}
```

## Refactoring Checklist

- [ ] Tests exist for code being refactored
- [ ] All tests pass before starting
- [ ] Changes are incremental and atomic
- [ ] No behavior changes introduced
- [ ] All tests pass after each change
- [ ] Code is cleaner/more maintainable
- [ ] No new linter warnings
- [ ] Documentation updated if needed

## Anti-Patterns to Fix

| Anti-Pattern | Solution |
|--------------|----------|
| God Component | Extract to smaller components + hooks |
| Prop Drilling | Use Context or compose with hooks |
| Duplicate Logic | Extract to shared service/utility |
| Mixed Concerns | Separate UI from business logic |
| Magic Numbers | Extract to constants |
| Deep Nesting | Early returns, extract functions |

## Related Resources

- [Architecture Documentation](../../docs/architecture.md)
- [Code Review Skill](../code-review/SKILL.md)
- [Test Generation Skill](../test-generation/SKILL.md)
