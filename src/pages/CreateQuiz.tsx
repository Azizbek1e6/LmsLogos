import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, ChevronLeft, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "single" | "multiple";
  multipleAnswers?: number[];
}

const CreateQuiz = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if not a teacher
  if (user?.role !== UserRole.TEACHER) {
    navigate(`/course/${courseId}`);
  }

  const [quizTitle, setQuizTitle] = useState("HTML Fundamentals Quiz");
  const [quizDescription, setQuizDescription] = useState(
    "Test your knowledge of HTML fundamentals covered in this course.",
  );
  const [timeLimit, setTimeLimit] = useState("30");
  const [passingScore, setPassingScore] = useState("70");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: 0,
      type: "single",
    },
  ]);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${questions.length + 1}`,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      type: "single",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[index] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const toggleQuestionType = (index: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[index];
    question.type = question.type === "single" ? "multiple" : "single";
    if (question.type === "multiple") {
      question.multipleAnswers = [question.correctAnswer];
    } else {
      delete question.multipleAnswers;
    }
    setQuestions(updatedQuestions);
  };

  const toggleMultipleAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (!question.multipleAnswers) {
      question.multipleAnswers = [];
    }

    const answerIndex = question.multipleAnswers.indexOf(optionIndex);
    if (answerIndex === -1) {
      question.multipleAnswers.push(optionIndex);
    } else {
      question.multipleAnswers.splice(answerIndex, 1);
    }

    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = () => {
    // In a real app, you would save the quiz to your backend
    console.log({
      courseId,
      title: quizTitle,
      description: quizDescription,
      timeLimit: parseInt(timeLimit),
      passingScore: parseInt(passingScore),
      questions,
    });

    // Show success message and redirect
    alert("Quiz created successfully!");
    navigate(`/course/${courseId}`);
  };

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

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="quiz-description">Description</Label>
                  <Textarea
                    id="quiz-description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                    <Input
                      id="time-limit"
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="mt-1"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="passing-score">Passing Score (%)</Label>
                    <Input
                      id="passing-score"
                      type="number"
                      value={passingScore}
                      onChange={(e) => setPassingScore(e.target.value)}
                      className="mt-1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Questions</h2>
                <Button onClick={addQuestion}>
                  <Plus className="mr-1" size={16} /> Add Question
                </Button>
              </div>

              {questions.map((question, questionIndex) => (
                <Card key={question.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 mr-4">
                        <Label
                          htmlFor={`question-${questionIndex}`}
                          className="mb-2 block"
                        >
                          Question {questionIndex + 1}
                        </Label>
                        <Textarea
                          id={`question-${questionIndex}`}
                          value={question.question}
                          onChange={(e) =>
                            updateQuestion(
                              questionIndex,
                              "question",
                              e.target.value,
                            )
                          }
                          className="mb-2"
                        />

                        <div className="flex items-center mt-2">
                          <Label className="mr-2">Question Type:</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => toggleQuestionType(questionIndex)}
                          >
                            {question.type === "single"
                              ? "Single Choice"
                              : "Multiple Choice"}
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeQuestion(questionIndex)}
                        disabled={questions.length === 1}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>

                    <div className="space-y-3 mt-4">
                      <Label>Answer Options</Label>

                      {question.type === "single" ? (
                        <RadioGroup
                          value={question.correctAnswer.toString()}
                          onValueChange={(value) =>
                            updateQuestion(
                              questionIndex,
                              "correctAnswer",
                              parseInt(value),
                            )
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <RadioGroupItem
                                value={optionIndex.toString()}
                                id={`q${questionIndex}-option-${optionIndex}`}
                              />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateOption(
                                    questionIndex,
                                    optionIndex,
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Checkbox
                                id={`q${questionIndex}-option-${optionIndex}`}
                                checked={
                                  question.multipleAnswers?.includes(
                                    optionIndex,
                                  ) || false
                                }
                                onCheckedChange={() =>
                                  toggleMultipleAnswer(
                                    questionIndex,
                                    optionIndex,
                                  )
                                }
                              />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateOption(
                                    questionIndex,
                                    optionIndex,
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveQuiz}
              >
                <Save className="mr-2" size={16} /> Save Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateQuiz;
