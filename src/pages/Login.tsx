import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Welcome Back to EduPress
            </h1>
            <p className="text-gray-600 mb-6">
              Sign in to access your courses, track your progress, and continue
              your learning journey with us.
            </p>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
              alt="Learning"
              className="rounded-lg shadow-md"
            />
          </motion.div>

          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
