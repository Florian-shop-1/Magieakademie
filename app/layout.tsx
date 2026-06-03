import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Magieakademie — Die größte deutschsprachige Zaubercommunity",
  description: "Lerne Zaubern, zeig deinen ersten Trick, tausche dich aus und werde Teil einer Community, die Magie liebt.",
  keywords: "Zauberei, Zaubertricks lernen, Zaubercommunity, Magic, Kartentricks, Deutschland",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col bg-dark-950 text-dark-100">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
