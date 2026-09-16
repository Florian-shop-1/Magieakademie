"use client";
import { useActionState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { passCodeEinloesen, type CodeStand } from "./aktionen";

/**
 * Code aus dem Pass eingeben. Steht in der Bibliothek (kompakt) und auf
 * einem gesperrten Trick (gross). Der Code sagt selbst, welcher Trick es ist.
 */
export function CodeFormular({ gross = false }: { gross?: boolean }) {
  const [stand, aktion, laeuft] = useActionState<CodeStand, FormData>(passCodeEinloesen, {});

  return (
    <div className={`glass-lila rounded-2xl ${gross ? "p-8 text-center" : "p-6"}`}>
      <div className={`flex items-center gap-3 mb-2 ${gross ? "justify-center" : ""}`}>
        <KeyRound className="w-5 h-5 text-gold-400" />
        <h2 className="font-display text-lg font-bold text-dark-50">
          {gross ? "Dieser Trick wartet auf deinen Code" : "Trick aus dem Florian Zimmer Theater freischalten"}
        </h2>
      </div>
      <p className="text-dark-300 text-sm mb-4">
        Gib den Code von deinem Pass ein. Der Trick bleibt danach für immer in deiner Bibliothek.
      </p>
      <form action={aktion} className={`flex flex-col sm:flex-row gap-3 ${gross ? "max-w-md mx-auto" : ""}`}>
        <label htmlFor="pass-code" className="sr-only">Code aus dem Pass</label>
        <input id="pass-code" name="code" required autoComplete="off" autoCapitalize="characters" placeholder="Code aus dem Pass" className="input-dark flex-1" />
        <Button type="submit" disabled={laeuft}>{laeuft ? "Prüfe…" : "Freischalten"}</Button>
      </form>
      {stand.fehler && <p role="alert" className="text-sm text-red-300 mt-3">{stand.fehler}</p>}
      {stand.frei && (
        <p role="status" className="text-sm text-dark-100 mt-3">
          Freigeschaltet: <strong>{stand.frei.titel}</strong>.{" "}
          <Link href={`/videos/${stand.frei.slug}`} className="text-gold-400 hover:underline">Jetzt ansehen</Link>
        </p>
      )}
    </div>
  );
}
