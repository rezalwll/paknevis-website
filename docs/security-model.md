# Security model

Paknevis separates public, administrative, and text-processing risks. This document records the controls that are enforced in the repository and the assumptions that remain deployment responsibilities.

## Public text audit

- The browser workbench evaluates text locally and does not send it to the API.
- The API accepts only JSON with a string `text` field.
- Request bytes are capped before JSON parsing and text length is capped before analysis.
- Responses use `Cache-Control: no-store` and contain no input echo beyond the normalized report field.
- Request IDs accept a restricted character set or are replaced with a generated UUID.
- Regular expressions come from a validated, repository-owned catalog; clients cannot submit patterns.

## Administrative surface

- Session tokens are stored as hashes and delivered through secure cookies in production.
- Role checks happen in server-side actions and data functions, not only in the navigation UI.
- SQL values are parameterized; schema initialization and bootstrap commands require explicit database configuration.
- Secrets belong in environment variables and `.env` files remain ignored.

## Supply chain

Dependencies are lockfile-pinned by `npm ci`. CI runs npm audit at high severity and checks the production build. Browser binaries are installed by Playwright in CI rather than committed.

## Deployment assumptions

The hosting layer must terminate TLS, restrict database network access, rotate credentials, set trusted proxy headers, and apply request-rate controls at the edge. Application limits are defense in depth, not a substitute for those controls.
