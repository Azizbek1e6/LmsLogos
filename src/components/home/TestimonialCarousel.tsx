import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/ui/theme-provider";
import { testimonialService, Testimonial } from "@/services/testimonialService";

interface TestimonialProps {
  testimonials?: {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
  }[];
  title?: string;
  subtitle?: string;
}

const TestimonialCarousel = ({
  testimonials: initialTestimonials,
  title = "What Our Students Say",
  subtitle = "Hear from our community of learners who have transformed their careers through our platform",
}: TestimonialProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialTestimonials || [
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
    ],
  );
  const [isLoading, setIsLoading] = useState(!initialTestimonials);

  useEffect(() => {
    // Only fetch from the database if testimonials weren't provided as props
    if (!initialTestimonials) {
      const fetchTestimonials = async () => {
        try {
          setIsLoading(true);
          const data = await testimonialService.getAllTestimonials();
          if (data && data.length > 0) {
            setTestimonials(data);
          }
        } catch (error) {
          console.error("Error fetching testimonials:", error);
          // Keep the default testimonials on error
        } finally {
          setIsLoading(false);
        }
      };

      fetchTestimonials();
    }
  }, [initialTestimonials]);

  return (
    <section className={`py-16 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            {title}
          </h2>
          <p
            className={`max-w-2xl mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative px-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card
                      className={`h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 ${isDark ? "bg-slate-800" : "bg-white"}`}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                              <img
                                src={testimonial.avatar}
                                alt={`${testimonial.name}'s avatar`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4
                                className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                              >
                                {testimonial.name}
                              </h4>
                              <p
                                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                              >
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                          <Quote className="h-6 w-6 text-blue-500 flex-shrink-0" />
                        </div>

                        <p
                          className={`flex-grow mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {testimonial.content}
                        </p>

                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : isDark ? "text-gray-600" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className={`-left-4 ${isDark ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-white"}`}
              />
              <CarouselNext
                className={`-right-4 ${isDark ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-white"}`}
              />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
