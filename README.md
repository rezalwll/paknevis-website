# Paknevis Website (Next.js 15)

Production website built with Next.js App Router, TypeScript, Tailwind CSS, and PostgreSQL.

## Stack
- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- PostgreSQL (`pg`)

## Environment Setup
Create local `.env` from `.env.example` and set real values:

```bash
cp .env.example .env
```

Required variables:
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `ADMIN_BOOTSTRAP_FULL_NAME`

## Security Notes
- Never commit real secrets to git.
- Treat previously exposed credentials as compromised and rotate them.
- Keep production credentials in your deployment secret manager.

## Commands
```bash
npm run dev
npm run lint
npm run typecheck
npm run check:encoding
npm run build
npm run bootstrap:admin
```

## Text Encoding Policy
- Keep `ts/tsx` source files in UTF-8.
- Avoid saving code files with legacy encodings.
- Run `npm run check:encoding` before commit to catch mojibake patterns.

## Admin Bootstrap
After setting environment variables:

```bash
npm run bootstrap:admin
```

This creates the initial admin account used for `/admin/login`.
