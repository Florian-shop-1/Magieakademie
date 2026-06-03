"use client";
import { useState } from "react";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/lib/store";

const kategorien = [
  { value: "alle", label: "Alle Tricks" },
  { value: "erster-trick", label: "Mein erster Trick" },
  { value: "karten", label: "Kartentricks" },
  { value: "muenzen", label: "Münztricks" },
  { value: "kinder", label: "Tricks für Kinder" },
  { value: "close-up", label: "Close-up" },
  { value: "geschenke", label: "Geschenkideen" },
];

const produkte = [
  { id: "1", name: "Das magische Seil", wow: "Lerne einen Trick, den du sofort zeigen kannst.", preis: 1490, kategorie: "erster-trick", schwierigkeit: "Anfänger", altersempfehlung: "Ab 8 Jahren", emoji: "🪄", bewertung: 4.9, bewertungen: 127 },
  { id: "2", name: "Traumkarten Deck", wow: "Ein kleines Wunder für deinen ersten magischen Kartenmoment.", preis: 2490, kategorie: "karten", schwierigkeit: "Anfänger", altersempfehlung: "Ab 10 Jahren", emoji: "🃏", bewertung: 4.8, bewertungen: 89 },
  { id: "3", name: "Münzzauber Starter Set", wow: "Lass Münzen verschwinden — vor den Augen aller.", preis: 1990, kategorie: "muenzen", schwierigkeit: "Anfänger", altersempfehlung: "Ab 10 Jahren", emoji: "🪙", bewertung: 4.7, bewertungen: 64 },
  { id: "4", name: "Mentalist Basics Kit", wow: "Lies Gedanken. Staune. Begeistere.", preis: 2990, kategorie: "karten", schwierigkeit: "Fortgeschritten", altersempfehlung: "Ab 14 Jahren", emoji: "🧠", bewertung: 4.9, bewertungen: 43 },
  { id: "5", name: "Kinder-Zauberbox", wow: "Alles was man braucht für den ersten Auftritt — für Kinder.", preis: 3490, kategorie: "kinder", schwierigkeit: "Anfänger", altersempfehlung: "Ab 6 Jahren", emoji: "🎁", bewertung: 5.0, bewertungen: 201 },
  { id: "6", name: "Close-up Pad Premium", wow: "Der professionelle Auftritt beginnt mit dem richtigen Setup.", preis: 1990, kategorie: "close-up", schwierigkeit: "Für alle", altersempfehlung: "Ab 12 Jahren", emoji: "🟢", bewertung: 4.6, bewertungen: 38 },
  { id: "7", name: "Ringe-Set Zauberer", wow: "Verknüpfe, trenne, verblüffe — immer und überall.", preis: 2290, kategorie: "close-up", schwierigkeit: "Anfänger", altersempfehlung: "Ab 12 Jahren", emoji: "⭕", bewertung: 4.7, bewertungen: 55 },
  { id: "8", name: "Zauberbuch für Einsteiger", wow: "50 Tricks, sofort umsetzbar. Dein Einstieg in die Magie.", preis: 1690, kategorie: "erster-trick", schwierigkeit: "Anfänger", altersempfehlung: "Ab 10 Jahren", emoji: "📖", bewertung: 4.8, bewertungen: 312 },
];

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

export default function ShopPage() {
  const [aktiveKat, setAktiveKat] = useState("alle");
  const [suche, setSuche] = useState("");
  const [added, setAdded] = useState<string | null>(null);
  const { addItem } = useCart();

  const gefiltert = produkte.filter(p => {
    const katMatch = aktiveKat === "alle" || p.kategorie === aktiveKat;
    const sucheMatch = !suche || p.name.toLowerCase().includes(suche.toLowerCase());
    return katMatch && sucheMatch;
  });

  const handleAdd = (p: typeof produkte[0]) => {
    addItem({ id: p.id, name: p.name, preis_cents: p.preis, bild_url: "" });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-50 mb-4">
          Magic <span className="text-gold-gradient">Shop</span>
        </h1>
        <p className="text-dark-300 text-xl max-w-2xl mx-auto">
          Tricks, die du sofort zeigen kannst. Kein Login nötig.
        </p>
      </div>

      {/* Suche */}
      <div className="relative max-w-lg mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
        <input
          value={suche}
          onChange={e => setSuche(e.target.value)}
          className="w-full bg-dark-900 border border-dark-700 rounded-full pl-12 pr-6 py-4 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
          placeholder="Tricks suchen…"
        />
      </div>

      {/* Kategorien */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
        {kategorien.map(k => (
          <button
            key={k.value}
            onClick={() => setAktiveKat(k.value)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              aktiveKat === k.value
                ? "btn-gold"
                : "glass border border-dark-700 text-dark-300 hover:border-dark-600 hover:text-dark-200"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      {/* Produkte Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gefiltert.map((p) => (
          <div key={p.id} className="glass rounded-2xl overflow-hidden card-hover group flex flex-col">
            {/* Bild */}
            <div className="h-48 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
              {p.emoji}
            </div>

            <div className="p-5 flex flex-col flex-1">
              {/* Kategorie */}
              <Badge variant="gold" className="mb-3 self-start">{kategorien.find(k => k.value === p.kategorie)?.label}</Badge>

              <h3 className="font-display font-bold text-dark-50 text-lg mb-1">{p.name}</h3>
              <p className="text-dark-400 text-sm mb-3 flex-1 italic">„{p.wow}"</p>

              <div className="flex items-center gap-3 text-xs text-dark-500 mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-400 fill-gold-400" /> {p.bewertung} ({p.bewertungen})
                </span>
                <span>· {p.schwierigkeit}</span>
                <span>· {p.altersempfehlung}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-display text-2xl font-bold text-gold-400">{formatPrice(p.preis)}</span>
                <Button
                  size="sm"
                  onClick={() => handleAdd(p)}
                  className={added === p.id ? "opacity-75" : ""}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {added === p.id ? "Hinzugefügt!" : "In den Warenkorb"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gefiltert.length === 0 && (
        <div className="text-center py-20 text-dark-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Kein Trick gefunden. Versuch einen anderen Suchbegriff.</p>
        </div>
      )}
    </div>
  );
}
