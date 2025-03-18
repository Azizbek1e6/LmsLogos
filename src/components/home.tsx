import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HeroSection from "./home/HeroSection";
import CourseGrid from "./courses/CourseGrid";
import StatisticsSection from "./home/StatisticsSection";
import TestimonialCarousel from "./home/TestimonialCarousel";
import { DemoModeBanner } from "./ui/demo-mode-banner";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already learning and growing with
          EduPress.
        </p>
        <Button variant="secondary" size="lg" className="group">
          Get Started Today
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <DemoModeBanner />
      </div>
      <main>
        <HeroSection />
        <CourseGrid />
        <StatisticsSection />
        <TestimonialCarousel />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
