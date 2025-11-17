-- Allow projects.slug to be nullable and keep uniqueness only when present.

alter table public.projects
  drop constraint if exists projects_slug_key;

alter table public.projects
  alter column slug drop not null;

create unique index if not exists projects_slug_unique_not_null
  on public.projects (slug)
  where slug is not null;
