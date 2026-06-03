import Link from "next/link";
import { Sparkles, Lock, Heart, MessageCircle, Video, Image, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const kategorien = [
  "Alle", "Ich brauche Hilfe", "Mein erster Trick", "Zeig deinen Trick",
  "Tipps & Ideen", "Suche Zauberfreunde", "Act-Ideen",
  "Kartenmagie", "Mentalmagie", "Treffen & Workshops"
];

const mockPosts = [
  {
    user: "Thomas K.", kuenstlername: "Magic Thomas", level: "Anfänger", stadt: "München",
    avatar: "T", kategorie: "Mein erster Trick", zeit: "vor 2 Std.",
    titel: "Mein allererster Kartentrick 🃏",
    text: "Hab heute meinen ersten Trick gezeigt und meine Familie war begeistert! Hier das Video:",
    applaus: 24, kommentare: 8, hatVideo: true,
  },
  {
    user: "Sarah M.", kuenstlername: "Mysteria", level: "Fortgeschritten", stadt: "Hamburg",
    avatar: "S", kategorie: "Ich brauche Hilfe", zeit: "vor 5 Std.",
    titel: "Frage zur Münzroutine — Wrist Roll klappt nicht",
    text: "Ich übe seit Wochen den Wrist Roll und komme nicht weiter. Hat jemand einen Tipp oder Video-Empfehlung?",
    applaus: 12, kommentare: 15, hatVideo: false,
  },
  {
    user: "Markus B.", kuenstlername: null, level: "Profi", stadt: "Berlin",
    avatar: "M", kategorie: "Tipps & Ideen",  zeit: "gestern",
    titel: "5 Fehler, die Anfänger bei der Misdirection machen",
    text: "Nach Jahren auf der Bühne teile ich die häufigsten Fehler, die ich bei Anfängern sehe. Lest unbedingt…",
    applaus: 89, kommentare: 31, hatVideo: false,
  },
];

const vorteile = [
  { icon: "🎬", text: "Zeig deinen ersten Trick" },
  { icon: "💬", text: "Erhalte wertvolles Feedback" },
  { icon: "📍", text: "Finde Zauberfreunde in deiner Nähe" },
  { icon: "💡", text: "Teile Ideen, Fragen und Fortschritte" },
  { icon: "🎭", text: "Treffen im Florian Zimmer Theater" },
  { icon: "🃏", text: "Lerne von anderen Magiern" },
  { icon: "⭐", text: "Tipps von Florian Zimmer persönlich" },
];

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-6">
          <Lock className="w-4 h-4 text-gold-400" />
          <span className="text-sm text-gold-300">Exklusiver Bereich</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-50 mb-6 leading-tight">
          Ein geschützter Ort für Menschen,<br className="hidden md:block" />
          die Magie{" "}<span className="text-gold-gradient">ernsthaft lieben.</span>
        </h1>
        <p className="text-dark-300 text-xl max-w-3xl mx-auto leading-relaxed">
          In der Magieakademie triffst du Menschen, die Zauberei lernen, üben, weiterentwickeln und gemeinsam erleben möchten. Kein anonymes Forum. Keine laute Social-Media-Welt. Sondern eine echte Community mit Klarnamen, Respekt und Begeisterung.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
        <Link href="/registrieren">
          <Button size="xl">
            <Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline-gold" size="xl">Einloggen</Button>
        </Link>
      </div>

      {/* Vorteile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {vorteile.map((v, i) => (
          <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4">
            <span className="text-3xl">{v.icon}</span>
            <span className="text-dark-200 font-medium">{v.text}</span>
          </div>
        ))}
      </div>

      {/* Feed Preview — blurred */}
      <div className="relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl"
          style={{ background: "linear-gradient(to bottom, rgba(13,12,10,0) 0%, rgba(13,12,10,0.7) 30%, rgba(13,12,10,0.97) 70%)" }}>
          <div className="glass-gold rounded-3xl p-8 md:p-12 text-center max-w-lg mx-4">
            <Lock className="w-12 h-12 text-gold-400 mx-auto mb-4 animate-pulse-gold" />
            <h2 className="font-display text-2xl font-bold text-dark-50 mb-3">Melde dich an, um alles zu sehen</h2>
            <p className="text-dark-400 mb-6">Die Community wartet auf dich. Kostenlos, immer.</p>
            <div className="flex flex-col gap-3">
              <Link href="/registrieren">
                <Button fullWidth size="lg"><Sparkles className="w-4 h-4" /> Kostenlos Mitglied werden</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline-gold" fullWidth size="lg">Einloggen</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Blurred Feed Preview */}
        <div className="pointer-events-none select-none" style={{ filter: "blur(3px)", opacity: 0.4 }}>
          {/* Kategorien */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-8">
            {kategorien.map(k => (
              <span key={k} className="flex-shrink-0 px-4 py-2 rounded-full glass text-sm text-dark-300 border border-dark-700">{k}</span>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {mockPosts.map((p, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-dark-950 font-bold flex-shrink-0">
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-dark-100">{p.user}</span>
                      {p.kuenstlername && <span className="text-dark-500 text-sm">· {p.kuenstlername}</span>}
                      <Badge variant="gold">{p.level}</Badge>
                      <span className="text-dark-600 text-xs">{p.stadt} · {p.zeit}</span>
                    </div>
                    <Badge variant="dark" className="mb-3">{p.kategorie}</Badge>
                    <h3 className="font-semibold text-dark-100 mb-2">{p.titel}</h3>
                    <p className="text-dark-400 text-sm">{p.text}</p>
                    {p.hatVideo && (
                      <div className="mt-3 h-32 bg-dark-900 rounded-xl flex items-center justify-center gap-2 text-dark-500">
                        <Video className="w-5 h-5" /> Video
                      </div>
                    )}
                    <div className="flex items-center gap-6 mt-4">
                      <span className="flex items-center gap-2 text-dark-500 text-sm"><Star className="w-4 h-4" /> {p.applaus} Applaus</span>
                      <span className="flex items-center gap-2 text-dark-500 text-sm"><MessageCircle className="w-4 h-4" /> {p.kommentare}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
