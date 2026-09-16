import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Verbindung zur Datenbank (Neon, eigene Datenbank "magieakademie").
 * Die Verbindung steht in DATABASE_URL.
 */
let client: NeonQueryFunction<false, false> | null = null;

export function db(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL ist nicht gesetzt.");
    client = neon(url);
  }
  return client;
}
