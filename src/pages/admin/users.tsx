import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRole } from "@/types/user";

const UsersPage = () => {
  // Mock users data
  const users = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@edupress.com",
      role: UserRole.ADMIN,
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "John Smith",
      email: "john@example.com",
      role: UserRole.TEACHER,
      status: "Active",
      joinDate: "2023-03-22",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: UserRole.STUDENT,
      status: "Active",
      joinDate: "2023-04-10",
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael@example.com",
      role: UserRole.STUDENT,
      status: "Inactive",
      joinDate: "2023-02-05",
    },
    {
      id: "5",
      name: "Emily Davis",
      email: "emily@example.com",
      role: UserRole.TEACHER,
      status: "Active",
      joinDate: "2023-05-18",
    },
    {
      id: "6",
      name: "David Wilson",
      email: "david@example.com",
      role: UserRole.STUDENT,
      status: "Active",
      joinDate: "2023-06-30",
    },
    {
      id: "7",
      name: "Jessica Taylor",
      email: "jessica@example.com",
      role: UserRole.STUDENT,
      status: "Active",
      joinDate: "2023-07-12",
    },
    {
      id: "8",
      name: "Robert Martinez",
      email: "robert@example.com",
      role: UserRole.TEACHER,
      status: "Inactive",
      joinDate: "2023-03-05",
    },
  ];

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-purple-100 text-purple-800";
      case UserRole.TEACHER:
        return "bg-blue-100 text-blue-800";
      case UserRole.STUDENT:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Input placeholder="Search users..." className="pl-10" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Button>Add User</Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage all users in the platform. Total: {users.length} users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeClass(
                            user.role,
                          )}`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            user.status,
                          )}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(user.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsersPage;
