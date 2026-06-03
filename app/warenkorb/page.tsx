"use client";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store";

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

export default function WarenkorbPage() {
  const { items, removeItem, updateMenge, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-display text-3xl font-bold text-dark-100 mb-3">Dein Warenkorb ist leer</h1>
        <p className="text-dark-400 mb-8">Entdecke unsere Tricks und werde Teil der Magie.</p>
        <Link href="/shop">
          <Button size="lg"><ShoppingBag className="w-5 h-5" /> Zum Magic Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-bold text-dark-50 mb-12">Warenkorb</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="glass rounded-2xl p-5 flex gap-4 items-center">
              <div className="w-16 h-16 bg-dark-900 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                🪄
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-dark-100 mb-1 truncate">{item.name}</h3>
                <p className="text-gold-400 font-bold">{formatPrice(item.preis_cents)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateMenge(item.id, item.menge - 1)}
                  className="w-8 h-8 rounded-full bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-300 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center font-semibold text-dark-100">{item.menge}</span>
                <button
                  onClick={() => updateMenge(item.id, item.menge + 1)}
                  className="w-8 h-8 rounded-full bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-300 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-dark-100 mb-1">{formatPrice(item.preis_cents * item.menge)}</p>
                <button onClick={() => removeItem(item.id)} className="text-dark-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="glass-gold rounded-2xl p-6 sticky top-24">
            <h2 className="font-display font-bold text-dark-100 text-lg mb-6">Bestellübersicht</h2>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-dark-400">{item.name} × {item.menge}</span>
                  <span className="text-dark-200">{formatPrice(item.preis_cents * item.menge)}</span>
                </div>
              ))}
              <div className="gold-divider" />
              <div className="flex justify-between">
                <span className="text-dark-300 font-medium">Versand</span>
                <span className="text-dark-300 text-sm">Wird berechnet</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-dark-100">Gesamt</span>
                <span className="text-gold-400">{formatPrice(total())}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button fullWidth size="lg">
                Zur Kasse <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <p className="text-center text-xs text-dark-500 mt-4">Sicherer Checkout · Stripe</p>

            {/* Community hint */}
            <div className="mt-6 p-4 bg-dark-900 rounded-xl border border-dark-700">
              <p className="text-xs text-dark-400 leading-relaxed">
                <Sparkles className="inline w-3 h-3 text-gold-400 mr-1" />
                Nach dem Kauf: Erstelle kostenlos dein Magieakademie-Profil und tausch dich mit anderen aus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
