"use server";

import { createHash, randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { mailBereit, mailVerschicken } from "@/lib/mail";
import { passwortPruefen, passwortVerschluesseln } from "@/lib/auth/passwort";
import { sitzungStarten } from "@/lib/auth/sitzung";
import type { Formularstand } from "@/lib/auth/aktionen";

const GUELTIG_MINUTEN = 60;
const pruefsumme = (s: string) => createHash("sha256").update(s).digest("hex");

function seite(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://magieakademie.de";
}

/**
 * Schickt einen Link zum Neusetzen. Die Antwort ist immer gleich, egal ob es
 * die Adresse gibt, damit niemand so herausfinden kann, wer Mitglied ist.
 */
export async function linkAnfordern(_: Formularstand, formular: FormData): Promise<Formularstand> {
  const email = String(formular.get("email") ?? "").trim().toLowerCase();
  const ok = { ok: "Wenn es zu dieser Adresse ein Konto gibt, ist eine Mail mit einem Link unterwegs. Schau auch im Spam-Ordner nach." };
  if (!email.includes("@")) return { fehler: "Bitte gib deine E-Mail-Adresse ein." };
  if (!mailBereit()) {
    return { fehler: "Das Zurücksetzen per Mail ist gerade nicht verfügbar. Schreib uns an info@florianzimmer.com, wir helfen dir." };
  }

  const kennung = `link:${email}`;
  const [z] = (await db()`
    select count(*)::int as n from anmeldeversuch where kennung = ${kennung} and zeit > now() - interval '1 hour'
  `) as Array<{ n: number }>;
  if ((z?.n ?? 0) >= 3) return ok;
  await db()`insert into anmeldeversuch (kennung) values (${kennung})`;

  const [m] = (await db()`
    select id, vorname, anzeigename from mitglied where lower(email) = ${email} and aktiv
  `) as Array<{ id: string; vorname: string; anzeigename: string }>;
  if (!m) return ok;

  const schluessel = randomBytes(32).toString("hex");
  await db()`
    insert into passwort_link (schluessel_hash, mitglied_id, gueltig_bis)
    values (${pruefsumme(schluessel)}, ${m.id}, now() + ${`${GUELTIG_MINUTEN} minutes`}::interval)
  `;
  const link = `${seite()}/passwort-neu?s=${schluessel}`;
  const name = m.vorname || m.anzeigename || "";
  const hallo = name ? `Hallo ${name},` : "Hallo,";

  await mailVerschicken({
    an: email,
    betreff: "Dein neues Passwort für die Magieakademie",
    text: `${hallo}\n\nüber diesen Link setzt du ein neues Passwort. Er gilt eine Stunde:\n${link}\n\nWenn du das nicht angefordert hast, ignorier diese Mail einfach.\n\nDein Team der Magieakademie`,
    html: `<div style="background:#07060b;padding:32px;font-family:Arial,sans-serif;color:#e6e3ef">
      <p style="font-size:16px">${hallo}</p>
      <p style="font-size:16px;line-height:1.6">über diesen Button setzt du ein neues Passwort. Der Link gilt eine Stunde.</p>
      <p><a href="${link}" style="display:inline-block;background:#D4AF37;color:#07060b;padding:14px 28px;border-radius:999px;font-weight:bold;text-decoration:none">Neues Passwort setzen</a></p>
      <p style="font-size:13px;color:#a9a3bd">Wenn du das nicht angefordert hast, ignorier diese Mail einfach.</p>
      <p style="font-size:14px">Dein Team der Magieakademie</p></div>`,
  });
  return ok;
}

export async function passwortNeuSetzen(_: Formularstand, formular: FormData): Promise<Formularstand> {
  const schluessel = String(formular.get("s") ?? "");
  const passwort = String(formular.get("passwort") ?? "");
  const fehler = passwortPruefen(passwort);
  if (fehler) return { fehler };

  const [l] = (await db()`
    select mitglied_id from passwort_link
     where schluessel_hash = ${pruefsumme(schluessel)} and benutzt_am is null and gueltig_bis > now()
  `) as Array<{ mitglied_id: string }>;
  if (!l) return { fehler: "Der Link ist abgelaufen oder wurde schon benutzt. Fordere einfach einen neuen an." };

  const hash = await passwortVerschluesseln(passwort);
  await db()`update mitglied set passwort = ${hash}, wp_passwort = null where id = ${l.mitglied_id}`;
  await db()`update passwort_link set benutzt_am = now() where mitglied_id = ${l.mitglied_id} and benutzt_am is null`;
  await sitzungStarten(l.mitglied_id);
  redirect("/videos");
}
