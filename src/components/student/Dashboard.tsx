import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Award,
  Calendar,
  CheckCircle,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Play,
  Search,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Courses Enrolled",
      value: "8",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Hours Learned",
      value: "42",
      icon: <Clock className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Certificates Earned",
      value: "3",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Completed Courses",
      value: "5",
      icon: <CheckCircle className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary">Student Dashboard</h2>
        </div>
        <div className="flex flex-col justify-between flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/my-courses"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              My Courses
            </Link>
            <Link
              to="/dashboard/certificates"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Award className="mr-3 h-5 w-5" />
              Certificates
            </Link>
            <Link
              to="/dashboard/wishlist"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Wishlist
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <Link
              to="/dashboard/help"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=student"}
                alt="Student"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user?.fullName || "Student User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "student@edupress.com"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start text-gray-600 dark:text-gray-300"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h2 className="text-lg font-bold text-primary">Student Dashboard</h2>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Dashboard content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0] || "Student"}!</h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Search courses..." className="pl-9" />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="in-progress" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="in-progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Web Development Bootcamp",
                    instructor: "Dr. Jane Smith",
                    progress: 78,
                    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
                    lastAccessed: "2 days ago",
                    nextLesson: "CSS Grid Layout",
                  },
                  {
                    title: "Advanced JavaScript",
                    instructor: "Prof. Michael Johnson",
                    progress: 45,
                    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
                    lastAccessed: "1 week ago",
                    nextLesson: "Promises and Async/Await",
                  },
                  {
                    title: "React & Redux Masterclass",
                    instructor: "Sarah Williams",
                    progress: 12,
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
                    lastAccessed: "3 days ago",
                    nextLesson: "React Hooks Introduction",
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold">{course.title}</h3>
                          <p className="text-white/80 text-sm">
                            {course.instructor}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <p>Last accessed: {course.lastAccessed}</p>
                          <p className="mt-1">Next: {course.nextLesson}</p>
                        </div>
                        <Button className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          Continue Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "HTML & CSS Fundamentals",
                    instructor: "Dr. Jane Smith",
                    completedDate: "March 15, 2023",
                    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
                    certificate: true,
                  },
                  {
                    title: "JavaScript Basics",
                    instructor: "Prof. Michael Johnson",
                    completedDate: "January 22, 2023",
                    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
                    certificate: true,
                  },
                  {
                    title: "Responsive Web Design",
                    instructor: "Sarah Williams",
                    completedDate: "February 10, 2023",
                    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
                    certificate: true,
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold">{course.title}</h3>
                          <p className="text-white/80 text-sm">
                            {course.instructor}
                          </p>
                        </div>
                      </div>
                      {course.certificate && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {course.completedDate}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            Review
                          </Button>
                          {course.certificate && (
                            <Button className="flex-1">
                              <Award className="mr-2 h-4 w-4" />
                              Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Python for Data Science",
                    instructor: "Alex Chen",
                    rating: 4.8,
                    students: 12453,
                    price: "$89.99",
                    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
                  },
                  {
                    title: "UI/UX Design Fundamentals",
                    instructor: "Emily Davis",
                    rating: 4.6,
                    students: 8745,
                    price: "$79.99",
                    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
                  },
                  {
                    title: "Digital Marketing Masterclass",
                    instructor: "Robert Williams",
                    rating: 4.5,
                    students: 6532,
                    price: "$74.99",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="text-white font-bold">{course.title}</h3>
                          <p className="text-white/80 text-sm">
                            {course.instructor}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-bold text-amber-500 mr-1">
                              {course.rating}
                            </span>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                              ({course.students.toLocaleString()})
                            </span>
                          </div>
                          <span className="font-bold">{course.price}</span>
                        </div>
                        <Button className="w-full">Enroll Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Calendar */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Live Q&A Session: Web Development",
                    date: "Today",
                    time: "3:00 PM - 4:00 PM",
                    instructor: "Dr. Jane Smith",
                  },
                  {
                    title: "JavaScript Assignment Due",
                    date: "Tomorrow",
                    time: "11:59 PM",