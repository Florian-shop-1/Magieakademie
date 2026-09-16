"use client";
import { useActionState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { passwortNeuSetzen } from "@/lib/auth/passwort-link";
import type { Formularstand } from "@/lib/auth/aktionen";

export function NeuesPasswortFormular({ schluessel }: { schluessel: string }) {
  const [stand, aktion, laeuft] = useActionState<Formularstand, FormData>(passwortNeuSetzen, {});

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10">
        <h1 className="font-display text-2xl font-bold text-gold-gradient mb-6">Neues Passwort setzen</h1>
        <form action={aktion} className="space-y-5">
          <input type="hidden" name="s" value={schluessel} />
          <label htmlFor="passwort" className="sr-only">Neues Passwort</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input id="passwort" name="passwort" type="password" required minLength={8} autoComplete="new-password" placeholder="Mindestens 8 Zeichen" className="input-dark pl-11" />
          </div>
          {stand.fehler && <p role="alert" className="text-sm text-red-300">{stand.fehler}</p>}
          <Button type="submit" fullWidth disabled={laeuft}>{laeuft ? "Wird gespeichert…" : "Speichern und einloggen"}</Button>
        </form>
      </div>
    </div>
  );
}
