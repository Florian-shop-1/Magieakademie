import { redirect } from "next/navigation";
import { angemeldetesMitglied, sicheresZiel } from "@/lib/auth/sitzung";
import { LoginFormular } from "./LoginFormular";

export const metadata = { title: "Einloggen · Magieakademie" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ weiter?: string }> }) {
  const { weiter } = await searchParams;
  const ziel = sicheresZiel(weiter);
  if (await angemeldetesMitglied()) redirect(ziel);
  return <LoginFormular weiter={ziel} />;
}
