export const metadata = { title: "Datenschutz · Magieakademie" };

/*
  Datenschutzhinweise der Magieakademie.

  Beschreibt genau das, was die Seite tut: Konto, Login-Cookie, Videos aus
  dem privaten Speicher, Magic News nur mit Häkchen. Kommt ein neuer Dienst
  dazu (Analyse, Zahlung, Community), gehört er hier ergänzt.
*/
export default function DatenschutzPage() {
  const h2 = "font-display text-lg text-dark-50";
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6 text-dark-300 leading-relaxed">
      <h1 className="font-display text-3xl font-bold text-dark-50">Datenschutz</h1>
      <p>Hier erfährst du, welche Daten die Magieakademie von dir verarbeitet, wozu und wie lange.</p>

      <section className="space-y-2">
        <h2 className={h2}>Verantwortlich</h2>
        <p>
          Florian Zimmer Theater GmbH, Ringstraße 24, 89185 Hüttisheim, vertreten durch Florian Zimmer.<br />
          E-Mail: <a className="text-gold-400 hover:underline" href="mailto:info@florianzimmer.com">info@florianzimmer.com</a>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Dein Mitgliedskonto</h2>
        <p>
          Für dein Konto speichern wir deine E-Mail-Adresse, deinen Namen, deinen Benutzernamen, das Datum deiner
          Registrierung und deiner letzten Anmeldung. Dein Passwort speichern wir nie im Klartext, sondern nur als
          verschlüsselte Prüfsumme. Rechtsgrundlage ist die Nutzung der Magieakademie, die du mit deiner Registrierung
          beginnst (Art. 6 Abs. 1 lit. b DSGVO). Wenn du dein Konto von der früheren Magieakademie-Seite mitgebracht hast,
          haben wir diese Angaben von dort übernommen.
        </p>
        <p>
          Zum Schutz vor dem Durchprobieren von Passwörtern merken wir uns fehlgeschlagene Anmeldeversuche für kurze Zeit
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Cookies</h2>
        <p>
          Wir setzen nur technisch notwendige Cookies: eines, das dich angemeldet hält, und je eines für Tricks, die du mit
          dem Code aus deiner Trick-Packung freigeschaltet hast. Es gibt keine Werbe- oder Analyse-Cookies.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Magic News</h2>
        <p>
          Den Newsletter bekommst du nur, wenn du ihn bestellt hast. Für den Versand nutzen wir Brevo (Sendinblue SAS,
          Paris). Jede Ausgabe enthält einen Link zum Abmelden. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO), die du jederzeit widerrufen kannst.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Hosting und Speicher</h2>
        <p>
          Die Seite läuft bei Vercel Inc. Deine Kontodaten liegen in einer Datenbank von Neon in Frankfurt, die Videos in
          einem privaten Speicher von Vercel in Frankfurt. Beim Aufruf der Seite verarbeitet der Anbieter technisch
          notwendige Daten wie deine IP-Adresse. Mit den Anbietern bestehen Verträge zur Auftragsverarbeitung; soweit
          Daten in die USA gelangen können, stützt sich das auf das EU-US Data Privacy Framework bzw.
          Standardvertragsklauseln.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Wie lange wir speichern</h2>
        <p>
          Solange dein Konto besteht. Schreib uns, wenn du es löschen möchtest, dann entfernen wir deine Daten, soweit
          keine gesetzliche Aufbewahrungspflicht entgegensteht.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={h2}>Deine Rechte</h2>
        <p>
          Du kannst Auskunft, Berichtigung, Löschung, Einschränkung und Übertragung deiner Daten verlangen, einer
          Verarbeitung widersprechen und eine Einwilligung widerrufen. Außerdem kannst du dich bei einer
          Datenschutz-Aufsichtsbehörde beschweren, etwa beim Landesbeauftragten für den Datenschutz Baden-Württemberg.
        </p>
      </section>
    </article>
  );
}
