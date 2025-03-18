import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, isUsingMockData } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number." }),
  originalPrice: z.coerce
    .number()
    .min(0, { message: "Original price must be a positive number." })
    .optional(),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the course image.",
  }),
  bestseller: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CourseCreation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      originalPrice: undefined,
      imageUrl: "",
      bestseller: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a course.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isUsingMockData) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
          title: "Course created (Demo)",
          description:
            "Your course has been created successfully in demo mode!",
        });

        // Reset the form
        form.reset();
        return;
      }

      // In a real implementation with Supabase
      const { error } = await supabase.from("courses").insert([
        {
          title: values.title,
          description: values.description,
          category: values.category,
          price: values.price,
          original_price: values.originalPrice,
          image: values.imageUrl,
          bestseller: values.bestseller,
          instructor_id: user.id,
          rating: 0,
          review_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Course created",
        description: "Your course has been created successfully!",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a clear and descriptive title for your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your course content and what students will learn"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of your course content and
                    learning outcomes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Web Development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="Data Science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Mobile Development">
                          Mobile Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the category that best fits your course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a URL for the course cover image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="99.99"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the current price for your course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price ($) (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="199.99"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseFloat(e.target.value)
                            : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the original price if you're offering a discount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bestseller"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as Bestseller</FormLabel>
                    <FormDescription>
                      Highlight this course as a bestseller on the platform.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Course..." : "Create Course"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseCreation;
