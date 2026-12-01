# Testing strategy

The quality pipeline uses the smallest useful test at each boundary and reserves browser tests for behavior that needs a real DOM, navigation, or accessibility tree.

## Test layers

| Layer | Command | Responsibility |
| --- | --- | --- |
| Catalog validation | `npm run check:text-audit-rules` | Schema, unique IDs, regular-expression compilation, matching examples |
| Unit and route tests | `npm test` | Normalization, metrics, positions, scoring, filters, payload validation, API contract |
| Static analysis | `npm run lint` and `npm run typecheck` | React/Next conventions and TypeScript contracts |
| Production compile | `npm run build` | Server/client boundaries, route generation, bundling |
| Browser journey | `npm run test:e2e` | Navigation, keyboard input, filters, responsive rendering, axe |
| Dependency audit | `npm audit --audit-level=high` | Published package advisories |

## Test design rules

- Domain tests pass explicit rules to the analyzer so they do not become brittle when the catalog grows.
- Catalog examples are validated separately so every production rule still has a positive fixture.
- API tests assert status, machine-readable error code, cache policy, request correlation, and report version.
- Browser assertions use roles and labels instead of CSS implementation details.
- Axe checks fail only on serious or critical impact; lower-impact findings are reviewed during UI work.
- Tests do not require a live PostgreSQL instance unless they explicitly cover an administrative data path.

CI runs every layer from a clean `npm ci` installation and cancels superseded runs on the same branch.
