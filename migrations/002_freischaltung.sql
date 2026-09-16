-- Freigeschaltete Tricks gehören zum Konto, nicht zum Gerät.
--
-- Wer im Theater einen Zaubertrick mit Pass bekommt, gibt den Code einmal
-- ein. Danach steht der Trick dauerhaft in seiner Bibliothek, auf jedem
-- Gerät, mit dem er sich anmeldet.
--
-- Zwei Arten von Codes:
--   1. Ein gemeinsamer Code je Trick (video.code), wie auf der alten Seite.
--   2. Einzelne Codes je Pass (pass_code), jeder nur einmal einlösbar. So
--      bringt ein weitergegebener Code nur einer Person etwas.

create table if not exists freischaltung (
  mitglied_id   uuid not null references mitglied(id) on delete cascade,
  video_id      int  not null references video(id) on delete cascade,
  freigeschaltet_am timestamptz not null default now(),
  -- Welcher Code es war: 'trick' für den gemeinsamen, sonst die Pass-Nummer.
  quelle        text not null default 'trick',
  primary key (mitglied_id, video_id)
);

create table if not exists pass_code (
  -- Prüfsumme des Codes (sha256 über Großbuchstaben ohne Leerzeichen).
  code_hash     text primary key,
  -- Die ersten Zeichen, damit man einen Code im Gespräch wiederfindet.
  anfang        text not null,
  video_id      int  not null references video(id) on delete cascade,
  eingeloest_von uuid references mitglied(id) on delete set null,
  eingeloest_am timestamptz,
  erstellt_am   timestamptz not null default now()
);
create index if not exists pass_code_video on pass_code (video_id);
