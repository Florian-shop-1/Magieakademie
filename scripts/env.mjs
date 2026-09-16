import fs from "node:fs";
// Liest .env.local, ohne ein weiteres Paket.
for (const zeile of fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const i = zeile.indexOf("=");
  if (i < 1 || zeile.startsWith("#")) continue;
  const name = zeile.slice(0, i).trim();
  if (!process.env[name]) process.env[name] = zeile.slice(i + 1).trim().replace(/^"|"$/g, "");
}
