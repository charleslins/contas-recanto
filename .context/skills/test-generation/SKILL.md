---
type: skill
name: Test Generation
description: Generate comprehensive test cases for code
skillSlug: test-generation
phases: [E, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Test Generation

## When to Use

Activate this skill when:
- Creating tests for new features
- Adding test coverage to existing code
- Writing regression tests for bug fixes
- Generating E2E test scenarios

## Testing Stack

| Type | Tool | Location |
|------|------|----------|
| Unit/Integration | Vitest | `src/__tests__/` |
| E2E | Playwright (Python) | `testsprite_tests/` |
| Component | React Testing Library | `src/__tests__/components/` |

## Test File Structure

```
src/__tests__/
├── components/     # Component tests
├── hooks/          # Custom hook tests
├── services/       # Service layer tests
├── utils/          # Utility function tests
└── integration/    # Cross-module tests
```

## Unit Test Template

### Service Test
```typescript
// src/__tests__/services/vacationApiService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VacationApiService } from '@/services/vacationApiService';

describe('VacationApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getVacationRequests', () => {
    it('should return vacation requests for user', async () => {
      // Arrange
      const mockData = [{ id: '1', status: 'pending' }];
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: mockData, error: null })
      });

      // Act
      const result = await VacationApiService.getVacationRequests('user-id');

      // Assert
      expect(result).toEqual(mockData);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } })
      });

      // Act & Assert
      await expect(VacationApiService.getVacationRequests('user-id'))
        .rejects.toThrow();
    });
  });
});
```

### Hook Test
```typescript
// src/__tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  it('should return authenticated user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeDefined();
  });
});
```

### Component Test
```typescript
// src/__tests__/components/LoginModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from '@/components/common/LoginModal';

describe('LoginModal', () => {
  it('should render login form', () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
```

## E2E Test Template (Playwright/Python)

```python
# testsprite_tests/test_vacation_request.py
import pytest
from playwright.sync_api import Page, expect

class TestVacationRequest:
    def test_submit_vacation_request(self, page: Page, authenticated_user):
        """Test that user can submit a vacation request"""
        # Navigate
        page.goto("/dashboard")
        page.click("text=Request Vacation")
        
        # Fill form
        page.fill("[data-testid=start-date]", "2026-02-01")
        page.fill("[data-testid=end-date]", "2026-02-05")
        page.select_option("[data-testid=vacation-type]", "annual")
        
        # Submit
        page.click("button[type=submit]")
        
        # Assert
        expect(page.locator(".toast-success")).to_be_visible()
        expect(page.locator("text=Request submitted")).to_be_visible()
```

## Test Coverage Guidelines

| Layer | Minimum Coverage | Priority Tests |
|-------|-----------------|----------------|
| Services | 80% | API calls, error handling |
| Utils | 90% | Pure functions, edge cases |
| Hooks | 70% | State transitions, effects |
| Components | 60% | User interactions, renders |

## Running Tests

```bash
# Unit/Integration tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage report
npm run test -- --coverage

# E2E tests
cd testsprite_tests && pytest
```

## Mocking Patterns

### Supabase Mock
```typescript
vi.mock('@/utils/supabaseClient', () => ({
  getSupabaseClient: () => ({
    from: vi.fn(),
    auth: { getUser: vi.fn() }
  })
}));
```

### Translation Mock
```typescript
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' }
  })
}));
```

## Related Resources

- [Testing Strategy](../../docs/testing-strategy.md)
- [Vitest Config](../../vitest.config.ts)
- [E2E Tests](../../testsprite_tests/)
