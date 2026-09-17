// Legt einen Trick mit schriftlicher Anleitung an oder aktualisiert ihn.
//   node scripts/anleitung.mjs <slug> "<Titel>" <inhalte/datei.md> [kategorie] [reihenfolge]
// Der Trick ist ein Pass-Trick (gesperrt bis zum Code). Code danach mit scripts/codes.mjs setzen.
import "./env.mjs";
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const [slug, titel, datei, kategorie = "Trick-Packung", reihenfolge = "30"] = process.argv.slice(2);
const text = fs.readFileSync(datei, "utf8");
const sql = neon(process.env.DATABASE_URL);
await sql`
  insert into video (slug, titel, kategorie, anleitung, reihenfolge, pass_trick, sichtbar)
  values (${slug}, ${titel}, ${kategorie}, ${text}, ${Number(reihenfolge)}, true, true)
  on conflict (slug) do update set titel = excluded.titel, anleitung = excluded.anleitung, kategorie = excluded.kategorie
`;
console.log("Anleitung gespeichert:", slug);
