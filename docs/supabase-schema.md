# Supabase Schema Plan

## Overview

The Supabase backend will replace the JSON data layer with a normalized relational model while keeping support for public read access (published projects) and authenticated editorial workflows. Media assets (images, documents) live in Supabase Storage using a deterministic folder structure based on the project code/slug.

Key goals:
- Support CRUD operations for projects (core attributes + metadata).
- Provide reusable asset records so the admin UI can pick from previously uploaded media.
- Ensure published projects remain queryable by the public site without exposing drafts.
- Prepare for future features such as generating company profiles with selected references.

> **Migration note**: The repository now expects the `projects.is_active` column to exist. Run the latest migration (`supabase/migrations/20251030091306_projects_schema.sql`) with `supabase db push` (or execute it manually) to add the column before enabling the “Active listing” toggle in the admin console. Until the column is present, the frontend automatically treats every record as active.

## Tables

### `projects`
- `id uuid primary key default gen_random_uuid()`
- `slug text unique not null`
- `internal_code text not null` — e.g. `PRJ-001`, used for folder naming.
- `name text not null`
- `short_description text not null`
- `client text`
- `category text`
- `status text not null` (enum-like: `draft`, `published`, `archived`)
- `priority text` (optional: `flagship`, `portfolio`, `standard`)
- `project_manager text`
- `year smallint`
- `is_active boolean not null default true` — controls whether the project is surfaced in the public “Active project references” list.
- `hero_asset_id uuid references project_assets(id) on delete set null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

> **Usage**: Primary record for each project. `internal_code` drives storage folders (`projects/{internal_code}/...`).

### `project_descriptions`
- `id bigserial primary key`
- `project_id uuid references projects(id) on delete cascade`
- `order_index smallint default 0`
- `paragraph text not null`

> **Usage**: Ordered rich text paragraphs for the long-form description.

### `project_assets`
- `id uuid primary key default gen_random_uuid()`
- `bucket text not null` (default `project_media`)
- `path text not null` — Supabase storage path (e.g. `PRJ-001/hero.webp`)
- `label text` — friendly name for admin search
- `alt_text text`
- `mime_type text`
- `size_bytes integer`
- `created_at timestamptz default now()`
- `uploaded_by uuid` (future use: reference Supabase auth user)

> **Usage**: Catalog of assets stored in Supabase Storage. Enables reuse across hero and gallery slots.

### `project_gallery_items`
- `id bigserial primary key`
- `project_id uuid references projects(id) on delete cascade`
- `asset_id uuid references project_assets(id) on delete restrict`
- `caption text`
- `order_index smallint default 0`

> **Usage**: Ordered gallery entries referencing previously uploaded assets.

### `project_tags`
- `project_id uuid references projects(id) on delete cascade`
- `tag text not null`
- Primary key `(project_id, tag)`

> **Usage**: Simple tag list mapped from JSON metadata.

### `project_relations`
- `id bigserial primary key`
- `project_id uuid references projects(id) on delete cascade`
- `related_project_id uuid references projects(id) on delete cascade`
- Unique constraint `(project_id, related_project_id)`

> **Usage**: Keeps related project links (symmetric relationships can be handled at application level).

## Storage

- Bucket `project_media` (public read).
- Folder convention: `projects/{internal_code}/{slug}/{filename}`.  
  Example: `projects/PRJ-001/banatski-dvor-storage-expansion/hero.webp`.
- Future documents (PDF, CAD exports, etc.) can share the same folder under `projects/{internal_code}/docs/`.

## Row-Level Security (RLS)

RLS enabled on all tables.

- **Public site (anon key)**
  - `projects`: allow `select` where `status = 'published'`.
  - Dependent tables (`project_descriptions`, `project_gallery_items`, `project_tags`, `project_relations`): allow `select` if parent project is published.
  - `project_assets`: allow `select` for assets referenced by published projects.

- **Admin (authenticated role)**
  - Full CRUD on all tables (policies limited to future Supabase auth roles/groups).
  - Additional policies can scope editors by ownership if needed later.

## Future Considerations

- Add audit tables or row-level timestamps for change history (helps generate release notes).
- Introduce `project_documents` table for storing PDF references used in company profile generation.
- Consider a materialized view `published_projects` to speed up public queries once dataset grows.
- Tag normalization: if tags require controlled vocabulary, create a separate `tags` lookup table with relationships.
