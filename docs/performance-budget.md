# Performance budget

The text workbench is intentionally local and deterministic. Performance reviews focus on input latency, report size, and public-page loading rather than raw rule count alone.

## Budgets

| Measure | Budget | Measurement |
| --- | ---: | --- |
| Accepted text | 20,000 UTF-16 code units | API and textarea limits |
| API body | 64,000 UTF-8 bytes | Request parser |
| Returned findings | 200 by default, 500 hard maximum | Analyzer options |
| Main-thread audit for 20k text | 100 ms on a current desktop | Browser performance profile |
| Serious/critical axe findings | 0 | Playwright axe suites |
| Production build errors | 0 | `npm run build` |

## Design choices

- Analysis runs only after an explicit action; typing does not execute every regular expression.
- `useDeferredValue` keeps result rendering from blocking higher-priority input work.
- Rules are compiled per audit today because the catalog is small and static. If profiling shows compilation dominates, cache compiled expressions by rule ID without changing report semantics.
- Findings are capped before rendering to avoid unbounded DOM growth.
- Metrics and findings are computed in a single synchronous request boundary so the UI never combines results from different text versions.

## Regression process

Profile with a representative 20,000-character Persian document, record browser and hardware, and compare the median of at least five runs. A budget exception requires a documented cause, a bounded impact, and a follow-up issue; screenshots alone are not performance evidence.
