export const metadata = { title: "Impressum · Magieakademie" };

// Angaben wie im Ticketshop (florianzimmer-ditix-frontend/src/app/impressum), gleiche Firma.
export default function ImpressumPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6 text-dark-300 leading-relaxed">
      <h1 className="font-display text-3xl font-bold text-dark-50">Impressum</h1>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Angaben gemäß § 5 DDG</h2>
        <address className="not-italic">
          Florian Zimmer Theater GmbH<br />
          Ringstraße 24<br />
          89185 Hüttisheim
        </address>
        <p>Spielstätte: Florian Zimmer Theater, Grethe-Weiser-Str. 2/1, 89231 Neu-Ulm</p>
        <p>Vertreten durch den Geschäftsführer Florian Zimmer</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Kontakt</h2>
        <p>
          Telefon: <a className="text-gold-400 hover:underline" href="tel:+497317906110">0731 7906 110</a><br />
          E-Mail: <a className="text-gold-400 hover:underline" href="mailto:info@florianzimmer.com">info@florianzimmer.com</a>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Registereintrag</h2>
        <p>Sitz der Gesellschaft: Hüttisheim<br />Handelsregister: Amtsgericht Ulm, HRB 725879</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Haftung für Inhalte und Links</h2>
        <p>
          Für eigene Inhalte sind wir nach den allgemeinen Gesetzen verantwortlich. Für Inhalte verlinkter Seiten Dritter
          übernehmen wir keine Gewähr; verantwortlich ist deren Betreiber. Werden uns Rechtsverletzungen bekannt,
          entfernen wir die betreffenden Inhalte oder Links umgehend.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg text-dark-50">Urheberrecht</h2>
        <p>
          Die Videos und Texte der Magieakademie sind urheberrechtlich geschützt. Sie sind für dich als Mitglied zum
          privaten Anschauen bestimmt. Jede Weitergabe, Veröffentlichung oder Vervielfältigung braucht unsere
          schriftliche Zustimmung.
        </p>
      </section>
    </article>
  );
}
