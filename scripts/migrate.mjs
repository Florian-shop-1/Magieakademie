// Spielt alle Dateien aus migrations/ der Reihe nach ein. Aufruf: node scripts/migrate.mjs
import "./env.mjs";
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const ordner = new URL("../migrations/", import.meta.url);
for (const datei of fs.readdirSync(ordner).filter((d) => d.endsWith(".sql")).sort()) {
  const text = fs.readFileSync(new URL(datei, ordner), "utf8").replace(/--.*$/gm, "");
  for (const befehl of text.split(";").map((s) => s.trim()).filter(Boolean)) await sql.query(befehl);
  console.log("eingespielt:", datei);
}
