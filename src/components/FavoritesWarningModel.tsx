import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple Button component to replace shadcn dependency
const Button = ({ children, onClick, variant = "default", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple icons to replace lucide-react
const Star = ({ className }) => (
  <svg className={className} fill="current
