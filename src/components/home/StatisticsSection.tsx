import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

interface StatisticsSectionProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
}

const StatisticsSection = ({
  stats = [
    {
      icon: <BookOpen size={36} />,
      value: "10,000+",
      label: "Courses Available",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Users size={36} />,
      value: "250,000+",
      label: "Active Students",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <GraduationCap size={36} />,
      value: "2,500+",
      label: "Expert Instructors",
      color: "bg-purple-100 text-purple-600",
    },
  ],
  title = "Our Impact in Numbers",
  subtitle = "Join thousands of learners who have transformed their careers with EduPress",
}: StatisticsSectionProps) => {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-3 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`rounded-full p-4 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2 text-gray-800">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
