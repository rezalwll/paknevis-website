# Paknevis Website

Production website and Persian editorial workbench built with the Next.js App Router, strict TypeScript, Tailwind CSS, and PostgreSQL.

## Highlights

- Persian-first public product experience with RTL navigation and responsive download, pricing, help, and blog pages.
- Role-aware administration for messages, help content, plans, profiles, and users.
- Deterministic Persian text-audit engine shared by `/tools/text-audit` and `POST /api/text-audit`.
- Versioned catalog with 59 validated rules for characters, digits, punctuation, spacing, spelling, and style.
- Unit, API, production-build, Playwright, and axe quality gates.
- Audited dependency tree with a reproducible npm lockfile.

## Stack

- Next.js 16 and React 19
- TypeScript 5.9 in strict mode
- Tailwind CSS 4
- PostgreSQL through `pg`
- Vitest 4 and Playwright 1.62

## Quick start

```bash
npm ci
npm run dev
```

The public pages and text workbench run without PostgreSQL. Administrative and persistence-backed features require the environment below.

## Environment setup

Create local `.env` from `.env.example` and set real values:

```bash
cp .env.example .env
```

Required database and bootstrap variables:

- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `ADMIN_BOOTSTRAP_FULL_NAME`

## Security notes

- Never commit real secrets to git.
- Treat previously exposed credentials as compromised and rotate them.
- Keep production credentials in your deployment secret manager.
- Keep text-audit API responses uncached and preserve the request-size limits.

## Quality commands

```bash
npm run check:encoding
npm run check:text-audit-rules
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm audit --audit-level=high
```

The GitHub Actions workflow runs the same sequence from a clean installation.

## Admin bootstrap

After setting environment variables:

```bash
npm run bootstrap:admin
```

This creates the initial admin account used for `/admin/login`.

## Engineering documentation

- [Architecture](docs/architecture.md)
- [Text-audit API](docs/text-audit-api.md)
- [Rule authoring](docs/rule-authoring.md)
- [Accessibility](docs/accessibility.md)
- [Testing strategy](docs/testing-strategy.md)
- [Security model](docs/security-model.md)
- [Performance budget](docs/performance-budget.md)
- [Persian localization](docs/localization.md)
