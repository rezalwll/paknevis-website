# Architecture

Paknevis is a Next.js application with three deliberately separate boundaries:

1. Public product pages are rendered in `src/app/(site)` and remain useful without a database.
2. Administrative pages live under `src/app/admin` and access PostgreSQL only through `src/lib/db.ts` and domain-specific data modules.
3. The Persian text-audit engine in `src/lib/text-audit` is deterministic, side-effect free, and shared by the browser workbench and the HTTP API.

## Text-audit flow

`TextAuditWorkbench` owns user interaction and passes explicit category and severity options to `analyzePersianText`. The analyzer reads the versioned JSON catalog, preserves source offsets, produces normalized text separately, and returns a stable `1.0` report. The API route reuses the same function; it does not maintain a second implementation.

```text
textarea ─┐
          ├─> analyzePersianText ─> metrics + findings + score
POST API ─┘             │
                        └─> versioned rule catalog
```

## Dependency direction

- React components may depend on domain types and pure functions.
- Route handlers may depend on domain functions and request parsers.
- Domain functions must not import React, Next.js, the database, or browser globals.
- Database modules must not be imported by the text-audit engine.

These rules keep unit tests fast and make the editor usable even when PostgreSQL is unavailable during a static build or local review.
