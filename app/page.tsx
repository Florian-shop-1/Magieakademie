"use client";
import Link from "next/link";
import { Sparkles, Star, Users, Video, ArrowRight, ChevronRight, Zap, Heart, MapPin } from "lucide-react";

const features = [
  { icon: Video, titel: "Lerne deinen ersten Trick", text: "Starte mit einfachen Zaubertricks, die du sofort zeigen kannst. Schritt für Schritt, ohne Vorwissen.", link: "/videos", cta: "Zu den Videos" },
  { icon: Star, titel: "Zeig dich", text: "Lade dein erstes Zaubervideo hoch, bekomme Feedback und wachse gemeinsam mit der Community.", link: "/registrieren", cta: "Mitglied werden" },
  { icon: Users, titel: "Finde Zauberfreunde", text: "Tausche dich mit Menschen aus, die deine Leidenschaft teilen — online und bei echten Treffen.", link: "/registrieren", cta: "Mitglied werden" },
];

const vorteile = [
  { icon: "✨", text: "Zeig deinen ersten Trick" },
  { icon: "💬", text: "Erhalte wertvolles Feedback" },
  { icon: "📍", text: "Finde Zauberfreunde in deiner Nähe" },
  { icon: "🎪", text: "Treffen im Florian Zimmer Theater" },
  { icon: "🃏", text: "Lerne von anderen Magiern" },
  { icon: "⭐", text: "Tipps von Florian Zimmer persönlich" },
];

// Static star positions (no random, so SSR & client match)
const STARS = [
  {x:8,y:12,s:1.5},{x:15,y:5,s:1},{x:23,y:78,s:2},{x:31,y:45,s:1},{x:38,y:20,s:1.5},
  {x:45,y:88,s:1},{x:52,y:33,s:2},{x:58,y:60,s:1},{x:65,y:15,s:1.5},{x:72,y:70,s:1},
  {x:79,y:40,s:2},{x:86,y:92,s:1},{x:93,y:25,s:1.5},{x:97,y:55,s:1},{x:5,y:50,s:1},
  {x:20,y:95,s:1.5},{x:35,y:65,s:1},{x:50,y:8,s:2},{x:67,y:82,s:1},{x:84,y:10,s:1.5},
  {x:12,y:35,s:1},{x:28,y:58,s:1.5},{x:44,y:72,s:1},{x:60,y:48,s:2},{x:76,y:28,s:1},
  {x:90,y:68,s:1.5},{x:18,y:85,s:1},{x:40,y:18,s:1.5},{x:55,y:92,s:1},{x:88,y:42,s:2},
];

export default function HomePage() {
  return (
    <div style={{ background: "#07060b", minHeight: "100vh" }}>

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 40px", overflow: "hidden" }}>

        {/* Background gradients */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 70% at 50% 30%, #160b2b 0%, #0c0716 35%, #07060b 70%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(124,58,237,0.18) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 40%, rgba(212,175,55,0.08) 0%, transparent 55%)" }} />

        {/* CSS Stars */}
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.s}px`, height: `${s.s}px`,
            borderRadius: "50%",
            background: "#F3E3A6",
            boxShadow: `0 0 ${s.s * 3}px rgba(243,227,166,0.8)`,
            animation: `pulse-gold ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }} />
        ))}

        {/* Floating light particles */}
        {[...Array(8)].map((_, i) => (
          <div key={`p${i}`} style={{
            position: "absolute",
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: "200px", height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${i % 2 ? "212,175,55" : "124,58,237"},0.06) 0%, transparent 70%)`,
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Bottom fog */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, #07060b, transparent)", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", width: "100%" }}>

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-magieakademie.png" alt="Magieakademie" className="logo-glow" style={{ width: "min(640px, 92%)", height: "auto", margin: "0 auto 28px", display: "block", animation: "fadeIn 1.2s ease-out both" }} />

          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "999px", padding: "8px 20px", marginBottom: "40px", animation: "slideUp 0.8s ease-out 0.1s both" }}>
            <Sparkles style={{ width: 14, height: 14, color: "#c4b5fd" }} />
            <span style={{ fontSize: "12px", color: "#c4b5fd", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Deutschlands neue Zauberwelt</span>
          </div>

          {/* Headline */}
          <div style={{ animation: "slideUp 0.8s ease-out 0.2s both", marginBottom: "24px" }}>
            <h1 className="font-display" style={{ fontSize: "clamp(1.9rem, 4.6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, margin: 0 }}>
              <span style={{ display: "block", color: "#f6f5fa", textShadow: "0 0 60px rgba(212,175,55,0.15)" }}>
                Die deutschsprachige
              </span>
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #8A6A1F, #D4AF37, #F3E3A6, #D4AF37, #8A6A1F)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))",
              }}>Zaubercommunity</span>
            </h1>
          </div>

          {/* Sub */}
          <div style={{ animation: "slideUp 0.8s ease-out 0.35s both", marginBottom: "16px" }}>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#857e9a", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 12px" }}>
              Lerne Zaubern, zeig deinen ersten Trick, tausche dich aus und werde Teil einer Community, die Magie liebt.
            </p>
            <p className="font-display" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#D4AF37", textShadow: "0 0 25px rgba(212,175,55,0.5)", marginBottom: "40px" }}>
              Hier beginnt deine Reise in die Magie.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "48px", animation: "slideUp 0.8s ease-out 0.5s both" }}>
            <Link href="/registrieren">
              <button className="btn-gold" style={{ borderRadius: "999px", padding: "18px 40px", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 0 50px rgba(212,175,55,0.35), 0 20px 50px rgba(0,0,0,0.5)" }}>
                <Sparkles style={{ width: 20, height: 20 }} /> Kostenlos Mitglied werden
              </button>
            </Link>
          </div>

          {/* Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", animation: "slideUp 0.8s ease-out 0.65s both" }}>
            {["Für Anfänger", "Für Hobby-Magier", "Für Profis", "Für alle, die Magie lieben"].map(t => (
              <span key={t} style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "999px", padding: "6px 16px", fontSize: "0.85rem", color: "#a9a3bd" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="animate-float" style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, #D4AF37)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 10px #D4AF37" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#f6f5fa", marginBottom: "20px" }}>Dein Weg in die Magie</h2>
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)", maxWidth: "200px", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {features.map((f, i) => (
              <div key={i} className="card-hover" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", padding: "36px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(212,175,55,0.10))", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.1)" }}>
                  <f.icon style={{ width: 28, height: 28, color: "#D4AF37" }} />
                </div>
                <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f6f5fa", marginBottom: "12px" }}>{f.titel}</h3>
                <p style={{ color: "#655f78", lineHeight: 1.7, marginBottom: "28px" }}>{f.text}</p>
                <Link href={f.link} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#D4AF37", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                  {f.cta} <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          COMMUNITY
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: "999px", padding: "8px 16px", marginBottom: "28px" }}>
              <Heart style={{ width: 14, height: 14, color: "#D4AF37" }} />
              <span style={{ fontSize: "12px", color: "#B8912F", fontWeight: 600 }}>Exklusive Community</span>
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f6f5fa", lineHeight: 1.2, marginBottom: "24px" }}>
              Ein geschützter Ort für Menschen, die Magie{" "}
              <span style={{ background: "linear-gradient(135deg, #8A6A1F, #D4AF37, #F3E3A6)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>
                ernsthaft lieben.
              </span>
            </h2>
            <p style={{ color: "#655f78", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "36px" }}>
              Kein anonymes Forum. Keine laute Social-Media-Welt. Sondern eine echte Community mit Klarnamen, Respekt und Begeisterung.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/registrieren">
                <button className="btn-gold" style={{ borderRadius: "999px", padding: "14px 32px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}>
                  <Sparkles style={{ width: 18, height: 18 }} /> Kostenlos Mitglied werden
                </button>
              </Link>
              <Link href="/login">
                <button className="btn-outline-gold" style={{ borderRadius: "999px", padding: "14px 32px", fontWeight: 600 }}>Einloggen</button>
              </Link>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {vorteile.map((v, i) => (
              <div key={i} className="card-hover" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "22px" }}>{v.icon}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#cbc6da", lineHeight: 1.4 }}>{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FIRST TRICK CTA
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ position: "relative", borderRadius: "32px", padding: "80px 48px", textAlign: "center", overflow: "hidden", background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(212,175,55,0.08), rgba(124,58,237,0.15))", border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 0 80px rgba(212,175,55,0.06), inset 0 0 80px rgba(0,0,0,0.2)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
            <div className="animate-float" style={{ fontSize: "64px", marginBottom: "28px", position: "relative", zIndex: 1 }}>🎩</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f6f5fa", marginBottom: "20px", position: "relative", zIndex: 1 }}>
              Dein erster Trick ist der Anfang von allem.
            </h2>
            <p style={{ color: "#655f78", fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
              Du musst nicht perfekt sein. Jeder große Magier hat irgendwann seinen ersten Trick gezeigt.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", color: "#464158", marginBottom: "44px", position: "relative", zIndex: 1 }}>
              <span>Nicht perfekt.</span>
              <span style={{ color: "#D4AF37" }}>✦</span>
              <span>Einfach anfangen.</span>
              <span style={{ color: "#D4AF37" }}>✦</span>
              <span>Zeig uns deinen ersten magischen Moment.</span>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <Link href="/registrieren">
                <button className="btn-gold" style={{ borderRadius: "999px", padding: "20px 56px", fontSize: "1.1rem", display: "inline-flex", alignItems: "center", gap: "12px", boxShadow: "0 0 60px rgba(212,175,55,0.45), 0 20px 60px rgba(0,0,0,0.4)" }}>
                  <Zap style={{ width: 22, height: 22 }} /> Jetzt starten — kostenlos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TREFFEN
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", padding: "48px 56px", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
              <div className="animate-float" style={{ fontSize: "72px", flexShrink: 0 }}>🎭</div>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#D4AF37", fontSize: "0.85rem", fontWeight: 600, marginBottom: "12px" }}>
                  <MapPin style={{ width: 14, height: 14 }} /> Neu-Ulm · Florian Zimmer Theater
                </div>
                <h2 className="font-display" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#f6f5fa", marginBottom: "12px" }}>Treffen im Theater</h2>
                <p style={{ color: "#655f78", lineHeight: 1.7, maxWidth: "500px", marginBottom: "28px" }}>
                  Bring deinen Trick, deine Idee oder einfach deine Begeisterung mit. Gemeinsam machen wir daraus Magie. Kostenlos.
                </p>
                <Link href="/registrieren">
                  <button className="btn-gold" style={{ borderRadius: "999px", padding: "14px 32px", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
                    Mitglied werden und dabei sein <ArrowRight style={{ width: 18, height: 18 }} />
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
