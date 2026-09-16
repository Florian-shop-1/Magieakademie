import "server-only";

/**
 * Mails über Brevo, wie im Ticketshop (src/lib/brevo.ts dort).
 * Der Schlüssel steht in BREVO_API_KEY und verlässt nie den Server.
 * Absender ist die bei Brevo bestätigte Adresse des Theaters.
 */
export function mailBereit(): boolean {
  return !!process.env.BREVO_API_KEY;
}

export async function mailVerschicken(m: { an: string; betreff: string; text: string; html: string }): Promise<void> {
  const schluessel = process.env.BREVO_API_KEY;
  if (!schluessel) throw new Error("BREVO_API_KEY fehlt.");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": schluessel, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Magieakademie", email: "tickets@florianzimmer.com" },
      replyTo: { email: "info@florianzimmer.com" },
      to: [{ email: m.an }],
      subject: m.betreff,
      textContent: m.text,
      htmlContent: m.html,
      tags: ["magieakademie"],
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Brevo antwortet ${res.status}`);
}

/** Magic News: "Newsletter Kontakte" in Brevo (Liste 7), wie im Ticketshop. */
const LISTE_NEWSLETTER = 7;

/**
 * Trägt ein neues Mitglied in Magic News ein, nur wenn es das Häkchen gesetzt
 * hat. Vorhandene Kontakte werden ergänzt, nicht überschrieben. Wer sich
 * früher abgemeldet hat, bleibt bei Brevo gesperrt.
 */
export async function inNewsletterEintragen(email: string, vorname: string, nachname: string): Promise<void> {
  const schluessel = process.env.BREVO_API_KEY;
  if (!schluessel) return;
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": schluessel, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email,
      attributes: {
        VORNAME: vorname,
        NACHNAME: nachname,
        OPT_IN: true,
        ANMERKUNG: `Magieakademie-Registrierung ${new Date().toLocaleDateString("de-DE")}, Häkchen Magic News gesetzt`,
      },
      listIds: [LISTE_NEWSLETTER],
      updateEnabled: true,
    }),
    signal: AbortSignal.timeout(10_000),
  });
}
