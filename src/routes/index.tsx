import React, { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useLocation,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import { UserRole } from "@/types/user";
import routes from "tempo-routes";

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
const TeacherDashboard = lazy(() => import("@/components/teacher/Dashboard"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));

// Loading component
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <p className="text-lg font-medium text-foreground">Loading...</p>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "TEACHER":
        return <Navigate to="/" replace />;
      case "STUDENT":
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

// Import necessary components
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminTeachersPage from "@/pages/admin/teachers";
import CreateCoursePage from "@/pages/teacher/CreateCourse";

// Wrapper for Courses component to handle search params
const CoursesWithSearch = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  return <Courses search={search} category={category} />;
};

const AppRoutes = () => {
  const location = useLocation();

  // Handle Tempo routes
  if (import.meta.env.VITE_TEMPO === "true") {
    try {
      const tempoRoutes = useRoutes(routes);
      if (tempoRoutes) return tempoRoutes;
    } catch (error) {
      console.error("Error loading Tempo routes:", error);
    }
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesWithSearch />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/dashboard" element={<Home />} />

        {/* Teacher routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-course"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/discussions"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/earnings"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/settings"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/help"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Course and lesson routes */}
        <Route
          path="/course/:courseId/lesson/:lessonId"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "TEACHER", "ADMIN"]}>
              <LessonView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/create-quiz"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/quiz"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "TEACHER", "ADMIN"]}>
              <TakeQuiz />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route
            path="courses"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Course Management</h1>
              </div>
            }
          />
          <Route
            path="instructors"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                  Instructor Management
                </h1>
              </div>
            }
          />
          <Route
            path="reports"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
              </div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
              </div>
            }
          />
          <Route
            path="profile"
            element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
              </div>
            }
          />
          {/* Add more admin routes as needed */}
        </Route>

        {/* Allow tempo to capture routes */}
        {import.meta.env.VITE_TEMPO === "true" && (
          <Route path="/tempobook/*" element={<div />} />
        )}

        {/* Student routes */}
        {/* <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        }/> */}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
