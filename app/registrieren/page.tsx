"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, ChevronLeft, User, Mail, Lock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const levels = [
  { value: "anfaenger", label: "Anfänger", desc: "Ich starte gerade durch", emoji: "🌱" },
  { value: "fortgeschritten", label: "Fortgeschritten", desc: "Ich übe schon eine Weile", emoji: "🌟" },
  { value: "profi", label: "Profi", desc: "Ich trete auf", emoji: "🎩" },
];

const bereiche = [
  "Karten", "Münzen", "Mentalmagie", "Bühne", "Kinderzauberei", "Close-up"
];

export default function RegistrierenPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    vorname: "", nachname: "", email: "", passwort: "",
    stadt: "", level: "", kuenstlername: "", webseite: "",
    instagram: "", vorstellungstext: "", bereiche: [] as string[],
  });

  const update = (key: string, val: string | string[]) => setForm(f => ({ ...f, [key]: val }));
  const toggleBereich = (b: string) => {
    const arr = form.bereiche.includes(b) ? form.bereiche.filter(x => x !== b) : [...form.bereiche, b];
    update("bereiche", arr);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(180,83,9,0.08) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-gold-400 mx-auto mb-4 animate-float" />
          <h1 className="font-display text-3xl font-bold text-gold-gradient mb-2">Werde Teil der Magie</h1>
          <p className="text-dark-400">Kostenlos. Immer.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= s ? "bg-gradient-to-r from-gold-600 to-gold-400" : "bg-dark-800"}`} />
          ))}
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">

          {/* Step 1 — Basics */}
          {step === 1 && (
            <div className="space-y-5 animate-slide-up">
              <h2 className="font-display text-xl font-bold text-dark-100 mb-6">Dein Konto</h2>

              <div className="grid grid-cols-2 gap-4">
                {["vorname", "nachname"].map(f => (
                  <div key={f}>
                    <label className="block text-sm font-medium text-dark-300 mb-2 capitalize">{f === "vorname" ? "Vorname *" : "Nachname *"}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                      <input
                        value={form[f as "vorname" | "nachname"]}
                        onChange={e => update(f, e.target.value)}
                        required
                        className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-10 pr-3 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all text-sm"
                        placeholder={f === "vorname" ? "Max" : "Mustermann"}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">E-Mail *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
                    placeholder="max@email.de" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Passwort *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                  <input type="password" value={form.passwort} onChange={e => update("passwort", e.target.value)} required
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
                    placeholder="Mindestens 8 Zeichen" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Stadt / Region *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                  <input value={form.stadt} onChange={e => update("stadt", e.target.value)} required
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
                    placeholder="z.B. München" />
                </div>
              </div>

              <Button fullWidth size="lg" onClick={() => setStep(2)} disabled={!form.vorname || !form.nachname || !form.email || !form.passwort || !form.stadt}>
                Weiter <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2 — Level */}
          {step === 2 && (
            <div className="space-y-5 animate-slide-up">
              <h2 className="font-display text-xl font-bold text-dark-100 mb-2">Dein Erfahrungslevel *</h2>
              <p className="text-dark-400 text-sm mb-6">Sei ehrlich — hier gibt es kein Falsch.</p>
              <div className="space-y-3">
                {levels.map(l => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => update("level", l.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                      form.level === l.value
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-dark-700 bg-dark-900 hover:border-dark-600"
                    }`}
                  >
                    <span className="text-2xl">{l.emoji}</span>
                    <div>
                      <div className={`font-semibold ${form.level === l.value ? "text-gold-400" : "text-dark-200"}`}>{l.label}</div>
                      <div className="text-dark-500 text-sm">{l.desc}</div>
                    </div>
                    {form.level === l.value && <Star className="w-5 h-5 text-gold-400 ml-auto" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline-gold" size="lg" onClick={() => setStep(1)}>
                  <ChevronLeft className="w-5 h-5" /> Zurück
                </Button>
                <Button fullWidth size="lg" onClick={() => setStep(3)} disabled={!form.level}>
                  Weiter <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — Optional + Submit */}
          {step === 3 && (
            <div className="space-y-5 animate-slide-up">
              <h2 className="font-display text-xl font-bold text-dark-100 mb-2">Dein Profil</h2>
              <p className="text-dark-400 text-sm mb-6">Alles optional — du kannst es auch später ergänzen.</p>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Künstlername</label>
                <input value={form.kuenstlername} onChange={e => update("kuenstlername", e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
                  placeholder='z.B. "Magic Max"' />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Instagram / Social</label>
                <input value={form.instagram} onChange={e => update("instagram", e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all"
                  placeholder="@deinname" />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-3">Lieblingsbereiche</label>
                <div className="flex flex-wrap gap-2">
                  {bereiche.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => toggleBereich(b)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        form.bereiche.includes(b)
                          ? "border-gold-500 bg-gold-500/10 text-gold-300"
                          : "border-dark-700 text-dark-400 hover:border-dark-600"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Kurzer Vorstellungstext</label>
                <textarea value={form.vorstellungstext} onChange={e => update("vorstellungstext", e.target.value)} rows={3}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 outline-none transition-all resize-none"
                  placeholder="Erzähl uns, wie du zur Magie gekommen bist…" />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline-gold" size="lg" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-5 h-5" /> Zurück
                </Button>
                <Button fullWidth size="lg">
                  <Sparkles className="w-5 h-5" /> Jetzt Mitglied werden
                </Button>
              </div>

              <p className="text-center text-xs text-dark-500 mt-4">
                Mit der Registrierung stimmst du unseren <Link href="/agb" className="text-gold-500 hover:underline">AGB</Link> und der <Link href="/datenschutz" className="text-gold-500 hover:underline">Datenschutzerklärung</Link> zu.
              </p>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-dark-500 text-sm">
          Bereits Mitglied?{" "}
          <Link href="/login" className="text-gold-400 hover:text-gold-300 font-semibold">Einloggen</Link>
        </p>
      </div>
    </div>
  );
}
