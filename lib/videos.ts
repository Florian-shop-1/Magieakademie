import "server-only";
import { createHash } from "node:crypto";
import { db } from "@/lib/db";
import { passwortStimmt, wpPasswortStimmt } from "@/lib/auth/passwort";

export interface Video {
  id: number;
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  datei: string;
  dauer: string | null;
  /** Braucht einen Code aus dem Pass. */
  mitCode: boolean;
  /** Für dieses Mitglied freigeschaltet (nur bei mitCode sinnvoll). */
  frei: boolean;
}

function baue(z: Record<string, unknown>): Video {
  const mitCode = z.mit_code === true;
  return {
    id: Number(z.id),
    slug: String(z.slug),
    titel: String(z.titel),
    beschreibung: String(z.beschreibung ?? ""),
    kategorie: String(z.kategorie ?? ""),
    datei: String(z.datei),
    dauer: (z.dauer as string) ?? null,
    mitCode,
    frei: !mitCode || z.frei === true,
  };
}

/*
  Ein Video braucht einen Code, wenn es einen gemeinsamen Trick-Code hat oder
  wenn einzelne Pass-Codes dafür angelegt sind.
*/
export async function alleVideos(mitgliedId: string): Promise<Video[]> {
  const zeilen = (await db()`
    select v.id, v.slug, v.titel, v.beschreibung, v.kategorie, v.datei, v.dauer,
           (v.code is not null or exists (select 1 from pass_code p where p.video_id = v.id)) as mit_code,
           exists (select 1 from freischaltung f where f.video_id = v.id and f.mitglied_id = ${mitgliedId}) as frei
      from video v where v.sichtbar
     order by v.reihenfolge, v.id
  `) as Array<Record<string, unknown>>;
  return zeilen.map(baue);
}

export async function videoFuerMitglied(slug: string, mitgliedId: string): Promise<Video | null> {
  const [z] = (await db()`
    select v.id, v.slug, v.titel, v.beschreibung, v.kategorie, v.datei, v.dauer,
           (v.code is not null or exists (select 1 from pass_code p where p.video_id = v.id)) as mit_code,
           exists (select 1 from freischaltung f where f.video_id = v.id and f.mitglied_id = ${mitgliedId}) as frei
      from video v where v.slug = ${slug} and v.sichtbar
  `) as Array<Record<string, unknown>>;
  return z ? baue(z) : null;
}

export function codeNormalisieren(code: string): string {
  return code.toUpperCase().replace(/[\s-]/g, "");
}

export function codeHash(code: string): string {
  return createHash("sha256").update(codeNormalisieren(code)).digest("hex");
}

/**
 * Löst einen Code ein und schaltet den passenden Trick dauerhaft frei.
 * Der Code bestimmt selbst, welcher Trick es ist; das Mitglied muss das
 * nicht wissen. Gibt den freigeschalteten Trick zurück, oder einen Grund.
 */
export async function codeEinloesen(
  code: string,
  mitgliedId: string,
): Promise<{ video: { slug: string; titel: string } } | { fehler: string }> {
  const sauber = codeNormalisieren(code);
  if (sauber.length < 3) return { fehler: "Bitte gib den Code aus deinem Pass ein." };

  // 1. Einzelner Pass-Code: nur einmal einlösbar.
  const [pass] = (await db()`
    select p.code_hash, p.eingeloest_von, v.id, v.slug, v.titel
      from pass_code p join video v on v.id = p.video_id
     where p.code_hash = ${codeHash(code)}
  `) as Array<{ code_hash: string; eingeloest_von: string | null; id: number; slug: string; titel: string }>;
  if (pass) {
    if (pass.eingeloest_von && pass.eingeloest_von !== mitgliedId) {
      return { fehler: "Dieser Code wurde schon von jemand anderem eingelöst. Melde dich bei uns, wenn das nicht stimmen kann." };
    }
    await db()`
      update pass_code set eingeloest_von = ${mitgliedId}, eingeloest_am = coalesce(eingeloest_am, now())
       where code_hash = ${pass.code_hash}
    `;
    await freischalten(mitgliedId, pass.id, `pass:${sauber.slice(0, 4)}`);
    return { video: { slug: pass.slug, titel: pass.titel } };
  }

  // 2. Gemeinsamer Code je Trick, wie auf der alten Seite. Groß- und
  //    Kleinschreibung zählt hier, weil die alten Passwörter so gesetzt sind.
  const tricks = (await db()`
    select id, slug, titel, code from video where code is not null and sichtbar
  `) as Array<{ id: number; slug: string; titel: string; code: string }>;
  for (const t of tricks) {
    const passt = t.code.startsWith("$P$")
      ? wpPasswortStimmt(code.trim(), t.code)
      : await passwortStimmt(code.trim(), t.code);
    if (passt) {
      await freischalten(mitgliedId, t.id, "trick");
      return { video: { slug: t.slug, titel: t.titel } };
    }
  }
  return { fehler: "Diesen Code kennen wir leider nicht. Prüf bitte die Schreibweise." };
}

async function freischalten(mitgliedId: string, videoId: number, quelle: string): Promise<void> {
  await db()`
    insert into freischaltung (mitglied_id, video_id, quelle)
    values (${mitgliedId}, ${videoId}, ${quelle})
    on conflict do nothing
  `;
}
