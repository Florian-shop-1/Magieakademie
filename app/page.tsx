import Link from "next/link";
import { Sparkles, Star, Users, Video, ArrowRight, ChevronRight, Zap, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Video,
    titel: "Lerne deinen ersten Trick",
    text: "Starte mit einfachen Zaubertricks, die du sofort ausprobieren kannst. Schritt für Schritt, ohne Vorwissen.",
    link: "/erster-trick",
    cta: "Jetzt lernen",
  },
  {
    icon: Star,
    titel: "Zeig dich",
    text: "Lade dein erstes Zaubervideo hoch, bekomme ehrliches Feedback und wachse gemeinsam mit der Community.",
    link: "/community",
    cta: "Community entdecken",
  },
  {
    icon: Users,
    titel: "Finde Zauberfreunde",
    text: "Tausche dich mit Menschen aus, die deine Leidenschaft teilen. Online und bei echten Treffen im Theater.",
    link: "/mitglieder",
    cta: "Mitglieder finden",
  },
];

const vorteile = [
  { icon: "✨", text: "Zeig deinen ersten Trick" },
  { icon: "💬", text: "Erhalte wertvolles Feedback" },
  { icon: "📍", text: "Finde Zauberfreunde in deiner Nähe" },
  { icon: "🎪", text: "Treffen im Florian Zimmer Theater" },
  { icon: "🃏", text: "Lerne von anderen Magiern" },
  { icon: "⭐", text: "Tipps von Florian Zimmer persönlich" },
];

const shopPreview = [
  { name: "Das magische Seil", kategorie: "Erster Trick", preis: "14,90 €", schwierigkeit: "Anfänger", emoji: "🪄" },
  { name: "Traumkarten Deck", kategorie: "Kartentricks", preis: "24,90 €", schwierigkeit: "Anfänger", emoji: "🃏" },
  { name: "Münzzauber Starter", kategorie: "Münztricks", preis: "19,90 €", schwierigkeit: "Anfänger", emoji: "🪙" },
  { name: "Mentalist Basics", kategorie: "Mentalmagie", preis: "29,90 €", schwierigkeit: "Fortgeschritten", emoji: "🧠" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(180,83,9,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(180,83,9,0.10) 0%, transparent 50%)`
        }} />

        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gold-300 font-medium tracking-wide">Deutschlands neue Zauberwelt</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="text-gold-gradient">Die größte</span>
            <br />
            <span className="text-dark-100">deutschsprachige</span>
            <br />
            <span className="text-gold-gradient">Zaubercommunity</span>
          </h1>

          <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Lerne Zaubern, zeig deinen ersten Trick, tausche dich mit anderen aus und werde Teil einer Community, die Magie liebt.
          </p>
          <p className="text-2xl md:text-3xl font-display text-gold-400 mb-10">
            Hier beginnt deine Reise in die Magie.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/registrieren">
              <Button size="xl" className="gap-3">
                <Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline-gold" size="xl">
                Magic Shop entdecken <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <p className="text-dark-400 text-lg">
            Für Anfänger.&ensp;Für Hobby-Magier.&ensp;Für Profis.&ensp;Für alle, die Magie lieben.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-500/50" />
          <div className="w-2 h-2 rounded-full bg-gold-500" />
        </div>
      </section>

      {/* ── 3 Features ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-50 mb-4">Dein Weg in die Magie</h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-8 card-hover group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-600/10 border border-gold-500/20 flex items-center justify-center mb-6 group-hover:border-gold-400/40 transition-all duration-300">
                  <f.icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-dark-50 mb-3">{f.titel}</h3>
                <p className="text-dark-400 leading-relaxed mb-6">{f.text}</p>
                <Link href={f.link} className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold hover:gap-3 transition-all duration-200">
                  {f.cta} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community Teaser ─────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(180,83,9,0.12) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-300">Exklusive Community</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-50 mb-6 leading-tight">
                Ein geschützter Ort für Menschen, die Magie{" "}
                <span className="text-gold-gradient">ernsthaft lieben.</span>
              </h2>
              <p className="text-dark-300 text-lg leading-relaxed mb-8">
                Kein anonymes Forum. Keine laute Social-Media-Welt. Sondern eine echte Community mit Klarnamen, Respekt und Begeisterung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registrieren">
                  <Button size="lg"><Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline-gold" size="lg">Einloggen</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vorteile.map((v, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-center gap-3 card-hover">
                  <span className="text-2xl">{v.icon}</span>
                  <span className="text-dark-200 text-sm font-medium">{v.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── First Trick CTA ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-gold rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-600/10 to-transparent" />
          <div className="relative z-10">
            <div className="text-5xl mb-6">🎩</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark-50 mb-4">
              Dein erster Trick ist der Anfang von allem.
            </h2>
            <p className="text-dark-300 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Du musst nicht perfekt sein. Jeder große Magier hat irgendwann seinen ersten Trick gezeigt.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-dark-400 mb-10">
              <span>Nicht perfekt.</span>
              <span className="text-gold-500 text-xl">✦</span>
              <span>Einfach anfangen.</span>
              <span className="text-gold-500 text-xl">✦</span>
              <span>Zeig uns deinen ersten magischen Moment.</span>
            </div>
            <Link href="/registrieren">
              <Button size="xl">
                <Zap className="w-5 h-5" /> Jetzt starten — kostenlos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shop Preview ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-dark-50">Magic Shop</h2>
            <p className="text-dark-400 mt-2">Tricks, die du sofort zeigen kannst. Kein Login nötig.</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-gold-400 font-semibold hover:gap-3 transition-all">
            Alle Tricks <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shopPreview.map((p, i) => (
            <Link href="/shop" key={i}>
              <div className="glass rounded-2xl overflow-hidden card-hover group">
                <div className="h-40 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                  {p.emoji}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gold-500 font-medium mb-1">{p.kategorie}</div>
                  <h3 className="text-dark-100 font-semibold text-sm mb-2">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400 text-xs">{p.schwierigkeit}</span>
                    <span className="text-gold-400 font-bold">{p.preis}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop">
            <Button variant="outline-gold" size="lg">Alle Tricks im Shop entdecken</Button>
          </Link>
        </div>
      </section>

      {/* ── Treffen Teaser ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center">
          <div className="text-6xl">🎭</div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium mb-3">
              <MapPin className="w-4 h-4" /> Neu-Ulm · Florian Zimmer Theater
            </div>
            <h2 className="font-display text-3xl font-bold text-dark-50 mb-3">Treffen im Theater</h2>
            <p className="text-dark-300 leading-relaxed mb-6">
              Bring deinen Trick, deine Idee oder einfach deine Begeisterung mit. In regelmäßigen Abständen treffen wir uns im Florian Zimmer Theater — gemeinsam machen wir daraus Magie. Kostenlos.
            </p>
            <Link href="/treffen">
              <Button size="md">Nächste Treffen ansehen <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
