import { BestaetigenFormular } from "./BestaetigenFormular";

export const metadata = { title: "Anmeldung bestätigen · Magieakademie", robots: { index: false } };

/*
  Ziel des Links aus der Bestätigungsmail.

  Der Link selbst ändert noch nichts: Manche Mailprogramme rufen Links zur
  Prüfung vorab auf und würden ihn sonst verbrauchen. Die Seite schickt die
  Bestätigung erst aus dem Browser ab, automatisch und zur Sicherheit mit Knopf.
*/
export default async function BestaetigenPage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams;
  return <BestaetigenFormular schluessel={s ?? ""} />;
}
