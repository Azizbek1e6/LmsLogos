import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { courseService, Course } from "@/services/courseService";
import { Link } from "react-router-dom";

interface CourseGridProps {
  title?: string;
  subtitle?: string;
  courses?: Course[];
  showViewAll?: boolean;
  category?: string;
  limit?: number;
}

const CourseGrid = ({
  title = "Explore Our Popular Courses",
  subtitle = "Discover top-rated courses across various categories to enhance your skills and advance your career.",
  courses: initialCourses,
  showViewAll = true,
  category,
  limit = 6,
}: CourseGridProps) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses || []);
  const [isLoading, setIsLoading] = useState(!initialCourses);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch from the database if courses weren't provided as props
    if (!initialCourses) {
      const fetchCourses = async () => {
        try {
          setIsLoading(true);
          setError(null);
          let data;

          if (category) {
            data = await courseService.getCoursesByCategory(category);
          } else {
            data = await courseService.getAllCourses();
          }

          // Apply limit if specified
          const limitedData = limit ? data.slice(0, limit) : data;
          setCourses(limitedData);
        } catch (err) {
          console.error("Error fetching courses:", err);
          setError("Failed to load courses. Please try again later.");
          // Set default courses on error
          setCourses([
            {
              id: "course-1",
              title: "Complete Web Development Bootcamp",
              instructor: "Dr. Jane Smith",
              rating: 4.8,
              reviewCount: 2453,
              price: 89.99,
              originalPrice: 199.99,
              category: "Web Development",
              image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
              bestseller: true,
            },
            {
              id: "course-2",
              title: "Advanced JavaScript: From Fundamentals to Functional JS",
              instructor: "Prof. Michael Johnson",
              rating: 4.7,
              reviewCount: 1872,
              price: 94.99,
              originalPrice: 189.99,
              category: "JavaScript",
              image:
                "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
              bestseller: true,
            },
            {
              id: "course-3",
              title: "React & Redux Masterclass",
              instructor: "Sarah Williams",
              rating: 4.9,
              reviewCount: 3241,
              price: 109.99,
              originalPrice: 229.99,
              category: "React",
              image:
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
              bestseller: false,
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourses();
    }
  }, [initialCourses, category, limit]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              No courses found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="flex justify-center">
                <CourseCard
                  id={course.id}
                  title={course.title}
                  instructor={course.instructor}
                  rating={course.rating}
                  reviewCount={course.reviewCount}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  category={course.category}
                  image={course.image}
                  bestseller={course.bestseller}
                />
              </div>
            ))}
          </div>
        )}

        {showViewAll && courses.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button className="px-6 py-6">View All Courses</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;
