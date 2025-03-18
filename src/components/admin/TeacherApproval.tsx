import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Mail, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { UserRole } from "@/types/user";

interface TeacherRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  bio: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  avatar?: string;
}

const TeacherApproval = () => {
  const [teacherRequests, setTeacherRequests] = useState<TeacherRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeacherRequests();
  }, []);

  const fetchTeacherRequests = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from Supabase
      // For now, we'll use mock data
      const mockRequests: TeacherRequest[] = [
        {
          id: "req-1",
          userId: "user-1",
          fullName: "John Smith",
          email: "john.smith@example.com",
          bio: "Experienced web developer with 10 years of industry experience. Specialized in JavaScript and React.",
          createdAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "pending",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
        {
          id: "req-2",
          userId: "user-2",
          fullName: "Emily Johnson",
          email: "emily.johnson@example.com",
          bio: "Data scientist with a PhD in Computer Science. Passionate about teaching machine learning concepts.",
          createdAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "pending",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        },
        {
          id: "req-3",
          userId: "user-3",
          fullName: "Michael Chen",
          email: "michael.chen@example.com",
          bio: "Full-stack developer and certified AWS architect. I've been teaching programming for 5 years.",
          createdAt: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "pending",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
        },
      ];

      setTeacherRequests(mockRequests);
    } catch (error) {
      console.error("Error fetching teacher requests:", error);
      toast({
        title: "Error",
        description: "Failed to load teacher approval requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId: string, userId: string) => {
    try {
      // In a real implementation, this would update the user's role in Supabase
      // For now, we'll just update the local state

      // Update the user role in Supabase (commented out for mock implementation)
      // const { error } = await supabase
      //   .from('users')
      //   .update({ role: "TEACHER" })
      //   .eq('id', userId);
      //
      // if (error) throw error;

      // Update the request status
      setTeacherRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "approved" } : req,
        ),
      );

      toast({
        title: "Teacher Approved",
        description: "The user has been approved as a teacher",
      });
    } catch (error) {
      console.error("Error approving teacher:", error);
      toast({
        title: "Error",
        description: "Failed to approve teacher",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      // In a real implementation, this would update the request status in Supabase
      // For now, we'll just update the local state
      setTeacherRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "rejected" } : req,
        ),
      );

      toast({
        title: "Request Rejected",
        description: "The teacher request has been rejected",
      });
    } catch (error) {
      console.error("Error rejecting teacher request:", error);
      toast({
        title: "Error",
        description: "Failed to reject teacher request",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Approval Requests</CardTitle>
        <CardDescription>
          Review and approve requests from users who want to become teachers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : teacherRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending teacher approval requests
          </div>
        ) : (
          <div className="space-y-6">
            {teacherRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={
                          request.avatar ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                        }
                        alt={request.fullName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{request.fullName}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {request.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Requested on {formatDate(request.createdAt)}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      request.status === "pending"
                        ? "outline"
                        : request.status === "approved"
                          ? "success"
                          : "destructive"
                    }
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Bio</h4>
                  <p className="text-sm text-muted-foreground">{request.bio}</p>
                </div>

                {request.status === "pending" && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id, request.userId)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherApproval;
