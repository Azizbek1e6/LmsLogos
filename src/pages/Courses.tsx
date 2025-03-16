import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseGrid from "@/components/courses/CourseGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courseService, Course } from "@/services/courseService";
import { Search } from "lucide-react";

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("search"); // Clear search when selecting a category
    setSearchQuery("");
    setSearchParams(params);
  };

  // Fetch courses based on search params
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let data: Course[] = [];

        if (initialSearchQuery) {
          data = await courseService.searchCourses(initialSearchQuery);
        } else if (initialCategory) {
          data = await courseService.getCoursesByCategory(initialCategory);
        } else {
          data = await courseService.getAllCourses();
        }

        setCourses(data);

        // Extract unique categories from all courses
        const allCourses = await courseService.getAllCourses();
        const uniqueCategories = Array.from(
          new Set(allCourses.map((course) => course.category)),
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [initialSearchQuery, initialCategory]);

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
              {initialSearchQuery
                ? `Search Results for "${initialSearchQuery}"`
                : initialCategory
                  ? `${initialCategory} Courses`
                  : "Explore Our Courses"}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 max-w-md mx-auto"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-10 bg-white text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 rounded-l-none"
                >
                  Search
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                onClick={() => handleCategorySelect("")}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <CourseGrid
          title=""
          subtitle=""
          courses={courses}
          showViewAll={false}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
