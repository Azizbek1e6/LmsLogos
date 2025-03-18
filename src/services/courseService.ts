import { supabase, isUsingMockData } from "@/lib/supabase";
import { mockCourses } from "./mockData";

export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor: string;
  instructorId?: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  bestseller?: boolean;
  progress?: number;
  completed?: boolean;
}

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        return mockCourses;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("courses")
        .select(
          `
          *,
          profiles:instructor_id (full_name)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          instructor: course.profiles.full_name,
          instructorId: course.instructor_id,
          rating: course.rating,
          reviewCount: course.review_count,
          price: course.price,
          originalPrice: course.original_price,
          category: course.category,
          image: course.image,
          bestseller: course.bestseller,
        }));
      }

      // Return mock data if no results from Supabase
      return mockCourses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return mockCourses;
    }
  },

  async getCourseById(id: string): Promise<Course | null> {
    try {
      // Try to fetch from Supabase
      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            `
            *,
            profiles:instructor_id (full_name)
          `,
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          return {
            id: data.id,
            title: data.title,
            description: data.description,
            instructor: data.profiles.full_name,
            instructorId: data.instructor_id,
            rating: data.rating,
            reviewCount: data.review_count,
            price: data.price,
            originalPrice: data.original_price,
            category: data.category,
            image: data.image,
            bestseller: data.bestseller,
          };
        }
      } catch (supabaseError) {
        console.error(`Error fetching course with id ${id}:`, supabaseError);
      }

      // Return mock data if Supabase fails
      return mockCourses.find((course) => course.id === id) || null;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      return mockCourses.find((course) => course.id === id) || null;
    }
  },

  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      // Try to fetch from Supabase
      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            `
            *,
            profiles:instructor_id (full_name)
          `,
          )
          .eq("category", category)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: course.profiles.full_name,
            instructorId: course.instructor_id,
            rating: course.rating,
            reviewCount: course.review_count,
            price: course.price,
            originalPrice: course.original_price,
            category: course.category,
            image: course.image,
            bestseller: course.bestseller,
          }));
        }
      } catch (supabaseError) {
        console.error(
          `Error fetching courses in category ${category}:`,
          supabaseError,
        );
      }

      // Return mock data if Supabase fails
      return mockCourses.filter((course) => course.category === category);
    } catch (error) {
      console.error(`Error fetching courses in category ${category}:`, error);
      return mockCourses.filter((course) => course.category === category);
    }
  },

  async searchCourses(query: string): Promise<Course[]> {
    try {
      // Try to fetch from Supabase
      try {
        const { data, error } = await supabase
          .from("courses")
          .select(
            `
            *,
            profiles:instructor_id (full_name)
          `,
          )
          .ilike("title", `%${query}%`)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: course.profiles.full_name,
            instructorId: course.instructor_id,
            rating: course.rating,
            reviewCount: course.review_count,
            price: course.price,
            originalPrice: course.original_price,
            category: course.category,
            image: course.image,
            bestseller: course.bestseller,
          }));
        }
      } catch (supabaseError) {
        console.error(
          `Error searching courses with query ${query}:`,
          supabaseError,
        );
      }

      // Return mock data if Supabase fails
      return mockCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          (course.description &&
            course.description.toLowerCase().includes(query.toLowerCase())),
      );
    } catch (error) {
      console.error(`Error searching courses with query ${query}:`, error);
      return mockCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          (course.description &&
            course.description.toLowerCase().includes(query.toLowerCase())),
      );
    }
  },

  async enrollInCourse(userId: string, courseId: string): Promise<void> {
    try {
      const { error } = await supabase.from("enrollments").insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error(
        `Error enrolling user ${userId} in course ${courseId}:`,
        error,
      );
      // Don't throw error in mock mode
    }
  },

  async getEnrolledCourses(userId: string): Promise<Course[]> {
    try {
      // Try to fetch from Supabase
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select(
            `
            progress,
            completed,
            courses:course_id (*, profiles:instructor_id (full_name))
          `,
          )
          .eq("user_id", userId);

        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((enrollment) => ({
            id: enrollment.courses.id,
            title: enrollment.courses.title,
            description: enrollment.courses.description,
            instructor: enrollment.courses.profiles.full_name,
            instructorId: enrollment.courses.instructor_id,
            rating: enrollment.courses.rating,
            reviewCount: enrollment.courses.review_count,
            price: enrollment.courses.price,
            originalPrice: enrollment.courses.original_price,
            category: enrollment.courses.category,
            image: enrollment.courses.image,
            bestseller: enrollment.courses.bestseller,
            progress: enrollment.progress,
            completed: enrollment.completed,
          }));
        }
      } catch (supabaseError) {
        console.error(
          `Error fetching enrolled courses for user ${userId}:`,
          supabaseError,
        );
      }

      // Return first two mock courses as enrolled if Supabase fails
      return mockCourses.slice(0, 2).map((course) => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        completed: false,
      }));
    } catch (error) {
      console.error(
        `Error fetching enrolled courses for user ${userId}:`,
        error,
      );
      // Return first two mock courses as enrolled if error
      return mockCourses.slice(0, 2).map((course) => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        completed: false,
      }));
    }
  },

  async updateCourseProgress(
    userId: string,
    courseId: string,
    progress: number,
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({
          progress,
          completed: progress === 100,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("course_id", courseId);

      if (error) throw error;
    } catch (error) {
      console.error(
        `Error updating progress for user ${userId} in course ${courseId}:`,
        error,
      );
      // Don't throw error in mock mode
    }
  },
};
