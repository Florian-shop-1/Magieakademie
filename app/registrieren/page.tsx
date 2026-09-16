import { redirect } from "next/navigation";
import { angemeldetesMitglied } from "@/lib/auth/sitzung";
import { RegistrierFormular } from "./RegistrierFormular";

export const metadata = { title: "Mitglied werden · Magieakademie" };

export default async function RegistrierenPage() {
  if (await angemeldetesMitglied()) redirect("/videos");
  return <RegistrierFormular />;
}
