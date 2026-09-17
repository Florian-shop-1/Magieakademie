"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { passwortPruefen, passwortStimmt, passwortVerschluesseln, wpPasswortStimmt } from "@/lib/auth/passwort";
import { sicheresZiel, sitzungBeenden, sitzungStarten } from "@/lib/auth/sitzung";
import { mailBereit } from "@/lib/mail";
import { bestaetigungSchicken } from "@/lib/auth/bestaetigung";

export interface Formularstand {
  fehler?: string;
  ok?: string;
  /** Konto noch nicht bestätigt: die Seite bietet an, die Mail neu zu schicken. */
  unbestaetigt?: string;
}

const MAX_FEHLVERSUCHE = 8;

async function zuVieleVersuche(kennung: string): Promise<boolean> {
  const [z] = (await db()`
    select count(*)::int as n from anmeldeversuch
     where kennung = ${kennung} and zeit > now() - interval '15 minutes'
  `) as Array<{ n: number }>;
  return (z?.n ?? 0) >= MAX_FEHLVERSUCHE;
}

/**
 * Anmelden mit E-Mail oder altem Benutzernamen.
 *
 * Wer noch das alte WordPress-Passwort hat, wird damit hereingelassen. Das
 * Passwort wird dabei sofort im neuen Verfahren gespeichert und die alte
 * Prüfsumme gelöscht.
 */
export async function anmelden(_: Formularstand, formular: FormData): Promise<Formularstand> {
  const kennung = String(formular.get("kennung") ?? "").trim().toLowerCase();
  const passwort = String(formular.get("passwort") ?? "");
  const weiter = sicheresZiel(String(formular.get("weiter") ?? ""));
  if (!kennung || !passwort) return { fehler: "Bitte gib deine E-Mail und dein Passwort ein." };

  if (await zuVieleVersuche(kennung)) {
    return { fehler: "Zu viele Versuche. Warte bitte 15 Minuten oder setz dein Passwort zurück." };
  }

  const [m] = (await db()`
    select id, email, passwort, wp_passwort, email_bestaetigt_am from mitglied
     where aktiv and (lower(email) = ${kennung} or lower(benutzername) = ${kennung})
     limit 1
  `) as Array<{ id: string; email: string; passwort: string | null; wp_passwort: string | null; email_bestaetigt_am: Date | null }>;

  let richtig = false;
  if (m?.passwort) richtig = await passwortStimmt(passwort, m.passwort);
  else if (m?.wp_passwort) {
    richtig = wpPasswortStimmt(passwort, m.wp_passwort);
    if (richtig) {
      const neu = await passwortVerschluesseln(passwort);
      await db()`update mitglied set passwort = ${neu}, wp_passwort = null where id = ${m.id}`;
    }
  }

  if (!m || !richtig) {
    await db()`insert into anmeldeversuch (kennung) values (${kennung})`;
    return { fehler: "E-Mail oder Passwort stimmt nicht." };
  }

  if (!m.email_bestaetigt_am) {
    return {
      fehler: "Bitte bestätige zuerst deine E-Mail-Adresse. Den Link haben wir dir nach der Anmeldung geschickt.",
      unbestaetigt: m.email,
    };
  }

  await db()`update mitglied set letzter_login = now() where id = ${m.id}`;
  await db()`delete from anmeldeversuch where kennung = ${kennung}`;
  await sitzungStarten(m.id);
  redirect(weiter);
}

export async function abmelden(): Promise<void> {
  await sitzungBeenden();
  redirect("/");
}

export async function registrieren(_: Formularstand, formular: FormData): Promise<Formularstand> {
  const vorname = String(formular.get("vorname") ?? "").trim().slice(0, 80);
  const nachname = String(formular.get("nachname") ?? "").trim().slice(0, 80);
  const email = String(formular.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const passwort = String(formular.get("passwort") ?? "");
  const newsletter = formular.get("newsletter") === "ja";

  if (!vorname) return { fehler: "Bitte gib deinen Vornamen ein." };
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) return { fehler: "Bitte gib eine gültige E-Mail-Adresse ein." };
  const pwFehler = passwortPruefen(passwort);
  if (pwFehler) return { fehler: pwFehler };

  if (!mailBereit()) {
    return { fehler: "Die Anmeldung ist gleich wieder möglich. Schau bitte in ein paar Minuten noch einmal vorbei." };
  }

  const [vorhanden] = (await db()`
    select id, email_bestaetigt_am from mitglied where lower(email) = ${email}
  `) as Array<{ id: string; email_bestaetigt_am: Date | null }>;
  if (vorhanden?.email_bestaetigt_am) {
    return { fehler: "Mit dieser E-Mail gibt es schon ein Konto. Melde dich einfach an oder setz dein Passwort zurück." };
  }

  const hash = await passwortVerschluesseln(passwort);
  const anzeigename = [vorname, nachname].filter(Boolean).join(" ");
  let id = vorhanden?.id;
  if (id) {
    // Unbestätigte Anmeldung mit derselben Adresse: Angaben erneuern, neuen Link schicken.
    await db()`
      update mitglied set anzeigename = ${anzeigename}, vorname = ${vorname}, nachname = ${nachname},
             passwort = ${hash}, newsletter = ${newsletter}
       where id = ${id}
    `;
  } else {
    const [neu] = (await db()`
      insert into mitglied (email, anzeigename, vorname, nachname, passwort, newsletter)
      values (${email}, ${anzeigename}, ${vorname}, ${nachname}, ${hash}, ${newsletter})
      returning id
    `) as Array<{ id: string }>;
    id = neu.id;
  }

  try {
    await bestaetigungSchicken(id);
  } catch (f) {
    console.error("[bestaetigung]", f);
    return { fehler: "Die Bestätigungsmail konnte gerade nicht verschickt werden. Versuch es bitte gleich noch einmal." };
  }
  return { ok: email };
}

/** Bestätigungsmail neu schicken, etwa aus dem Login heraus. Antwort immer gleich. */
export async function bestaetigungNeu(_: Formularstand, formular: FormData): Promise<Formularstand> {
  const email = String(formular.get("email") ?? "").trim().toLowerCase();
  const ok = { ok: "Wenn es zu dieser Adresse eine offene Anmeldung gibt, ist eine neue Mail unterwegs." };
  if (!email.includes("@") || !mailBereit()) return ok;
  const kennung = `bestaetigung:${email}`;
  const [z] = (await db()`
    select count(*)::int as n from anmeldeversuch where kennung = ${kennung} and zeit > now() - interval '1 hour'
  `) as Array<{ n: number }>;
  if ((z?.n ?? 0) >= 3) return ok;
  await db()`insert into anmeldeversuch (kennung) values (${kennung})`;
  const [m] = (await db()`
    select id from mitglied where lower(email) = ${email} and email_bestaetigt_am is null and aktiv
  `) as Array<{ id: string }>;
  if (m) await bestaetigungSchicken(m.id).catch((f) => console.error("[bestaetigung]", f));
  return ok;
}
