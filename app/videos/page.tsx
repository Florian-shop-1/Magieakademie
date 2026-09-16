import Link from "next/link";
import { Lock, Play, Sparkles } from "lucide-react";
import { mitgliedPflicht } from "@/lib/auth/sitzung";
import { alleVideos, type Video } from "@/lib/videos";
import { CodeFormular } from "./CodeFormular";

export const metadata = { title: "Meine Videos · Magieakademie" };
export const dynamic = "force-dynamic";

function Karte({ v }: { v: Video }) {
  const gesperrt = v.mitCode && !v.frei;
  return (
    <Link
      href={`/videos/${v.slug}`}
      className="card-hover glass rounded-2xl p-6 flex flex-col gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
    >
      <div className="flex items-center justify-between">
        <span
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-gold-500/25"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(212,175,55,0.10))" }}
        >
          {gesperrt ? <Lock className="w-5 h-5 text-dark-300" /> : <Play className="w-5 h-5 text-gold-400" />}
        </span>
        {v.kategorie && <span className="text-xs text-dark-400">{v.kategorie}</span>}
      </div>
      <h3 className="font-display text-lg font-bold text-dark-50">{v.titel}</h3>
      {v.beschreibung && <p className="text-sm text-dark-400 line-clamp-3">{v.beschreibung}</p>}
      <span className={`mt-auto text-sm font-semibold ${gesperrt ? "text-dark-400" : "text-gold-400"}`}>
        {gesperrt ? "Mit Code aus dem Pass" : "Ansehen"}
      </span>
    </Link>
  );
}

export default async function VideosPage() {
  const mitglied = await mitgliedPflicht("/videos");
  const videos = await alleVideos(mitglied.id);

  // Bibliothek: freigeschaltete Pass-Tricks zuerst, dann alle offenen Videos,
  // dann die Pass-Tricks, die noch auf einen Code warten.
  const meineTricks = videos.filter((v) => v.mitCode && v.frei);
  const offen = videos.filter((v) => !v.mitCode);
  const gesperrt = videos.filter((v) => v.mitCode && !v.frei);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-14">
      <header>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-lila-300 mb-3">Deine Bibliothek</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-50 mb-3 text-balance">
          Hallo {mitglied.vorname || mitglied.anzeigename || "und willkommen"}!
        </h1>
        <p className="text-dark-400 max-w-2xl">Hier findest du alle Tricks der Magieakademie und die Tricks, die du im Theater bekommen hast.</p>
      </header>

      <CodeFormular />

      {meineTricks.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-dark-50 mb-5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400" /> Meine Tricks aus dem Theater
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{meineTricks.map((v) => <Karte key={v.id} v={v} />)}</div>
        </section>
      )}

      <section>
        <h2 className="font-display text-xl text-dark-50 mb-5">Für alle Mitglieder</h2>
        {offen.length === 0 ? (
          <p className="text-dark-400">Die Videos werden gerade eingespielt. Schau bald wieder vorbei.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{offen.map((v) => <Karte key={v.id} v={v} />)}</div>
        )}
      </section>

      {gesperrt.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-dark-50 mb-2">Tricks aus dem Theater</h2>
          <p className="text-dark-400 text-sm mb-5">Diese Tricks gibt es im Florian Zimmer Theater. Mit dem Code aus dem Pass schaltest du sie frei.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{gesperrt.map((v) => <Karte key={v.id} v={v} />)}</div>
        </section>
      )}
    </div>
  );
}
