// Codes für die Tricks aus dem Theater.
//
//   node scripts/codes.mjs trick <slug> <code>        gemeinsamen Code je Trick setzen
//   node scripts/codes.mjs pass <slug> <anzahl>       einzelne Pass-Codes erzeugen (CSV auf die Konsole)
//   node scripts/codes.mjs zeigen <slug> <ja|nein>    Trick in der Bibliothek zeigen oder verbergen
//   node scripts/codes.mjs stand                      Übersicht
import "./env.mjs";
import { createHash, randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const [befehl, slug, wert] = process.argv.slice(2);
const normal = (c) => c.toUpperCase().replace(/[\s-]/g, "");
const hash = (c) => createHash("sha256").update(normal(c)).digest("hex");

async function videoId() {
  const [v] = await sql`select id from video where slug = ${slug}`;
  if (!v) throw new Error(`Kein Video mit slug ${slug}`);
  return v.id;
}

if (befehl === "trick") {
  const zusatz = randomBytes(16).toString("hex");
  const s = await promisify(scrypt)(wert, zusatz, 64);
  await sql`update video set code = ${`${zusatz}:${s.toString("hex")}`} where id = ${await videoId()}`;
  console.log("Trick-Code gesetzt für", slug);
} else if (befehl === "pass") {
  const id = await videoId();
  // Ohne leicht verwechselbare Zeichen (0/O, 1/I/L).
  const zeichen = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const codes = [];
  for (let i = 0; i < Number(wert); i++) {
    const b = randomBytes(8);
    const roh = [...b].map((x) => zeichen[x % zeichen.length]).join("");
    codes.push(`${roh.slice(0, 4)}-${roh.slice(4)}`);
  }
  await sql.query(
    `insert into pass_code (code_hash, anfang, video_id)
     select h, a, $2 from jsonb_to_recordset($1::jsonb) as x(h text, a text)`,
    [JSON.stringify(codes.map((c) => ({ h: hash(c), a: normal(c).slice(0, 4) }))), id],
  );
  console.log("Code");
  for (const c of codes) console.log(c);
} else if (befehl === "zeigen") {
  await sql`update video set sichtbar = ${wert === "ja"} where id = ${await videoId()}`;
  console.log(slug, wert === "ja" ? "sichtbar" : "verborgen");
} else {
  console.table(await sql`
    select v.slug, v.sichtbar, v.code is not null as trick_code,
           count(p.*)::int as pass_codes, count(p.eingeloest_am)::int as eingeloest,
           (select count(*)::int from freischaltung f where f.video_id = v.id) as freigeschaltet
      from video v left join pass_code p on p.video_id = v.id
     group by v.id order by v.reihenfolge`);
}
