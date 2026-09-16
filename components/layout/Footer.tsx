import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-magieakademie.png" alt="Magieakademie" className="h-10 w-auto logo-glow" />
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-sm">
              Die deutschsprachige Zaubercommunity. Ein Ort für alle, die Magie lieben, vom ersten Trick bis zur großen Bühne.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="mailto:info@florianzimmer.com" className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-gold-400 transition-colors">
                <Mail className="w-5 h-5" /> info@florianzimmer.com
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-gold-400 uppercase tracking-widest">Mitglieder</h4>
            <ul className="space-y-2">
              {[
                { href: "/videos", label: "Videos" },
                { href: "/login", label: "Einloggen" },
                { href: "/passwort-vergessen", label: "Passwort vergessen" },
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
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <p>© {new Date().getFullYear()} Magieakademie.de · Ein Projekt der Florian Zimmer Theater GmbH</p>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="hover:text-gold-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gold-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
