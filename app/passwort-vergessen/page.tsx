"use client";
import { useActionState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { linkAnfordern } from "@/lib/auth/passwort-link";
import type { Formularstand } from "@/lib/auth/aktionen";

export default function PasswortVergessenPage() {
  const [stand, aktion, laeuft] = useActionState<Formularstand, FormData>(linkAnfordern, {});

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10">
        <h1 className="font-display text-2xl font-bold text-gold-gradient mb-2">Passwort vergessen?</h1>
        <p className="text-dark-400 mb-6">Gib deine E-Mail ein. Wir schicken dir einen Link, mit dem du ein neues Passwort setzt.</p>
        {stand.ok ? (
          <p role="status" className="text-sm text-dark-100 bg-lila-600/15 border border-lila-400/30 rounded-xl px-4 py-3">{stand.ok}</p>
        ) : (
          <form action={aktion} className="space-y-5">
            <label htmlFor="email" className="sr-only">E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="deine@email.de" className="input-dark pl-11" />
            </div>
            {stand.fehler && <p role="alert" className="text-sm text-red-300">{stand.fehler}</p>}
            <Button type="submit" fullWidth disabled={laeuft}>{laeuft ? "Wird geschickt…" : "Link schicken"}</Button>
          </form>
        )}
        <p className="text-center mt-6 text-sm">
          <Link href="/login" className="text-gold-400 hover:text-gold-300">Zurück zum Login</Link>
        </p>
      </div>
    </div>
  );
}
