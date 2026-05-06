import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Profile = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  discord_id: string | null;
  x_handle: string | null;
  is_founder: boolean;
  founder_rank: number | null;
  claimed_rewards: Record<string, Json>;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          discord_id?: string | null;
          x_handle?: string | null;
          is_founder?: boolean;
          founder_rank?: number | null;
          claimed_rewards?: Record<string, Json>;
          created_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabaseEnabled = isSupabaseConfigured;

const disabledResponse = async () => ({ data: null, error: null });

const mockSupabase = {
  auth: {
    signInWithOAuth: disabledResponse,
    signInWithOtp: disabledResponse,
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: disabledResponse,
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => undefined,
        },
      },
    }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: disabledResponse,
        maybeSingle: disabledResponse,
      }),
      single: disabledResponse,
      maybeSingle: disabledResponse,
    }),
    insert: disabledResponse,
    update: () => ({ eq: disabledResponse }),
    upsert: disabledResponse,
  }),
  rpc: disabledResponse,
};

export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : (mockSupabase as unknown as SupabaseClient<Database>);
