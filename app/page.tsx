"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Sparkles, Star, Users, Video, ArrowRight, ChevronRight, Zap, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ── Star Canvas ─────────────────────────────────────────── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2, o: Math.random(), speed: Math.random() * 0.004 + 0.001, phase: Math.random() * Math.PI * 2,
    }));
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const opacity = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,211,77,${opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ── Floating Orbs ───────────────────────────────────────── */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #b45309 0%, transparent 70%)", top: "-10%", left: "-5%", animation: "float 12s ease-in-out infinite" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)", bottom: "0%", right: "-10%", animation: "float 15s ease-in-out infinite reverse" }} />
      <div className="absolute w-[350px] h-[350px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #fcd34d 0%, transparent 70%)", top: "40%", left: "50%", animation: "float 18s ease-in-out infinite" }} />
    </div>
  );
}

const features = [
  { icon: Video, titel: "Lerne deinen ersten Trick", text: "Starte mit einfachen Zaubertricks, die du sofort zeigen kannst. Schritt für Schritt.", link: "/erster-trick", cta: "Jetzt lernen" },
  { icon: Star, titel: "Zeig dich", text: "Lade dein erstes Zaubervideo hoch, bekomme Feedback und wachse mit der Community.", link: "/community", cta: "Community entdecken" },
  { icon: Users, titel: "Finde Zauberfreunde", text: "Tausche dich mit Menschen aus, die deine Leidenschaft teilen — online und live.", link: "/mitglieder", cta: "Mitglieder finden" },
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
  { name: "Das magische Seil", preis: "14,90 €", schwierigkeit: "Anfänger", emoji: "🪄" },
  { name: "Traumkarten Deck", preis: "24,90 €", schwierigkeit: "Anfänger", emoji: "🃏" },
  { name: "Münzzauber Starter", preis: "19,90 €", schwierigkeit: "Anfänger", emoji: "🪙" },
  { name: "Mentalist Basics", preis: "29,90 €", schwierigkeit: "Fortgeschritten", emoji: "🧠" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">

        {/* Deep background */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 40%, #1a120a 0%, #0d0c0a 40%, #080706 100%)"
        }} />

        {/* Animated orbs */}
        <Orbs />

        {/* Stars */}
        <StarField />

        {/* Fog layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-64"
            style={{ background: "linear-gradient(to top, #080706, transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-32"
            style={{ background: "linear-gradient(to bottom, rgba(8,7,6,0.8), transparent)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto" style={{ animation: "fadeIn 1s ease-out both" }}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-10"
            style={{ animation: "slideUp 0.8s ease-out 0.1s both" }}>
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gold-300 font-medium tracking-widest uppercase">Deutschlands neue Zauberwelt</span>
          </div>

          {/* Main Headline */}
          <div style={{ animation: "slideUp 0.8s ease-out 0.2s both" }}>
            <h1 className="font-display leading-none mb-6" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", fontWeight: 900 }}>
              <span className="block text-gold-gradient" style={{ textShadow: "0 0 80px rgba(245,158,11,0.3)" }}>
                Die größte
              </span>
              <span className="block" style={{ color: "#f8f7f4", textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}>
                deutschsprachige
              </span>
              <span className="block text-gold-gradient" style={{ textShadow: "0 0 80px rgba(245,158,11,0.3)" }}>
                Zaubercommunity
              </span>
            </h1>
          </div>

          {/* Sub */}
          <div style={{ animation: "slideUp 0.8s ease-out 0.35s both" }}>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-3" style={{ color: "#b0a99a" }}>
              Lerne Zaubern, zeig deinen ersten Trick und werde Teil einer Community, die Magie liebt.
            </p>
            <p className="font-display text-2xl md:text-3xl mb-12" style={{
              color: "#f59e0b",
              textShadow: "0 0 30px rgba(245,158,11,0.6)"
            }}>
              Hier beginnt deine Reise in die Magie.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
            style={{ animation: "slideUp 0.8s ease-out 0.5s both" }}>
            <Link href="/registrieren">
              <button className="btn-gold rounded-full px-10 py-5 text-lg font-bold flex items-center gap-3 shadow-2xl"
                style={{ boxShadow: "0 0 40px rgba(245,158,11,0.4), 0 20px 60px rgba(0,0,0,0.5)" }}>
                <Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden
              </button>
            </Link>
            <Link href="/shop">
              <button className="btn-outline-gold rounded-full px-10 py-5 text-lg font-semibold flex items-center gap-3">
                Magic Shop <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Tagline pills */}
          <div className="flex flex-wrap justify-center gap-3" style={{ animation: "slideUp 0.8s ease-out 0.6s both" }}>
            {["Für Anfänger", "Für Hobby-Magier", "Für Profis", "Für alle, die Magie lieben"].map(t => (
              <span key={t} className="glass rounded-full px-4 py-2 text-sm" style={{ color: "#8c8577" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-60">
          <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, transparent, #f59e0b)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b", boxShadow: "0 0 10px #f59e0b" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3 FEATURES
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,83,9,0.06) 0%, transparent 70%)"
        }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display font-bold text-dark-50 mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Dein Weg in die Magie
            </h2>
            <div className="gold-divider max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group relative rounded-3xl p-8 card-hover overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
                {/* Top gold line */}
                <div className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }} />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(180,83,9,0.2), rgba(245,158,11,0.1))",
                      border: "1px solid rgba(245,158,11,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}>
                    <f.icon className="w-8 h-8" style={{ color: "#f59e0b" }} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-4" style={{ color: "#f8f7f4" }}>{f.titel}</h3>
                  <p className="leading-relaxed mb-8" style={{ color: "#8c8577" }}>{f.text}</p>
                  <Link href={f.link} className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 group-hover:gap-3"
                    style={{ color: "#f59e0b" }}>
                    {f.cta} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMMUNITY TEASER
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 80% at 30% 50%, rgba(180,83,9,0.10) 0%, transparent 60%)"
        }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-8">
                <Heart className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-300 font-medium">Exklusive Community</span>
              </div>
              <h2 className="font-display font-bold leading-tight mb-8"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#f8f7f4" }}>
                Ein geschützter Ort für Menschen, die Magie{" "}
                <span className="text-gold-gradient">ernsthaft lieben.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "#8c8577" }}>
                Kein anonymes Forum. Keine laute Social-Media-Welt. Sondern eine echte Community mit Klarnamen, Respekt und Begeisterung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registrieren">
                  <button className="btn-gold rounded-full px-8 py-4 text-base font-bold flex items-center gap-2"
                    style={{ boxShadow: "0 0 30px rgba(245,158,11,0.3), 0 10px 40px rgba(0,0,0,0.4)" }}>
                    <Sparkles className="w-5 h-5" /> Kostenlos Mitglied werden
                  </button>
                </Link>
                <Link href="/login">
                  <button className="btn-outline-gold rounded-full px-8 py-4 text-base font-semibold">
                    Einloggen
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vorteile.map((v, i) => (
                <div key={i} className="group flex items-center gap-4 rounded-2xl p-4 card-hover"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                  <span className="text-2xl flex-shrink-0">{v.icon}</span>
                  <span className="text-sm font-medium" style={{ color: "#d0ccbf" }}>{v.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FIRST TRICK CTA — cinematic
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-16 md:p-24 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(180,83,9,0.15) 0%, rgba(245,158,11,0.08) 50%, rgba(180,83,9,0.15) 100%)",
              border: "1px solid rgba(245,158,11,0.2)",
              boxShadow: "0 0 80px rgba(245,158,11,0.05), inset 0 0 80px rgba(0,0,0,0.3)",
            }}>
            {/* Background shimmer */}
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32"
              style={{ background: "radial-gradient(circle at 0% 0%, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-32 h-32"
              style={{ background: "radial-gradient(circle at 100% 100%, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <div className="text-6xl mb-8 animate-float">🎩</div>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f8f7f4" }}>
                Dein erster Trick ist der Anfang von allem.
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: "#8c8577" }}>
                Du musst nicht perfekt sein. Jeder große Magier hat irgendwann seinen ersten Trick gezeigt.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-12" style={{ color: "#6b6459" }}>
                <span className="font-medium">Nicht perfekt.</span>
                <span style={{ color: "#f59e0b", fontSize: "1.5rem" }}>✦</span>
                <span className="font-medium">Einfach anfangen.</span>
                <span style={{ color: "#f59e0b", fontSize: "1.5rem" }}>✦</span>
                <span className="font-medium">Zeig uns deinen ersten magischen Moment.</span>
              </div>
              <Link href="/registrieren">
                <button className="btn-gold rounded-full px-12 py-5 text-xl font-bold flex items-center gap-3 mx-auto"
                  style={{ boxShadow: "0 0 60px rgba(245,158,11,0.5), 0 20px 60px rgba(0,0,0,0.5)" }}>
                  <Zap className="w-6 h-6" /> Jetzt starten — kostenlos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SHOP PREVIEW
      ════════════════════════════════════════════════════════ */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3">Kein Login nötig</p>
              <h2 className="font-display font-bold text-dark-50"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Magic Shop</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: "#f59e0b" }}>
              Alle Tricks <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shopPreview.map((p, i) => (
              <Link href="/shop" key={i}>
                <div className="group relative rounded-2xl overflow-hidden card-hover"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="h-48 flex items-center justify-center text-6xl relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1a1815 0%, #0d0c0a 100%)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at center, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />
                    <span className="relative z-10 group-hover:scale-125 transition-transform duration-500 inline-block">
                      {p.emoji}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-sm mb-2" style={{ color: "#f8f7f4" }}>{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#4a4540" }}>{p.schwierigkeit}</span>
                      <span className="font-bold text-lg" style={{ color: "#f59e0b" }}>{p.preis}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <button className="btn-outline-gold rounded-full px-10 py-4 text-base font-semibold">
                Alle Tricks entdecken
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TREFFEN
      ════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(180,83,9,0.1) 0%, transparent 60%)" }} />
            <div className="relative p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center">
              <div className="text-7xl animate-float">🎭</div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#f59e0b" }}>
                  <MapPin className="w-4 h-4" /> Neu-Ulm · Florian Zimmer Theater
                </div>
                <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#f8f7f4" }}>
                  Treffen im Theater
                </h2>
                <p className="leading-relaxed mb-8" style={{ color: "#8c8577", maxWidth: "520px" }}>
                  Bring deinen Trick, deine Idee oder einfach deine Begeisterung mit. In regelmäßigen Abständen treffen wir uns — gemeinsam machen wir daraus Magie. Kostenlos.
                </p>
                <Link href="/treffen">
                  <button className="btn-gold rounded-full px-8 py-4 text-base font-bold flex items-center gap-2">
                    Nächste Treffen ansehen <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
