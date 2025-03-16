import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { UserRole } from "@/types/user";

// Layouts
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));

// Lazy load pages for better performance
const Home = lazy(() => import("@/components/home"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetails = lazy(() => import("@/pages/CourseDetails"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Instructors = lazy(() => import("@/pages/Instructors"));
const LessonView = lazy(() => import("@/pages/LessonView"));
const CreateQuiz = lazy(() => import("@/pages/CreateQuiz"));
const TakeQuiz = lazy(() => import("@/pages/TakeQuiz"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes location={location} key={location.pathname}>
        {/* Add tempo routes before the catchall route */}
        {import.meta.env.VITE_TEMPO === "true" && (
          <Route path="/tempobook/*" element={<div />} />
        )}
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructors" element={<Instructors />} />

        {/* Course and lesson routes */}
        <Route
          path="/course/:courseId/lesson/:lessonId"
          element={
            <ProtectedRoute
              allowedRoles={[
                UserRole.STUDENT,
                UserRole.TEACHER,
                UserRole.ADMIN,
              ]}
            >
              <LessonView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/create-quiz"
          element={
            <ProtectedRoute allowedRoles={[UserRole.TEACHER, UserRole.ADMIN]}>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/quiz"
          element={
            <ProtectedRoute
              allowedRoles={[
                UserRole.STUDENT,
                UserRole.TEACHER,
                UserRole.ADMIN,
              ]}
            >
              <TakeQuiz />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          {/* Add more admin routes as needed */}
        </Route>

        {/* Teacher routes */}
        {/* <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
            <TeacherLayout />
          </ProtectedRoute>
        }>
          <Route index element={<TeacherDashboard />} />
        </Route> */}

        {/* Student routes */}
        {/* <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        }/> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
