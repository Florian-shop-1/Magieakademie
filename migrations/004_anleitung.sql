-- Tricks können eine schriftliche Anleitung haben, mit oder ohne Video.
-- FZ-System gab es auf der alten Seite nur als Text.
alter table video alter column datei drop not null;
alter table video add column if not exists anleitung text;
