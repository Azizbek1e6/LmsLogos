import { Course } from "./courseService";
import { Lesson } from "./lessonService";
import { Testimonial } from "./testimonialService";

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Jane Smith",
    rating: 4.8,
    reviewCount: 2453,
    price: 89.99,
    originalPrice: 199.99,
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    bestseller: true,
    description:
      "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more. This comprehensive bootcamp will take you from beginner to professional developer.",
  },
  {
    id: "course-2",
    title: "Advanced JavaScript: From Fundamentals to Functional JS",
    instructor: "Prof. Michael Johnson",
    rating: 4.7,
    reviewCount: 1872,
    price: 94.99,
    originalPrice: 189.99,
    category: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    bestseller: true,
    description:
      "Take your JavaScript skills to the next level with advanced concepts, functional programming techniques, and modern ES6+ features.",
  },
  {
    id: "course-3",
    title: "React & Redux Masterclass",
    instructor: "Sarah Williams",
    rating: 4.9,
    reviewCount: 3241,
    price: 109.99,
    originalPrice: 229.99,
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    bestseller: false,
    description:
      "Master React.js and Redux with hands-on projects. Learn component architecture, state management, hooks, context API and more.",
  },
  {
    id: "course-4",
    title: "Python for Data Science and Machine Learning",
    instructor: "Dr. Alex Chen",
    rating: 4.8,
    reviewCount: 2876,
    price: 119.99,
    originalPrice: 249.99,
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&q=80",
    bestseller: true,
    description:
      "Learn Python for data analysis, visualization, and machine learning. Includes pandas, NumPy, Matplotlib, scikit-learn and more.",
  },
  {
    id: "course-5",
    title: "UI/UX Design Fundamentals",
    instructor: "Emily Rodriguez",
    rating: 4.6,
    reviewCount: 1543,
    price: 79.99,
    originalPrice: 169.99,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    bestseller: false,
    description:
      "Learn the principles of effective UI/UX design. Master user research, wireframing, prototyping, and design systems.",
  },
  {
    id: "course-6",
    title: "Full Stack Mobile Development with React Native",
    instructor: "James Wilson",
    rating: 4.7,
    reviewCount: 1987,
    price: 99.99,
    originalPrice: 199.99,
    category: "Mobile Development",
    image:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
    bestseller: true,
    description:
      "Build cross-platform mobile apps for iOS and Android using React Native. Includes state management, navigation, and API integration.",
  },
];

// Mock lessons data
export const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    courseId: "course-1",
    title: "Introduction to HTML",
    description: "Learn the basics of HTML structure and elements",
    duration: "45 minutes",
    videoUrl: "https://example.com/videos/intro-html",
    order: 1,
  },
  {
    id: "lesson-2",
    courseId: "course-1",
    title: "CSS Fundamentals",
    description: "Master the core concepts of CSS styling",
    duration: "50 minutes",
    videoUrl: "https://example.com/videos/css-fundamentals",
    order: 2,
  },
  {
    id: "lesson-3",
    courseId: "course-1",
    title: "JavaScript Basics",
    description: "Get started with JavaScript programming",
    duration: "60 minutes",
    videoUrl: "https://example.com/videos/js-basics",
    order: 3,
  },
  {
    id: "lesson-4",
    courseId: "course-2",
    title: "Advanced JavaScript Concepts",
    description: "Dive deep into closures, prototypes, and this keyword",
    duration: "65 minutes",
    videoUrl: "https://example.com/videos/advanced-js",
    order: 1,
  },
  {
    id: "lesson-5",
    courseId: "course-2",
    title: "Functional Programming in JavaScript",
    description: "Learn map, filter, reduce and other functional techniques",
    duration: "55 minutes",
    videoUrl: "https://example.com/videos/functional-js",
    order: 2,
  },
];

// Mock testimonials data
export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Web Development Student",
    content:
      "EduPress completely transformed my learning experience. The courses are well-structured and the instructors are incredibly knowledgeable. I went from knowing nothing about coding to building my own websites in just a few months!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Data Science Professional",
    content:
      "The data science courses on EduPress are top-notch. The practical projects helped me apply what I learned immediately in my job. My company has already seen the benefits of my enhanced skills.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 4,
  },
  {
    id: "3",
    name: "Jessica Williams",
    role: "Graphic Design Student",
    content:
      "As someone transitioning careers, EduPress provided exactly what I needed. The design courses are comprehensive and the feedback from instructors was invaluable for my portfolio development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    rating: 5,
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Business Analytics Manager",
    content:
      "I've taken courses on multiple platforms, but EduPress stands out for its quality and depth. The business analytics program helped me secure a promotion within three months of completion.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    rating: 5,
  },
];
