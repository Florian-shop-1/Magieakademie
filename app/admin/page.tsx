import Link from "next/link";
import { Package, Users, ShoppingBag, Calendar, MessageSquare, BarChart3, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { label: "Mitglieder", value: "1.247", trend: "+23 diese Woche", icon: Users, color: "text-blue-400" },
  { label: "Bestellungen", value: "89", trend: "+12 diese Woche", icon: ShoppingBag, color: "text-green-400" },
  { label: "Community Posts", value: "342", trend: "+47 diese Woche", icon: MessageSquare, color: "text-purple-400" },
  { label: "Produkte aktiv", value: "24", trend: "3 im Entwurf", icon: Package, color: "text-gold-400" },
];

const sections = [
  { href: "/admin/produkte", label: "Produkte", desc: "Anlegen, bearbeiten, löschen", icon: Package },
  { href: "/admin/bestellungen", label: "Bestellungen", desc: "Alle Bestellungen einsehen", icon: ShoppingBag },
  { href: "/admin/mitglieder", label: "Mitglieder", desc: "Nutzer ansehen & verwalten", icon: Users },
  { href: "/admin/community", label: "Community moderieren", desc: "Beiträge freigeben oder löschen", icon: MessageSquare },
  { href: "/admin/treffen", label: "Treffen verwalten", desc: "Treffen anlegen & Anmeldungen sehen", icon: Calendar },
  { href: "/admin/startseite", label: "Startseiten-Texte", desc: "Headline & Texte bearbeiten", icon: Settings },
];

const recentBestellungen = [
  { id: "#1089", name: "Max Mustermann", produkt: "Traumkarten Deck", preis: "24,90 €", status: "Bezahlt" },
  { id: "#1088", name: "Lisa Hoffmann", produkt: "Kinder-Zauberbox", preis: "34,90 €", status: "Bezahlt" },
  { id: "#1087", name: "Thomas K.", produkt: "Das magische Seil", preis: "14,90 €", status: "Versendet" },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-display text-4xl font-bold text-dark-50">Admin Dashboard</h1>
          <p className="text-dark-400 mt-1">Magieakademie.de — Übersicht</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/produkte/neu">
            <Button size="sm"><Plus className="w-4 h-4" /> Neues Produkt</Button>
          </Link>
          <Link href="/admin/treffen/neu">
            <Button variant="outline-gold" size="sm"><Plus className="w-4 h-4" /> Neues Treffen</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon className={`w-6 h-6 ${s.color}`} />
              <BarChart3 className="w-4 h-4 text-dark-600" />
            </div>
            <div className="font-display text-3xl font-bold text-dark-50 mb-1">{s.value}</div>
            <div className="text-sm text-dark-400 font-medium">{s.label}</div>
            <div className="text-xs text-dark-600 mt-1">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {sections.map((s, i) => (
          <Link key={i} href={s.href}>
            <div className="glass rounded-2xl p-5 card-hover group flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-600/10 border border-gold-500/20 flex items-center justify-center group-hover:border-gold-400/40 transition-all">
                <s.icon className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <div className="font-semibold text-dark-100">{s.label}</div>
                <div className="text-xs text-dark-500">{s.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-dark-100 text-lg">Letzte Bestellungen</h2>
          <Link href="/admin/bestellungen" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">Alle ansehen →</Link>
        </div>
        <div className="space-y-3">
          {recentBestellungen.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-dark-900 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="text-dark-500 text-sm font-mono">{b.id}</span>
                <div>
                  <p className="text-dark-200 text-sm font-medium">{b.name}</p>
                  <p className="text-dark-500 text-xs">{b.produkt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gold-400">{b.preis}</span>
                <span className={`text-xs px-3 py-1 rounded-full ${b.status === "Bezahlt" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
