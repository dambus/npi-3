Admin Project CMS Workflow
==========================

Overview
--------
- Supabase email/password auth guards all `/admin/*` routes; visitors are redirected to `/admin/login`.
- `/admin/projects` lists every project (drafts, published, archived) sourced from Supabase for authenticated users.
- `/admin/projects/new` and `/admin/projects/:projectId` provide create/edit forms with hero + gallery management.
- Media uploads target the `project_media` bucket using the convention `projects/{INTERNAL_CODE}/{slug}/filename.ext`.
- Public pages (`/projects`, `/projects/:slug`, homepage teaser) fall back to the legacy JSON catalogue when Supabase is unavailable, so the site still renders while credentials are being provisioned.
- `/projects/browse` exposes a catalogue-first view with live search, filters and card/table toggles; it relies on the same Supabase dataset as the marketing pages.

Environment Requirements
------------------------
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be present in `.env` for the Supabase client.
- Admin writes rely on Supabase authentication (email/password or other supported provider) so that the runtime receives an `authenticated` session; otherwise `createProject` / `updateProject` will be rejected by RLS.
- The database must include the schema defined in `supabase/migrations/20251030091306_projects_schema.sql`, and the storage bucket `project_media` must exist with public read enabled.

Using the Admin Pages
---------------------
1. Go to `/admin/login`, enter the Supabase user credentials (email/password) and submit. Successful sign-in redirects you to the project list; the app also remembers the protected route you attempted first.
2. Visit `/admin/projects`:
   - Use **Refresh** to re-query Supabase.
   - Use **New project** to open a blank editor.
   - Toggle publish status from the list and control whether a project is **Active** (shown on the public “Active project references” grid) without leaving the table.
3. In the editor:
   - Fill in internal code and slug first; uploads are organised with these values.
   - Upload images via **Upload assets** (multiple files allowed). They appear in the asset library once the upload completes.
   - Set a hero image and assemble the gallery (supports ordering and per-image captions).
   - Save to persist (draft by default); set status to `published` when ready and use **Active listing** to hide/show the project on the public highlights without affecting its published status.
4. After saving a new project, the UI redirects to its `/admin/projects/:id` page so further edits can follow immediately.

Migrating Existing JSON Projects
--------------------------------
- Ensure Supabase schema is applied (`supabase db push` or running the migration SQL).
- Use the repository helpers to seed content:
  1. Parse `src/data/projects.json`.
  2. For each project:
     - Upload hero/gallery assets to `project_media` manually or via script (preserving folder structure).
     - Call `createProject` with the parsed metadata, providing the uploaded asset IDs for `heroAssetId` and gallery items.
- A future script (`scripts/migrate-projects.mjs`) can be added to automate this; current helpers already encapsulate the required insert logic (projects + descriptions + tags + gallery items).
- Once Supabase is populated, the JSON file can remain as cold backup or be phased out.

Forward-Looking Hooks
---------------------
- `Project` records now include creation/update timestamps, priority, and tag metadata—ready for automating “company profile + references” packages.
- `projectsRepository.ts` exposes `fetchProjectById`, `createProject`, `updateProject`, `uploadProjectAsset`, and `listProjectAssets`, providing a foundation for generating PDF exports or assembling curated reference sets.
- Gallery selections preserve ordering and captions, which can feed into templated exports (e.g., the future company profile generator).
- The media uploader centralises asset registration, so future document types (PDF, CAD) can reuse the same bucket + naming strategy.

Operational Notes
-----------------
- Local development can proceed without Supabase; the UI will render JSON data and the admin list page shows a warning when Supabase IDs are missing.
- To avoid duplicate fetches, hooks (`useProjectsQuery`, `useProjectBySlug`) memoise state internally and degrade gracefully when Supabase isn’t reachable.
- All admin routes remain hidden from primary navigation and now require a Supabase session before rendering.
- If the `projects.is_active` column has not yet been applied in Supabase, the frontend gracefully treats every project as active; once the migration runs, the active toggle starts persisting real values automatically.
