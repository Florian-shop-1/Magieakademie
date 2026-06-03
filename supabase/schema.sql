-- ============================================================
-- MAGIEAKADEMIE — Supabase Schema
-- Im Supabase Dashboard unter SQL Editor ausführen
-- ============================================================

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  vorname text not null,
  nachname text not null,
  kuenstlername text,
  stadt text not null,
  erfahrungslevel text check (erfahrungslevel in ('anfaenger','fortgeschritten','profi')) not null default 'anfaenger',
  webseite text,
  instagram text,
  vorstellungstext text,
  lieblingsbereich text[] default '{}',
  applaus_gesamt integer default 0,
  avatar_url text,
  rolle text check (rolle in ('mitglied','admin')) default 'mitglied',
  created_at timestamp with time zone default now()
);

-- Posts (Community Feed)
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  titel text not null,
  inhalt text not null,
  kategorie text not null,
  bild_url text,
  video_url text,
  feedback_gewuenscht boolean default false,
  applaus integer default 0,
  kommentar_anzahl integer default 0,
  created_at timestamp with time zone default now()
);

-- Kommentare
create table public.kommentare (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  inhalt text not null,
  created_at timestamp with time zone default now()
);

-- Applaus (Likes)
create table public.applaus (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  unique(post_id, user_id)
);

-- Produkte
create table public.produkte (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  beschreibung text not null,
  wow_satz text,
  preis_cents integer not null,
  kategorie text not null,
  schwierigkeit text not null,
  altersempfehlung text,
  bild_url text,
  lagerbestand integer default 0,
  aktiv boolean default true,
  created_at timestamp with time zone default now()
);

-- Bestellungen
create table public.bestellungen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  vorname text not null,
  nachname text not null,
  strasse text not null,
  plz text not null,
  ort text not null,
  land text default 'DE',
  status text check (status in ('ausstehend','bezahlt','versendet','abgeschlossen','storniert')) default 'ausstehend',
  gesamt_cents integer not null,
  stripe_session_id text,
  created_at timestamp with time zone default now()
);

-- Bestellpositionen
create table public.bestellpositionen (
  id uuid primary key default gen_random_uuid(),
  bestellung_id uuid references public.bestellungen(id) on delete cascade not null,
  produkt_id uuid references public.produkte(id) on delete set null,
  produkt_name text not null,
  menge integer not null,
  preis_cents integer not null
);

-- Treffen
create table public.treffen (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  beschreibung text not null,
  datum date not null,
  uhrzeit text not null,
  max_teilnehmer integer not null default 20,
  ort text default 'Florian Zimmer Theater, Neu-Ulm',
  created_at timestamp with time zone default now()
);

-- Treffen Anmeldungen
create table public.treffen_anmeldungen (
  id uuid primary key default gen_random_uuid(),
  treffen_id uuid references public.treffen(id) on delete cascade not null,
  name text not null,
  email text not null,
  erfahrungslevel text not null,
  woran_arbeiten text,
  created_at timestamp with time zone default now()
);

-- ── Row Level Security ─────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.kommentare enable row level security;
alter table public.applaus enable row level security;
alter table public.produkte enable row level security;
alter table public.bestellungen enable row level security;
alter table public.treffen enable row level security;
alter table public.treffen_anmeldungen enable row level security;

-- Profiles: jeder kann lesen, nur eigenes bearbeiten
create policy "profiles_public_read" on public.profiles for select using (true);
create policy "profiles_own_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- Posts: eingeloggte lesen + erstellen
create policy "posts_auth_read" on public.posts for select using (auth.uid() is not null);
create policy "posts_auth_insert" on public.posts for insert with check (auth.uid() = user_id);
create policy "posts_own_delete" on public.posts for delete using (auth.uid() = user_id);

-- Kommentare
create policy "kommentare_auth_read" on public.kommentare for select using (auth.uid() is not null);
create policy "kommentare_auth_insert" on public.kommentare for insert with check (auth.uid() = user_id);

-- Produkte: jeder lesen, admin schreiben
create policy "produkte_public_read" on public.produkte for select using (aktiv = true);

-- Treffen: jeder lesen
create policy "treffen_public_read" on public.treffen for select using (true);
create policy "treffen_anmeldungen_insert" on public.treffen_anmeldungen for insert with check (true);

-- ── Trigger: Profil nach Signup ────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, vorname, nachname, stadt)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'vorname', ''),
    coalesce(new.raw_user_meta_data->>'nachname', ''),
    coalesce(new.raw_user_meta_data->>'stadt', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
