import React from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  bestseller?: boolean;
}

interface CourseGridProps {
  title?: string;
  subtitle?: string;
  courses?: Course[];
  showViewAll?: boolean;
}

const CourseGrid = ({
  title = "Explore Our Popular Courses",
  subtitle = "Discover top-rated courses across various categories to enhance your skills and advance your career.",
  courses = [
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
    {
      id: "course-4",
      title: "Python for Data Science and Machine Learning",
      instructor: "Alex Chen",
      rating: 4.8,
      reviewCount: 2156,
      price: 89.99,
      originalPrice: 199.99,
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
      bestseller: false,
    },
    {
      id: "course-5",
      title: "UI/UX Design Fundamentals",
      instructor: "Emily Davis",
      rating: 4.6,
      reviewCount: 1845,
      price: 79.99,
      originalPrice: 169.99,
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      bestseller: false,
    },
    {
      id: "course-6",
      title: "Digital Marketing Masterclass",
      instructor: "Robert Williams",
      rating: 4.5,
      reviewCount: 1532,
      price: 74.99,
      originalPrice: 159.99,
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      bestseller: true,
    },
  ],
  showViewAll = true,
}: CourseGridProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

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

        {showViewAll && (
          <div className="text-center mt-12">
            <Button className="px-6 py-6">View All Courses</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;
