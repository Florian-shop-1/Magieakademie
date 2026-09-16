-- Tricks aus dem Florian Zimmer Theater sind immer gesperrt, bis ein Code
-- eingelöst ist. Auch dann, wenn noch kein Code angelegt ist: Die Tricks
-- sollen in der Bibliothek zu sehen sein, damit man weiß, was es gibt.
alter table video add column if not exists pass_trick boolean not null default false;
update video set pass_trick = true where kategorie = 'Trick-Packung';
