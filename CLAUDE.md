# Monorepo

Personal monorepo for life-tooling apps — meal planning, exercise, goal tracking, etc.
Built as web apps (PWAs) for cross-platform access (Mac + Android).

## Structure

- `apps/` — Individual applications (Next.js web apps)
- `packages/ui` — Shared React UI components (`@mono/ui`)
- `packages/utils` — Shared TypeScript utilities (`@mono/utils`)
- `packages/config` — Shared TypeScript/tooling configs (`@mono/config`)

## Stack

- **TypeScript** everywhere
- **pnpm workspaces** for dependency management
- **Turborepo** for build orchestration
- **Next.js** for apps (with PWA support)
- **React 19**

## Commands

- `pnpm dev` — Run all apps in dev mode
- `pnpm build` — Build everything
- `pnpm lint` — Lint all packages
- `pnpm typecheck` — Type-check all packages

## Conventions

- Workspace packages are scoped under `@mono/`
- Apps import shared packages via `@mono/ui`, `@mono/utils`, etc.
- TypeScript configs extend from `@mono/config`
