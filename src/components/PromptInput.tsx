import React, { useState } from "react";
import { motion } from "framer-motion";

// Inline Textarea component with original styling
const Textarea = (props) => {
  const { value, onChange, placeholder, className, ...otherProps } = props;
  return (
    <textarea 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...otherProps}
    />
  );
};

// Inline Button component with original styling  
const Button = (props) => {
  const { children, onClick, disabled, variant, className, ...otherProps } = props;
  const isOutline = variant === "outline";
  
  const baseClasses = isOutline 
    ? "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
    : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";
  
  return (
    <button 
      className={`${baseClasses} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

// Inline Sparkles icon
const Sparkles = (props) => (
  <svg
    className={props.className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

// Inline Wand2 icon
const Wand2 = (props) => (
  <svg
    className={props.className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8 19 13" />
    <path d="M15 9h0" />
    <path d="M17.8 6.2 19 5" />
    <path d="m3 21 9-9" />
    <path d="m12.2 6.2 2.8-2.8" />
    <path d="m10 2 1.8 1.8" />
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
    <div className="glass-card rounded-3xl p-6 mx-4 text-black shadow-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-xl md:text-2xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Describe your dream logo
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
          className="w-full py-4 text-lg font-black rounded-2xl gold-bg text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
