import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Search,
  BookOpen,
  Code,
  Palette,
  Music,
  Camera,
  Briefcase,
  Heart,
} from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  count?: number;
}

const Category = ({ icon, name, count = 42 }: CategoryProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/courses?category=${encodeURIComponent(name)}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="p-3 bg-primary/10 rounded-full mb-3">{icon}</div>
      <h3 className="font-medium text-sm">{name}</h3>
      <p className="text-xs text-muted-foreground">{count} courses</p>
    </div>
  );
};

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  categories?: CategoryProps[];
}

const HeroSection = ({
  title = "Expand Your Knowledge with EduPress",
  subtitle = "Discover thousands of courses taught by industry experts across various categories.",
  backgroundImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80",
  categories = [
    {
      icon: <BookOpen size={24} className="text-primary" />,
      name: "Academic",
      count: 128,
    },
    {
      icon: <Code size={24} className="text-primary" />,
      name: "Programming",
      count: 214,
    },
    {
      icon: <Palette size={24} className="text-primary" />,
      name: "Design",
      count: 186,
    },
    {
      icon: <Music size={24} className="text-primary" />,
      name: "Music",
      count: 92,
    },
    {
      icon: <Camera size={24} className="text-primary" />,
      name: "Photography",
      count: 76,
    },
    {
      icon: <Briefcase size={24} className="text-primary" />,
      name: "Business",
      count: 156,
    },
    {
      icon: <Heart size={24} className="text-primary" />,
      name: "Health",
      count: 112,
    },
  ],
}: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full h-[600px] bg-background">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <Badge variant="secondary" className="mb-4">
          Over 10,000 Courses Available
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-lg text-white/90 mb-8 max-w-2xl">{subtitle}</p>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl flex mb-12"
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for courses, skills or subjects..."
              className="pl-10 py-6 rounded-r-none bg-white/95 border-0 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
          <Button type="submit" size="lg" className="rounded-l-none px-8">
            Search
          </Button>
        </form>

        {/* Categories */}
        <div className="w-full">
          <h2 className="text-white text-xl font-medium mb-6">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <Category key={index} {...category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
