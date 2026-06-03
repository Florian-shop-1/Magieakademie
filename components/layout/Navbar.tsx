"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Sparkles, LogIn, UserPlus } from "lucide-react";
import { useCart, useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";

const publicNav = [
  { href: "/", label: "Start" },
  { href: "/shop", label: "Magic Shop" },
  { href: "/community", label: "Community" },
  { href: "/treffen", label: "Treffen im Theater" },
];

const privateNav = [
  { href: "/community", label: "Community" },
  { href: "/erster-trick", label: "Mein erster Trick" },
  { href: "/mitglieder", label: "Mitglieder" },
  { href: "/treffen", label: "Treffen" },
  { href: "/shop", label: "Shop" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();
  const nav = user ? privateNav : publicNav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors" />
            </div>
            <span className="font-display text-lg font-bold text-gold-gradient">
              Magieakademie
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-dark-200 hover:text-gold-400 hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link href="/warenkorb" className="relative p-2 text-dark-300 hover:text-gold-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-dark-950 text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </Link>

            {user ? (
              <Link href="/profil">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-dark-950 font-bold text-sm">
                  {user.vorname[0]}
                </div>
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </Link>
                <Link href="/registrieren">
                  <Button size="sm">
                    <UserPlus className="w-4 h-4" /> Kostenlos dabei sein
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-dark-300 hover:text-gold-400 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-4 space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-dark-200 hover:text-gold-400 hover:bg-white/5 rounded-xl transition-all"
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline-gold" fullWidth>Login</Button>
              </Link>
              <Link href="/registrieren" onClick={() => setOpen(false)}>
                <Button fullWidth>Kostenlos Mitglied werden</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
