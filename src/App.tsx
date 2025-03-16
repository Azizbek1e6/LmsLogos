import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import Home from "@/components/home";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Instructors from "@/pages/Instructors";
import LessonView from "@/pages/LessonView";
import AppRoutes from "@/routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      {/* Use the AppRoutes component which contains all routes */}
      <AppRoutes />

      {/* Tempo routes will be handled inside AppRoutes */}
    </Suspense>
  );
}

export default App;
