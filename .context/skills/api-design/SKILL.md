---
type: skill
name: Api Design
description: Design RESTful APIs following best practices
skillSlug: api-design
phases: [P, R]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# API Design

## When to Use

Activate this skill when:
- Designing new Supabase tables/functions
- Creating service layer APIs
- Defining data contracts
- Planning API integrations
- Reviewing API changes

## Supabase API Design (This Project)

This project uses Supabase as Backend-as-a-Service. API design focuses on:
- Table schema design
- Row Level Security (RLS) policies
- Service layer abstraction
- Type-safe data access

### Table Design Principles

```sql
-- Standard table structure
CREATE TABLE vacation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  company_id UUID NOT NULL REFERENCES companies(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  vacation_type VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Always add RLS
ALTER TABLE vacation_requests ENABLE ROW LEVEL SECURITY;

-- User can see own requests
CREATE POLICY "Users view own requests"
ON vacation_requests FOR SELECT
USING (auth.uid() = user_id);

-- Admins can see company requests
CREATE POLICY "Admins view company requests"
ON vacation_requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.company_id = vacation_requests.company_id
    AND users.role IN ('admin', 'super_admin')
  )
);
```

### Service Layer API Design

```typescript
// src/services/vacationApiService.ts

/**
 * VacationApiService
 * 
 * Encapsulates all vacation-related data operations.
 * All methods include:
 * - Type safety
 * - Error handling
 * - Circuit breaker protection
 * - Logging
 */
export class VacationApiService {
  /**
   * Get vacation requests for current user
   */
  static async getMyRequests(
    options?: VacationQueryOptions
  ): Promise<VacationRequest[]>

  /**
   * Get vacation requests for company (admin only)
   */
  static async getCompanyRequests(
    companyId: string,
    options?: VacationQueryOptions
  ): Promise<VacationRequest[]>

  /**
   * Submit new vacation request
   */
  static async submitRequest(
    data: CreateVacationRequest
  ): Promise<VacationRequest>

  /**
   * Update request status (admin only)
   */
  static async updateStatus(
    requestId: string,
    status: VacationStatus,
    notes?: string
  ): Promise<VacationRequest>
}
```

### Type Definitions

```typescript
// src/types/vacation.ts

export interface VacationRequest {
  id: string;
  userId: string;
  companyId: string;
  startDate: string;
  endDate: string;
  status: VacationStatus;
  vacationType: VacationType;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type VacationStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'cancelled';

export type VacationType = 
  | 'annual' 
  | 'sick' 
  | 'unpaid' 
  | 'maternity' 
  | 'paternity';

export interface VacationQueryOptions {
  status?: VacationStatus;
  year?: number;
  limit?: number;
  offset?: number;
}

export interface CreateVacationRequest {
  startDate: string;
  endDate: string;
  vacationType: VacationType;
  notes?: string;
}
```

### Validation Schemas

```typescript
// src/schemas/vacationSchemas.ts
import { z } from 'zod';

export const createVacationRequestSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  vacationType: z.enum(['annual', 'sick', 'unpaid', 'maternity', 'paternity']),
  notes: z.string().max(500).optional(),
}).refine(
  data => new Date(data.endDate) >= new Date(data.startDate),
  { message: 'End date must be after start date' }
);

export const vacationQuerySchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  year: z.number().min(2020).max(2100).optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});
```

## API Design Checklist

### Data Model
- [ ] Primary key uses UUID
- [ ] Foreign keys properly defined
- [ ] Timestamps included (created_at, updated_at)
- [ ] Appropriate data types selected
- [ ] Indexes for common queries

### Security
- [ ] RLS enabled on table
- [ ] Policies cover all CRUD operations
- [ ] Multi-tenant isolation enforced
- [ ] Sensitive data properly protected

### Service Layer
- [ ] Methods are single-purpose
- [ ] Input validation with Zod
- [ ] Error handling standardized
- [ ] Circuit breaker applied
- [ ] TypeScript types defined

### Documentation
- [ ] JSDoc on all public methods
- [ ] Example usage provided
- [ ] Error cases documented
- [ ] Types exported

## Error Response Pattern

```typescript
// Standardized error handling
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Error codes
const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
```

## Related Resources

- [Architecture Documentation](../../docs/architecture.md)
- [Data Flow](../../docs/data-flow.md)
- [Security Documentation](../../docs/security.md)
- [Supabase Types](../../src/types/supabase.ts)
