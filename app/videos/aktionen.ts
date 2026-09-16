"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { angemeldetesMitglied } from "@/lib/auth/sitzung";
import { codeEinloesen } from "@/lib/videos";

export interface CodeStand {
  fehler?: string;
  frei?: { slug: string; titel: string };
}

/** Code aus dem Pass einlösen, von der Bibliothek oder von der Videoseite aus. */
export async function passCodeEinloesen(_: CodeStand, formular: FormData): Promise<CodeStand> {
  const mitglied = await angemeldetesMitglied();
  if (!mitglied) return { fehler: "Bitte melde dich zuerst an." };

  const kennung = `code:${mitglied.id}`;
  const [z] = (await db()`
    select count(*)::int as n from anmeldeversuch where kennung = ${kennung} and zeit > now() - interval '15 minutes'
  `) as Array<{ n: number }>;
  if ((z?.n ?? 0) >= 10) return { fehler: "Zu viele Versuche. Probier es in 15 Minuten noch einmal." };

  const ergebnis = await codeEinloesen(String(formular.get("code") ?? ""), mitglied.id);
  if ("fehler" in ergebnis) {
    await db()`insert into anmeldeversuch (kennung) values (${kennung})`;
    return { fehler: ergebnis.fehler };
  }
  revalidatePath("/videos");
  revalidatePath(`/videos/${ergebnis.video.slug}`);
  return { frei: ergebnis.video };
}
