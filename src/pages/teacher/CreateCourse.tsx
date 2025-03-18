import React from "react";
import CourseCreation from "@/components/teacher/CourseCreation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { UserRole } from "@/types/user";

const CreateCoursePage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Create a New Course
          </h1>
          <CourseCreation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCoursePage;
