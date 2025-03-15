import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, BookOpen, Award } from "lucide-react";

interface LessonContainerProps {
  id?: string;
  title?: string;
  description?: string;
  duration?: string;
  lessons?: number;
  level?: string;
  image?: string;
  progress?: number;
  courseId?: string;
}

const LessonContainer = ({
  id = "lesson-1",
  title = "Introduction to Web Development",
  description = "Learn the basics of HTML, CSS, and JavaScript in this introductory lesson.",
  duration = "45 minutes",
  lessons = 3,
  level = "Beginner",
  image = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  progress = 0,
  courseId = "course-1",
}: LessonContainerProps) => {
  const navigate = useNavigate();

  const handleOpenCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const handleStartLesson = () => {
    navigate(`/course/${courseId}/lesson/${id}`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white w-full">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[180px] object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600">
          {level}
        </Badge>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{lessons} lessons</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenCourse}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          View Course
        </Button>
        <Button size="sm" onClick={handleStartLesson}>
          {progress > 0 ? "Continue" : "Start Lesson"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonContainer;
