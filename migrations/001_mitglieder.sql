-- Mitglieder, Videos und Passwort-Links der Magieakademie.
--
-- Die Mitglieder kommen aus der alten WordPress-Seite. Ihr altes Passwort
-- steht als WordPress-Prüfsumme in wp_passwort. Beim ersten erfolgreichen
-- Login wird es in passwort neu gespeichert und wp_passwort geleert. So
-- melden sich alle mit ihrem gewohnten Passwort an, ohne etwas neu zu setzen.

create extension if not exists pgcrypto;

create table if not exists mitglied (
  id              uuid primary key default gen_random_uuid(),
  wp_id           int unique,
  email           text not null,
  benutzername    text,
  anzeigename     text not null default '',
  vorname         text not null default '',
  nachname        text not null default '',
  passwort        text,
  wp_passwort     text,
  newsletter      boolean not null default false,
  rolle           text not null default 'mitglied' check (rolle in ('mitglied', 'admin')),
  aktiv           boolean not null default true,
  registriert_am  timestamptz not null default now(),
  letzter_login   timestamptz
);
create unique index if not exists mitglied_email on mitglied (lower(email));
create unique index if not exists mitglied_benutzername on mitglied (lower(benutzername));

-- Fehlversuche, damit niemand Passwörter durchprobiert.
create table if not exists anmeldeversuch (
  kennung   text not null,
  zeit      timestamptz not null default now()
);
create index if not exists anmeldeversuch_kennung on anmeldeversuch (kennung, zeit);

-- Einmal-Links für "Passwort vergessen". Gespeichert wird nur die Prüfsumme
-- des Schlüssels, nie der Schlüssel selbst.
create table if not exists passwort_link (
  schluessel_hash text primary key,
  mitglied_id     uuid not null references mitglied(id) on delete cascade,
  gueltig_bis     timestamptz not null,
  benutzt_am      timestamptz
);

create table if not exists video (
  id              serial primary key,
  slug            text not null unique,
  titel           text not null,
  beschreibung    text not null default '',
  kategorie       text not null default '',
  -- Pfad im privaten Videospeicher (Vercel Blob).
  datei           text not null,
  vorschaubild    text,
  dauer           text,
  nur_mitglieder  boolean not null default true,
  -- Einige Tricks sind zusätzlich mit dem Code aus der Trick-Packung
  -- geschützt (auf der alten Seite ein eigenes Passwort je Beitrag).
  -- Gespeichert wird nur die Prüfsumme, wie bei Passwörtern.
  code            text,
  sichtbar        boolean not null default true,
  reihenfolge     int not null default 0,
  wp_id           int unique,
  erstellt_am     timestamptz not null default now()
);
