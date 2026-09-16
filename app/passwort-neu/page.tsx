import { NeuesPasswortFormular } from "./NeuesPasswortFormular";

export const metadata = { title: "Neues Passwort · Magieakademie", robots: { index: false } };

export default async function PasswortNeuPage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams;
  return <NeuesPasswortFormular schluessel={s ?? ""} />;
}
