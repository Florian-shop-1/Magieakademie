import { get } from "@vercel/blob";
import { angemeldetesMitglied } from "@/lib/auth/sitzung";
import { videoFuerMitglied } from "@/lib/videos";

/**
 * Liefert ein Video aus dem privaten Speicher, nur an angemeldete Mitglieder.
 *
 * Die Dateien liegen privat bei Vercel Blob, es gibt also keinen offenen
 * Link, den man weitergeben könnte. Der Browser fragt Videos in Stücken an
 * (Range), damit man vorspulen kann. Diese Anfrage wird durchgereicht.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const mitglied = await angemeldetesMitglied();
  if (!mitglied) return new Response("Bitte einloggen.", { status: 401 });

  const { slug } = await params;
  const video = await videoFuerMitglied(slug, mitglied.id);
  if (!video?.datei) return new Response("Nicht gefunden.", { status: 404 });
  if (!video.frei) {
    return new Response("Dieser Trick braucht den Code aus der Packung.", { status: 403 });
  }

  const range = request.headers.get("range");
  const ergebnis = await get(video.datei, {
    access: "private",
    headers: range ? { range } : undefined,
  });
  if (!ergebnis || ergebnis.statusCode !== 200) return new Response("Nicht gefunden.", { status: 404 });

  const kopf = new Headers();
  for (const name of ["content-type", "content-length", "content-range", "etag", "last-modified"]) {
    const wert = ergebnis.headers.get(name);
    if (wert) kopf.set(name, wert);
  }
  kopf.set("accept-ranges", "bytes");
  kopf.set("cache-control", "private, no-store");

  return new Response(ergebnis.stream, {
    status: ergebnis.headers.get("content-range") ? 206 : 200,
    headers: kopf,
  });
}
