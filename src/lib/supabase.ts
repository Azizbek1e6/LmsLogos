import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Flag to track if we're using real Supabase or mock data
export const isUsingMockData = true; // Always use mock data for now

if (isUsingMockData) {
  console.warn(
    "Using mock data mode. For real Supabase functionality, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

// Create a comprehensive mock client
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      // Simulate successful login with mock user data
      const mockUser = {
        id: "mock-user-id",
        email: email,
        user_metadata: {
          full_name: email.split("@")[0],
          role: email.includes("admin")
            ? "ADMIN"
            : email.includes("teacher")
              ? "TEACHER"
              : "STUDENT",
        },
        email_confirmed_at: new Date().toISOString(),
      };

      return {
        data: {
          user: mockUser,
          session: { user: mockUser },
        },
        error: null,
      };
    },
    signUp: async ({ email, password, options }) => {
      // Simulate successful signup with mock user data
      const mockUser = {
        id: `mock-user-${Date.now()}`,
        email: email,
        user_metadata: options?.data || {},
        email_confirmed_at: null,
      };

      return {
        data: {
          user: mockUser,
          session: { user: mockUser },
        },
        error: null,
      };
    },
    signOut: async () => ({ error: null }),
    getSession: async () => ({
      data: { session: null },
      error: null,
    }),
    onAuthStateChange: (callback) => {
      // Return a mock subscription object
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
    resetPasswordForEmail: async () => ({ error: null }),
  },
  from: (table) => ({
    select: (query) => ({
      eq: (field, value) => ({
        single: async () => {
          // Return mock profile data for profiles table
          if (table === "profiles" && field === "user_id") {
            return {
              data: {
                user_id: value,
                full_name: `Mock User ${value.substring(0, 5)}`,
                role: "STUDENT",
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${value}`,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                bio: "This is a mock user profile",
              },
              error: null,
            };
          }
          return { data: null, error: null };
        },
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        gt: () => ({
          order: () => ({
            limit: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
        lt: () => ({
          order: () => ({
            limit: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
      }),
      order: () => ({ data: [], error: null }),
      ilike: () => ({ data: [], error: null }),
      gt: () => ({
        order: () => ({
          limit: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
      }),
      lt: () => ({
        order: () => ({
          limit: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
      }),
    }),
    insert: async (data) => {
      console.log(`Mock insert into ${table}:`, data);
      return { error: null, data: { ...data, id: `mock-${Date.now()}` } };
    },
    update: async (data) => {
      console.log(`Mock update in ${table}:`, data);
      return { error: null };
    },
  }),
};
