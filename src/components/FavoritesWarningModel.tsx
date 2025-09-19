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
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const AlertTriangle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z"/>
  </svg>
);

export default function FavoriteWarningModal({ isOpen, onViewFavorites, onCancel }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                View Your Favorites
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                You have saved logos in your favorites. Would you like to view them?
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Star className="h-6 w-6 text-yellow-400" />
            <Star className="h-6 w-6 text-yellow-400" />
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={onViewFavorites}
              className="flex-1"
            >
              <Star className="h-4 w-4 mr-2" />
              View Favorites
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
