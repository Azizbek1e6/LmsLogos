import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "primary" | "secondary" | "white";
}

const Spinner = ({
  size = "md",
  className,
  variant = "primary",
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const variantClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { Spinner };
