# Frontend Standards

## Goals
- Keep UI code modular, readable, and easy to evolve without regressions.
- Keep route/API behavior stable while improving implementation quality.

## Guardrails
- Prefer components under `300-400` lines; split larger files by concern.
- Move heavy static content arrays out of page files into typed config/content modules.
- Avoid adding new `any` in frontend files.
- Keep business logic in hooks/utilities; keep page components focused on composition.

## Structure
- `src/app/.../page.tsx`: route composition only.
- `src/features/<feature>/...`: feature-specific hooks/content/view-model.
- `src/components/ui/...`: shared primitive UI components.
- `src/components/layout/...`: cross-page layout/navigation.
- `src/config/...`: app-wide typed config (e.g., navigation).

## PR Checklist
- `npx tsc --noEmit` passes.
- `npm run lint` passes.
- Changed pages are smoke-tested in mobile/tablet/desktop breakpoints.
- No route/API contract breakage.

