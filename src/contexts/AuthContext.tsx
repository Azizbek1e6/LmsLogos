import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { supabase, isUsingMockData } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for current Supabase session
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Get user profile from profiles table
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (error) throw error;

          if (profile) {
            const userData: User = {
              id: session.user.id,
              email: session.user.email || "",
              fullName: profile.full_name,
              role: profile.role as UserRole,
              avatar: profile.avatar_url,
              createdAt: profile.created_at,
              lastLogin: new Date().toISOString(),
              emailVerified: session.user.email_confirmed_at ? true : false,
              bio: profile.bio || undefined,
              website: profile.website || undefined,
              location: profile.location || undefined,
            };
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Get user profile
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (!error && profile) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || "",
            fullName: profile.full_name,
            role: profile.role as UserRole,
            avatar: profile.avatar_url,
            createdAt: profile.created_at,
            lastLogin: new Date().toISOString(),
            emailVerified: session.user.email_confirmed_at ? true : false,
            bio: profile.bio || undefined,
            website: profile.website || undefined,
            location: profile.location || undefined,
          };
          setUser(userData);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (isUsingMockData) {
        // Mock login for demo purposes
        const mockUser: User = {
          id: "mock-user-id",
          email: email,
          fullName: email.split("@")[0],
          role: email.includes("admin")
            ? UserRole.ADMIN
            : email.includes("teacher")
              ? UserRole.TEACHER
              : UserRole.STUDENT,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          emailVerified: true,
        };
        setUser(mockUser);
        toast({
          title: "Demo Login",
          description:
            "Logged in with mock data. Set up Supabase for real authentication.",
        });
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
  ) => {
    setIsLoading(true);
    try {
      if (isUsingMockData) {
        // Mock signup for demo purposes
        const mockUser: User = {
          id: `mock-user-${Date.now()}`,
          email: email,
          fullName: fullName,
          role: role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          emailVerified: false,
        };
        setUser(mockUser);
        toast({
          title: "Demo Account Created",
          description:
            "Account created with mock data. Set up Supabase for real authentication.",
        });
        return;
      }

      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (authData?.user) {
        // 2. Create a profile record in the profiles table
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: authData.user.id,
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (profileError) throw profileError;

        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("No user logged in");
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          bio: data.bio,
          website: data.website,
          location: data.location,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      // Update local user state
      const updatedUser = {
        ...user,
        ...data,
      };

      setUser(updatedUser);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description:
          "If an account with that email exists, we've sent instructions to reset your password",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      // Don't show error to user for security reasons
      toast({
        title: "Password reset email sent",
        description:
          "If an account with that email exists, we've sent instructions to reset your password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      // In a real app with Supabase, email verification is handled automatically
      // This function would be used for custom verification flows
      toast({
        title: "Email verified",
        description: "Your email has been verified successfully",
      });
    } catch (error) {
      console.error("Verify email error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = () => user?.role === UserRole.ADMIN;
  const isTeacher = () => user?.role === UserRole.TEACHER;
  const isStudent = () => user?.role === UserRole.STUDENT;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isAdmin,
        isTeacher,
        isStudent,
        updateProfile,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
