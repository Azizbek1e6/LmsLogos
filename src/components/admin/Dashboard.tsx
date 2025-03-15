import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      increasing: true,
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: "152",
      change: "+5.2%",
      increasing: true,
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: "$42,582",
      change: "+18.7%",
      increasing: true,
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "-2.1%",
      increasing: false,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-orange-500",
    },
  ];

  // Recent users mock data
  const recentUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Student",
      joinDate: "2023-08-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Teacher",
      joinDate: "2023-08-14",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      joinDate: "2023-08-13",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Student",
      joinDate: "2023-08-12",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      role: "Teacher",
      joinDate: "2023-08-11",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ];

  // Recent courses mock data
  const recentCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      students: 245,
      rating: 4.8,
      price: "$89.99",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Jane Doe",
      students: 189,
      rating: 4.7,
      price: "$69.99",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mark Johnson",
      students: 156,
      rating: 4.5,
      price: "$59.99",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Lisa Chen",
      students: 210,
      rating: 4.9,
      price: "$79.99",
    },
    {
      id: 5,
      title: "Digital Marketing Masterclass",
      instructor: "Robert Williams",
      students: 178,
      rating: 4.6,
      price: "$64.99",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button>Download Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} text-white p-2 rounded-full`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs flex items-center ${
                    stat.increasing ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.increasing ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                {recentUsers.length} users registered recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          user.role === "Teacher"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Users
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>
                {recentCourses.length} courses added recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-500">
                        by {course.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{course.price}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="mr-2">{course.rating} ★</span>
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Courses
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
