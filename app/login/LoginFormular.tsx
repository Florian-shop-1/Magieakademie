"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { anmelden, type Formularstand } from "@/lib/auth/aktionen";

const feld =
  "w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 outline-none transition-all";

export function LoginFormular({ weiter }: { weiter: string }) {
  const [showPw, setShowPw] = useState(false);
  const [stand, aktion, laeuft] = useActionState<Formularstand, FormData>(anmelden, {});

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-magieakademie.png" alt="Magieakademie" className="logo-glow mx-auto mb-6 w-72 max-w-full h-auto" />
          <h1 className="font-display text-3xl font-bold text-gold-gradient mb-2">Willkommen zurück</h1>
          <p className="text-dark-400">Dein bisheriges Passwort gilt weiter.</p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          <form action={aktion} className="space-y-5">
            <input type="hidden" name="weiter" value={weiter} />
            <div>
              <label htmlFor="kennung" className="block text-sm font-medium text-dark-300 mb-2">E-Mail oder Benutzername</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input id="kennung" name="kennung" required autoComplete="username" className={feld} placeholder="deine@email.de" />
              </div>
            </div>

            <div>
              <label htmlFor="passwort" className="block text-sm font-medium text-dark-300 mb-2">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  id="passwort"
                  name="passwort"
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className={`${feld} pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {stand.fehler && (
              <p role="alert" className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {stand.fehler}
              </p>
            )}

            <div className="flex justify-end">
              <Link href="/passwort-vergessen" className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                Passwort vergessen?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={laeuft}>
              {laeuft ? "Wird angemeldet…" : "Einloggen"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-dark-800 text-center">
            <p className="text-dark-400 text-sm">
              Noch kein Konto?{" "}
              <Link href="/registrieren" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                Kostenlos Mitglied werden
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
