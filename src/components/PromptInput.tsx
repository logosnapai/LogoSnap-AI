import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

// Inline Textarea that matches shadcn styling
const Textarea = React.forwardRef((props, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Inline Button that matches shadcn styling
const Button = React.forwardRef((props, ref) => {
  const { className, variant, size, asChild = false, ...otherProps } = props;
  
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...otherProps}
    />
  );
});
Button.displayName = "Button";

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
                localStorage.removeItem('logosnap_paid');
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
