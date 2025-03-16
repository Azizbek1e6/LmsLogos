import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

interface CourseCardProps {
  id?: string;
  title?: string;
  instructor?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  originalPrice?: number;
  category?: string;
  image?: string;
  bestseller?: boolean;
}

const CourseCard = ({
  id = "course-1",
  title = "Complete Web Development Bootcamp",
  instructor = "Dr. Jane Smith",
  rating = 4.8,
  reviewCount = 2453,
  price = 89.99,
  originalPrice = 199.99,
  category = "Web Development",
  image = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  bestseller = true,
}: CourseCardProps) => {
  return (
    <Link to={`/course/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 w-full max-w-[350px]">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[180px] object-cover"
          />
          {bestseller && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
              Bestseller
            </Badge>
          )}
        </div>

        <CardHeader className="p-4 pb-2">
          <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {instructor}
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-0 pb-2">
          <div className="flex items-center gap-1">
            <span className="font-bold text-amber-500">
              {rating.toFixed(1)}
            </span>
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < Math.floor(rating) ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount})
            </span>
          </div>

          <div className="mt-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
            >
              {category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {originalPrice && originalPrice > price && (
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
