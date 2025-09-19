import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

// Simple replacements for missing shadcn components
const Textarea = ({ className, ...props }) => (
  <textarea className={className} {...props} />
);

const Button = ({ className, variant, ...props }) => (
  <button className={className} {...props} />
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
