import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type: "single" | "multiple";
}

const TakeQuiz = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock quiz data - in a real app, you would fetch this based on courseId
  const quiz = {
    id: "quiz-1",
    title: "HTML Fundamentals Quiz",
    description:
      "Test your knowledge of HTML fundamentals covered in this course.",
    timeLimit: 30, // minutes
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyperlink and Text Markup Language",
          "Home Tool Markup Language",
        ],
        type: "single",
      },
      {
        id: "q2",
        question: "Which HTML element is used for creating a paragraph?",
        options: ["<paragraph>", "<p>", "<para>", "<text>"],
        type: "single",
      },
      {
        id: "q3",
        question:
          "Which of the following are valid HTML5 semantic elements? (Select all that apply)",
        options: ["<article>", "<section>", "<container>", "<aside>"],
        type: "multiple",
      },
      {
        id: "q4",
        question:
          "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        type: "single",
      },
      {
        id: "q5",
        question:
          "Which attribute is used to specify an alternate text for an image?",
        options: ["src", "alt", "title", "href"],
        type: "single",
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !quizSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSingleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value),
    });
  };

  const handleMultipleAnswerChange = (
    questionId: string,
    optionIndex: number,
  ) => {
    const currentAnswers = (answers[questionId] as number[]) || [];
    let newAnswers: number[];

    if (currentAnswers.includes(optionIndex)) {
      newAnswers = currentAnswers.filter((index) => index !== optionIndex);
    } else {
      newAnswers = [...currentAnswers, optionIndex];
    }

    setAnswers({
      ...answers,
      [questionId]: newAnswers,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isQuestionAnswered = (questionId: string) => {
    return (
      answers[questionId] !== undefined &&
      (typeof answers[questionId] === "number" ||
        (Array.isArray(answers[questionId]) && answers[questionId].length > 0))
    );
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);

    // Simulate API call to grade quiz
    setTimeout(() => {
      // Mock scoring - in a real app, you would compare with correct answers from the backend
      const mockCorrectAnswers = {
        q1: 0, // Hyper Text Markup Language
        q2: 1, // <p>
        q3: [0, 1, 3], // <article>, <section>, <aside>
        q4: 2, // <br>
        q5: 1, // alt
      };

      let correctCount = 0;

      Object.keys(mockCorrectAnswers).forEach((questionId) => {
        const userAnswer = answers[questionId];
        const correctAnswer = (mockCorrectAnswers as any)[questionId];

        if (Array.isArray(correctAnswer)) {
          // For multiple choice questions
          if (
            Array.isArray(userAnswer) &&
            userAnswer.length === correctAnswer.length &&
            userAnswer.every((val) => correctAnswer.includes(val))
          ) {
            correctCount++;
          }
        } else {
          // For single choice questions
          if (userAnswer === correctAnswer) {
            correctCount++;
          }
        }
      });

      const calculatedScore = Math.round(
        (correctCount / quiz.questions.length) * 100,
      );
      setScore(calculatedScore);
      setPassed(calculatedScore >= quiz.passingScore);
      setQuizSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              className="mb-6 text-gray-600"
              onClick={() => navigate(`/course/${courseId}`)}
            >
              <ChevronLeft className="mr-1" size={16} /> Back to Course
            </Button>

            {!quizSubmitted ? (
              <>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{quiz.title}</h1>
                    <div className="flex items-center text-amber-600">
                      <Clock className="mr-1" size={18} />
                      <span className="font-medium">
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{quiz.description}</p>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>
                      Question {currentQuestionIndex + 1} of{" "}
                      {quiz.questions.length}
                    </span>
                    <span>
                      {answeredQuestionsCount} of {quiz.questions.length}{" "}
                      answered
                    </span>
                  </div>

                  <Progress value={progress} className="h-2 mb-6" />
                </div>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-4">
                      {currentQuestion.question}
                    </h2>

                    {currentQuestion.type === "single" ? (
                      <RadioGroup
                        value={answers[currentQuestion.id]?.toString() || ""}
                        onValueChange={(value) =>
                          handleSingleAnswerChange(currentQuestion.id, value)
                        }
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={index.toString()}
                              id={`option-${index}`}
                            />
                            <Label
                              htmlFor={`option-${index}`}
                              className="cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`option-${index}`}
                              checked={(
                                (answers[currentQuestion.id] as number[]) || []
                              ).includes(index)}
                              onCheckedChange={() =>
                                handleMultipleAnswerChange(
                                  currentQuestion.id,
                                  index,
                                )
                              }
                            />
                            <Label
                              htmlFor={`option-${index}`}
                              className="cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="mr-1" size={16} /> Previous
                  </Button>

                  {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!isQuestionAnswered(currentQuestion.id)}
                    >
                      Next <ChevronRight className="ml-1" size={16} />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={
                        answeredQuestionsCount < quiz.questions.length ||
                        isSubmitting
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Quiz"
                      )}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-8 text-center"
              >
                <div className="mb-6">
                  {passed ? (
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-12 w-12 text-red-600" />
                    </div>
                  )}

                  <h2 className="text-2xl font-bold mb-2">
                    {passed ? "Congratulations!" : "Quiz Not Passed"}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {passed
                      ? "You have successfully passed the quiz!"
                      : `You didn't reach the passing score. You need at least ${quiz.passingScore}% to pass.`}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 inline-block">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {score}%
                  </div>
                  <p className="text-gray-500">
                    Your Score ({passed ? "Passed" : "Failed"})
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/course/${courseId}`)}
                  >
                    Return to Course
                  </Button>

                  {!passed && (
                    <Button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setTimeRemaining(quiz.timeLimit * 60);
                      }}
                    >
                      Retry Quiz
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TakeQuiz;
