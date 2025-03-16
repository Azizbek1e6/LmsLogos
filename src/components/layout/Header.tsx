import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThemeToggle } from "../ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">EduPress</span>
        </Link>

        {/* Navigation */}
        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:static inset-x-0 top-16 md:top-0 flex-col md:flex-row items-start md:items-center p-4 md:p-0 bg-background md:bg-transparent border-b md:border-0 shadow-md md:shadow-none space-y-4 md:space-y-0 md:space-x-6 z-50`}
        >
          <Link
            to="/courses"
            className="text-sm font-medium hover:text-primary w-full md:w-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/instructors"
            className="text-sm font-medium hover:text-primary w-full md:w-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            Instructors
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary w-full md:w-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-primary w-full md:w-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Search and Auth */}
        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:flex"
            >
              <Input
                type="text"
                placeholder="Search courses..."
                className="w-64 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-8 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin"
                      : user?.role === "teacher"
                        ? "/teacher/dashboard"
                        : "/dashboard"
                  }
                >
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
