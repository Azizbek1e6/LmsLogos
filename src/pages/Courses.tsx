import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Explore Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg"
            >
              Browse our wide selection of courses across various categories and
              start your learning journey today.
            </motion.p>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CourseGrid
              title="All Courses"
              description="Find the perfect course to enhance your skills and advance your career"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
