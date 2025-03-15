import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
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
              Join Our Learning Community
            </h1>
            <p className="text-gray-600 mb-6">
              Create an account to access thousands of courses, track your
              progress, and connect with instructors and fellow learners.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Access to All Courses</h3>
                  <p className="text-sm text-gray-600">
                    Get unlimited access to our library of courses across
                    various categories.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Account</h3>
                  <p className="text-sm text-gray-600">
                    Your data is protected with industry-standard security
                    measures.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M12 2v2" />
                    <path d="M12 6v2" />
                    <path d="M16 4.28A7 7 0 0 1 19 10c0 3.7-3 6.7-7 11-4-4.3-7-7.3-7-11a7 7 0 0 1 3-5.72" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Learn Anywhere</h3>
                  <p className="text-sm text-gray-600">
                    Access your courses on any device, anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <SignupForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
