import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <span className="font-display text-xl font-bold text-gold-gradient">Magieakademie</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm">
              Die größte deutschsprachige Zaubercommunity. Ein Ort für alle, die Magie lieben — vom ersten Trick bis zur großen Bühne.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-gold-400 transition-colors text-sm font-medium">
                Instagram
              </a>
              <a href="mailto:info@magieakademie.de" className="text-dark-400 hover:text-gold-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest">Community</h4>
            <ul className="space-y-2">
              {[
                { href: "/community", label: "Community-Feed" },
                { href: "/erster-trick", label: "Mein erster Trick" },
                { href: "/mitglieder", label: "Mitglieder finden" },
                { href: "/treffen", label: "Treffen im Theater" },
                { href: "/registrieren", label: "Kostenlos mitmachen" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dark-400 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest">Magic Shop</h4>
            <ul className="space-y-2">
              {[
                { href: "/shop?kategorie=erster-trick", label: "Mein erster Trick" },
                { href: "/shop?kategorie=karten", label: "Kartentricks" },
                { href: "/shop?kategorie=muenzen", label: "Münztricks" },
                { href: "/shop?kategorie=kinder", label: "Tricks für Kinder" },
                { href: "/shop?kategorie=geschenke", label: "Geschenkideen" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dark-400 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <p>© {new Date().getFullYear()} Magieakademie.de — Ein Projekt der Florian Zimmer Theater GmbH</p>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="hover:text-gold-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gold-400 transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-gold-400 transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
