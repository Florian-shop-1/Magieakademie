import Link from "next/link";
import { Upload, Star, MessageCircle, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const mockTricks = [
  {
    user: "Thomas K.", avatar: "T", stadt: "München", zeit: "vor 3 Std.",
    titel: "Mein erster Kartentrick — ACR",
    text: "Hab 2 Wochen geübt und heute zum ersten Mal vor echtem Publikum gezeigt. Es hat funktioniert!!!",
    feedbackGewuenscht: true, applaus: 31, kommentare: 12,
  },
  {
    user: "Lea S.", avatar: "L", stadt: "Stuttgart", zeit: "gestern",
    titel: "Münze verschwindet (fast) perfekt",
    text: "Der Wrist Roll klappt noch nicht 100%, aber ich bin stolz. Habt ihr Tipps für die linke Hand?",
    feedbackGewuenscht: true, applaus: 18, kommentare: 7,
  },
  {
    user: "Kai W.", avatar: "K", stadt: "Köln", zeit: "vor 3 Tagen",
    titel: "Ich wollte es einfach zeigen 🎩",
    text: "Kein Feedback nötig — ich wollte einfach mal was hochladen. Hier mein erster Zaubertrick nach 3 Wochen.",
    feedbackGewuenscht: false, applaus: 44, kommentare: 5,
  },
];

export default function ErsterTrickPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="text-6xl mb-6">🎩</div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-50 mb-6 leading-tight">
          Dein erster Trick ist<br />
          <span className="text-gold-gradient">der Anfang von allem.</span>
        </h1>
        <p className="text-dark-300 text-xl max-w-2xl mx-auto leading-relaxed mb-6">
          Du musst nicht perfekt sein. Jeder große Magier hat irgendwann seinen ersten Trick gezeigt.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-dark-400 text-lg mb-10">
          <span>Nicht perfekt.</span>
          <span className="text-gold-500">✦</span>
          <span>Einfach anfangen.</span>
          <span className="text-gold-500">✦</span>
          <span>Zeig uns deinen ersten magischen Moment.</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/registrieren">
            <Button size="xl"><Sparkles className="w-5 h-5" /> Trick hochladen — kostenlos</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline-gold" size="xl">Einloggen</Button>
          </Link>
        </div>
      </div>

      {/* Upload Box (nur für eingeloggte Nutzer) */}
      <div className="glass-gold rounded-3xl p-8 md:p-10 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-6 h-6 text-gold-400" />
            <h2 className="font-display text-2xl font-bold text-dark-50">Zeig deinen Trick</h2>
            <div className="ml-auto flex items-center gap-2 glass rounded-full px-3 py-1">
              <Lock className="w-3 h-3 text-dark-500" />
              <span className="text-xs text-dark-500">Nur für Mitglieder</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-dark-600 rounded-2xl p-10 text-center mb-6 hover:border-gold-500/50 transition-colors cursor-pointer group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎬</div>
            <p className="text-dark-400 mb-2">Video hier ablegen oder klicken zum Auswählen</p>
            <p className="text-dark-600 text-sm">MP4, MOV · Max. 200 MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Titel deines Tricks *</label>
              <input className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all" placeholder="z.B. Mein erster Kartentrick" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Möchtest du…</label>
              <div className="flex gap-3">
                {["Feedback erhalten", "Nur zeigen"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="feedback" className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-dark-300">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <textarea rows={2} className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all resize-none mb-4"
            placeholder="Kurze Beschreibung (optional) — erzähl uns, was du gelernt hast oder wonach du suchst." />

          <Link href="/registrieren">
            <Button size="lg">
              <Sparkles className="w-5 h-5" /> Jetzt registrieren & hochladen
            </Button>
          </Link>
        </div>
      </div>

      {/* Community Tricks */}
      <h2 className="font-display text-3xl font-bold text-dark-50 mb-8">
        Erste Tricks aus der Community
      </h2>

      <div className="space-y-6">
        {mockTricks.map((t, i) => (
          <div key={i} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-dark-950 font-bold flex-shrink-0">
                {t.avatar}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-dark-100">{t.user}</span>
                  <span className="text-dark-500 text-sm">· {t.stadt} · {t.zeit}</span>
                  {t.feedbackGewuenscht && <Badge variant="gold">Feedback gewünscht</Badge>}
                </div>
                <h3 className="font-semibold text-dark-100 mb-2">{t.titel}</h3>
                <p className="text-dark-400 text-sm mb-4">{t.text}</p>
                <div className="h-32 bg-dark-900 rounded-xl flex items-center justify-center gap-2 text-dark-600 mb-4">
                  <span className="text-2xl">▶️</span> <span className="text-sm">Video ansehen</span>
                </div>
                <div className="flex items-center gap-6">
                  <Link href="/login">
                    <button className="flex items-center gap-2 text-dark-500 hover:text-gold-400 transition-colors text-sm">
                      <Star className="w-4 h-4" /> {t.applaus} Applaus
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="flex items-center gap-2 text-dark-500 hover:text-gold-400 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" /> {t.kommentare} Kommentare
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-dark-500 mb-4">Melde dich an, um alle Tricks zu sehen und selbst zu posten.</p>
        <Link href="/registrieren">
          <Button size="lg"><Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden</Button>
        </Link>
      </div>
    </div>
  );
}
