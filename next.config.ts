import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shop, Community, Mitglieder und Treffen kommen erst später. Bis dahin
  // zeigen diese Seiten nur Beispielinhalte und führen deshalb zur Startseite.
  async redirects() {
    const spaeter = ["/shop", "/warenkorb", "/checkout", "/community", "/mitglieder", "/treffen", "/erster-trick", "/admin", "/profil"];
    const alteSeite = [
      // Adressen der alten WordPress-Seite, damit Lesezeichen weiter funktionieren.
      { source: "/video_listing/:pfad*", destination: "/videos" },
      { source: "/video_cat/:pfad*", destination: "/videos" },
      { source: "/wp-login.php", destination: "/login" },
      { source: "/wp-admin/:pfad*", destination: "/login" },
      { source: "/online-pass", destination: "/videos" },
      { source: "/datenschutzerklaerung", destination: "/datenschutz" },
      { source: "/kontakt-seite", destination: "/impressum" },
      { source: "/zauberwuerfel-1", destination: "/videos/zauberwuerfel" },
      { source: "/stift-durch-geldschein", destination: "/videos/stift-durch-geldschein" },
      { source: "/verschwindendes_tuch", destination: "/videos/verschwindendes-tuch" },
      { source: "/geld-druck-maschine", destination: "/videos/geld-druck-maschine" },
      { source: "/zauberstab-3", destination: "/videos/zauberstab" },
      { source: "/schwebendes-streichholz", destination: "/videos/schwebendes-streichholz" },
    ];
    return [...alteSeite.map((r) => ({ ...r, permanent: true })), ...spaeter.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }))];
  },
};

export default nextConfig;
