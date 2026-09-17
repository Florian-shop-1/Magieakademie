"use client";
import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { anmeldungBestaetigen } from "./aktionen";

export function BestaetigenFormular({ schluessel }: { schluessel: string }) {
  const [stand, aktion, laeuft] = useActionState(anmeldungBestaetigen, {} as { fehler?: string });
  const formular = useRef<HTMLFormElement>(null);
  const gesendet = useRef(false);

  // Sofort abschicken, sobald die Seite im Browser offen ist.
  useEffect(() => {
    if (!gesendet.current && schluessel) {
      gesendet.current = true;
      formular.current?.requestSubmit();
    }
  }, [schluessel]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-magieakademie.png" alt="Magieakademie" className="logo-glow mx-auto mb-6 w-64 max-w-full h-auto" />
        <h1 className="font-display text-2xl font-bold text-gold-gradient mb-4">Anmeldung bestätigen</h1>
        {stand.fehler ? (
          <>
            <p role="alert" className="text-dark-300 mb-6">{stand.fehler}</p>
            <Link href="/login" className="text-gold-400 hover:text-gold-300 font-semibold">Zum Login</Link>
          </>
        ) : (
          <form ref={formular} action={aktion} className="space-y-4">
            <input type="hidden" name="s" value={schluessel} />
            <p className="text-dark-300">
              {laeuft ? "Einen Moment, wir bestätigen deine Adresse…" : "Klick auf den Knopf, um deine Anmeldung abzuschließen."}
            </p>
            <Button type="submit" fullWidth disabled={laeuft || !schluessel}>
              {laeuft ? "Wird bestätigt…" : "Jetzt bestätigen"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
