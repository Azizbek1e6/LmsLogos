import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  specialties: string[];
  bio: string;
}

const Instructors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );

  const instructors: Instructor[] = [
    {
      id: "instructor-1",
      name: "Dr. Jane Smith",
      title: "Senior Web Developer & Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      rating: 4.8,
      students: 42891,
      courses: 12,
      specialties: ["Web Development", "JavaScript", "React"],
      bio: "Dr. Jane Smith is a senior web developer with over 10 years of experience in the industry. She has worked with major tech companies and has taught web development to thousands of students worldwide.",
    },
    {
      id: "instructor-2",
      name: "Prof. Michael Johnson",
      title: "JavaScript Expert & Software Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.7,
      students: 38452,
      courses: 8,
      specialties: ["JavaScript", "Node.js", "Full-Stack Development"],
      bio: "Professor Michael Johnson is a JavaScript expert with a passion for teaching. He has developed numerous web applications and has been teaching programming for over 8 years.",
    },
    {
      id: "instructor-3",
      name: "Sarah Williams",
      title: "UI/UX Designer & React Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 4.9,
      students: 29876,
      courses: 6,
      specialties: ["React", "UI/UX Design", "Frontend Development"],
      bio: "Sarah Williams combines her expertise in UI/UX design with React development to create beautiful and functional web applications. She has helped hundreds of students master React and design principles.",
    },
    {
      id: "instructor-4",
      name: "Dr. Robert Miller",
      title: "Data Scientist & Machine Learning Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      rating: 4.8,
      students: 31542,
      courses: 10,
      specialties: ["Data Science", "Python", "Machine Learning"],
      bio: "Dr. Robert Miller has a Ph.D. in Computer Science with a focus on machine learning. He has worked on numerous data science projects and loves sharing his knowledge with students.",
    },
    {
      id: "instructor-5",
      name: "Emily Davis",
      title: "Mobile App Developer & Flutter Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      rating: 4.6,
      students: 18765,
      courses: 5,
      specialties: ["Mobile Development", "Flutter", "React Native"],
      bio: "Emily Davis specializes in mobile app development using Flutter and React Native. She has developed several popular mobile applications and enjoys teaching mobile development concepts.",
    },
    {
      id: "instructor-6",
      name: "Alex Chen",
      title: "UX Designer & Creative Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      rating: 4.7,
      students: 21345,
      courses: 7,
      specialties: ["UX Design", "UI Design", "Design Thinking"],
      bio: "Alex Chen is a UX designer and creative director with a background in psychology. He focuses on creating user-centered designs and teaching design principles that enhance user experience.",
    },
  ];

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(instructors.flatMap((instructor) => instructor.specialties)),
  ).sort();

  // Filter instructors based on search term and selected specialty
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty || instructor.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="bg-gray container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray text-3xl md:text-4xl font-bold mb-4"
            >
              Our Expert Instructors
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg"
            >
              Learn from industry professionals with years of experience and a
              passion for teaching.
            </motion.p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search instructors..."
                  className="pl-10 bg-white dark:bg-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button
                  variant={!selectedSpecialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(null)}
                  className="whitespace-nowrap"
                >
                  All Specialties
                </Button>
                {allSpecialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={
                      selectedSpecialty === specialty ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className="whitespace-nowrap"
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInstructors.map((instructor, index) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{instructor.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {instructor.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-500 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{instructor.rating.toFixed(1)}</span>
                          </div>
                          <div>
                            {instructor.students.toLocaleString()} students
                          </div>
                          <div>{instructor.courses} courses</div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                      {instructor.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Mail size={16} />
                        Contact
                      </Button>
                      <Button>View Courses</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredInstructors.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  No instructors found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Become an Instructor */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              Become an Instructor
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg mb-8"
            >
              Share your knowledge with the world and join our community of
              expert instructors. Create engaging courses and reach thousands of
              students.
            </motion.p>
            <Button size="lg">Apply Now</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Instructors;
