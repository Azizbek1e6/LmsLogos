import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: "student" | "teacher";
  userAvatar: string;
  content: string;
  timestamp: Date;
}

interface CourseChatProps {
  courseId: string;
  courseName?: string;
}

const CourseChat = ({
  courseId,
  courseName = "Web Development Bootcamp",
}: CourseChatProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "teacher-1",
      userName: "Dr. Jane Smith",
      userRole: "teacher",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      content:
        "Welcome to the course chat! Feel free to ask any questions about the course material here.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "2",
      userId: "student-1",
      userName: "Michael Chen",
      userRole: "student",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      content:
        "I'm having trouble with the CSS Grid exercise in module 3. Can you provide some additional examples?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "3",
      userId: "teacher-1",
      userName: "Dr. Jane Smith",
      userRole: "teacher",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      content:
        "Of course! I'll post some additional examples in the course materials section. In the meantime, here's a quick tip: try using 'grid-template-areas' for more complex layouts.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
    {
      id: "4",
      userId: "student-2",
      userName: "Sarah Johnson",
      userRole: "student",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "I found this resource really helpful for understanding CSS Grid: https://css-tricks.com/snippets/css/complete-guide-grid/",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: user?.id || "current-user",
      userName: user?.fullName || "Current User",
      userRole: "student",
      userAvatar:
        user?.avatar ||
        "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-gray-800">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">{courseName} - Discussion</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            // Check if we need to show a date separator
            const showDateSeparator =
              index === 0 ||
              formatDate(msg.timestamp) !==
                formatDate(messages[index - 1].timestamp);

            return (
              <React.Fragment key={msg.id}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                      {formatDate(msg.timestamp)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex ${msg.userId === (user?.id || "current-user") ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${msg.userId === (user?.id || "current-user") ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={msg.userAvatar}
                        alt={msg.userName}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div
                      className={`mx-2 ${msg.userId === (user?.id || "current-user") ? "bg-blue-500 text-white" : msg.userRole === "teacher" ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-700"} p-3 rounded-lg`}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="font-medium text-sm">
                          {msg.userName}
                        </span>
                        {msg.userRole === "teacher" && (
                          <span className="text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-1.5 py-0.5 rounded">
                            Teacher
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${msg.userId === (user?.id || "current-user") ? "text-white" : "text-gray-800 dark:text-gray-200"}`}
                      >
                        {msg.content}
                      </p>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs opacity-70 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseChat;
