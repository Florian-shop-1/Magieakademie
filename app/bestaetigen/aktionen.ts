"use server";

import { redirect } from "next/navigation";
import { bestaetigen } from "@/lib/auth/bestaetigung";
import { sitzungStarten } from "@/lib/auth/sitzung";

export async function anmeldungBestaetigen(_: { fehler?: string }, formular: FormData): Promise<{ fehler?: string }> {
  const id = await bestaetigen(String(formular.get("s") ?? ""));
  if (!id) {
    return { fehler: "Dieser Link ist abgelaufen oder wurde schon benutzt. Wenn du schon bestätigt hast, melde dich einfach an." };
  }
  await sitzungStarten(id);
  redirect("/videos");
}
