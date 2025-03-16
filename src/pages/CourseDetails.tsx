import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { courseService, Course } from "@/services/courseService";
import { lessonService, Lesson } from "@/services/lessonService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  Users,
  Play,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch course details
        const courseData = await courseService.getCourseById(id);
        if (!courseData) {
          setError("Course not found");
          return;
        }
        setCourse(courseData);

        // Fetch lessons for this course
        const lessonsData = await lessonService.getLessonsByCourseId(id);
        setLessons(lessonsData);

        // Check if user is enrolled
        if (isAuthenticated && user) {
          try {
            const enrolledCourses = await courseService.getEnrolledCourses(
              user.id,
            );
            const enrollment = enrolledCourses.find((c) => c.id === id);
            if (enrollment) {
              setIsEnrolled(true);
              setEnrollmentProgress(enrollment.progress || 0);
            }
          } catch (err) {
            console.error("Error checking enrollment:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, isAuthenticated, user]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in this course",
        variant: "destructive",
      });
      return;
    }

    if (!course || !user) return;

    try {
      await courseService.enrollInCourse(user.id, course.id);
      setIsEnrolled(true);
      setEnrollmentProgress(0);
      toast({
        title: "Enrollment successful",
        description: `You are now enrolled in ${course.title}`,
      });
    } catch (err) {
      console.error("Error enrolling in course:", err);
      toast({
        title: "Enrollment failed",
        description:
          "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                {error || "Course not found"}
              </h2>
              <Link to="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Course Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-4">{course.category}</Badge>
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="mb-6">{course.description}</p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-bold">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-300 ml-1">
                      ({course.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>
                      {Math.floor(Math.random() * 5000) + 1000} students
                    </span>
                  </div>
                </div>

                <p className="mb-2">
                  Created by{" "}
                  <span className="font-medium">{course.instructor}</span>
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-auto rounded-md"
                  />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl font-bold">
                    ${course.price.toFixed(2)}
                  </div>
                  {course.originalPrice && (
                    <div className="flex flex-col items-end">
                      <span className="text-gray-400 line-through">
                        ${course.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-green-400 text-sm">
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100,
                        )}
                        % off
                      </span>
                    </div>
                  )}
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your progress</span>
                        <span>{enrollmentProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${enrollmentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Link
                      to={`/course/${course.id}/lesson/${lessons[0]?.id || ""}}`}
                    >
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        {enrollmentProgress > 0
                          ? "Continue Learning"
                          : "Start Learning"}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button className="w-full mb-4" onClick={handleEnroll}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-gray-300 text-center mt-4">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {lessons.length} lessons • {lessons.length * 15} minutes
                      total length
                    </div>
                  </CardHeader>
                  <CardContent>
                    {lessons.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">
                        No lessons available for this course yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-start">
                                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {lesson.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                            {isEnrolled && (
                              <div className="mt-4 flex justify-end">
                                <Link
                                  to={`/course/${course.id}/lesson/${lesson.id}`}
                                >
                                  <Button variant="outline" size="sm">
                                    <Play className="mr-2 h-3 w-3" />
                                    Watch Lesson
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          What you'll learn
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>Learning objective {i + 1}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Requirements
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Basic understanding of computers</li>
                          <li>No prior programming experience needed</li>
                          <li>A computer with internet connection</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Description
                        </h3>
                        <p className="text-muted-foreground">
                          {course.description ||
                            "No detailed description available for this course."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold mr-2">
                        {course.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-muted-foreground">
                          ({course.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Reviews will be displayed here when available.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
