import { supabase, isUsingMockData } from "@/lib/supabase";
import { mockTestimonials } from "./mockData";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export const testimonialService = {
  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      // If we're using mock data, return it directly without trying Supabase
      if (isUsingMockData) {
        return mockTestimonials;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("testimonials")
        .select(
          `
          *,
          profiles:user_id (full_name, role, avatar_url)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((testimonial) => ({
          id: testimonial.id,
          name: testimonial.profiles.full_name,
          role: testimonial.profiles.role,
          content: testimonial.content,
          avatar: testimonial.profiles.avatar_url,
          rating: testimonial.rating,
        }));
      }

      // Return mock data if no results from Supabase
      return mockTestimonials;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return mockTestimonials;
    }
  },

  async addTestimonial(
    userId: string,
    content: string,
    rating: number,
  ): Promise<void> {
    try {
      const { error } = await supabase.from("testimonials").insert({
        user_id: userId,
        content,
        rating,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error adding testimonial:", error);
      // Don't throw error in mock mode
    }
  },
};
