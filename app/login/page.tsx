"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(180,83,9,0.1) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Sparkles className="w-10 h-10 text-gold-400 mx-auto mb-4 animate-float" />
          <h1 className="font-display text-3xl font-bold text-gold-gradient mb-2">Willkommen zurück</h1>
          <p className="text-dark-400">Melde dich an und tauche ein in die Magie.</p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="email"
                  required
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-4 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 outline-none transition-all"
                  placeholder="deine@email.de"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-11 pr-12 py-3 text-dark-100 placeholder-dark-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/passwort-vergessen" className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                Passwort vergessen?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? "Wird angemeldet…" : "Einloggen"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-dark-800 text-center">
            <p className="text-dark-400 text-sm">
              Noch kein Konto?{" "}
              <Link href="/registrieren" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                Kostenlos Mitglied werden
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
