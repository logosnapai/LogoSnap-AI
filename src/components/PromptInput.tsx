import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple Textarea component to replace shadcn dependency
const Textarea = ({ value, onChange, placeholder, className = "", ...props }) => {
  return (
    <textarea 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 ${className}`}
      {...props}
    />
  );
};

// Simple Button component to replace shadcn dependency
const Button = ({ children, onClick, disabled, variant = "default", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple icons to replace lucide-react
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Wand2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 4V2m0 2v2m0-2h2m-2 0h-2m0 16l-4-4 4-4m6 8l4-4-4-4" />
  </svg>
);

export default function PromptInput({ onGenerate, isGenerating, creditsRemaining }) {
  const [prompt, setPrompt] = useState("");
  const defaultPrompt = "Build me a recognizable symbol like Apple. No text. Make it iconic, simple, and modern with unique visual identity. Use symbolism or abstract forms. No gradients, think versatile and brandable.";

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 max-w-md mx-auto mb-8 text-black shadow-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-xl md:text-2xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          DESCRIBE YOUR DREAM LOGO
        </h2>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4" />
          <span>Credits Remaining: {creditsRemaining}/5</span>
        </div>
      </motion.div>

      {/* Prompt Input */}
      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={defaultPrompt}
          className="min-h-32 text-base rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-0 resize-none bg-white/80"
        />

        {/* Quick Fill Button */}
        <Button
          onClick={() => setPrompt(defaultPrompt)}
          variant="outline"
          className="w-full text-gray-600 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 rounded-xl"
        >
          Edit Example Prompt
        </Button>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating || creditsRemaining === 0}
          className="w-full py-4 text-lg font-black rounded-3xl gold-bg text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Creating Magic...</span>
            </div>
          ) : creditsRemaining === 0 ? (
            <span>Out of Credits</span>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Wand2 className="w-5 h-5" />
              <span>Generate Logos</span>
            </div>
          )}
        </Button>

        {creditsRemaining === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-red-50 rounded-2xl border border-red-200"
          >
            <p className="text-red-700 font-medium mb-2">
              Out of generations. Get 5 more for $4.99
            </p>
            <Button
              onClick={() => {
                // REMOVED localStorage for Bolt.new compatibility
                // Will trigger parent component to show paywall again
                window.location.reload();
              }}
              className="gold-bg text-black font-bold px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Purchase More Credits
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
