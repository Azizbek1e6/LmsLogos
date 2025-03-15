import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";

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
  bestseller: boolean;
  level: string;
}

interface CourseGridProps {
  courses?: Course[];
  title?: string;
  description?: string;
}

const CourseGrid = ({
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
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
      bestseller: true,
      level: "Beginner",
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
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&q=80",
      bestseller: true,
      level: "Intermediate",
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
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80",
      bestseller: true,
      level: "Advanced",
    },
    {
      id: "course-4",
      title: "UI/UX Design Principles",
      instructor: "Alex Chen",
      rating: 4.6,
      reviewCount: 1253,
      price: 79.99,
      originalPrice: 159.99,
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&q=80",
      bestseller: false,
      level: "Beginner",
    },
    {
      id: "course-5",
      title: "Python for Data Science and Machine Learning",
      instructor: "Dr. Robert Miller",
      rating: 4.8,
      reviewCount: 2876,
      price: 119.99,
      originalPrice: 249.99,
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
      bestseller: true,
      level: "Intermediate",
    },
    {
      id: "course-6",
      title: "Mobile App Development with Flutter",
      instructor: "Emily Davis",
      rating: 4.5,
      reviewCount: 1432,
      price: 84.99,
      originalPrice: 169.99,
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&q=80",
      bestseller: false,
      level: "Intermediate",
    },
  ],
  title = "Explore Our Courses",
  description = "Browse our wide selection of courses across various categories",
}: CourseGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  // Filter courses based on search term, category, and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Sort courses based on selected sort option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // Default: sort by popularity (review count)
    return b.reviewCount - a.reviewCount;
  });

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="bg-white border rounded-lg h-auto p-1">
              <TabsTrigger value="all" className="px-4 py-2">
                All Courses
              </TabsTrigger>
              <TabsTrigger value="bestsellers" className="px-4 py-2">
                Bestsellers
              </TabsTrigger>
              <TabsTrigger value="new" className="px-4 py-2">
                New Courses
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search courses..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white"
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {sortedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bestsellers" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {sortedCourses
                .filter((course) => course.bestseller)
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {/* For demo purposes, showing first 3 courses as "new" */}
              {sortedCourses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {sortedCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
