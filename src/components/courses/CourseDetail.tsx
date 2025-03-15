import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  BarChart,
  Globe,
  Award,
  FileText,
  Video,
  MessageSquare,
  Users,
  BookOpen,
  CheckCircle2,
  ShoppingCart,
  Heart,
  Share2,
  PenLine,
  Play,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";

interface CourseDetailProps {
  id?: string;
  title?: string;
  instructor?: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  rating?: number;
  reviewCount?: number;
  studentCount?: number;
  price?: number;
  originalPrice?: number;
  category?: string;
  level?: string;
  lastUpdated?: string;
  language?: string;
  description?: string;
  image?: string;
  duration?: string;
  lectures?: number;
  features?: string[];
  curriculum?: {
    section: string;
    lectures: {
      title: string;
      duration: string;
      preview?: boolean;
      id?: string;
    }[];
  }[];
  enrolled?: boolean;
  hasQuiz?: boolean;
}

const CourseDetail = ({
  id = "course-1",
  title = "Complete Web Development Bootcamp 2023",
  instructor = "Dr. Jane Smith",
  instructorTitle = "Senior Web Developer & Instructor",
  instructorAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  rating = 4.8,
  reviewCount = 2453,
  studentCount = 42891,
  price = 89.99,
  originalPrice = 199.99,
  category = "Web Development",
  level = "Beginner to Advanced",
  lastUpdated = "June 2023",
  language = "English",
  description = "This comprehensive web development bootcamp covers everything you need to know to become a full-stack web developer. From HTML, CSS, and JavaScript to Node.js, React, and MongoDB, you'll learn all the essential technologies used in modern web development.",
  image = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=80",
  duration = "63 hours",
  lectures = 425,
  features = [
    "Lifetime Access",
    "Certificate of Completion",
    "Downloadable Resources",
    "Coding Exercises",
    "Q&A Support",
    "Mobile and TV Access",
  ],
  curriculum = [
    {
      section: "Introduction to Web Development",
      lectures: [
        {
          id: "lesson-1",
          title: "Course Overview",
          duration: "10:15",
          preview: true,
        },
        {
          id: "lesson-2",
          title: "Setting Up Your Development Environment",
          duration: "15:42",
          preview: true,
        },
        {
          id: "lesson-3",
          title: "Web Development Basics",
          duration: "12:33",
        },
      ],
    },
    {
      section: "HTML Fundamentals",
      lectures: [
        {
          id: "lesson-4",
          title: "HTML Document Structure",
          duration: "14:22",
          preview: true,
        },
        {
          id: "lesson-5",
          title: "Working with Text Elements",
          duration: "18:30",
        },
        {
          id: "lesson-6",
          title: "HTML Forms and Input Types",
          duration: "22:15",
        },
        {
          id: "lesson-7",
          title: "Semantic HTML",
          duration: "16:48",
        },
      ],
    },
    {
      section: "CSS Styling",
      lectures: [
        {
          id: "lesson-8",
          title: "CSS Selectors and Properties",
          duration: "20:10",
        },
        {
          id: "lesson-9",
          title: "Box Model and Layout",
          duration: "25:33",
        },
        {
          id: "lesson-10",
          title: "Flexbox and Grid",
          duration: "28:45",
        },
        {
          id: "lesson-11",
          title: "Responsive Design",
          duration: "24:18",
        },
      ],
    },
  ],
  enrolled = false,
  hasQuiz = true,
}: CourseDetailProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(enrolled);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleEnroll = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsEnrolled(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleStartCourse = () => {
    // Navigate to the first lesson
    if (
      curriculum &&
      curriculum.length > 0 &&
      curriculum[0].lectures.length > 0
    ) {
      const firstLessonId = curriculum[0].lectures[0].id;
      navigate(`/course/${id}/lesson/${firstLessonId}`);
    }
  };

  const handleCreateQuiz = () => {
    navigate(`/course/${id}/create-quiz`);
  };

  const handleTakeQuiz = () => {
    navigate(`/course/${id}/quiz`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-50 min-h-screen"
    >
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                {category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <p className="text-slate-300">{description}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="font-bold text-amber-400 mr-1">
                    {rating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-400 text-gray-400"}`}
                        />
                      ))}
                  </div>
                  <span className="text-slate-300 ml-1">
                    ({reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="text-slate-300">
                  <Users size={16} className="inline mr-1" />
                  {studentCount.toLocaleString()} students
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <img
                  src={instructorAvatar}
                  alt={instructor}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{instructor}</p>
                  <p className="text-sm text-slate-300">{instructorTitle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center">
                  <BarChart size={16} className="mr-1" />
                  <span>{level}</span>
                </div>
                <div className="flex items-center">
                  <FileText size={16} className="mr-1" />
                  <span>{lectures} lectures</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="mr-1" />
                  <span>{language}</span>
                </div>
                <div className="flex items-center">
                  <Award size={16} className="mr-1" />
                  <span>Certificate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <div className="relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full w-16 h-16 p-0 flex items-center justify-center bg-white bg-opacity-90 hover:bg-opacity-100 text-primary"
                  >
                    <Video size={24} />
                  </Button>
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      ${price.toFixed(2)}
                    </span>
                    {originalPrice && originalPrice > price && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {originalPrice && originalPrice > price && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                      {Math.round(
                        ((originalPrice - price) / originalPrice) * 100,
                      )}
                      % off
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  {!isEnrolled ? (
                    <Button
                      className="w-full text-lg py-6"
                      size="lg"
                      onClick={handleEnroll}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-5 w-5" /> Enroll Now
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={handleStartCourse}
                    >
                      <Play className="mr-2 h-5 w-5" /> Start Learning
                    </Button>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={toggleWishlist}
                    >
                      <Heart
                        className={`mr-2 h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
                      />
                      Wishlist
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-5 w-5" /> Share
                    </Button>
                  </div>

                  {user?.role === UserRole.TEACHER && (
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={handleCreateQuiz}
                    >
                      <PenLine className="mr-2 h-5 w-5" /> Create Quiz
                    </Button>
                  )}

                  {isEnrolled && hasQuiz && (
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={handleTakeQuiz}
                    >
                      <Award className="mr-2 h-5 w-5" /> Take Quiz
                    </Button>
                  )}

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">This course includes:</h4>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <div className="text-sm text-gray-600">
                  {lectures} lectures • {duration} total length
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {curriculum.map((section, sectionIndex) => (
                  <AccordionItem
                    key={sectionIndex}
                    value={`section-${sectionIndex}`}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span className="font-medium text-left">
                          {section.section}
                        </span>
                        <span className="text-sm text-gray-500">
                          {section.lectures.length} lectures •{" "}
                          {section.lectures.reduce((total, lecture) => {
                            const [mins, secs] = lecture.duration.split(":");
                            return total + parseInt(mins) * 60 + parseInt(secs);
                          }, 0) /
                            60 <
                          60
                            ? `${Math.round(
                                section.lectures.reduce((total, lecture) => {
                                  const [mins, secs] =
                                    lecture.duration.split(":");
                                  return (
                                    total + parseInt(mins) * 60 + parseInt(secs)
                                  );
                                }, 0) / 60,
                              )} min`
                            : `${Math.floor(
                                section.lectures.reduce((total, lecture) => {
                                  const [mins, secs] =
                                    lecture.duration.split(":");
                                  return (
                                    total + parseInt(mins) * 60 + parseInt(secs)
                                  );
                                }, 0) / 3600,
                              )} hr ${Math.round(
                                (section.lectures.reduce((total, lecture) => {
                                  const [mins, secs] =
                                    lecture.duration.split(":");
                                  return (
                                    total + parseInt(mins) * 60 + parseInt(secs)
                                  );
                                }, 0) %
                                  3600) /
                                  60,
                              )} min`}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <li
                            key={lectureIndex}
                            className="flex justify-between items-center py-2 hover:bg-gray-50 rounded-md px-2"
                          >
                            <div className="flex items-center">
                              <Video size={16} className="mr-2 text-gray-500" />
                              <span>
                                {lecture.title}
                                {lecture.preview && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs py-0 h-5"
                                  >
                                    Preview
                                  </Badge>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                {lecture.duration}
                              </span>
                              {(isEnrolled || lecture.preview) && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-blue-600"
                                  onClick={() =>
                                    navigate(
                                      `/course/${id}/lesson/${lecture.id}`,
                                    )
                                  }
                                >
                                  <Play size={16} />
                                </Button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">
                {description}
                <br />
                <br />
                This course is designed for anyone who wants to learn web
                development from scratch. No prior experience is required. By
                the end of this course, you'll have the skills and knowledge to
                build your own web applications and start a career in web
                development.
              </p>

              <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  "Build responsive websites using HTML, CSS, and JavaScript",
                  "Work with popular frameworks like React and Node.js",
                  "Implement authentication and authorization",
                  "Connect to databases and build RESTful APIs",
                  "Deploy your applications to the web",
                  "Optimize your code for performance",
                  "Debug and troubleshoot common issues",
                  "Follow best practices for web development",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-3">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                <li>A computer with internet access</li>
                <li>No prior programming experience needed</li>
                <li>Basic computer skills</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Target Audience</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Beginners with no coding experience</li>
                <li>Students looking to build a portfolio</li>
                <li>Professionals transitioning to web development</li>
                <li>Anyone interested in learning modern web technologies</li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Your Instructor</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={instructorAvatar}
                  alt={instructor}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{instructor}</h3>
                  <p className="text-gray-600 mb-3">{instructorTitle}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="text-amber-500 fill-amber-500 mr-1"
                      />
                      <span>4.8 Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      <span>1,245 Reviews</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>42,891 Students</span>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Dr. Jane Smith is a senior web developer with over 10 years
                    of experience in the industry. She has worked with major
                    tech companies and has taught web development to thousands
                    of students worldwide. Her teaching approach focuses on
                    practical, hands-on learning that prepares students for
                    real-world development challenges.
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h2 className="text-2xl font-bold mb-4">Student Feedback</h2>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-amber-500">
                      {rating.toFixed(1)}
                    </div>
                    <div className="flex justify-center my-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300"}`}
                          />
                        ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Course Rating • {reviewCount.toLocaleString()} Reviews
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage =
                        star === 5
                          ? 78
                          : star === 4
                            ? 15
                            : star === 3
                              ? 5
                              : star === 2
                                ? 1
                                : 1;
                      return (
                        <div key={star} className="flex items-center space-x-2">
                          <div className="flex items-center w-12">
                            <span>{star}</span>
                            <Star
                              size={14}
                              className="ml-1 fill-amber-400 text-amber-400"
                            />
                          </div>
                          <Progress value={percentage} className="h-2 flex-1" />
                          <div className="w-10 text-right text-sm text-gray-600">
                            {percentage}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Reviews</h3>
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        name: "Michael Johnson",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                        rating: 5,
                        date: "2 weeks ago",
                        comment:
                          "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I've tried other web development courses before, but this one is by far the best. Highly recommended!",
                      },
                      {
                        name: "Sarah Williams",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                        rating: 4,
                        date: "1 month ago",
                        comment:
                          "Great course with lots of practical examples. The projects helped me apply what I learned. The only reason I'm giving 4 stars instead of 5 is that some sections could use more in-depth explanations.",
                      },
                      {
                        name: "David Chen",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
                        rating: 5,
                        date: "2 months ago",
                        comment:
                          "I started this course with zero coding knowledge and now I'm building my own websites! The instructor is amazing and the course content is well-structured. I especially loved the sections on React and Node.js.",
                      },
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-6 last:border-0"
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={`${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300"}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.date}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{review.comment}</p>
                      </div>
                    ))}

                    <div className="text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Courses */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-8 text-center"
          >
            Related Courses You May Like
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "course-2",
                title:
                  "Advanced JavaScript: From Fundamentals to Functional JS",
                instructor: "Prof. Michael Johnson",
                rating: 4.7,
                reviewCount: 1872,
                price: 94.99,
                originalPrice: 189.99,
                image:
                  "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&q=80",
              },
              {
                id: "course-3",
                title: "React & Redux Masterclass",
                instructor: "Sarah Williams",
                rating: 4.9,
                reviewCount: 3241,
                price: 109.99,
                originalPrice: 229.99,
                image:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80",
              },
              {
                id: "course-4",
                title: "Node.js: The Complete Guide",
                instructor: "Alex Chen",
                rating: 4.8,
                reviewCount: 2156,
                price: 89.99,
                originalPrice: 199.99,
                image:
                  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&q=80",
              },
            ].map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/course/${course.id}`}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {course.instructor}
                    </p>
                    <div className="flex items-center mb-2">
                      <span className="font-bold text-amber-500 mr-1">
                        {course.rating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < Math.floor(course.rating) ? "fill-amber-500 text-amber-500" : "fill-gray-300 text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({course.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ${course.price.toFixed(2)}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
