import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const LAENGE = 64;

/** Neues Passwort speichern: "zufallszusatz:pruefsumme" mit scrypt. */
export async function passwortVerschluesseln(passwort: string): Promise<string> {
  const zusatz = randomBytes(16).toString("hex");
  const s = (await scryptAsync(passwort, zusatz, LAENGE)) as Buffer;
  return `${zusatz}:${s.toString("hex")}`;
}

export async function passwortStimmt(passwort: string, gespeichert: string): Promise<boolean> {
  const [zusatz, erwartet] = gespeichert.split(":");
  if (!zusatz || !erwartet) return false;
  const s = (await scryptAsync(passwort, zusatz, LAENGE)) as Buffer;
  const e = Buffer.from(erwartet, "hex");
  return e.length === s.length && timingSafeEqual(s, e);
}

/*
  Alte WordPress-Passwörter.

  WordPress 5.4 speichert Passwörter mit "phpass" im tragbaren Format, zu
  erkennen am Anfang "$P$". Aufbau: "$P$", ein Zeichen für die Anzahl der
  Runden, acht Zeichen Zufallszusatz, dann 22 Zeichen Prüfsumme. Gerechnet
  wird md5(zusatz + passwort), danach so oft md5(ergebnis + passwort), wie
  die Runden vorgeben. Das hier ist eine genaue Nachbildung, damit alle
  alten Mitglieder ihr gewohntes Passwort behalten.
*/
const ITOA64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encode64(input: Buffer, count: number): string {
  let out = "";
  let i = 0;
  do {
    let value = input[i++];
    out += ITOA64[value & 0x3f];
    if (i < count) value |= input[i] << 8;
    out += ITOA64[(value >> 6) & 0x3f];
    if (i++ >= count) break;
    if (i < count) value |= input[i] << 16;
    out += ITOA64[(value >> 12) & 0x3f];
    if (i++ >= count) break;
    out += ITOA64[(value >> 18) & 0x3f];
  } while (i < count);
  return out;
}

export function wpPasswortStimmt(passwort: string, gespeichert: string): boolean {
  if (!gespeichert.startsWith("$P$") && !gespeichert.startsWith("$H$")) return false;
  if (gespeichert.length !== 34) return false;
  const runden = ITOA64.indexOf(gespeichert[3]);
  if (runden < 7 || runden > 30) return false;
  const zusatz = gespeichert.slice(4, 12);
  const pw = Buffer.from(passwort, "utf8");

  let hash = createHash("md5").update(Buffer.concat([Buffer.from(zusatz, "binary"), pw])).digest();
  for (let n = 1 << runden; n > 0; n--) {
    hash = createHash("md5").update(Buffer.concat([hash, pw])).digest();
  }
  const berechnet = gespeichert.slice(0, 12) + encode64(hash, 16);
  const a = Buffer.from(berechnet);
  const b = Buffer.from(gespeichert);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwortPruefen(passwort: string): string | null {
  if (passwort.length < 8) return "Dein Passwort braucht mindestens 8 Zeichen.";
  return null;
}
