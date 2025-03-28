import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../ui/loading-spinner";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        <LoadingSpinner size="4em" color="hsl(var(--primary))" />
        <p className="text-lg font-medium text-primary">{message}</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
