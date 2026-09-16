// Übernimmt die Konten aus dem WordPress-Export. Aufruf:
//   node scripts/import-mitglieder.mjs <pfad/zu/user_export.csv>
// Mehrfach ausführbar: Vorhandene Konten (gleiche WordPress-Nummer) bleiben unverändert.
import "./env.mjs";
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const roh = fs.readFileSync(process.argv[2], "utf8").replace(/^﻿/, "");

function zerlege(t) {
  const zeilen = []; let z = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { z.push(f); f = ""; }
    else if (c === "\n") { z.push(f.replace(/\r$/, "")); zeilen.push(z); z = []; f = ""; }
    else f += c;
  }
  if (f || z.length) { z.push(f); zeilen.push(z); }
  return zeilen;
}

const [kopf, ...daten] = zerlege(roh);
const s = (n) => kopf.indexOf(n);
const liste = daten.filter((z) => z.length > 10).map((z) => ({
  wp_id: Number(z[s("ID")]),
  email: z[s("user_email")].trim().toLowerCase(),
  benutzername: z[s("user_login")].trim(),
  anzeigename: z[s("display_name")].trim(),
  vorname: z[s("first_name")].trim(),
  nachname: z[s("last_name")].trim(),
  wp_passwort: z[s("user_pass")],
  rolle: z[s("roles")].includes("administrator") ? "admin" : "mitglied",
  registriert_am: z[s("user_registered")] || null,
})).filter((m) => m.email.includes("@"));

let neu = 0;
for (let i = 0; i < liste.length; i += 500) {
  const teil = liste.slice(i, i + 500);
  const r = await sql.query(
    `insert into mitglied (wp_id, email, benutzername, anzeigename, vorname, nachname, wp_passwort, rolle, registriert_am)
     select * from jsonb_to_recordset($1::jsonb) as x(wp_id int, email text, benutzername text, anzeigename text,
       vorname text, nachname text, wp_passwort text, rolle text, registriert_am timestamptz)
     on conflict do nothing returning id`,
    [JSON.stringify(teil)],
  );
  neu += r.length;
}
const [{ n }] = await sql`select count(*)::int as n from mitglied`;
console.log(`gelesen ${liste.length}, neu angelegt ${neu}, insgesamt ${n}`);
