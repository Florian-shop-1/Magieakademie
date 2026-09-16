"use client";
import { useActionState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registrieren, type Formularstand } from "@/lib/auth/aktionen";

const feld =
  "w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 outline-none transition-all";

/*
  Registrierung in einem Schritt.

  Das frühere dreistufige Profil (Stadt, Erfahrung, Künstlername) kommt mit
  der Community zurück. Für den Umzug zählt nur: Konto anlegen, Videos sehen.
  Der Newsletter ist ein eigenes, nicht vorausgewähltes Häkchen, so verlangt
  es das Werberecht.
*/
export function RegistrierFormular() {
  const [stand, aktion, laeuft] = useActionState<Formularstand, FormData>(registrieren, {});

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-magieakademie.png" alt="Magieakademie" className="logo-glow mx-auto mb-6 w-72 max-w-full h-auto" />
          <h1 className="font-display text-3xl font-bold text-gold-gradient mb-2">Werde Teil der Magie</h1>
          <p className="text-dark-400">Kostenlos. Danach siehst du sofort alle Mitglieder-Videos.</p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          <form action={aktion} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vorname" className="block text-sm font-medium text-dark-300 mb-2">Vorname *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                  <input id="vorname" name="vorname" required autoComplete="given-name" className={feld} placeholder="Max" />
                </div>
              </div>
              <div>
                <label htmlFor="nachname" className="block text-sm font-medium text-dark-300 mb-2">Nachname</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                  <input id="nachname" name="nachname" autoComplete="family-name" className={feld} placeholder="Mustermann" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">E-Mail *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input id="email" name="email" type="email" required autoComplete="email" className={feld} placeholder="max@email.de" />
              </div>
            </div>

            <div>
              <label htmlFor="passwort" className="block text-sm font-medium text-dark-300 mb-2">Passwort *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input id="passwort" name="passwort" type="password" required minLength={8} autoComplete="new-password" className={feld} placeholder="Mindestens 8 Zeichen" />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-dark-300 cursor-pointer">
              <input type="checkbox" name="newsletter" value="ja" className="mt-1 h-4 w-4 accent-[#D4AF37]" />
              <span>Ja, schick mir Magic News mit neuen Tricks, Treffen und Shows. Abmelden geht jederzeit.</span>
            </label>

            {stand.fehler && (
              <p role="alert" className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {stand.fehler}
              </p>
            )}

            <Button type="submit" fullWidth size="lg" disabled={laeuft}>
              <Sparkles className="w-5 h-5" /> {laeuft ? "Wird angelegt…" : "Jetzt Mitglied werden"}
            </Button>

            <p className="text-center text-xs text-dark-500">
              Mit der Registrierung stimmst du den{" "}
              <Link href="/datenschutz" className="text-gold-500 hover:underline">Datenschutzhinweisen</Link> zu.
            </p>
          </form>
        </div>

        <p className="text-center mt-6 text-dark-500 text-sm">
          Bereits Mitglied?{" "}
          <Link href="/login" className="text-gold-400 hover:text-gold-300 font-semibold">Einloggen</Link>
        </p>
      </div>
    </div>
  );
}
