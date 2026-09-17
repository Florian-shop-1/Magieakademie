import "server-only";

/*
  Mailvorlage der Magieakademie.

  Wie die Seite: fast schwarz, Gold als Hauptfarbe, Lila als Akzent, Logo
  oben. Tabellen und Stile direkt an den Elementen, Hintergrund an jeder
  Zelle, damit Outlook und weitergeleitete Mails dunkel bleiben (so auch
  die Vorfreude-Mail im Eventmanager).

  Bilder kommen von der Vercel-Adresse, die unabhängig vom Domain-Umzug
  immer erreichbar ist.
*/

const BILDER = "https://magieakademie.vercel.app";
const SCHWARZ = "#07060b";
const FLAECHE = "#0e0c18";
const GOLD = "#D4AF37";
const LILA = "#a78bfa";
const TEXT = "#e6e3ef";
const LEISE = "#a9a3bd";

export function seitenUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://magieakademie.de";
}

function h(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export interface MailInhalt {
  /** Kurzer Text in der Vorschauzeile des Postfachs. */
  vorschau: string;
  anrede: string;
  ueberschrift: string;
  absaetze: string[];
  knopf: { text: string; link: string };
  nachKnopf?: string[];
}

export function baueMail(m: MailInhalt): { html: string; text: string } {
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
  const absatz = (t: string, farbe = TEXT) =>
    `<p style="margin:0 0 16px;font-family:${sans};font-size:16px;line-height:1.6;color:${farbe};">${h(t)}</p>`;

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" /><meta name="supported-color-schemes" content="dark" />
<title>${h(m.ueberschrift)}</title></head>
<body style="margin:0;padding:0;background-color:${SCHWARZ};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${h(m.vorschau)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${SCHWARZ}" style="background-color:${SCHWARZ};">
<tr><td align="center" bgcolor="${SCHWARZ}" style="background-color:${SCHWARZ};padding:28px 12px 40px;">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" bgcolor="${FLAECHE}" style="width:560px;max-width:100%;background-color:${FLAECHE};border:1px solid rgba(212,175,55,0.25);border-radius:14px;">
    <tr><td align="center" bgcolor="${FLAECHE}" style="background-color:${FLAECHE};padding:34px 24px 10px;">
      <img src="${BILDER}/logo-magieakademie.png" width="300" alt="Magieakademie" style="display:block;width:300px;max-width:85%;height:auto;margin:0 auto;border:0;" />
    </td></tr>
    <tr><td align="center" bgcolor="${FLAECHE}" style="background-color:${FLAECHE};padding:8px 24px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="40" height="1" bgcolor="${LILA}" style="background-color:${LILA};font-size:0;line-height:0;">&nbsp;</td>
        <td width="8" style="font-size:0;">&nbsp;</td>
        <td width="40" height="1" bgcolor="${GOLD}" style="background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
      </tr></table>
    </td></tr>
    <tr><td bgcolor="${FLAECHE}" style="background-color:${FLAECHE};padding:26px 36px 8px;">
      <h1 style="margin:0 0 20px;font-family:${serif};font-size:26px;line-height:1.25;font-weight:normal;color:${GOLD};text-align:center;">${h(m.ueberschrift)}</h1>
      ${absatz(m.anrede)}
      ${m.absaetze.map((a) => absatz(a)).join("")}
    </td></tr>
    <tr><td align="center" bgcolor="${FLAECHE}" style="background-color:${FLAECHE};padding:8px 36px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:999px;">
          <a href="${h(m.knopf.link)}" style="display:inline-block;padding:15px 34px;font-family:${sans};font-size:16px;font-weight:bold;color:${SCHWARZ};text-decoration:none;border-radius:999px;">${h(m.knopf.text)}</a>
        </td>
      </tr></table>
    </td></tr>
    <tr><td bgcolor="${FLAECHE}" style="background-color:${FLAECHE};padding:0 36px 30px;">
      ${(m.nachKnopf ?? []).map((a) => absatz(a, LEISE)).join("")}
      <p style="margin:0 0 6px;font-family:${sans};font-size:13px;line-height:1.5;color:${LEISE};">Falls der Knopf nicht geht, kopiere diesen Link in deinen Browser:</p>
      <p style="margin:0 0 22px;font-family:${sans};font-size:13px;line-height:1.5;word-break:break-all;"><a href="${h(m.knopf.link)}" style="color:${LILA};">${h(m.knopf.link)}</a></p>
      ${absatz("Dein Florian und das Team der Magieakademie")}
    </td></tr>
  </table>
  <p style="margin:18px 0 0;font-family:${sans};font-size:12px;line-height:1.6;color:${LEISE};">
    Magieakademie · Ein Projekt der Florian Zimmer Theater GmbH<br />Grethe-Weiser-Str. 2/1 · 89231 Neu-Ulm · info@florianzimmer.com
  </p>
</td></tr></table>
</body></html>`;

  const text = [
    m.anrede,
    "",
    ...m.absaetze.flatMap((a) => [a, ""]),
    `${m.knopf.text}: ${m.knopf.link}`,
    "",
    ...(m.nachKnopf ?? []).flatMap((a) => [a, ""]),
    "Dein Florian und das Team der Magieakademie",
    "",
    "--",
    "Magieakademie · Ein Projekt der Florian Zimmer Theater GmbH",
    "Grethe-Weiser-Str. 2/1 · 89231 Neu-Ulm · info@florianzimmer.com",
  ].join("\n");

  return { html, text };
}
