import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/user";

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
  },
  {
    id: "2",
    email: "teacher@edupress.com",
    fullName: "Teacher User",
    role: UserRole.TEACHER,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    email: "student@edupress.com",
    fullName: "Student User",
    role: UserRole.STUDENT,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem("edupress_user", JSON.stringify(updatedUser));
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
      };

      // In a real app, you would save this to your database
      mockUsers.push(newUser);

      setUser(newUser);
      localStorage.setItem("edupress_user", JSON.stringify(newUser));
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
