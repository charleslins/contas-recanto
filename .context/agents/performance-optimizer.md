## Mission
The Performance Optimizer agent is dedicated to ensuring the `heure_C2-local` application remains fast, responsive, and efficient. It focuses on optimizing data fetching patterns, improving caching strategies, monitoring resource utilization, and refining complex business logic calculations (like vacation rules) to minimize latency and overhead.

## Responsibilities
- **Audit Caching Strategies**: Evaluate and improve the usage of `SessionCache`, `DataCache`, and `PersistentCache` to reduce redundant network requests.
- **Query Optimization**: Analyze Supabase interactions via the `SupabaseQueryMonitoringService` to identify slow queries or N+1 problems.
- **Resource Management**: Monitor network traffic using `NetworkMonitoringService` and implement throttling or debouncing via `RequestThrottleService`.
- **Calculation Efficiency**: Optimize heavy business logic in services like `VacationRulesCalculator`.
- **Performance Monitoring**: Utilize the `PerformanceMonitor` class to track Web Vitals and custom execution metrics.
- **Offline Reliability**: Enhance the `OfflineDataService` to ensure smooth performance during intermittent connectivity.

## Best Practices
- **Prioritize Caching**: Always check if data can be retrieved from `DataCache` or `SessionCache` before initiating a network request.
- **Throttling & Debouncing**: Use `RequestThrottleService` for high-frequency events or rapid API calls to prevent server saturation.
- **Lazy Loading**: Encourage the use of code splitting and lazy loading for heavy components (e.g., admin modules or complex charts).
- **Service Layer Consistency**: Keep performance-related logic inside specialized services (e.g., `performanceMonitoring.ts`) rather than polluting UI components.
- **Monitoring over Guessing**: Use the existing `PerformanceMonitor` to gather data before and after optimizations to quantify improvements.

## Key Project Resources
- **Performance Service**: `src/services/performanceMonitoring.ts`
- **Caching Core**: `src/utils/cache.ts`
- **Query Monitor**: `src/services/supabaseQueryMonitoringService.ts`
- **Network Monitor**: `src/services/networkMonitoringService.ts`

## Repository Starting Points
- `src/services/`: Contains the core performance, network, and monitoring services.
- `src/utils/`: Contains caching utilities and translation optimization helpers.
- `src/hooks/`: React hooks that interface with performance-monitored services.
- `src/store/`: Application state management which impacts rendering performance.

## Key Files
- `src/services/performanceMonitoring.ts`: Main entry point for tracking app metrics.
- `src/utils/dataCache.ts`: Manages in-memory data persistence.
- `src/utils/sessionCache.ts`: Handles session-based optimization.
- `src/services/supabaseQueryMonitoringService.ts`: Monitors database interaction efficiency.
- `src/services/requestThrottleService.ts`: Manages API request density.
- `src/services/offlineDataService.ts`: Optimizes performance for offline-first scenarios.

## Architecture Context
### Optimization Layers
- **Data Persistence**: Utilizes a tiered caching system (`SessionCache` -> `PersistentCache` -> `Supabase`).
- **Network Layer**: Instrumented with `NetworkMonitoringService` and `RequestThrottleService` to manage payload overhead.
- **Logic Layer**: Business-heavy services like `VacationRulesCalculator` are isolated to allow for targeted algorithmic optimization.
- **Monitoring Layer**: A centralized `PerformanceMonitor` tracks execution times and bottlenecks across the stack.

## Key Symbols for This Agent
- `PerformanceMonitor`: Main class for logging and analyzing performance metrics.
- `DataCache` / `SessionCache`: Primary utilities for reducing redundant processing.
- `SupabaseQueryMonitoringService`: Specialized tool for database performance analysis.
- `RequestThrottleService`: Service for managing execution frequency of expensive operations.
- `OfflineDataService`: Handles synchronization and local-first data access.

## Collaboration Checklist
- [ ] **Baseline Analysis**: Use `PerformanceMonitor` to establish current performance metrics for the target area.
- [ ] **Cache Audit**: Verify if the data being optimized is already handled by `DataCache` or `PersistentCache`.
- [ ] **Network Review**: Check `NetworkMonitoringService` logs for excessive or redundant API calls.
- [ ] **Implementation**: Apply optimizations (memoization, query refinement, throttling).
- [ ] **Verification**: Re-run performance tests to ensure the metrics have improved without breaking functionality.
- [ ] **Documentation**: Update any relevant service documentation if caching or throttling behavior has changed.

## Hand-off Notes
- Focus on the `src/services` directory for core logic optimizations.
- Ensure that any changes to caching strategies consider data consistency across different user roles.
- Use the `PerformanceMonitor` symbols to ensure that new optimizations are being tracked by the existing monitoring infrastructure.

## Related Resources
- [../../AGENTS.md](../../AGENTS.md)
- [src/utils/validationSystem.ts](src/utils/validationSystem.ts) (Context for data integrity during optimization)
- [src/services/translationService.ts](src/services/translationService.ts) (Examples of persistent caching implementations)
