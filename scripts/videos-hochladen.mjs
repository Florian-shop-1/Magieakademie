// Lädt Videodateien in den privaten Speicher und trägt sie ein.
// Aufruf: node scripts/videos-hochladen.mjs <ordner mit mp4> <liste.json>
// liste.json: [{ datei, slug, titel, kategorie, reihenfolge, beschreibung, wp_id, sichtbar }]
// Neue Videos mit sichtbar:false bleiben verborgen, bis sie freigegeben sind.
import "./env.mjs";
import fs from "node:fs";
import path from "node:path";
import { put, head } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const [ordner, listeDatei] = process.argv.slice(2);
const liste = JSON.parse(fs.readFileSync(listeDatei, "utf8"));

for (const v of liste) {
  const pfad = `videos/${v.slug}.mp4`;
  let vorhanden = false;
  try { await head(pfad); vorhanden = true; } catch {}
  if (!vorhanden) {
    const inhalt = fs.createReadStream(path.join(ordner, v.datei));
    await put(pfad, inhalt, { access: "private", contentType: "video/mp4", multipart: true, addRandomSuffix: false });
  }
  await sql`
    insert into video (slug, titel, beschreibung, kategorie, datei, reihenfolge, wp_id, sichtbar)
    values (${v.slug}, ${v.titel}, ${v.beschreibung ?? ""}, ${v.kategorie ?? ""}, ${pfad}, ${v.reihenfolge}, ${v.wp_id ?? null}, ${v.sichtbar ?? true})
    on conflict (slug) do update set titel = excluded.titel, datei = excluded.datei, kategorie = excluded.kategorie,
      reihenfolge = excluded.reihenfolge, beschreibung = excluded.beschreibung
  `;
  console.log(vorhanden ? "schon da:" : "hochgeladen:", v.slug);
}
