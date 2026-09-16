import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

/**
 * Anmeldung über ein signiertes Cookie, wie im Eventmanager.
 *
 * Im Cookie stehen nur die Mitgliedsnummer, die Ablaufzeit und eine
 * Unterschrift. Wer etwas daran ändert, ist abgemeldet. Das Cookie ist für
 * JavaScript im Browser nicht lesbar.
 */

const COOKIE = "ma_sitzung";
const TAGE = 60;

export interface Mitglied {
  id: string;
  email: string;
  anzeigename: string;
  vorname: string;
  rolle: "mitglied" | "admin";
}

function geheimnis(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET fehlt oder ist zu kurz.");
  return s;
}

export function unterschreiben(inhalt: string): string {
  return createHmac("sha256", geheimnis()).update(inhalt).digest("hex");
}

export function unterschriftStimmt(inhalt: string, unterschrift: string): boolean {
  const a = Buffer.from(unterschrift);
  const b = Buffer.from(unterschreiben(inhalt));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function sitzungStarten(mitgliedId: string): Promise<void> {
  const ablauf = Date.now() + TAGE * 86_400_000;
  const inhalt = `${mitgliedId}.${ablauf}`;
  (await cookies()).set(COOKIE, `${inhalt}.${unterschreiben(inhalt)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TAGE * 86_400,
  });
}

export async function sitzungBeenden(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

async function idAusCookie(): Promise<string | null> {
  const wert = (await cookies()).get(COOKIE)?.value;
  const teile = wert?.split(".");
  if (!teile || teile.length !== 3) return null;
  const [id, ablauf, unterschrift] = teile;
  if (!unterschriftStimmt(`${id}.${ablauf}`, unterschrift)) return null;
  if (Number(ablauf) < Date.now()) return null;
  return id;
}

/** Das angemeldete Mitglied, oder null. Fragt die Datenbank, damit Sperren sofort wirken. */
export async function angemeldetesMitglied(): Promise<Mitglied | null> {
  const id = await idAusCookie();
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) return null;
  try {
    const [m] = (await db()`
      select id, email, anzeigename, vorname, rolle from mitglied where id = ${id} and aktiv
    `) as Array<Record<string, unknown>>;
    if (!m) return null;
    return {
      id: String(m.id),
      email: String(m.email),
      anzeigename: String(m.anzeigename ?? ""),
      vorname: String(m.vorname ?? ""),
      rolle: m.rolle === "admin" ? "admin" : "mitglied",
    };
  } catch {
    return null;
  }
}

/** Für Seiten, die nur Mitglieder sehen: sonst zum Login, danach zurück. */
export async function mitgliedPflicht(zurueck: string): Promise<Mitglied> {
  const m = await angemeldetesMitglied();
  if (!m) redirect(`/login?weiter=${encodeURIComponent(zurueck)}`);
  return m;
}

/** Nur Pfade innerhalb der Seite als Ziel nach dem Login zulassen. */
export function sicheresZiel(ziel: string | null | undefined): string {
  if (!ziel || !ziel.startsWith("/") || ziel.startsWith("//") || ziel.includes("\\")) return "/videos";
  return ziel;
}
