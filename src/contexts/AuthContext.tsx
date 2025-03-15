import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

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

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@edupress.com",
    fullName: "Admin User",
    role: UserRole.ADMIN,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    emailVerified: true,
  },
  {
    id: "2",
    email: "teacher@edupress.com",
    fullName: "Teacher User",
    role: UserRole.TEACHER,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    emailVerified: true,
  },
  {
    id: "3",
    email: "student@edupress.com",
    fullName: "Student User",
    role: UserRole.STUDENT,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    emailVerified: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("edupress_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user with matching email
      const foundUser = mockUsers.find((u) => u.email === email);

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // In a real app, you would verify the password here
      // For demo purposes, we'll just accept any password

      // Check if email is verified
      if (!foundUser.emailVerified) {
        toast({
          title: "Email not verified",
          description: "Please verify your email before logging in",
          variant: "destructive",
        });
        throw new Error("Email not verified");
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem("edupress_user", JSON.stringify(updatedUser));

      toast({
        title: "Login successful",
        description: `Welcome back, ${updatedUser.fullName}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("User already exists");
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        fullName,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        emailVerified: true, // In a real app, this would be false until verified
      };

      // In a real app, you would save this to your database
      mockUsers.push(newUser);

      setUser(newUser);
      localStorage.setItem("edupress_user", JSON.stringify(newUser));

      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });

      // In a real app, you would send a verification email here
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edupress_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("No user logged in");
      }

      const updatedUser = {
        ...user,
        ...data,
      };

      // Update in mock database
      const userIndex = mockUsers.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }

      setUser(updatedUser);
      localStorage.setItem("edupress_user", JSON.stringify(updatedUser));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find((u) => u.email === email);

      if (!foundUser) {
        // For security reasons, don't reveal if the email exists or not
        toast({
          title: "Password reset email sent",
          description:
            "If an account with that email exists, we've sent instructions to reset your password",
        });
        return;
      }

      // In a real app, you would send a password reset email here
      toast({
        title: "Password reset email sent",
        description:
          "We've sent instructions to reset your password to your email",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would verify the token and update the user's email verification status
      toast({
        title: "Email verified",
        description: "Your email has been verified successfully",
      });

      // If the user is logged in, update their status
      if (user) {
        const updatedUser = {
          ...user,
          emailVerified: true,
        };

        setUser(updatedUser);
        localStorage.setItem("edupress_user", JSON.stringify(updatedUser));
      }
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
