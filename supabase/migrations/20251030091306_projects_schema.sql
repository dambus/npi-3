-- Enable extensions required for UUID generation and updated_at triggers.
create extension if not exists "pgcrypto" with schema extensions;
create extension if not exists "moddatetime" with schema extensions;

-- Storage bucket for project media (public read).
insert into storage.buckets (id, name, public)
values ('project_media', 'project_media', true)
on conflict (id) do update set
  name = excluded.name,
  public = true;

-- Core projects table.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  internal_code text not null,
  name text not null,
  short_description text not null,
  client text,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  priority text check (priority in ('flagship', 'portfolio', 'standard')),
  project_manager text,
  year smallint,
  is_active boolean not null default true,
  hero_asset_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.projects
  add column if not exists is_active boolean not null default true;

-- Asset catalog (references Supabase Storage).
create table if not exists public.project_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'project_media',
  path text not null,
  label text,
  alt_text text,
  mime_type text,
  size_bytes integer,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

create unique index if not exists project_assets_bucket_path_idx on public.project_assets (bucket, path);

-- Because projects references project_assets, ensure dependent table exists before altering.
alter table public.projects
  add constraint projects_hero_asset_fk
  foreign key (hero_asset_id)
  references public.project_assets (id)
  on delete set null
  deferrable initially immediate;

-- Project descriptions (ordered paragraphs).
create table if not exists public.project_descriptions (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  order_index smallint not null default 0,
  paragraph text not null
);

create index if not exists project_descriptions_project_idx on public.project_descriptions (project_id, order_index);

-- Gallery entries linked to reusable assets.
create table if not exists public.project_gallery_items (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  asset_id uuid not null references public.project_assets(id) on delete restrict,
  caption text,
  order_index smallint not null default 0
);

create unique index if not exists project_gallery_order_idx on public.project_gallery_items (project_id, order_index, id);

-- Project tags (simple list).
create table if not exists public.project_tags (
  project_id uuid not null references public.projects(id) on delete cascade,
  tag text not null,
  primary key (project_id, tag)
);

create index if not exists project_tags_tag_idx on public.project_tags (tag);

-- Related project mapping.
create table if not exists public.project_relations (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  related_project_id uuid not null references public.projects(id) on delete cascade,
  unique (project_id, related_project_id)
);

-- Prevent self-references.
alter table public.project_relations
  add constraint project_relations_no_self_reference
  check (project_id <> related_project_id);

-- Auto-manage updated_at.
create trigger handle_projects_updated_at
before update on public.projects
for each row execute function extensions.moddatetime (updated_at);

-- Row Level Security
alter table public.projects enable row level security;
alter table public.project_assets enable row level security;
alter table public.project_descriptions enable row level security;
alter table public.project_gallery_items enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_relations enable row level security;

-- Policies: public read (published only).
create policy "Public read published projects"
  on public.projects
  for select
  to anon
  using (status = 'published');

create policy "Public read published project descriptions"
  on public.project_descriptions
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_descriptions.project_id
        and p.status = 'published'
    )
  );

create policy "Public read published project gallery"
  on public.project_gallery_items
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_gallery_items.project_id
        and p.status = 'published'
    )
  );

create policy "Public read published project tags"
  on public.project_tags
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_tags.project_id
        and p.status = 'published'
    )
  );

create policy "Public read published project relations"
  on public.project_relations
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_relations.project_id
        and p.status = 'published'
    )
  );

create policy "Public read project assets for published content"
  on public.project_assets
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.status = 'published'
        and (
          p.hero_asset_id = project_assets.id or
          exists (
            select 1
            from public.project_gallery_items g
            where g.project_id = p.id
              and g.asset_id = project_assets.id
          )
        )
    )
  );

-- Policies: authenticated manage everything.
create policy "Authenticated manage projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage project descriptions"
  on public.project_descriptions
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage project gallery"
  on public.project_gallery_items
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage project tags"
  on public.project_tags
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage project relations"
  on public.project_relations
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage project assets"
  on public.project_assets
  for all
  to authenticated
  using (true)
  with check (true);

-- Storage RLS policies.
do $$
begin
  if not exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'storage'
      and c.relname = 'objects'
      and c.relrowsecurity
  ) then
    execute 'alter table storage.objects enable row level security';
  end if;
exception
  when insufficient_privilege then
    raise notice 'Skipping enabling RLS on storage.objects because the current role lacks ownership.';
end;
$$;

create policy "Public read project media"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'project_media');

create policy "Authenticated manage project media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'project_media')
  with check (bucket_id = 'project_media');
