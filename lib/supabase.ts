import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          vorname: string;
          nachname: string;
          kuenstlername: string | null;
          stadt: string;
          erfahrungslevel: "anfaenger" | "fortgeschritten" | "profi";
          webseite: string | null;
          instagram: string | null;
          vorstellungstext: string | null;
          lieblingsbereich: string[];
          applaus_gesamt: number;
          avatar_url: string | null;
          rolle: "mitglied" | "admin";
          created_at: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          titel: string;
          inhalt: string;
          kategorie: string;
          bild_url: string | null;
          video_url: string | null;
          applaus: number;
          kommentar_anzahl: number;
          created_at: string;
        };
      };
      kommentare: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          inhalt: string;
          created_at: string;
        };
      };
      produkte: {
        Row: {
          id: string;
          name: string;
          beschreibung: string;
          wow_satz: string;
          preis_cents: number;
          kategorie: string;
          schwierigkeit: string;
          altersempfehlung: string;
          bild_url: string;
          lagerbestand: number;
          aktiv: boolean;
        };
      };
      bestellungen: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          vorname: string;
          nachname: string;
          status: string;
          gesamt_cents: number;
          stripe_session_id: string | null;
          created_at: string;
        };
      };
      treffen: {
        Row: {
          id: string;
          titel: string;
          beschreibung: string;
          datum: string;
          uhrzeit: string;
          max_teilnehmer: number;
          anmeldungen: number;
          ort: string;
          created_at: string;
        };
      };
      treffen_anmeldungen: {
        Row: {
          id: string;
          treffen_id: string;
          name: string;
          email: string;
          erfahrungslevel: string;
          woran_arbeiten: string;
          created_at: string;
        };
      };
    };
  };
};
