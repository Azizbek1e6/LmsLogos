import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Flag to track if we're using real Supabase or mock data
export const isUsingMockData = !supabaseUrl || !supabaseAnonKey;

if (isUsingMockData) {
  console.warn(
    "Supabase credentials not found. Using mock data instead. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for actual functionality.",
  );
}

// Create a dummy client if credentials are missing, otherwise create a real one
export const supabase = isUsingMockData
  ? {
      auth: {
        signInWithPassword: async () => ({
          data: null,
          error: new Error("Using mock data"),
        }),
        signUp: async () => ({
          data: null,
          error: new Error("Using mock data"),
        }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
        resetPasswordForEmail: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => ({ data: [], error: null }),
          }),
          order: () => ({ data: [], error: null }),
          ilike: () => ({ data: [], error: null }),
        }),
        insert: async () => ({ error: null }),
        update: async () => ({ error: null }),
      }),
    }
  : createClient<Database>(supabaseUrl, supabaseAnonKey);
