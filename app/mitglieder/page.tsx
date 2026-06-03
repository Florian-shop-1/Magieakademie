import Link from "next/link";
import { Search, MapPin, Star, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const mockMitglieder = [
  { id: "1", vorname: "Thomas", nachname: "K.", kuenstlername: "Magic Thomas", stadt: "München", level: "Anfänger", bereiche: ["Kartenmagie", "Close-up"], avatar: "T", applaus: 124, tricks: 3 },
  { id: "2", vorname: "Sarah", nachname: "M.", kuenstlername: "Mysteria", stadt: "Hamburg", level: "Fortgeschritten", bereiche: ["Mentalmagie", "Bühne"], avatar: "S", applaus: 89, tricks: 7 },
  { id: "3", vorname: "Markus", nachname: "B.", kuenstlername: null, stadt: "Berlin", level: "Profi", bereiche: ["Kartenmagie", "Münzen"], avatar: "M", applaus: 312, tricks: 18 },
  { id: "4", vorname: "Lisa", nachname: "H.", kuenstlername: "Lisa Magic", stadt: "Ulm", level: "Anfänger", bereiche: ["Kinderzauberei", "Close-up"], avatar: "L", applaus: 45, tricks: 2 },
  { id: "5", vorname: "Jonas", nachname: "F.", kuenstlername: null, stadt: "Stuttgart", level: "Fortgeschritten", bereiche: ["Mentalmagie", "Bühne"], avatar: "J", applaus: 156, tricks: 9 },
  { id: "6", vorname: "Anna", nachname: "W.", kuenstlername: "Wunderfrau", stadt: "München", level: "Profi", bereiche: ["Kartenmagie", "Bühne"], avatar: "A", applaus: 430, tricks: 24 },
];

const levelColors = {
  "Anfänger": "gold" as const,
  "Fortgeschritten": "blue" as const,
  "Profi": "green" as const,
};

export default function MitgliederPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-50 mb-4">
          Zauberfreunde <span className="text-gold-gradient">finden</span>
        </h1>
        <p className="text-dark-300 text-xl">Finde Menschen, die deine Leidenschaft teilen.</p>
      </div>

      {/* Filter Bar */}
      <div className="glass rounded-2xl p-4 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm"
              placeholder="Name suchen…" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input className="w-full md:w-48 bg-dark-900 border border-dark-700 rounded-xl pl-10 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm"
              placeholder="Stadt / Region" />
          </div>
          <select className="bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-300 focus:border-gold-500 outline-none transition-all text-sm">
            <option>Alle Level</option>
            <option>Anfänger</option>
            <option>Fortgeschritten</option>
            <option>Profi</option>
          </select>
          <select className="bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-300 focus:border-gold-500 outline-none transition-all text-sm">
            <option>Alle Bereiche</option>
            <option>Kartenmagie</option>
            <option>Mentalmagie</option>
            <option>Close-up</option>
            <option>Bühne</option>
            <option>Münzen</option>
            <option>Kinderzauberei</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {mockMitglieder.map(m => (
          <Link href={`/mitglieder/${m.id}`} key={m.id}>
            <div className="glass rounded-2xl p-6 card-hover group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-dark-950 font-bold text-xl flex-shrink-0">
                    {m.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-dark-100">{m.vorname} {m.nachname}</p>
                    {m.kuenstlername && <p className="text-dark-500 text-sm">{m.kuenstlername}</p>}
                    <div className="flex items-center gap-1 text-dark-500 text-xs mt-1">
                      <MapPin className="w-3 h-3" /> {m.stadt}
                    </div>
                  </div>
                </div>

                <Badge variant={levelColors[m.level as keyof typeof levelColors]} className="mb-3">{m.level}</Badge>

                <div className="flex flex-wrap gap-2 mb-4">
                  {m.bereiche.map(b => (
                    <span key={b} className="px-2 py-1 bg-dark-800 rounded-full text-xs text-dark-400">{b}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-dark-500">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold-400" /> {m.applaus} Applaus</span>
                  <span>{m.tricks} Tricks hochgeladen</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Lock CTA */}
      <div className="glass-gold rounded-3xl p-10 text-center">
        <Lock className="w-10 h-10 text-gold-400 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-dark-50 mb-3">Melde dich an, um alle Mitglieder zu sehen</h2>
        <p className="text-dark-400 mb-6">Schreib ihnen, tausch dich aus, finde Zauberfreunde in deiner Nähe.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/registrieren">
            <Button size="lg"><Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline-gold" size="lg">Einloggen</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
