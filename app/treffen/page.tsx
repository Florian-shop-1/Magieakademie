"use client";
import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const treffen = [
  {
    id: "1",
    titel: "Magic Jam — Kartenmagie & Close-up",
    datum: "2026-07-12",
    uhrzeit: "15:00 Uhr",
    maxTeilnehmer: 15,
    anmeldungen: 9,
    beschreibung: "Bring dein Kartendeck mit und zeig, woran du gerade arbeitest. Gemeinsam geben wir uns Feedback, üben und lachen. Florian Zimmer schaut vorbei.",
    themen: ["Kartenmagie", "Close-up", "Feedback-Runde"],
  },
  {
    id: "2",
    titel: "Anfänger-Abend — Dein erster Trick",
    datum: "2026-07-26",
    uhrzeit: "14:00 Uhr",
    maxTeilnehmer: 20,
    anmeldungen: 6,
    beschreibung: "Für alle, die gerade anfangen. Bring deinen ersten oder zweiten Trick mit — egal wie unsicher du noch bist. Hier ist alles willkommen.",
    themen: ["Anfänger", "Erster Trick", "Grundlagen"],
  },
  {
    id: "3",
    titel: "Bühnenmagie & Präsentation",
    datum: "2026-08-09",
    uhrzeit: "16:00 Uhr",
    maxTeilnehmer: 12,
    anmeldungen: 4,
    beschreibung: "Wie präsentierst du einen Trick überzeugend? Wie baust du eine Routine? Florian Zimmer gibt Einblicke aus seiner Bühnenerfahrung.",
    themen: ["Bühnenzauber", "Präsentation", "Routine"],
  },
];

function TreffenCard({ t }: { t: typeof treffen[0] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", level: "", woran: "" });
  const [sent, setSent] = useState(false);
  const frei = t.maxTeilnehmer - t.anmeldungen;
  const datum = new Date(t.datum).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden card-hover">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {t.themen.map(th => <Badge key={th} variant="gold">{th}</Badge>)}
              {frei <= 3 && <Badge variant="green">Nur noch {frei} Plätze!</Badge>}
            </div>
            <h2 className="font-display text-2xl font-bold text-dark-50 mb-4">{t.titel}</h2>
            <div className="flex flex-wrap gap-5 text-sm text-dark-400 mb-4">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-400" />{datum}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold-400" />{t.uhrzeit}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-400" />Florian Zimmer Theater, Neu-Ulm</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gold-400" />{t.anmeldungen}/{t.maxTeilnehmer} Anmeldungen</span>
            </div>
            <p className="text-dark-300 leading-relaxed">{t.beschreibung}</p>
          </div>

          {/* Progress bar */}
          <div className="md:w-32 flex flex-col items-center gap-2">
            <div className="w-full bg-dark-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-gold-600 to-gold-400 h-2 rounded-full transition-all"
                style={{ width: `${(t.anmeldungen / t.maxTeilnehmer) * 100}%` }} />
            </div>
            <span className="text-xs text-dark-500">{frei} Plätze frei</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button onClick={() => setOpen(!open)} size="md">
            {open ? "Formular schließen" : "Ich möchte dabei sein"}
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <span className="text-xs text-dark-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-500" /> Kostenlos
          </span>
        </div>
      </div>

      {/* Anmeldung */}
      {open && !sent && (
        <div className="border-t border-dark-800 p-6 md:p-8 bg-dark-950/50">
          <h3 className="font-display font-bold text-dark-100 mb-5">Anmeldung: {t.titel}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-dark-400 mb-2">Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm"
                placeholder="Vor- und Nachname" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark-400 mb-2">E-Mail *</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm"
                placeholder="deine@email.de" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark-400 mb-2">Erfahrungslevel *</label>
              <select required value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 focus:border-gold-500 outline-none transition-all text-sm">
                <option value="">Bitte wählen…</option>
                <option>Anfänger</option>
                <option>Fortgeschritten</option>
                <option>Profi</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-dark-400 mb-2">Woran möchtest du arbeiten?</label>
              <textarea value={form.woran} onChange={e => setForm(f => ({ ...f, woran: e.target.value }))} rows={3}
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm resize-none"
                placeholder="Ein bestimmter Trick, eine Routine, oder einfach zuhören und lernen…" />
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-dark-500 mb-4">⚠️ Plätze sind begrenzt. Wir bestätigen deine Anmeldung per E-Mail.</p>
              <Button type="submit" size="md">
                <Sparkles className="w-4 h-4" /> Verbindlich anmelden
              </Button>
            </div>
          </form>
        </div>
      )}

      {open && sent && (
        <div className="border-t border-dark-800 p-8 bg-dark-950/50 text-center">
          <div className="text-4xl mb-3">🎩</div>
          <h3 className="font-display font-bold text-dark-50 text-xl mb-2">Du bist dabei!</h3>
          <p className="text-dark-400">Wir freuen uns auf dich. Bestätigung kommt per E-Mail.</p>
        </div>
      )}
    </div>
  );
}

export default function TreffenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-6">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span className="text-sm text-gold-300">Florian Zimmer Theater · Neu-Ulm</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-dark-50 mb-6">
          Treffen im <span className="text-gold-gradient">Theater</span>
        </h1>
        <p className="text-dark-300 text-xl max-w-3xl mx-auto leading-relaxed">
          Bring deinen Trick, deine Idee oder einfach deine Begeisterung mit. Gemeinsam machen wir daraus Magie.
        </p>
        <p className="text-gold-400 font-display text-lg mt-4">Immer kostenlos. Immer willkommen.</p>
      </div>

      <div className="space-y-6">
        {treffen.map(t => <TreffenCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}
