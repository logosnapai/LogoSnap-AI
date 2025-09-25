import React, { useState } from "react";
import { motion } from "framer-motion";

// Exact replicas to replace the missing imports
const Textarea = (props) => <textarea {...props} />;
const Button = (props) => <button {...props} />;
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
          Describe your dream logo
        </h2>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-yellow-500 font-medium">
            Credits Remaining: {creditsRemaining}/5
          </span>
        </div>
      </motion.div>

      {/* Prompt Input */}
      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={defaultPrompt}
          className="h-20 text-base rounded-2xl border-2 border-gray-200 focus:border-black focus:shadow-[0_0_0_1px_#FF8C00] hover:border-gray-300 focus:ring-0 resize-none bg-white/80 w-full overflow-hidden transition-all duration-300"
        />

        {/* Quick Fill Button */}
        <Button
          onClick={() => setPrompt(defaultPrompt)}
          className="w-full py-3 text-gray-600 border border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 rounded-xl bg-white transition-all duration-200 hover:scale-[1.02]"
        >
          Edit Example Prompt
        </Button>

        {/* Generate Button with Premium Effects */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating || creditsRemaining === 0}
          className="relative w-full py-3 text-lg font-medium rounded-xl gold-bg text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
        >
          {/* Premium Loading Gradient Sweep */}
          {(!isGenerating && creditsRemaining > 0 && prompt.trim()) && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-30"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}

          {/* Enhanced Sparkle Particles - only when generating */}
          {isGenerating && (
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-2 left-4 w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.7,
                }}
              />
              <motion.div
                className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-white rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360, 720],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 1.2,
                }}
              />
              <motion.div
                className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.3, 0],
                  rotate: [0, -90, -180],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  delay: 1.8,
                }}
              />
            </div>
          )}

          {/* Button content with enhanced animations */}
          <motion.div 
            className="relative z-10"
            animate={!prompt.trim() || creditsRemaining === 0 ? {} : { scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div 
                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Creating Magic...</span>
              </div>
            ) : creditsRemaining === 0 ? (
              <span>Out of Credits</span>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Generate Logos</span>
              </div>
            )}
          </motion.div>
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
              className="relative gold-bg text-black font-bold px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Premium sweep effect for paywall button */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 opacity-0 group-hover:opacity-40"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10">Purchase More Credits</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
