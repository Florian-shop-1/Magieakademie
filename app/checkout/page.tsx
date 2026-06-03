"use client";
import { useState } from "react";
import { Lock, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store";

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

const inputClass = "w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 outline-none transition-all text-sm";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [gleich, setGleich] = useState(true);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Stripe integration
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-12">
        <Lock className="w-5 h-5 text-gold-400" />
        <h1 className="font-display text-3xl font-bold text-dark-50">Kasse</h1>
        <span className="text-sm text-dark-500">Sicherer Checkout · SSL verschlüsselt</span>
      </div>

      <form onSubmit={handleOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">

            {/* Kundendaten */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark-100 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center">1</span>
                Deine Daten
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark-400 mb-2">Vorname *</label>
                  <input className={inputClass} placeholder="Max" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-400 mb-2">Nachname *</label>
                  <input className={inputClass} placeholder="Mustermann" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-dark-400 mb-2">E-Mail *</label>
                  <input type="email" className={inputClass} placeholder="max@email.de" required />
                </div>
              </div>
            </div>

            {/* Rechnungsadresse */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark-100 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center">2</span>
                Rechnungsadresse
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark-400 mb-2">Straße & Hausnummer *</label>
                  <input className={inputClass} placeholder="Musterstraße 1" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-2">PLZ *</label>
                    <input className={inputClass} placeholder="89073" required />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-dark-400 mb-2">Stadt *</label>
                    <input className={inputClass} placeholder="Ulm" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-400 mb-2">Land</label>
                  <select className={inputClass}>
                    <option value="de">Deutschland</option>
                    <option value="at">Österreich</option>
                    <option value="ch">Schweiz</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Versandadresse */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark-100 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-gold-400" /> Lieferadresse
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={gleich} onChange={e => setGleich(e.target.checked)}
                  className="w-4 h-4 accent-gold-500" />
                <span className="text-dark-300 text-sm">Gleich wie Rechnungsadresse</span>
              </label>
              {!gleich && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <input className={inputClass} placeholder="Straße & Hausnummer" />
                  <div className="grid grid-cols-3 gap-4">
                    <input className={inputClass} placeholder="PLZ" />
                    <div className="col-span-2"><input className={inputClass} placeholder="Stadt" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* Zahlung */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center">3</span>
                Zahlung
              </h2>
              <div className="glass-gold rounded-xl p-4 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gold-400" />
                <div>
                  <p className="text-dark-200 font-medium text-sm">Sichere Zahlung via Stripe</p>
                  <p className="text-dark-500 text-xs">Kreditkarte, SEPA, PayPal und mehr</p>
                </div>
              </div>
              <p className="text-dark-600 text-xs mt-3">Stripe wird bei der Fertigstellung angeschlossen. Platzhalter aktiv.</p>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="glass-gold rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-dark-100 mb-5">Bestellübersicht</h2>
              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-dark-400">{item.name} × {item.menge}</span>
                    <span className="text-dark-200">{formatPrice(item.preis_cents * item.menge)}</span>
                  </div>
                ))}
              </div>
              <div className="gold-divider mb-4" />
              <div className="flex justify-between text-lg font-bold mb-6">
                <span className="text-dark-100">Gesamt</span>
                <span className="text-gold-400">{formatPrice(total())}</span>
              </div>
              <Button type="submit" fullWidth size="lg" disabled={loading || items.length === 0}>
                {loading ? "Wird verarbeitet…" : "Kostenpflichtig bestellen"}
              </Button>
              <p className="text-center text-xs text-dark-600 mt-4">
                SSL-verschlüsselt · Stripe Secure
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
