import { supabase, isUsingMockData } from "@/lib/supabase";
import { mockLessons } from "./mockData";

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

export const lessonService = {
  async getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        return mockLessons.filter((lesson) => lesson.courseId === courseId);
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order", { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((lesson) => ({
          id: lesson.id,
          courseId: lesson.course_id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.video_url,
          duration: lesson.duration,
          order: lesson.order,
        }));
      }

      // Return mock data if no results from Supabase
      return mockLessons.filter((lesson) => lesson.courseId === courseId);
    } catch (error) {
      console.error(`Error fetching lessons for course ${courseId}:`, error);
      return mockLessons.filter((lesson) => lesson.courseId === courseId);
    }
  },

  async getLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        return mockLessons.find((lesson) => lesson.id === lessonId) || null;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (error) throw error;
      if (data) {
        return {
          id: data.id,
          courseId: data.course_id,
          title: data.title,
          description: data.description,
          videoUrl: data.video_url,
          duration: data.duration,
          order: data.order,
        };
      }

      // Return mock data if no results from Supabase
      return mockLessons.find((lesson) => lesson.id === lessonId) || null;
    } catch (error) {
      console.error(`Error fetching lesson with id ${lessonId}:`, error);
      return mockLessons.find((lesson) => lesson.id === lessonId) || null;
    }
  },

  async getNextLesson(
    courseId: string,
    currentOrder: number,
  ): Promise<Lesson | null> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        const courseLessons = mockLessons.filter(
          (lesson) => lesson.courseId === courseId,
        );
        const nextLesson = courseLessons.find(
          (lesson) => lesson.order > currentOrder,
        );
        return nextLesson || null;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .gt("order", currentOrder)
        .order("order", { ascending: true })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 is the error code for no rows returned
      if (data) {
        return {
          id: data.id,
          courseId: data.course_id,
          title: data.title,
          description: data.description,
          videoUrl: data.video_url,
          duration: data.duration,
          order: data.order,
        };
      }

      // Return mock data if no results from Supabase
      const courseLessons = mockLessons.filter(
        (lesson) => lesson.courseId === courseId,
      );
      const nextLesson = courseLessons.find(
        (lesson) => lesson.order > currentOrder,
      );
      return nextLesson || null;
    } catch (error) {
      console.error(
        `Error fetching next lesson for course ${courseId} after order ${currentOrder}:`,
        error,
      );
      const courseLessons = mockLessons.filter(
        (lesson) => lesson.courseId === courseId,
      );
      const nextLesson = courseLessons.find(
        (lesson) => lesson.order > currentOrder,
      );
      return nextLesson || null;
    }
  },

  async getPreviousLesson(
    courseId: string,
    currentOrder: number,
  ): Promise<Lesson | null> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        const courseLessons = mockLessons.filter(
          (lesson) => lesson.courseId === courseId,
        );
        const prevLessons = courseLessons.filter(
          (lesson) => lesson.order < currentOrder,
        );
        return prevLessons.length > 0
          ? prevLessons[prevLessons.length - 1]
          : null;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .lt("order", currentOrder)
        .order("order", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      if (data) {
        return {
          id: data.id,
          courseId: data.course_id,
          title: data.title,
          description: data.description,
          videoUrl: data.video_url,
          duration: data.duration,
          order: data.order,
        };
      }

      // Return mock data if no results from Supabase
      const courseLessons = mockLessons.filter(
        (lesson) => lesson.courseId === courseId,
      );
      const prevLessons = courseLessons.filter(
        (lesson) => lesson.order < currentOrder,
      );
      return prevLessons.length > 0
        ? prevLessons[prevLessons.length - 1]
        : null;
    } catch (error) {
      console.error(
        `Error fetching previous lesson for course ${courseId} before order ${currentOrder}:`,
        error,
      );
      const courseLessons = mockLessons.filter(
        (lesson) => lesson.courseId === courseId,
      );
      const prevLessons = courseLessons.filter(
        (lesson) => lesson.order < currentOrder,
      );
      return prevLessons.length > 0
        ? prevLessons[prevLessons.length - 1]
        : null;
    }
  },
};
