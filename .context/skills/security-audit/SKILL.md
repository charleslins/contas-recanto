---
type: skill
name: Security Audit
description: Security review checklist for code and infrastructure
skillSlug: security-audit
phases: [R, V]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Security Audit

## When to Use

Activate this skill when:
- Reviewing code for security vulnerabilities
- Auditing authentication/authorization logic
- Checking data protection compliance
- Validating RLS policies
- Reviewing infrastructure configuration

## Security Audit Checklist

### 1. Authentication & Session Management

- [ ] **Auth Flow**
  - Password requirements enforced
  - Session tokens properly managed
  - Logout clears all session data
  - Token refresh handled correctly

- [ ] **Sensitive Operations**
  - Re-authentication for critical actions
  - Rate limiting on auth endpoints
  - Account lockout after failed attempts

**Files to Review:**
- `src/contexts/AuthContext.tsx`
- `src/services/authService.ts`
- `src/hooks/useAuth.ts`

### 2. Authorization & Access Control

- [ ] **Role-Based Access**
  - Roles properly defined and checked
  - Admin functions protected
  - Employee data isolated

- [ ] **Row Level Security (Supabase)**
  - RLS enabled on all tables
  - Policies cover SELECT, INSERT, UPDATE, DELETE
  - Multi-tenant isolation enforced

**Check RLS Policies:**
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Review policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public';
```

**Files to Review:**
- `src/hooks/usePermissions.ts`
- `supabase/migrations/*.sql`

### 3. Input Validation

- [ ] **Client-Side**
  - All form inputs validated
  - Zod schemas used consistently
  - Error messages don't leak information

- [ ] **Server-Side**
  - Supabase functions validate input
  - Type coercion handled safely
  - SQL injection prevented

**Files to Review:**
- `src/schemas/validationSchemas.ts`
- `src/utils/validationSystem.ts`

### 4. Data Protection

- [ ] **Sensitive Data**
  - No secrets in code/logs
  - PII properly encrypted
  - GDPR compliance maintained

- [ ] **Data Transmission**
  - HTTPS enforced
  - API keys not exposed
  - Cookies have secure flags

**Files to Review:**
- `src/config/encryption.ts`
- `src/services/dataRetentionService.ts`
- `.env.example` (ensure no real values)

### 5. Client-Side Security

- [ ] **XSS Prevention**
  - User input sanitized before render
  - No `dangerouslySetInnerHTML` with user data
  - Content Security Policy configured

- [ ] **CSRF Protection**
  - Supabase handles via JWT
  - State-changing requests authenticated

**Search for Vulnerabilities:**
```typescript
// Look for dangerous patterns
dangerouslySetInnerHTML
innerHTML
eval(
new Function(
```

### 6. Dependency Security

- [ ] **NPM Packages**
  ```bash
  npm audit
  ```
  - No critical vulnerabilities
  - Dependencies up to date
  - Lock file committed

### 7. Error Handling

- [ ] **Error Messages**
  - No stack traces to users
  - No internal paths exposed
  - Errors logged securely

**Files to Review:**
- `src/types/error-handling.ts`
- `src/services/EnhancedErrorHandlingService.ts`

### 8. Logging & Monitoring

- [ ] **Logging**
  - No sensitive data in logs
  - Auth events logged
  - Failed access attempts tracked

**Files to Review:**
- `src/services/auditService.ts`
- `src/utils/performanceAnalytics.ts`

## Security Audit Report Template

```markdown
## Security Audit Report

**Date:** [Date]
**Auditor:** [Name/AI]
**Scope:** [What was reviewed]

### Summary
- Critical Issues: [count]
- High Issues: [count]
- Medium Issues: [count]
- Low Issues: [count]

### Critical Issues
[Issues that must be fixed immediately]

### High Issues
[Issues that should be fixed soon]

### Medium Issues
[Issues to address in regular development]

### Low Issues
[Best practice improvements]

### Recommendations
1. [Recommendation]
2. [Recommendation]

### Verification Steps
- [ ] [How to verify fixes]
```

## Common Vulnerabilities in This Project

| Risk Area | What to Check |
|-----------|---------------|
| Auth Bypass | RLS policies, role checks |
| Data Leak | API responses, error messages |
| XSS | User-generated content rendering |
| Injection | Database queries, Zod validation |
| Session | Token storage, expiration handling |

## Security Quick Checks

### Check for Hardcoded Secrets
```bash
# Search for potential secrets
rg -i "(api[_-]?key|secret|password|token)" --type ts
```

### Check for Unsafe Patterns
```bash
# Search for dangerous React patterns
rg "dangerouslySetInnerHTML" --type tsx

# Search for eval usage
rg "eval\(" --type ts
```

### Verify Environment Variables
```bash
# Ensure .env is gitignored
grep ".env" .gitignore
```

## Related Resources

- [Security Documentation](../../docs/security.md)
- [GDPR Compliance](../../src/types/gdpr.ts)
- [Auth Service](../../src/services/authService.ts)
- [Audit Service](../../src/services/auditService.ts)
