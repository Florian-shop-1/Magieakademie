"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, UserPlus } from "lucide-react";
import { abmelden } from "@/lib/auth/aktionen";
import { Button } from "@/components/ui/Button";

// Community, Mitglieder und Treffen kommen später. Bis dahin nur, was echt funktioniert.
const publicNav = [
  { href: "/", label: "Start" },
  { href: "/videos", label: "Videos" },
];

const privateNav = [
  { href: "/", label: "Start" },
  { href: "/videos", label: "Meine Videos" },
];

export interface NavMitglied {
  name: string;
}

export function Navbar({ user }: { user: NavMitglied | null }) {
  const [open, setOpen] = useState(false);
  const nav = user ? privateNav : publicNav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-magieakademie.png" alt="Magieakademie" className="h-9 w-auto logo-glow transition-transform group-hover:scale-[1.02]" />
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

            {user ? (
              <div className="flex items-center gap-2">
                <span
                  title={user.name}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-dark-950 font-bold text-sm"
                >
                  {(user.name[0] || "M").toUpperCase()}
                </span>
                <form action={abmelden}>
                  <Button type="submit" variant="ghost" size="sm" aria-label="Abmelden">
                    <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Abmelden</span>
                  </Button>
                </form>
              </div>
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
