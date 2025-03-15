import React from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  cartItemCount?: number;
}

const Header = ({
  isLoggedIn = false,
  username = "Guest",
  cartItemCount = 0,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const categories = [
    { name: "Development", href: "/courses/development" },
    { name: "Business", href: "/courses/business" },
    { name: "IT & Software", href: "/courses/it-software" },
    { name: "Design", href: "/courses/design" },
    { name: "Marketing", href: "/courses/marketing" },
    { name: "Personal Development", href: "/courses/personal-development" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">EduPress</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block p-3 space-y-1 rounded-md hover:bg-accent"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/courses" className="px-3 py-2 text-sm font-medium">
                  All Courses
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="px-3 py-2 text-sm font-medium">
                  About Us
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <Input
              type="search"
              placeholder="Search for courses..."
              className="w-64 pl-10"
            />
            <Search className="absolute w-4 h-4 text-muted-foreground top-3 left-3" />
          </div>

          {/* Desktop Search Toggle (medium screens) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex lg:hidden"
            onClick={toggleSearch}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-primary rounded-full -top-2 -right-2">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{username}</span>
                </Button>
              </Link>
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

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className="md:hidden"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for courses..."
              className="w-full pl-10"
            />
            <Search className="absolute w-4 h-4 text-muted-foreground top-3 left-3" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="flex flex-col px-4 py-2 space-y-1">
            <Link
              to="/courses"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              All Courses
            </Link>
            <div className="px-3 py-2 text-sm font-medium">
              <span>Categories</span>
              <div className="pl-4 mt-2 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block py-1 text-sm hover:text-primary"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2 space-x-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={toggleMenu}
                  >
                    <User className="w-5 h-5" />
                    <span>{username}</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center px-3 py-2 space-x-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={toggleMenu}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                    {cartItemCount > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-primary rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
