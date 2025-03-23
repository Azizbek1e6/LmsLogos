import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  FileText,
  Video,
  MessageSquare,
  PlusCircle,
  Edit,
  Trash,
  Clock,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Courses",
      value: "12",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Total Students",
      value: "1,245",
      icon: <Users className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Total Earnings",
      value: "$12,590",
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: <Star className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary">Teacher Dashboard</h2>
        </div>
        <div className="flex flex-col justify-between flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {[
              {
                path: "/teacher/dashboard",
                label: "Dashboard",
                icon: <BookOpen className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/courses",
                label: "My Courses",
                icon: <FileText className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/students",
                label: "My Students",
                icon: <Users className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/discussions",
                label: "Discussions",
                icon: <MessageSquare className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/earnings",
                label: "Earnings",
                icon: <DollarSign className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/settings",
                label: "Settings",
                icon: <Settings className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/help",
                label: "Help & Support",
                icon: <HelpCircle className="mr-3 h-5 w-5" />,
              },
              {
                path: "/teacher/create-course",
                label: "Create Course",
                icon: <PlusCircle className="mr-3 h-5 w-5" />,
              },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={
                  user?.avatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
                }
                alt="Teacher"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user?.fullName || "Teacher User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "teacher@edupress.com"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start text-gray-600 dark:text-gray-300"
              onClick={() => {
                logout();
                navigate("/login");
              }}
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
          <h2 className="text-lg font-bold text-primary">Teacher Dashboard</h2>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Dashboard content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
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
                        <h3 className="text-2xl font-bold mt-1">
                          {stat.value}
                        </h3>
                      </div>
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="students">My Students</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4">Course</th>
                          <th className="text-left py-3 px-4">Category</th>
                          <th className="text-left py-3 px-4">Students</th>
                          <th className="text-left py-3 px-4">Rating</th>
                          <th className="text-left py-3 px-4">Price</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            title: "Web Development Bootcamp",
                            category: "Web Development",
                            students: 845,
                            rating: 4.8,
                            price: "$89.99",
                            status: "Published",
                          },
                          {
                            title: "Advanced JavaScript",
                            category: "JavaScript",
                            students: 376,
                            rating: 4.7,
                            price: "$94.99",
                            status: "Published",
                          },
                          {
                            title: "React & Redux Masterclass",
                            category: "React",
                            students: 24,
                            rating: 5.0,
                            price: "$109.99",
                            status: "New",
                          },
                          {
                            title: "Node.js API Development",
                            category: "Backend",
                            students: 0,
                            rating: 0,
                            price: "$79.99",
                            status: "Draft",
                          },
                        ].map((course, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 dark:border-gray-700"
                          >
                            <td className="py-3 px-4">{course.title}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                {course.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">{course.students}</td>
                            <td className="py-3 px-4">
                              {course.rating > 0 ? (
                                <div className="flex items-center">
                                  <span className="mr-1">{course.rating}</span>
                                  <svg
                                    className="h-4 w-4 text-yellow-400 fill-current"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                </div>
                              ) : (
                                <span className="text-gray-500 dark:text-gray-400">
                                  N/A
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">{course.price}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${course.status === "Published" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : course.status === "Draft" ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"}`}
                              >
                                {course.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <Trash className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Creation Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Vue.js for Beginners",
                        progress: 65,
                        lastEdited: "2 days ago",
                      },
                      {
                        title: "TypeScript Fundamentals",
                        progress: 30,
                        lastEdited: "1 week ago",
                      },
                    ].map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last edited: {course.lastEdited}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Progress value={course.progress} className="h-2" />
                          <span className="text-sm font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                          >
                            Continue Editing
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Course</th>
                          <th className="text-left py-3 px-4">Progress</th>
                          <th className="text-left py-3 px-4">Enrolled</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Sarah Johnson",
                            email: "sarah@example.com",
                            course: "Web Development Bootcamp",
                            progress: 78,
                            enrolled: "Jan 15, 2023",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                          },
                          {
                            name: "Michael Chen",
                            email: "michael@example.com",
                            course: "Web Development Bootcamp",
                            progress: 45,
                            enrolled: "Feb 3, 2023",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                          },
                          {
                            name: "Emily Davis",
                            email: "emily@example.com",
                            course: "Advanced JavaScript",
                            progress: 92,
                            enrolled: "Dec 12, 2022",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
                          },
                          {
                            name: "David Rodriguez",
                            email: "david@example.com",
                            course: "Advanced JavaScript",
                            progress: 67,
                            enrolled: "Mar 8, 2023",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
                          },
                          {
                            name: "Jessica Williams",
                            email: "jessica@example.com",
                            course: "React & Redux Masterclass",
                            progress: 12,
                            enrolled: "Apr 22, 2023",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
                          },
                        ].map((student, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 dark:border-gray-700"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="h-8 w-8 rounded-full mr-3"
                                />
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{student.email}</td>
                            <td className="py-3 px-4">{student.course}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={student.progress}
                                  className="h-2 w-24"
                                />
                                <span className="text-sm">
                                  {student.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{student.enrolled}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  Message
                                </Button>
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Showing 5 of 1,245 students
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        student: "Sarah Johnson",
                        course: "Web Development Bootcamp",
                        message:
                          "I'm having trouble with the CSS Grid exercise in module 3. Can you provide some additional examples?",
                        time: "2 hours ago",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                        unread: true,
                      },
                      {
                        student: "Michael Chen",
                        course: "Web Development Bootcamp",
                        message:
                          "Thank you for the detailed explanation on async/await. It really helped me understand the concept better!",
                        time: "1 day ago",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                        unread: false,
                      },
                      {
                        student: "Emily Davis",
                        course: "Advanced JavaScript",
                        message:
                          "Is there a recommended resource for learning more about design patterns in JavaScript?",
                        time: "2 days ago",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
                        unread: false,
                      },
                      {
                        student: "David Rodriguez",
                        course: "Advanced JavaScript",
                        message:
                          "The quiz in module 5 has a question that seems to have multiple correct answers. Could you clarify?",
                        time: "3 days ago",
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
                        unread: false,
                      },
                    ].map((discussion, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${discussion.unread ? "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800" : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"}`}
                      >
                        <div className="flex items-start">
                          <img
                            src={discussion.avatar}
                            alt={discussion.student}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                {discussion.student}
                              </h4>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {discussion.time}
                                </span>
                                {discussion.unread && (
                                  <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {discussion.course}
                            </p>
                            <p className="mt-2">{discussion.message}</p>
                            <div className="mt-3 flex justify-end">
                              <Button variant="outline" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-4 w-full">
                    View all discussions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
