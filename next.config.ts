import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Der Magic Shop kommt erst später. Bis dahin führen alte Links zur Startseite.
  async redirects() {
    return ["/shop", "/warenkorb", "/checkout"].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
