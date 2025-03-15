import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseDetail from "@/components/courses/CourseDetail";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch the course data based on the ID
  // For now, we'll just use the default props in the CourseDetail component

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CourseDetail id={id} />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
