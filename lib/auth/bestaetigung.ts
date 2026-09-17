import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { mailVerschicken, inNewsletterEintragen } from "@/lib/mail";
import { baueMail, seitenUrl } from "@/lib/mail-vorlage";

/*
  Double-Opt-in bei der Registrierung.

  Nach dem Anlegen bekommt die Person eine Mail mit einem Link. Erst der
  Klick bestätigt die Adresse; vorher ist kein Login möglich. Hat sie das
  Magic-News-Häkchen gesetzt, kommt sie erst mit diesem Klick in den
  Newsletter. Das ist zugleich die Bestätigung für Magic News.
*/

const GUELTIG_STUNDEN = 48;
export const pruefsumme = (s: string) => createHash("sha256").update(s).digest("hex");

export async function bestaetigungSchicken(mitgliedId: string): Promise<void> {
  const [m] = (await db()`
    select email, vorname, newsletter from mitglied where id = ${mitgliedId}
  `) as Array<{ email: string; vorname: string; newsletter: boolean }>;
  if (!m) return;

  const schluessel = randomBytes(32).toString("hex");
  await db()`
    insert into bestaetigung_link (schluessel_hash, mitglied_id, gueltig_bis)
    values (${pruefsumme(schluessel)}, ${mitgliedId}, now() + ${`${GUELTIG_STUNDEN} hours`}::interval)
  `;
  const link = `${seitenUrl()}/bestaetigen?s=${schluessel}`;
  const { html, text } = baueMail({
    vorschau: "Ein Klick, und du bist dabei.",
    anrede: m.vorname ? `Hallo ${m.vorname},` : "Hallo,",
    ueberschrift: "Willkommen in der Magieakademie",
    absaetze: [
      "schön, dass du dabei bist! Bitte bestätige mit einem Klick, dass diese E-Mail-Adresse dir gehört. Danach kannst du dich sofort einloggen und alle Tricks ansehen.",
      ...(m.newsletter ? ["Mit dem Klick bestätigst du auch, dass du Magic News von uns bekommen möchtest. Abmelden geht jederzeit."] : []),
    ],
    knopf: { text: "E-Mail bestätigen", link },
    nachKnopf: [`Der Link gilt ${GUELTIG_STUNDEN} Stunden. Wenn du dich nicht bei der Magieakademie angemeldet hast, ignorier diese Mail einfach, dann passiert nichts.`],
  });
  await mailVerschicken({ an: m.email, betreff: "Bitte bestätige deine Anmeldung bei der Magieakademie", text, html });
}

/** Löst den Link ein. Gibt die Mitgliedsnummer zurück oder null. */
export async function bestaetigen(schluessel: string): Promise<string | null> {
  if (!/^[0-9a-f]{64}$/.test(schluessel)) return null;
  const [l] = (await db()`
    update bestaetigung_link set benutzt_am = now()
     where schluessel_hash = ${pruefsumme(schluessel)} and benutzt_am is null and gueltig_bis > now()
     returning mitglied_id
  `) as Array<{ mitglied_id: string }>;
  if (!l) return null;

  const [m] = (await db()`
    update mitglied set email_bestaetigt_am = coalesce(email_bestaetigt_am, now())
     where id = ${l.mitglied_id}
     returning email, vorname, nachname, newsletter
  `) as Array<{ email: string; vorname: string; nachname: string; newsletter: boolean }>;
  if (m?.newsletter) {
    await inNewsletterEintragen(m.email, m.vorname, m.nachname).catch((f) => console.error("[newsletter]", f));
  }
  return l.mitglied_id;
}
