---
type: skill
name: Documentation
description: Generate and update technical documentation
skillSlug: documentation
phases: [P, C]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# Documentation

## When to Use

Activate this skill when:
- Creating documentation for new features
- Updating existing documentation
- Writing API documentation
- Creating developer guides
- Documenting architectural decisions

## Documentation Types

| Type | Location | Purpose |
|------|----------|---------|
| Project Overview | `.context/docs/` | High-level system understanding |
| API Reference | `docs/` or inline JSDoc | Service/function usage |
| Agent Playbooks | `.context/agents/` | AI agent guidance |
| Skills | `.context/skills/` | Task-specific procedures |
| README | Root directory | Quick start guide |

## Documentation Templates

### Service Documentation

```typescript
/**
 * VacationApiService
 * 
 * Handles all vacation-related API operations with Supabase.
 * Implements circuit breaker pattern for resilience.
 * 
 * @example
 * ```typescript
 * const requests = await VacationApiService.getVacationRequests(userId);
 * ```
 * 
 * @see {@link src/utils/apiRetryUtils.ts} for retry logic
 */
export class VacationApiService {
  /**
   * Fetches vacation requests for a specific user
   * 
   * @param userId - The user's unique identifier
   * @param options - Optional query parameters
   * @param options.status - Filter by request status
   * @param options.year - Filter by year
   * @returns Promise<VacationRequest[]> - Array of vacation requests
   * @throws {ApiError} When the request fails after retries
   */
  static async getVacationRequests(
    userId: string, 
    options?: QueryOptions
  ): Promise<VacationRequest[]> {
    // implementation
  }
}
```

### Component Documentation

```typescript
/**
 * VacationRequestForm
 * 
 * Form component for submitting new vacation requests.
 * Handles validation, date range selection, and submission.
 * 
 * @component
 * @example
 * ```tsx
 * <VacationRequestForm
 *   userId={currentUser.id}
 *   onSubmit={handleSubmit}
 *   onCancel={closeModal}
 * />
 * ```
 */
interface VacationRequestFormProps {
  /** User ID for the request */
  userId: string;
  /** Callback when form is successfully submitted */
  onSubmit: (request: VacationRequest) => void;
  /** Callback when form is cancelled */
  onCancel: () => void;
  /** Initial values for editing existing request */
  initialValues?: Partial<VacationRequest>;
}
```

### Feature Documentation (Markdown)

```markdown
# Feature Name

## Overview
[Brief description of what this feature does]

## User Stories
- As a [role], I want to [action] so that [benefit]

## Architecture
[How this feature fits into the system]

## Components
- `ComponentA` - [Purpose]
- `ComponentB` - [Purpose]

## Services
- `ServiceA` - [Purpose]

## Data Flow
1. User action triggers...
2. Component calls service...
3. Service fetches from Supabase...

## Configuration
[Any environment variables or settings]

## Testing
[How to test this feature]

## Related Resources
- [Link to related docs]
```

## Documentation Standards

### Writing Style

1. **Be Concise**: Get to the point quickly
2. **Use Examples**: Show, don't just tell
3. **Keep Updated**: Documentation should match code
4. **Use Diagrams**: Mermaid diagrams for complex flows

### Mermaid Diagram Examples

```markdown
## Data Flow Diagram
​```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant S as Service
    participant DB as Supabase
    
    U->>C: Submit form
    C->>S: validateAndSubmit()
    S->>DB: insert()
    DB-->>S: result
    S-->>C: success/error
    C-->>U: Show notification
​```
```

### Documentation Checklist

- [ ] Purpose is clearly stated
- [ ] Parameters/props are documented
- [ ] Return values are documented
- [ ] Examples are provided
- [ ] Error cases are explained
- [ ] Related resources are linked
- [ ] No outdated information

## Project Documentation Structure

```
.context/
├── docs/
│   ├── README.md           # Documentation index
│   ├── project-overview.md # System overview
│   ├── architecture.md     # Architecture details
│   ├── data-flow.md        # Data flow documentation
│   ├── development-workflow.md
│   ├── testing-strategy.md
│   ├── security.md
│   ├── tooling.md
│   └── glossary.md
├── agents/                  # AI agent playbooks
└── skills/                  # Task-specific skills
```

## When to Update Documentation

| Event | Documentation to Update |
|-------|------------------------|
| New feature | Feature docs, architecture if significant |
| API change | API reference, related examples |
| Bug fix | Troubleshooting guide if applicable |
| Refactoring | Architecture, data flow if changed |
| New dependency | Tooling, setup guides |

## Related Resources

- [Project Overview](../../docs/project-overview.md)
- [Architecture](../../docs/architecture.md)
- [Development Workflow](../../docs/development-workflow.md)
