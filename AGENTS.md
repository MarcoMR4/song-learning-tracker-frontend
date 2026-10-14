# Repository guidance

## Tooling and checks
- Use **npm only**; keep `package-lock.json` in sync with `package.json`. The supported baseline is Node.js 20.19+ and npm 10.8+.
- `npm install` runs `nuxt prepare` via `postinstall`, generating `.nuxt/`. Do not edit `.nuxt/`; the root `tsconfig.json` references its generated configs.
- Commands: `npm run dev`, `npm run build`, `npm run generate`, and `npm run preview`.
- Vitest runs in watch mode by default. For an agent-friendly complete run use `npm test -- --run`; target one file with `npm test -- --run src/__tests__/utils/quasar.test.ts` (append `-t "name"` for a test name).
- There are no configured lint or typecheck scripts. Do not invent them as required checks.

## Application conventions
- Nuxt sources live in `src/` (`srcDir`); this is an SPA (`ssr: false`). Protected pages opt in with `definePageMeta({ middleware: 'auth', layout: 'system' })`; Supabase module redirects are disabled, so navigation is handled in app code.
- Configure local Supabase access with `NUXT_PUBLIC_SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_KEY`; `NUXT_PUBLIC_SITE_URL` is also read by `nuxt.config.ts`. Keep local `.env` files uncommitted.
- Keep data access layered: pages call `use*Crud` composables, composables call `src/services/supabase/*Service.ts`, and services use the shared helpers in `baseService.ts`. These services call Nuxt's `useSupabaseClient()`, so they must execute in Nuxt client context.
- `src/types/database.types.ts` is generated from the configured Supabase project by `npm run generate-supabase-types`; regenerate it for schema changes rather than hand-maintaining it.
- Quasar is installed manually in `src/plugins/quasar.client.ts`. When adding a Quasar component, plugin, or directive used globally, add its exported name to the matching list in `src/utils/quasar.ts`, or it will not be registered.

## Before changing configuration
- Check `nuxt.config.ts` and `package.json` first; this also preserves the repository instruction in `.github/copilot-instructions.md`.
