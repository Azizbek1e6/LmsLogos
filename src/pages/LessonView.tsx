import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play,
  Pause,
} from "lucide-react";

const LessonView = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock lesson data - in a real app, you would fetch this based on courseId and lessonId
  const lesson = {
    id: lessonId,
    title: "HTML Document Structure",
    description:
      "Learn about the basic structure of HTML documents, including DOCTYPE declarations, head and body elements, and how to create a well-formed HTML page.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
    duration: "14:22",
    nextLessonId: "lesson-5",
    prevLessonId: "lesson-3",
    resources: [
      { name: "HTML Cheat Sheet", url: "#" },
      { name: "Practice Exercise", url: "#" },
      { name: "Additional Reading", url: "#" },
    ],
  };

  // Simulate video progress
  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying && progress < 100) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            setIsCompleted(true);
            return 100;
          }
          return newProgress;
        });
      }, 1000); // Update every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, progress]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextLesson = () => {
    if (lesson.nextLessonId) {
      navigate(`/course/${courseId}/lesson/${lesson.nextLessonId}`);
    }
  };

  const handlePrevLesson = () => {
    if (lesson.prevLessonId) {
      navigate(`/course/${courseId}/lesson/${lesson.prevLessonId}`);
    }
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              className="mb-4 text-gray-600"
              onClick={handleBackToCourse}
            >
              <ChevronLeft className="mr-1" size={16} /> Back to Course
            </Button>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-600 mb-6">{lesson.description}</p>

            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden mb-4 relative">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-[500px]"
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Custom Video Controls (for demonstration) */}
              <div className="bg-gray-900 p-3 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-800"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>

                <div className="flex-grow mx-3">
                  <Progress value={progress} className="h-2" />
                </div>

                <span className="text-white text-sm">
                  {Math.floor(
                    (progress / 100) * parseInt(lesson.duration.split(":")[0]),
                  ) +
                    ":" +
                    Math.floor(
                      (
                        (progress / 100) *
                        parseInt(lesson.duration.split(":")[1])
                      )
                        .toString()
                        .padStart(2, "0"),
                    )}
                  /{lesson.duration}
                </span>
              </div>
            </div>

            {/* Lesson Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={handlePrevLesson}
                disabled={!lesson.prevLessonId}
              >
                <ChevronLeft className="mr-1" size={16} /> Previous Lesson
              </Button>

              {isCompleted ? (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2" size={16} /> Completed
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className={`${progress > 0 ? "border-blue-200 text-blue-700" : ""}`}
                  onClick={togglePlayPause}
                >
                  {isPlaying
                    ? "Pause"
                    : progress > 0
                      ? "Continue"
                      : "Start Lesson"}
                </Button>
              )}

              <Button
                onClick={handleNextLesson}
                disabled={!lesson.nextLessonId}
              >
                Next Lesson <ChevronRight className="ml-1" size={16} />
              </Button>
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 mt-8"
          >
            <h2 className="text-xl font-bold mb-4">Lesson Resources</h2>
            <ul className="space-y-2">
              {lesson.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="text-blue-600 hover:underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">📄</span> {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LessonView;
